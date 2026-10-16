"use client";

export default function ManageCookies({ className = "" }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("pf:open-consent"))}>
      Gérer mes cookies
    </button>
  );
}
