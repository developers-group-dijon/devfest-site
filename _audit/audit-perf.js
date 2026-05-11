// Orchestre l'audit Lighthouse CI : lit `_site/sitemap.xml`, sélectionne les
// URLs représentatives (5 pages statiques + 1 session + 1 speaker), puis lance
// `lhci autorun` avec ces URLs en arguments CLI. Le `lighthouserc.json`
// committed reste statique (assertions, settings, staticDistDir).

import fs from "node:fs";
import { spawn } from "node:child_process";

const SITEMAP_PATH = "_site/sitemap.xml";

if (!fs.existsSync(SITEMAP_PATH)) {
  console.error(
    `[audit-perf] ${SITEMAP_PATH} introuvable — exécute \`npm run build\` d'abord.`,
  );
  process.exit(1);
}

const sitemap = fs.readFileSync(SITEMAP_PATH, "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

/**
 * @param {string} url
 * @returns {string}
 */
const toLocalPath = (url) =>
  "http://localhost" + url.replace(/^https?:\/\/[^/]+\/?/, "/");

const session = urls.find((u) => u.includes("/session/"));
const speaker = urls.find((u) => u.includes("/speaker/"));

const targets = [
  "http://localhost/index.html",
  "http://localhost/schedule/index.html",
  "http://localhost/speakers/index.html",
  "http://localhost/team/index.html",
  "http://localhost/favoris/index.html",
];
if (session) targets.push(toLocalPath(session));
if (speaker) targets.push(toLocalPath(speaker));

const args = ["autorun", ...targets.map((u) => `--collect.url=${u}`)];
if (process.env.LHCI_NUMBER_OF_RUNS) {
  args.push(`--collect.numberOfRuns=${process.env.LHCI_NUMBER_OF_RUNS}`);
}

const lhci = process.platform === "win32" ? "lhci.cmd" : "lhci";
const child = spawn(`./node_modules/.bin/${lhci}`, args, { stdio: "inherit" });
child.on("exit", (code) => process.exit(code ?? 1));
