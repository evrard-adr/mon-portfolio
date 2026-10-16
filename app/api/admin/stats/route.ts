import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { rpc, readKey } from "@/lib/stats";

export const dynamic = "force-dynamic";

const RANGES: Record<string, number> = { "24h": 1, "7j": 7, "30j": 30, "90j": 90, "13m": 395 };

async function call(action: string, args: Record<string, unknown>) {
  return rpc("portfolio_admin", { p_key: readKey(), p_action: action, p_args: args });
}

export async function GET(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!readKey()) return NextResponse.json({ error: "ANALYTICS_READ_KEY n'est pas défini sur le serveur." }, { status: 503 });
  const sp = req.nextUrl.searchParams;
  const days = RANGES[sp.get("range") || "30j"] ?? 30;
  const from = new Date(Date.now() - days * 86400_000).toISOString();
  const args = { from, tz: "Europe/Paris", include_bots: sp.get("bots") === "1", include_owner: sp.get("owner") === "1" };
  try {
    const action = sp.get("export") === "1" ? "export" : "summary";
    return NextResponse.json(await call(action, args));
  } catch (e) {
    return NextResponse.json({ error: "Lecture impossible", detail: String(e).slice(0, 200) }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!readKey()) return NextResponse.json({ error: "ANALYTICS_READ_KEY n'est pas défini." }, { status: 503 });
  const { action, days, confirm } = await req.json().catch(() => ({}));
  if (!["purge", "delete_owner", "delete_all"].includes(action)) return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
  try {
    if (action === "delete_all") {
      if (confirm !== true) return NextResponse.json({ error: "Confirmation requise" }, { status: 400 });
      return NextResponse.json(await rpc("portfolio_wipe", { p_key: readKey() }));
    }
    return NextResponse.json(await call(action, { days, confirm: confirm === true }));
  } catch (e) {
    return NextResponse.json({ error: "Action impossible", detail: String(e).slice(0, 200) }, { status: 502 });
  }
}
