"use client";

export default function HeroBlob() {
  return (
    <div className="hero-blob-wrap" aria-hidden="true">
      {/* Blob principal — morphing liquide */}
      <div className="hero-blob hero-blob--main" />
      {/* Blob secondaire — décalé en phase */}
      <div className="hero-blob hero-blob--secondary" />
      {/* Blob accent — petit, rapide */}
      <div className="hero-blob hero-blob--accent" />
    </div>
  );
}
