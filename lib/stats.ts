// Accès à la base de statistiques (schéma isolé « portfolio » dans Supabase).
// L'URL et la clé « publishable » sont publiques par conception : les tables ne sont pas exposées,
// seules deux fonctions le sont (enregistrer une visite ; lire les stats avec une clé secrète).
const URL_ = process.env.STATS_SUPABASE_URL || "https://okceryxzpmepbbqecpic.supabase.co";
const KEY = process.env.STATS_SUPABASE_KEY || "sb_publishable_vfN4Vkwj4VtkNPfuDv_lYg__VMbn1jf";

export async function rpc<T = unknown>(
  fn: string,
  body: Record<string, unknown>,
  cacheOpts?: { revalidate: number; tags?: string[] }
): Promise<T> {
  const res = await fetch(`${URL_}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { apikey: KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...(cacheOpts ? { next: cacheOpts } : { cache: "no-store" as const }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`rpc ${fn} ${res.status} ${text.slice(0, 200)}`);
  }
  const txt = await res.text();
  return (txt ? JSON.parse(txt) : null) as T;
}

export const readKey = () => process.env.ANALYTICS_SALT || "pf-salt-v1";
