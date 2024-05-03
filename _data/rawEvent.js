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
 * @type {import("./types").RawEvent}
 */
const rawEvent = {
  name: "DevFest Dijon 2024",
  dateStart: new Date("2024-12-06T08:00:00.000Z"),
  dateEnd: new Date("2024-12-06T17:00:00.000Z"),
  visitors: "+400",
  comments: [
    {
      title: "Le Devfest Dijon, c'est quoi ?",
      content:
        "Le Devfest Dijon 2024 est la troisième édition de la plus grande conférence technique de Bourgogne-Franche-Comté destinée aux développeurs. Elle s'adresse aux étudiants, aux professionnels ou tout simplement curieux, passionnés de technologies.",
    },
    {
      title: "Devfest 2024 : Hommage à Gustave Eiffel",
      content:
        "Le design de cette édition du DevFest est un hommage à Gustave Eiffel, ingénieur et industriel français qui a notamment participé à la construction de la tour Eiffel à Paris, de la statue de la Liberté à New York et de la poste centrale de Saïgon.",
    },
  ],
  previousEditions: [
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
    name: "IUT Dijon",
    description:
      "Sur le campus de Dijon. Accessible avec la ligne A du tram et la ligne 5 en bus. En voiture, privilégier les parkings relais.",
    address: "7 Boulevard Docteur Petitjean, 21000 Dijon",
    url: "https://www.google.com/maps/dir/?api=1&destination=47.317764,5.0643906,17z",
  },
  photosLink:
    "https://drive.google.com/drive/folders/16oUIYp7uIUli_Z7sJhfEyKCDjZpaIAly/",
  team: {
    message:
      "Le Devfest Dijon 2024 est organisé par le [Developers Group Dijon](https://developers-group-dijon.fr/), fier de cette troisième DevFest Dijon !",
    why: "Le DevFest Dijon 2024 sera la troisième édition dijonnaise d’un événement qui rassemble des milliers de développeurs et de passionnés dans le monde entier chaque année pour penser les technologies de demain. Le Devfest est LE lieu unique pour partager et échanger autour de nombreux sujets tels que Web, Cloud, Mobile, objets connectés et bien plus encore",
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

module.exports = rawEvent;
