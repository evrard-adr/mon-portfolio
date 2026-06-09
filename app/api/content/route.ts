import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";

export async function GET() {
  return NextResponse.json(getContent());
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  saveContent(data);
  return NextResponse.json({ ok: true });
}
