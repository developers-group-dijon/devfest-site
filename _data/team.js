/**
 * Informations de l'équipe organisatrice.
 * Inspiré de la description des speakers.
 * À noter :
 * - télécharger (par exemple dans /_assets/team/) et faire une version optimisée des photos (128x128)
 * - Markdown possible pour les "bio"
 */

/**
 * @type {import('./types').Member[]}
 */
const team = [
  {
    id: "john-doe",
    name: "John Doe",
    jobTitle: "My job",
    bio: "…",
    company: "Google",
    companyLogoUrl: null,
    photoUrl: null, // "/team/foo.jpg",
    socials: [
      {
        id: "github",
        link: "john-doe",
        name: "GitHub",
      },
    ],
  },
];

module.exports = team;
