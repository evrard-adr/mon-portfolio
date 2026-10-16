"use client";
import { useState } from "react";

/** Changement de mot de passe (obligatoire à la première connexion). */
export default function PasswordForm({ forced = false, onDone }: { forced?: boolean; onDone?: () => void }) {
  const [oldPassword, setOld] = useState(forced ? "1234" : "");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setErr("");
    if (n1.length < 8) return setErr("8 caractères minimum.");
    if (n1 !== n2) return setErr("Les deux mots de passe ne correspondent pas.");
    setBusy(true);
    const r = await fetch("/api/admin/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ oldPassword, newPassword: n1 }) });
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (!r.ok) return setErr(j.error || "Erreur.");
    setOk(true);
    onDone?.();
  };

  const input = "w-full rounded-xl px-4 py-3 text-sm outline-none";
  const style = { border: "2px solid var(--ink, #0b1b4d)", background: "var(--card, #fff)", color: "var(--text, #0b1b4d)" } as const;

  if (ok) return <p className="rounded-xl p-4 text-sm font-bold" style={{ background: "var(--peach, #ffd6a5)", color: "#0b1b4d" }}>Mot de passe modifié ✓</p>;
  return (
    <div className="space-y-3">
      {!forced && <input type="password" className={input} style={style} placeholder="Mot de passe actuel" value={oldPassword} onChange={(e) => setOld(e.target.value)} />}
      <input type="password" className={input} style={style} placeholder="Nouveau mot de passe (8 caractères min.)" value={n1} onChange={(e) => setN1(e.target.value)} autoFocus={forced} />
      <input type="password" className={input} style={style} placeholder="Confirmer le nouveau mot de passe" value={n2} onChange={(e) => setN2(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
      {err && <p className="text-sm font-bold" style={{ color: "#d62850" }}>{err}</p>}
      <button type="button" onClick={submit} disabled={busy} className="btn-pill w-full justify-center">{busy ? "…" : forced ? "Créer mon mot de passe" : "Changer le mot de passe"}</button>
    </div>
  );
}
