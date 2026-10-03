import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const alt = "Evrard André — Droit public, communication, transports en commun";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (w: number) =>
  fs.readFileSync(path.join(process.cwd(), "node_modules/@fontsource/bricolage-grotesque/files", `bricolage-grotesque-latin-${w}-normal.woff`));

export default function Image() {
  const portrait = `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), "assets/og-portrait.png")).toString("base64")}`;
  const NAVY = "#0b1b4d";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#f5f1e8", fontFamily: "Bricolage" }}>
        {/* taches pastel */}
        <div style={{ position: "absolute", left: -180, top: -220, width: 760, height: 760, borderRadius: 760, background: "radial-gradient(circle, rgba(255,194,209,0.95) 0%, rgba(255,194,209,0) 70%)", display: "flex" }} />
        <div style={{ position: "absolute", right: -120, top: 40, width: 700, height: 700, borderRadius: 700, background: "radial-gradient(circle, rgba(188,215,255,0.95) 0%, rgba(188,215,255,0) 70%)", display: "flex" }} />
        <div style={{ position: "absolute", left: 380, bottom: -300, width: 640, height: 640, borderRadius: 640, background: "radial-gradient(circle, rgba(255,214,165,0.9) 0%, rgba(255,214,165,0) 70%)", display: "flex" }} />

        {/* portrait */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={portrait} width={504} height={630} style={{ position: "absolute", right: 70, bottom: 0, objectFit: "contain" }} alt="" />

        {/* texte */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 72, width: 740 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: NAVY, opacity: 0.75, marginBottom: 14 }}>Portfolio</div>
          <div style={{ display: "flex", fontSize: 168, fontWeight: 800, color: NAVY, lineHeight: 0.9, letterSpacing: -4 }}>Evrard</div>
          <div style={{ display: "flex", flexDirection: "column", position: "relative", alignSelf: "flex-start" }}>
            <div style={{ display: "flex", fontSize: 168, fontWeight: 800, color: "#d62850", lineHeight: 0.9, letterSpacing: -4 }}>André</div>
            <div style={{ display: "flex", position: "absolute", left: 0, right: 0, bottom: -6, height: 0 }}>
              <div style={{ display: "flex", position: "absolute", left: 0, right: 0, top: -4, height: 9, borderRadius: 9, background: "#2f6bff" }} />
              {[0, 50, 100].map((p) => (
                <div key={p} style={{ display: "flex", position: "absolute", left: `${p}%`, top: -13, marginLeft: -13, width: 26, height: 26, borderRadius: 26, background: "#fff", border: `6px solid ${NAVY}` }} />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 46, fontSize: 36, fontWeight: 600, color: NAVY }}>Droit public · Communication · Transports en commun</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: font(600), weight: 600, style: "normal" },
        { name: "Bricolage", data: font(800), weight: 800, style: "normal" },
      ],
    }
  );
}
