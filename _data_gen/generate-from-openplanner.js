import { argv } from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import generateCategories from "./generate-categories.js";
import generateFormats from "./generate-formats.js";
import generateSpeakers from "./generate-speakers.js";
import generateTracks from "./generate-tracks.js";
import generateSessions from "./generate-sessions.js";

if (!argv[2]) {
  throw new Error("Il faut indiquer en paramètre le fichier JSON à importer");
}

const url = new URL(argv[2]);
url.searchParams.append("t", `${new Date().getTime()}`);

const response = await fetch(url);
if (!response.ok) {
  throw new Error(
    `Erreur à la récupération de "${argv[2]}" : ${response.status}`,
  );
}
const rawData = await response.json();

// const rawData = JSON.parse(fs.readFileSync(argv[2]).toString());

const assetsPath = fileURLToPath(new URL("../_assets", import.meta.url));
const dataPath = fileURLToPath(new URL("../_data", import.meta.url));

console.log("Génération des catégories");
generateCategories(rawData, dataPath);

console.log("Génération des tracks");
generateTracks(rawData, dataPath);

console.log("Génération des formats");
generateFormats(rawData, dataPath);

console.log("Génération des speakers");
await generateSpeakers(rawData, dataPath, assetsPath);

console.log("Génération des sessions");
generateSessions(rawData, dataPath);

console.log("Formatage du code");
spawnSync("npm", ["run", "format"]);
