import js from "@eslint/js";
import compat from "eslint-plugin-compat";
import jsdoc from "eslint-plugin-jsdoc";
import globals from "globals";

export default [
  js.configs.recommended,
  jsdoc.configs["flat/recommended"],
  compat.configs["flat/recommended"],
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
