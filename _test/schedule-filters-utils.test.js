// Tests unitaires purs de la logique de filtrage du programme
// (_assets/js/schedule-filters-utils.js). Aucune dépendance DOM.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  normalize,
  filterSessions,
  hasActiveFilters,
} from "../_assets/js/schedule-filters-utils.js";

/**
 * Sucre pour fabriquer un descripteur minimal.
 * @param {string} id
 * @param {string} formatId
 * @param {string} categoryId
 * @param {string} text
 */
function s(id, formatId, categoryId, text = "") {
  return { id, formatId, categoryId, text };
}

/**
 * État courant — `q` est attendu déjà normalisé côté caller.
 * @param {{format?: string[], category?: string[], q?: string}} [opts]
 * @returns {import("../_assets/js/schedule-filters-utils.js").FilterState}
 */
function makeState(opts = {}) {
  return {
    format: new Set(opts.format ?? []),
    category: new Set(opts.category ?? []),
    q: opts.q ?? "",
  };
}

describe("normalize", () => {
  test("met en minuscules", () => {
    assert.equal(normalize("DevFest"), "devfest");
  });

  test("retire les diacritiques courants (NFD)", () => {
    assert.equal(normalize("café"), "cafe");
    assert.equal(normalize("été"), "ete");
    assert.equal(normalize("naïve"), "naive");
    assert.equal(normalize("français"), "francais");
    assert.equal(normalize("Œuvre"), "œuvre"); // ligature préservée (pas un diacritique)
    assert.equal(normalize("CRÊPE"), "crepe");
  });

  test("idempotente : normaliser deux fois donne le même résultat", () => {
    const once = normalize("Évènement à Dijon");
    assert.equal(normalize(once), once);
  });

  test("chaîne vide → chaîne vide", () => {
    assert.equal(normalize(""), "");
  });
});

describe("filterSessions", () => {
  const SESSIONS = [
    s("a", "conf", "web", "Build cool stuff with Node"),
    s("b", "short", "ia", "Deep learning intro by Bob"),
    s("c", "conf", "ia", "LLMs en production"),
    s("d", "workshop", "web", "Atelier accessibilité"),
  ];

  describe("aucun filtre actif", () => {
    test("retourne toutes les sessions", () => {
      const visible = filterSessions(SESSIONS, makeState());
      assert.deepEqual([...visible].sort(), ["a", "b", "c", "d"]);
    });

    test("liste vide reste vide", () => {
      assert.deepEqual([...filterSessions([], makeState())], []);
    });
  });

  describe("filtre Format (un seul groupe)", () => {
    test("un format retenu : seules les sessions de ce format", () => {
      const visible = filterSessions(SESSIONS, makeState({ format: ["conf"] }));
      assert.deepEqual([...visible].sort(), ["a", "c"]);
    });

    test("deux formats retenus : OR au sein du groupe", () => {
      const visible = filterSessions(
        SESSIONS,
        makeState({ format: ["short", "workshop"] }),
      );
      assert.deepEqual([...visible].sort(), ["b", "d"]);
    });

    test("session sans formatId est exclue dès qu'un filtre format est actif", () => {
      const sessions = [...SESSIONS, s("x", "", "web", "Sans format")];
      const visible = filterSessions(sessions, makeState({ format: ["conf"] }));
      assert.equal(visible.has("x"), false);
    });
  });

  describe("filtre Catégorie + Format combinés", () => {
    test("AND entre groupes (intersection)", () => {
      const visible = filterSessions(
        SESSIONS,
        makeState({ format: ["conf"], category: ["ia"] }),
      );
      assert.deepEqual([...visible], ["c"]);
    });

    test("intersection vide si aucune session ne satisfait les deux", () => {
      const visible = filterSessions(
        SESSIONS,
        makeState({ format: ["workshop"], category: ["ia"] }),
      );
      assert.deepEqual([...visible], []);
    });
  });

  describe("recherche texte (state.q)", () => {
    test("matche un mot du titre", () => {
      const visible = filterSessions(SESSIONS, makeState({ q: "node" }));
      assert.deepEqual([...visible], ["a"]);
    });

    test("matche un mot du speaker", () => {
      const visible = filterSessions(SESSIONS, makeState({ q: "bob" }));
      assert.deepEqual([...visible], ["b"]);
    });

    test("tolère les accents : 'accessibilite' (normalisé) trouve 'accessibilité'", () => {
      const visible = filterSessions(
        SESSIONS,
        makeState({ q: normalize("accessibilité") }),
      );
      assert.deepEqual([...visible], ["d"]);
    });

    test("tolère la casse : 'NODE' (normalisé) trouve 'Node'", () => {
      const visible = filterSessions(
        SESSIONS,
        makeState({ q: normalize("NODE") }),
      );
      assert.deepEqual([...visible], ["a"]);
    });

    test("aucun match retourne un Set vide", () => {
      const visible = filterSessions(SESSIONS, makeState({ q: "zzzzz" }));
      assert.deepEqual([...visible], []);
    });

    test("q vide est inactif (toutes les sessions matchent)", () => {
      const visible = filterSessions(SESSIONS, makeState({ q: "" }));
      assert.equal(visible.size, 4);
    });
  });

  describe("combinaisons format/catégorie/texte", () => {
    test("les trois groupes en AND", () => {
      // conf ∩ ia ∩ "llm" → seule "c"
      const visible = filterSessions(
        SESSIONS,
        makeState({ format: ["conf"], category: ["ia"], q: normalize("LLM") }),
      );
      assert.deepEqual([...visible], ["c"]);
    });

    test("intersection vide quand le texte ne matche aucun élément du groupe filtré", () => {
      const visible = filterSessions(
        SESSIONS,
        makeState({ format: ["conf"], q: "zzzzz" }),
      );
      assert.deepEqual([...visible], []);
    });
  });
});

describe("hasActiveFilters", () => {
  test("false quand aucun groupe n'a de valeur", () => {
    assert.equal(hasActiveFilters(makeState()), false);
  });

  test("true dès qu'un format est sélectionné", () => {
    assert.equal(hasActiveFilters(makeState({ format: ["conf"] })), true);
  });

  test("true dès qu'une catégorie est sélectionnée", () => {
    assert.equal(hasActiveFilters(makeState({ category: ["web"] })), true);
  });

  test("true dès que q n'est pas vide", () => {
    assert.equal(hasActiveFilters(makeState({ q: "x" })), true);
  });
});
