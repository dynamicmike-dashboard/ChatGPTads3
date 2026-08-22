import type { VercelRequest, VercelResponse } from '@vercel/node';

const TEABLE_API_URL = 'https://app.teable.ai/api';
const TEABLE_PAT = process.env.TEABLE_PAT!;
const USERS_TABLE_ID = 'tblFmM5o80dQBTifeH6';

const F = {
  email: 'fldnCIBVWeznrlaKzNk',
  firstName: 'fldBW66I0syCG3lwGCr',
  lastName: 'fldX6IOWjay2hEwy56l',
};

async function teableFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`${TEABLE_API_URL}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${TEABLE_PAT}`, 'Content-Type': 'application/json', ...(init.headers as any) },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, businessName, targetMarket, score, bucket } = req.body || {};
  if (!email) return res.status(400).json({ error: 'email required' });

  const ghlWebhook = process.env.GHL_WEBHOOK_URL || process.env.VITE_GHL_WEBHOOK_URL;
  // Fire-and-forget GHL
  if (ghlWebhook) {
    fetch(ghlWebhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req.body) }).catch(() => {});
  }

  try {
    const filter = encodeURIComponent(`{${F.email}} = "${String(email).replace(/"/g, '\\"')}"`);
    const found = await teableFetch(`/table/${USERS_TABLE_ID}/record?filterByFormula=${filter}&fieldKeyType=id`);
    const existing = found.records?.[0];
    const [firstName, ...rest] = String(name || '').split(' ');
    const lastName = rest.join(' ');
    if (existing) {
      await teableFetch(`/table/${USERS_TABLE_ID}/record/${existing.id}?fieldKeyType=id`, {
        method: 'PATCH',
        body: JSON.stringify({ record: { fields: { [F.firstName]: firstName, [F.lastName]: lastName } } }),
      });
    } else {
      await teableFetch(`/table/${USERS_TABLE_ID}/record?fieldKeyType=id`, {
        method: 'POST',
        body: JSON.stringify({ fieldKeyType: 'id', records: [{ fields: { [F.email]: email, [F.firstName]: firstName, [F.lastName]: lastName } }] }),
      });
    }
    return res.status(200).json({ ok: true, synced: true });
  } catch (e: any) {
    // Don't block report on Teable error — still succeed for GHL lead capture
    console.error('ghl-lead teable error', e.message);
    return res.status(200).json({ ok: true, synced: false, error: e.message });
  }
}
