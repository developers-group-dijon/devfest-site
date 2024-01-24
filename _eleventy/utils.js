/**
 * Cast en non undefined
 * @template T
 * @param {T=} value
 * @returns {T}
 */
function nn(value) {
  return /** @type {T} */ (value);
}

module.exports = {
  nn,
};
