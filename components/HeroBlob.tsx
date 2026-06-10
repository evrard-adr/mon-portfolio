"use client";

export default function HeroBlob() {
  return (
    <div className="hero-bg-blobs" aria-hidden="true">
      <div className="hblob hblob--a" />
      <div className="hblob hblob--b" />
      <div className="hblob hblob--c" />
      <div className="hblob hblob--d" />
      {/* Noise overlay pour texture */}
      <div className="hblob-noise" />
    </div>
  );
}
