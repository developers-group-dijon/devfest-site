/**
 * Cast en non undefined
 * @template T
 * @param {T=} value
 * @returns {T}
 */
export function nn(value) {
  return /** @type {T} */ (value);
}

/**
 * @template {number} K
 * @template V
 * @param {Map<K, V>} map
 * @returns {[K, V][]}
 */
export function sortedEntries(map) {
  return [...map.entries()].sort(([k1], [k2]) => k1 - k2);
}
