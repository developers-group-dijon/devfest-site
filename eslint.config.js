import js from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import depend from "eslint-plugin-depend";
import jsdoc from "eslint-plugin-jsdoc";
import globals from "globals";
import { fileURLToPath } from "node:url";

export default [
  includeIgnoreFile(fileURLToPath(new URL(".gitignore", import.meta.url))),
  js.configs.recommended,
  jsdoc.configs["flat/recommended"],
  depend.configs["flat/recommended"],
  {
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "jsdoc/require-property-description": ["off"],
      "jsdoc/require-param-description": ["off"],
      "jsdoc/require-returns-description": ["off"],
    },
  },
  {
    ignores: ["_site"],
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
];
