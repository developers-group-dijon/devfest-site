// @ts-ignore
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const filters = require("./_eleventy/filters");
const shortcodes = require("./_eleventy/shortcodes");

module.exports =
  /**
   * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
   */
  function (eleventyConfig) {
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
    eleventyConfig.addPassthroughCopy({
      "./node_modules/@fontsource/poppins/latin.css":
        "./assets/poppins/latin.css",
      "./node_modules/@fontsource/poppins/latin-italic.css":
        "./assets/poppins/latin-italic.css",
      "./node_modules/@fontsource/poppins/files/poppins-latin-*":
        "./assets/poppins/files/",
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
  };
