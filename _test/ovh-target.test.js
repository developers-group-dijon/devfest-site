// Tests du choix de la cible de déploiement (_scripts/ovh/target.js).

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { formatOutputs, resolveTarget } from "../_scripts/ovh/target.js";

const RAW_EVENT = 'export default {\n  name: "DevFest Dijon 2026",\n};\n';
const readRawEvent = () => RAW_EVENT;
const noRawEvent = () => {
  throw new Error("rawEvent ne devrait pas être lu");
};

describe("resolveTarget — push", () => {
  test("main → prod, édition courante lue dans rawEvent", () => {
    assert.deepEqual(
      resolveTarget({ event: "push", refName: "main", readRawEvent }),
      {
        deploy: true,
        env: "prod",
        year: 2026,
        updateRoot: true,
        url: "https://devfest.developers-group-dijon.fr",
      },
    );
  });

  test("branche d'archive → prod, dossier de l'année, racine inchangée", () => {
    assert.deepEqual(
      resolveTarget({
        event: "push",
        refName: "devfest-dijon-2024",
        readRawEvent: noRawEvent,
      }),
      {
        deploy: true,
        env: "prod",
        year: 2024,
        updateRoot: false,
        url: "https://devfest-2024.developers-group-dijon.fr",
      },
    );
  });

  test("autre branche → pas de déploiement", () => {
    for (const refName of ["feat/x", "devfest-dijon-2024-fix", "mainline"]) {
      assert.deepEqual(
        resolveTarget({ event: "push", refName, readRawEvent: noRawEvent }),
        { deploy: false },
      );
    }
  });
});

describe("resolveTarget — pull_request", () => {
  test("PR vers main → test, édition courante", () => {
    assert.deepEqual(
      resolveTarget({
        event: "pull_request",
        refName: "12/merge",
        baseRef: "main",
        sameRepo: true,
        readRawEvent,
      }),
      {
        deploy: true,
        env: "test",
        year: 2026,
        updateRoot: true,
        url: "https://devfest-test.developers-group-dijon.fr",
      },
    );
  });

  test("PR vers une archive → test, dossier de l'archive", () => {
    const target = resolveTarget({
      event: "pull_request",
      refName: "13/merge",
      baseRef: "devfest-dijon-2025",
      sameRepo: true,
      readRawEvent: noRawEvent,
    });
    assert.equal(target.env, "test");
    assert.equal(target.year, 2025);
    assert.equal(target.updateRoot, false);
    assert.equal(
      target.url,
      "https://devfest-test-2025.developers-group-dijon.fr",
    );
  });

  test("PR depuis un fork → pas de déploiement (pas d'accès aux secrets)", () => {
    assert.deepEqual(
      resolveTarget({
        event: "pull_request",
        refName: "14/merge",
        baseRef: "main",
        sameRepo: false,
        readRawEvent: noRawEvent,
      }),
      { deploy: false },
    );
  });
});

describe("resolveTarget — workflow_dispatch", () => {
  test("archive redéployée en prod (anciennes branches sans ce workflow)", () => {
    const target = resolveTarget({
      event: "workflow_dispatch",
      refName: "main",
      inputRef: "devfest-dijon-2023",
      inputEnv: "prod",
      readRawEvent: noRawEvent,
    });
    assert.equal(target.env, "prod");
    assert.equal(target.year, 2023);
    assert.equal(target.updateRoot, false);
  });

  test("branche quelconque en test → édition courante", () => {
    const target = resolveTarget({
      event: "workflow_dispatch",
      refName: "main",
      inputRef: "feat/x",
      inputEnv: "test",
      readRawEvent,
    });
    assert.equal(target.env, "test");
    assert.equal(target.year, 2026);
    assert.equal(target.updateRoot, true);
  });

  test("lance si l'environnement est inconnu", () => {
    assert.throws(
      () =>
        resolveTarget({
          event: "workflow_dispatch",
          refName: "main",
          inputRef: "main",
          inputEnv: "preprod",
          readRawEvent,
        }),
      /inconnu/,
    );
  });
});

describe("resolveTarget — autres événements", () => {
  test("schedule → pas de déploiement", () => {
    assert.deepEqual(
      resolveTarget({ event: "schedule", refName: "main", readRawEvent }),
      { deploy: false },
    );
  });
});

describe("formatOutputs", () => {
  test("format clé=valeur pour $GITHUB_OUTPUT", () => {
    assert.equal(
      formatOutputs({
        deploy: true,
        env: "prod",
        year: 2026,
        updateRoot: true,
        url: "https://devfest.developers-group-dijon.fr",
      }),
      "deploy=true\nenv=prod\nyear=2026\nupdate_root=true\nurl=https://devfest.developers-group-dijon.fr\n",
    );
  });

  test("valeurs vides quand il n'y a pas de déploiement", () => {
    assert.equal(
      formatOutputs({ deploy: false }),
      "deploy=false\nenv=\nyear=\nupdate_root=false\nurl=\n",
    );
  });
});
