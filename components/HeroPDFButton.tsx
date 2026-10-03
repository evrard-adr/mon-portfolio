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
      className="btn-pill btn-ghost"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
        <path d="M12 16l-4-4h3V4h2v8h3l-4 4z"/>
        <path d="M4 16v4h16v-4"/>
      </svg>
      CV PDF
    </button>
  );
}
