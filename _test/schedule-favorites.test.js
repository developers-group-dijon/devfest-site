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

  test("ne plante pas en présence d'une .session.pause sans bouton fav", async () => {
    // La pause est dans le HTML — si le module tentait de lier un
    // bouton fav inexistant, `load()` lèverait. Vérification implicite
    // mais utile : c'est ce qui garantit la robustesse en prod.
    await load();
    // Sanity-check : un bouton normal continue de fonctionner.
    const btn = favButton("s1");
    btn.dispatchEvent(new globalThis.window.Event("click", { bubbles: true }));
    assert.equal(btn.getAttribute("aria-pressed"), "true");
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
