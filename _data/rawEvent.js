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
  name: "DevFest Dijon 2024",
  dateStart: new Date("2024-12-06T08:00:00.000Z"),
  dateEnd: new Date("2024-12-06T17:45:00.000Z"),
  visitors: "+400",
  callForPaper: "https://conference-hall.io/public/event/LvvYRcF5AIhpojdn2lkQ",
  // Lien pour devenir sponsor (mettre null pour ne pas afficher le lien)
  sponsoringUrl: null,
  comments: [
    {
      title: "Le DevFest Dijon, c'est quoi ?",
      content:
        "Le DevFest Dijon 2024 est la troisième édition de la plus grande conférence technique de Bourgogne-Franche-Comté destinée aux développeurs. Elle s'adresse aux étudiants, aux professionnels ou tout simplement curieux, passionnés de technologies.",
    },
    {
      title: "DevFest 2024 : À la rencontre des Ducs de Bourgogne",
      content:
        "Pour cette édition du DevFest nous vous invitons à venir découvrir les Ducs de Bourgogne. Vous en avez surement déjà entendu parler. Mais saviez-vous que sous leur règne, au moyen-âge, la Bourgogne était si puissante qu’ils ont failli détrôner le Roi et faire de Dijon la capitale de la France ?",
    },
    {
      title: "Nouveauté cette année sur le DevFest !",
      content: `En collaboration avec les Docks Numériques, nous vous proposons de participer à une session de pitchs de startups numériques innovantes !

L'objectif ?
- Faciliter la rencontre entre startups numériques en quête de développeurs web et des développeurs ayant un esprit entrepreneurial, cherchant un projet ou un associé pour se lancer dans une aventure entrepreneuriale.

Vous êtes ?
- Développeur web ayant un projet entrepreneurial ou cherchant à rejoindre un projet existant.
- Développeur web en recherche d'un associé pour lancer une startup.
- Développeur web souhaitant participer à un projet entrepreneurial innovant.

Vous êtes une start-up et vous souhaitez pitcher : **[c'est par ici](https://form.jotform.com/242781928093062)**

Participez à **« Qui veut être mon dév ‽ »**, RDV en **salle « Charles Le Téméraire » à 11h** !`,
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
      "Le DevFest Dijon 2024 est organisé par le [Developers Group Dijon](https://developers-group-dijon.fr/), fier de cette troisième DevFest Dijon !",
    why: "Le DevFest Dijon 2024 sera la troisième édition dijonnaise d’un événement qui rassemble des milliers de développeurs et de passionnés dans le monde entier chaque année pour penser les technologies de demain. Le DevFest est LE lieu unique pour partager et échanger autour de nombreux sujets tels que Web, Cloud, Mobile, objets connectés et bien plus encore",
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
