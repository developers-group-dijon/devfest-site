// Tests du choix de la cible de publication (_scripts/ovh/target.js).

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { formatOutputs, resolveTarget } from "../_scripts/ovh/target.js";

const CURRENT = {
  url: "https://devfest.developers-group-dijon.fr",
  year: 2026,
};
const ARCHIVE_2024 = {
  url: "https://devfest-2024.developers-group-dijon.fr",
  year: 2024,
};

describe("resolveTarget — édition courante", () => {
  test("main → prod dans le dossier de l'année, avec le .htaccess racine", () => {
    assert.deepEqual(resolveTarget({ branch: "main", site: CURRENT }), {
      env: "prod",
      year: 2026,
      updateRoot: true,
      url: "https://devfest.developers-group-dijon.fr",
    });
  });

  test("branche issue de main → test dans le dossier de l'année", () => {
    assert.deepEqual(resolveTarget({ branch: "feat/x", site: CURRENT }), {
      env: "test",
      year: 2026,
      updateRoot: true,
      url: "https://devfest-test.developers-group-dijon.fr",
    });
  });
});

describe("resolveTarget — archives", () => {
  test("branche d'archive → prod dans le dossier de l'année, racine inchangée", () => {
    assert.deepEqual(
      resolveTarget({ branch: "devfest-dijon-2024", site: ARCHIVE_2024 }),
      {
        env: "prod",
        year: 2024,
        updateRoot: false,
        url: "https://devfest-2024.developers-group-dijon.fr",
      },
    );
  });

  test("branche issue d'une archive → test dans le dossier de l'archive", () => {
    assert.deepEqual(
      resolveTarget({ branch: "fix/programme-2024", site: ARCHIVE_2024 }),
      {
        env: "test",
        year: 2024,
        updateRoot: false,
        url: "https://devfest-test-2024.developers-group-dijon.fr",
      },
    );
  });

  test("un nom proche d'une archive reste une branche de travail", () => {
    const target = resolveTarget({
      branch: "devfest-dijon-2024-fix",
      site: ARCHIVE_2024,
    });
    assert.equal(target.env, "test");
  });
});

describe("resolveTarget — garde-fous sur site.json", () => {
  test("year absent ou invalide", () => {
    for (const year of [undefined, "2026", 26, 2026.5]) {
      assert.throws(
        () => resolveTarget({ branch: "main", site: { ...CURRENT, year } }),
        /"year" doit être une année/,
      );
    }
  });

  test("url incohérente avec year", () => {
    assert.throws(
      () =>
        resolveTarget({
          branch: "fix/x",
          site: { url: ARCHIVE_2024.url, year: 2025 },
        }),
      /"url" doit valoir/,
    );
    assert.throws(
      () =>
        resolveTarget({
          branch: "fix/x",
          site: { url: `${CURRENT.url}/`, year: 2026 },
        }),
      /"url" doit valoir/,
    );
  });

  test("main doit porter l'édition courante", () => {
    assert.throws(
      () => resolveTarget({ branch: "main", site: ARCHIVE_2024 }),
      /main doit porter l'édition courante/,
    );
  });

  test("une branche d'archive doit porter son année", () => {
    assert.throws(
      () => resolveTarget({ branch: "devfest-dijon-2025", site: ARCHIVE_2024 }),
      /devfest-dijon-2025 doit porter l'archive 2025/,
    );
    assert.throws(
      () =>
        resolveTarget({
          branch: "devfest-dijon-2026",
          site: CURRENT,
        }),
      /devfest-dijon-2026 doit porter l'archive 2026/,
    );
  });

  test("branche inconnue", () => {
    assert.throws(
      () => resolveTarget({ branch: "", site: CURRENT }),
      /Branche construite inconnue/,
    );
  });
});

describe("formatOutputs", () => {
  test("format clé=valeur pour $GITHUB_OUTPUT", () => {
    assert.equal(
      formatOutputs(resolveTarget({ branch: "fix/x", site: ARCHIVE_2024 })),
      "env=test\nyear=2024\nupdate_root=false\n" +
        "url=https://devfest-test-2024.developers-group-dijon.fr\n",
    );
  });
});
