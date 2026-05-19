// Page "Mon planning" — révèle les sessions favorites, les regroupe
// par jour, détecte et marque les conflits horaires.
//
// Les cartes des sessions sont rendues exhaustivement au build et
// masquées par défaut (attribut `hidden`). Ce module retire `hidden`
// uniquement sur les sessions favoris/aperçus puis applique les
// regroupements de conflit en wrappant les clusters dans un
// `<div class="fav-conflict">`.
import {
  list,
  toggle,
  set,
  merge,
  onChange,
  readHash,
  clearHash,
  buildShareUrl,
  initialDropped,
} from "./favorites.js";
import { droppedMessage, selectDayCards } from "./favoris-utils.js";

/** @type {?string[]} ids issus du permalien (`#fav=...`), null si pas de hash */
let previewIds = null;

/**
 * @typedef Card
 * @property {HTMLElement} element
 * @property {string} id
 * @property {number} start timestamp ms
 * @property {number} end timestamp ms
 */

/**
 * @param {Element} element
 * @returns {?Card}
 */
function readCard(element) {
  if (!(element instanceof HTMLElement)) {
    return null;
  }
  const id = element.dataset.sessionId;
  const start = Number(element.dataset.start);
  const duration = Number(element.dataset.duration);
  if (!id || !Number.isFinite(start) || !Number.isFinite(duration)) {
    return null;
  }
  return { element, id, start, end: start + duration };
}

/**
 * Sort le wrapper de conflit (s'il existe) pour remettre la carte
 * directement dans la liste du jour, dans le bon ordre.
 * @param {HTMLElement} listElement
 */
function unwrapConflicts(listElement) {
  listElement.querySelectorAll(":scope > .fav-conflict").forEach((wrapper) => {
    while (wrapper.firstChild) {
      wrapper.parentNode?.insertBefore(wrapper.firstChild, wrapper);
    }
    wrapper.remove();
  });
  listElement.querySelectorAll(".fav-card.in-conflict").forEach((card) => {
    card.classList.remove("in-conflict");
    const badge = card.querySelector(".fav-card-conflict-badge");
    if (badge instanceof HTMLElement) {
      badge.setAttribute("hidden", "");
    }
  });
}

/**
 * @param {Card[]} cluster
 * @param {HTMLElement} listElement
 */
function wrapCluster(cluster, listElement) {
  const wrapper = document.createElement("div");
  wrapper.className = "fav-conflict";
  const first = cluster[0].element;
  listElement.insertBefore(wrapper, first);
  for (const card of cluster) {
    wrapper.appendChild(card.element);
    card.element.classList.add("in-conflict");
    const badge = card.element.querySelector(".fav-card-conflict-badge");
    if (badge instanceof HTMLElement) {
      badge.removeAttribute("hidden");
    }
  }
}

/**
 * @param {Set<string>} favIds
 */
function applySelection(favIds) {
  const empty = document.querySelector(".fav-empty");
  let visibleTotal = 0;

  document.querySelectorAll("section.fav-day").forEach((section) => {
    if (!(section instanceof HTMLElement)) {
      return;
    }
    const list = section.querySelector(".fav-day-list");
    if (!(list instanceof HTMLElement)) {
      return;
    }
    unwrapConflicts(list);

    // Lecture du DOM → liste de cartes typées. La fonction pure
    // `selectDayCards` fait ensuite tout le travail métier.
    /** @type {Card[]} */
    const allCards = [];
    list.querySelectorAll(".fav-card").forEach((cardElt) => {
      const card = readCard(cardElt);
      if (card) {
        allCards.push(card);
      }
    });
    const { visible, conflictClusters } = selectDayCards(allCards, favIds);
    const visibleIds = new Set(visible.map((c) => c.id));

    // Application au DOM : visibilité par card, wrap des clusters,
    // visibilité de la section, total agrégé.
    for (const card of allCards) {
      if (visibleIds.has(card.id)) {
        card.element.removeAttribute("hidden");
      } else {
        card.element.setAttribute("hidden", "");
      }
    }
    for (const cluster of conflictClusters) {
      wrapCluster(cluster, list);
    }
    if (visible.length === 0) {
      section.setAttribute("hidden", "");
    } else {
      section.removeAttribute("hidden");
      visibleTotal += visible.length;
    }
  });

  if (empty instanceof HTMLElement) {
    if (visibleTotal === 0) {
      empty.removeAttribute("hidden");
    } else {
      empty.setAttribute("hidden", "");
    }
  }
}

/**
 * Branche les boutons "Retirer" de chaque carte sur le module favoris.
 * En mode aperçu, ils sont masqués (les favoris locaux ne sont pas modifiés).
 */
