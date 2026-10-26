// Registre unique des données collectées par le site.
// Il alimente : le bandeau et le centre de préférences, la page « Mentions légales », et le panneau d'administration.
// Toute nouvelle donnée collectée DOIT être ajoutée ici.

export type Category = "necessary" | "audience" | "behavior";

export type DataItem = {
  id: string;
  category: Category;
  kind: "cookie" | "stockage local" | "donnée";
  name: string;
  what: string;      // ce qui est collecté
  why: string;       // à quoi ça sert
  duration: string;  // durée de conservation
  who?: string;      // précision (ex. « éditeur uniquement »)
};

export const CATEGORIES: Record<Category, { label: string; short: string; legal: string; description: string }> = {
  necessary: {
    label: "Strictement nécessaires",
    short: "Toujours actifs",
    legal: "Exemptés de consentement (fonctionnement du site, mémorisation de vos choix)",
    description: "Ils mémorisent vos choix (cookies, thème, accessibilité) et sécurisent l'espace d'administration. Ils ne mesurent rien.",
  },
  audience: {
    label: "Mesure d'audience",
    short: "Avec votre accord",
    legal: "Votre consentement (article 6.1.a du RGPD)",
    description: "Comprendre qui visite le site : d'où, quand, avec quel appareil, depuis quel lien. Un identifiant aléatoire permet de reconnaître un retour.",
  },
  behavior: {
    label: "Comportement de lecture",
    short: "Avec votre accord",
    legal: "Votre consentement (article 6.1.a du RGPD)",
    description: "Comprendre ce qui est lu et utilisé : durée, défilement, sections vues, clics. Nécessite la mesure d'audience.",
  },
};

export const DATA_CATALOG: DataItem[] = [
  // ── Strictement nécessaires
  { id: "pf_consent", category: "necessary", kind: "cookie", name: "pf_consent", what: "Votre choix de cookies", why: "Ne pas vous redemander votre avis à chaque page", duration: "6 mois" },
  { id: "theme", category: "necessary", kind: "stockage local", name: "theme-v2", what: "Thème clair ou sombre choisi", why: "Afficher le thème que vous avez choisi", duration: "Jusqu'à effacement du navigateur" },
  { id: "a11y", category: "necessary", kind: "stockage local", name: "a11y-…", what: "Réglages d'accessibilité choisis (police dyslexie, texte agrandi, animations réduites, contraste)", why: "Conserver vos réglages d'accessibilité", duration: "Jusqu'à effacement du navigateur" },
  { id: "pf_admin", category: "necessary", kind: "cookie", name: "pf_admin", what: "Session d'administration", why: "Sécuriser l'espace réservé à l'éditeur", duration: "8 heures", who: "Déposé uniquement pour l'éditeur du site, après connexion" },
  { id: "pf_owner", category: "necessary", kind: "cookie", name: "pf_owner", what: "Marqueur « visite de l'éditeur »", why: "Exclure les visites de l'éditeur des statistiques", duration: "13 mois", who: "Déposé uniquement pour l'éditeur du site" },

  // ── Mesure d'audience
  { id: "pf_vid", category: "audience", kind: "cookie", name: "pf_vid", what: "Identifiant de visiteur aléatoire (aucun lien avec votre identité)", why: "Savoir si une visite est un retour, compter les visiteurs distincts", duration: "13 mois" },
  { id: "pf_sid", category: "audience", kind: "cookie", name: "pf_sid", what: "Identifiant de session aléatoire", why: "Regrouper les pages vues d'une même visite", duration: "30 minutes d'inactivité" },
  { id: "pages", category: "audience", kind: "donnée", name: "Pages consultées", what: "Page vue, date et heure précises (à la seconde), rang de la page dans la visite", why: "Savoir quelles pages intéressent et à quel moment", duration: "13 mois" },
  { id: "geo", category: "audience", kind: "donnée", name: "Localisation approximative", what: "Pays, région et ville déduits de votre adresse IP, fuseau horaire", why: "Savoir d'où le site est consulté", duration: "13 mois" },
  { id: "ip", category: "audience", kind: "donnée", name: "Empreinte d'adresse IP", what: "Empreinte irréversible, différente chaque jour. L'adresse IP elle-même n'est jamais enregistrée", why: "Éviter de compter plusieurs fois la même visite, repérer les robots", duration: "13 mois" },
  { id: "device", category: "audience", kind: "donnée", name: "Appareil", what: "Type d'appareil, système, navigateur, langue, taille d'écran et de fenêtre, écran tactile, thème clair ou sombre, fuseau horaire du navigateur", why: "Adapter le site aux appareils utilisés", duration: "13 mois" },
  { id: "source", category: "audience", kind: "donnée", name: "Origine de la visite", what: "Site d'où vous venez (ex. LinkedIn, Instagram, Google), étiquette du lien suivi reçu (ex. /l/linkedin), paramètres de campagne (UTM)", why: "Savoir quels canaux amènent des visiteurs", duration: "13 mois" },

  // ── Comportement
  { id: "time", category: "behavior", kind: "donnée", name: "Durée de lecture", what: "Temps passé sur chaque page (onglet visible)", why: "Savoir si les contenus sont lus", duration: "13 mois" },
  { id: "scroll", category: "behavior", kind: "donnée", name: "Défilement", what: "Paliers atteints : 25 %, 50 %, 75 %, 100 % de la page", why: "Savoir jusqu'où la page est lue", duration: "13 mois" },
  { id: "sections", category: "behavior", kind: "donnée", name: "Sections consultées", what: "Parcours, créations, transports, etc. : sections réellement affichées à l'écran", why: "Savoir quelles parties du site intéressent", duration: "13 mois" },
  { id: "clicks", category: "behavior", kind: "donnée", name: "Clics utiles", what: "Clics sur l'adresse e-mail, le téléphone, le CV en PDF et les liens vers d'autres sites (destination)", why: "Savoir si le site donne lieu à une prise de contact", duration: "13 mois" },
];

/** Ce qui est compté tant que vous n'avez pas choisi : statistique anonyme, sans cookie ni identifiant. */
export const ANON_TIER = {
  what: "Page consultée, date et heure, pays et région, type d'appareil, système, navigateur, langue, site d'origine",
  not: "Aucun cookie, aucun identifiant, aucune ville, aucune adresse IP, aucun suivi de comportement",
  duration: "13 mois",
};

export const RETENTION = {
  visits: "13 mois",
  events: "13 mois",
  proof: "25 mois (preuve de votre choix, sans identifiant)",
};
