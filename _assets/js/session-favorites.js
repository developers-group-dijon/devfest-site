// Active le bouton favori proéminent de la page d'une session.
import { has, toggle, onChange } from "./favorites.js";

/**
 * @param {HTMLButtonElement} button
 * @param {boolean} active
 */
function applyState(button, active) {
  button.setAttribute("aria-pressed", active ? "true" : "false");
  const label = active ? "Retirer des favoris" : "Ajouter aux favoris";
  button.setAttribute("aria-label", label);
  button.classList.toggle("is-fav", active);
  const labelElt = button.querySelector(".label");
  if (labelElt) {
    labelElt.textContent = label;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button.session-fav-large");
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
    toggle(id);
  });
  onChange(() => applyState(button, has(id)));
});
