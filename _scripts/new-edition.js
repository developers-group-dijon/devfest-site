// Automatise le démarrage d'une nouvelle édition :
//   1. Crée la branche `devfest-dijon-<currentYear>` (archive), avec
//      `_data/site.json` pointé vers l'URL d'archive.
//      L'année courante est celle de `_data/site.json` (`year`).
//   2. Revient sur `main` et :
//        - passe `year` de `_data/site.json` à la nouvelle année
//        - met à jour `_data/rawEvent.js` (nom, dates, previousEditions, CFP/sponsoring)
//        - vide les fichiers OpenPlanner (rawSessions, speakers, formats, categories, tracks)
//   3. Affiche les étapes manuelles restantes (multisite OVH, push, contenu).
//
// Rien à configurer côté hébergement dans le dépôt : le .htaccess racine
// (_scripts/ovh/htaccess.js) sert toute archive `devfest-<année>.…` depuis
// le dossier de son année, et le workflow publie chaque branche dans le
// dossier de la `year` de son site.json.
//
// Toutes les modifications sont commitées localement. Aucun `git push` automatique.
//
// Usage : node _scripts/new-edition.js <newYear>
//   Exemple : npm run new-edition 2027

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { hostname } from "./ovh/htaccess.js";

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const OPEN_PLANNER_FILES = [
  { path: "_data/rawSessions.js", type: "RawSession[]" },
  { path: "_data/speakers.js", type: "Speaker[]" },
  { path: "_data/formats.js", type: "Format[]" },
  { path: "_data/categories.js", type: "Category[]" },
  { path: "_data/tracks.js", type: "Track[]" },
];

// ---- Fonctions pures (testables) -------------------------------------------

/**
 * Lit l'année de l'édition dans le contenu de `_data/site.json`.
 * @param {string} source - contenu du fichier
 * @returns {number}
 */
export function readSiteYear(source) {
  const year = JSON.parse(source).year;
  if (!Number.isInteger(year) || String(year).length !== 4) {
    throw new Error(
      `_data/site.json : "year" doit être une année sur 4 chiffres (reçu ${JSON.stringify(year)})`,
    );
  }
  return year;
}

/**
 * Contenu de `_data/site.json` pour une édition.
 * @param {number} year
 * @param {{ archive: boolean }} opts
 * @returns {string}
 */
export function siteJson(year, { archive }) {
  // Sans slash final : les templates concatènent `site.url + page.url`
  const url = `https://${archive ? hostname("prod", year) : hostname("prod")}`;
  return JSON.stringify({ url, year }, null, 2) + "\n";
}

/**
 * Remplace une et une seule occurrence d'une regex dans une chaîne.
 * @param {string} source
 * @param {RegExp} regex
 * @param {string} replacement
 * @param {{ optional?: boolean }} [opts]
 * @returns {string}
 */
export function replaceUnique(source, regex, replacement, opts = {}) {
  const matches = source.match(new RegExp(regex.source, regex.flags + "g"));
  const count = matches ? matches.length : 0;
  if (count === 0) {
    if (opts.optional) {
      return source;
    }
    throw new Error(`replaceUnique: aucun match pour ${regex}`);
  }
  if (count > 1) {
    throw new Error(`replaceUnique: ${count} matchs pour ${regex} (attendu 1)`);
  }
  return source.replace(regex, replacement);
}

/**
 * Transforme le source de `_data/rawEvent.js` pour la nouvelle édition.
 * @param {string} source
 * @param {number} currentYear
 * @param {number} newYear
 * @returns {string}
 */
