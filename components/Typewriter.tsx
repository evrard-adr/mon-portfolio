"use client";
import { useEffect, useState } from "react";

const words = [
  "le droit public.",
  "les transports en commun.",
  "les institutions.",
  "la communication politique.",
  "la mobilité urbaine.",
  "les politiques publiques.",
  "les réseaux sociaux.",
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
    <p className="font-body text-lg md:text-2xl font-medium leading-snug" style={{ color: "var(--text)" }}>
      J&apos;aime{" "}
      <span className="font-bold" style={{ color: "var(--accent)" }}>
        {displayed}
        <span className="animate-pulse" style={{ color: "var(--ink)" }}>|</span>
      </span>
    </p>
  );
}
