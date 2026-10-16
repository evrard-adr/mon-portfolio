import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_HOURS, adminConfigured, checkPassword, isAdmin, rateLimit, signSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ipOf = (req: NextRequest) => req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";

export async function GET() {
  return NextResponse.json({ ok: isAdmin(), configured: adminConfigured() });
}

export async function POST(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: "ADMIN_PASSWORD n'est pas défini sur le serveur." }, { status: 503 });
  }
  if (!rateLimit(`login:${ipOf(req)}`, 6, 15 * 60_000)) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 });
  }
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, signSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
