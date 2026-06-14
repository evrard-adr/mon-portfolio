"use client";
import { useEffect, useState } from "react";

const words = [
  "le droit.",
  "les mobilités.",
  "l'environnement.",
  "l'urbanisme.",
  "les politiques publiques.",
  "le piano.",
  "la muscu.",
  "Lyon.",
];

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1400);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <p className="font-display font-bold text-2xl md:text-3xl leading-snug" style={{ color: "var(--text)" }}>
      J&apos;aime{" "}
      <span style={{ color: "var(--accent)" }}>
        {displayed}
        <span className="animate-pulse">|</span>
      </span>
    </p>
  );
}
