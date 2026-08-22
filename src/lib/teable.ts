// Client-safe helper. Calls server /api/check-access, never exposes PAT.
export type AccessResult = {
  plan: 'Full' | 'Course' | null;
  status: string | null;
  hasFullAccess: boolean;
  hasCourseAccess: boolean;
};

export async function checkUserAccessByEmail(email: string): Promise<AccessResult> {
  const r = await fetch(`/api/check-access?email=${encodeURIComponent(email)}`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
