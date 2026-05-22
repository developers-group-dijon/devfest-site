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
  // Sous-ensemble Poppins : seuls les poids effectivement utilisés en CSS
  // (200,300,400,500,600) + 700 pour le <strong> par défaut du Markdown
  // + 400 italic pour le <em>. Les autres @font-face restent déclarés
  // dans latin.css mais ne sont jamais demandés par le navigateur faute
  // de règle qui les référence.
  const poppinsFiles = {
    "./node_modules/@fontsource/poppins/latin.css":
      "./assets/poppins/latin.css",
    "./node_modules/@fontsource/poppins/latin-italic.css":
      "./assets/poppins/latin-italic.css",
    "./node_modules/@fontsource/poppins/files/poppins-latin-400-italic.woff2":
      "./assets/poppins/files/poppins-latin-400-italic.woff2",
  };
  for (const weight of [200, 300, 400, 500, 600, 700]) {
    const name = `poppins-latin-${weight}-normal.woff2`;
    poppinsFiles[`./node_modules/@fontsource/poppins/files/${name}`] =
      `./assets/poppins/files/${name}`;
  }
  eleventyConfig.addPassthroughCopy(poppinsFiles);

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
