"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Part = { t: string; hl?: boolean };

/** Les mots s'allument un à un au fil du scroll. */
export default function ScrubText({ parts, className = "" }: { parts: Part[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("a11y-no-motion");
    if (reduced) {
      el.querySelectorAll(".hl-mark").forEach((m) => m.classList.add("on"));
      return;
    }
    const ctx = gsap.context(() => {
      const words = el.querySelectorAll(".sw");
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 48%", scrub: 0.5 } }
      );
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        onEnter: () => el.querySelectorAll(".hl-mark").forEach((m) => m.classList.add("on")),
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <h2 ref={ref} className={className}>
      {parts.map((p, i) => {
        const words = p.t.split(" ").map((w, j) => (
          <span key={j} className="sw inline-block">
            {w}&nbsp;
          </span>
        ));
        return p.hl ? (
          <span key={i} className="hl-mark">{words}</span>
        ) : (
          <span key={i}>{words}</span>
        );
      })}
    </h2>
  );
}
