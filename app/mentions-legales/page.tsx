import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export const metadata = { title: "Mentions légales et cookies", alternates: { canonical: "/mentions-legales" } };

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

          <h2 className={H} id="cookies">Cookies et mesure d&apos;audience</h2>
          <div className={P} style={{ color: "var(--text-muted)" }}>
            <p className="mb-4">
              Ce site mesure sa fréquentation pour que son éditeur comprenne qui le consulte et comment. Vous choisissez : le bandeau vous
              propose d&apos;accepter ou de refuser, avec la même facilité. Vous pouvez changer d&apos;avis à tout moment avec le lien « Gérer mes cookies »
              en bas de chaque page. Votre choix est conservé 6 mois.
            </p>
            <p className="mb-2 font-bold" style={{ color: "var(--text)" }}>Si vous acceptez</p>
            <ul className="mb-4 list-disc space-y-1 pl-5">
              <li>Un identifiant aléatoire (cookie <code>pf_vid</code>, 13 mois) et un identifiant de session (<code>pf_sid</code>, 30 minutes) : ils permettent de savoir si une visite est un retour, sans vous identifier.</li>
              <li>Pages vues, durée de lecture, profondeur de défilement, sections consultées, clics sur le mail, le CV ou des liens externes.</li>
              <li>Pays, région et ville approximatifs, déduits de votre adresse IP. L&apos;adresse IP n&apos;est jamais enregistrée : seule une empreinte irréversible, qui change chaque jour, est conservée.</li>
              <li>Type d&apos;appareil, navigateur, système, langue, taille d&apos;écran, site d&apos;origine (par exemple LinkedIn ou Instagram) et, si vous avez reçu un lien personnalisé, son étiquette.</li>
            </ul>
            <p className="mb-2 font-bold" style={{ color: "var(--text)" }}>Tant que vous n&apos;avez pas choisi</p>
            <p className="mb-4">Seule une statistique anonyme est comptée : page consultée, pays et région, type d&apos;appareil, site d&apos;origine. Aucun cookie, aucun identifiant, aucune adresse IP, aucune ville.</p>
            <p className="mb-2 font-bold" style={{ color: "var(--text)" }}>Si vous refusez, ou si votre navigateur envoie « Ne pas suivre »</p>
            <p className="mb-4">Rien n&apos;est enregistré et les cookies de mesure déjà déposés sont supprimés.</p>
            <p className="mb-2 font-bold" style={{ color: "var(--text)" }}>Cookies strictement nécessaires</p>
            <p className="mb-4"><code>pf_consent</code> mémorise votre choix (6 mois). L&apos;espace d&apos;administration, réservé à l&apos;éditeur, dépose un cookie de session sécurisé. Le thème clair ou sombre est mémorisé dans votre navigateur.</p>
            <p className="mb-4">
              Base légale : votre consentement (article 6.1.a du RGPD) pour les données détaillées ; l&apos;intérêt légitime de l&apos;éditeur pour la statistique anonyme.
              Durée de conservation : 13 mois pour les visites, 25 mois pour la preuve de votre choix. Aucune donnée n&apos;est vendue ni transmise à des annonceurs.
              Les données sont stockées dans l&apos;Union européenne (Supabase, Paris) et accessibles uniquement à l&apos;éditeur.
            </p>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition : écrivez à{" "}
              <a className="underline underline-offset-4" href="mailto:evrard.andre@aol.com">evrard.andre@aol.com</a>. Vous pouvez aussi introduire une réclamation auprès de la CNIL (cnil.fr).
            </p>
          </div>

          <h2 className={H}>Données personnelles</h2>
          <p className={P} style={{ color: "var(--text-muted)" }}>
            Ce site ne propose pas de formulaire ni de compte utilisateur. Les coordonnées publiées (adresse e-mail, téléphone, adresse) sont celles de l&apos;éditeur,
            qui les diffuse volontairement. Pour toute demande, vous pouvez écrire à l&apos;adresse ci-dessus.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
