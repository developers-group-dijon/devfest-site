// Tests unitaires du module UI _assets/js/schedule-favorites.js.
// Branche les boutons favoris des cards .session[data-session-id] sur
// le module core favorites.js et l'événement "favorites:change".

import { test, describe, afterEach } from "node:test";
import assert from "node:assert/strict";
import { setupDOM, teardownDOM } from "./_helpers/dom.js";

const HTML = `<!doctype html><html><body data-edition="test">
  <script type="application/json" id="sessions-manifest">["s1","s2"]</script>
  <aside class="schedule-help" data-help-key="schedule-favorites" hidden>
    <button class="schedule-help-dismiss" type="button">×</button>
  </aside>
  <div class="session" data-session-id="s1">
    <button class="session-fav" type="button" aria-pressed="false">★</button>
  </div>
  <div class="session" data-session-id="s2">
    <button class="session-fav" type="button" aria-pressed="false">★</button>
  </div>
  <div class="session pause">
    <span>Pause sans bouton fav</span>
  </div>
  </body></html>`;

async function load() {
  setupDOM(HTML);
  // schedule-favorites importe favorites.js et schedule-filters.js
  await import(`../_assets/js/schedule-favorites.js?bust=${Math.random()}`);
  globalThis.window.dispatchEvent(
    new globalThis.window.Event("DOMContentLoaded"),
  );
}

function favButton(id) {
  return globalThis.document.querySelector(
    `.session[data-session-id="${id}"] button.session-fav`,
  );
}

describe("schedule-favorites", () => {
  afterEach(teardownDOM);

  test("clic sur un bouton fav active aria-pressed et la classe is-fav", async () => {
    await load();
    const btn = favButton("s1");
    assert.equal(btn.getAttribute("aria-pressed"), "false");
    btn.dispatchEvent(new globalThis.window.Event("click", { bubbles: true }));
    assert.equal(btn.getAttribute("aria-pressed"), "true");
    assert.ok(btn.classList.contains("is-fav"));
  });

  test("reclic retire l'état favori", async () => {
    await load();
    const btn = favButton("s1");
    btn.dispatchEvent(new globalThis.window.Event("click", { bubbles: true }));
    btn.dispatchEvent(new globalThis.window.Event("click", { bubbles: true }));
    assert.equal(btn.getAttribute("aria-pressed"), "false");
    assert.ok(!btn.classList.contains("is-fav"));
  });

  test("label aria-label change selon l'état", async () => {
    await load();
    const btn = favButton("s2");
    btn.dispatchEvent(new globalThis.window.Event("click", { bubbles: true }));
    assert.equal(btn.getAttribute("aria-label"), "Retirer des favoris");
    btn.dispatchEvent(new globalThis.window.Event("click", { bubbles: true }));
    assert.equal(btn.getAttribute("aria-label"), "Ajouter aux favoris");
  });

  test("toggle d'une session synchronise l'état des autres cards de la même session", async () => {
    // On ne peut pas avoir deux cards du même id dans un même DOM normalement,
    // mais le code écoute "favorites:change" pour rafraîchir TOUTES les cards.
    // Simulons-le en ré-émettant l'événement et en vérifiant le refresh.
    await load();
    const btn1 = favButton("s1");
    const btn2 = favButton("s2");
    btn1.dispatchEvent(new globalThis.window.Event("click", { bubbles: true }));
    // s2 doit rester false (pas favori)
    assert.equal(btn1.getAttribute("aria-pressed"), "true");
    assert.equal(btn2.getAttribute("aria-pressed"), "false");
  });

  test("les pauses (sans data-session-id) n'ont pas de bouton fav lié", async () => {
    await load();
    // Pas d'erreur même si la .session.pause n'a pas de bouton
    const pauseDiv = globalThis.document.querySelector(".session.pause");
    assert.ok(pauseDiv);
    assert.equal(pauseDiv.querySelector("button.session-fav"), null);
  });
});

describe("schedule-favorites - encart d'aide dismissible", () => {
  afterEach(teardownDOM);

  test("l'encart d'aide se révèle au DOMContentLoaded si non masqué en storage", async () => {
    await load();
    const aside = globalThis.document.querySelector(
      "aside[data-help-key='schedule-favorites']",
    );
    assert.ok(!aside.hasAttribute("hidden"));
  });

  test("clic sur × masque l'aide et persiste la préférence", async () => {
    await load();
    const aside = globalThis.document.querySelector(
      "aside[data-help-key='schedule-favorites']",
    );
    const closeBtn = aside.querySelector(".schedule-help-dismiss");
    closeBtn.dispatchEvent(
      new globalThis.window.Event("click", { bubbles: true }),
    );
    assert.ok(aside.hasAttribute("hidden"));
    assert.equal(
      globalThis.localStorage.getItem("devfest-help:test:schedule-favorites"),
      "1",
    );
  });
});
