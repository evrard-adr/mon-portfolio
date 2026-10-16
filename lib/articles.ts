import { getContent } from "@/lib/content";
import { rpc } from "@/lib/stats";

export type Bloc = { type: "paragraph" | "heading" | "quote"; text: string };
export type Article = {
  slug: string; titre: string; tag?: string | null; chapeau: string; contenu: Bloc[];
  date?: string | null; dateISO?: string | null; draft?: boolean;
};

const words = (a: Article) => (a.chapeau + " " + a.contenu.map((b) => b.text).join(" ")).trim().split(/\s+/).length;
export const readingMinutes = (a: Article) => Math.max(1, Math.round(words(a) / 210));

/** Articles publiés en base (écrits depuis l'admin) + articles historiques du site. */
export async function getArticles(): Promise<Article[]> {
  const statics = (((getContent() as any).reflexions ?? []) as Article[]).map((a) => ({ ...a }));
  let db: Article[] = [];
  try {
    db = (await rpc<Article[]>("portfolio_articles", {}, { revalidate: 30, tags: ["articles"] })) || [];
  } catch {}
  const slugs = new Set(db.map((a) => a.slug));
  return [...db, ...statics.filter((a) => !slugs.has(a.slug))];
}

export async function getArticle(slug: string, adminKey?: string | null): Promise<Article | null> {
  const found = (await getArticles()).find((a) => a.slug === slug);
  if (found) return found;
  if (!adminKey) return null;
  try {
    const all = await rpc<any[]>("portfolio_articles_admin", { p_key: adminKey, p_action: "list", p_args: {} });
    const r = all.find((a) => a.slug === slug);
    if (!r) return null;
    return { slug: r.slug, titre: r.titre, tag: r.tag, chapeau: r.chapeau, contenu: r.contenu, date: r.date_label, dateISO: r.date_iso, draft: !r.published };
  } catch {
    return null;
  }
}
