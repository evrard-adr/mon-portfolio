"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  slowOnHover?: boolean;
  className?: string;
}

/** Défilement infini dont la vitesse réagit à la vitesse de scroll (et s'inverse en remontant). */
export default function Marquee({ children, duration = 60, reverse = false, slowOnHover = false, className = "" }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = track.current;
    const box = wrap.current;
    if (!el || !box) return;
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("a11y-no-motion");
    if (reduced) {
      box.style.overflowX = "auto";
      return;
    }
    const dir = reverse ? 1 : -1;
    const ctx = gsap.context(() => {
      const tween = gsap.to(el, { xPercent: dir * 50, duration, ease: "none", repeat: -1 });
      if (reverse) tween.progress(1).progress(0);
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-9, 9, self.getVelocity() / 260);
          tween.timeScale(1 + v);
          gsap.to(tween, { timeScale: 1, duration: 1.2, ease: "power3.out", overwrite: true });
        },
      });
      if (slowOnHover) {
        box.addEventListener("mouseenter", () => gsap.to(tween, { timeScale: 0.12, duration: 0.6, overwrite: true }));
        box.addEventListener("mouseleave", () => gsap.to(tween, { timeScale: 1, duration: 0.8, overwrite: true }));
      }
    }, box);
    return () => ctx.revert();
  }, [duration, reverse, slowOnHover]);

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max will-change-transform">
        {[0, 1].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i === 1}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
