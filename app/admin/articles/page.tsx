"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { renderInline } from "@/lib/inline";

type Bloc = { type: "paragraph" | "heading" | "quote"; text: string };
type Row = { slug: string; titre: string; tag: string | null; chapeau: string; contenu: Bloc[]; date_label: string | null; date_iso: string | null; published: boolean; updated_at: string };
type Draft = { slug: string; titre: string; tag: string; chapeau: string; corps: string; date_label: string; date_iso: string; published: boolean; isNew: boolean };

const MOIS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70);

const toBlocks = (corps: string): Bloc[] =>
  corps.split(/\n{2,}/).map((c) => c.trim()).filter(Boolean).map((c) =>
    c.startsWith("## ") ? { type: "heading", text: c.slice(3).trim() }
    : c.startsWith("> ") ? { type: "quote", text: c.slice(2).replace(/\n>?\s*/g, " ").trim() }
    : { type: "paragraph", text: c.replace(/\n/g, " ") }
  );

const fromBlocks = (b: Bloc[]) => b.map((x) => (x.type === "heading" ? `## ${x.text}` : x.type === "quote" ? `> ${x.text}` : x.text)).join("\n\n");

const today = () => {
  const d = new Date();
  return { iso: d.toISOString().slice(0, 10), label: `${MOIS[d.getMonth()]} ${d.getFullYear()}` };
};

const blank = (): Draft => ({ slug: "", titre: "", tag: "", chapeau: "", corps: "", date_label: today().label, date_iso: today().iso, published: false, isNew: true });

