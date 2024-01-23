module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "declaration-block-no-redundant-longhand-properties": [
      true,
      // Par soucis de lisibiltié, on garde grid-template-rows, gridgrid-template-columns et grid-template-areas séparés
      { ignoreShorthands: /grid-template.*/ },
    ],
  },
};
