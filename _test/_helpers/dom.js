// Helper de configuration jsdom pour les tests qui touchent au DOM.
// Usage :
//   import { setupDOM, teardownDOM } from "./_helpers/dom.js";
//   beforeEach(() => setupDOM(`<body>…</body>`));
//   afterEach(teardownDOM);

import { JSDOM } from "jsdom";

const ORIGINAL = {};

/**
 * jsdom (29.x) expose `HTMLDialogElement` mais n'implémente ni `showModal()`
 * ni `close()` : il n'a pas de top layer. On pose un stub minimal adossé à
 * l'attribut `open`, suffisant pour vérifier le câblage des déclencheurs.
 *
 * Ce qui n'est donc pas couvert par les tests l'est parce que la plateforme
 * s'en charge : piège de focus, inertage de l'arrière-plan, `Esc`, retour du
 * focus sur le déclencheur, `::backdrop`. `closedBy` est laissé absent, ce qui
 * fait tester le chemin de repli du light-dismiss.
 *
 * @param {import("jsdom").DOMWindow} window
 */
function stubDialog(window) {
  const proto = window.HTMLDialogElement?.prototype;
  if (!proto || typeof proto.showModal === "function") {
    return;
  }
  proto.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  proto.close = function close() {
    if (!this.hasAttribute("open")) {
      return;
    }
    this.removeAttribute("open");
    this.dispatchEvent(new window.Event("close"));
  };
}

/**
 * Initialise jsdom et expose `window`, `document`, `HTMLElement`, etc. en
 * globals afin qu'un module importé après l'appel les trouve disponibles.
 *
 * @param {string} html - HTML complet à charger (ex. "<body>…</body>").
 * @param {{ url?: string }} [opts]
 * @returns {JSDOM}
 */
export function setupDOM(html, opts = {}) {
  const dom = new JSDOM(html, {
    url: opts.url ?? "http://localhost/",
    pretendToBeVisual: true,
  });
  stubDialog(dom.window);
  // Note : on évite "navigator", "URL", "URLSearchParams" qui sont déjà
  // fournis (et parfois read-only) par Node 20+.
  for (const key of [
    "window",
    "document",
    "Element",
    "HTMLElement",
    "HTMLButtonElement",
    "HTMLDialogElement",
    "HTMLIFrameElement",
    "HTMLInputElement",
    "HTMLAnchorElement",
    "HTMLDivElement",
    "Event",
    "CustomEvent",
    "MouseEvent",
    "KeyboardEvent",
    "location",
  ]) {
    try {
      ORIGINAL[key] = globalThis[key];
      globalThis[key] = dom.window[key] ?? dom.window;
    } catch {
      // global read-only (ex. location dans certaines versions de Node)
      // → on l'ignore, le module testé utilisera window.location.
    }
  }
  // localStorage : jsdom le fournit sur window, on l'expose aussi globalement.
  ORIGINAL.localStorage = globalThis.localStorage;
  globalThis.localStorage = dom.window.localStorage;
  return dom;
}

/**
 * Restaure les globals initiaux. À appeler après chaque test pour éviter les
 * fuites entre fichiers de tests.
 */
export function teardownDOM() {
  for (const key of Object.keys(ORIGINAL)) {
    if (ORIGINAL[key] === undefined) {
      delete globalThis[key];
    } else {
      globalThis[key] = ORIGINAL[key];
    }
    delete ORIGINAL[key];
  }
}
