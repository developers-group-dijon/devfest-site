/**
 * Inspiré des données JSON de OpenPlanner.fr
 * Chemin : event.tracks
 * - ajout de sponsor en facultatif pour ajouter le logo dans le programme
 */

/**
 * @type {import('./types.js').Track[]}
 */
export default [
  {
    id: "amphi1",
    name: "Amphi « Philippe Le Hardi »",
    sponsor: "DIIAGE",
  },
  {
    id: "amphi2",
    name: "Amphi « Jean Sans Peur »",
    sponsor: "Lykhubs",
  },
  {
    id: "amphi3",
    name: "Amphi « Marie de Bourgogne »",
    sponsor: "YMAG",
  },
  {
    id: "salle-charles-le-temeraire-",
    name: "Salle « Charles Le Téméraire »",
    sponsor: "Les Docks numériques",
  },
];
