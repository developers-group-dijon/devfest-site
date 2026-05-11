// Active les boutons favoris des cellules de la grille du programme.
// Synchronise leur état avec le module core (et donc avec la page session
// et le compteur du header) via l'événement "favorites:change".
import { has, toggle, onChange } from "./favorites.js";
import "./schedule-filters.js";

/**
 * @param {HTMLButtonElement} button
 * @param {boolean} active
 */
function applyState(button, active) {
  button.setAttribute("aria-pressed", active ? "true" : "false");
  const label = active ? "Retirer des favoris" : "Ajouter aux favoris";
  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);
  button.classList.toggle("is-fav", active);
}

/**
 * Met à jour l'état visuel de tous les boutons favoris de la grille.
 */
function refreshAll() {
  document.querySelectorAll(".session[data-session-id]").forEach((cell) => {
    const id = cell.getAttribute("data-session-id");
    const button = cell.querySelector("button.session-fav");
    if (id && button instanceof HTMLButtonElement) {
      applyState(button, has(id));
    }
  });
}

const HELP_STORAGE_PREFIX = "devfest-help:";

/**
 * @param {string} helpKey
 * @returns {string}
 */
function helpStorageKey(helpKey) {
  const edition = document.body?.dataset?.edition || "default";
  return `${HELP_STORAGE_PREFIX}${edition}:${helpKey}`;
}

/**
 * Active les encarts d'aide repérés par `aside[data-help-key]` :
 * lecture du flag "masqué" en localStorage, et binding du bouton "×"
 * pour persister la préférence. Indépendant du scope `devfest-favorites:*`.
 */
function setupDismissibleHelp() {
  document.querySelectorAll("aside[data-help-key]").forEach((aside) => {
    if (!(aside instanceof HTMLElement)) {
      return;
    }
    const key = aside.dataset.helpKey;
    if (!key) {
      return;
    }
    const storageKey = helpStorageKey(key);
    try {
      if (window.localStorage.getItem(storageKey) !== "1") {
        aside.removeAttribute("hidden");
      }
    } catch {
      // localStorage indisponible : on continue sans persistance.
    }
    const button = aside.querySelector(".schedule-help-dismiss");
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }
    button.addEventListener("click", () => {
      aside.setAttribute("hidden", "");
      try {
        window.localStorage.setItem(storageKey, "1");
      } catch {
        // Idem : on ignore silencieusement, l'utilisateur peut quand même fermer pour la session.
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".session[data-session-id]").forEach((cell) => {
    const id = cell.getAttribute("data-session-id");
    const button = cell.querySelector("button.session-fav");
    if (!id || !(button instanceof HTMLButtonElement)) {
      return;
    }
    applyState(button, has(id));
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggle(id);
    });
  });
  onChange(refreshAll);
  setupDismissibleHelp();
});
