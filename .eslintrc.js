module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  settings: {
    browserslistOpts: {
      env: process.env.BROWSERSLIST_ENV,
    },
  },
  plugins: ["sort-keys-fix", "jsdoc", "compat"],
  extends: [
    "eslint:recommended",
    "plugin:jsdoc/recommended",
    "plugin:compat/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "jsdoc/require-property-description": ["off"],
    "jsdoc/require-param-description": ["off"],
    "jsdoc/require-returns-description": ["off"],
  },
};
