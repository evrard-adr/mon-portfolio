import { cookies } from "next/headers";
import { rpc } from "@/lib/stats";

// L'authentification est gérée en base (mot de passe haché bcrypt, sessions, verrouillage après 8 échecs).
export const ADMIN_COOKIE = "pf_admin";
export const SESSION_HOURS = 8;

export type Session = { ok: boolean; token?: string; mustChange?: boolean };

export async function adminSession(): Promise<Session> {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!token) return { ok: false };
  try {
    const r = await rpc<{ ok: boolean; must_change?: boolean }>("portfolio_session", { p_token: token });
    return r?.ok ? { ok: true, token, mustChange: !!r.must_change } : { ok: false };
  } catch {
    return { ok: false };
  }
}

/** Jeton de session valide ET mot de passe déjà personnalisé, sinon null. */
export async function adminToken(): Promise<string | null> {
  const s = await adminSession();
  return s.ok && !s.mustChange ? s.token! : null;
}

export async function isAdmin(): Promise<boolean> {
  return (await adminToken()) !== null;
}

// Limiteur simple (par instance) en plus du verrouillage en base.
const hits = new Map<string, { n: number; t: number }>();
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const h = hits.get(key);
  if (!h || now - h.t > windowMs) {
    hits.set(key, { n: 1, t: now });
    return true;
  }
  h.n += 1;
  return h.n <= max;
}
