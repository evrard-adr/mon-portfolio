"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const getCookie = (n: string) => document.cookie.split("; ").find((c) => c.startsWith(n + "="))?.split("=")[1];

function send(body: Record<string, unknown>) {
  const data = JSON.stringify(body);
  try {
    if (navigator.sendBeacon && navigator.sendBeacon("/api/track", new Blob([data], { type: "application/json" }))) return;
  } catch {}
  fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: data, keepalive: true }).catch(() => {});
}

const SECTIONS = ["about", "parcours", "concretement", "transports", "creations", "gallery", "socials"];

export default function Analytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<string | null>(null);
  const first = useRef(true);

  useEffect(() => {
    setConsent(getCookie("pf_consent") || null);
    const on = (e: Event) => setConsent((e as CustomEvent).detail || null);
    window.addEventListener("pf:consent", on);
    return () => window.removeEventListener("pf:consent", on);
  }, []);

  // ── Vue de page (anonyme tant que le visiteur n'a pas choisi ; rien s'il refuse ; détaillée s'il accepte)
  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    const c = getCookie("pf_consent");
    if (c === "refuse") return;
    const sp = new URLSearchParams(location.search);
    let tag = sp.get("r") || sp.get("ref") || "";
    let utm = { s: sp.get("utm_source") || "", m: sp.get("utm_medium") || "", c: sp.get("utm_campaign") || "" };
    try {
      // Le lien suivi est conservé pour la session uniquement si le visiteur a accepté.
      if (c === "accept") {
        if (tag || utm.s) sessionStorage.setItem("pf_src", JSON.stringify({ tag, utm }));
        else {
          const s = JSON.parse(sessionStorage.getItem("pf_src") || "null");
          if (s) { tag = s.tag; utm = s.utm; }
        }
      }
    } catch {}
    send({
      kind: "pv",
      path: pathname,
      referrer: first.current ? document.referrer : "",
      ref_tag: tag, utm_source: utm.s, utm_medium: utm.m, utm_campaign: utm.c,
      language: navigator.language, screen_w: screen.width, screen_h: screen.height,
    });
    first.current = false;
  }, [pathname]);

  // ── Événements détaillés : uniquement avec consentement
  useEffect(() => {
    if (consent !== "accept" || !pathname || pathname.startsWith("/admin")) return;
    const ev = (name: string, label?: string, value?: number) => send({ kind: "ev", path: pathname, name, label, value });

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a || !a.href) return;
      if (a.href.startsWith("mailto:")) ev("mail_click", a.href.replace("mailto:", ""));
      else if (a.href.startsWith("tel:")) ev("tel_click", "tel");
      else if (/\.pdf($|\?)/i.test(a.href)) ev("cv_download", decodeURIComponent(a.pathname.split("/").pop() || "pdf"));
      else if (a.hostname && a.hostname !== location.hostname) ev("outbound_click", (a.hostname + a.pathname).slice(0, 120));
    };
    document.addEventListener("click", onClick, { capture: true });

    const depths = new Set<number>();
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (h <= 0) return;
      const pct = (scrollY / h) * 100;
      [25, 50, 75, 100].forEach((d) => { if (pct >= d - 1 && !depths.has(d)) { depths.add(d); ev("scroll", String(d)); } });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const seen = new Set<string>();
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      const id = (en.target as HTMLElement).id;
      if (en.isIntersecting && !seen.has(id)) { seen.add(id); ev("section_view", id); }
    }), { threshold: 0.4 });
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });

    // Temps passé (onglet visible)
    let visibleSince = document.visibilityState === "visible" ? Date.now() : 0;
    let acc = 0;
    const flush = () => {
      if (visibleSince) { acc += Date.now() - visibleSince; visibleSince = 0; }
      const s = Math.round(acc / 1000);
      if (s >= 2) { ev("time_on_page", undefined, Math.min(s, 3600)); acc = 0; }
    };
    const onVis = () => (document.visibilityState === "hidden" ? flush() : (visibleSince = Date.now()));
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", flush);

    return () => {
      flush();
      document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", flush);
      io.disconnect();
    };
  }, [consent, pathname]);

  return null;
}
