"use client";

import { useState } from "react";
import Menu from "@/components/Menu";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message de ${name} — Portfolio`);
    const body = encodeURIComponent(`Nom : ${name}\nEmail : ${email}\n\n${message}`);
    window.location.href = `mailto:evrard.andre@aol.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen font-body" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Menu />
      <ScrollReveal />

      <section className="px-8 md:px-16 lg:px-24 pt-36 pb-28">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-14" data-reveal="fade">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ color: "var(--accent)" }}>Contact</span>
            <span className="flex-1 h-px max-w-xs" style={{ backgroundColor: "var(--border)" }} />
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-start">
            {/* Left — title + info */}
            <div data-reveal>
              <h1 className="font-display font-extrabold text-6xl md:text-7xl leading-none mb-8" style={{ color: "var(--text)" }}>
                Écrire
              </h1>
              <p className="text-sm font-light leading-loose mb-10" style={{ color: "var(--text-muted)" }}>
                Une question, une opportunité, un projet commun ? N&apos;hésitez pas à me contacter directement.
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:evrard.andre@aol.com"
                  className="flex items-center justify-between px-5 py-3.5 rounded-xl transition-all"
                  style={{ backgroundColor: "var(--accent-glow)", border: "1px solid var(--accent-border)" }}
                >
                  <span className="text-[9px] uppercase tracking-widest font-medium" style={{ color: "var(--accent)" }}>Email</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>evrard.andre@aol.com →</span>
                </a>
                <a
                  href="tel:0767263851"
                  className="flex items-center justify-between px-5 py-3.5 rounded-xl transition-all"
                  style={{ backgroundColor: "var(--bg2)", border: "1px solid var(--border)" }}
                >
                  <span className="text-[9px] uppercase tracking-widest font-medium" style={{ color: "var(--accent)" }}>Téléphone</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>07 67 26 38 51 →</span>
                </a>
                <div
                  className="flex items-center justify-between px-5 py-3.5 rounded-xl"
                  style={{ backgroundColor: "var(--bg2)", border: "1px solid var(--border)" }}
                >
                  <span className="text-[9px] uppercase tracking-widest font-medium" style={{ color: "var(--accent)" }}>Localisation</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>Lyon, France</span>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <form onSubmit={handleSubmit} className="space-y-4" data-reveal data-delay="2">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-medium mb-2" style={{ color: "var(--accent)" }}>
                  Nom
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                  style={{
                    backgroundColor: "var(--bg2)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-medium mb-2" style={{ color: "var(--accent)" }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                  style={{
                    backgroundColor: "var(--bg2)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-medium mb-2" style={{ color: "var(--accent)" }}>
                  Message
                </label>
                <textarea
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={6}
                  placeholder="Votre message..."
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: "var(--bg2)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-medium transition-all"
                style={{
                  backgroundColor: "var(--accent-glow)",
                  border: "1px solid var(--accent-border)",
                  color: "var(--accent)",
                }}
              >
                Envoyer →
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="px-8 md:px-16 lg:px-24 py-10 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
        <span className="font-display font-bold text-xs uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>Evrard André</span>
        <span className="text-xs" style={{ color: "var(--text-faint)" }}>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
