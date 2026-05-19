// Tests jsdom de la page "Mon planning" (_assets/js/favoris.js).
//
// Limites importantes :
// - `favoris.js` importe `favorites.js` sans cache-bust. `favorites.js`
//   capture KNOWN_IDS et INIT_DROPPED au tout premier chargement.
//   Tous les tests de ce fichier doivent donc utiliser le MÊME manifeste
//   et la MÊME édition, et ne pas dépendre de `initialDropped()` (qui
//   reste figé sur la valeur capturée au 1er test).
// - `applySelection`, `bindRemoveButtons`, etc. sont des fonctions
//   internes de `favoris.js`. On les exerce via le DOM (clic, hash,
//   événement favorites:change) et on vérifie l'état de la page.

import { test, describe, afterEach } from "node:test";
import assert from "node:assert/strict";
import { setupDOM, teardownDOM } from "./_helpers/dom.js";

const EDITION = "test-favoris";
const STORAGE_KEY = `devfest-favorites:${EDITION}`;
const MANIFEST = ["s1", "s2", "s3", "s4"];

/**
 * HTML proche de ce que rend `pages/favoris.njk`. Deux jours, quatre sessions :
 *  - 20241122 : s1 [1000..1500[, s2 [1200..1700[ (chevauchent → conflit),
 *               s3 [2000..2500[ (pas de conflit)
 *  - 20241123 : s4 [3000..3500[
 */
const HTML = `<!doctype html><html><body data-edition="${EDITION}">
  <script type="application/json" id="sessions-manifest">${JSON.stringify(MANIFEST)}</script>

  <div class="fav-preview-banner" hidden>
    <span class="fav-preview-dropped" hidden></span>
    <button class="fav-import-button" type="button">Enregistrer</button>
  </div>
  <div class="fav-toolbar" hidden>
    <button class="fav-share-button" type="button">Partager</button>
    <span class="fav-share-feedback" hidden></span>
  </div>
  <div class="fav-local-dropped" hidden></div>
  <div class="fav-empty" hidden>Aucun favori</div>

  <section class="fav-day" data-day="20241122" hidden>
    <div class="fav-day-list">
      <article class="fav-card" data-session-id="s1" data-day="20241122" data-start="1000" data-duration="500" hidden>
        <span class="fav-card-conflict-badge" hidden></span>
        <button class="fav-card-remove" type="button" data-session-id="s1">Retirer</button>
      </article>
      <article class="fav-card" data-session-id="s2" data-day="20241122" data-start="1200" data-duration="500" hidden>
        <span class="fav-card-conflict-badge" hidden></span>
        <button class="fav-card-remove" type="button" data-session-id="s2">Retirer</button>
      </article>
      <article class="fav-card" data-session-id="s3" data-day="20241122" data-start="2000" data-duration="500" hidden>
        <span class="fav-card-conflict-badge" hidden></span>
        <button class="fav-card-remove" type="button" data-session-id="s3">Retirer</button>
      </article>
    </div>
  </section>

  <section class="fav-day" data-day="20241123" hidden>
    <div class="fav-day-list">
      <article class="fav-card" data-session-id="s4" data-day="20241123" data-start="3000" data-duration="500" hidden>
        <span class="fav-card-conflict-badge" hidden></span>
        <button class="fav-card-remove" type="button" data-session-id="s4">Retirer</button>
      </article>
    </div>
  </section>

  <div class="fav-modal" hidden>
    <button class="fav-modal-merge" type="button">Fusionner</button>
    <button class="fav-modal-replace" type="button">Remplacer</button>
    <button class="fav-modal-cancel" type="button">Annuler</button>
  </div>
</body></html>`;

/**
 * @param {Object} [opts]
 * @param {string[]} [opts.stored] - ids déjà présents dans le localStorage
 *   (doivent appartenir au MANIFEST pour ne pas être purgés à l'import)
 * @param {string} [opts.hash] - hash initial (ex. "#fav=s1,s2")
 */
async function load(opts = {}) {
  const url = `http://localhost/favoris/${opts.hash ?? ""}`;
  setupDOM(HTML, { url });
  if (opts.stored) {
    globalThis.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ids: opts.stored }),
    );
  }
  await import(`../_assets/js/favoris.js?bust=${Math.random()}`);
  globalThis.window.dispatchEvent(
    new globalThis.window.Event("DOMContentLoaded"),
  );
  // Microtask + macrotask pour que les bindings async (import button)
  // et le `refresh()` initial finissent leur travail avant les asserts.
  await new Promise((r) => setTimeout(r, 0));
}

