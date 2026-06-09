"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "ok") setAuthed(true);
  }, []);

  const login = async () => {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      sessionStorage.setItem("admin_auth", "ok");
      setAuthed(true);
      loadContent();
    } else {
      setError("Mot de passe incorrect.");
    }
  };

  const loadContent = async () => {
    const res = await fetch("/api/content");
    const data = await res.json();
    setContent(data);
  };

  useEffect(() => { if (authed) loadContent(); }, [authed]);

  const save = async () => {
    setSaving(true);
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (path: string[], value: string) => {
    setContent((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
      obj[path[path.length - 1]] = value;
      return next;
    });
  };

  const updateArray = (path: string, index: number, field: string, value: string) => {
    setContent((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[path][index][field] = value;
      return next;
    });
  };

  const addItem = (path: string, template: object) => {
    setContent((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[path] = [...next[path], template];
      return next;
    });
  };

  const removeItem = (path: string, index: number) => {
    setContent((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[path] = next[path].filter((_: any, i: number) => i !== index);
      return next;
    });
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="font-serif text-3xl text-[#f0ebe3] mb-2">Administration</h1>
          <p className="text-[#6b6b6b] text-sm mb-8">Accès réservé</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="Mot de passe"
            className="w-full bg-[#111111] border border-[#1e1e1e] text-[#f0ebe3] px-4 py-3 rounded-xl mb-3 focus:outline-none focus:border-[#c9a96e] transition-colors"
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            onClick={login}
            className="w-full bg-[#c9a96e] text-[#0a0a0a] py-3 rounded-xl font-medium hover:bg-[#d4b87a] transition-colors"
          >
            Entrer
          </button>
        </div>
      </div>
    );
  }

  if (!content) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#c9a96e] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const tabs = ["hero", "about", "socials", "cv"];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0ebe3]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur border-b border-[#1e1e1e] px-8 py-4 flex items-center justify-between">
        <h1 className="font-serif text-xl">Panel Admin</h1>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-sm text-[#6b6b6b] hover:text-[#f0ebe3] transition-colors">
            Voir le site →
          </a>
          <button
            onClick={save}
            disabled={saving}
            className="bg-[#c9a96e] text-[#0a0a0a] px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#d4b87a] transition-colors disabled:opacity-50"
          >
            {saved ? "✓ Sauvegardé" : saving ? "Sauvegarde..." : "Sauvegarder"}
          </button>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <div className="w-48 border-r border-[#1e1e1e] p-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm capitalize transition-colors ${
                activeTab === tab ? "bg-[#c9a96e]/10 text-[#c9a96e]" : "text-[#6b6b6b] hover:text-[#f0ebe3]"
              }`}
            >
              {tab === "hero" ? "Accueil" : tab === "about" ? "À propos" : tab === "socials" ? "Réseaux" : "CV"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-8 max-w-2xl">

          {/* Hero */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#f0ebe3] mb-8">Section Accueil</h2>
              {[
                { label: "Prénom Nom", key: "name" },
                { label: "Titre (sous le nom)", key: "title" },
                { label: "Phrase d'accroche", key: "subtitle" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-xs text-[#c9a96e] uppercase tracking-widest mb-2">{label}</label>
                  <input
                    type="text"
                    value={content.hero[key]}
                    onChange={e => update(["hero", key], e.target.value)}
                    className="w-full bg-[#111111] border border-[#1e1e1e] text-[#f0ebe3] px-4 py-3 rounded-xl focus:outline-none focus:border-[#c9a96e] transition-colors"
                  />
                </div>
              ))}
            </div>
          )}

          {/* About */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#f0ebe3] mb-8">À propos</h2>
              <div>
                <label className="block text-xs text-[#c9a96e] uppercase tracking-widest mb-2">Texte de présentation</label>
                <textarea
                  value={content.about.text}
                  onChange={e => update(["about", "text"], e.target.value)}
                  rows={5}
                  className="w-full bg-[#111111] border border-[#1e1e1e] text-[#f0ebe3] px-4 py-3 rounded-xl focus:outline-none focus:border-[#c9a96e] transition-colors resize-none"
                />
              </div>
              {[
                { label: "Localisation", key: "location" },
                { label: "Email de contact", key: "email" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-xs text-[#c9a96e] uppercase tracking-widest mb-2">{label}</label>
                  <input
                    type="text"
                    value={content.about[key]}
                    onChange={e => update(["about", key], e.target.value)}
                    className="w-full bg-[#111111] border border-[#1e1e1e] text-[#f0ebe3] px-4 py-3 rounded-xl focus:outline-none focus:border-[#c9a96e] transition-colors"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Socials */}
          {activeTab === "socials" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#f0ebe3] mb-8">Réseaux sociaux</h2>
              {content.socials.map((s: any, i: number) => (
                <div key={i} className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#c9a96e] text-sm font-medium">{s.name || `Réseau ${i + 1}`}</span>
                    <button
                      onClick={() => removeItem("socials", i)}
                      className="text-[#6b6b6b] hover:text-red-400 text-xs transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                  {["name", "handle", "url"].map(field => (
                    <div key={field}>
                      <label className="block text-xs text-[#6b6b6b] uppercase tracking-widest mb-1">
                        {field === "name" ? "Nom" : field === "handle" ? "Identifiant (@...)" : "URL"}
                      </label>
                      <input
                        type="text"
                        value={s[field]}
                        onChange={e => updateArray("socials", i, field, e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-[#1e1e1e] text-[#f0ebe3] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
                      />
                    </div>
                  ))}
                </div>
              ))}
              <button
                onClick={() => addItem("socials", { name: "Nouveau réseau", url: "https://", handle: "@..." })}
                className="w-full border border-dashed border-[#1e1e1e] text-[#6b6b6b] hover:text-[#f0ebe3] hover:border-[#c9a96e] py-3 rounded-2xl text-sm transition-colors"
              >
                + Ajouter un réseau
              </button>
            </div>
          )}

          {/* CV */}
          {activeTab === "cv" && (
            <div className="space-y-10">
              <h2 className="font-serif text-2xl text-[#f0ebe3] mb-8">Curriculum Vitae</h2>

              {/* Formations */}
              <div>
                <h3 className="text-[#c9a96e] text-sm uppercase tracking-widest mb-4">Formations</h3>
                <div className="space-y-4">
                  {content.cv.formations.map((f: any, i: number) => (
                    <div key={i} className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-5 space-y-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#f0ebe3] text-sm">{f.titre || `Formation ${i + 1}`}</span>
                        <button onClick={() => {
                          setContent((prev: any) => {
                            const next = JSON.parse(JSON.stringify(prev));
                            next.cv.formations = next.cv.formations.filter((_: any, idx: number) => idx !== i);
                            return next;
                          });
                        }} className="text-[#6b6b6b] hover:text-red-400 text-xs transition-colors">Supprimer</button>
                      </div>
                      {["annee", "titre", "etablissement", "description"].map(field => (
                        <div key={field}>
                          <label className="block text-xs text-[#6b6b6b] uppercase tracking-widest mb-1">{field}</label>
                          <input
                            type="text"
                            value={f[field]}
                            onChange={e => {
                              setContent((prev: any) => {
                                const next = JSON.parse(JSON.stringify(prev));
                                next.cv.formations[i][field] = e.target.value;
                                return next;
                              });
                            }}
                            className="w-full bg-[#0a0a0a] border border-[#1e1e1e] text-[#f0ebe3] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                  <button
                    onClick={() => setContent((prev: any) => { const next = JSON.parse(JSON.stringify(prev)); next.cv.formations.push({ annee: "2024", titre: "Nouvelle formation", etablissement: "", description: "" }); return next; })}
                    className="w-full border border-dashed border-[#1e1e1e] text-[#6b6b6b] hover:text-[#f0ebe3] hover:border-[#c9a96e] py-3 rounded-2xl text-sm transition-colors"
                  >
                    + Ajouter une formation
                  </button>
                </div>
              </div>

              {/* Expériences */}
              <div>
                <h3 className="text-[#c9a96e] text-sm uppercase tracking-widest mb-4">Expériences</h3>
                <div className="space-y-4">
                  {content.cv.experiences.map((e: any, i: number) => (
                    <div key={i} className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-5 space-y-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#f0ebe3] text-sm">{e.titre || `Expérience ${i + 1}`}</span>
                        <button onClick={() => {
                          setContent((prev: any) => {
                            const next = JSON.parse(JSON.stringify(prev));
                            next.cv.experiences = next.cv.experiences.filter((_: any, idx: number) => idx !== i);
                            return next;
                          });
                        }} className="text-[#6b6b6b] hover:text-red-400 text-xs transition-colors">Supprimer</button>
                      </div>
                      {["annee", "titre", "role", "description"].map(field => (
                        <div key={field}>
                          <label className="block text-xs text-[#6b6b6b] uppercase tracking-widest mb-1">{field}</label>
                          <input
                            type="text"
                            value={e[field]}
                            onChange={ev => {
                              setContent((prev: any) => {
                                const next = JSON.parse(JSON.stringify(prev));
                                next.cv.experiences[i][field] = ev.target.value;
                                return next;
                              });
                            }}
                            className="w-full bg-[#0a0a0a] border border-[#1e1e1e] text-[#f0ebe3] px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                  <button
                    onClick={() => setContent((prev: any) => { const next = JSON.parse(JSON.stringify(prev)); next.cv.experiences.push({ annee: "2024", titre: "Nouvelle expérience", role: "", description: "" }); return next; })}
                    className="w-full border border-dashed border-[#1e1e1e] text-[#6b6b6b] hover:text-[#f0ebe3] hover:border-[#c9a96e] py-3 rounded-2xl text-sm transition-colors"
                  >
                    + Ajouter une expérience
                  </button>
                </div>
              </div>

              {/* Compétences */}
              <div>
                <h3 className="text-[#c9a96e] text-sm uppercase tracking-widest mb-4">Compétences (séparées par virgule)</h3>
                <textarea
                  value={content.cv.competences.join(", ")}
                  onChange={e => update(["cv", "competences"], e.target.value.split(",").map((s: string) => s.trim()) as any)}
                  rows={3}
                  className="w-full bg-[#111111] border border-[#1e1e1e] text-[#f0ebe3] px-4 py-3 rounded-xl focus:outline-none focus:border-[#c9a96e] transition-colors resize-none text-sm"
                />
              </div>

              {/* Intérêts */}
              <div>
                <h3 className="text-[#c9a96e] text-sm uppercase tracking-widest mb-4">Intérêts (séparés par virgule)</h3>
                <textarea
                  value={content.cv.interets.join(", ")}
                  onChange={e => update(["cv", "interets"], e.target.value.split(",").map((s: string) => s.trim()) as any)}
                  rows={3}
                  className="w-full bg-[#111111] border border-[#1e1e1e] text-[#f0ebe3] px-4 py-3 rounded-xl focus:outline-none focus:border-[#c9a96e] transition-colors resize-none text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
