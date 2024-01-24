(function () {
  /**
   * Ajoute une classe sur le body quand la page est scrolled
   */
  window.addEventListener("scroll", (_) => {
    const SCROLLED_CLASSNAME = "scrolled";
    const classList = document.querySelector("body")?.classList;
    if (window.scrollY === 0) {
      classList?.remove(SCROLLED_CLASSNAME);
    } else {
      classList?.add(SCROLLED_CLASSNAME);
    }
  });
})();
