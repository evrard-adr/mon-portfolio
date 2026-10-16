import { getArticle, getArticles, readingMinutes } from "@/lib/articles";
import { adminToken } from "@/lib/auth";
import { renderInline } from "@/lib/inline";
import ShareButtons from "@/components/ShareButtons";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, SITE, NAME } from "@/lib/seo";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const r = await getArticle(params.slug, await adminToken());
  if (!r) return {};
  const desc = String(r.chapeau || "").replace(/\s+/g, " ").slice(0, 157) + "…";
  return {
    title: r.titre,
    description: desc,
    alternates: { canonical: `/reflexion/${r.slug}` },
    ...(r.draft ? { robots: { index: false, follow: false } } : {}),
    openGraph: { type: "article", title: r.titre, description: desc, url: `/reflexion/${r.slug}`, authors: [NAME], publishedTime: r.dateISO || undefined },
  };
}

export default async function ReflexionPage({ params }: { params: { slug: string } }) {
  const reflexion = await getArticle(params.slug, await adminToken());
  if (!reflexion) notFound();
  const autres = (await getArticles()).filter((a) => a.slug !== reflexion.slug).slice(0, 2);
  const url = `${SITE}/reflexion/${reflexion.slug}`;

  return (
    <main className="min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article", headline: reflexion.titre, description: String(reflexion.chapeau || "").slice(0, 300),
            inLanguage: "fr-FR", datePublished: reflexion.dateISO || undefined, author: { "@id": `${SITE}/#person` },
            mainEntityOfPage: `${SITE}/reflexion/${reflexion.slug}`, image: `${SITE}/gallery/evrard-portrait.webp`,
            keywords: [reflexion.tag, "politique", "transports en commun", "politiques publiques"].filter(Boolean).join(", "),
          },
          breadcrumbLd([{ name: "Accueil", path: "/" }, { name: "Réflexions", path: "/reflexion" }, { name: reflexion.titre, path: `/reflexion/${reflexion.slug}` }]),
        ],
      }} />
      <Menu />
      {reflexion.draft && (
        <div className="fixed inset-x-0 top-20 z-[60] mx-auto w-fit rounded-full px-4 py-1.5 text-xs font-bold" style={{ background: "var(--accent)", color: "#fff" }}>BROUILLON — visible uniquement par vous</div>
      )}

      <article className="px-8 md:px-16 lg:px-24 pt-36 pb-32 max-w-3xl mx-auto">

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/reflexion" className="text-[10px] uppercase tracking-[0.25em] transition-colors"
              style={{ color: "var(--text-muted)" }}>
              ← Réflexions
            </Link>
            <span style={{ color: "var(--border)" }}>·</span>
            <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--accent)" }}>
              Note de réflexion
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ border: "1px solid var(--accent-border)", backgroundColor: "var(--accent-glow)" }}>
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium" style={{ color: "var(--accent)" }}>
                {reflexion.date}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: "var(--text-muted)" }}>{readingMinutes(reflexion)} min de lecture</span>
            {reflexion.tag && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg2)" }}>
                <span className="text-[10px] uppercase tracking-[0.25em] font-medium" style={{ color: "var(--text-muted)" }}>
                  {reflexion.tag}
                </span>
              </div>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight mb-8"
            style={{ color: "var(--text)" }}>
            {reflexion.titre}
          </h1>

          <p className="font-body font-medium text-lg md:text-xl leading-relaxed border-l-4 pl-6"
            style={{ color: "var(--text-muted)", borderColor: "var(--accent-border)" }}>
            {reflexion.chapeau}
          </p>

          <div className="flex items-center gap-4 mt-10">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--accent)" }} />
            <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Evrard André
            </span>
          </div>
        </div>

        <div className="space-y-8">
          {reflexion.contenu.map((bloc: { type: string; text: string }, i: number) => {
            if (bloc.type === "heading") {
              return (
                <h2 key={i} className="font-display text-xl md:text-2xl pt-8"
                  style={{ color: "var(--text)" }}>
                  {renderInline(bloc.text)}
                </h2>
              );
            }
            if (bloc.type === "quote") {
              return (
                <blockquote key={i} className="relative px-8 py-6 rounded-2xl my-10"
                  style={{ backgroundColor: "var(--hl)", color: "var(--text)", border: "2px solid var(--ink)", boxShadow: "6px 6px 0 var(--ink)" }}>
                  <span className="absolute top-4 left-6 font-display text-5xl leading-none select-none"
                    style={{ color: "var(--accent)", opacity: 0.4 }}>"</span>
                  <p className="font-display font-bold text-xl md:text-2xl leading-snug relative z-10"
                    style={{ color: "var(--text)" }}>
                    {renderInline(bloc.text)}
                  </p>
                </blockquote>
              );
            }
            return (
              <p key={i} className="text-[17px] font-light leading-[1.95]"
                style={{ color: "var(--text-muted)" }}>
                {renderInline(bloc.text)}
              </p>
            );
          })}
        </div>

        <div className="mt-16"><ShareButtons url={url} title={reflexion.titre} /></div>

        {autres.length > 0 && (
          <div className="mt-16">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>À lire aussi</p>
            <div className="grid gap-4 md:grid-cols-2">
              {autres.map((a) => (
                <Link key={a.slug} href={`/reflexion/${a.slug}`} className="card-brut block p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{a.tag || "Réflexion"} · {readingMinutes(a)} min</p>
                  <p className="font-display mt-2 text-lg leading-tight">{a.titre}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-20 pt-10 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--border)" }}>
          <div>
            <p className="font-display font-bold text-sm" style={{ color: "var(--text)" }}>Evrard André</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              Étudiant en Droit · Lyon 3
            </p>
          </div>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all"
            style={{ backgroundColor: "var(--accent-glow)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}>
            Me contacter →
          </Link>
        </div>

      </article>
      <Footer />
    </main>
  );
}
