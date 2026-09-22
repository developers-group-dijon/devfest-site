// Tests d'intégration jsdom de _assets/js/ticketing-sheet.js.

import { test, describe, afterEach } from "node:test";
import assert from "node:assert/strict";
import { setupDOM, teardownDOM } from "./_helpers/dom.js";

const EMBED_URL = "https://skedl.link/devtest/devtest-2-k-26?embed=true";

const HTML_WITH_SHEET = `<!doctype html><html><body data-edition="test">
  <a class="item ticketing-link" href="https://example.test/tickets" data-ticketing-trigger>Billetterie</a>
  <div class="ticketing-sheet" hidden role="dialog" aria-modal="true">
    <div class="ticketing-sheet-backdrop" data-ticketing-close></div>
    <div class="ticketing-sheet-panel">
      <button type="button" class="ticketing-sheet-close" data-ticketing-close>Fermer</button>
      <div class="ticketing-sheet-body">
        <iframe data-ticketing-iframe data-src="${EMBED_URL}" title="Billetterie"></iframe>
      </div>
    </div>
  </div>
  </body></html>`;

const HTML_WITHOUT_SHEET = `<!doctype html><html><body data-edition="test">
  <a class="item ticketing-link" href="https://example.test/tickets">Billetterie</a>
  </body></html>`;

/**
 * Charge le module et déclenche DOMContentLoaded pour activer les bindings.
 * @param {string} html
 */
async function load(html) {
  setupDOM(html);
  await import(`../_assets/js/ticketing-sheet.js?bust=${Math.random()}`);
  globalThis.window.dispatchEvent(
    new globalThis.window.Event("DOMContentLoaded"),
  );
}

function clickTrigger() {
  const trigger = globalThis.document.querySelector("[data-ticketing-trigger]");
  trigger.dispatchEvent(
    new globalThis.window.MouseEvent("click", {
      bubbles: true,
      button: 0,
      cancelable: true,
    }),
  );
}

function sheet() {
  return globalThis.document.querySelector(".ticketing-sheet");
}

function iframe() {
  return globalThis.document.querySelector("[data-ticketing-iframe]");
}

/**
 * Simule la fin de la transition CSS pour déclencher la fermeture différée.
 */
function finishTransition() {
  globalThis.document
    .querySelector(".ticketing-sheet-panel")
    .dispatchEvent(new globalThis.window.Event("transitionend"));
}

describe("ticketing-sheet", () => {
  afterEach(() => {
    teardownDOM();
  });

  test("un clic sur le déclencheur ouvre le sheet et charge l'iframe depuis data-src", async () => {
    await load(HTML_WITH_SHEET);
    assert.ok(sheet().hasAttribute("hidden"));
    assert.equal(iframe().getAttribute("src"), null);

    clickTrigger();

    assert.ok(!sheet().hasAttribute("hidden"));
    assert.equal(iframe().getAttribute("src"), EMBED_URL);
  });

  test("une réouverture ne recharge pas l'iframe", async () => {
    await load(HTML_WITH_SHEET);
    clickTrigger();
    iframe().setAttribute("src", "about:blank"); // simule une navigation dans l'embed
    finishTransition();
    globalThis.document
      .querySelector(".ticketing-sheet-close")
      .dispatchEvent(new globalThis.window.Event("click", { bubbles: true }));
    finishTransition();

    clickTrigger();

    assert.equal(iframe().getAttribute("src"), "about:blank");
  });

  test("Escape ferme le sheet", async () => {
    await load(HTML_WITH_SHEET);
    clickTrigger();
    assert.ok(!sheet().hasAttribute("hidden"));

    globalThis.window.dispatchEvent(
      new globalThis.window.KeyboardEvent("keydown", { key: "Escape" }),
    );
    finishTransition();

    assert.ok(sheet().hasAttribute("hidden"));
  });

  test("un clic sur le backdrop ferme le sheet", async () => {
    await load(HTML_WITH_SHEET);
    clickTrigger();

    globalThis.document
      .querySelector(".ticketing-sheet-backdrop")
      .dispatchEvent(new globalThis.window.Event("click", { bubbles: true }));
    finishTransition();

    assert.ok(sheet().hasAttribute("hidden"));
  });

  test("sans sheet dans le DOM (embedUrl non configuré), le module ne fait rien", async () => {
    await assert.doesNotReject(load(HTML_WITHOUT_SHEET));
  });
});
