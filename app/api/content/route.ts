import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/lib/content";

export async function GET() {
  return NextResponse.json(getContent());
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Sur Vercel : sauvegarde via l'API GitHub (déclenche un redéploiement auto)
  if (process.env.GITHUB_TOKEN) {
    try {
      const repo = "evrard-adr/mon-portfolio";
      const path = "data/content.json";
      const token = process.env.GITHUB_TOKEN;

      // Récupérer le SHA actuel du fichier (requis pour la mise à jour)
      const fileRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        headers: { Authorization: `token ${token}`, "User-Agent": "portfolio-admin" },
      });
      const fileData = await fileRes.json();

      // Mettre à jour le fichier
      await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "portfolio-admin",
        },
        body: JSON.stringify({
          message: "update: contenu via admin",
          content: Buffer.from(JSON.stringify(data, null, 2)).toString("base64"),
          sha: fileData.sha,
        }),
      });

      return NextResponse.json({ ok: true, mode: "github" });
    } catch (e) {
      return NextResponse.json({ error: "GitHub save failed" }, { status: 500 });
    }
  }

  // En local : écriture directe sur le disque
  const { saveContent } = await import("@/lib/content-write");
  saveContent(data);
  return NextResponse.json({ ok: true, mode: "local" });
}
