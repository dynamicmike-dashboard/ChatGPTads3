import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15' as any,
});

const TEABLE_API_URL = 'https://app.teable.ai/api';
const TEABLE_PAT = process.env.TEABLE_PAT!;

const USERS_TABLE_ID = 'tblFmM5o80dQBTifeH6';
const SUBS_TABLE_ID = 'tblqnEF06Exe6ehFDDb';

// Field IDs
const F = {
  users: {
    email: 'fldnCIBVWeznrlaKzNk',
    firstName: 'fldBW66I0syCG3lwGCr',
    lastName: 'fldX6IOWjay2hEwy56l',
  },
  subs: {
    userLink: 'fldbQndSgbCcTie6i8x',
    plan: 'fldCwpJAd6ZGz0q5MWN',
    status: 'fldmFkiHO60m0po7SWs',
    stripeCustomerId: 'fldTr6Rj0EhJufLXB1L',
    stripeSubscriptionId: 'fldYotjsFCYTAP3flWB',
    stripePriceId: 'fldbz8UD2xKMxONXOrL',
    currentPeriodEnd: 'fldh8KmgQnF4eWiRBFf',
    cancelAtPeriodEnd: 'fld1nzzaqiSgCkmnZkr',
    lastEventId: 'fldWXUK0CMV6IB6meZT',
  },
};

async function teableFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`${TEABLE_API_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TEABLE_PAT}`,
      'Content-Type': 'application/json',
      ...(init.headers as any),
    },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Teable ${res.status} ${path}: ${t}`);
  }
  return res.json();
}

async function findUserByEmail(email: string) {
  const filter = encodeURIComponent(`{${F.users.email}} = "${email.replace(/"/g, '\\"')}"`);
  const data = await teableFetch(`/table/${USERS_TABLE_ID}/record?filterByFormula=${filter}&fieldKeyType=id`);
  return data.records?.[0] || null;
}

async function createUser(email: string) {
  const data = await teableFetch(`/table/${USERS_TABLE_ID}/record`, {
    method: 'POST',
    body: JSON.stringify({
      fieldKeyType: 'id',
      records: [{ fields: { [F.users.email]: email } }],
    }),
  });
  return data.records?.[0] || data;
}

async function getOrCreateUserId(email: string, metadataUserRecordId?: string) {
  if (metadataUserRecordId) {
    try {
      const rec = await teableFetch(`/table/${USERS_TABLE_ID}/record/${metadataUserRecordId}?fieldKeyType=id`);
      if (rec?.id) return rec.id;
    } catch {}
  }
  let user = await findUserByEmail(email);
  if (user) return user.id;
  const created = await createUser(email);
  return created.id;
}

async function findSubByUserId(userRecordId: string) {
  const filter = encodeURIComponent(`SEARCH("${userRecordId}", ARRAYJOIN({${F.subs.userLink}}))`);
  const data = await teableFetch(`/table/${SUBS_TABLE_ID}/record?filterByFormula=${filter}&fieldKeyType=id`);
  return data.records?.[0] || null;
}

function mapPlan(priceId: string | null, amountTotal: number | null): 'Full' | 'Course' | null {
  // Prefer priceId mapping when you add real price IDs
  if (priceId === 'price_1U72RhGe9hhLYer6J57c5rRA') return 'Full';
  if (amountTotal === 7200) return 'Full';
  if (amountTotal === 29700) return 'Course';
  // fallback for course product prod_V7H65e3VyI8T6J - when you have price ID, add here
  return null;
}

function bufferReadable(req: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (c: Buffer) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) return res.status(500).json({ error: 'Missing STRIPE_WEBHOOK_SECRET' });

  let event: Stripe.Event;
  try {
    const buf = await bufferReadable(req);
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook sig fail', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      // Expand line_items if not expanded
      let priceId: string | null = null;
      let amountTotal: number | null = session.amount_total ?? null;
      try {
        if ((session as any).line_items?.data?.[0]?.price?.id) {
          priceId = (session as any).line_items.data[0].price.id;
        } else {
          const full = await stripe.checkout.sessions.retrieve(session.id, { expand: ['line_items.data.price'] });
          priceId = full.line_items?.data[0]?.price?.id ?? null;
          amountTotal = full.amount_total ?? amountTotal;
        }
      } catch {}

      const email = session.customer_details?.email || session.customer_email || (session as any).customer_email;
      const stripeCustomerId = (session.customer as string) || '';
      const stripePriceId = priceId || '';
      const plan = mapPlan(priceId, amountTotal);
      const metadataUserRecordId =
        (session.metadata as any)?.teableUserRecordId ||
        (session as any).client_reference_id ||
        undefined;

      if (!email || !plan) {
        console.warn('Missing email/plan', { email, priceId, amountTotal, plan, sessionId: session.id });
        return res.status(200).json({ received: true, ignored: true });
      }

      const userRecordId = await getOrCreateUserId(email, metadataUserRecordId);
      const existing = await findSubByUserId(userRecordId);

      const fields: Record<string, any> = {
        [F.subs.userLink]: [userRecordId],
        [F.subs.plan]: plan,
        [F.subs.status]: 'Active',
        [F.subs.stripeCustomerId]: stripeCustomerId,
        [F.subs.stripePriceId]: stripePriceId,
        [F.subs.lastEventId]: event.id,
        [F.subs.currentPeriodEnd]: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        [F.subs.cancelAtPeriodEnd]: false,
      };

      if (existing) {
        await teableFetch(`/table/${SUBS_TABLE_ID}/record/${existing.id}?fieldKeyType=id`, {
          method: 'PATCH',
          body: JSON.stringify({ record: { fields } }),
        });
      } else {
        await teableFetch(`/table/${SUBS_TABLE_ID}/record?fieldKeyType=id`, {
          method: 'POST',
          body: JSON.stringify({ fieldKeyType: 'id', records: [{ fields }] }),
        });
      }
      console.log(`Granted ${plan} to ${email} (${userRecordId})`);
    } else if (event.type === 'checkout.session.expired') {
      console.log('expired', (event.data.object as any).id);
    }
    return res.status(200).json({ received: true });
  } catch (e: any) {
    console.error('handler error', e);
    return res.status(500).json({ error: e.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
