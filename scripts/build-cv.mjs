// Génère public/cv-evrard-andre.pdf à partir de data/content.json (Chrome headless).
// Usage : node scripts/build-cv.mjs
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import QRCode from "qrcode";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "data/content.json"), "utf8"));
const { cv, about } = data;
const SITE = "https://evrard-andre.vercel.app";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const font = (pkg, file) => pathToFileURL(path.join(root, "node_modules/@fontsource", pkg, "files", file)).href;
const portrait = "data:image/png;base64," + fs.readFileSync(path.join(root, "assets/og-portrait.png")).toString("base64");
const qr = await QRCode.toString(SITE, { type: "svg", margin: 0, color: { dark: "#0b1b4d", light: "#0000" } });
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

const COLORS = ["#e63462", "#2f6bff", "#ff9d2e", "#17b26a"];

const groups = [
  ["Droit & politiques publiques", ["Droit public", "Rédaction juridique", "Analyse des politiques publiques", "Droit civil"]],
  ["Communication", ["Communication institutionnelle", "Réseaux sociaux & identité visuelle", "Éléments de langage & discours", "Relations presse", "Gestion de projet associatif"]],
  ["Outils", ["Canva", "CapCut", "Adobe Premiere Pro"]],
  ["Langues", ["Anglais · C1 (Cambridge)"]],
  ["Mobilité", ["Transports en commun & mobilité urbaine"]],
];

const exps = cv.experiences
  .map(
    (e, i) => `
    <div class="exp" style="--c:${COLORS[i % 4]}">
      <span class="dot"></span>
      <p class="when">${esc(e.annee)}</p>
      <h3>${esc(e.titre)}</h3>
      <p class="role">${esc(e.role)}</p>
      <p class="desc">${esc(e.description)}</p>
    </div>`
  )
  .join("");

const forms = cv.formations
  .map((f) => `<div class="form"><p class="when">${esc(f.annee)}</p><h3>${esc(f.titre)}</h3><p class="role">${esc(f.etablissement)}</p><p class="desc">${esc(f.description)}</p></div>`)
  .join("");

