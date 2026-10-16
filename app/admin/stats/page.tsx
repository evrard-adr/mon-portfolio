"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type KN = { k: string; n: number };
type Recent = {
  ts: string; consent: "anon" | "full"; country?: string; region?: string; city?: string; path: string;
  ref_domain?: string; ref_tag?: string; utm_source?: string; device_type?: string; os?: string; browser?: string;
  language?: string; is_bot: boolean; is_owner: boolean; vid?: string;
};
type Summary = {
  views: number; views_full: number; views_anon: number; visitors: number; sessions: number; bots: number;
  avg_duration: number | null; returning: number; consent: Record<string, number>; live: number;
  countries: KN[]; regions: KN[]; cities: KN[]; hours: number[]; weekdays: number[]; days: KN[];
  pages: KN[]; referrers: KN[]; tags: KN[]; utm: KN[]; devices: KN[]; browsers: KN[]; os: KN[]; languages: KN[];
  events: { name: string; label: string | null; n: number }[]; recent: Recent[];
};

const RANGES = [["24h", "24 h"], ["7j", "7 jours"], ["30j", "30 jours"], ["90j", "90 jours"], ["13m", "13 mois"]] as const;
const DOW = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const EV: Record<string, string> = {
  mail_click: "✉ Clics sur ton mail", cv_download: "⬇ Téléchargements du CV", outbound_click: "↗ Clics vers l'extérieur",
  tel_click: "☎ Clics téléphone", scroll: "↕ Profondeur de lecture", section_view: "👁 Sections vues",
};

const flag = (cc?: string) =>
  cc && /^[A-Za-z]{2}$/.test(cc) ? String.fromCodePoint(...cc.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0))) : "🌐";
const countryName = (cc?: string) => {
  try { return cc && cc !== "??" ? new Intl.DisplayNames(["fr"], { type: "region" }).of(cc.toUpperCase()) || cc : "Inconnu"; } catch { return cc || "Inconnu"; }
};
const fmtDur = (s: number | null) => (s == null ? "—" : s >= 60 ? `${Math.floor(s / 60)} min ${s % 60 ? (s % 60) + " s" : ""}` : `${s} s`);
const fmtTime = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", { timeZone: "Europe/Paris", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`card-brut p-5 md:p-6 ${className}`} style={{ borderRadius: 18, boxShadow: "4px 4px 0 var(--ink)" }}>
      <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>{title}</h2>
      {children}
    </section>
  );
}

