// Helper de configuration jsdom pour les tests qui touchent au DOM.
// Usage :
//   import { setupDOM, teardownDOM } from "./_helpers/dom.js";
//   beforeEach(() => setupDOM(`<body>…</body>`));
//   afterEach(teardownDOM);

import { JSDOM } from "jsdom";

const ORIGINAL = {};

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
  // Note : on évite "navigator", "URL", "URLSearchParams" qui sont déjà
  // fournis (et parfois read-only) par Node 20+.
  for (const key of [
    "window",
    "document",
    "HTMLElement",
    "HTMLButtonElement",
    "HTMLInputElement",
    "HTMLAnchorElement",
    "HTMLDivElement",
    "Event",
    "CustomEvent",
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
