module.exports = {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "declaration-block-no-redundant-longhand-properties": [
      true,
      // Par soucis de lisibiltié, on garde grid-template-rows, gridgrid-template-columns et grid-template-areas séparés
      { ignoreShorthands: /grid-template.*/ },
    ],
    "plugin/no-unsupported-browser-features": [true],
  },
};
