// Détermine, à partir du contexte GitHub Actions, s'il faut déployer et où :
//   - push sur `main`                  → prod, édition courante
//   - push sur `devfest-dijon-<année>` → prod, archive <année>
//   - pull request (même dépôt)        → test, selon la branche cible de la PR
//   - workflow_dispatch                → environnement et branche choisis
//   - autres push / PR de fork         → pas de déploiement (build + checks)
//
// Une branche d'archive est publiée dans le dossier de son année. Sinon,
// l'année vient du `name` de `_data/rawEvent.js` et le déploiement met aussi
// à jour le `.htaccess` racine, qui désigne l'édition courante.
//
// En CLI, écrit le résultat au format `clé=valeur` (pour $GITHUB_OUTPUT).

import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { extractCurrentYear } from "../new-edition.js";
import { hostname } from "./htaccess.js";

const ARCHIVE_BRANCH = /^devfest-dijon-(\d{4})$/;

/**
 * @typedef Target
 * @property {boolean} deploy
 * @property {"prod"|"test"} [env]
 * @property {number} [year] - dossier de l'édition à publier
 * @property {boolean} [updateRoot] - publier aussi le .htaccess racine
 * @property {string} [url] - URL publique de l'édition déployée
 */

/**
 * @param {object} ctx
 * @param {string} ctx.event - `github.event_name`
 * @param {string} ctx.refName - branche poussée (push)
 * @param {string} [ctx.baseRef] - branche cible (pull_request)
 * @param {boolean} [ctx.sameRepo] - la PR vient du dépôt lui-même (pas d'un fork)
 * @param {string} [ctx.inputRef] - branche choisie (workflow_dispatch)
 * @param {string} [ctx.inputEnv] - environnement choisi (workflow_dispatch)
 * @param {() => string} ctx.readRawEvent - lecture paresseuse de rawEvent.js
 * @returns {Target}
 */
export function resolveTarget(ctx) {
  /** @type {"prod"|"test"} */
  let env;
  /** @type {string} */
  let branch;

  if (ctx.event === "workflow_dispatch") {
    if (ctx.inputEnv !== "prod" && ctx.inputEnv !== "test") {
      throw new Error(`Environnement inconnu : ${ctx.inputEnv}`);
    }
    env = ctx.inputEnv;
    branch = ctx.inputRef;
  } else if (ctx.event === "push") {
    if (ctx.refName !== "main" && !ARCHIVE_BRANCH.test(ctx.refName)) {
      return { deploy: false };
    }
    env = "prod";
    branch = ctx.refName;
  } else if (ctx.event === "pull_request") {
    if (!ctx.sameRepo) {
      return { deploy: false };
    }
    env = "test";
    branch = ctx.baseRef;
  } else {
    return { deploy: false };
  }

  if (!branch) {
    throw new Error("Branche de référence introuvable");
  }

  const archive = branch.match(ARCHIVE_BRANCH);
  if (archive) {
    const year = Number(archive[1]);
    return {
      deploy: true,
      env,
      year,
      updateRoot: false,
      url: `https://${hostname(env, year)}`,
    };
  }
  return {
    deploy: true,
    env,
    year: extractCurrentYear(ctx.readRawEvent()),
    updateRoot: true,
    url: `https://${hostname(env)}`,
  };
}

/**
 * @param {Target} target
 * @returns {string}
 */
export function formatOutputs(target) {
  const entries = {
    deploy: target.deploy,
    env: target.env ?? "",
    year: target.year ?? "",
    update_root: target.updateRoot ?? false,
    url: target.url ?? "",
  };
  return (
    Object.entries(entries)
      .map(([k, v]) => `${k}=${v}`)
      .join("\n") + "\n"
  );
}

// Exécution si lancé en CLI (pas si importé pour les tests)
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const e = process.env;
  const target = resolveTarget({
    event: e.GITHUB_EVENT_NAME,
    refName: e.GITHUB_REF_NAME,
    baseRef: e.GITHUB_BASE_REF,
    sameRepo: e.SAME_REPO === "true",
    inputRef: e.INPUT_REF,
    inputEnv: e.INPUT_ENVIRONMENT,
    readRawEvent: () =>
      fs.readFileSync(e.RAW_EVENT_PATH ?? "_data/rawEvent.js", "utf8"),
  });
  process.stdout.write(formatOutputs(target));
}
