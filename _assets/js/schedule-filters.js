// Filtres côté client de la page programme : format, catégorie, recherche texte.
// Masque les cellules de la grille via l'attribut `hidden`. Les pauses/keynotes
// (sans `data-session-id`) restent toujours visibles.
//
// La logique de filtrage elle-même est dans `./schedule-filters-utils.js`
// (pure, testable sans DOM). Ce module se contente d'extraire les
// descripteurs depuis le DOM, d'écouter les interactions UI et de
// répercuter le résultat sur l'attribut `hidden` des cards.

import {
  normalize,
  filterSessions,
  hasActiveFilters,
} from "./schedule-filters-utils.js";

/** @type {import("./schedule-filters-utils.js").FilterState} */
const state = { format: new Set(), category: new Set(), q: "" };

/**
 * @typedef CardEntry
 * @property {HTMLElement} element
 * @property {import("./schedule-filters-utils.js").SessionDescriptor} desc
 */

/** @type {CardEntry[]} */
let cards = [];

/**
 * Recense les cartes filtrables et capture leur descripteur. Appelé
 * une seule fois au DOMContentLoaded — le contenu textuel des sessions
 * ne change pas après build.
 */
function collectCards() {
  cards = [...document.querySelectorAll(".session[data-session-id]")].flatMap(
    (element) => {
      if (!(element instanceof HTMLElement)) {
        return [];
      }
      return [
        {
          element,
          desc: {
            id: element.getAttribute("data-session-id") ?? "",
            formatId: element.getAttribute("data-format-id"),
            categoryId: element.getAttribute("data-category-id"),
            text: element.textContent ?? "",
          },
        },
      ];
    },
  );
}

/**
 * Applique l'état courant aux cellules de la grille, et met à jour
 * l'affichage du bouton "Réinitialiser" et du message d'absence de résultat.
 */
function apply() {
  const visible = filterSessions(
    cards.map((c) => c.desc),
    state,
  );
  for (const { element, desc } of cards) {
    if (visible.has(desc.id)) {
      element.removeAttribute("hidden");
    } else {
      element.setAttribute("hidden", "");
    }
  }
  const anyActive = hasActiveFilters(state);
  const reset = document.querySelector(".filter-reset");
  const empty = document.querySelector(".filter-empty");
  if (reset instanceof HTMLElement) {
    reset.toggleAttribute("hidden", !anyActive);
  }
  if (empty instanceof HTMLElement) {
    empty.toggleAttribute("hidden", !anyActive || visible.size > 0);
  }
}

/**
 * @param {HTMLButtonElement} button
 */
function bindChip(button) {
  button.addEventListener("click", () => {
    const group = button.dataset.filter;
    const value = button.dataset.value;
    if (group !== "format" && group !== "category") {
      return;
    }
    if (!value) {
      return;
    }
    const set = state[group];
    if (set.has(value)) {
      set.delete(value);
      button.setAttribute("aria-pressed", "false");
    } else {
      set.add(value);
      button.setAttribute("aria-pressed", "true");
    }
    apply();
  });
}

/**
 * @param {HTMLInputElement} input
 */
function bindSearch(input) {
  /** @type {?number} */
  let timer = null;
  input.addEventListener("input", () => {
    if (timer !== null) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      state.q = normalize(input.value.trim());
      apply();
    }, 120);
  });
}

/**
 * @param {HTMLButtonElement} button
 * @param {?HTMLInputElement} input
 */
function bindReset(button, input) {
  button.addEventListener("click", () => {
    state.format.clear();
    state.category.clear();
    state.q = "";
    document
      .querySelectorAll("button.filter-chip")
      .forEach((chip) => chip.setAttribute("aria-pressed", "false"));
    if (input) {
      input.value = "";
    }
    apply();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  collectCards();
  document.querySelectorAll("button.filter-chip").forEach((chip) => {
    if (chip instanceof HTMLButtonElement) {
      bindChip(chip);
    }
  });
  const search = document.getElementById("schedule-search");
  if (search instanceof HTMLInputElement) {
    bindSearch(search);
  }
  const reset = document.querySelector(".filter-reset");
  if (reset instanceof HTMLButtonElement) {
    bindReset(reset, search instanceof HTMLInputElement ? search : null);
  }
});
