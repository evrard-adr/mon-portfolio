"use client";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typewriter from "@/components/Typewriter";
import HeroPDFButton from "@/components/HeroPDFButton";

gsap.registerPlugin(ScrollTrigger);

const SEAL = "PARLEMENT DES ÉTUDIANTS · LYON · DROIT PUBLIC · ";

function Chars({ text, italic = false }: { text: string; italic?: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.14em] pr-[0.06em] -mb-[0.14em]" aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} className={`hero-char inline-block will-change-transform ${italic ? "italic" : ""}`} aria-hidden="true">
          {c}
        </span>
      ))}
    </span>
  );
}

export default function HeroStage() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("a11y-no-motion");
    const show = () => el.querySelectorAll<HTMLElement>("[data-h]").forEach((n) => (n.style.visibility = "visible"));
    if (reduced) {
      show();
      return;
    }

    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);

      // Une seule courbe (expo.out) pour toute l'intro : cohérent, sans à-coup.
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onStart: show });
      tl.fromTo(q(".hero-arc"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.4, stagger: 0.18 }, 0)
        .fromTo(q(".hero-arch"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 }, 0.15)
        .from(q(".hero-photo"), { yPercent: 9, opacity: 0, duration: 1.5 }, 0.55)
        .from(q(".hero-char"), { yPercent: 118, duration: 1.2, stagger: 0.05 }, 0.4)
        .from(q(".hero-fade"), { y: 22, opacity: 0, duration: 1.1, stagger: 0.1 }, 0.9)
        .from(q(".hero-seal"), { scale: 0.5, opacity: 0, rotate: -120, duration: 1.4 }, 1.1)
        .from(q(".hero-tag"), { x: 30, opacity: 0, duration: 1.1 }, 1.3);

      gsap.to(q(".hero-seal-spin"), { rotate: 360, duration: 36, ease: "none", repeat: -1, transformOrigin: "50% 50%" });

      // Parallaxe souris : amplitudes faibles, lissées (quickTo) → fluide, jamais nerveux.
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const layers = q("[data-depth]").map((n) => ({
          x: gsap.quickTo(n, "x", { duration: 1.1, ease: "power3.out" }),
          y: gsap.quickTo(n, "y", { duration: 1.1, ease: "power3.out" }),
          d: parseFloat((n as HTMLElement).dataset.depth || "0"),
        }));
        const move = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(nx * l.d);
            l.y(ny * l.d * 0.5);
          });
        };
        window.addEventListener("mousemove", move);
        cleanups.push(() => window.removeEventListener("mousemove", move));
      }

      // Scroll : léger décalage de profondeur, rien de plus.
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: 0.8 };
      gsap.to(q(".hero-photo-wrap"), { yPercent: -4, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-arcs"), { scale: 1.08, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-copy"), { yPercent: -8, opacity: 0.35, ease: "none", scrollTrigger: st });
    }, el);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden px-6 md:px-14 lg:px-20 pt-28 pb-12">
      <div className="relative z-[1] mx-auto grid min-h-[calc(100svh-10rem)] max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        {/* ── Texte ── */}
        <div className="hero-copy order-2 lg:order-1" data-h style={{ visibility: "hidden" }}>
          <p className="hero-fade mb-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--accent)" }}>
            <span className="h-px w-8" style={{ background: "var(--accent)" }} />
            Droit · Science politique · Lyon
          </p>
          <h1 className="font-display mb-8 leading-[0.92]">
            <span className="block text-[clamp(3.8rem,11.5vw,8.6rem)]" style={{ color: "var(--text)" }}>
              <Chars text="Evrard" />
            </span>
            <span className="block text-[clamp(3.8rem,11.5vw,8.6rem)]" style={{ color: "var(--accent)" }}>
              <Chars text="André" italic />
            </span>
          </h1>
          <div className="hero-fade mb-10 max-w-md">
            <Typewriter />
          </div>
          <div className="hero-fade flex flex-wrap items-center gap-3">
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--accent)", color: "var(--bg)", fontWeight: 600 }}
            >
              Voir le CV →
            </Link>
            <HeroPDFButton />
          </div>
          <dl className="hero-fade mt-12 grid max-w-md grid-cols-2 gap-6 pt-6 text-xs" style={{ borderTop: "1px solid var(--border)" }}>
            <div>
              <dt className="mb-1 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Études</dt>
              <dd className="font-display text-lg" style={{ color: "var(--text)" }}>Licence de droit, Lyon 3</dd>
            </div>
            <div>
              <dt className="mb-1 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Engagement</dt>
              <dd className="font-display text-lg" style={{ color: "var(--text)" }}>Parlement des Étudiants</dd>
            </div>
          </dl>
        </div>

        {/* ── Portrait dans l'arche ── */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] lg:max-w-[500px]">
            {/* Hémicycle : arcs concentriques qui se dessinent */}
            <div data-depth="-14" data-h className="absolute inset-[-14%]" style={{ visibility: "hidden" }}>
              <svg className="hero-arcs h-full w-full" viewBox="0 0 400 400" fill="none" aria-hidden="true">
                {[190, 170, 150].map((r, i) => (
                  <path
                    key={r}
                    className="hero-arc"
                    d={`M${200 - r},330 A${r},${r} 0 0 1 ${200 + r},330`}
                    pathLength={1}
                    stroke="var(--accent)"
                    strokeOpacity={0.55 - i * 0.14}
                    strokeWidth={1}
                    strokeDasharray={1}
                    strokeDashoffset={1}
                  />
                ))}
              </svg>
            </div>

            {/* Arche */}
            <div
              className="hero-arch absolute bottom-0 left-[3%] right-[3%] top-[20%] overflow-hidden"
              data-h
              style={{
                visibility: "hidden",
                borderRadius: "999px 999px 0 0",
                background: "radial-gradient(120% 80% at 50% 8%, var(--arch-from) 0%, var(--arch-to) 72%)",
                boxShadow: "inset 0 0 0 1px var(--accent-border)",
              }}
            >
              <div className="absolute inset-[10px] border" style={{ borderRadius: "999px 999px 0 0", borderColor: "var(--accent-border)", opacity: 0.55 }} />
              <div className="absolute left-1/2 top-[18%] h-[55%] w-[70%] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(220,169,74,0.28), transparent 68%)", filter: "blur(18px)" }} />
            </div>

            {/* Portrait : la tête dépasse de l'arche */}
            <div data-depth="9" data-h className="hero-photo-wrap absolute inset-0 z-[2]" style={{ visibility: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gallery/evrard-portrait.webp"
                alt="Portrait d'Evrard André en costume"
                width={1080}
                height={1350}
                className="hero-photo absolute bottom-0 left-0 h-full w-full object-contain object-bottom"
                style={{ filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.35))" }}
                fetchPriority="high"
              />
            </div>

            {/* Sceau rotatif */}
            <div data-depth="20" data-h className="absolute -left-2 bottom-[16%] z-[3] h-[104px] w-[104px] md:-left-8 md:h-[124px] md:w-[124px]" style={{ visibility: "hidden" }}>
              <div className="hero-seal relative h-full w-full rounded-full" style={{ background: "var(--bg)", boxShadow: "0 0 0 1px var(--accent-border)" }}>
                <svg className="hero-seal-spin absolute inset-0 h-full w-full" viewBox="0 0 120 120" aria-hidden="true">
                  <defs>
                    <path id="sealPath" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
                  </defs>
                  <text fill="var(--accent)" fontSize="9.2" style={{ fontFamily: "var(--font-dm), sans-serif", fontWeight: 500, letterSpacing: "0.12em" }}>
                    <textPath href="#sealPath" textLength="292" lengthAdjust="spacing">{SEAL}</textPath>
                  </text>
                </svg>
                <span className="font-display absolute inset-0 flex items-center justify-center text-3xl italic" style={{ color: "var(--accent)" }}>§</span>
              </div>
            </div>

            {/* Étiquette */}
            <div data-depth="26" data-h className="absolute -right-1 bottom-[8%] z-[3] md:-right-6" style={{ visibility: "hidden" }}>
              <div className="hero-tag rounded-2xl px-4 py-3 backdrop-blur-md" style={{ background: "var(--nav-bg)", border: "1px solid var(--accent-border)" }}>
                <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>Responsable communication</p>
                <p className="font-display text-base" style={{ color: "var(--text)" }}>PE Lyon & national</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
