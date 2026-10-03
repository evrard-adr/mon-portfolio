import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export const metadata = { title: "Mentions légales — Evrard André" };

const H = "font-display mb-3 text-2xl md:text-3xl";
const P = "mb-10 text-base leading-relaxed";

export default function MentionsPage() {
  return (
    <main className="min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Menu />
      <section className="px-6 pb-28 pt-36 md:px-14 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display mb-14 text-[clamp(2.8rem,9vw,6rem)] leading-[0.92]">
            <span className="hl-mark on">Mentions</span> légales
          </h1>

          <h2 className={H}>Éditeur du site</h2>
          <p className={P} style={{ color: "var(--text-muted)" }}>
            Evrard André, particulier. Responsable de la publication : Evrard André.
            Contact : <a className="underline underline-offset-4" href="mailto:evrard.andre@aol.com">evrard.andre@aol.com</a>.
          </p>

          <h2 className={H}>Hébergement</h2>
          <p className={P} style={{ color: "var(--text-muted)" }}>
            Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          </p>

          <h2 className={H}>Propriété intellectuelle</h2>
          <p className={P} style={{ color: "var(--text-muted)" }}>
            La conception du site, son design, ses textes et son code ont été réalisés par Evrard André. Le motion design
            (animations et mises en mouvement) a été propulsé par l&apos;intelligence artificielle. L&apos;ensemble est protégé par le droit
            d&apos;auteur : toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite.
            Les photographies restent la propriété de leurs auteurs respectifs.
          </p>

          <h2 className={H}>Données personnelles</h2>
          <p className={P} style={{ color: "var(--text-muted)" }}>
            Ce site ne propose pas de formulaire et ne dépose pas de cookies de suivi publicitaire. Les coordonnées publiées (adresse e-mail)
            sont celles de l&apos;éditeur. Pour toute demande, vous pouvez écrire à l&apos;adresse ci-dessus.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
