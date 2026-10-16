"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const COOKIE = "pf_consent";

function readConsent(): "accept" | "refuse" | null {
  const v = document.cookie.split("; ").find((c) => c.startsWith(COOKIE + "="))?.split("=")[1];
  return v === "accept" || v === "refuse" ? v : null;
}

function writeConsent(v: "accept" | "refuse") {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${v}; Max-Age=${60 * 60 * 24 * 180}; Path=/; SameSite=Lax${secure}`; // 6 mois, puis on redemande
}

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!readConsent()) {
      const t = setTimeout(() => setOpen(true), 1400);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("pf:open-consent", show);
    return () => window.removeEventListener("pf:open-consent", show);
  }, []);

  const choose = (v: "accept" | "refuse") => {
    writeConsent(v);
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "consent", choice: v }),
      keepalive: true,
    }).catch(() => {});
    window.dispatchEvent(new CustomEvent("pf:consent", { detail: v }));
    setOpen(false);
  };

  if (!open || pathname?.startsWith("/admin")) return null;
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookies et mesure d'audience"
      className="card-brut fixed inset-x-3 bottom-3 z-[10000] p-5 md:inset-x-auto md:bottom-5 md:left-5 md:max-w-md md:p-6"
      style={{ borderRadius: 22, animation: "fadeUp .6s cubic-bezier(.16,1,.3,1) both" }}
    >
      <p className="font-display mb-2 text-xl leading-tight">Cookies &amp; mesure d&apos;audience</p>
      <p className="mb-4 text-[13px] font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>
        Avec votre accord, un cookie anonyme (13 mois) me permet de mesurer les visites : pays, ville approximative, appareil, pages lues.
        Rien n&apos;est vendu ni transmis. Sans choix : statistiques anonymes uniquement, sans cookie. Si vous refusez : rien n&apos;est enregistré.{" "}
        <Link href="/mentions-legales#cookies" className="underline underline-offset-4">En savoir plus</Link>
      </p>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => choose("refuse")} className="btn-pill btn-ghost justify-center" style={{ padding: ".7rem 1rem" }}>Refuser</button>
        <button type="button" onClick={() => choose("accept")} className="btn-pill justify-center" style={{ padding: ".7rem 1rem" }}>Accepter</button>
      </div>
    </div>
  );
}
