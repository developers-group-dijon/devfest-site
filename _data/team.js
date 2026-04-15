/**
 * Informations de l'équipe organisatrice.
 * Inspiré de la description des speakers.
 * À noter :
 * - télécharger (par exemple dans /_assets/avatars/) et faire une version optimisée des photos (128x128)
 * - Markdown possible pour les "bio"
 */

/**
 * @type {import('./types.js').Member[]}
 */
export default [
  {
    name: "Guillaume Poittevin",
    jobTitle: "Senior Solutions Architect",
    company: "Capgemini",
    photoUrl: "/avatars/guillaume-poittevin.webp",
    socials: [{ id: "linkedin", name: "Linkedin", link: "theguit" }],
  },
  {
    name: "Mathilde Couenne",
    jobTitle: "Assistante de direction",
    company: "Alteca",
    photoUrl: "/avatars/mathilde.webp",
    socials: [
      { id: "linkedin", name: "Linkedin", link: "mathilde-couenne-a27504109" },
    ],
  },
  {
    name: "Adrien Gras",
    jobTitle: "Architecte solutions",
    company: "OwlNext",
    photoUrl: "/avatars/adrien.webp",
    socials: [{ id: "linkedin", name: "Linkedin", link: "adrien-gras" }],
  },
  {
    name: "Xavier Calland",
    jobTitle: "Directeur technique",
    company: "Atol CD",
    photoUrl: "/avatars/xavier.webp",
    socials: [
      { id: "linkedin", name: "Linkedin", link: "xavier-calland-4471866" },
      { id: "github", name: "GitHub", link: "xavier-calland" },
      {
        id: "mastodon",
        name: "Mastodon",
        link: "https://piaille.fr/@xcalland",
      },
    ],
  },
  {
    name: "Caroline Chanlon",
    jobTitle: "Directrice",
    company: "Osanah communication",
    photoUrl: "/avatars/caroline.webp",
    socials: [{ id: "linkedin", name: "Linkedin", link: "carolinechanlon" }],
  },
  {
    name: "Matthieu Lamalle",
    jobTitle: "Ingénieur Logiciel Libre",
    company: "Cadoles",
    photoUrl: "/avatars/matthieu.webp",
    socials: [
      { id: "linkedin", name: "Linkedin", link: "matthieu-lamalle-29387a53" },
    ],
  },
  {
    name: "Michel Girard",
    jobTitle: "Responsable de formation Numérique",
    company: "DIIAGE",
    photoUrl: "/avatars/michel.webp",
    socials: [{ id: "linkedin", name: "Linkedin", link: "themoat" }],
  },
  {
    name: "Fabrice Ubertosi",
    jobTitle: "Directeur Technique",
    company: "CPage",
    photoUrl: "/avatars/fabrice.webp",
    socials: [
      { id: "linkedin", name: "Linkedin", link: "ubertosi-fabrice-11b763124" },
    ],
  },
  {
    name: "Yoann Rouquié",
    jobTitle: "Développeur Javascript",
    company: "APRR",
    photoUrl: "/avatars/yoann.webp",
    socials: [
      { id: "linkedin", name: "Linkedin", link: "yoann-rouquie" },
      { id: "github", name: "GitHub", link: "yoannrq" },
    ],
  },
  {
    name: "Yoan Thirion",
    jobTitle: "Référent pédagogique",
    company: "Coda Dijon",
    photoUrl: "/avatars/yoan.webp",
    socials: [
      { id: "linkedin", name: "Linkedin", link: "yoanthirion" },
      { id: "github", name: "GitHub", link: "ythirion" },
    ],
  },
  {
    name: "Jérémy Colombet",
    company: "Garganttua",
    photoUrl: "/avatars/jeremy.webp",
    socials: [{ id: "linkedin", name: "Linkedin", link: "jeremy-colombet" }],
  },
  {
    name: "Guillaume Lerouxel",
    photoUrl: "/avatars/guillaume-l.webp",
    socials: [{ id: "linkedin", name: "Linkedin", link: "guillaumelerouxel" }],
  },
  {
    name: "Vincent Rozier",
    photoUrl: "/avatars/vincent.webp",
    jobTitle:
      "Responsable de service développement logiciel pour l'Assurance Retraite",
    company: "Carsat BFC",
    socials: [
      { id: "linkedin", name: "Linkedin", link: "vincent-rozier-aba86427" },
    ],
  },
  {
    name: "Hussein Loubani",
    photoUrl: "/avatars/hussein.webp",
    jobTitle: "Computer Vision & Robotics Researcher",
    company: "CIAD",
    socials: [{ id: "linkedin", name: "Linkedin", link: "hussein-loubani" }],
  },
];

// convert img.png -resize "200x200" img.webp