function $(sel) {
  return globalThis.document.querySelector(sel);
}

function visibleCards() {
  return [...globalThis.document.querySelectorAll(".fav-card")]
    .filter((el) => !el.hasAttribute("hidden"))
    .map((el) => el.getAttribute("data-session-id"));
}

function visibleDays() {
  return [...globalThis.document.querySelectorAll("section.fav-day")]
    .filter((el) => !el.hasAttribute("hidden"))
    .map((el) => el.getAttribute("data-day"));
}

function storedIds() {
  const raw = globalThis.localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw).ids : [];
}

describe("favoris — affichage (applySelection)", () => {
  afterEach(teardownDOM);

  test("aucun favori : toutes les cards masquées, .fav-empty visible, toolbar masquée", async () => {
    await load();
    assert.deepEqual(visibleCards(), []);
    assert.deepEqual(visibleDays(), []);
    assert.equal($(".fav-empty").hasAttribute("hidden"), false);
    assert.equal($(".fav-toolbar").hasAttribute("hidden"), true);
  });

  test("trois favoris sur deux jours : cards et sections visibles, toolbar affichée", async () => {
    await load({ stored: ["s1", "s3", "s4"] });
    assert.deepEqual(visibleCards().sort(), ["s1", "s3", "s4"]);
    assert.deepEqual(visibleDays().sort(), ["20241122", "20241123"]);
    assert.equal($(".fav-empty").hasAttribute("hidden"), true);
    assert.equal($(".fav-toolbar").hasAttribute("hidden"), false);
  });

  test("deux sessions chevauchantes : wrapper .fav-conflict créé, classe in-conflict + badge visible", async () => {
    await load({ stored: ["s1", "s2"] });
    const wrapper = $("section[data-day='20241122'] .fav-conflict");
    assert.ok(wrapper, "le wrapper .fav-conflict doit exister");
    const inConflict = [
      ...wrapper.querySelectorAll(".fav-card.in-conflict"),
    ].map((el) => el.getAttribute("data-session-id"));
    assert.deepEqual(inConflict.sort(), ["s1", "s2"]);
    const badges = wrapper.querySelectorAll(".fav-card-conflict-badge");
    assert.equal(badges.length, 2);
    for (const badge of badges) {
      assert.equal(badge.hasAttribute("hidden"), false);
    }
  });

  test("une session isolée n'est pas wrappée dans un .fav-conflict", async () => {
    await load({ stored: ["s3"] });
    assert.equal($("section[data-day='20241122'] .fav-conflict"), null);
    const card = $(".fav-card[data-session-id='s3']");
    assert.equal(card.classList.contains("in-conflict"), false);
  });

  test("section sans aucun favori est masquée", async () => {
    // s1,s2,s3 sont le 20241122 → 20241123 doit rester caché
    await load({ stored: ["s1"] });
    assert.deepEqual(visibleDays(), ["20241122"]);
  });
});

describe("favoris — interactions", () => {
  afterEach(teardownDOM);

  test("clic sur 'Retirer' déclenche favorites:change et masque la card", async () => {
    await load({ stored: ["s1", "s3"] });
    assert.deepEqual(visibleCards().sort(), ["s1", "s3"]);
    const removeBtn = $(".fav-card-remove[data-session-id='s1']");
    removeBtn.dispatchEvent(new globalThis.window.Event("click"));
    // refresh() est synchrone (déclenché par onChange) → pas besoin d'attendre
    assert.deepEqual(visibleCards(), ["s3"]);
    assert.deepEqual(storedIds(), ["s3"]);
  });

  test("retrait du dernier favori : .fav-empty réapparaît, toolbar masquée", async () => {
    await load({ stored: ["s4"] });
    $(".fav-card-remove[data-session-id='s4']").dispatchEvent(
      new globalThis.window.Event("click"),
    );
    assert.equal($(".fav-empty").hasAttribute("hidden"), false);
    assert.equal($(".fav-toolbar").hasAttribute("hidden"), true);
  });
});

