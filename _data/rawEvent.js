/**
 * Inspiré des données JSON de OpenPlanner.fr
 * Chemin : event (sans tracks, categories et formats)
 * Modifications :
 * - ajout localisation
 * - ajout team
 * - ajout access
 * - ajout previousEditions
 * - dateStart et endStart en Date
 *
 * Il y a tellement de modifications qu'au final il n'est pas intéressant
 * de partir des données d'OpenPlanner.fr
 *
 * Cette donnée sera parsée/complétée pour avoir une donnée "event"
 *
 * À noter :
 * - optimiser "team.photo" pour une taille de 560x420
 * - optimiser les 8 "photos" en fonction de leur position sur la grille
 */

/**
 * @type {import("./types.js").RawEvent}
 */
export default {
  name: "DevFest Dijon 2025",
  dateStart: new Date("2025-12-05T08:00:00.000Z"),
  dateEnd: new Date("2025-12-05T18:00:00.000Z"),
  visitors: "+500",
  callForPaper: null,
  // callForPaper: "https://conference-hall.io/public/event/LvvYRcF5AIhpojdn2lkQ",
  // Lien pour devenir sponsor (mettre null pour ne pas afficher le lien)
  sponsoringUrl: null,
  comments: [
    {
      title: "Le DevFest Dijon, c'est quoi ?",
      content:
        "Le DevFest Dijon 2025 est la quatrième édition de la plus grande conférence technique de Bourgogne-Franche-Comté destinée aux développeurs. Elle s'adresse aux étudiants, aux professionnels ou tout simplement curieux, passionnés de technologies.",
    },
    {
      title: "DevFest 2025 : Sur les toits de Dijon",
      content:
        "Pour cette édition du DevFest nous prenons un peu de hauteur pour découvrir Dijon depuis ses toits. Une rencontre avec les motifs colorés des tuiles vernissées bourguignonnes",
    },
  ],
  previousEditions: [
    {
      name: "DevFest Dijon 2024",
      url: "https://devfest-2024.developers-group-dijon.fr",
    },
    {
      name: "DevFest Dijon 2023",
      url: "https://devfest-2023.developers-group-dijon.fr",
    },
    {
      name: "DevFest Dijon 2022",
      url: "https://developers-group-dijon.fr/premier-devfest-dijon/",
    },
  ],
  location: {
    name: "UFR Sciences et Techniques",
    description:
      "Sur le campus de Dijon. Accessible avec la ligne A du tram et la ligne 5 en bus. En voiture, privilégier les parkings relais.",
    address: "9 Avenue Alain Savary, 21000 Dijon",
    center: {
      lon: 5.072830779491891,
      lat: 47.31330201183376,
    },
    bbox: {
      lonMin: 5.0678032636642465,
      lonMax: 5.076472163200379,
      latMin: 47.31154756939846,
      latMax: 47.31484998690421,
    },
  },
  photosLink:
    "https://drive.google.com/drive/folders/1jK8Y3qdiyp06EBZFeJ9d3--8Dv93BLNF/",
  team: {
    message:
      "Le DevFest Dijon 2025 est organisé par le [Developers Group Dijon](https://developers-group-dijon.fr/), fier de proposer cette nouvelle édition !",
    why: "Le DevFest Dijon 2025 sera la quatrième édition dijonnaise d'un événement qui rassemble des milliers de développeurs et de passionnés dans le monde entier chaque année pour penser les technologies de demain. Le DevFest est LE lieu unique pour partager et échanger autour de nombreux sujets tels que Web, Cloud, Mobile, objets connectés et bien plus encore",
  },
  // TODO: lien vers les réseaux
  aPropos: [
    {
      name: "Developers Group Dijon",
      url: "https://developers-group-dijon.fr/",
    },
    {
      name: "Google Developers Group",
      url: "https://developers.google.com/",
    },
  ],
  resources: [
    {
      name: "Code de Conduite",
      url: "https://developers-group-dijon.fr/code-de-conduite/",
    },
  ],
  contact: [
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/company/developers-group-dijon/",
    },
    {
      name: "Contactez-nous",
      url: "mailto:developers.group.dijon@gmail.com",
    },
    {
      name: "L'équipe",
      url: "/team/",
    },
  ],
};