function Kpi({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div className="card-brut p-4 md:p-5" style={{ borderRadius: 18, boxShadow: "4px 4px 0 var(--ink)" }}>
      <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>{label}</p>
      <p className="font-display mt-1 text-4xl leading-none md:text-5xl">{value}</p>
      {sub && <p className="mt-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>{sub}</p>}
    </div>
  );
}

function Bars({ data, label = (k: string) => k, color = "var(--l-b)" }: { data: KN[]; label?: (k: string) => React.ReactNode; color?: string }) {
  const max = Math.max(1, ...data.map((d) => d.n));
  if (!data.length) return <p className="text-sm" style={{ color: "var(--text-muted)" }}>Pas encore de données.</p>;
  return (
    <ul className="space-y-2">
      {data.map((d) => (
        <li key={d.k} className="text-sm">
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="truncate font-medium">{label(d.k)}</span>
            <span className="font-bold tabular-nums">{d.n}</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: "var(--border)" }}>
            <div className="h-2 rounded-full" style={{ width: `${(d.n / max) * 100}%`, background: color, transition: "width .8s cubic-bezier(.16,1,.3,1)" }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Columns({ values, labels, color }: { values: number[]; labels: string[]; color: string }) {
  const max = Math.max(1, ...values);
  const step = Math.max(1, Math.ceil(values.length / 10));
  return (
    <div className="flex h-40 min-w-0 items-end gap-[2px] overflow-hidden">
      {values.map((v, i) => (
        <div key={i} className="relative flex h-full min-w-0 flex-1 flex-col items-center justify-end" title={`${labels[i]} : ${v}`}>
          <div className="w-full rounded-t" style={{ height: `${(v / max) * 100}%`, minHeight: v ? 3 : 1, background: v ? color : "var(--border)", transition: "height .8s cubic-bezier(.16,1,.3,1)" }} />
          <span className="mt-1 h-3 whitespace-nowrap text-[9px] font-bold leading-none" style={{ color: "var(--text-muted)" }}>{i % step === 0 ? labels[i] : ""}</span>
        </div>
      ))}
    </div>
  );
}

export default function StatsPage() {
  const [range, setRange] = useState<string>("30j");
  const [bots, setBots] = useState(false);
  const [owner, setOwner] = useState(false);
  const [data, setData] = useState<Summary | null>(null);
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [ownerOn, setOwnerOn] = useState<boolean | null>(null);
  const [label, setLabel] = useState("");
  const [copied, setCopied] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/stats?range=${range}&bots=${bots ? 1 : 0}&owner=${owner ? 1 : 0}`, { cache: "no-store" });
    if (r.status === 401) { setErr("auth"); setLoading(false); return; }
    const j = await r.json();
    if (!r.ok) setErr(j.error || "Erreur");
    else { setErr(""); setData(j); }
    setLoading(false);
  }, [range, bots, owner]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { const t = setInterval(load, 45_000); return () => clearInterval(t); }, [load]);
  useEffect(() => { fetch("/api/admin/owner").then((r) => r.json()).then((j) => setOwnerOn(!!j.on)).catch(() => {}); }, []);

  const toggleOwner = async () => {
    const on = !ownerOn;
    await fetch("/api/admin/owner", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ on }) });
    setOwnerOn(on);
  };

  const exportCsv = async () => {
    const r = await fetch(`/api/admin/stats?range=${range}&bots=${bots ? 1 : 0}&owner=${owner ? 1 : 0}&export=1`);
    const rows: Record<string, unknown>[] = await r.json();
    if (!Array.isArray(rows) || !rows.length) return alert("Rien à exporter.");
    const cols = Object.keys(rows[0]);
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...rows.map((row) => cols.map((c) => esc(row[c])).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    a.download = `visites-${range}.csv`;
    a.click();
  };

  const act = async (action: string, extra: Record<string, unknown> = {}, msg = "") => {
    if (msg && !confirm(msg)) return;
    const r = await fetch("/api/admin/stats", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, ...extra }) });
    const j = await r.json();
    alert(r.ok ? "Fait : " + JSON.stringify(j.deleted ?? j) + " élément(s) supprimé(s)." : j.error || "Erreur");
    load();
  };

  const dayData = useMemo(() => {
    if (!data) return { values: [] as number[], labels: [] as string[] };
    const days = RANGES.findIndex((r) => r[0] === range) === 0 ? 1 : ({ "7j": 7, "30j": 30, "90j": 90, "13m": 120 } as Record<string, number>)[range] || 30;
    const map = new Map(data.days.map((d) => [String(d.k).slice(0, 10), d.n]));
    const out: number[] = [], labels: string[] = [];
    const n = range === "13m" ? 120 : days;
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400_000);
      const key = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Paris" }).format(d);
      out.push(map.get(key) || 0);
      labels.push(d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", timeZone: "Europe/Paris" }));
    }
    return { values: out, labels };
  }, [data, range]);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const slug = label.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const link = slug ? `${origin}/?r=${slug}` : "";
  const copy = async (t: string) => { await navigator.clipboard.writeText(t); setCopied(t); setTimeout(() => setCopied(""), 1800); };

  const consentRate = data && (data.consent.accept || data.consent.refuse)
    ? Math.round(((data.consent.accept || 0) / ((data.consent.accept || 0) + (data.consent.refuse || 0))) * 100) : null;

  if (err === "auth") {
    return (
      <main className="grid min-h-screen place-items-center px-6" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <div className="card-brut max-w-sm p-8 text-center">
          <p className="font-display mb-3 text-3xl">Connexion requise</p>
          <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>Connectez-vous à l&apos;administration pour voir les statistiques.</p>
          <Link href="/admin" className="btn-pill">Aller à l&apos;admin →</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pb-24 pt-6 md:px-10" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/admin" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>← Admin</Link>
            <h1 className="font-display text-4xl leading-none md:text-6xl">Statistiques</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {data && (
              <span className="sticker flex items-center gap-2 px-3 py-1.5 text-xs">
                <i className="block h-2 w-2 animate-pulse rounded-full" style={{ background: data.live ? "var(--l-d)" : "var(--text-muted)" }} />
                {data.live} en ce moment
              </span>
            )}
            <button onClick={load} className="btn-pill btn-ghost" style={{ padding: ".5rem 1rem", fontSize: ".8rem" }}>{loading ? "…" : "Actualiser"}</button>
          </div>
        </header>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {RANGES.map(([k, l]) => (
            <button key={k} onClick={() => setRange(k)} className={`btn-pill ${range === k ? "" : "btn-ghost"}`} style={{ padding: ".45rem 1rem", fontSize: ".8rem" }}>{l}</button>
          ))}
          <label className="ml-2 flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={owner} onChange={(e) => setOwner(e.target.checked)} /> Inclure mes visites</label>
          <label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={bots} onChange={(e) => setBots(e.target.checked)} /> Inclure les robots</label>
        </div>

        {err && err !== "auth" && (
          <div className="card-brut mb-6 p-5 text-sm font-medium" style={{ background: "var(--peach)", color: "#0b1b4d" }}>{err}</div>
        )}

        {data && (
          <>
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Kpi label="Pages vues" value={data.views} sub={`${data.views_full} avec accord · ${data.views_anon} anonymes`} />
              <Kpi label="Visiteurs identifiés" value={data.visitors} sub={`${data.returning} sont revenus · ${data.sessions} sessions`} />
              <Kpi label="Temps moyen" value={fmtDur(data.avg_duration)} sub="par page, visiteurs avec accord" />
              <Kpi label="Accord cookies" value={consentRate == null ? "—" : `${consentRate}%`} sub={`${data.consent.accept || 0} acceptés · ${data.consent.refuse || 0} refusés`} />
            </div>

            <div className="mb-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
              <Card title="Visites par jour"><Columns values={dayData.values} labels={dayData.labels} color="var(--l-b)" /></Card>
              <Card title="Actions des visiteurs">
                {data.events.filter((e) => ["mail_click", "cv_download", "tel_click", "outbound_click"].includes(e.name)).length === 0 ? (
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>Aucune action pour l&apos;instant.</p>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {data.events.filter((e) => ["mail_click", "cv_download", "tel_click", "outbound_click"].includes(e.name)).map((e, i) => (
                      <li key={i} className="flex items-baseline justify-between gap-3">
                        <span className="truncate font-medium">{EV[e.name] || e.name}{e.label ? ` · ${e.label}` : ""}</span>
                        <span className="font-bold tabular-nums">{e.n}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <Card title="Heure de la journée (heure de Paris)"><Columns values={data.hours} labels={data.hours.map((_, i) => `${i}h`)} color="var(--l-c)" /></Card>
              <Card title="Jour de la semaine"><Columns values={data.weekdays} labels={DOW} color="var(--l-a)" /></Card>
            </div>

            <div className="mb-6 grid gap-6 md:grid-cols-3">
              <Card title="Pays"><Bars data={data.countries} label={(k) => <>{flag(k)} {countryName(k)}</>} /></Card>
              <Card title="Régions"><Bars data={data.regions} color="var(--l-d)" /></Card>
              <Card title="Villes (avec accord)"><Bars data={data.cities} color="var(--l-a)" /></Card>
            </div>

            <div className="mb-6 grid gap-6 md:grid-cols-3">
              <Card title="Sources"><Bars data={data.referrers} color="var(--l-b)" /></Card>
              <Card title="Pages les plus vues"><Bars data={data.pages} color="var(--l-c)" /></Card>
              <Card title="Campagnes (UTM)"><Bars data={data.utm} color="var(--l-d)" /></Card>
            </div>

            <div className="mb-6 grid gap-6 md:grid-cols-4">
              <Card title="Appareils"><Bars data={data.devices} color="var(--l-b)" /></Card>
              <Card title="Navigateurs"><Bars data={data.browsers} color="var(--l-c)" /></Card>
              <Card title="Systèmes"><Bars data={data.os} color="var(--l-a)" /></Card>
              <Card title="Langues"><Bars data={data.languages} color="var(--l-d)" /></Card>
            </div>

            <Card title="Comportement (avec accord)" className="mb-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Sections vues</p>
                  <Bars data={data.events.filter((e) => e.name === "section_view").map((e) => ({ k: e.label || "?", n: e.n }))} color="var(--l-b)" />
                </div>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Profondeur de lecture (% des visites)</p>
                  <Bars data={data.events.filter((e) => e.name === "scroll").map((e) => ({ k: `${e.label} %`, n: e.n })).sort((a, b) => parseInt(a.k) - parseInt(b.k))} color="var(--l-c)" />
                </div>
              </div>
            </Card>

            <Card title="Liens suivis : savoir qui ouvre quoi" className="mb-6">
              <p className="mb-4 max-w-2xl text-sm font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Je ne peux pas connaître le nom d&apos;un visiteur. En revanche, tu peux créer un lien <b>par destinataire</b> (cabinet, sénateur, recruteur…).
                Quand cette personne l&apos;ouvre, son étiquette apparaît ici, avec l&apos;heure et le lieu approximatif.
              </p>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="ex. cabinet-senateur-dupont"
                  className="min-w-[16rem] flex-1 rounded-full px-4 py-2.5 text-sm outline-none" style={{ border: "2px solid var(--ink)", background: "var(--card)", color: "var(--text)" }} />
                <button disabled={!link} onClick={() => copy(link)} className="btn-pill" style={{ padding: ".6rem 1.2rem", fontSize: ".8rem", opacity: link ? 1 : 0.4 }}>
                  {copied === link ? "Copié ✓" : "Copier le lien"}
                </button>
              </div>
              {link && <p className="mb-5 break-all rounded-xl p-3 text-xs font-medium" style={{ background: "var(--bg2)" }}>{link}</p>}
              <Bars data={data.tags} label={(k) => `?r=${k}`} color="var(--l-a)" />
            </Card>

            <Card title="Derniers visiteurs" className="mb-6">
              <div className="-mx-2 overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-xs">
                  <thead>
                    <tr style={{ color: "var(--text-muted)" }}>
                      {["Quand", "D'où", "Page", "Source", "Appareil", "Données"].map((h) => (
                        <th key={h} className="px-2 pb-3 font-bold uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.recent.map((r, i) => (
                      <tr key={i} style={{ borderTop: "1px solid var(--border)", opacity: r.is_bot || r.is_owner ? 0.5 : 1 }}>
                        <td className="whitespace-nowrap px-2 py-2.5 font-bold">{fmtTime(r.ts)}</td>
                        <td className="px-2 py-2.5">{flag(r.country)} {[r.city, r.region, countryName(r.country)].filter(Boolean).join(", ")}</td>
                        <td className="px-2 py-2.5 font-medium">{r.path}</td>
                        <td className="px-2 py-2.5">{r.ref_tag ? <b>🔗 {r.ref_tag}</b> : r.ref_domain || r.utm_source || "Direct"}</td>
                        <td className="px-2 py-2.5">{[r.device_type, r.os, r.browser].filter(Boolean).join(" · ")}{r.is_bot ? " · 🤖" : ""}{r.is_owner ? " · moi" : ""}</td>
                        <td className="px-2 py-2.5">{r.consent === "full" ? `cookie ${r.vid ?? ""}` : "anonyme"}</td>
                      </tr>
                    ))}
                    {!data.recent.length && <tr><td colSpan={6} className="px-2 py-6 text-center" style={{ color: "var(--text-muted)" }}>Aucune visite sur cette période.</td></tr>}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card title="Gestion des données">
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={exportCsv} className="btn-pill" style={{ padding: ".55rem 1.1rem", fontSize: ".8rem" }}>Exporter en CSV</button>
                <button onClick={toggleOwner} className="btn-pill btn-ghost" style={{ padding: ".55rem 1.1rem", fontSize: ".8rem" }}>
                  {ownerOn ? "✓ Mes visites sont exclues (désactiver)" : "Exclure mes visites depuis ce navigateur"}
                </button>
                <button onClick={() => act("delete_owner", {}, "Supprimer toutes les visites marquées « moi » ?")} className="btn-pill btn-ghost" style={{ padding: ".55rem 1.1rem", fontSize: ".8rem" }}>Supprimer mes visites</button>
                <button onClick={() => act("purge", { days: 395 }, "Supprimer les données de plus de 13 mois ?")} className="btn-pill btn-ghost" style={{ padding: ".55rem 1.1rem", fontSize: ".8rem" }}>Purger &gt; 13 mois</button>
                <button onClick={() => act("delete_all", { confirm: true }, "ATTENTION : supprimer TOUTES les statistiques, définitivement ?")} className="btn-pill btn-ghost" style={{ padding: ".55rem 1.1rem", fontSize: ".8rem", color: "var(--accent)" }}>Tout effacer</button>
              </div>
              <p className="mt-4 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                Conservation automatique : 13 mois pour les visites et événements, 25 mois pour les preuves de consentement. {data.bots} visite(s) de robots écartée(s) de ces chiffres.
              </p>
            </Card>
          </>
        )}
        {!data && loading && <p className="text-sm" style={{ color: "var(--text-muted)" }}>Chargement…</p>}
      </div>
    </main>
  );
}
