// Audit a11y via l'API Node de pa11y. Lit le sitemap local, réécrit les
// `<loc>` vers `http://localhost:8088`, puis lance pa11y sur chaque page
// en sauvegardant une capture nommée d'après un hash court de l'URL dans
// `.pa11yciresult/`. Le rendu console réutilise le reporter `cli` interne
// de pa11y (`pa11y/lib/reporters/cli.js`), comme le fait son binaire.
// Mode warn : n'échoue jamais sur les problèmes a11y.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import pa11y from "pa11y";
// pa11y n'expose pas de types pour ses chemins internes — c'est l'API
// que son propre binaire utilise (`bin/pa11y.js`), donc considérée stable.
// @ts-ignore
import buildReporter from "pa11y/lib/reporter.js";
// @ts-ignore
import cliReporter from "pa11y/lib/reporters/cli.js";

const LOCAL_BASE = "http://localhost:8088";
const SITE_DATA_PATH = "_data/site.json";
const OUTPUT_DIR = "./.pa11yciresult";

const site = JSON.parse(fs.readFileSync(SITE_DATA_PATH, "utf8"));

const sitemapXml = await (await fetch(`${LOCAL_BASE}/sitemap.xml`)).text();
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].replace(site.url, LOCAL_BASE),
);

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const hash = (url) =>
  crypto.createHash("sha1").update(url).digest("hex").slice(0, 10);

const report = buildReporter(cliReporter);

const baseOptions = {
  standard: "WCAG2AA",
  timeout: 30000,
  wait: 200,
  chromeLaunchConfig: { args: ["--no-sandbox"], ignoreHTTPSErrors: true },
};

await report.begin();

let totalIssues = 0;
let failures = 0;

for (const url of urls) {
  const screenshotPath = path.join(OUTPUT_DIR, `${hash(url)}.png`);
  try {
    const result = await pa11y(url, {
      ...baseOptions,
      screenCapture: screenshotPath,
    });
    totalIssues += result.issues.length;
    await report.log.info(`${url} — capture : ${screenshotPath}`);
    await report.results(result);
  } catch (err) {
    failures += 1;
    await report.log.error(`${url} — échec : ${err.message}`);
  }
}

console.log(
  `\nTotal : ${totalIssues} problème(s) sur ${urls.length} page(s)` +
    (failures ? ` (${failures} en erreur)` : "") +
    `.`,
);
