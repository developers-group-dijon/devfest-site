/**
 * Informations des tarifs
 * À noter :
 * - le lien global est utilisé dans le menu
 * - possibilité d'avoir un lien par tarif (avce fallback sur le lien global)
 * - possibilité d'avoir un commentaire par tarif en plus du commentaire global
 */

/** @type {import("./types.js").Ticketing} */
export default {
  comment:
    "inclut le petit-déjeuner, le repas le midi et le café pour la journée",
  url: "https://my.weezevent.com/devfest-dijon-2026",
  embedUrl:
    "https://skedl.link/developersgroup-dijon/devfest-2026?embed=true&showHero=false&showTabs=false&showTeam=false&showMerch=false&showGallery=false&showSponsors=false",
  pricings: [
    {
      id: "early",
      name: "Tarif Early",
      price: "27 €",
      comment: "Seulement 100 places !",
    },
    {
      id: "standard",
      name: "Tarif standard",
      price: "37 €",
    },
    {
      id: "etudiant",
      name: "Tarif étudiant",
      price: "20 €",
      comment: "Une pièce justificative pourra être demandée",
    },
  ],
};
