// Tests purs de la logique du module favoris (_assets/js/favorites-utils.js).
// Aucun DOM, aucun localStorage, aucun window.location — toute la
// manipulation d'environnement est dans `favorites.js`.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  parseManifest,
  parseStorageRaw,
  filterKnown,
  toggleId,
  cleanIncoming,
  dedup,
  decodeHash,
  buildShareUrl,
} from "../_assets/js/favorites-utils.js";

describe("parseManifest", () => {
  test("tableau d'ids → Set", () => {
    const set = parseManifest(JSON.stringify(["s1", "s2", "s3"]));
    assert.ok(set instanceof Set);
    assert.equal(set.size, 3);
    assert.ok(set.has("s2"));
  });

  test("filtre les valeurs non-string et les chaînes vides", () => {
    const set = parseManifest(JSON.stringify(["s1", "", 42, null, "s2"]));
    assert.deepEqual([...set].sort(), ["s1", "s2"]);
  });

  test("null pour texte vide / null", () => {
    assert.equal(parseManifest(null), null);
    assert.equal(parseManifest(""), null);
  });

  test("null pour JSON malformé", () => {
    assert.equal(parseManifest("{pas du json}"), null);
    assert.equal(parseManifest("undefined"), null);
  });

  test("null si JSON valide mais pas un tableau", () => {
    assert.equal(parseManifest(JSON.stringify({ ids: ["s1"] })), null);
    assert.equal(parseManifest(JSON.stringify("s1")), null);
  });
});

describe("parseStorageRaw", () => {
  test("format attendu {ids: [...]} → ids", () => {
    const raw = JSON.stringify({ ids: ["a", "b", "c"] });
    assert.deepEqual(parseStorageRaw(raw), ["a", "b", "c"]);
  });

  test("filtre les valeurs non-string et chaînes vides", () => {
    const raw = JSON.stringify({ ids: ["a", "", null, 1, "b"] });
    assert.deepEqual(parseStorageRaw(raw), ["a", "b"]);
  });

  test("null / vide → []", () => {
    assert.deepEqual(parseStorageRaw(null), []);
    assert.deepEqual(parseStorageRaw(""), []);
  });

  test("JSON malformé → []", () => {
    assert.deepEqual(parseStorageRaw("{abc"), []);
  });

  test("JSON valide mais format inattendu → []", () => {
    assert.deepEqual(parseStorageRaw(JSON.stringify({ other: ["a"] })), []);
    assert.deepEqual(parseStorageRaw(JSON.stringify(["a", "b"])), []);
  });
});

describe("filterKnown", () => {
  test("manifeste actif : retire les ids absents", () => {
    const known = new Set(["a", "b", "c"]);
    assert.deepEqual(filterKnown(["a", "x", "b"], known), ["a", "b"]);
  });

  test("manifeste null : ne filtre rien (mode dégradé)", () => {
    assert.deepEqual(filterKnown(["a", "x", "b"], null), ["a", "x", "b"]);
  });

  test("liste vide → []", () => {
    assert.deepEqual(filterKnown([], new Set(["a"])), []);
  });

  test("préserve l'ordre", () => {
    const known = new Set(["a", "b", "c"]);
    assert.deepEqual(filterKnown(["c", "b", "a"], known), ["c", "b", "a"]);
  });
});

describe("toggleId", () => {
  test("ajoute l'id absent en fin de liste", () => {
    assert.deepEqual(toggleId(["a", "b"], "c"), ["a", "b", "c"]);
  });

  test("retire l'id présent", () => {
    assert.deepEqual(toggleId(["a", "b", "c"], "b"), ["a", "c"]);
  });

  test("liste vide → ajoute", () => {
    assert.deepEqual(toggleId([], "a"), ["a"]);
  });

  test("ne mute pas la liste d'origine", () => {
    const original = ["a", "b"];
    toggleId(original, "c");
    assert.deepEqual(original, ["a", "b"]);
  });
});

describe("cleanIncoming", () => {
  test("garde uniquement les chaînes non-vides", () => {
    assert.deepEqual(cleanIncoming(["a", "", "b", null, 42, undefined, "c"]), [
      "a",
      "b",
      "c",
    ]);
  });

  test("préserve l'ordre", () => {
    assert.deepEqual(cleanIncoming(["c", "b", "a"]), ["c", "b", "a"]);
  });

  test("liste vide → []", () => {
    assert.deepEqual(cleanIncoming([]), []);
  });
});

describe("dedup", () => {
  test("retire les doublons en préservant la 1ère occurrence", () => {
    assert.deepEqual(dedup(["a", "b", "a", "c", "b"]), ["a", "b", "c"]);
  });

  test("liste vide → []", () => {
    assert.deepEqual(dedup([]), []);
  });

  test("aucun doublon → identique", () => {
    assert.deepEqual(dedup(["a", "b", "c"]), ["a", "b", "c"]);
  });
});

describe("decodeHash", () => {
  const KNOWN = new Set(["a", "b", "c"]);

  test("hash vide → null", () => {
    assert.equal(decodeHash("", "fav", KNOWN), null);
    assert.equal(decodeHash("#", "fav", KNOWN), null);
  });

  test("paramètre absent → null", () => {
    assert.equal(decodeHash("#other=x", "fav", KNOWN), null);
  });

  test("paramètre présent mais vide → {ids: [], dropped: 0}", () => {
    assert.deepEqual(decodeHash("#fav=", "fav", KNOWN), {
      ids: [],
      dropped: 0,
    });
  });

  test("ids tous connus → ids tels quels, dropped=0", () => {
    assert.deepEqual(decodeHash("#fav=a,b", "fav", KNOWN), {
      ids: ["a", "b"],
      dropped: 0,
    });
  });

  test("ids inconnus filtrés, dropped reflète le nombre", () => {
    assert.deepEqual(decodeHash("#fav=a,inconnu,b,absent", "fav", KNOWN), {
      ids: ["a", "b"],
      dropped: 2,
    });
  });

  test("supporte l'encodage URL", () => {
    const KNOWN_2 = new Set(["session/with-slash"]);
    assert.deepEqual(decodeHash("#fav=session%2Fwith-slash", "fav", KNOWN_2), {
      ids: ["session/with-slash"],
      dropped: 0,
    });
  });

  test("manifeste null : ne filtre pas, dropped=0", () => {
    assert.deepEqual(decodeHash("#fav=a,x,b", "fav", null), {
      ids: ["a", "x", "b"],
      dropped: 0,
    });
  });

  test("hash sans # initial est accepté aussi", () => {
    assert.deepEqual(decodeHash("fav=a", "fav", KNOWN), {
      ids: ["a"],
      dropped: 0,
    });
  });
});

describe("buildShareUrl", () => {
  const ORIGIN = "https://exemple.fr";
  const PATH = "/favoris/";
  const PARAM = "fav";

  test("avec ids → URL + #fav=encodé", () => {
    assert.equal(
      buildShareUrl(["a", "b"], ORIGIN, PATH, PARAM),
      "https://exemple.fr/favoris/#fav=a,b",
    );
  });

  test("encode les ids spéciaux", () => {
    assert.equal(
      buildShareUrl(["session/with-slash"], ORIGIN, PATH, PARAM),
      "https://exemple.fr/favoris/#fav=session%2Fwith-slash",
    );
  });

  test("liste vide → URL de base sans #", () => {
    assert.equal(
      buildShareUrl([], ORIGIN, PATH, PARAM),
      "https://exemple.fr/favoris/",
    );
  });
});
