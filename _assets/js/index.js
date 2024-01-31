(function () {
  /**
   * Choisit 4 speakers aléatoirement.
   */
  window.addEventListener("DOMContentLoaded", (_) => {
    const speakersElt = [
      ...document.querySelectorAll(".speaker[data-to-hide]"),
    ];
    const placeholdersElt = [
      ...document.querySelectorAll(".speaker[data-to-remove]"),
    ];
    const limit = Math.min(placeholdersElt.length, speakersElt.length);

    const ids = new Set();
    while (ids.size < limit) {
      const i = Math.floor(Math.random() * speakersElt.length);
      if (ids.has(i)) {
        continue;
      }
      ids.add(i);
      placeholdersElt[ids.size - 1].remove();
      speakersElt[i].removeAttribute("data-to-hide");
    }
    document
      .querySelectorAll(".speaker[data-to-hide]")
      .forEach((e) => e.remove());
  });
})();
