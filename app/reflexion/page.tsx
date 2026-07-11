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

      <section className="px-8 md:px-16 lg:px-24 pt-36 pb-28">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent)" }}>Réflexions</span>
            <span className="flex-1 h-px max-w-xs" style={{ backgroundColor: "var(--border)" }} />
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-6xl leading-none mb-16" style={{ color: "var(--text)" }}>
            Notes
          </h1>

          <div className="space-y-6">
            {reflexions.map((r: { slug: string; titre: string; date: string; tag?: string; chapeau: string }) => (
              <Link
                key={r.slug}
                href={`/reflexion/${r.slug}`}
                className="group block py-8 transition-colors"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>{r.date}</span>
                  {r.tag && <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--accent)" }}>{r.tag}</span>}
                </div>
                <h2 className="font-display font-bold text-xl md:text-2xl leading-snug mb-3 group-hover:text-[var(--accent)] transition-colors" style={{ color: "var(--text)" }}>
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
