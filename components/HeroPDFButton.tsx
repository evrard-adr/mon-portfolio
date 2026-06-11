"use client";
import { useRouter } from "next/navigation";

export default function HeroPDFButton() {
  const router = useRouter();

  const handleClick = () => {
    // Navigue vers /cv puis déclenche l'impression
    router.push("/cv?print=1");
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all"
      style={{ border: "1px solid var(--border)", color: "var(--text-muted)", backgroundColor: "transparent" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
        (e.currentTarget as HTMLElement).style.color = "var(--accent)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
        <path d="M12 16l-4-4h3V4h2v8h3l-4 4z"/>
        <path d="M4 16v4h16v-4"/>
      </svg>
      CV PDF
    </button>
  );
}
