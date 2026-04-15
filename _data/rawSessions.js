/**
 * Inspiré des données JSON de OpenPlanner.fr
 * Chemin : sessions
 * Modifications :
 * - notion de trackRange pour indiquer si une session est sur plusieurs tracks
 * - ajout des "grandes" pauses
 * - dateStart en Date
 * - pas de endStart
 * - Nettoyer les abstracts : Markdown mais pas HTML
 *
 * À noter : hideTrackTitle (true par défaut, c'est comme ca dans OpenPlanner) est utilisé pour
 * - savoir s'il faut générer une page de détail pour la session
 * - compter le nombre de sessions
 * On mettra généralement à true pour les pauses et les keynotes
 *
 * Cette donnée sera parsée/complétée pour avoir une donnée "sessions"
 */

/**
 * @type {import("./types.js").RawSession[]}
 */
export default [
  // // pauses
  // {
  //   id: "pause matin",
  //   title: "Pause",
  //   dateStartStr: "2025-12-05T11:10:00.000+01:00",
  //   durationMinutes: 20,
  //   trackRange: ["niepce", "paris"],
  //   styleClass: "pause",
  // },
  // {
  //   id: "pause matin 2",
  //   title: "Pause",
  //   dateStartStr: "2025-12-05T11:15:00.000+01:00",
  //   durationMinutes: 15,
  //   trackId: "bernard",
  //   styleClass: "pause",
  // },
  // {
  //   id: "pause midi",
  //   title: "Pause repas",
  //   dateStartStr: "2025-12-05T12:20:00.000+01:00",
  //   durationMinutes: 100,
  //   styleClass: "pause",
  // },
  // {
  //   id: "pause apres-midi",
  //   title: "Pause",
  //   dateStartStr: "2025-12-05T15:45:00.000+01:00",
  //   durationMinutes: 20,
  //   trackRange: ["niepce", "paris"],
  //   styleClass: "pause",
  // },
  // {
  //   id: "pause apres-midi 2",
  //   title: "Pause",
  //   dateStartStr: "2025-12-05T15:50:00.000+01:00",
  //   durationMinutes: 15,
  //   trackId: "bernard",
  //   styleClass: "pause",
  // },
  // // keynotes
  // {
  //   id: "keynote-debut",
  //   title: "Accueil et lancement de la journée",
  //   dateStartStr: "2025-12-05T09:00:00.000+01:00",
  //   durationMinutes: 20,
  // },
  // // keynotes
  // {
  //   id: "keynote-fin",
  //   title: "Remerciements et clôture de la journée",
  //   dateStartStr: "2025-12-05T17:50:00.000+01:00",
  //   durationMinutes: 10,
  // },
];
