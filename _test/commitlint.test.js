import { test } from "node:test";
import assert from "node:assert/strict";
import config from "../commitlint.config.js";

const ignoreSquashCommit = config.ignores[0];

test("ignore le message de commit squash GitHub contenant des commits conventionnels", () => {
  assert.equal(
    ignoreSquashCommit(
      "V2026 avec donnees (#13)\n\n* feat: update billeterie\n\n* feat: link to opendfeedback",
    ),
    true,
  );
});

test("continue à valider les messages qui ne sont pas des commits squash GitHub", () => {
  assert.equal(
    ignoreSquashCommit("feat: ajoute une fonctionnalité (#13)"),
    false,
  );
  assert.equal(
    ignoreSquashCommit("Mise à jour (#13)\n\n* message non conventionnel"),
    false,
  );
});
