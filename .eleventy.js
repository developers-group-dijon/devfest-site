// @ts-ignore
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import filters from "./_eleventy/filters.js";
import shortcodes from "./_eleventy/shortcodes.js";

/**
 * @param { import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns {Promise<{pathPrefix: string, dir: Record<string,string>}>}
 */
export default async function (eleventyConfig) {
  ////
  // Gestion des plugins
  ////

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  ////
  // Gestion des ressources statiques
  ////
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  eleventyConfig.addPassthroughCopy({
    _assets: "/assets",
  });
  // Sous-ensemble Noto Sans : seuls les poids effectivement utilisés en CSS
  // (200,300,400,500,600) + 700 pour le <strong> par défaut du Markdown
  // + 400 italic pour le <em>. Les autres @font-face restent déclarés
  // dans latin.css mais ne sont jamais demandés par le navigateur faute
  // de règle qui les référence.
  const notoSansFiles = {
    "./node_modules/@fontsource/noto-sans/latin.css":
      "./assets/noto-sans/latin.css",
    "./node_modules/@fontsource/noto-sans/latin-italic.css":
      "./assets/noto-sans/latin-italic.css",
    "./node_modules/@fontsource/noto-sans/files/noto-sans-latin-400-italic.woff2":
      "./assets/noto-sans/files/noto-sans-latin-400-italic.woff2",
  };
  for (const weight of [200, 300, 400, 500, 600, 700]) {
    const name = `noto-sans-latin-${weight}-normal.woff2`;
    notoSansFiles[`./node_modules/@fontsource/noto-sans/files/${name}`] =
      `./assets/noto-sans/files/${name}`;
  }
  eleventyConfig.addPassthroughCopy(notoSansFiles);

  // Bitcount Grid Single : police display "pixel" variable pour certains titres
  // de l'accueil. On charge le fichier "full" (tous les axes : wght, slnt, CRSV,
  // ELSH, ELXP) pour permettre font-variation-settings. Seul le sous-ensemble
  // latin est copié ; le @font-face latin-ext de full.css n'est jamais demandé
  // (texte des titres en latin), donc son woff2 n'a pas besoin d'être copié.
  eleventyConfig.addPassthroughCopy({
    "./node_modules/@fontsource-variable/bitcount-grid-single/full.css":
      "./assets/bitcount-grid-single/full.css",
    "./node_modules/@fontsource-variable/bitcount-grid-single/files/bitcount-grid-single-latin-full-normal.woff2":
      "./assets/bitcount-grid-single/files/bitcount-grid-single-latin-full-normal.woff2",
  });

  ////
  // Filtres
  ////
  for (const filter in filters) {
    eleventyConfig.addFilter(filter, filters[filter]);
  }

  ////
  // Shortcodes
  ////
  for (const shortcode in shortcodes) {
    eleventyConfig.addShortcode(shortcode, shortcodes[shortcode]);
  }

  ////
  // Configuration
  ////
  return {
    pathPrefix: process.env.APP_PATH ?? "/",
    dir: {
      // Valeurs relatives au dossier "input" (par défaut la racine du projet)
      layouts: "_layouts",
      data: "_data",
      input: ".",
    },
  };
}
