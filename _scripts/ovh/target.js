// Détermine où publier la branche construite. L'édition vient de
// `_data/site.json` (`year`, et `url` qui distingue l'édition courante
// `devfest.…` d'une archive `devfest-<année>.…`) ; l'environnement vient
// de la branche :
//
//   | branche                             | environnement |
//   | ----------------------------------- | ------------- |
//   | `main`                              | prod          |
//   | `devfest-dijon-<année>` (archive)   | prod          |
//   | toute autre branche                 | test          |
//
// Une branche de travail tirée d'une archive porte le site.json de cette
// archive : elle est donc publiée en test dans le dossier de son année, sans
// toucher à l'édition courante. Seule l'édition courante réécrit le
// .htaccess racine, qui désigne l'année servie sur l'hôte principal.
//
// Script autonome (sans dépendance hors de ce dossier) pour être repris tel
// quel sur les branches d'archive.
//
// En CLI, lit SITE_JSON (défaut `_data/site.json`) et BRANCH, et écrit le
// résultat au format `clé=valeur` pour $GITHUB_OUTPUT.

import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { hostname } from "./htaccess.js";

const ARCHIVE_BRANCH = /^devfest-dijon-(\d{4})$/;

/**
 * @typedef Target
 * @property {"prod"|"test"} env
 * @property {number} year - dossier de l'édition
 * @property {boolean} updateRoot - l'édition est la courante : publier aussi le .htaccess racine
 * @property {string} url - URL publique de l'édition dans cet environnement
 */

/**
 * @param {object} ctx
 * @param {string} ctx.branch - branche construite
 * @param {{ url?: unknown, year?: unknown }} ctx.site - contenu de `_data/site.json`
 * @returns {Target}
 */
export function resolveTarget({ branch, site }) {
  if (!branch) {
    throw new Error("Branche construite inconnue");
  }
  const year = site.year;
  if (!Number.isInteger(year) || String(year).length !== 4) {
    throw new Error(
      `site.json : "year" doit être une année sur 4 chiffres (reçu ${JSON.stringify(year)})`,
    );
  }

  const currentUrl = `https://${hostname("prod")}`;
  const archiveUrl = `https://${hostname("prod", Number(year))}`;
  if (site.url !== currentUrl && site.url !== archiveUrl) {
    throw new Error(
      `site.json : "url" doit valoir ${currentUrl} (édition courante) ou ${archiveUrl} (archive ${year}), reçu ${JSON.stringify(site.url)}`,
    );
  }
  const current = site.url === currentUrl;

  // Garde-fous : main porte l'édition courante, une archive porte son année.
  if (branch === "main" && !current) {
    throw new Error(`main doit porter l'édition courante (url ${currentUrl})`);
  }
  const archive = branch.match(ARCHIVE_BRANCH);
  if (archive && (current || Number(archive[1]) !== year)) {
    throw new Error(
      `${branch} doit porter l'archive ${archive[1]} (url https://${hostname("prod", Number(archive[1]))}, year ${archive[1]})`,
    );
  }

  /** @type {"prod"|"test"} */
  const env = branch === "main" || archive ? "prod" : "test";
  return {
    env,
    year: Number(year),
    updateRoot: current,
    url: `https://${current ? hostname(env) : hostname(env, Number(year))}`,
  };
}

/**
 * @param {Target} target
 * @returns {string}
 */
export function formatOutputs(target) {
  const entries = {
    env: target.env,
    year: target.year,
    update_root: target.updateRoot,
    url: target.url,
  };
  return (
    Object.entries(entries)
      .map(([k, v]) => `${k}=${v}`)
      .join("\n") + "\n"
  );
}

// Exécution si lancé en CLI (pas si importé pour les tests)
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const site = JSON.parse(
    fs.readFileSync(process.env.SITE_JSON ?? "_data/site.json", "utf8"),
  );
  process.stdout.write(
    formatOutputs(resolveTarget({ branch: process.env.BRANCH, site })),
  );
}
