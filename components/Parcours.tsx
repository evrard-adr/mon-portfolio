"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Etape = { date: string; titre: string; lieu: string; desc: string };

const COLORS = ["var(--l-a)", "var(--l-b)", "var(--l-c)", "var(--l-d)"];

/** Parcours présenté comme une ligne de métro : le trait se dessine au scroll, chaque station s'allume. */
export default function Parcours({ etapes }: { etapes: Etape[] }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("a11y-no-motion");
    if (reduced) return; // sans JS d'animation : tout reste visible (voir CSS)
    el.classList.add("parcours-js");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector(".parcours-fill"),
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 62%", end: "bottom 72%", scrub: 0.4 } }
      );
      el.querySelectorAll<HTMLElement>(".parcours-item").forEach((it) => {
        ScrollTrigger.create({
          trigger: it,
          start: "top 70%",
          onEnter: () => it.classList.add("on"),
          onLeaveBack: () => it.classList.remove("on"),
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="parcours relative">
      {/* La ligne */}
      <div className="absolute bottom-0 left-[19px] top-0 w-[6px] -translate-x-1/2 rounded-full md:left-1/2" style={{ background: "var(--border)" }} aria-hidden="true">
        <div
          className="parcours-fill absolute inset-0 origin-top rounded-full"
          style={{ background: "linear-gradient(var(--l-a), var(--l-b), var(--l-c), var(--l-d))" }}
        />
      </div>

      {etapes.map((e, i) => {
        const right = i % 2 === 0;
        const last = i === etapes.length - 1;
        return (
          <div
            key={i}
            className={`parcours-item relative pb-12 pl-[58px] md:grid md:grid-cols-2 md:gap-24 md:pl-0 ${last ? "pb-0" : ""}`}
            style={{ ["--c" as string]: COLORS[i % 4] }}
          >
            {/* Station */}
            <div className="absolute left-[19px] top-1 -translate-x-1/2 md:left-1/2" aria-hidden="true">
              <span className="st badge-line grid text-base" style={{ width: 38, height: 38, boxShadow: "0 0 0 4px var(--bg)" }}>
                {last ? "★" : String.fromCharCode(65 + (i % 4))}
              </span>
            </div>

            <div className={`pc ${right ? "md:col-start-2" : "md:col-start-1 md:row-start-1 md:text-right"}`}>
              {last ? (
                <div className="card-brut inline-block p-6" style={{ background: "var(--peach)", color: "#0b1b4d" }}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ opacity: 0.7 }}>{e.date}</p>
                  <h3 className="font-display mt-1 text-2xl leading-tight md:text-3xl">{e.titre}</h3>
                  <p className="mt-2 max-w-sm text-sm font-medium leading-snug" style={{ opacity: 0.8 }}>{e.desc}</p>
                </div>
              ) : (
                <>
                  <span className="sticker px-3 py-1 text-[11px] uppercase tracking-widest">{e.date}</span>
                  <h3 className="font-display mt-3 text-2xl leading-tight md:text-3xl">{e.titre}</h3>
                  <p className="mt-1 text-sm font-bold" style={{ color: "var(--text-muted)" }}>{e.lieu}</p>
                  <p className={`mt-2 max-w-md text-sm font-medium leading-relaxed ${right ? "" : "md:ml-auto"}`} style={{ color: "var(--text-muted)" }}>{e.desc}</p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
