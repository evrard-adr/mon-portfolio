"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./Providers";

const links = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/about" },
  { label: "Projets", href: "/#projets" },
  { label: "Créations", href: "/#creations" },
  { label: "Réflexion", href: "/reflexion" },
  { label: "Galerie", href: "/#gallery" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
];

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { theme, toggle } = useTheme();

  // L'îlot se masque en descendant, réapparaît dès qu'on remonte.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) setHidden(false);
      else if (y - last > 8) setHidden(true);
      else if (last - y > 8) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop(); else window.__lenis?.start();
    return () => { document.body.style.overflow = ""; window.__lenis?.start(); };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Nav */}
      <nav
        aria-label="Navigation principale"
        className="pointer-events-none fixed inset-x-0 top-3 z-[110] flex justify-center px-3 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
        style={{ transform: hidden && !open ? "translateY(-170%)" : "none" }}
      >
        <div
          className="pointer-events-auto flex w-full max-w-[560px] items-center justify-between gap-3 rounded-full py-1.5 pl-5 pr-1.5 backdrop-blur-md"
          style={{ background: "var(--nav-bg)", border: "2px solid var(--ink)", boxShadow: "3px 3px 0 var(--ink)" }}
        >
        <Link href="/" className="font-display text-lg tracking-tight" style={{ color: "var(--text)" }} onClick={() => setOpen(false)}>
          <span>Evrard</span><span style={{ color: "var(--accent)" }}>.</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block"><a href="mailto:evrard.andre@aol.com" className="btn-pill" style={{ padding: ".4rem 1rem", fontSize: ".8rem" }}>✉ Me contacter</a></span>
          <a href="mailto:evrard.andre@aol.com" aria-label="Me contacter par mail" className="grid h-9 w-9 place-items-center rounded-full text-sm sm:hidden" style={{ background: "var(--ink)", color: "var(--bg)" }}>✉</a>
          {/* Theme toggle */}
          <button onClick={toggle} className="w-9 h-9 flex items-center justify-center rounded-full transition-all" style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }} aria-label="Thème">
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
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full transition-all"
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
        <a href="mailto:evrard.andre@aol.com" className="btn-pill mb-6 self-start">✉ Me contacter</a>
        <div className="flex items-center gap-4 mt-4">
          <a href="https://instagram.com/evrardadr" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest transition-colors" style={{ color: "var(--text-muted)" }}>Instagram</a>
          
          <span style={{ color: "var(--border)" }}>·</span>
          <a href="https://linkedin.com/in/evrardandre" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest transition-colors" style={{ color: "var(--text-muted)" }}>LinkedIn</a>
        </div>
      </div>
    </>
  );
}
