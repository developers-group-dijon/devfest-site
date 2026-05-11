// Tests unitaires des fonctions pures de `_scripts/new-edition.js`.
// Le script lui-même (main, git, fs) n'est pas testé directement ; on couvre
// les transformations (extraction d'année, patch JSON, vidage de fichiers).

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  extractCurrentYear,
  replaceUnique,
  bumpRawEvent,
  addFirebaseTarget,
  addFirebaseHosting,
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

describe("addFirebaseTarget", () => {
  const base = {
    projects: { default: "devfest-dijon" },
    targets: {
      "devfest-dijon": {
        hosting: {
          main: ["devfest-dijon"],
          "devfest-dijon-2024": ["devfest-dijon-2024-b221b"],
        },
      },
    },
  };

  test("insère le nouveau mapping après `main`", () => {
    const out = addFirebaseTarget(base, 2026);
    const keys = Object.keys(out.targets["devfest-dijon"].hosting);
    assert.deepEqual(keys, [
      "main",
      "devfest-dijon-2026",
      "devfest-dijon-2024",
    ]);
    assert.deepEqual(
      out.targets["devfest-dijon"].hosting["devfest-dijon-2026"],
      ["devfest-dijon-2026"],
    );
  });

  test("lance si le mapping existe déjà", () => {
    assert.throws(() => addFirebaseTarget(base, 2024), /existe déjà/);
  });

  test("n'altère pas l'objet source (immutable)", () => {
    addFirebaseTarget(base, 2026);
    assert.deepEqual(Object.keys(base.targets["devfest-dijon"].hosting), [
      "main",
      "devfest-dijon-2024",
    ]);
  });
});

describe("addFirebaseHosting", () => {
  const base = {
    hosting: [
      { target: "main", public: "_site", ignore: ["firebase.json"] },
      {
        target: "devfest-dijon-2024",
        public: "_site",
        ignore: ["firebase.json"],
      },
    ],
  };

  test("insère après `main`", () => {
    const out = addFirebaseHosting(base, 2026);
    assert.deepEqual(
      out.hosting.map((h) => h.target),
      ["main", "devfest-dijon-2026", "devfest-dijon-2024"],
    );
    const archive = out.hosting[1];
    assert.equal(archive.public, "_site");
    assert.deepEqual(archive.ignore, [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
    ]);
  });

  test("lance si l'entrée existe déjà", () => {
    assert.throws(() => addFirebaseHosting(base, 2024), /existe déjà/);
  });

  test("lance si pas d'entrée main", () => {
    assert.throws(
      () => addFirebaseHosting({ hosting: [] }, 2026),
      /pas d'entrée `main`/,
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
