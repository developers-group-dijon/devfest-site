module.exports = {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "declaration-block-no-redundant-longhand-properties": [
      true,
      // Par soucis de lisibiltié, on garde grid-template-rows, grid-template-columns et grid-template-areas séparés
      { ignoreShorthands: /grid-template.*/ },
    ],
    // On utilise les préfixes (max-width et min-width) et non les ranges (width <= …) pour la compatibilité navigateur.
    "media-feature-range-notation": ["prefix"],
  },
};
