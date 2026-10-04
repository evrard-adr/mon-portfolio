import { getContent } from "@/lib/content";
import SocialIcon from "@/components/SocialIcon";
import Menu from "@/components/Menu";
import ScrollReveal from "@/components/ScrollReveal";
import HeroStage from "@/components/HeroStage";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedCounter from "@/components/AnimatedCounter";
import Marquee from "@/components/Marquee";
import ScrubText from "@/components/ScrubText";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import Footer from "@/components/Footer";
import Parcours from "@/components/Parcours";

export const dynamic = "force-dynamic";

function Label({ letter, color, text }: { letter: string; color: string; text: string }) {
  return (
    <div className="mb-10 flex items-center gap-4" data-reveal="fade" style={{ ["--c" as string]: color }}>
      <span className="badge-line text-base">{letter}</span>
      <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text)" }}>{text}</span>
      <span className="stationline" />
    </div>
  );
}

const H2 = "font-display leading-[0.95] text-[clamp(2.6rem,8.4vw,7.4rem)]";

export default function Home() {
  const content = getContent();
  const { about, socials, gallery, stats, creations, creationsLiens, parcours, concretement, reflexions } = content as any;
  const tickerWords: string[] = (content.ticker as string).split(/\s*·\s*/).filter(Boolean);

  return (
    <main className="relative min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Menu />
      <ScrollReveal />
      <ScrollProgress />

      {/* ── HERO ── */}
      <HeroStage />

      {/* ── TICKER ── */}
      <div className="relative z-10 py-5" style={{ background: "var(--navy)", color: "#f5f1e8" }}>
        <Marquee duration={70}>
          {tickerWords.map((w, i) => (
            <span key={i} className="font-display flex items-center whitespace-nowrap text-4xl md:text-6xl">
              {w}
              <span className="mx-6 flex items-center gap-1 md:mx-9" aria-hidden="true"><i className="block h-2.5 w-2.5 rounded-full" style={{ background: "var(--l-a)" }} /><i className="block h-2.5 w-2.5 rounded-full" style={{ background: "var(--l-b)" }} /><i className="block h-2.5 w-2.5 rounded-full" style={{ background: "var(--l-c)" }} /><i className="block h-2.5 w-2.5 rounded-full" style={{ background: "var(--l-d)" }} /></span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="px-6 py-32 md:px-14 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Label letter="A" color="var(--l-a)" text="À propos" />
          <ScrubText
            className={`${H2} mb-14`}
            parts={[
              { t: "Le droit public pour comprendre," },
              { t: "la communication", hl: true },
              { t: "pour convaincre, les transports en commun pour avancer." },
            ]}
          />
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]" data-reveal>
            <p className="max-w-lg text-lg font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>{about.teaser}</p>
            <div className="flex flex-wrap items-start gap-4 md:justify-end">
              <Magnetic><a href={`mailto:${about.email}`} className="btn-pill">✉ Me contacter par mail →</a></Magnetic>
              <Magnetic><Link href="/about" className="btn-pill btn-ghost">En savoir plus</Link></Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARCOURS ── */}
      <section id="parcours" className="px-6 py-28 md:px-14 lg:px-20" style={{ backgroundColor: "var(--bg2)", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
        <div className="mx-auto max-w-6xl">
          <Label letter="B" color="var(--l-b)" text="Mon parcours" />
          <h2 className={`${H2} mb-20`} data-mask>
            <span className="mask-line"><span>De station</span></span>
            <span className="mask-line"><span>en <span className="hl-mark">station.</span></span></span>
          </h2>
          <Parcours etapes={parcours} />
        </div>
      </section>

      {/* ── CONCRÈTEMENT ── */}
      <section id="concretement" className="px-6 py-28 md:px-14 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Label letter="C" color="var(--l-c)" text="Concrètement" />
          <h2 className={`${H2} mb-14`} data-mask>
            <span className="mask-line"><span>Pour un élu et</span></span>
            <span className="mask-line"><span>son équipe, je peux…</span></span>
          </h2>
          <div style={{ borderTop: "2px solid var(--ink)" }}>
            {concretement.map((c: { verbe: string; desc: string }, i: number) => (
              <div key={i} data-reveal data-delay={String(Math.min(i + 1, 5))}>
                <div className="row-link grid items-baseline gap-2 py-7 md:grid-cols-[minmax(0,1fr)_1.2fr] md:gap-10" style={{ borderBottom: "2px solid var(--ink)" }}>
                  <h3 className="font-display text-5xl leading-none md:text-7xl" style={{ color: "var(--text)" }}>{c.verbe}<span style={{ color: "var(--accent)" }}>.</span></h3>
                  <p className="text-base font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSPORTS ── */}
      <section id="transports" className="px-6 py-28 md:px-14 lg:px-20" style={{ backgroundColor: "var(--bg2)", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
        <div className="mx-auto max-w-6xl">
          <Label letter="D" color="var(--l-d)" text="Mon autre ligne" />
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <h2 className={`${H2} mb-8`} data-mask>
                <span className="mask-line"><span>Les transports</span></span>
                <span className="mask-line"><span><span className="hl-mark">en commun.</span></span></span>
              </h2>
              <p className="max-w-lg text-lg font-medium leading-relaxed" style={{ color: "var(--text-muted)" }} data-reveal>
                Usager quotidien du réseau lyonnais, je m&apos;intéresse à la façon dont les transports en commun se pensent, se financent et se gèrent, et à ce que sera la ville en 2050.
              </p>
            </div>
            {reflexions[0] && (
              <Link href={`/reflexion/${reflexions[0].slug}`} className="card-brut group block p-7 md:p-9" style={{ background: "var(--peach)", color: "#0b1b4d", rotate: "-1deg" }} data-reveal>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ opacity: 0.7 }}>Note de réflexion · {reflexions[0].date}</p>
                <p className="font-display mt-3 text-2xl leading-tight md:text-3xl">{reflexions[0].titre}</p>
                <p className="mt-6 flex items-center gap-2 text-sm font-bold">Lire la note <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span></p>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── CITATION ── */}
      <section className="px-6 py-28 md:px-14 lg:px-20" style={{ background: "var(--navy)", color: "#f5f1e8", ["--hl" as string]: "#2f6bff" }}>
        <div className="mx-auto max-w-5xl">
          <ScrubText
            className="font-display text-[clamp(2rem,6vw,5rem)] leading-[1.02]"
            parts={[
              { t: "« La chose publique, c'est comment une décision" },
              { t: "se construit, se justifie,", hl: true },
              { t: "et ce qu'elle change concrètement pour les gens. »" },
            ]}
          />
          <p className="mt-10 flex items-center gap-4 text-sm font-bold">
            <span className="stationline on" style={{ ["--c" as string]: "var(--l-a)" }} /> Evrard André
          </p>
        </div>
      </section>

      {/* ── CRÉATIONS ── */}
      <section id="creations" className="overflow-x-clip px-6 py-28 md:px-14 lg:px-20" style={{ backgroundColor: "var(--bg2)", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)" }}>
        <div className="mx-auto max-w-6xl">
          <Label letter="A" color="var(--l-a)" text="Ce que j'ai créé" />
          <h2 className={`${H2} mb-6`} data-mask>
            <span className="mask-line"><span>Mes talents au service</span></span>
            <span className="mask-line"><span>du <span className="hl-mark">Parlement des Étudiants.</span></span></span>
          </h2>
          <p className="mb-14 max-w-xl text-lg font-medium leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Affiches, infographies et posts, pour le Parlement des Étudiants au national comme à Lyon, et sur mon propre compte : un même savoir-faire, un message clair et une image forte.
          </p>
          <div className="grid grid-cols-2 gap-5 md:gap-8 lg:grid-cols-3 [&>*]:min-w-0">
            {creations.map((c: { img: string; tag?: string; titre: string; desc: string; lien?: string }, i: number) => {
              const fig = (
                <figure className="card-brut group relative h-full overflow-hidden" style={{ rotate: `${[-1.5, 1, -0.8, 1.4][i % 4]}deg` }}>
                  {c.tag && (
                    <span className="sticker absolute left-3 top-3 z-[1] px-3 py-1 text-[10px] uppercase tracking-widest">{c.tag}</span>
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={`${c.titre} — ${c.desc}`} loading="lazy" className="block aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <figcaption className="p-4" style={{ background: "var(--card)", borderTop: "2px solid var(--ink)" }}>
                    <p className="font-display text-base leading-tight md:text-lg">{c.titre}{c.lien ? " ↗" : ""}</p>
                    <p className="mt-1 text-xs font-medium leading-snug" style={{ color: "var(--text-muted)" }}>{c.desc}</p>
                  </figcaption>
                </figure>
              );
              return (
                <div key={i} data-reveal data-delay={String((i % 4) + 1)}>
                  {c.lien ? <a href={c.lien} target="_blank" rel="noopener noreferrer" className="block h-full">{fig}</a> : fig}
                </div>
              );
            })}
            <div className="card-brut col-span-2 flex flex-col justify-between gap-6 p-6 md:p-8 lg:col-span-3 lg:flex-row lg:items-end" style={{ background: "var(--peach)", color: "#0b1b4d", rotate: "-0.5deg" }} data-reveal>
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ opacity: 0.7 }}>Mon compte</p>
                <a href={creationsLiens.principal.url} target="_blank" rel="noopener noreferrer" className="font-display block text-3xl leading-none [overflow-wrap:anywhere] md:text-5xl">{creationsLiens.principal.label} ↗</a>
                <p className="mt-3 max-w-sm text-sm font-medium leading-snug" style={{ opacity: 0.8 }}>{creationsLiens.principal.desc}</p>
              </div>
              <p className="text-sm font-bold">
                Les comptes du PE :{" "}
                {creationsLiens.secondaires.map((l: { label: string; url: string }, i: number) => (
                  <span key={l.url}>{i > 0 && " · "}<a href={l.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 [overflow-wrap:anywhere]">{l.label} ↗</a></span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="px-6 py-24 md:px-14 lg:px-20"
        style={{ background: "var(--navy)", color: "#f5f1e8", ["--accent" as string]: "#ffd6a5", ["--text-muted" as string]: "rgba(245,241,232,0.7)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-3 gap-4 text-center md:gap-6">
            {stats.map((s: { value: number; suffix: string; label: string }, i: number) => (
              <AnimatedCounter key={i} target={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="overflow-hidden py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-14 lg:px-20">
          <Label letter="B" color="var(--l-b)" text="Galerie" />
        </div>
        <div className="py-6">
          <Marquee duration={90} slowOnHover>
            {gallery.map((item: { url: string; caption: string; source: string }, i: number) => (
              <div key={i} className="gallery-item mr-6" style={{ width: "280px", height: "380px", flexShrink: 0 }}>
                {item.url ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.caption} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: i % 2 === 0 ? "top" : "center" }} />
                    <div className="overlay">
                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="font-display text-lg text-white">{item.caption}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-widest text-white/70">{item.source}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: "var(--bg2)" }}>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Photo</span>
                  </div>
                )}
              </div>
            ))}
          </Marquee>
        </div>
        <div className="mx-auto max-w-6xl px-6 md:px-14 lg:px-20">
          <div className="mt-10 flex items-center gap-3" data-reveal="fade">
            <a href="https://instagram.com/evrardadr" target="_blank" rel="noopener noreferrer" className="btn-pill btn-ghost" style={{ padding: ".5rem 1.1rem", fontSize: ".75rem" }}>Instagram ↗</a>
            
          </div>
        </div>
      </section>

      {/* ── CONTACT / RÉSEAUX ── */}
      <section id="socials" className="px-6 py-32 md:px-14 lg:px-20" style={{ backgroundColor: "var(--bg2)", borderTop: "2px solid var(--ink)" }}>
        <div className="mx-auto max-w-6xl">
          <Label letter="C" color="var(--l-c)" text="Réseaux" />
          <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <h2 className="font-display leading-[0.95] text-[clamp(2.3rem,6vw,5.4rem)]" data-mask>
              <span className="mask-line"><span>Un collaborateur</span></span>
              <span className="mask-line"><span>pour votre équipe ?</span></span>
              <span className="mask-line"><em className="hl-mark whitespace-nowrap" style={{ color: "var(--accent)" }}>Parlons-en.</em></span>
            </h2>
            <div className="grid gap-3" data-reveal>
              {socials.map((s: { name: string; url: string; handle: string }) => (
                <SocialIcon key={`${s.name}-${s.handle}`} {...s} />
              ))}
            </div>
          </div>
          <div className="mt-14">
            <Magnetic><a href={`mailto:${about.email}`} className="btn-pill">✉ Me contacter par mail →</a></Magnetic>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
