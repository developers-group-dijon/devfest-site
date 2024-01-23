// @ts-ignore
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const filters = require("./_eleventy/filters");

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

    ////
    // Filtres
    ////
    for (const filter in filters) {
      eleventyConfig.addFilter(filter, filters[filter]);
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
