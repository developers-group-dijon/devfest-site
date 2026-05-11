import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import jsd from "eslint-plugin-jsdoc";
import depend from "eslint-plugin-depend";
import { createNodeResolver, importX } from "eslint-plugin-import-x";
import globals from "globals";
import { fileURLToPath } from "node:url";

export default defineConfig([
  includeIgnoreFile(fileURLToPath(new URL(".gitignore", import.meta.url))),
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
      reportUnusedInlineConfigs: "error",
    },
  },
  {
    files: ["**/*.js"],
    plugins: {
      js,
      jsd,
      depend,
      "import-x": importX,
    },
    settings: {
      "import-x/resolver-next": [createNodeResolver()],
    },
    extends: [
      "js/recommended",
      "jsd/flat/recommended",
      "depend/flat/recommended",
      "import-x/flat/recommended",
    ],
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "jsdoc/require-property-description": ["off"],
      "jsdoc/require-param-description": ["off"],
      "jsdoc/require-returns-description": ["off"],
      "import-x/no-extraneous-dependencies": ["error"],
      "jsdoc/no-undefined-types": [
        "error",
        {
          // Les enums "Language" et "Level" définis dans types.js ne sont pas reconnus par le plugin jsdoc.
          // On les ajoute donc à la liste des types définis.
          definedTypes: ["Language", "Level"],
        },
      ],
    },
  },
  {
    files: ["**/*.js"],
    ignores: ["_assets/"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["_assets/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    // Les tests unitaires ont des fixtures volontairement partielles ;
    // on ne force pas la JSDoc complète sur les helpers locaux.
    files: ["_test/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-param": "off",
      "jsdoc/require-returns": "off",
      "jsdoc/check-types": "off",
      "jsdoc/tag-lines": "off",
    },
  },
  {
    ignores: ["_site"],
  },
]);
