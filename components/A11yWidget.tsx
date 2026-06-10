"use client";

import { useState, useEffect } from "react";

type Feature = {
  key: string;
  label: string;
  cls: string;
};

const FEATURES: Feature[] = [
  { key: "a11y-dyslexia",   label: "Police dyslexie",     cls: "a11y-dyslexia" },
  { key: "a11y-large-text", label: "Texte plus grand",    cls: "a11y-large-text" },
  { key: "a11y-no-motion",  label: "Réduire animations",  cls: "a11y-no-motion" },
  { key: "a11y-contrast",   label: "Fort contraste",      cls: "a11y-contrast" },
];

export default function A11yWidget() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Record<string, boolean>>({});

  // Restore from localStorage on mount
  useEffect(() => {
    const state: Record<string, boolean> = {};
    FEATURES.forEach(({ key, cls }) => {
      const stored = localStorage.getItem(key) === "1";
      state[key] = stored;
      if (stored) document.documentElement.classList.add(cls);
    });
    setActive(state);
  }, []);

  const toggle = (f: Feature) => {
    const next = !active[f.key];
    setActive(prev => ({ ...prev, [f.key]: next }));
    if (next) {
      document.documentElement.classList.add(f.cls);
      localStorage.setItem(f.key, "1");
    } else {
      document.documentElement.classList.remove(f.cls);
      localStorage.removeItem(f.key);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
      {/* Panel */}
      {open && (
        <div style={{
          backgroundColor: "var(--bg2)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "16px",
          width: "220px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}>
          <p style={{ color: "var(--text-muted)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "4px" }}>
            Accessibilité
          </p>
          {FEATURES.map(f => (
            <button
              key={f.key}
              onClick={() => toggle(f)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                borderRadius: "10px",
                border: `1px solid ${active[f.key] ? "var(--accent-border)" : "var(--border)"}`,
                backgroundColor: active[f.key] ? "var(--accent-glow)" : "var(--bg)",
                color: active[f.key] ? "var(--accent)" : "var(--text-muted)",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
                textAlign: "left",
              }}
            >
              <span>{f.label}</span>
              <span style={{
                width: "28px", height: "16px", borderRadius: "8px",
                backgroundColor: active[f.key] ? "var(--accent)" : "var(--border)",
                display: "flex", alignItems: "center",
                padding: "2px",
                transition: "background-color 0.2s",
                flexShrink: 0,
              }}>
                <span style={{
                  width: "12px", height: "12px", borderRadius: "50%",
                  backgroundColor: "#fff",
                  transform: active[f.key] ? "translateX(12px)" : "translateX(0)",
                  transition: "transform 0.2s",
                  display: "block",
                }} />
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Paramètres d'accessibilité"
        style={{
          width: "44px", height: "44px", borderRadius: "50%",
          backgroundColor: open ? "var(--accent)" : "var(--bg2)",
          border: `1px solid ${open ? "var(--accent)" : "var(--border)"}`,
          color: open ? "var(--bg)" : "var(--text-muted)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          transition: "all 0.2s",
          flexShrink: 0,
        }}
      >
        {/* Wheelchair / person SVG icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="4" r="2"/>
          <path d="M12 6v6l3 3"/>
          <path d="M9 12H6l-2 5"/>
          <path d="M16 17a4 4 0 1 1-8 0"/>
        </svg>
      </button>
    </div>
  );
}
