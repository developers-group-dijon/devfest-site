// Filtres côté client de la page programme : format, catégorie, recherche texte.
// Masque les cellules de la grille via l'attribut `hidden`. Les pauses/keynotes
// (sans `data-session-id`) restent toujours visibles.

/** @type {{ format: Set<string>, category: Set<string>, q: string }} */
const state = { format: new Set(), category: new Set(), q: "" };

/**
 * Met le texte en minuscule et retire les diacritiques pour permettre une
 * recherche tolérante aux accents.
 * @param {string} value
 * @returns {string}
 */
function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/**
 * @param {Element} card
 * @returns {boolean}
 */
function matches(card) {
  const formatId = card.getAttribute("data-format-id");
  const categoryId = card.getAttribute("data-category-id");
  if (state.format.size && (!formatId || !state.format.has(formatId))) {
    return false;
  }
  if (state.category.size && (!categoryId || !state.category.has(categoryId))) {
    return false;
  }
  if (state.q && !normalize(card.textContent ?? "").includes(state.q)) {
    return false;
  }
  return true;
}

/**
 * Applique l'état courant aux cellules de la grille, et met à jour
 * l'affichage du bouton "Réinitialiser" et du message d'absence de résultat.
 */
function apply() {
  let visibleCount = 0;
  document.querySelectorAll(".session[data-session-id]").forEach((card) => {
    if (matches(card)) {
      card.removeAttribute("hidden");
      visibleCount++;
    } else {
      card.setAttribute("hidden", "");
    }
  });
  const anyActive =
    state.format.size > 0 || state.category.size > 0 || state.q.length > 0;
  const reset = document.querySelector(".filter-reset");
  const empty = document.querySelector(".filter-empty");
  if (reset instanceof HTMLElement) {
    reset.toggleAttribute("hidden", !anyActive);
  }
  if (empty instanceof HTMLElement) {
    empty.toggleAttribute("hidden", !anyActive || visibleCount > 0);
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
