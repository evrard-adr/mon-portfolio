// Classe l'origine d'une visite à partir du site référent et de l'étiquette du lien (?r= / /l/…).
const SEARCH: Record<string, string> = { google: "Google", bing: "Bing", duckduckgo: "DuckDuckGo", ecosia: "Ecosia", qwant: "Qwant", yahoo: "Yahoo", brave: "Brave Search" };
const SOCIAL: [RegExp, string][] = [
  [/(^|\.)linkedin\.com$|^lnkd\.in$/, "LinkedIn"],
  [/(^|\.)instagram\.com$/, "Instagram"],
  [/(^|\.)facebook\.com$|^fb\.com$|^fb\.me$/, "Facebook"],
  [/^t\.co$|(^|\.)twitter\.com$|(^|\.)x\.com$/, "X"],
  [/(^|\.)youtube\.com$|^youtu\.be$/, "YouTube"],
  [/(^|\.)tiktok\.com$/, "TikTok"],
  [/^wa\.me$|(^|\.)whatsapp\.com$/, "WhatsApp"],
  [/(^|\.)snapchat\.com$/, "Snapchat"],
  [/(^|\.)reddit\.com$/, "Reddit"],
];
const OTHER: [RegExp, string][] = [
  [/^paa\.ge$/, "paa.ge"],
  [/(^|\.)linktr\.ee$/, "Linktree"],
  [/(^|\.)parlementdesetudiants\.fr$|(^|\.)parlementetudiantsdelyon\.fr$/, "Site du Parlement des Étudiants"],
  [/(^|\.)mail\.google\.com$|(^|\.)outlook\.(live|office)\.com$|(^|\.)mail\.yahoo\.com$/, "Messagerie web"],
];
const TAGS: Record<string, [string, string]> = {
  linkedin: ["LinkedIn", "social"], instagram: ["Instagram", "social"], x: ["X", "social"], paage: ["paa.ge", "link"],
  mail: ["E-mail", "mail"], "cv-pdf": ["QR code du CV", "link"], "pe-lyon": ["Instagram", "social"], "pe-national": ["Instagram", "social"],
};

export function classifySource(refDomain?: string | null, tag?: string | null): { platform?: string; type: string } {
  const d = (refDomain || "").toLowerCase();
  if (d) {
    const s = d.split(".");
    const base = s.length >= 2 ? s[s.length - 2] : d;
    if (SEARCH[base] && /^(www\.)?(google|bing|duckduckgo|ecosia|qwant|search\.yahoo|search\.brave)/.test(d)) return { platform: SEARCH[base], type: "search" };
    if (SEARCH[base]) return { platform: SEARCH[base], type: "search" };
    for (const [re, name] of SOCIAL) if (re.test(d)) return { platform: name, type: "social" };
    for (const [re, name] of OTHER) if (re.test(d)) return { platform: name, type: name === "Messagerie web" ? "mail" : "link" };
  }
  if (tag && TAGS[tag]) return { platform: TAGS[tag][0], type: TAGS[tag][1] };
  if (d) return { platform: d, type: "other" };
  return { type: tag ? "link" : "direct" };
}
