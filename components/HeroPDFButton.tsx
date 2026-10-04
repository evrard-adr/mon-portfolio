export default function HeroPDFButton() {
  return (
    <a href="/cv-evrard-andre.pdf" download="CV-Evrard-Andre.pdf" className="btn-pill btn-ghost">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M12 4v11m0 0l-4-4m4 4l4-4M4 19h16" />
      </svg>
      CV PDF
    </a>
  );
}
