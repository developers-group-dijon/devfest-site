// Bottom sheet de billetterie : les déclencheurs marqués
// `data-ticketing-trigger` (lien "Billetterie" du header, cartes de tarifs de
// l'accueil) ouvrent un `<dialog>` embarquant l'URL portée par le déclencheur.
//
// Le module et le `<dialog>` ne sont présents que si `ticketing.embed` est vrai
// (cf. `_layouts/base.njk`) ; sinon les déclencheurs sont de simples liens
// externes et il n'y a rien à câbler.
//
// Tout ce qui fait la modalité — piège de focus, inertage de l'arrière-plan,
// `Esc`, restauration du focus sur le déclencheur à la fermeture, `::backdrop` —
// est délégué à `showModal()`. Ne pas réintroduire de gestion manuelle ici.
//
// Quand le focus est passé DANS l'iframe, `Esc` n'atteint plus notre document
// (l'événement clavier part au document embarqué, cross-origin oblige). La
// billetterie le relaie donc par un message `skedl:close`, qui ferme le
// dialog. Elle ne l'émet pas quand `Esc` sert à fermer une de ses propres
// modales (choix de taille, galerie). Restent en plus le clic hors du panneau
// (`closedby="any"`), le bouton de fermeture et le lien « ouvrir dans un
// onglet ».
//
// La hauteur de l'iframe n'est pas pilotée ici : elle remplit le sheet et la
// billetterie défile elle-même (`layout=fill`, cf. `_data/ticketing.js`).

const CLOSE_MESSAGE = "skedl:close";

window.addEventListener("DOMContentLoaded", () => {
  const dialog = document.querySelector("dialog.ticketing-sheet");
  if (!(dialog instanceof window.HTMLDialogElement)) {
    return;
  }
  const iframe = dialog.querySelector("[data-ticketing-iframe]");
  if (!(iframe instanceof window.HTMLIFrameElement)) {
    return;
  }

  /** @type {?string} origine de l'embed actuellement chargé, seule autorisée à nous parler */
  let embedOrigin = null;

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof window.Element)) {
      return;
    }
    const trigger = target.closest("[data-ticketing-trigger]");
    if (!(trigger instanceof window.HTMLElement)) {
      return;
    }
    const url = trigger.dataset.ticketingUrl;
    if (!url) {
      return;
    }
    // Une seule iframe pour tous les déclencheurs : on ne réécrit `src` que si
    // l'URL change (chaque tarif peut avoir la sienne). Réouvrir le même
    // déclencheur ne relance donc pas le chargement de la billetterie, et le
    // parcours déjà entamé dedans est préservé.
    if (iframe.getAttribute("src") !== url) {
      iframe.setAttribute("src", url);
      // Nouvelle URL : l'origine attendue est déduite d'elle (et non codée en
      // dur, pour ne pas casser si la billetterie change de domaine).
      embedOrigin = readOrigin(url);
    }
    dialog.showModal();
  });

  dialog.querySelectorAll("[data-ticketing-close]").forEach((button) => {
    button.addEventListener("click", () => {
      dialog.close();
    });
  });

  // `closedby="any"` gère le clic sur le backdrop nativement. Repli pour les
  // navigateurs qui ne l'implémentent pas encore (Safari, Firefox ESR) : sur un
  // clic dans le backdrop, la cible est le `<dialog>` lui-même — ce qui n'est
  // vrai que parce qu'il n'a aucun padding (cf. `_assets/css/ticketing.css`).
  if (!("closedBy" in window.HTMLDialogElement.prototype)) {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }

  // Deux garde-fous avant d'agir : l'origine doit être celle de l'URL qu'on a
  // chargée, et le message doit venir de NOTRE iframe (une autre frame de même
  // origine ne peut pas se faire passer pour elle).
  window.addEventListener("message", (event) => {
    if (!embedOrigin || event.origin !== embedOrigin) {
      return;
    }
    if (event.source !== iframe.contentWindow) {
      return;
    }
    if (event.data?.type !== CLOSE_MESSAGE) {
      return;
    }
    dialog.close();
  });
});

/**
 * @param {string} url
 * @returns {?string} origine de l'URL, ou null si elle est inexploitable
 */
function readOrigin(url) {
  try {
    return new URL(url, window.location.href).origin;
  } catch {
    return null;
  }
}
