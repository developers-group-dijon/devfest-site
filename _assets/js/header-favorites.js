// Met à jour le compteur de favoris affiché dans le lien
// "Mon planning" du header. Chargé sur toutes les pages.
import { list, onChange } from "./favorites.js";

/**
 * @param {string[]} ids
 */
function render(ids) {
  const counter = document.querySelector(".site-header .fav-count");
  if (!(counter instanceof HTMLElement)) {
    return;
  }
  const count = ids.length;
  counter.textContent = `${count}`;
  if (count === 0) {
    counter.setAttribute("hidden", "");
  } else {
    counter.removeAttribute("hidden");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  render(list());
  onChange(render);
});
