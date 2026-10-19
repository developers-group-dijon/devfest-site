// Tests d'intégration jsdom de _assets/js/ticketing-sheet.js.
//
// Périmètre : le câblage entre les déclencheurs et le `<dialog>` (quelle URL
// est chargée, quand elle est rechargée, ce qui ferme). La modalité elle-même
// (piège de focus, `Esc`, retour du focus) est assurée par `showModal()` et
// n'est pas retestée ici — cf. le stub dans `_helpers/dom.js`.

import { test, describe, afterEach } from "node:test";
import assert from "node:assert/strict";
import { setupDOM, teardownDOM } from "./_helpers/dom.js";

const EMBED_URL = "https://skedl.link/devtest/devtest-2-k-26?embed=true";
const PRICING_URL =
  "https://skedl.link/devtest/devtest-2-k-26?embed=true&ticket=early";

const SHEET = `<dialog class="ticketing-sheet" closedby="any" aria-labelledby="t">
    <div class="ticketing-sheet-header">
      <h2 id="t">Billetterie</h2>
      <button type="button" class="ticketing-sheet-close" data-ticketing-close>Fermer</button>
    </div>
    <div class="ticketing-sheet-body">
      <iframe data-ticketing-iframe title="Billetterie"></iframe>
    </div>
  </dialog>`;

const HTML_WITH_SHEET = `<!doctype html><html><body data-edition="test">
  <button type="button" class="item ticketing-link" data-ticketing-trigger data-ticketing-url="${EMBED_URL}">Billetterie</button>
  <button type="button" class="pricing" id="pricing-early" data-ticketing-trigger data-ticketing-url="${PRICING_URL}">
    <span class="pricing-action">Acheter</span>
  </button>
  ${SHEET}
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

/**
 * @param {string} [selector] déclencheur à cliquer (le lien du header par défaut)
 */
function clickTrigger(selector = ".ticketing-link") {
  click(globalThis.document.querySelector(selector));
}

/**
 * @param {?Element} element
 */
function click(element) {
  element?.dispatchEvent(
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

describe("ticketing-sheet", () => {
  afterEach(() => {
    teardownDOM();
  });

  test("un clic sur le déclencheur ouvre le dialog et charge l'URL du déclencheur", async () => {
    await load(HTML_WITH_SHEET);
    assert.ok(!sheet().hasAttribute("open"));
    assert.equal(iframe().getAttribute("src"), null);

    clickTrigger();

    assert.ok(sheet().hasAttribute("open"));
    assert.equal(iframe().getAttribute("src"), EMBED_URL);
  });

  test("un clic sur un enfant du déclencheur ouvre aussi le dialog", async () => {
    await load(HTML_WITH_SHEET);

    click(globalThis.document.querySelector(".pricing-action"));

    assert.ok(sheet().hasAttribute("open"));
    assert.equal(iframe().getAttribute("src"), PRICING_URL);
  });

  test("un déclencheur d'URL différente recharge l'iframe", async () => {
    await load(HTML_WITH_SHEET);
    clickTrigger();
    assert.equal(iframe().getAttribute("src"), EMBED_URL);

    clickTrigger("#pricing-early");

    assert.equal(iframe().getAttribute("src"), PRICING_URL);
  });

  test("réouvrir le même déclencheur ne recharge pas l'iframe", async () => {
    await load(HTML_WITH_SHEET);
    clickTrigger();
    // Un `src` réécrit à l'identique relancerait la navigation de l'iframe et
    // ferait perdre le parcours d'achat en cours : on veut l'attribut intact.
    const observed = [];
    const target = iframe();
    new globalThis.window.MutationObserver(() => observed.push(1)).observe(
      target,
      { attributeFilter: ["src"] },
    );
    click(globalThis.document.querySelector("[data-ticketing-close]"));

    clickTrigger();

    assert.equal(target.getAttribute("src"), EMBED_URL);
    assert.deepEqual(observed, []);
  });

  test("le bouton de fermeture ferme le dialog", async () => {
    await load(HTML_WITH_SHEET);
    clickTrigger();

    click(globalThis.document.querySelector("[data-ticketing-close]"));

    assert.ok(!sheet().hasAttribute("open"));
  });

  test("un clic sur le backdrop ferme le dialog quand closedby n'est pas supporté", async () => {
    await load(HTML_WITH_SHEET);
    clickTrigger();

    // Le backdrop n'est pas un élément : un clic dessus a le `<dialog>` pour cible.
    click(sheet());

    assert.ok(!sheet().hasAttribute("open"));
  });

  describe("message skedl:close", () => {
    /**
     * @param {object} data
     * @param {{origin?: string, source?: unknown}} [opts]
     */
    function postMessage(data, opts = {}) {
      globalThis.window.dispatchEvent(
        new globalThis.window.MessageEvent("message", {
          data,
          origin: opts.origin ?? "https://skedl.link",
          source: "source" in opts ? opts.source : iframe().contentWindow,
        }),
      );
    }

    test("ferme le dialog quand la billetterie relaie Esc", async () => {
      await load(HTML_WITH_SHEET);
      clickTrigger();

      postMessage({ type: "skedl:close" });

      assert.ok(!sheet().hasAttribute("open"));
    });

    test("ignore un message d'une autre origine", async () => {
      await load(HTML_WITH_SHEET);
      clickTrigger();

      postMessage({ type: "skedl:close" }, { origin: "https://evil.test" });

      assert.ok(sheet().hasAttribute("open"));
    });

    test("ignore un message qui ne vient pas de notre iframe", async () => {
      await load(HTML_WITH_SHEET);
      clickTrigger();

      postMessage({ type: "skedl:close" }, { source: null });

      assert.ok(sheet().hasAttribute("open"));
    });

    test("ignore les autres messages, dont l'ancien skedl:resize", async () => {
      await load(HTML_WITH_SHEET);
      clickTrigger();

      postMessage({ type: "skedl:resize", height: 9999 });
      postMessage({ type: "autre-chose" });

      assert.ok(sheet().hasAttribute("open"));
      assert.equal(iframe().style.height, "");
    });
  });

  test("sans dialog dans le DOM (embed non activé), le module ne fait rien", async () => {
    await assert.doesNotReject(load(HTML_WITHOUT_SHEET));

    // Aucun écouteur délégué ne doit avoir été posé : les liens de billetterie
    // gardent leur comportement natif (pas de `preventDefault`).
    click(globalThis.document.body);

    assert.equal(globalThis.document.querySelector(".ticketing-sheet"), null);
  });
});
