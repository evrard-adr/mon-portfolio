import Menu from "@/components/Menu";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <main className="min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Menu />
      <ScrollReveal />

      <section className="px-6 md:px-14 lg:px-20 pt-36 pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-14" data-reveal="fade">
            <span className="font-display text-sm italic" style={{ color: "var(--accent)" }}>06</span>
            <span className="h-px w-10" style={{ backgroundColor: "var(--accent-border)" }} />
            <span className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--text-muted)" }}>Contact</span>
          </div>

          <div data-reveal>
            <h1 className="font-display text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.95] mb-8" style={{ color: "var(--text)" }}>
              <em style={{ color: "var(--accent)" }}>Écrire</em> <span style={{ color: "var(--text)" }}>à Evrard.</span>
            </h1>
            <p className="text-base font-light leading-loose mb-12 max-w-md" style={{ color: "var(--text-muted)" }}>
              Par mail, sur LinkedIn ou sur Instagram.
            </p>

            <div className="max-w-2xl" style={{ borderTop: "1px solid var(--border)" }}>
              <a
                href="mailto:evrard.andre@aol.com"
                className="row-link flex items-center justify-between py-6" style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span className="font-display text-2xl md:text-3xl" style={{ color: "var(--accent)" }}>Email</span>
                <span className="row-arrow text-sm" style={{ color: "var(--text-muted)" }}>evrard.andre@aol.com →</span>
              </a>
              <a
                href="https://linkedin.com/in/evrardandre"
                target="_blank"
                rel="noopener noreferrer"
                className="row-link flex items-center justify-between py-6" style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span className="font-display text-2xl md:text-3xl" style={{ color: "var(--accent)" }}>LinkedIn</span>
                <span className="row-arrow text-sm" style={{ color: "var(--text-muted)" }}>Evrard André →</span>
              </a>
              <a
                href="https://instagram.com/evrardadr"
                target="_blank"
                rel="noopener noreferrer"
                className="row-link flex items-center justify-between py-6" style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span className="font-display text-2xl md:text-3xl" style={{ color: "var(--accent)" }}>Instagram</span>
                <span className="row-arrow text-sm" style={{ color: "var(--text-muted)" }}>@evrardadr →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-14 lg:px-20 py-10 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
        <span className="font-display text-sm" style={{ color: "var(--text-muted)" }}>Evrard André</span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
