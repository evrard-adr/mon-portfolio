import { NextRequest, NextResponse } from "next/server";
import { adminToken } from "@/lib/auth";
import { rpc } from "@/lib/stats";

export const dynamic = "force-dynamic";

const RANGES: Record<string, number> = { "24h": 1, "7j": 7, "30j": 30, "90j": 90, "13m": 395 };

export async function GET(req: NextRequest) {
  const token = await adminToken();
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sp = req.nextUrl.searchParams;
  try {
    if (sp.get("tags") === "1") return NextResponse.json(await rpc("portfolio_tags", { p_key: token }));
    const days = RANGES[sp.get("range") || "30j"] ?? 30;
    const from = new Date(Date.now() - days * 86400_000).toISOString();
    const args = { from, tz: "Europe/Paris", include_bots: sp.get("bots") === "1", include_owner: sp.get("owner") === "1" };
    return NextResponse.json(await rpc("portfolio_admin", { p_key: token, p_action: sp.get("export") === "1" ? "export" : "summary", p_args: args }));
  } catch (e) {
    return NextResponse.json({ error: "Lecture impossible", detail: String(e).slice(0, 200) }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  const token = await adminToken();
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { action, days, confirm } = await req.json().catch(() => ({}));
  if (!["purge", "delete_owner", "delete_all"].includes(action)) return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
  try {
    if (action === "delete_all") {
      if (confirm !== true) return NextResponse.json({ error: "Confirmation requise" }, { status: 400 });
      return NextResponse.json(await rpc("portfolio_wipe", { p_key: token }));
    }
    return NextResponse.json(await rpc("portfolio_admin", { p_key: token, p_action: action, p_args: { days } }));
  } catch (e) {
    return NextResponse.json({ error: "Action impossible", detail: String(e).slice(0, 200) }, { status: 502 });
  }
}