const skills = groups
  .map(([t, items]) => `<div class="grp"><p class="gt">${esc(t)}</p><div class="chips">${items.map((i) => `<span>${esc(i)}</span>`).join("")}</div></div>`)
  .join("");

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Evrard André — CV</title>
<style>
@font-face{font-family:Bric;font-weight:800;src:url(${font("bricolage-grotesque", "bricolage-grotesque-latin-800-normal.woff")})}
@font-face{font-family:Bric;font-weight:600;src:url(${font("bricolage-grotesque", "bricolage-grotesque-latin-600-normal.woff")})}
@font-face{font-family:DM;font-weight:400;src:url(${font("dm-sans", "dm-sans-latin-400-normal.woff")})}
@font-face{font-family:DM;font-weight:500;src:url(${font("dm-sans", "dm-sans-latin-500-normal.woff")})}
@font-face{font-family:DM;font-weight:700;src:url(${font("dm-sans", "dm-sans-latin-700-normal.woff")})}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html,body{width:210mm;height:297mm;background:#f5f1e8;font-family:DM,sans-serif;color:#0b1b4d;font-size:8.6pt;line-height:1.38}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;display:flex;flex-direction:column}
header{flex:none;background:#0b1b4d;color:#f5f1e8;padding:10mm 13mm 6.5mm;position:relative;overflow:hidden}
header:before,header:after{content:"";position:absolute;border-radius:50%;filter:blur(30px)}
header:before{width:90mm;height:90mm;right:-20mm;top:-40mm;background:#2f6bff;opacity:.45}
header:after{width:70mm;height:70mm;left:40mm;bottom:-50mm;background:#e63462;opacity:.35}
.hrow{position:relative;display:flex;justify-content:space-between;align-items:flex-end;gap:8mm}
h1{font-family:Bric;font-weight:800;font-size:40pt;line-height:.9;letter-spacing:-.02em}
h1 em{font-style:normal;color:#ff8aa6}
.sub{margin-top:4mm;font-size:10pt;font-weight:500;opacity:.9}
.line{margin-top:4.5mm;display:flex;align-items:center;width:62mm}
.line i{flex:1;height:2.2mm;background:#2f6bff;border-radius:2mm}
.line b{width:4mm;height:4mm;border-radius:50%;background:#f5f1e8;border:.9mm solid #0b1b4d;margin:0 -.3mm}
.photo{width:31mm;height:31mm;border-radius:50%;overflow:hidden;background:#cfe0ff;border:.8mm solid #f5f1e8;flex:none}
.photo img{width:100%;height:100%;object-fit:cover;object-position:50% 0;transform:scale(2.1);transform-origin:50% 17%}
.contact{position:relative;margin-top:4.5mm;row-gap:1mm;display:flex;gap:6mm;font-size:8pt;flex-wrap:wrap;opacity:.95}
.contact span:before{content:"";display:inline-block;width:1.6mm;height:1.6mm;border-radius:50%;background:#ff9d2e;margin-right:1.6mm}
.main{flex:1;display:grid;grid-template-columns:1fr 62mm;gap:9mm;padding:6mm 13mm 0}
h2{font-family:Bric;font-weight:800;font-size:11.5pt;letter-spacing:-.01em;margin-bottom:3.5mm;display:flex;align-items:center;gap:2mm}
h2:before{content:"";width:4.5mm;height:1.1mm;border-radius:1mm;background:#e63462}
.profil{font-size:8.7pt;line-height:1.4;margin-bottom:4.5mm}
.timeline{position:relative;padding-left:6mm;margin-bottom:4.5mm}
.timeline:before{content:"";position:absolute;left:1.35mm;top:1.5mm;bottom:2mm;width:.9mm;background:linear-gradient(#e63462,#2f6bff,#ff9d2e,#17b26a);border-radius:1mm}
.exp{position:relative;margin-bottom:3mm;break-inside:avoid}
.dot{position:absolute;left:-6mm;top:.7mm;width:3.6mm;height:3.6mm;border-radius:50%;background:#fff;border:.8mm solid var(--c)}
.when{font-size:7.2pt;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#d62850}
h3{font-family:Bric;font-weight:600;font-size:10pt;line-height:1.15}
.role{font-weight:500;opacity:.75;font-size:8pt}
.desc{margin-top:.8mm;font-size:8pt;opacity:.88}
.form{margin-bottom:2.2mm}
aside{padding-top:0}
.box{background:#fff;border:.5mm solid #0b1b4d;border-radius:4mm;padding:4mm;margin-bottom:4mm;box-shadow:1.2mm 1.2mm 0 #0b1b4d}
.grp{margin-bottom:2.6mm}.grp:last-child{margin-bottom:0}
.gt{font-size:7pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.6;margin-bottom:1.2mm}
.chips{display:flex;flex-wrap:wrap;gap:1.2mm}
.chips span{font-size:7.6pt;font-weight:500;background:#cfe0ff;border-radius:3mm;padding:.7mm 2.2mm}
.qr{display:flex;gap:3.5mm;align-items:center}
.qr svg{width:21mm;height:21mm;flex:none}
.qr p{font-size:7.6pt;line-height:1.3}.qr b{font-family:Bric;font-size:9.5pt;display:block;margin-bottom:.6mm}
.int{font-size:8pt;line-height:1.5}
footer{flex:none;padding:2mm 13mm 5mm;font-size:7pt;opacity:.55;display:flex;justify-content:space-between}
</style></head><body><div class="page">
<header>
  <div class="hrow">
    <div>
      <h1>Evrard <em>André</em></h1>
      <p class="sub">Étudiant en droit public · Communication · Transports en commun</p>
      <div class="line"><b></b><i></i><b></b><i></i><b></b></div>
    </div>
    <div class="photo"><img src="${portrait}" alt=""></div>
  </div>
  <div class="contact">
    <span>${esc(about.email)}</span><span>${esc(about.phone)}</span><span>@evrardadr</span>
    ${cv.infosPersonnelles?.adresse ? `<span>${esc(cv.infosPersonnelles.adresse)}</span>` : ""}${cv.infosPersonnelles?.dateNaissance ? `<span>Né le ${esc(cv.infosPersonnelles.dateNaissance)}</span>` : ""}
  </div>
</header>
<div class="main">
  <section>
    <p class="profil">Étudiant en droit à Lyon 3, passionné de droit public et de science politique. Responsable communication du Parlement des Étudiants, j'écris, j'analyse et je sais faire passer un message : réseaux sociaux, éléments de langage, discours. Usager quotidien des transports en commun, je m'intéresse à la façon dont on les pense et on les fait évoluer. Je veux mettre ces compétences au service des élus et de l'action publique.</p>
    <h2>Expériences</h2>
    <div class="timeline">${exps}</div>
    <h2>Formation</h2>
    ${forms}
  </section>
  <aside>
    <div class="box"><h2>Compétences</h2>${skills}</div>
    <div class="box"><h2>Intérêts</h2><p class="int">${cv.interets.map(esc).join(" · ")}</p></div>
    <div class="box qr">${qr}<p><b>Mon portfolio</b>Créations, parcours, réflexions : scannez ou rendez-vous sur<br>${SITE.replace("https://", "")}</p></div>
  </aside>
</div>
<footer><span>Evrard André — CV</span><span>${SITE.replace("https://", "")}</span></footer>
</div></body></html>`;

const tmp = path.join(process.env.CV_TMP || os.tmpdir(), "cv-build.html");
fs.writeFileSync(tmp, html);
const out = path.join(root, "public/cv-evrard-andre.pdf");
execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=4000", `--print-to-pdf=${out}`, pathToFileURL(tmp).href], { stdio: "ignore" });
console.log("PDF écrit :", out, fs.statSync(out).size, "octets");
