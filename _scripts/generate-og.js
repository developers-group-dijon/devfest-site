// Génère l'image Open Graph partagée par toutes les pages du site.
// Compose le fond `hero-background.webp` (skyline magenta/blanc) avec le
// logo `hero-big-logo.webp` centré dans la zone blanche supérieure.
// Sortie : `_site/assets/og/default.webp` en 1200×630 — taille recommandée
// par Open Graph et Twitter Cards summary_large_image.

import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_WIDTH = 600;
const LOGO_TOP = 130; // place le logo dans la zone blanche, au-dessus du skyline

/**
 * @returns {Promise<void>}
 */
async function main() {
  const outPath = resolve(projectRoot, "_site/og/default.webp");
  await mkdir(dirname(outPath), { recursive: true });

  const logo = await sharp(
    resolve(projectRoot, "_assets/images/hero-big-logo.webp"),
  )
    .resize({ width: LOGO_WIDTH })
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();

  await sharp(resolve(projectRoot, "_assets/background/hero-background.webp"))
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "bottom" })
    .composite([
      {
        input: logo,
        top: LOGO_TOP,
        left: Math.round((WIDTH - (logoMeta.width ?? LOGO_WIDTH)) / 2),
      },
    ])
    .webp({ quality: 85 })
    .toFile(outPath);

  console.log(`✓ Image OG générée : ${outPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error("Échec de la génération OG :", err);
    process.exit(1);
  });
}
