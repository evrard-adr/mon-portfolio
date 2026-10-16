import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Marque ce navigateur comme « propriétaire » : ses visites sont enregistrées à part et exclues des statistiques.
export async function GET(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ on: req.cookies.get("pf_owner")?.value === "1" });
}

export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { on } = await req.json().catch(() => ({ on: true }));
  const res = NextResponse.json({ on: !!on });
  res.cookies.set("pf_owner", on ? "1" : "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: on ? 395 * 86400 : 0 });
  return res;
}
