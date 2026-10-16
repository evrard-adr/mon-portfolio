"use client";
import { useState } from "react";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const item = "btn-pill btn-ghost";
  const small = { padding: ".5rem 1rem", fontSize: ".78rem" } as const;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>Partager</span>
      <a className={item} style={small} target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}>LinkedIn</a>
      <a className={item} style={small} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`}>X</a>
      <a className={item} style={small} href={`mailto:?subject=${enc(title)}&body=${enc(url)}`}>Mail</a>
      <button type="button" className={item} style={small}
        onClick={async () => { try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {} }}>
        {copied ? "Lien copié ✓" : "Copier le lien"}
      </button>
    </div>
  );
}
