"use client";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typewriter from "@/components/Typewriter";
import HeroPDFButton from "@/components/HeroPDFButton";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

function Chars({ text }: { text: string }) {
  return (
    <span className="inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em]" aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} className="hero-char inline-block will-change-transform" aria-hidden="true">
          {c}
        </span>
      ))}
    </span>
  );
}

const chip = "sticker whitespace-nowrap py-1.5 pl-1.5 pr-3.5 text-[11px] md:py-2 md:pl-2 md:pr-5 md:text-sm";

export default function HeroStage() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const intro = el.querySelector<HTMLElement>(".intro");
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("a11y-no-motion");
    if (reduced) {
      intro?.remove();
      return;
    }

    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);

      // ── Intro : rideau jaune, puis tout s'assemble (une seule timeline, ~1,5 s avant la révélation)
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(q(".intro-mark"), { scale: 0.55, opacity: 0, rotate: -8 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(2.2)" })
        .to(q(".intro-mark"), { yPercent: -30, opacity: 0, duration: 0.5, ease: "power3.in" }, "+=0.25")
        .to(q(".intro"), { yPercent: -100, duration: 1, ease: "expo.inOut" }, "<0.1")
        .call(() => intro?.remove())
        .from(q(".blob"), { scale: 0.3, opacity: 0, duration: 2, stagger: 0.18 }, "<0.25")
        .from(q(".hero-photo"), { yPercent: 38, scale: 0.9, opacity: 0, duration: 1.7 }, "<0.05")
        .from(q(".hero-char"), { yPercent: 135, rotate: 9, duration: 1.15, stagger: 0.05 }, "<0.2")
        .fromTo(q(".hero-line"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.out" }, "<0.5")
        .from(q(".hero-stop"), { scale: 0, duration: 0.6, ease: "back.out(3)", stagger: 0.25 }, "<0.45")
        .from(q(".hero-fade"), { y: 34, opacity: 0, duration: 1.1, stagger: 0.12 }, "<0.25")
        .from(q(".hero-chip"), { scale: 0, rotate: -35, opacity: 0, duration: 1, ease: "back.out(2.4)", stagger: 0.14 }, "<0.1");

      // ── Flottement des autocollants (sur l'enveloppe interne, indépendant de la parallaxe souris)
      q(".hero-chip").forEach((c, i) =>
        gsap.to(c, { y: i % 2 ? 9 : -9, duration: 2.4 + i * 0.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 3 })
      );

      q(".blob").forEach((b, i) =>
        gsap.to(b, { x: (i % 2 ? -1 : 1) * 70, y: (i === 1 ? 1 : -1) * 60, duration: 14 + i * 4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.5 })
      );

      // ── Parallaxe souris par couches de profondeur, lissée
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const layers = q("[data-depth]").map((n) => ({
          x: gsap.quickTo(n, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(n, "y", { duration: 1.2, ease: "power3.out" }),
          d: parseFloat((n as HTMLElement).dataset.depth || "0"),
        }));
        const move = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(nx * l.d);
            l.y(ny * l.d * 0.6);
          });
        };
        window.addEventListener("mousemove", move);
        cleanups.push(() => window.removeEventListener("mousemove", move));
      }

      // ── Scroll : le nom s'écarte derrière toi, le portrait glisse moins vite que la page
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: 0.7 };
      gsap.to(q(".w1"), { xPercent: -45, opacity: 0, ease: "none", scrollTrigger: st });
      gsap.to(q(".w2"), { xPercent: 45, opacity: 0, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-photo-wrap"), { yPercent: 9, scale: 1.05, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-ui"), { y: -50, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "55% top" } });
      gsap.to(q(".blob-wrap"), { yPercent: 25, ease: "none", scrollTrigger: st });
    }, el);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative h-[100svh] min-h-[620px] overflow-hidden [--ph:70svh] lg:[--ph:92svh] lg:[--sp:calc(var(--ph)*0.17+3.2rem)]">
      {/* ── Rideau d'intro ── */}
      <div className="intro fixed inset-0 z-[300] flex items-center justify-center" style={{ background: "var(--navy)", color: "#f5f1e8" }} aria-hidden="true">
        <span className="intro-mark font-display text-[clamp(7rem,28vw,20rem)] leading-none">EA</span>
      </div>
      <noscript><style>{".intro{display:none!important}"}</style></noscript>

      {/* ── Taches pastel ── */}
      <div className="blob-wrap pointer-events-none absolute inset-0" aria-hidden="true">
        <div data-depth="-60" className="absolute inset-0">
          <div className="blob" style={{ left: "-12vw", top: "-6vw", width: "55vw", height: "55vw", background: "var(--pink)" }} />
          <div className="blob" style={{ right: "-14vw", top: "22%", width: "50vw", height: "50vw", background: "var(--sky)" }} />
          <div className="blob" style={{ left: "32%", bottom: "-22vw", width: "46vw", height: "46vw", background: "var(--peach)", opacity: 0.9 }} />
        </div>
      </div>

      {/* ── Accroche ── */}
      <div className="hero-ui absolute inset-x-0 top-[5.6rem] z-[2] px-6 text-center lg:top-[6.2rem]">
        <div className="hero-fade"><Typewriter /></div>
      </div>

      {/* ── Nom : empilé sur mobile, de part et d'autre de la tête sur desktop ── */}
      <div
        data-depth="-26"
        className="absolute inset-x-0 top-[8.4rem] z-[1] flex flex-col items-center lg:top-[calc(100svh-var(--ph)*0.8)] lg:-translate-y-1/2 lg:grid lg:grid-cols-[1fr_var(--sp)_1fr] lg:items-center"
      >
        <h1 className="contents">
          <span className="w1 block font-display leading-[0.95] text-[min(17vw,11.5svh)] lg:col-start-1 lg:justify-self-end lg:text-[min(10.5vw,19svh)]" style={{ color: "var(--text)" }}>
            <Chars text="Evrard" />
          </span>
          <span className="w2 relative block font-display italic leading-[0.95] text-[min(17vw,11.5svh)] lg:col-start-3 lg:justify-self-start lg:text-[min(10.5vw,19svh)]" style={{ color: "var(--accent)" }}>
            <Chars text="André" />
            {/* Trait de « ligne » avec ses stations */}
            <span className="pointer-events-none absolute inset-x-0 bottom-[0.02em] block h-0" aria-hidden="true">
              <span className="hero-line absolute left-0 right-0 top-0 -mt-[2.5px] block h-[5px] origin-left rounded-full" style={{ background: "var(--l-b)" }} />
              {["0%", "50%", "100%"].map((l) => (
                <span key={l} className="hero-stop absolute top-0 -ml-[7px] -mt-[7px] block h-[14px] w-[14px] rounded-full" style={{ left: l, background: "var(--card)", border: "3px solid var(--ink)" }} />
              ))}
            </span>
          </span>
        </h1>
      </div>

      {/* ── Portrait détouré ── */}
      <div data-depth="12" className="absolute inset-x-0 bottom-0 z-[2] flex justify-center">
        <div className="hero-photo-wrap origin-bottom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gallery/evrard-portrait.webp"
            alt="Evrard André en costume"
            width={1080}
            height={1350}
            className="hero-photo block h-[var(--ph)] w-auto max-w-none origin-bottom"
            style={{ filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.22))" }}
            fetchPriority="high"
          />
        </div>
      </div>

      {/* ── Autocollants ── */}
      <div data-depth="40" className="pointer-events-none absolute inset-0 z-[3]">
        <div className="absolute left-3 top-[50%] -rotate-6 lg:left-[7%] lg:top-[52%]"><span className={`hero-chip block ${chip}`}><b className="badge-line" style={{ ["--c" as string]: "var(--l-a)" }}>A</b>Droit · Lyon 3</span></div>
        <div className="absolute right-3 top-[55%] rotate-6 lg:right-[6%] lg:top-[44%]"><span className={`hero-chip block ${chip}`}><b className="badge-line" style={{ ["--c" as string]: "var(--l-b)" }}>B</b>Parlement des Étudiants</span></div>
        <div className="absolute left-[8%] top-[66%] rotate-3 lg:left-[15%] lg:top-[72%]"><span className={`hero-chip block ${chip}`}><b className="badge-line" style={{ ["--c" as string]: "var(--l-c)" }}>C</b>Mobilités urbaines</span></div>
      </div>

      {/* ── Boutons ── */}
      <div className="hero-ui absolute inset-x-0 bottom-[4.6rem] z-[4] px-6 md:bottom-6">
        <div className="hero-fade flex flex-wrap items-center justify-center gap-3">
          <Magnetic><Link href="/cv" className="btn-pill">Voir le CV →</Link></Magnetic>
          <Magnetic><span className="[&>button]:bg-[var(--bg)]"><HeroPDFButton /></span></Magnetic>
        </div>
      </div>
    </section>
  );
}
