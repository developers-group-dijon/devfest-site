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
    name: "Partenaires de l'événement",
    sponsors: [
      {
        name: "Dijon Métropole",
        website: "https://www.dijon-metropole.fr",
        logoUrl: "/sponsors/dijon-metropole.webp",
      },
      {
        name: "Google",
        website: "https://www.google.com",
        logoUrl: "/sponsors/google.webp",
      },
      {
        name: "IUT Dijon Auxerre Nevers",
        website: "https://iutdijon.u-bourgogne.fr/",
        logoUrl: "/sponsors/iut.webp",
      },
    ],
  },
  {
    name: "Sponsors Gold",
    sponsors: [
      {
        name: "Lykhubs",
        website: "https://www.lykhubs.com/",
        logoUrl: "/sponsors/lykhubs.webp",
      },
      {
        name: "YMAG",
        website: "https://www.ymag.fr",
        logoUrl: "/sponsors/ymag.webp",
      },
    ],
  },
  {
    name: "Sponsors Silver",
    sponsors: [
      {
        name: "Alteca",
        website: "https://www.alteca.fr",
        logoUrl: "/sponsors/alteca.webp",
      },
      {
        name: "Carsat BFC",
        website: "https://www.carsat-bfc.fr/",
        logoUrl: "/sponsors/carsat.webp",
      },
      {
        name: "CPage",
        website: "https://www.cpage.fr/",
        logoUrl: "/sponsors/cpage.webp",
      },
      {
        name: "Les Docks numériques",
        website: "https://www.lesdocks.net/",
        logoUrl: "/sponsors/les-docks.webp",
      },
    ],
  },
  /*
  {
    name: "Sponsors",
    sponsors: [
      {
        name: "AER BFC",
        website: "https://aer-bfc.com",
        logoUrl: "/sponsors/aer-bfc.webp",
      },
      {
        name: "BeBoost",
        website: "https://www.beboost.com",
        logoUrl: "/sponsors/beboost.webp",
      },
      {
        name: "Cadoles",
        website: "https://www.cadoles.com",
        logoUrl: "/sponsors/cadoles.webp",
      },
      {
        name: "French tech BFC",
        website: "https://lafrenchtechbfc.fr/",
        logoUrl: "/sponsors/french-tech-bfc.webp",
      },
      {
        name: "La poste",
        website: "https://www.laposte.fr",
        logoUrl: "/sponsors/la-poste.webp",
      },
      {
        name: "Odalid",
        website: "https://odalid.com",
        logoUrl: "/sponsors/odalid.webp",
      },
    ],
  },
  {
    name: "Village entreprise",
    sponsors: [
      {
        name: "Atol CD",
        website: "https://www.atolcd.com",
        logoUrl: "/sponsors/atolcd.webp",
      },
      {
        name: "Cadoles",
        website: "https://www.cadoles.com",
        logoUrl: "/sponsors/cadoles.webp",
      },
      {
        name: "Inetum",
        website: "https://www.inetum.com",
        logoUrl: "/sponsors/inetum.webp",
      },
      {
        name: "Planet Bourgogne",
        website: "https://www.planetb.fr",
        logoUrl: "/sponsors/planet-bourgogne.webp",
      },
    ],
  },
*/
];

module.exports = sponsors;
