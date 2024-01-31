/**
 * Inspiré des données JSON de OpenPlanner.fr
 * Chemin : sponsors
 *
 * Chaque logo doit tenir dans une zone de 190x90, donc taille maximum 170x60
 */

/**
 * @type {import("./types").SponsorType[]}
 */
const sponsors = [
  {
    id: "sponsors",
    name: "Sponsors",
    sponsors: [
      {
        id: "aa5e9a55-0b91-45e1-af41-c0cd54f25788",
        name: "Google",
        website: "https://www.google.com",
        logoUrl: "/sponsors/google.png",
      },
    ],
  },
  {
    id: "village-entreprise",
    name: "Village entreprise",
    sponsors: [
      {
        id: "aa5e9a55-0b91-45e1-af41-5b941b96fdbe",
        name: "Google",
        website: "https://www.google.com",
        logoUrl: "/sponsors/google.png",
      },
    ],
  },
];

module.exports = sponsors;
