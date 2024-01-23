// @ts-ignore
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

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