function bindRemoveButtons() {
  document.querySelectorAll("button.fav-card-remove").forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }
    const id = button.dataset.sessionId;
    if (!id) {
      return;
    }
    button.addEventListener("click", (event) => {
      event.preventDefault();
      toggle(id);
    });
  });
}

/**
 * @returns {string[]} liste des ids à afficher (préviewIds en mode aperçu, sinon localStorage)
 */
function effectiveIds() {
  return previewIds ?? list();
}

/**
 * Met à jour l'affichage en fonction de l'état (mode aperçu ou non).
 */
function refresh() {
  applySelection(new Set(effectiveIds()));
  document.querySelectorAll("button.fav-card-remove").forEach((b) => {
    if (b instanceof HTMLElement) {
      b.style.display = previewIds ? "none" : "";
    }
  });
  const banner = document.querySelector(".fav-preview-banner");
  const toolbar = document.querySelector(".fav-toolbar");
  if (banner instanceof HTMLElement) {
    if (previewIds) {
      banner.removeAttribute("hidden");
    } else {
      banner.setAttribute("hidden", "");
    }
  }
  if (toolbar instanceof HTMLElement) {
    const ids = effectiveIds();
    if (!previewIds && ids.length > 0) {
      toolbar.removeAttribute("hidden");
    } else {
      toolbar.setAttribute("hidden", "");
    }
  }
}

/**
 * Ouvre la modale d'import et résout sur l'action choisie.
 * @returns {Promise<"merge"|"replace"|"cancel">}
 */
function openImportModal() {
  return new Promise((resolve) => {
    const modal = document.querySelector(".fav-modal");
    if (!(modal instanceof HTMLElement)) {
      resolve("cancel");
      return;
    }
    /** @param {"merge"|"replace"|"cancel"} choice */
    const close = (choice) => {
      modal.setAttribute("hidden", "");
      resolve(choice);
    };
    modal
      .querySelector(".fav-modal-merge")
      ?.addEventListener("click", () => close("merge"), { once: true });
    modal
      .querySelector(".fav-modal-replace")
      ?.addEventListener("click", () => close("replace"), { once: true });
    modal
      .querySelector(".fav-modal-cancel")
      ?.addEventListener("click", () => close("cancel"), { once: true });
    modal.removeAttribute("hidden");
  });
}

/**
 * Branche le bouton "Enregistrer dans le navigateur" du bandeau aperçu.
 */
function bindImportButton() {
  const button = document.querySelector(".fav-import-button");
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    if (!previewIds) {
      return;
    }
    const incoming = previewIds;
    const local = list();
    /** @type {"merge"|"replace"|"cancel"} */
    let choice = "replace";
    if (local.length > 0) {
      choice = await openImportModal();
    }
    if (choice === "cancel") {
      return;
    }
    if (choice === "merge") {
      merge(incoming);
    } else {
      set(incoming);
    }
    previewIds = null;
    clearHash();
    refresh();
  });
}

/**
 * Branche le bouton "Partager" : Web Share API si dispo, fallback clipboard.
 */
function bindShareButton() {
  const button = document.querySelector(".fav-share-button");
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const ids = list();
    if (ids.length === 0) {
      return;
    }
    const url = buildShareUrl(ids);
    const title = document.title;
    const text = "Mon planning DevFest";
    /** @type {?Navigator & {share?: (data: { title?: string, text?: string, url?: string }) => Promise<void>}} */
    const nav = navigator;
    if (typeof nav?.share === "function") {
      try {
        await nav.share({ title, text, url });
        return;
      } catch {
        // Annulation utilisateur ou erreur : on bascule sur clipboard.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      const feedback = document.querySelector(".fav-share-feedback");
      if (feedback instanceof HTMLElement) {
        feedback.removeAttribute("hidden");
        setTimeout(() => feedback.setAttribute("hidden", ""), 2500);
      }
    } catch {
      window.prompt("Copiez ce lien pour partager votre planning :", url);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const fromHash = readHash();
  if (fromHash && (fromHash.ids.length > 0 || fromHash.dropped > 0)) {
    previewIds = fromHash.ids;
    if (fromHash.dropped > 0) {
      const droppedElt = document.querySelector(".fav-preview-dropped");
      if (droppedElt instanceof HTMLElement) {
        droppedElt.textContent = droppedMessage(fromHash.dropped, "hash");
        droppedElt.removeAttribute("hidden");
      }
    }
  } else {
    const droppedLocal = initialDropped();
    if (droppedLocal > 0) {
      const localElt = document.querySelector(".fav-local-dropped");
      if (localElt instanceof HTMLElement) {
        localElt.textContent = droppedMessage(droppedLocal, "local");
        localElt.removeAttribute("hidden");
      }
    }
  }
  bindRemoveButtons();
  bindImportButton();
  bindShareButton();
  refresh();
  onChange(() => refresh());
});
