// Bottom sheet billetterie : ouvre un embed iframe (Skedl) au lieu de
// naviguer vers le lien externe de billetterie, sur tous les éléments
// marqués `data-ticketing-trigger` (lien "Billetterie" du header, boutons
// "Acheter" des cartes de tarifs). Absent du DOM si `ticketing.embedUrl`
// n'est pas configuré (édition sans billetterie embarquée) : le module ne
// fait alors rien, les liens gardent leur comportement natif.

const OPEN_CLASSNAME = "open";
const TRANSITION_FALLBACK_MS = 350;

/** @type {?HTMLElement} */
let lastTrigger = null;

/**
 * @param {HTMLElement} sheet
 */
function loadIframeOnce(sheet) {
  const iframe = sheet.querySelector("[data-ticketing-iframe]");
  if (!(iframe instanceof window.HTMLIFrameElement)) {
    return;
  }
  if (iframe.getAttribute("src")) {
    return;
  }
  const src = iframe.getAttribute("data-src");
  if (src) {
    iframe.setAttribute("src", src);
  }
}

/**
 * @param {HTMLElement} sheet
 * @param {HTMLElement} trigger
 */
function openSheet(sheet, trigger) {
  lastTrigger = trigger;
  loadIframeOnce(sheet);
  sheet.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
  // Laisse le navigateur peindre l'état `hidden` retiré avant d'ajouter la
  // classe qui déclenche la transition CSS (sinon pas d'animation).
  window.requestAnimationFrame(() => {
    sheet.classList.add(OPEN_CLASSNAME);
  });
  const closeButton = sheet.querySelector(".ticketing-sheet-close");
  if (closeButton instanceof HTMLElement) {
    closeButton.focus();
  }
}

/**
 * @param {HTMLElement} sheet
 */
function closeSheet(sheet) {
  if (sheet.hasAttribute("hidden")) {
    return;
  }
  sheet.classList.remove(OPEN_CLASSNAME);
  document.body.style.overflow = "";
  const finish = () => {
    sheet.setAttribute("hidden", "");
  };
  const panel = sheet.querySelector(".ticketing-sheet-panel");
  if (panel instanceof HTMLElement) {
    panel.addEventListener("transitionend", finish, { once: true });
    window.setTimeout(finish, TRANSITION_FALLBACK_MS);
  } else {
    finish();
  }
  lastTrigger?.focus();
  lastTrigger = null;
}

/**
 * @param {MouseEvent} event
 * @returns {boolean}
 */
function isModifiedClick(event) {
  return (
    event.button !== 0 ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey
  );
}

window.addEventListener("DOMContentLoaded", () => {
  const sheet = document.querySelector(".ticketing-sheet");
  if (!(sheet instanceof HTMLElement)) {
    return;
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof window.Element)) {
      return;
    }
    const trigger = target.closest("[data-ticketing-trigger]");
    if (trigger instanceof HTMLElement) {
      if (isModifiedClick(/** @type {MouseEvent} */ (event))) {
        return;
      }
      event.preventDefault();
      openSheet(sheet, trigger);
      return;
    }
    if (target.closest("[data-ticketing-close]")) {
      closeSheet(sheet);
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSheet(sheet);
    }
  });
});
