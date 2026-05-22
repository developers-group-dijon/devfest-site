// Fallback pour les navigateurs qui ne supportent pas encore
// `container-type: scroll-state` (Safari, Firefox, Chrome <134). Sur les
// navigateurs modernes, le CSS pilote tout via `@container page
// scroll-state(...)` et ce script ne fait rien.
//
// Quand le fallback est actif, on utilise un IntersectionObserver sur une
// sentinelle d'1px en haut du body : la callback ne tire qu'au
// franchissement du seuil (entrée/sortie viewport), donc zéro travail par
// frame de scroll → INP nul.
(function () {
  if (CSS.supports("(container-type: scroll-state)")) {
    return;
  }
  const SCROLLED_CLASSNAME = "scrolled";
  const sentinel = document.createElement("div");
  sentinel.style.position = "absolute";
  sentinel.style.top = "0";
  sentinel.style.left = "0";
  sentinel.style.width = "1px";
  sentinel.style.height = "1px";
  sentinel.style.pointerEvents = "none";
  sentinel.setAttribute("aria-hidden", "true");
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => {
    document.body.classList.toggle(SCROLLED_CLASSNAME, !entry.isIntersecting);
  }).observe(sentinel);
})();
