import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_HOURS, adminSession, rateLimit } from "@/lib/auth";
import { rpc } from "@/lib/stats";

export const dynamic = "force-dynamic";

const ipOf = (req: NextRequest) => req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
const cookieOpts = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/" };

export async function GET() {
  const s = await adminSession();
  return NextResponse.json({ ok: s.ok && !s.mustChange, mustChange: !!(s.ok && s.mustChange) });
}

export async function POST(req: NextRequest) {
  if (!rateLimit(`login:${ipOf(req)}`, 12, 15 * 60_000)) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 });
  }
  const { password } = await req.json().catch(() => ({ password: "" }));
  try {
    const r = await rpc<{ ok: boolean; token?: string; must_change?: boolean; locked?: boolean }>("portfolio_login", { p: String(password ?? "") });
    if (r.locked) return NextResponse.json({ error: "Accès verrouillé 15 minutes après trop d'essais." }, { status: 429 });
    if (!r.ok || !r.token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const res = NextResponse.json({ ok: true, mustChange: !!r.must_change });
    res.cookies.set(ADMIN_COOKIE, r.token, { ...cookieOpts, maxAge: SESSION_HOURS * 3600 });
    return res;
  } catch {
    return NextResponse.json({ error: "Service indisponible" }, { status: 503 });
  }
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (token) await rpc("portfolio_logout", { p_token: token }).catch(() => {});
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { ...cookieOpts, maxAge: 0 });
  return res;
}
