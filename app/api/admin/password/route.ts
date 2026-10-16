import { NextRequest, NextResponse } from "next/server";
import { adminSession, rateLimit } from "@/lib/auth";
import { rpc } from "@/lib/stats";

export const dynamic = "force-dynamic";

const MSG: Record<string, string> = {
  session: "Session expirée, reconnectez-vous.",
  locked: "Accès verrouillé 15 minutes après trop d'essais.",
  old: "L'ancien mot de passe est incorrect.",
  weak: "Mot de passe trop faible : 8 caractères minimum, différent de l'ancien et de « 1234 ».",
};

export async function POST(req: NextRequest) {
  const s = await adminSession();
  if (!s.ok) return NextResponse.json({ error: MSG.session }, { status: 401 });
  if (!rateLimit("pw:" + (req.headers.get("x-forwarded-for") || "local"), 10, 15 * 60_000)) {
    return NextResponse.json({ error: "Trop de tentatives." }, { status: 429 });
  }
  const { oldPassword, newPassword } = await req.json().catch(() => ({}));
  try {
    const r = await rpc<{ ok: boolean; error?: string }>("portfolio_set_password", {
      p_token: s.token, p_old: String(oldPassword ?? ""), p_new: String(newPassword ?? ""),
    });
    if (!r.ok) return NextResponse.json({ error: MSG[r.error || ""] || "Impossible de changer le mot de passe." }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Service indisponible" }, { status: 503 });
  }
}