describe("favoris — mode aperçu (#fav=…)", () => {
  afterEach(teardownDOM);

  test("bannière aperçu visible, boutons 'Retirer' masqués, toolbar locale masquée", async () => {
    await load({ hash: "#fav=s1,s2" });
    assert.equal($(".fav-preview-banner").hasAttribute("hidden"), false);
    assert.deepEqual(visibleCards().sort(), ["s1", "s2"]);
    for (const btn of globalThis.document.querySelectorAll(
      ".fav-card-remove",
    )) {
      assert.equal(btn.style.display, "none");
    }
    // La toolbar (partage) n'est utile que pour les favoris locaux
    assert.equal($(".fav-toolbar").hasAttribute("hidden"), true);
  });

  test("ids inconnus dans le hash : message .fav-preview-dropped affiché", async () => {
    await load({ hash: "#fav=s1,inconnu1,inconnu2" });
    const dropped = $(".fav-preview-dropped");
    assert.equal(dropped.hasAttribute("hidden"), false);
    assert.match(dropped.textContent, /2 sessions du lien sont introuvables/);
  });
});

describe("favoris — import depuis un permalien", () => {
  afterEach(teardownDOM);

  test("sans favoris locaux : import direct, pas de modale", async () => {
    await load({ hash: "#fav=s1,s2" });
    $(".fav-import-button").dispatchEvent(new globalThis.window.Event("click"));
    // Microtask + macrotask : le handler async exécute set() puis refresh()
    await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual(storedIds().sort(), ["s1", "s2"]);
    assert.equal($(".fav-modal").hasAttribute("hidden"), true);
    assert.equal($(".fav-preview-banner").hasAttribute("hidden"), true);
  });

  test("avec favoris locaux + choix 'Fusionner' : union des deux listes", async () => {
    await load({ stored: ["s3"], hash: "#fav=s1,s2" });
    $(".fav-import-button").dispatchEvent(new globalThis.window.Event("click"));
    // Le handler attend l'ouverture de la modale (Promise) → laisser tourner
    await new Promise((r) => setTimeout(r, 0));
    assert.equal($(".fav-modal").hasAttribute("hidden"), false);
    $(".fav-modal-merge").dispatchEvent(new globalThis.window.Event("click"));
    await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual(storedIds().sort(), ["s1", "s2", "s3"]);
    assert.equal($(".fav-modal").hasAttribute("hidden"), true);
  });

  test("avec favoris locaux + choix 'Remplacer' : seuls les ids du hash sont conservés", async () => {
    await load({ stored: ["s3", "s4"], hash: "#fav=s1,s2" });
    $(".fav-import-button").dispatchEvent(new globalThis.window.Event("click"));
    await new Promise((r) => setTimeout(r, 0));
    $(".fav-modal-replace").dispatchEvent(new globalThis.window.Event("click"));
    await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual(storedIds().sort(), ["s1", "s2"]);
  });

  test("avec favoris locaux + choix 'Annuler' : favoris locaux inchangés, modale fermée", async () => {
    await load({ stored: ["s3"], hash: "#fav=s1,s2" });
    $(".fav-import-button").dispatchEvent(new globalThis.window.Event("click"));
    await new Promise((r) => setTimeout(r, 0));
    $(".fav-modal-cancel").dispatchEvent(new globalThis.window.Event("click"));
    await new Promise((r) => setTimeout(r, 0));
    assert.deepEqual(storedIds(), ["s3"]);
    assert.equal($(".fav-modal").hasAttribute("hidden"), true);
    // La bannière aperçu doit rester visible puisqu'on a annulé.
    assert.equal($(".fav-preview-banner").hasAttribute("hidden"), false);
  });
});

describe("favoris — partage", () => {
  afterEach(teardownDOM);

  test("aucun favori local : clic sur 'Partager' est un no-op", async () => {
    await load();
    // Sans favoris la toolbar reste cachée et le bouton est inerte ;
    // on simule quand même un clic pour s'assurer qu'aucune erreur ne fuit.
    let threw = false;
    try {
      $(".fav-share-button").dispatchEvent(
        new globalThis.window.Event("click"),
      );
      await new Promise((r) => setTimeout(r, 0));
    } catch {
      threw = true;
    }
    assert.equal(threw, false);
    assert.equal($(".fav-share-feedback").hasAttribute("hidden"), true);
  });
});
