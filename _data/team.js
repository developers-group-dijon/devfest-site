/**
 * Informations de l'équipe organisatrice.
 * Inspiré de la description des speakers.
 * À noter :
 * - télécharger (par exemple dans /_assets/avatars/) et faire une version optimisée des photos (128x128)
 * - Markdown possible pour les "bio"
 */

/**
 * @type {import('./types').Member[]}
 */
const team = [
  {
    name: "Allan Cruchaudet",
    jobTitle: "Chargé de communication",
    company: "Atol CD",
    photoUrl: "/avatars/allan.jpg",
    socials: [{ id: "linkedin", name: "Linkedin", link: "allan-cruchaudet" }],
  },
  {
    name: "Jérémy Colombet",
    jobTitle: "Directeur technique",
    company: "CiTech",
    photoUrl: "/avatars/jeremy.jpg",
    socials: [{ id: "linkedin", name: "Linkedin", link: "jeremy-colombet" }],
  },
  {
    name: "Sabrina Bonard",
    jobTitle: "Développeuse mobile",
    company: null,
    photoUrl: "/avatars/sabrina.jpg",
    socials: [
      { id: "linkedin", name: "Linkedin", link: "sabrina-bonard-917701bb" },
    ],
  },
  {
    name: "Amélie Guittet",
    jobTitle: "Responsable communication",
    company: "Atol CD",
    photoUrl: "/avatars/amelie.jpg",
    socials: [{ id: "linkedin", name: "Linkedin", link: "guittetamelie" }],
  },
  {
    name: "Guillaume Poittevin",
    jobTitle: "Senior Solutions Architect",
    company: "Capgemini",
    photoUrl: "/avatars/guillaume-poittevin.jpg",
    socials: [{ id: "linkedin", name: "Linkedin", link: "theguit" }],
  },
  {
    name: "Mathilde Couenne",
    jobTitle: "Assistante de direction",
    company: "Alteca",
    photoUrl: "/avatars/mathilde.jpg",
    socials: [
      { id: "linkedin", name: "Linkedin", link: "mathilde-couenne-a27504109" },
    ],
  },
  {
    name: "Nicolas Le Pochat",
    jobTitle: "Président fondateur",
    company: "Gammeo",
    photoUrl: "/avatars/nicolas.jpg",
    socials: [
      { id: "linkedin", name: "Linkedin", link: "nicolas-le-pochat-4a883bb" },
    ],
  },
  {
    name: "Adrien Gras",
    jobTitle: "Architecte solutions",
    company: "OwlNext",
    photoUrl: "/avatars/adrien.jpg",
    socials: [{ id: "linkedin", name: "Linkedin", link: "adrien-gras" }],
  },
  {
    name: "Xavier Calland",
    jobTitle: "Directeur technique",
    company: "Atol CD",
    photoUrl: "/avatars/xavier.jpg",
    socials: [
      { id: "linkedin", name: "Linkedin", link: "xavier-calland-4471866" },
    ],
  },
  {
    name: "Caroline Chanlon",
    jobTitle: "Directrice",
    company: "Osanah communication",
    photoUrl: "/avatars/caroline.jpg",
    socials: [{ id: "linkedin", name: "Linkedin", link: "carolinechanlon" }],
  },
  {
    name: "Jean-Philippe Benadjer",
    jobTitle: "Infographiste",
    company: "Atol CD",
    photoUrl: "/avatars/jean-philippe.jpg",
    socials: [
      {
        id: "linkedin",
        name: "Linkedin",
        link: "jean-philippe-benadjer-144849bb",
      },
    ],
  },
  {
    name: "Romy Fuentes",
    jobTitle: "Chargée de communication",
    company: "Atol CD",
    photoUrl: "/avatars/romy.jpg",
    socials: [{ id: "linkedin", name: "Linkedin", link: "romy-fuentes" }],
  },
];

module.exports = team;
