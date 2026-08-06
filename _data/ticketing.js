/**
 * Informations des tarifs
 * À noter :
 * - le lien global est utilisé dans le menu
 * - possibilité d'avoir un lien par tarif (avce fallback sur le lien global)
 * - possibilité d'avoir un commentaire par tarif en plus du commentaire global
 * - `embedUrl` est la même billetterie, en version embarquable. Sa présence
 *   suffit à transformer les déclencheurs en boutons ouvrant un `<dialog>` ;
 *   l'enlever ramène de simples liens externes (cas des éditions archivées).
 *   `url` continue de servir aux vrais liens : « ouvrir dans un onglet » du
 *   dialog, et repli quand JS est désactivé.
 * - les deux URL sont écrites en entier, sans transformation au build : les
 *   paramètres d'intégration (ici les `embed`/`show*` de Skedl — on masque ce
 *   que la page porte déjà, bandeau, onglets, équipe, galerie, et on garde ce
 *   que la billetterie affiche mieux que nous, sponsors et boutique) se règlent
 *   donc ici, sans toucher au code. Penser à les faire évoluer ensemble.
 */

/** @type {import("./types.js").Ticketing} */
export default {
  comment:
    "inclut le petit-déjeuner, le repas le midi et le café pour la journée",
  url: "https://skedl.link/developersgroup-dijon/devfest-2026",
  // url: "https://skedl-pub-staging.vercel.app/developersgroup-dijon/dev-fest-dijon-2026?embed=true&showHero=false&showTabs=false&showTeam=false&showMerch=false&showGallery=false&showSponsors=false",
  embedUrl:
    "https://skedl.link/developersgroup-dijon/devfest-2026?embed=true&showHero=false&showTabs=false&showTeam=false&showMerch=true&showGallery=false&showSponsors=true",
  // "https://skedl-pub-staging.vercel.app/developersgroup-dijon/dev-fest-dijon-2026?embed=true&showHero=false&showTabs=false&showTeam=false&showMerch=false&showGallery=false&showSponsors=false",
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
      id: "reduit",
      name: "Tarif réduit",
      price: "20 €",
      comment:
        "Ce billet s'adresse aux personnes en situation de précarité, y compris les étudiants et les demandeurs d'emploi. Une pièce justificative pourra être demandée.",
    },
  ],
};
