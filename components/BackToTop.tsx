"use client";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-transform hover:-translate-y-0.5"
      style={{ border: "2px solid rgba(245,241,232,0.5)", color: "#f5f1e8" }}
    >
      Haut de page ↑
    </button>
  );
}
