// Tests unitaires des helpers purs de la page "Mon planning"
// (_assets/js/favoris-utils.js). Aucun DOM nécessaire — ces fonctions
// sont volontairement extraites de `favoris.js` pour rester testables
// sans jsdom ni cache-bust.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  buildConflictClusters,
  droppedMessage,
  selectDayCards,
} from "../_assets/js/favoris-utils.js";

/**
 * Sucre pour fabriquer une carte minimale (id + start/end).
 * @param {string} id
 * @param {number} start
 * @param {number} end
 */
function card(id, start, end) {
  return { id, start, end };
}

describe("buildConflictClusters", () => {
  test("liste vide → aucun cluster", () => {
    assert.deepEqual(buildConflictClusters([]), []);
  });

  test("une seule carte → un cluster d'une carte", () => {
    const a = card("a", 0, 10);
    assert.deepEqual(buildConflictClusters([a]), [[a]]);
  });

  test("deux cartes disjointes → deux clusters d'une carte", () => {
    const a = card("a", 0, 10);
    const b = card("b", 20, 30);
    assert.deepEqual(buildConflictClusters([a, b]), [[a], [b]]);
  });

  test("deux cartes adjacentes (end === next.start) ne sont pas en conflit", () => {
    // C'est le cas typique d'un talk qui finit pile à l'heure suivante :
    // ce n'est pas un conflit utilisateur.
    const a = card("a", 0, 10);
    const b = card("b", 10, 20);
    assert.deepEqual(buildConflictClusters([a, b]), [[a], [b]]);
  });

  test("deux cartes qui se chevauchent → un seul cluster", () => {
    const a = card("a", 0, 15);
    const b = card("b", 10, 20);
    assert.deepEqual(buildConflictClusters([a, b]), [[a, b]]);
  });

  test("trois cartes transitives (A∩B, B∩C, A et C disjointes) → un seul cluster", () => {
    // A: [0,20[, B: [10,30[, C: [25,40[
    // A ne chevauche pas C, mais B fait le pont → tout est dans le même cluster.
    const a = card("a", 0, 20);
    const b = card("b", 10, 30);
    const c = card("c", 25, 40);
    assert.deepEqual(buildConflictClusters([a, b, c]), [[a, b, c]]);
  });

  test("une carte englobée par une autre → un seul cluster", () => {
    const a = card("a", 0, 100);
    const b = card("b", 10, 20);
    assert.deepEqual(buildConflictClusters([a, b]), [[a, b]]);
  });

  test("currentEnd suit le max et non la dernière carte ajoutée", () => {
    // Si on ne prenait que l'end de la dernière carte (au lieu du max),
    // la 3e carte (qui démarre pendant A mais après B) basculerait
    // dans un nouveau cluster — régression à éviter.
    const a = card("a", 0, 100);
    const b = card("b", 5, 10); // entièrement dans A
    const c = card("c", 50, 60); // démarre après B mais pendant A
    assert.deepEqual(buildConflictClusters([a, b, c]), [[a, b, c]]);
  });

  test("préserve les références et l'ordre des cartes", () => {
    const a = card("a", 0, 10);
    const b = card("b", 5, 15);
    const c = card("c", 20, 30);
    const clusters = buildConflictClusters([a, b, c]);
    assert.equal(clusters[0][0], a); // identité, pas juste égalité structurelle
    assert.equal(clusters[0][1], b);
    assert.equal(clusters[1][0], c);
  });
});

describe("selectDayCards", () => {
  // Sucre pour fabriquer des cartes minimales (avec un champ `tag` arbitraire
  // pour vérifier que la fonction préserve les champs supplémentaires).
  const a = { id: "a", start: 0, end: 10, tag: "A" };
  const b = { id: "b", start: 5, end: 15, tag: "B" };
  const c = { id: "c", start: 20, end: 30, tag: "C" };
  const d = { id: "d", start: 25, end: 40, tag: "D" };

  test("aucun favori : visible vide, clusters vides", () => {
    assert.deepEqual(selectDayCards([a, b, c], new Set()), {
      visible: [],
      conflictClusters: [],
    });
  });

  test("filtre par favIds et préserve les cartes (champs supplémentaires inclus)", () => {
    const res = selectDayCards([a, b, c], new Set(["a", "c"]));
    assert.deepEqual(
      res.visible.map((v) => v.id),
      ["a", "c"],
    );
    assert.equal(res.visible[0].tag, "A");
    assert.equal(res.visible[1].tag, "C");
  });

  test("tri par start croissant même si l'ordre d'entrée est inversé", () => {
    const res = selectDayCards([c, a, b], new Set(["a", "b", "c"]));
    assert.deepEqual(
      res.visible.map((v) => v.id),
      ["a", "b", "c"],
    );
  });

  test("cartes isolées : aucun cluster (apparaissent uniquement dans visible)", () => {
    const res = selectDayCards([a, c], new Set(["a", "c"]));
    assert.deepEqual(
      res.visible.map((v) => v.id),
      ["a", "c"],
    );
    assert.deepEqual(res.conflictClusters, []);
  });

  test("deux cartes chevauchantes : un cluster de 2", () => {
    const res = selectDayCards([a, b], new Set(["a", "b"]));
    assert.equal(res.conflictClusters.length, 1);
    assert.deepEqual(
      res.conflictClusters[0].map((v) => v.id),
      ["a", "b"],
    );
  });

  test("mix conflit + isolée : un seul cluster, la carte isolée reste visible", () => {
    const res = selectDayCards([a, b, c], new Set(["a", "b", "c"]));
    assert.equal(res.conflictClusters.length, 1);
    assert.deepEqual(
      res.conflictClusters[0].map((v) => v.id),
      ["a", "b"],
    );
    assert.deepEqual(
      res.visible.map((v) => v.id),
      ["a", "b", "c"],
    );
  });

  test("deux clusters distincts dans la même section", () => {
    const res = selectDayCards([a, b, c, d], new Set(["a", "b", "c", "d"]));
    assert.equal(res.conflictClusters.length, 2);
    assert.deepEqual(
      res.conflictClusters.map((cluster) => cluster.map((v) => v.id)),
      [
        ["a", "b"],
        ["c", "d"],
      ],
    );
  });

  test("favIds contient un id absent des cartes : ignoré", () => {
    const res = selectDayCards([a], new Set(["a", "inconnu"]));
    assert.deepEqual(
      res.visible.map((v) => v.id),
      ["a"],
    );
  });
});

describe("droppedMessage", () => {
  describe("source = hash (permalien)", () => {
    test("singulier", () => {
      const msg = droppedMessage(1, "hash");
      assert.equal(msg, "1 session du lien est introuvable et a été ignorée.");
    });

    test("pluriel", () => {
      const msg = droppedMessage(3, "hash");
      assert.equal(
        msg,
        "3 sessions du lien sont introuvables et ont été ignorées.",
      );
    });
  });

  describe("source = local (localStorage)", () => {
    test("singulier", () => {
      const msg = droppedMessage(1, "local");
      assert.equal(
        msg,
        "1 session de votre planning n'existe plus dans le programme et a été retirée de vos favoris.",
      );
    });

    test("pluriel", () => {
      const msg = droppedMessage(2, "local");
      assert.equal(
        msg,
        "2 sessions de votre planning n'existent plus dans le programme et ont été retirées de vos favoris.",
      );
    });
  });
});
