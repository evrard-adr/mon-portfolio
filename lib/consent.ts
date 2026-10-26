// Format du cookie « pf_consent » : a<0|1>e<0|1>   (a = mesure d'audience, e = comportement de lecture)
// Anciennes valeurs « accept » / « refuse » toujours comprises.
export type Consent = { aud: boolean; evt: boolean };

export function parseConsent(v?: string | null): Consent | null {
  if (!v) return null;
  if (v === "accept") return { aud: true, evt: true };
  if (v === "refuse") return { aud: false, evt: false };
  const m = v.match(/^a([01])e([01])$/);
  if (!m) return null;
  const aud = m[1] === "1";
  return { aud, evt: aud && m[2] === "1" };
}

export const encodeConsent = (c: Consent) => `a${c.aud ? 1 : 0}e${c.aud && c.evt ? 1 : 0}`;
