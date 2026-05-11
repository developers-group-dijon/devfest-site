// Active les boutons favoris de la page d'une session :
// - le gros bouton principal de l'en-tête (.session-fav-large)
// - les petits boutons des sessions "en même temps" (.session-fav)
import { has, toggle, onChange } from "./favorites.js";

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
  const labelElt = button.querySelector(".label");
  if (labelElt) {
    labelElt.textContent = label;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  /** @type {{ button: HTMLButtonElement, id: string }[]} */
  const bound = [];
  document
    .querySelectorAll("button.session-fav-large, button.session-fav")
    .forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) {
        return;
      }
      const id = button.getAttribute("data-session-id");
      if (!id) {
        return;
      }
      applyState(button, has(id));
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(id);
      });
      bound.push({ button, id });
    });
  onChange(() => {
    for (const { button, id } of bound) {
      applyState(button, has(id));
    }
  });
});
