import Link from "next/link";
import BackToTop from "@/components/BackToTop";

const EMAIL = "evrard.andre@aol.com";

const SITE = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/about" },
  { label: "Projets", href: "/#projets" },
  { label: "Créations", href: "/#creations" },
  { label: "Réflexion", href: "/reflexion" },
  { label: "Galerie", href: "/#gallery" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
  { label: "Mentions légales", href: "/mentions-legales" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/evrardadr" },
  { label: "LinkedIn", href: "https://linkedin.com/in/evrardandre" },
  { label: "Twitter / X", href: "https://x.com/evrard_andre" },
];

const link = "inline-block py-0.5 text-sm transition-transform duration-300 hover:translate-x-1";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="overflow-hidden" style={{ background: "var(--navy)", color: "#f5f1e8" }}>
      <div className="mx-auto max-w-6xl px-6 pt-20 md:px-14 lg:px-20">
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display mb-4 text-4xl leading-none md:text-5xl">Evrard André</p>
            <p className="mb-8 max-w-xs text-sm leading-relaxed" style={{ color: "rgba(245,241,232,0.7)" }}>
              Étudiant en droit public à Lyon 3. Communication, réseaux sociaux, transports en commun.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={{ background: "#f5f1e8", color: "var(--navy)" }}
            >
              ✉ M&apos;écrire
            </a>
          </div>

          <nav aria-label="Plan du site">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(245,241,232,0.55)" }}>Plan du site</p>
            <ul>
              {SITE.map((l) => (
                <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(245,241,232,0.55)" }}>Me suivre</p>
            <ul>
              {SOCIALS.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>{s.label} ↗</a></li>
              ))}
              <li><a href={`mailto:${EMAIL}`} className={link}>{EMAIL}</a></li>
            </ul>
          </div>
        </div>

        <p
          className="font-display mt-16 select-none whitespace-nowrap text-center leading-none text-[clamp(3rem,15vw,15rem)]"
          style={{ color: "rgba(245,241,232,0.08)" }}
          aria-hidden="true"
        >
          Evrard André
        </p>
      </div>

      {/* ── Propriété intellectuelle ── */}
      <div style={{ background: "rgba(0,0,0,0.25)", borderTop: "1px solid rgba(245,241,232,0.14)" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 pb-24 pt-7 md:pb-7 md:flex-row md:items-center md:justify-between md:px-14 lg:px-20">
          <p className="max-w-3xl text-xs leading-relaxed" style={{ color: "rgba(245,241,232,0.75)" }}>
            © {year} Evrard André — Tous droits réservés. Ce site (conception, textes, design et développement) a été réalisé par Evrard André ;
            son motion design a été propulsé par l&apos;IA. Toute reproduction sans autorisation est interdite.
            Photographies : droits réservés à leurs auteurs.{" "}
            <Link href="/mentions-legales" className="underline underline-offset-4">Mentions légales</Link>
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
