// Tests d'intégration jsdom de _assets/js/schedule-filters.js.
// La logique pure de filtrage (matching format/catégorie/recherche, OR/AND,
// normalisation des accents) est testée séparément dans
// `schedule-filters-utils.test.js`. Ce fichier ne garde que ce qui dépend
// vraiment du DOM : reset, message d'absence, exclusion des pauses,
// accessibilité (aria-pressed).

import { test, describe, afterEach } from "node:test";
import assert from "node:assert/strict";
import { setupDOM, teardownDOM } from "./_helpers/dom.js";
import { installFakeTimers } from "./_helpers/timers.js";

/** @type {?ReturnType<typeof installFakeTimers>} */
let fakeTimers = null;

// HTML minimal pour les 4 tests qui restent (reset, message empty,
// pauses intactes, aria-pressed) : 1 chip Format, 1 input, 1 bouton
// reset, 1 .filter-empty, 1 session matchante, 1 session non
// matchante (pour avoir quelque chose à masquer/restaurer), 1 pause.
const HTML = `<!doctype html><html><body data-edition="test">
  <button type="button" class="filter-chip" data-filter="format" data-value="fmt-conf" aria-pressed="false">Conf</button>
  <input id="schedule-search" type="search">
  <button type="button" class="filter-reset" hidden>Reset</button>
  <p class="filter-empty" hidden></p>
  <div class="session" data-session-id="s1" data-format-id="fmt-conf">s1</div>
  <div class="session" data-session-id="s2" data-format-id="fmt-other">s2</div>
  <div class="session pause">Pause</div>
  </body></html>`;

/**
 * Charge le module et déclenche DOMContentLoaded pour activer les bindings.
 * Installe aussi des fake timers afin de flusher le debounce de la recherche
 * de manière déterministe (cf. `flushSearch` ci-dessous).
 */
async function load() {
  setupDOM(HTML);
  fakeTimers = installFakeTimers();
  await import(`../_assets/js/schedule-filters.js?bust=${Math.random()}`);
  globalThis.window.dispatchEvent(
    new globalThis.window.Event("DOMContentLoaded"),
  );
}

/**
 * Exécute immédiatement le callback du debounce posé par le champ de recherche.
 */
function flushSearch() {
  fakeTimers?.flush();
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
  afterEach(() => {
    fakeTimers?.restore();
    fakeTimers = null;
    teardownDOM();
  });

  test("le bouton Reset apparaît dès qu'un filtre est actif et restaure tout", async () => {
    await load();
    const reset = globalThis.document.querySelector(".filter-reset");
    assert.ok(reset.hasAttribute("hidden"));

    clickChip("format", "fmt-conf"); // s2 (fmt-other) doit être masquée
    assert.ok(!reset.hasAttribute("hidden"));
    assert.deepEqual(visibleSessionIds(), ["s1"]);

    reset.dispatchEvent(new globalThis.window.Event("click"));
    assert.deepEqual(visibleSessionIds().sort(), ["s1", "s2"]);
    assert.ok(reset.hasAttribute("hidden"));
  });

  test("message 'aucune session' visible si filtre actif sans résultat", async () => {
    await load();
    const empty = globalThis.document.querySelector(".filter-empty");
    const search = globalThis.document.getElementById("schedule-search");
    search.value = "zzzzzz"; // aucun match
    search.dispatchEvent(new globalThis.window.Event("input"));
    flushSearch();
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
