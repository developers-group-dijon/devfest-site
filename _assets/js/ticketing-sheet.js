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
// Limite mesurée sous Chrome 151 : quand le focus est passé DANS l'iframe,
// `Esc` ne ferme plus, l'événement clavier partant au document embarqué et non
// au nôtre (aucun `keydown` n'atteint notre document, même en capture). C'est
// inhérent au cross-origin : rien à corriger ici, et surveiller
// `document.activeElement` n'y changerait rien. Le seul vrai correctif serait
// que la billetterie émette un message de fermeture sur `Escape` — elle n'en
// émet pas (seul `skedl:resize` a été observé). Les issues de secours restent :
// le clic hors du panneau (`closedby="any"`), le bouton de fermeture — toujours
// visible et réatteignable en 3 tabulations depuis l'iframe — et le lien
// « ouvrir dans un onglet ».

const RESIZE_MESSAGE = "skedl:resize";

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
      // dur, pour ne pas casser si la billetterie change de domaine), et la
      // hauteur repart du défaut CSS le temps du prochain `skedl:resize`.
      embedOrigin = readOrigin(url);
      iframe.style.height = "";
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

  // La billetterie annonce la hauteur réelle de son contenu. On la suit pour
  // éviter l'espace mort et le double défilement (hauteur fixe de l'iframe qui
  // scrolle dans un corps qui scrolle aussi). Le `70dvh` de `ticketing.css`
  // reste le défaut avant le premier message ; le `max-height` du dialog et le
  // `overflow-y: auto` du corps bornent une valeur aberrante.
  //
  // Deux garde-fous avant d'écrire quoi que ce soit dans le DOM : l'origine doit
  // être celle de l'URL qu'on a chargée, et le message doit venir de NOTRE
  // iframe (une autre frame de même origine ne peut pas se faire passer pour
  // elle).
  window.addEventListener("message", (event) => {
    if (!embedOrigin || event.origin !== embedOrigin) {
      return;
    }
    if (event.source !== iframe.contentWindow) {
      return;
    }
    if (event.data?.type !== RESIZE_MESSAGE) {
      return;
    }
    const height = Number(event.data.height);
    if (!Number.isFinite(height) || height <= 0) {
      return;
    }
    iframe.style.height = `${height}px`;
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
