import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { rpc, readKey } from "@/lib/stats";
import { rateLimit } from "@/lib/auth";
import { parseUA } from "@/lib/ua";

export const dynamic = "force-dynamic";

const VID = "pf_vid"; // identifiant de visiteur (aléatoire), 13 mois, seulement si consentement
const SID = "pf_sid"; // identifiant de session, 30 min d'inactivité, seulement si consentement
const clean = (s: unknown, n: number) => (typeof s === "string" ? s.slice(0, n) : undefined);
const tag = (s: unknown) => (typeof s === "string" ? s.toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 60) || undefined : undefined);

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (!rateLimit(`track:${ip}`, 90, 60_000)) return new NextResponse(null, { status: 204 });

  let b: Record<string, unknown> = {};
  try {
    b = await req.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  const kind = b.kind === "ev" ? "ev" : b.kind === "consent" ? "consent" : "pv";
  const consentCookie = req.cookies.get("pf_consent")?.value; // "accept" | "refuse" | absent
  const res = new NextResponse(null, { status: 204 });
  const cookieOpts = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/" };

  // ── Choix de consentement : on le consigne (sans aucun identifiant) et on purge les cookies si refus.
  if (kind === "consent") {
    const choice = b.choice === "accept" ? "accept" : "refuse";
    if (choice === "refuse") {
      res.cookies.set(VID, "", { ...cookieOpts, maxAge: 0 });
      res.cookies.set(SID, "", { ...cookieOpts, maxAge: 0 });
    }
    rpc("portfolio_track", { p: { kind: "consent", choice } }).catch(() => {});
    return res;
  }

  // ── Respect du choix : refus, ou signal « Ne pas suivre » sans consentement explicite → rien n'est enregistré.
  const dnt = req.headers.get("dnt") === "1" || req.headers.get("sec-gpc") === "1";
  if (consentCookie === "refuse") return res;
  if (!consentCookie && dnt) return res;
  const full = consentCookie === "accept";

  const path = clean(b.path, 300) || "/";
  if (path.startsWith("/admin") || path.startsWith("/api")) return res;

  const ua = parseUA(req.headers.get("user-agent") || "");
  const isOwner = req.cookies.get("pf_owner")?.value === "1";
  const geo = {
    country: req.headers.get("x-vercel-ip-country") || undefined,
    region: req.headers.get("x-vercel-ip-country-region") || undefined,
    city: full ? decodeURIComponent(req.headers.get("x-vercel-ip-city") || "") || undefined : undefined, // ville : avec consentement seulement
    timezone: full ? req.headers.get("x-vercel-ip-timezone") || undefined : undefined,
  };

  let visitor: string | undefined;
  let session: string | undefined;
  if (full) {
    visitor = req.cookies.get(VID)?.value || crypto.randomUUID();
    session = req.cookies.get(SID)?.value || crypto.randomUUID();
    res.cookies.set(VID, visitor, { ...cookieOpts, maxAge: 395 * 86400 });
    res.cookies.set(SID, session, { ...cookieOpts, maxAge: 30 * 60 });
  }

  // Source : domaine du référent (hors site lui-même) + étiquette de lien suivi (?r=…) + UTM.
  let ref_domain: string | undefined;
  const referrer = clean(b.referrer, 300);
  if (referrer) {
    try {
      const h = new URL(referrer).hostname.replace(/^www\./, "");
      if (!h.endsWith("vercel.app") && h !== (req.headers.get("host") || "").replace(/^www\./, "")) ref_domain = h;
    } catch {}
  }

  // Empreinte d'IP : jamais l'IP brute ; sel quotidien ; uniquement avec consentement.
  let ip_hash: string | undefined;
  if (full && ip !== "local") {
    const salt = new Date().toISOString().slice(0, 10) + "|" + (readKey() || "salt");
    ip_hash = crypto.createHash("sha256").update(ip + "|" + salt).digest("hex").slice(0, 24);
  }

  const payload: Record<string, unknown> =
    kind === "pv"
      ? {
          kind: "pv", consent: full ? "full" : "anon", visitor_id: visitor, session_id: session, ip_hash, path,
          referrer, ref_domain, ref_tag: tag(b.ref_tag), utm_source: tag(b.utm_source), utm_medium: tag(b.utm_medium), utm_campaign: tag(b.utm_campaign),
          ...geo, language: clean(b.language, 20), device_type: ua.device_type, os: ua.os, browser: ua.browser,
          screen_w: full ? b.screen_w : undefined, screen_h: full ? b.screen_h : undefined,
          is_bot: ua.bot, is_owner: isOwner,
        }
      : { kind: "ev", consent: full ? "full" : "anon", visitor_id: visitor, session_id: session, path, name: clean(b.name, 40), label: clean(b.label, 200), value: b.value };

  if (kind === "ev" && !full) return res; // événements détaillés : consentement obligatoire
  try {
    await rpc("portfolio_track", { p: payload });
  } catch {}
  return res;
}
