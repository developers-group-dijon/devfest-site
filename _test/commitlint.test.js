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

test("ignore un commit squash GitHub avec sous-commit « Initial plan », trailers Co-authored-by et séparateur", () => {
  assert.equal(
    ignoreSquashCommit(
      "Ignore GitHub squash commits in commitlint (#14)\n\n" +
        "* Initial plan\n\n" +
        "* fix: ignore les commits squash GitHub dans commitlint\n\n" +
        "Co-authored-by: ythirion <20967693+ythirion@users.noreply.github.com>\n\n" +
        "---------\n\n" +
        "Co-authored-by: copilot-swe-agent[bot] <198982749+Copilot@users.noreply.github.com>\n" +
        "Co-authored-by: ythirion <20967693+ythirion@users.noreply.github.com>",
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
