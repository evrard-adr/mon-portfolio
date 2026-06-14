import Menu from "@/components/Menu";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <main className="min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Menu />
      <ScrollReveal />

      <section className="px-8 md:px-16 lg:px-24 pt-36 pb-28">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-14" data-reveal="fade">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent)" }}>Contact</span>
            <span className="flex-1 h-px max-w-xs" style={{ backgroundColor: "var(--border)" }} />
          </div>

          <div data-reveal>
            <h1 className="font-display font-extrabold text-6xl md:text-7xl leading-none mb-8" style={{ color: "var(--text)" }}>
              Écrire
            </h1>
            <p className="text-sm font-light leading-loose mb-10" style={{ color: "var(--text-muted)" }}>
              Par mail, sur LinkedIn ou sur Instagram.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:evrard.andre@aol.com"
                className="flex items-center justify-between px-5 py-4 rounded-xl transition-all"
                style={{ backgroundColor: "var(--accent-glow)", border: "1px solid var(--accent-border)" }}
              >
                <span className="text-[9px] uppercase tracking-widest font-medium" style={{ color: "var(--accent)" }}>Email</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>evrard.andre@aol.com →</span>
              </a>
              <a
                href="https://linkedin.com/in/evrardandre"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 rounded-xl transition-all"
                style={{ backgroundColor: "var(--bg2)", border: "1px solid var(--border)" }}
              >
                <span className="text-[9px] uppercase tracking-widest font-medium" style={{ color: "var(--accent)" }}>LinkedIn</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Evrard André →</span>
              </a>
              <a
                href="https://instagram.com/evrardadr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 rounded-xl transition-all"
                style={{ backgroundColor: "var(--bg2)", border: "1px solid var(--border)" }}
              >
                <span className="text-[9px] uppercase tracking-widest font-medium" style={{ color: "var(--accent)" }}>Instagram</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>@evrardadr →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-8 md:px-16 lg:px-24 py-10 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
        <span className="font-display font-bold text-xs uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>Evrard André</span>
        <span className="text-xs" style={{ color: "var(--text-faint)" }}>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
