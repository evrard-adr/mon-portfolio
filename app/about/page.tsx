import { getContent } from "@/lib/content";
import Menu from "@/components/Menu";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const content = getContent() as any;
  const { about } = content;
  const paragraphs = (about.text as string).split("\n\n");

  return (
    <main className="min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Menu />

      <section className="px-8 md:px-16 lg:px-24 pt-36 pb-28">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent)" }}>À propos</span>
            <span className="flex-1 h-px max-w-xs" style={{ backgroundColor: "var(--border)" }} />
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-tight mb-10" style={{ color: "var(--text)" }}>
            Droit.<br />
            <span style={{ color: "var(--accent)" }}>Mobilités.</span><br />
            <span style={{ color: "var(--text-muted)" }}>Lyon.</span>
          </h1>

          <div className="space-y-6 mb-12">
            {paragraphs.map((p, i) => (
              <p key={i} className="font-light text-sm leading-loose text-justify" style={{ color: "var(--text-muted)" }}>
                {p}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <a href={`mailto:${about.email}`} className="text-sm transition-colors" style={{ color: "var(--accent)" }}>
              {about.email} →
            </a>
            <Link href="/cv" className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
              Voir le CV →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
