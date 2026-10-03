import { getContent } from "@/lib/content";
import Menu from "@/components/Menu";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ReflexionListPage() {
  const content = getContent() as any;
  const reflexions = content.reflexions ?? [];

  return (
    <main className="min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Menu />

      <section className="px-6 md:px-14 lg:px-20 pt-36 pb-28">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-14">
            <span className="font-display text-sm italic" style={{ color: "var(--accent)" }}>03</span>
            <span className="h-px w-10" style={{ backgroundColor: "var(--accent-border)" }} />
            <span className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--text-muted)" }}>Réflexions</span>
          </div>

          <h1 className="font-display text-[clamp(3.5rem,10vw,7rem)] leading-none mb-16" style={{ color: "var(--text)" }}>
            Notes
          </h1>

          <div style={{ borderTop: "1px solid var(--border)" }}>
            {reflexions.map((r: { slug: string; titre: string; date: string; tag?: string; chapeau: string }) => (
              <Link
                key={r.slug}
                href={`/reflexion/${r.slug}`}
                className="row-link group block py-10"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{r.date}</span>
                  {r.tag && <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--accent)" }}>{r.tag}</span>}
                </div>
                <h2 className="font-display font-bold text-2xl md:text-4xl leading-tight mb-4 group-hover:text-[var(--accent)] transition-colors" style={{ color: "var(--text)" }}>
                  {r.titre}
                </h2>
                <p className="text-sm font-light leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>
                  {r.chapeau}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
