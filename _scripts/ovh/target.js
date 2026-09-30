// Détermine, à partir de la branche construite, quelle édition publier et
// où. Même logique que le dépôt developers-group-dijon/site :
//   - tout push publie en test ;
//   - `main` et les branches d'archive `devfest-dijon-<année>` sont ensuite
//     publiées en prod, une fois le test publié ;
//   - les pull requests sont seulement construites et vérifiées (décidé dans
//     le workflow).
//
// Une branche d'archive est publiée dans le dossier de son année. Sinon,
// l'année vient du `name` de `_data/rawEvent.js` et le déploiement met aussi
// à jour le `.htaccess` racine, qui désigne l'édition courante.
//
// En CLI (variable BRANCH), écrit le résultat au format `clé=valeur` pour
// $GITHUB_OUTPUT.

import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { extractCurrentYear } from "../new-edition.js";
import { hostname } from "./htaccess.js";

const ARCHIVE_BRANCH = /^devfest-dijon-(\d{4})$/;

/**
 * @typedef Target
 * @property {number} year - dossier de l'édition à publier
 * @property {boolean} updateRoot - publier aussi le .htaccess racine
 * @property {boolean} deployProd - publier en prod après le test
 * @property {string} testUrl - URL de l'édition en test
 * @property {string} prodUrl - URL de l'édition en prod
 */

/**
 * @param {object} ctx
 * @param {string} ctx.branch - branche construite
 * @param {() => string} ctx.readRawEvent - lecture paresseuse de rawEvent.js
 * @returns {Target}
 */
export function resolveTarget({ branch, readRawEvent }) {
  if (!branch) {
    throw new Error("Branche construite inconnue");
  }
  const archive = branch.match(ARCHIVE_BRANCH);
  if (archive) {
    const year = Number(archive[1]);
    return {
      year,
      updateRoot: false,
      deployProd: true,
      testUrl: `https://${hostname("test", year)}`,
      prodUrl: `https://${hostname("prod", year)}`,
    };
  }
  return {
    year: extractCurrentYear(readRawEvent()),
    updateRoot: true,
    deployProd: branch === "main",
    testUrl: `https://${hostname("test")}`,
    prodUrl: `https://${hostname("prod")}`,
  };
}

/**
 * @param {Target} target
 * @returns {string}
 */
export function formatOutputs(target) {
  const entries = {
    year: target.year,
    update_root: target.updateRoot,
    deploy_prod: target.deployProd,
    test_url: target.testUrl,
    prod_url: target.prodUrl,
  };
  return (
    Object.entries(entries)
      .map(([k, v]) => `${k}=${v}`)
      .join("\n") + "\n"
  );
}

// Exécution si lancé en CLI (pas si importé pour les tests)
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const target = resolveTarget({
    branch: process.env.BRANCH,
    readRawEvent: () =>
      fs.readFileSync(
        process.env.RAW_EVENT_PATH ?? "_data/rawEvent.js",
        "utf8",
      ),
  });
  process.stdout.write(formatOutputs(target));
}
