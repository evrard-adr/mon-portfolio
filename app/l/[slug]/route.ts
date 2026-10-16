import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEST: Record<string, string> = { home: "/", cv: "/cv", about: "/about", reflexion: "/reflexion", contact: "/contact" };

// Lien court suivi : /l/linkedin → /?r=linkedin   (option : /l/linkedin?to=cv → /cv?r=linkedin)
export function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const tag = params.slug.toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 60);
  const to = DEST[req.nextUrl.searchParams.get("to") || "home"] || "/";
  const url = new URL(to, req.url);
  if (tag) url.searchParams.set("r", tag);
  const res = NextResponse.redirect(url, 302);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  return res;
}
