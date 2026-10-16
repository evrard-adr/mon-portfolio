import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { adminToken } from "@/lib/auth";
import { rpc } from "@/lib/stats";

export const dynamic = "force-dynamic";

const refresh = (slug?: string) => {
  revalidateTag("articles");
  ["/reflexion", "/sitemap.xml", "/rss.xml", "/"].forEach((p) => revalidatePath(p));
  if (slug) revalidatePath(`/reflexion/${slug}`);
};

export async function GET() {
  const token = await adminToken();
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await rpc("portfolio_articles_admin", { p_key: token, p_action: "list", p_args: {} }));
  } catch (e) {
    return NextResponse.json({ error: "Lecture impossible", detail: String(e).slice(0, 160) }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  const token = await adminToken();
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const slug = String(b.slug || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 80);
  if (b.action === "delete") {
    try {
      await rpc("portfolio_articles_admin", { p_key: token, p_action: "delete", p_args: { slug } });
      refresh(slug);
      return NextResponse.json({ ok: true });
    } catch (e) {
      return NextResponse.json({ error: "Suppression impossible" }, { status: 502 });
    }
  }
  if (slug.length < 3 || !String(b.titre || "").trim()) return NextResponse.json({ error: "Titre et adresse (3 caractères min.) requis." }, { status: 400 });
  const contenu = Array.isArray(b.contenu)
    ? b.contenu.filter((x: any) => x && ["paragraph", "heading", "quote"].includes(x.type) && typeof x.text === "string" && x.text.trim()).map((x: any) => ({ type: x.type, text: x.text.slice(0, 5000) }))
    : [];
  try {
    const row = await rpc("portfolio_articles_admin", {
      p_key: token, p_action: "upsert",
      p_args: {
        slug, titre: String(b.titre).slice(0, 200), tag: String(b.tag || "").slice(0, 60), chapeau: String(b.chapeau || "").slice(0, 1500),
        contenu, date_label: String(b.date_label || "").slice(0, 40), date_iso: b.date_iso || null, published: b.published === true,
      },
    });
    refresh(slug);
    return NextResponse.json({ ok: true, row });
  } catch (e) {
    return NextResponse.json({ error: "Enregistrement impossible", detail: String(e).slice(0, 160) }, { status: 502 });
  }
}
