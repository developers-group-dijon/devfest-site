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
export default [];
