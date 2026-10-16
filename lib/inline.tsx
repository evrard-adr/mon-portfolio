import type { ReactNode } from "react";

/** Mise en forme minimale et sûre : **gras**, *italique*, [texte](https://lien). Aucun HTML n'est interprété. */
export function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\((?:https?:\/\/|\/|mailto:)[^)\s]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={i++} style={{ color: "var(--text)", fontWeight: 600 }}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith("*")) out.push(<em key={i++}>{t.slice(1, -1)}</em>);
    else {
      const mm = t.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (mm) {
        const external = /^https?:/.test(mm[2]);
        out.push(
          <a key={i++} href={mm[2]} className="underline underline-offset-4" style={{ color: "var(--accent)" }}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{mm[1]}</a>
        );
      }
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
