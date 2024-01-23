module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  plugins: ["sort-keys-fix", "jsdoc"],
  extends: ["eslint:recommended", "plugin:jsdoc/recommended"],
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