export function bumpRawEvent(source, currentYear, newYear) {
  let out = source;

  // Champs obligatoires (1 occurrence exacte)
  out = replaceUnique(
    out,
    new RegExp(`name:\\s*"DevFest Dijon ${currentYear}"`),
    `name: "DevFest Dijon ${newYear}"`,
  );
  out = replaceUnique(
    out,
    new RegExp(`dateStart:\\s*new Date\\("${currentYear}-[^"]+"\\)`),
    `dateStart: new Date("${newYear}-12-01T08:00:00.000Z")`,
  );
  out = replaceUnique(
    out,
    new RegExp(`dateEnd:\\s*new Date\\("${currentYear}-[^"]+"\\)`),
    `dateEnd: new Date("${newYear}-12-01T18:00:00.000Z")`,
  );

  // callForPaper et sponsoringUrl deviennent null (déjà null possible → optionnel)
  out = replaceUnique(out, /callForPaper:\s*"[^"]+"/, "callForPaper: null", {
    optional: true,
  });
  out = replaceUnique(out, /sponsoringUrl:\s*"[^"]+"/, "sponsoringUrl: null", {
    optional: true,
  });

  // openfeedbackId (optionnel — peut viser une année différente de currentYear)
  out = replaceUnique(
    out,
    new RegExp(`openfeedbackId:\\s*"devfest-dijon-${currentYear}"`),
    `openfeedbackId: "devfest-dijon-${newYear}"`,
    { optional: true },
  );

  // Insertion en tête de previousEditions
  const newEntry = `previousEditions: [
    {
      name: "DevFest Dijon ${currentYear}",
      url: "https://devfest-${currentYear}.developers-group-dijon.fr",
    },`;
  out = replaceUnique(out, /previousEditions:\s*\[/, newEntry);

  return out;
}

/**
 * Génère le contenu vide pour un fichier `_data/<nom>.js` OpenPlanner.
 * @param {string} typeName - ex. "RawSession[]"
 * @returns {string}
 */
export function emptyDataFile(typeName) {
  return `/** @type {import("./types.js").${typeName.replace("[]", "")}[]} */\nexport default [];\n`;
}

// ---- Pipeline (effets) -----------------------------------------------------

/**
 * Wrapper autour de spawnSync git qui exit le process si la commande échoue.
 * @param {string[]} args
 * @param {{ cwd?: string }} [opts]
 */
function git(args, { cwd = REPO_ROOT } = {}) {
  const result = spawnSync("git", args, { cwd, stdio: "inherit" });
  if (result.status !== 0) {
    console.error(
      `\n❌ git ${args.join(" ")} a échoué (status=${result.status}).`,
    );
    process.exit(1);
  }
}

/**
 * @param {string[]} args
 * @returns {string}
 */
function gitCapture(args) {
  const result = spawnSync("git", args, { cwd: REPO_ROOT, encoding: "utf8" });
  if (result.status !== 0) {
    return "";
  }
  return result.stdout.trim();
}

/**
 * Vérifications préalables : argument, branche, working tree, année de site.json,
 * absence de la branche d'archive cible. Exit 1 si non-satisfait.
 * @param {string|undefined} newYearArg
 * @returns {{ currentYear: number, newYear: number }}
 */
