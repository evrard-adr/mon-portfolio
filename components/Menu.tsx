"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./Providers";

const links = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/#about" },
  { label: "Projets", href: "/#projets" },
  { label: "Réflexion", href: "/reflexion" },
  { label: "Galerie", href: "/#gallery" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
  { label: "Contact", href: "/contact" },
];

export default function Menu() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-5 backdrop-blur-sm" style={{ backgroundColor: "var(--nav-bg)", borderBottom: "1px solid var(--border)" }}>
        <Link href="/" className="font-display font-extrabold text-sm tracking-tight" style={{ color: "var(--text)" }} onClick={() => setOpen(false)}>
          Evrard<span style={{ color: "var(--accent)" }}>.</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button onClick={toggle} className="w-8 h-8 flex items-center justify-center rounded-full transition-all" style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }} aria-label="Thème">
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Burger */}
          <button
            onClick={() => setOpen(!open)}
            className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded-full transition-all"
            style={{ border: "1px solid var(--border)" }}
            aria-label="Menu"
          >
            <span className="block h-px w-4 transition-all duration-300 origin-center"
              style={{ backgroundColor: "var(--text)", transform: open ? "translateY(4px) rotate(45deg)" : "none" }} />
            <span className="block h-px transition-all duration-300"
              style={{ backgroundColor: "var(--text)", width: open ? "0" : "1rem", opacity: open ? 0 : 1 }} />
            <span className="block h-px w-4 transition-all duration-300 origin-center"
              style={{ backgroundColor: "var(--text)", transform: open ? "translateY(-4px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div className={`menu-overlay ${open ? "open" : ""}`}>
        <div className="mb-12">
          {links.map((l) => (
            <div key={l.href} className="border-b py-4" style={{ borderColor: "var(--border)" }}>
              <Link href={l.href} className="menu-link block" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4">
          <a href="https://instagram.com/evrardadr" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest transition-colors" style={{ color: "var(--text-muted)" }}>Instagram</a>
          <span style={{ color: "var(--border)" }}>·</span>
          <a href="https://vsco.co/evrardadr" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest transition-colors" style={{ color: "var(--text-muted)" }}>VSCO</a>
          <span style={{ color: "var(--border)" }}>·</span>
          <a href="https://linkedin.com/in/evrardandre" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest transition-colors" style={{ color: "var(--text-muted)" }}>LinkedIn</a>
        </div>
      </div>
    </>
  );
}
