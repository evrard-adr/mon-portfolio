import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "pf_admin";
export const SESSION_HOURS = 8;

const sha = (s: string) => crypto.createHash("sha256").update(s).digest();

/** L'admin n'existe que si ADMIN_PASSWORD est défini côté serveur (plus de mot de passe par défaut). */
export const adminConfigured = () => !!process.env.ADMIN_PASSWORD;

function secret(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return process.env.ADMIN_SESSION_SECRET || crypto.createHash("sha256").update("pf-session|" + pw).digest("hex");
}

export function checkPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || typeof input !== "string") return false;
  return crypto.timingSafeEqual(sha(input), sha(pw));
}

export function signSession(): string {
  const s = secret()!;
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_HOURS * 3600_000 })).toString("base64url");
  const sig = crypto.createHmac("sha256", s).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySession(token?: string | null): boolean {
  const s = secret();
  if (!s || !token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = crypto.createHmac("sha256", s).update(payload).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

export function isAdmin(): boolean {
  return verifySession(cookies().get(ADMIN_COOKIE)?.value);
}

// Limiteur très simple (par instance) pour freiner les essais de mot de passe.
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