export default function ArticlesAdmin() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [d, setD] = useState<Draft | null>(null);
  const [msg, setMsg] = useState("");
  const [auth, setAuth] = useState(true);
  const [busy, setBusy] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  const load = useCallback(async () => {
    const r = await fetch("/api/admin/articles", { cache: "no-store" });
    if (r.status === 401) return setAuth(false);
    setRows(await r.json());
  }, []);
  useEffect(() => { load(); }, [load]);

  const open = (r: Row) => {
    setSlugTouched(true);
    setD({ slug: r.slug, titre: r.titre, tag: r.tag || "", chapeau: r.chapeau, corps: fromBlocks(r.contenu), date_label: r.date_label || "", date_iso: r.date_iso || "", published: r.published, isNew: false });
    setMsg("");
  };

  const save = async (publish?: boolean) => {
    if (!d) return;
    setBusy(true);
    const published = publish ?? d.published;
    const r = await fetch("/api/admin/articles", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...d, contenu: toBlocks(d.corps), published }),
    });
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (!r.ok) return setMsg(j.error || "Erreur");
    setD({ ...d, published, isNew: false });
    setMsg(published ? "Publié ✓ — visible sur le site dans quelques secondes." : "Enregistré en brouillon ✓");
    load();
  };

  const remove = async () => {
    if (!d || !confirm(`Supprimer définitivement « ${d.titre || d.slug} » ?`)) return;
    await fetch("/api/admin/articles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "delete", slug: d.slug }) });
    setD(null); load();
  };

  const blocks = useMemo(() => (d ? toBlocks(d.corps) : []), [d]);
  const words = useMemo(() => (d ? (d.chapeau + " " + d.corps).trim().split(/\s+/).filter(Boolean).length : 0), [d]);

  const field = "w-full rounded-xl px-4 py-3 text-sm outline-none";
  const fs = { border: "2px solid var(--ink)", background: "var(--card)", color: "var(--text)" } as const;
  const lab = "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em]";

  if (!auth) {
    return (
      <main className="grid min-h-screen place-items-center px-6" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <div className="card-brut max-w-sm p-8 text-center">
          <p className="font-display mb-3 text-3xl">Connexion requise</p>
          <Link href="/admin" className="btn-pill">Aller à l&apos;admin →</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pb-24 pt-6 md:px-10" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link href="/admin" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>← Admin</Link>
            <h1 className="font-display text-4xl leading-none md:text-6xl">Articles de réflexion</h1>
          </div>
          <button onClick={() => { setD(blank()); setSlugTouched(false); setMsg(""); }} className="btn-pill">+ Nouvel article</button>
        </header>

        {!d && (
          <div className="grid gap-3">
            {rows === null && <p className="text-sm" style={{ color: "var(--text-muted)" }}>Chargement…</p>}
            {rows?.length === 0 && (
              <div className="card-brut p-6 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                Aucun article écrit ici pour l&apos;instant. Les deux notes historiques du site restent affichées. Cliquez sur « Nouvel article » pour écrire.
              </div>
            )}
            {rows?.map((r) => (
              <button key={r.slug} onClick={() => open(r)} className="card-brut flex items-center justify-between gap-4 p-5 text-left">
                <span>
                  <span className="font-display block text-xl leading-tight">{r.titre}</span>
                  <span className="mt-1 block text-xs font-medium" style={{ color: "var(--text-muted)" }}>{r.date_label} · /reflexion/{r.slug}</span>
                </span>
                <span className="sticker shrink-0 px-3 py-1 text-[11px]" style={{ background: r.published ? "var(--l-d)" : "var(--peach)", color: r.published ? "#fff" : "#0b1b4d" }}>{r.published ? "Publié" : "Brouillon"}</span>
              </button>
            ))}
          </div>
        )}

        {d && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <button onClick={() => setD(null)} className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>← Retour à la liste</button>
              <div>
                <label className={lab} style={{ color: "var(--text-muted)" }}>Titre</label>
                <input className={field} style={fs} value={d.titre} placeholder="Ex. Pourquoi la proximité change tout"
                  onChange={(e) => setD({ ...d, titre: e.target.value, slug: slugTouched || !d.isNew ? d.slug : slugify(e.target.value) })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={lab} style={{ color: "var(--text-muted)" }}>Adresse (URL)</label>
                  <input className={field} style={fs} value={d.slug} disabled={!d.isNew} onChange={(e) => { setSlugTouched(true); setD({ ...d, slug: slugify(e.target.value) }); }} />
                  <p className="mt-1 text-[11px]" style={{ color: "var(--text-muted)" }}>/reflexion/{d.slug || "…"}</p>
                </div>
                <div>
                  <label className={lab} style={{ color: "var(--text-muted)" }}>Thème</label>
                  <input className={field} style={fs} value={d.tag} placeholder="Politique, Transports…" onChange={(e) => setD({ ...d, tag: e.target.value })} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={lab} style={{ color: "var(--text-muted)" }}>Date affichée</label>
                  <input className={field} style={fs} value={d.date_label} onChange={(e) => setD({ ...d, date_label: e.target.value })} />
                </div>
                <div>
                  <label className={lab} style={{ color: "var(--text-muted)" }}>Date de publication</label>
                  <input className={field} style={fs} type="date" value={d.date_iso} onChange={(e) => setD({ ...d, date_iso: e.target.value })} />
                </div>
              </div>
              <div>
                <label className={lab} style={{ color: "var(--text-muted)" }}>Chapeau (l&apos;accroche, 2 à 3 phrases)</label>
                <textarea className={field} style={{ ...fs, minHeight: 90 }} value={d.chapeau} onChange={(e) => setD({ ...d, chapeau: e.target.value })} />
              </div>
              <div>
                <label className={lab} style={{ color: "var(--text-muted)" }}>Texte de l&apos;article</label>
                <textarea className={field} style={{ ...fs, minHeight: 380, fontFamily: "ui-monospace, monospace", lineHeight: 1.6 }} value={d.corps}
                  placeholder={"Un paragraphe, puis une ligne vide.\n\n## Un titre de section\n\nUn autre paragraphe avec du **gras**, de l'*italique* et un [lien](https://exemple.fr).\n\n> Une citation mise en valeur."}
                  onChange={(e) => setD({ ...d, corps: e.target.value })} />
                <p className="mt-2 text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Séparez les paragraphes par une ligne vide. <code>## Titre</code> = titre de section · <code>&gt; texte</code> = citation · <code>**gras**</code> · <code>*italique*</code> · <code>[texte](https://…)</code>. {words} mots · ~{Math.max(1, Math.round(words / 210))} min de lecture.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button disabled={busy} onClick={() => save(true)} className="btn-pill">{d.published ? "Mettre à jour" : "Publier"}</button>
                <button disabled={busy} onClick={() => save(false)} className="btn-pill btn-ghost">{d.published ? "Repasser en brouillon" : "Enregistrer le brouillon"}</button>
                {!d.isNew && <a href={`/reflexion/${d.slug}`} target="_blank" rel="noopener noreferrer" className="btn-pill btn-ghost">Voir ↗</a>}
                {!d.isNew && <button onClick={remove} className="btn-pill btn-ghost" style={{ color: "var(--accent)" }}>Supprimer</button>}
              </div>
              {msg && <p className="text-sm font-bold">{msg}</p>}
            </div>

            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>Aperçu</p>
              <article className="card-brut p-6 md:p-8" style={{ borderRadius: 18 }}>
                {d.tag && <span className="sticker mb-4 px-3 py-1 text-[10px] uppercase tracking-widest">{d.tag}</span>}
                <h2 className="font-display mb-4 text-3xl leading-[1.05]">{d.titre || "Titre de l'article"}</h2>
                {d.chapeau && <p className="mb-6 border-l-4 pl-4 text-base font-medium leading-relaxed" style={{ color: "var(--text-muted)", borderColor: "var(--accent-border)" }}>{d.chapeau}</p>}
                <div className="space-y-5">
                  {blocks.map((b, i) =>
                    b.type === "heading" ? <h3 key={i} className="font-display pt-3 text-xl">{renderInline(b.text)}</h3>
                    : b.type === "quote" ? <blockquote key={i} className="rounded-xl p-4 font-display text-lg" style={{ background: "var(--hl)", border: "2px solid var(--ink)" }}>{renderInline(b.text)}</blockquote>
                    : <p key={i} className="text-[15px] leading-[1.85]" style={{ color: "var(--text-muted)" }}>{renderInline(b.text)}</p>
                  )}
                </div>
              </article>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
