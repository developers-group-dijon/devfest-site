// Tests d'intégration du module core favoris (_assets/js/favorites.js).
// La logique pure (parsing, filtrage, toggle, decode hash, build URL)
// est testée dans `favorites-utils.test.js`. Ce fichier ne garde que
// les comportements qui dépendent vraiment de l'environnement navigateur :
// - lecture/écriture localStorage scopée par édition
// - lecture de `<script id="sessions-manifest">` au chargement
// - purge automatique au chargement (INIT_DROPPED)
// - intégration window.location.hash / origin / history
// - événement `favorites:change` dispatché sur `document`
//
// Le module lit document/localStorage au moment de son chargement.
// On prépare donc le DOM AVANT chaque import et on cache-bust pour
// ré-évaluer le module dans des scénarios différents.

import { test, describe, afterEach } from "node:test";
import assert from "node:assert/strict";
import { setupDOM, teardownDOM } from "./_helpers/dom.js";

/**
 * @param {Object} [opts]
 * @param {string[]} [opts.manifest] - ids embarqués dans #sessions-manifest
 * @param {string[]} [opts.stored] - ids déjà dans localStorage
 * @param {string} [opts.hash] - location.hash initial
 * @param {string} [opts.edition] - data-edition du body (défaut "test-ed")
 */
async function loadModule(opts = {}) {
  const edition = opts.edition ?? "test-ed";
  const manifestScript =
    opts.manifest !== undefined
      ? `<script type="application/json" id="sessions-manifest">${JSON.stringify(opts.manifest)}</script>`
      : "";
  const html = `<!doctype html><html><body data-edition="${edition}">${manifestScript}</body></html>`;
  const url = `http://localhost/${opts.hash ?? ""}`;
  setupDOM(html, { url });

  if (opts.stored) {
    globalThis.localStorage.setItem(
      `devfest-favorites:${edition}`,
      JSON.stringify({ ids: opts.stored }),
    );
  }

  // Cache-bust pour forcer une nouvelle évaluation du module à chaque test.
  return import(`../_assets/js/favorites.js?bust=${Math.random()}`);
}

describe("favorites - lecture/écriture localStorage", () => {
  afterEach(teardownDOM);

  test("list() retourne les ids déjà stockés", async () => {
    const fav = await loadModule({
      manifest: ["a", "b", "c"],
      stored: ["a", "b"],
    });
    assert.deepEqual(fav.list(), ["a", "b"]);
  });

  test("toggle ajoute puis retire un id", async () => {
    const fav = await loadModule({ manifest: ["a", "b"] });
    fav.toggle("a");
    assert.deepEqual(fav.list(), ["a"]);
    fav.toggle("a");
    assert.deepEqual(fav.list(), []);
  });

  test("has reflète l'état courant", async () => {
    const fav = await loadModule({ manifest: ["x"] });
    assert.equal(fav.has("x"), false);
    fav.toggle("x");
    assert.equal(fav.has("x"), true);
  });

  test("set remplace la liste, dédoublonne et filtre selon manifest", async () => {
    const fav = await loadModule({ manifest: ["a", "b"] });
    fav.set(["a", "b", "a", "unknown", ""]);
    assert.deepEqual(fav.list(), ["a", "b"]);
  });

  test("merge ajoute aux ids existants (union sans doublons)", async () => {
    const fav = await loadModule({
      manifest: ["a", "b", "c"],
      stored: ["a"],
    });
    fav.merge(["b", "a"]);
    assert.deepEqual(fav.list().sort(), ["a", "b"]);
  });
});

describe("favorites - filtrage par manifeste (knownIds)", () => {
  afterEach(teardownDOM);

  test("filtre les ids absents du manifeste à la lecture", async () => {
    const fav = await loadModule({
      manifest: ["a", "b"],
      stored: ["a", "stale-from-another-edition", "b"],
    });
    // Au chargement, les ids inconnus sont purgés du localStorage
    assert.deepEqual(fav.list(), ["a", "b"]);
    assert.equal(fav.initialDropped(), 1);
  });

  test("sans manifeste, ne filtre rien et knownIds() est un Set vide", async () => {
    const fav = await loadModule({ stored: ["foo", "bar"] });
    assert.deepEqual(fav.list(), ["foo", "bar"]);
    assert.equal(fav.knownIds().size, 0);
    assert.equal(fav.initialDropped(), 0);
  });
});

describe("favorites - permalien (readHash, clearHash, buildShareUrl)", () => {
  afterEach(teardownDOM);

  test("readHash() décode #fav=a,b,c et filtre selon manifest", async () => {
    const fav = await loadModule({
      manifest: ["a", "c"],
      hash: "#fav=a,b,c",
    });
    const res = fav.readHash();
    assert.deepEqual(res.ids, ["a", "c"]);
    assert.equal(res.dropped, 1); // "b" filtré
  });

  test("clearHash() retire #fav=... de l'URL", async () => {
    const fav = await loadModule({ manifest: ["a"], hash: "#fav=a" });
    assert.equal(globalThis.window.location.hash, "#fav=a");
    fav.clearHash();
    assert.equal(globalThis.window.location.hash, "");
  });

  test("buildShareUrl utilise window.location.origin", async () => {
    const fav = await loadModule({ manifest: ["a", "b"] });
    assert.equal(
      fav.buildShareUrl(["a", "b"]),
      "http://localhost/favoris/#fav=a,b",
    );
  });
});

describe("favorites - événement favorites:change", () => {
  afterEach(teardownDOM);

  test("toggle déclenche un favorites:change avec la nouvelle liste", async () => {
    const fav = await loadModule({ manifest: ["a"] });
    let received = null;
    fav.onChange((ids) => {
      received = ids;
    });
    fav.toggle("a");
    assert.deepEqual(received, ["a"]);
  });

  test("onChange retourne une fonction de désinscription", async () => {
    const fav = await loadModule({ manifest: ["a"] });
    let count = 0;
    const off = fav.onChange(() => count++);
    fav.toggle("a");
    off();
    fav.toggle("a");
    assert.equal(count, 1);
  });
});
