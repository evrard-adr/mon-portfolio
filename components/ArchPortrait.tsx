export default function ArchPortrait({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[4/5] w-full ${className}`}>
      <div
        className="absolute bottom-0 left-[3%] right-[3%] top-[20%] overflow-hidden"
        style={{
          borderRadius: "999px 999px 0 0",
          background: "radial-gradient(120% 80% at 50% 8%, var(--arch-from) 0%, var(--arch-to) 72%)",
          boxShadow: "inset 0 0 0 1px var(--accent-border)",
        }}
      >
        <div className="absolute inset-[10px] border" style={{ borderRadius: "999px 999px 0 0", borderColor: "var(--accent-border)", opacity: 0.55 }} />
        <div className="absolute left-1/2 top-[18%] h-[55%] w-[70%] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(220,169,74,0.28), transparent 68%)", filter: "blur(18px)" }} />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/gallery/evrard-portrait.webp"
        alt="Portrait d'Evrard André en costume"
        width={1080}
        height={1350}
        className="absolute bottom-0 left-0 h-full w-full object-contain object-bottom"
        style={{ filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.35))" }}
      />
    </div>
  );
}
