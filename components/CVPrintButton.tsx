"use client";

export default function CVPrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="btn-pill print:hidden" style={{ padding: ".55rem 1.1rem", fontSize: ".75rem" }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
        <path d="M12 16l-4-4h3V4h2v8h3l-4 4z"/>
        <path d="M4 16v4h16v-4"/>
      </svg>
      Exporter PDF
    </button>
  );
}
