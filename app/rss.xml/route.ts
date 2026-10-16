import { getArticles } from "@/lib/articles";
import { SITE, NAME } from "@/lib/seo";

export const dynamic = "force-dynamic";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const items = (await getArticles())
    .map((a) => `<item><title>${esc(a.titre)}</title><link>${SITE}/reflexion/${a.slug}</link><guid>${SITE}/reflexion/${a.slug}</guid>${a.dateISO ? `<pubDate>${new Date(a.dateISO).toUTCString()}</pubDate>` : ""}<description>${esc(a.chapeau)}</description></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${NAME} — Réflexions</title><link>${SITE}/reflexion</link><description>Notes sur la politique, les politiques publiques et les transports en commun.</description><language>fr-FR</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
