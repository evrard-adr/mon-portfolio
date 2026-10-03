import { getContent } from "@/lib/content";
import Menu from "@/components/Menu";
import Link from "next/link";
import ArchPortrait from "@/components/ArchPortrait";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const content = getContent() as any;
  const { about } = content;
  const paragraphs = (about.text as string).split("\n\n");

  return (
    <main className="min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Menu />
      <ScrollReveal />

      <section className="px-6 md:px-14 lg:px-20 pt-36 pb-28">
        <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center gap-3 mb-14">
            <span className="font-display text-sm italic" style={{ color: "var(--accent)" }}>01</span>
            <span className="h-px w-10" style={{ backgroundColor: "var(--accent-border)" }} />
            <span className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--text-muted)" }}>À propos</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl leading-[0.98] mb-12" style={{ color: "var(--text)" }}>
            Droit.<br />
            <em style={{ color: "var(--accent)" }}>Mobilités.</em><br />
            <span style={{ color: "var(--text-muted)" }}>Lyon.</span>
          </h1>

          <div className="space-y-6 mb-12">
            {paragraphs.map((p, i) => (
              <p key={i} className="font-light text-[15px] leading-[1.9]" style={{ color: "var(--text-muted)" }}>
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
        <div className="lg:sticky lg:top-28" data-reveal="scale">
          <ArchPortrait className="mx-auto max-w-[440px]" />
        </div>
        </div>
      </section>
    </main>
  );
}