function preflight(newYearArg) {
  if (!newYearArg || !/^\d{4}$/.test(newYearArg)) {
    console.error("Usage : npm run new-edition <année>");
    console.error("  Exemple : npm run new-edition 2027");
    process.exit(1);
  }
  const newYear = Number(newYearArg);

  const branch = gitCapture(["rev-parse", "--abbrev-ref", "HEAD"]);
  if (branch !== "main") {
    console.error(`❌ Branche actuelle = "${branch}" (attendu : "main").`);
    process.exit(1);
  }

  const status = gitCapture(["status", "--porcelain"]);
  if (status) {
    console.error("❌ Working tree non propre. Commit ou stash d'abord :");
    console.error(status);
    process.exit(1);
  }

  const sourcePath = path.join(REPO_ROOT, "_data/site.json");
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Fichier introuvable : ${sourcePath}`);
    process.exit(1);
  }

  const source = fs.readFileSync(sourcePath, "utf8");
  let currentYear;
  try {
    currentYear = readSiteYear(source);
  } catch (err) {
    console.error(`❌ ${err.message}`);
    process.exit(1);
  }

  if (newYear <= currentYear) {
    console.error(
      `❌ Année cible ${newYear} doit être > année courante ${currentYear}.`,
    );
    process.exit(1);
  }

  const archiveBranch = `devfest-dijon-${currentYear}`;
  const branchExists = spawnSync(
    "git",
    ["rev-parse", "--verify", "--quiet", archiveBranch],
    { cwd: REPO_ROOT, stdio: "ignore" },
  );
  if (branchExists.status === 0) {
    console.error(`❌ La branche "${archiveBranch}" existe déjà.`);
    process.exit(1);
  }

  return { currentYear, newYear };
}

/**
 * Phase A — crée la branche d'archive avec _data/site.json à jour.
 * @param {number} currentYear
 */
function createArchiveBranch(currentYear) {
  const archiveBranch = `devfest-dijon-${currentYear}`;
  console.log(`\n▶ Phase A : création de la branche ${archiveBranch}`);

  git(["checkout", "-b", archiveBranch]);

  fs.writeFileSync(
    path.join(REPO_ROOT, "_data/site.json"),
    siteJson(currentYear, { archive: true }),
  );

  git(["add", "_data/site.json"]);
  git(["commit", "-m", `ci: archive le site devfest ${currentYear}`]);
  git(["checkout", "main"]);
}

/**
 * Phase B — prépare main pour la nouvelle édition.
 * @param {number} currentYear
 * @param {number} newYear
 */
function updateMain(currentYear, newYear) {
  console.log(`\n▶ Phase B : préparation de main pour l'édition ${newYear}`);

  // site.json : l'édition courante passe à la nouvelle année
  fs.writeFileSync(
    path.join(REPO_ROOT, "_data/site.json"),
    siteJson(newYear, { archive: false }),
  );

  // rawEvent.js
  const rawEventPath = path.join(REPO_ROOT, "_data/rawEvent.js");
  const rawEventSource = fs.readFileSync(rawEventPath, "utf8");
  const newRawEvent = bumpRawEvent(rawEventSource, currentYear, newYear);
  fs.writeFileSync(rawEventPath, newRawEvent);

  // Réinitialisation des fichiers OpenPlanner
  for (const file of OPEN_PLANNER_FILES) {
    fs.writeFileSync(path.join(REPO_ROOT, file.path), emptyDataFile(file.type));
  }

  // Commit
  const toAdd = [
    "_data/site.json",
    "_data/rawEvent.js",
    ...OPEN_PLANNER_FILES.map((f) => f.path),
  ];
  git(["add", ...toAdd]);
  git(["commit", "-m", `data: en route pour le devfest dijon ${newYear}`]);
}

/**
 * @param {number} currentYear
 * @param {number} newYear
 */
function printNextSteps(currentYear, newYear) {
  const dim = (s) => `\x1b[2m${s}\x1b[0m`;
  const bold = (s) => `\x1b[1m${s}\x1b[0m`;

  console.log(
    `\n✅ Branche ${bold(`devfest-dijon-${currentYear}`)} créée et commitée.`,
  );
  console.log(`✅ main préparée pour l'édition ${bold(String(newYear))}.`);
  console.log(`\n📋 ${bold("Étapes manuelles restantes :")}\n`);
  console.log(
    `  1. Dans l'espace client OVH (Hébergement > Multisite), ajouter avec SSL :`,
  );
  console.log(
    `     - ${bold(hostname("prod", currentYear))} → dossier de prod`,
  );
  console.log(
    `     - ${bold(hostname("test", currentYear))} → dossier de test`,
  );
  console.log(
    dim(
      `     (mêmes dossiers racine que ${hostname("prod")} et ${hostname("test")})\n`,
    ),
  );

  console.log(
    `  2. Pousser les deux branches (chacune déclenche son déploiement) :`,
  );
  console.log(dim(`     git push origin devfest-dijon-${currentYear}`));
  console.log(dim(`     git push origin main\n`));

  console.log(`  3. Éditer manuellement sur main :`);
  console.log(
    `     - _data/rawEvent.js : visitors, comments, team, dates exactes`,
  );
  console.log(`     - _data/sponsors.js : sponsors confirmés pour ${newYear}`);
  console.log(`     - _data/ticketing.js : tarifs et URLs`);
  console.log(
    `     - Assets visuels : _assets/images/hero-big-logo.webp, photo[1-8].webp\n`,
  );

  console.log(
    `  4. Régénérer les données quand l'export OpenPlanner est prêt :`,
  );
  console.log(
    dim(`     node _data_gen/generate-from-openplanner.js <url-json-export>`),
  );
}

/** Pipeline complet de la commande `new-edition`. */
function main() {
  const newYearArg = process.argv[2];
  const { currentYear, newYear } = preflight(newYearArg);
  createArchiveBranch(currentYear);
  updateMain(currentYear, newYear);
  printNextSteps(currentYear, newYear);
}

// Exécution si lancé en CLI (pas si importé pour les tests)
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
