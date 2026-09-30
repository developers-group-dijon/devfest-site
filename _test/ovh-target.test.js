// Tests du choix de l'édition à publier (_scripts/ovh/target.js).

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { formatOutputs, resolveTarget } from "../_scripts/ovh/target.js";

const RAW_EVENT = 'export default {\n  name: "DevFest Dijon 2026",\n};\n';
const readRawEvent = () => RAW_EVENT;
const noRawEvent = () => {
  throw new Error("rawEvent ne devrait pas être lu");
};

describe("resolveTarget", () => {
  test("main → édition courante lue dans rawEvent, test puis prod", () => {
    assert.deepEqual(resolveTarget({ branch: "main", readRawEvent }), {
      year: 2026,
      updateRoot: true,
      deployProd: true,
      testUrl: "https://devfest-test.developers-group-dijon.fr",
      prodUrl: "https://devfest.developers-group-dijon.fr",
    });
  });

  test("branche d'archive → dossier de l'année, racine inchangée, test puis prod", () => {
    assert.deepEqual(
      resolveTarget({ branch: "devfest-dijon-2024", readRawEvent: noRawEvent }),
      {
        year: 2024,
        updateRoot: false,
        deployProd: true,
        testUrl: "https://devfest-test-2024.developers-group-dijon.fr",
        prodUrl: "https://devfest-2024.developers-group-dijon.fr",
      },
    );
  });

  test("branche de travail → édition courante en test seulement", () => {
    for (const branch of ["feat/x", "devfest-dijon-2024-fix", "mainline"]) {
      const target = resolveTarget({ branch, readRawEvent });
      assert.equal(target.year, 2026);
      assert.equal(target.updateRoot, true);
      assert.equal(target.deployProd, false);
      assert.equal(
        target.testUrl,
        "https://devfest-test.developers-group-dijon.fr",
      );
    }
  });

  test("lance si la branche est inconnue", () => {
    assert.throws(
      () => resolveTarget({ branch: "", readRawEvent }),
      /Branche construite inconnue/,
    );
  });

  test("lance si rawEvent ne donne pas l'année", () => {
    assert.throws(
      () => resolveTarget({ branch: "main", readRawEvent: () => "{}" }),
      /DevFest Dijon/,
    );
  });
});

describe("formatOutputs", () => {
  test("format clé=valeur pour $GITHUB_OUTPUT", () => {
    assert.equal(
      formatOutputs(resolveTarget({ branch: "main", readRawEvent })),
      "year=2026\nupdate_root=true\ndeploy_prod=true\n" +
        "test_url=https://devfest-test.developers-group-dijon.fr\n" +
        "prod_url=https://devfest.developers-group-dijon.fr\n",
    );
  });
});
