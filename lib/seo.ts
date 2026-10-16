// Constantes et données structurées (JSON-LD) pour le référencement.
export const SITE = "https://evrard-andre.vercel.app";
export const NAME = "Evrard André";

export const SAME_AS = [
  "https://instagram.com/evrardadr",
  "https://www.linkedin.com/in/evrard-andr%C3%A9-382568221/",
  "https://x.com/evrard_andre",
  "https://instagram.com/pe.lyon",
  "https://instagram.com/parlementdesetudiants",
];

export const KEYWORDS = [
  "Evrard André", "Evrard Andre", "communication politique", "stratégie politique", "droit public", "politique",
  "science politique", "campagne électorale", "éléments de langage", "discours politique", "réseaux sociaux politiques",
  "travail parlementaire", "collaborateur parlementaire", "assistant parlementaire", "cabinet d'élu",
  "Parlement des Étudiants", "Lyon", "Métropole de Lyon", "transports en commun", "mobilité urbaine", "politiques publiques",
];

export const KNOWS_ABOUT = [
  "Droit public", "Communication politique", "Stratégie politique", "Campagne électorale", "Éléments de langage",
  "Rédaction de discours", "Réseaux sociaux", "Identité visuelle", "Relations presse", "Science politique", "Institutions de la République",
  "Travail parlementaire", "Politiques publiques", "Transports en commun", "Mobilité urbaine", "Métropole de Lyon",
];

export const personLd = {
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: NAME,
  alternateName: ["Evrard ANDRÉ", "Evrard Andre"],
  url: SITE,
  image: `${SITE}/gallery/evrard-portrait.webp`,
  email: "mailto:evrard.andre@aol.com",
  jobTitle: "Étudiant en droit public · Communication politique",
  description:
    "Étudiant en droit public à Lyon 3, responsable communication du Parlement des Étudiants. Communication politique, stratégie politique, éléments de langage, réseaux sociaux et transports en commun.",
  address: { "@type": "PostalAddress", addressLocality: "Lyon", addressCountry: "FR" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Université Jean Moulin Lyon 3" },
  affiliation: { "@type": "Organization", name: "Parlement des Étudiants", url: "https://parlementdesetudiants.fr" },
  knowsAbout: KNOWS_ABOUT,
  knowsLanguage: ["fr", "en"],
  sameAs: SAME_AS,
};

export const homeLd = {
  "@context": "https://schema.org",
  "@graph": [
    personLd,
    { "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: NAME, inLanguage: "fr-FR", publisher: { "@id": `${SITE}/#person` } },
    {
      "@type": "ProfilePage", "@id": `${SITE}/#profile`, url: SITE, name: `${NAME} — communication politique & droit public`, inLanguage: "fr-FR",
      isPartOf: { "@id": `${SITE}/#website` }, mainEntity: { "@id": `${SITE}/#person` },
    },
  ],
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: SITE + it.path })),
  };
}
