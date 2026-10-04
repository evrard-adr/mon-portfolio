export default function CVPrintButton() {
  return (
    <a href="/cv-evrard-andre.pdf" download="CV-Evrard-Andre.pdf" className="btn-pill print:hidden" style={{ padding: ".55rem 1.1rem", fontSize: ".75rem" }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M12 4v11m0 0l-4-4m4 4l4-4M4 19h16" />
      </svg>
      Télécharger le PDF
    </a>
  );
}
