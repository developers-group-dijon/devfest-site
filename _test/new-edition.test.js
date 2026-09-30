// Tests unitaires des fonctions pures de `_scripts/new-edition.js`.
// Le script lui-même (main, git, fs) n'est pas testé directement ; on couvre
// les transformations (extraction d'année, patch de rawEvent, vidage de fichiers).

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  extractCurrentYear,
  replaceUnique,
  bumpRawEvent,
  emptyDataFile,
} from "../_scripts/new-edition.js";

const SAMPLE_RAW_EVENT = `export default {
  name: "DevFest Dijon 2026",
  openfeedbackId: "devfest-dijon-2025",
  dateStart: new Date("2026-12-04T08:00:00.000Z"),
  dateEnd: new Date("2026-12-04T18:00:00.000Z"),
  visitors: "+600",
  callForPaper: "https://conference-hall.io/devfest-dijon-2026",
  sponsoringUrl: null,
  comments: [],
  previousEditions: [
    {
      name: "DevFest Dijon 2025",
      url: "https://devfest-2025.developers-group-dijon.fr",
    },
  ],
};
`;

describe("extractCurrentYear", () => {
  test("trouve l'année dans name: DevFest Dijon 2026", () => {
    assert.equal(extractCurrentYear(SAMPLE_RAW_EVENT), 2026);
  });

  test("lance si le pattern est absent", () => {
    assert.throws(() => extractCurrentYear("// pas de name"), /Impossible/);
  });
});

describe("replaceUnique", () => {
  test("remplace exactement une occurrence", () => {
    assert.equal(replaceUnique("foo bar", /foo/, "FOO"), "FOO bar");
  });

  test("lance si aucun match", () => {
    assert.throws(() => replaceUnique("foo", /xyz/, "X"), /aucun match/);
  });

  test("lance si plusieurs matchs", () => {
    assert.throws(() => replaceUnique("foo foo", /foo/, "X"), /2 matchs/);
  });

  test("optional: silencieux si pas de match", () => {
    assert.equal(replaceUnique("foo", /xyz/, "X", { optional: true }), "foo");
  });

  test("optional: lance quand même si > 1 match", () => {
    assert.throws(
      () => replaceUnique("foo foo", /foo/, "X", { optional: true }),
      /2 matchs/,
    );
  });
});

describe("bumpRawEvent", () => {
  test("met à jour name + dates + openfeedbackId", () => {
    const out = bumpRawEvent(SAMPLE_RAW_EVENT, 2026, 2027);
    assert.match(out, /name: "DevFest Dijon 2027"/);
    assert.match(out, /dateStart: new Date\("2027-12-01T08:00:00\.000Z"\)/);
    assert.match(out, /dateEnd: new Date\("2027-12-01T18:00:00\.000Z"\)/);
    // openfeedbackId ciblait 2025 → pas remplacé (optionnel)
    assert.match(out, /openfeedbackId: "devfest-dijon-2025"/);
  });

  test("met callForPaper à null", () => {
    const out = bumpRawEvent(SAMPLE_RAW_EVENT, 2026, 2027);
    assert.match(out, /callForPaper: null/);
    assert.doesNotMatch(out, /conference-hall\.io/);
  });

  test("insère la précédente édition en tête de previousEditions", () => {
    const out = bumpRawEvent(SAMPLE_RAW_EVENT, 2026, 2027);
    assert.match(
      out,
      /previousEditions: \[\s*\{\s*name: "DevFest Dijon 2026",\s*url: "https:\/\/devfest-2026\.developers-group-dijon\.fr"/,
    );
    // L'entrée 2025 existante est conservée
    assert.match(out, /name: "DevFest Dijon 2025"/);
  });

  test("openfeedbackId matché si année = currentYear", () => {
    const source = SAMPLE_RAW_EVENT.replace(
      'openfeedbackId: "devfest-dijon-2025"',
      'openfeedbackId: "devfest-dijon-2026"',
    );
    const out = bumpRawEvent(source, 2026, 2027);
    assert.match(out, /openfeedbackId: "devfest-dijon-2027"/);
  });

  test("sponsoringUrl déjà null : pas de remplacement, pas d'erreur", () => {
    // SAMPLE a sponsoringUrl: null déjà
    const out = bumpRawEvent(SAMPLE_RAW_EVENT, 2026, 2027);
    assert.match(out, /sponsoringUrl: null/);
  });

  test("lance si le name avec currentYear est introuvable", () => {
    assert.throws(
      () => bumpRawEvent(SAMPLE_RAW_EVENT, 2030, 2031),
      /aucun match/,
    );
  });
});

describe("emptyDataFile", () => {
  test("génère un fichier ESM vide typé", () => {
    const out = emptyDataFile("RawSession[]");
    assert.match(out, /@type \{import\("\.\/types\.js"\)\.RawSession\[\]\}/);
    assert.match(out, /export default \[\];/);
  });
});
