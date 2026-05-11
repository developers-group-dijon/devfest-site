// Automatise le démarrage d'une nouvelle édition :
//   1. Crée la branche `devfest-dijon-<currentYear>` (archive), avec
//      `_data/site.json` pointé vers l'URL d'archive.
//   2. Revient sur `main` et :
//        - ajoute le mapping Firebase pour l'archive (.firebaserc + firebase.json)
//        - met à jour `_data/rawEvent.js` (nom, dates, previousEditions, CFP/sponsoring)
//        - vide les fichiers OpenPlanner (rawSessions, speakers, formats, categories, tracks)
//   3. Affiche les étapes manuelles restantes (Firebase CLI, DNS, push, contenu).
//
// Toutes les modifications sont commitées localement. Aucun `git push` automatique.
//
// Usage : node _scripts/new-edition.js <newYear>
//   Exemple : npm run new-edition 2027

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

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
 * Extrait l'année courante du `name` de `_data/rawEvent.js`.
 * @param {string} source - contenu du fichier
 * @returns {number}
 */
export function extractCurrentYear(source) {
  const m = source.match(/name:\s*"DevFest Dijon (\d{4})"/);
  if (!m) {
    throw new Error(
      'Impossible de trouver `name: "DevFest Dijon <YYYY>"` dans _data/rawEvent.js',
    );
  }
  return Number(m[1]);
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
 * Ajoute le mapping Firebase pour l'archive de l'année.
 * @param {object} firebaserc - contenu parsé de `.firebaserc`
 * @param {number} year
 * @returns {object} nouvel objet (immutable)
 */
export function addFirebaseTarget(firebaserc, year) {
  const targetName = `devfest-dijon-${year}`;
  const project = firebaserc.targets?.["devfest-dijon"];
  if (!project || !project.hosting) {
    throw new Error(".firebaserc : structure inattendue");
  }
  if (project.hosting[targetName]) {
    throw new Error(`.firebaserc : ${targetName} existe déjà`);
  }
  // Reconstruction pour insérer juste après `main`
  /** @type {Record<string, string[]>} */
  const newHosting = {};
  for (const [k, v] of Object.entries(project.hosting)) {
    newHosting[k] = v;
    if (k === "main") {
      newHosting[targetName] = [targetName];
    }
  }
  return {
    ...firebaserc,
    targets: {
      ...firebaserc.targets,
      "devfest-dijon": {
        ...project,
        hosting: newHosting,
      },
    },
  };
}

/**
 * Ajoute une entrée hosting (archive) dans firebase.json, après `main`.
 * @param {object} firebaseJson - contenu parsé de `firebase.json`
 * @param {number} year
 * @returns {object} nouvel objet
 */
export function addFirebaseHosting(firebaseJson, year) {
  const targetName = `devfest-dijon-${year}`;
  if (!Array.isArray(firebaseJson.hosting)) {
    throw new Error("firebase.json : `hosting` n'est pas un tableau");
  }
  if (firebaseJson.hosting.some((h) => h.target === targetName)) {
    throw new Error(`firebase.json : entrée ${targetName} existe déjà`);
  }
  const entry = {
    target: targetName,
    public: "_site",
    ignore: ["firebase.json", "**/.*", "**/node_modules/**"],
  };
  const mainIdx = firebaseJson.hosting.findIndex((h) => h.target === "main");
  if (mainIdx === -1) {
    throw new Error("firebase.json : pas d'entrée `main`");
  }
  const newHosting = [
    ...firebaseJson.hosting.slice(0, mainIdx + 1),
    entry,
    ...firebaseJson.hosting.slice(mainIdx + 1),
  ];
  return { ...firebaseJson, hosting: newHosting };
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
 * Vérifications préalables : argument, branche, working tree, fichier rawEvent,
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

  const sourcePath = path.join(REPO_ROOT, "_data/rawEvent.js");
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Fichier introuvable : ${sourcePath}`);
    process.exit(1);
  }

  const source = fs.readFileSync(sourcePath, "utf8");
  let currentYear;
  try {
    currentYear = extractCurrentYear(source);
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

  const sitePath = path.join(REPO_ROOT, "_data/site.json");
  const siteArchiveUrl = `https://devfest-${currentYear}.developers-group-dijon.fr/`;
  fs.writeFileSync(
    sitePath,
    JSON.stringify({ url: siteArchiveUrl }, null, 2) + "\n",
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

  // 4a + 4b : firebase
  const firebasercPath = path.join(REPO_ROOT, ".firebaserc");
  const firebaserc = JSON.parse(fs.readFileSync(firebasercPath, "utf8"));
  const newFirebaserc = addFirebaseTarget(firebaserc, currentYear);
  fs.writeFileSync(
    firebasercPath,
    JSON.stringify(newFirebaserc, null, 2) + "\n",
  );

  const firebaseJsonPath = path.join(REPO_ROOT, "firebase.json");
  const firebaseJson = JSON.parse(fs.readFileSync(firebaseJsonPath, "utf8"));
  const newFirebaseJson = addFirebaseHosting(firebaseJson, currentYear);
  fs.writeFileSync(
    firebaseJsonPath,
    JSON.stringify(newFirebaseJson, null, 2) + "\n",
  );

  // 4c : rawEvent.js
  const rawEventPath = path.join(REPO_ROOT, "_data/rawEvent.js");
  const rawEventSource = fs.readFileSync(rawEventPath, "utf8");
  const newRawEvent = bumpRawEvent(rawEventSource, currentYear, newYear);
  fs.writeFileSync(rawEventPath, newRawEvent);

  // 4d : réinitialisation des fichiers OpenPlanner
  for (const file of OPEN_PLANNER_FILES) {
    fs.writeFileSync(path.join(REPO_ROOT, file.path), emptyDataFile(file.type));
  }

  // 4e : commit
  const toAdd = [
    ".firebaserc",
    "firebase.json",
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
  console.log(`  1. Créer le site Firebase pour l'archive :`);
  console.log(
    dim(`     firebase hosting:sites:create devfest-dijon-${currentYear}`),
  );
  console.log(
    dim(
      `     firebase target:apply hosting devfest-dijon-${currentYear} devfest-dijon-${currentYear}`,
    ),
  );
  console.log(
    `     (corriger .firebaserc si Firebase ajoute un suffixe aléatoire au site_id)\n`,
  );

  console.log(`  2. Configurer DNS + domaine personnalisé pour`);
  console.log(
    `     ${bold(`devfest-${currentYear}.developers-group-dijon.fr`)} dans la console Firebase.\n`,
  );

  console.log(`  3. Pousser les deux branches :`);
  console.log(dim(`     git push origin devfest-dijon-${currentYear}`));
  console.log(dim(`     git push origin main\n`));

  console.log(`  4. Éditer manuellement sur main :`);
  console.log(
    `     - _data/rawEvent.js : visitors, comments, team, dates exactes`,
  );
  console.log(`     - _data/sponsors.js : sponsors confirmés pour ${newYear}`);
  console.log(`     - _data/ticketing.js : tarifs et URLs`);
  console.log(
    `     - Assets visuels : _assets/images/hero-big-logo.webp, photo[1-8].webp\n`,
  );

  console.log(
    `  5. Régénérer les données quand l'export OpenPlanner est prêt :`,
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
