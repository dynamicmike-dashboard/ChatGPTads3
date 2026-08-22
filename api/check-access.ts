import type { VercelRequest, VercelResponse } from '@vercel/node';

const TEABLE_API_URL = 'https://app.teable.ai/api';
const TEABLE_PAT = process.env.TEABLE_PAT!;

const USERS_TABLE_ID = 'tblFmM5o80dQBTifeH6';
const SUBS_TABLE_ID = 'tblqnEF06Exe6ehFDDb';

const F = {
  users: { email: 'fldnCIBVWeznrlaKzNk' },
  subs: {
    userLink: 'fldbQndSgbCcTie6i8x',
    plan: 'fldCwpJAd6ZGz0q5MWN',
    status: 'fldmFkiHO60m0po7SWs',
  },
};

async function teableFetch(path: string) {
  const res = await fetch(`${TEABLE_API_URL}${path}`, {
    headers: { Authorization: `Bearer ${TEABLE_PAT}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const email = (req.query.email as string)?.toLowerCase().trim();
  if (!email) return res.status(400).json({ error: 'email required' });

  try {
    const filterUser = encodeURIComponent(`{${F.users.email}} = "${email.replace(/"/g, '\\"')}"`);
    const userData = await teableFetch(`/table/${USERS_TABLE_ID}/record?filterByFormula=${filterUser}&fieldKeyType=id`);
    const user = userData.records?.[0];
    if (!user) return res.status(200).json({ plan: null, status: null, hasFullAccess: false, hasCourseAccess: false });

    const filterSub = encodeURIComponent(`SEARCH("${user.id}", ARRAYJOIN({${F.subs.userLink}}))`);
    const subData = await teableFetch(`/table/${SUBS_TABLE_ID}/record?filterByFormula=${filterSub}&fieldKeyType=id`);
    const sub = subData.records?.[0];
    if (!sub) return res.status(200).json({ plan: null, status: null, hasFullAccess: false, hasCourseAccess: false });

    const plan = sub.fields[F.subs.plan] as string | null;
    const status = sub.fields[F.subs.status] as string | null;
    const active = status === 'Active' || status === 'Trialing';
    return res.status(200).json({
      plan,
      status,
      hasFullAccess: active && plan === 'Full',
      hasCourseAccess: active && (plan === 'Full' || plan === 'Course'),
      recordId: sub.id,
    });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
