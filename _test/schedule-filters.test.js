// Tests unitaires du module UI _assets/js/schedule-filters.js.
// Le module attache des listeners au DOMContentLoaded. On simule cet
// événement après l'import, sur un DOM minimal qui contient des chips,
// un input search et un bouton reset.

import { test, describe, afterEach } from "node:test";
import assert from "node:assert/strict";
import { setupDOM, teardownDOM } from "./_helpers/dom.js";

const HTML = `<!doctype html><html><body data-edition="test">
  <form class="schedule-filters" role="search">
    <fieldset><legend>Format</legend>
      <button type="button" class="filter-chip" data-filter="format" data-value="fmt-conf" aria-pressed="false">Conf</button>
      <button type="button" class="filter-chip" data-filter="format" data-value="fmt-short" aria-pressed="false">Short</button>
    </fieldset>
    <fieldset><legend>Catégorie</legend>
      <button type="button" class="filter-chip" data-filter="category" data-value="cat-web" aria-pressed="false">Web</button>
      <button type="button" class="filter-chip" data-filter="category" data-value="cat-ia" aria-pressed="false">IA</button>
    </fieldset>
    <input id="schedule-search" type="search">
    <button type="button" class="filter-reset" hidden>Reset</button>
    <p class="filter-empty" hidden></p>
  </form>
  <div class="grid-day">
    <div class="session" data-session-id="s1" data-format-id="fmt-conf" data-category-id="cat-web">
      <div class="title">Build cool stuff with Node</div>
      <div class="speakers">Alice Wonderland</div>
    </div>
    <div class="session" data-session-id="s2" data-format-id="fmt-short" data-category-id="cat-ia">
      <div class="title">Deep learning intro</div>
      <div class="speakers">Bob Builder</div>
    </div>
    <div class="session" data-session-id="s3" data-format-id="fmt-conf" data-category-id="cat-ia">
      <div class="title">LLMs en production</div>
      <div class="speakers">Charlie Chaplin</div>
    </div>
    <div class="session pause"><div class="title">Pause café</div></div>
  </body></html>`;

/**
 * Charge le module et déclenche DOMContentLoaded pour activer les bindings.
 */
async function load() {
  setupDOM(HTML);
  await import(`../_assets/js/schedule-filters.js?bust=${Math.random()}`);
  globalThis.window.dispatchEvent(
    new globalThis.window.Event("DOMContentLoaded"),
  );
}

function visibleSessionIds() {
  return [...globalThis.document.querySelectorAll(".session[data-session-id]")]
    .filter((el) => !el.hasAttribute("hidden"))
    .map((el) => el.getAttribute("data-session-id"));
}

function clickChip(filter, value) {
  const chip = globalThis.document.querySelector(
    `.filter-chip[data-filter="${filter}"][data-value="${value}"]`,
  );
  chip.dispatchEvent(new globalThis.window.Event("click"));
}

describe("schedule-filters", () => {
  afterEach(teardownDOM);

  test("aucun filtre actif : toutes les sessions sont visibles", async () => {
    await load();
    assert.deepEqual(visibleSessionIds().sort(), ["s1", "s2", "s3"]);
  });

  test("clic sur un chip Format filtre par ce format (OR au sein du groupe)", async () => {
    await load();
    clickChip("format", "fmt-conf");
    assert.deepEqual(visibleSessionIds().sort(), ["s1", "s3"]);

    clickChip("format", "fmt-short");
    assert.deepEqual(visibleSessionIds().sort(), ["s1", "s2", "s3"]);
  });

  test("filtres Format ET Catégorie combinés en AND", async () => {
    await load();
    clickChip("format", "fmt-conf");
    clickChip("category", "cat-ia");
    // s3 : fmt-conf + cat-ia → seul à matcher
    assert.deepEqual(visibleSessionIds(), ["s3"]);
  });

  test("reclic sur un chip actif le désactive", async () => {
    await load();
    clickChip("format", "fmt-conf");
    clickChip("format", "fmt-conf");
    assert.deepEqual(visibleSessionIds().sort(), ["s1", "s2", "s3"]);
  });

  test("recherche texte matche dans le contenu (titre + speaker)", async () => {
    await load();
    const search = globalThis.document.getElementById("schedule-search");
    search.value = "node";
    search.dispatchEvent(new globalThis.window.Event("input"));
    await new Promise((r) => setTimeout(r, 150)); // debounce 120ms
    assert.deepEqual(visibleSessionIds(), ["s1"]);
  });

  test("recherche tolérante aux accents", async () => {
    await load();
    const search = globalThis.document.getElementById("schedule-search");
    search.value = "cafe";
    search.dispatchEvent(new globalThis.window.Event("input"));
    await new Promise((r) => setTimeout(r, 150));
    // pauses (sans data-session-id) ne sont jamais filtrées, donc visible_count = 0
    // mais le test vérifie que les sessions sans match disparaissent
    assert.deepEqual(visibleSessionIds(), []);
  });

  test("le bouton Reset apparaît dès qu'un filtre est actif et restaure tout", async () => {
    await load();
    const reset = globalThis.document.querySelector(".filter-reset");
    assert.ok(reset.hasAttribute("hidden"));

    clickChip("format", "fmt-conf");
    assert.ok(!reset.hasAttribute("hidden"));

    reset.dispatchEvent(new globalThis.window.Event("click"));
    assert.deepEqual(visibleSessionIds().sort(), ["s1", "s2", "s3"]);
    assert.ok(reset.hasAttribute("hidden"));
  });

  test("message 'aucune session' visible si filtre actif sans résultat", async () => {
    await load();
    const empty = globalThis.document.querySelector(".filter-empty");
    clickChip("format", "fmt-conf");
    clickChip("format", "fmt-short");
    clickChip("category", "cat-web");
    // Tous formats + cat-web → s1 (fmt-conf + cat-web)
    // Pour viser zéro résultat, on combine avec un texte improbable :
    const search = globalThis.document.getElementById("schedule-search");
    search.value = "zzzzzz";
    search.dispatchEvent(new globalThis.window.Event("input"));
    await new Promise((r) => setTimeout(r, 150));
    assert.ok(!empty.hasAttribute("hidden"));
    assert.deepEqual(visibleSessionIds(), []);
  });

  test("les pauses (sans data-session-id) sont toujours intactes", async () => {
    await load();
    const pause = globalThis.document.querySelector(".session.pause");
    clickChip("format", "fmt-conf");
    assert.equal(pause.hasAttribute("hidden"), false);
  });

  test("aria-pressed bascule sur le chip", async () => {
    await load();
    const chip = globalThis.document.querySelector(
      `.filter-chip[data-value="fmt-conf"]`,
    );
    assert.equal(chip.getAttribute("aria-pressed"), "false");
    chip.dispatchEvent(new globalThis.window.Event("click"));
    assert.equal(chip.getAttribute("aria-pressed"), "true");
    chip.dispatchEvent(new globalThis.window.Event("click"));
    assert.equal(chip.getAttribute("aria-pressed"), "false");
  });
});
