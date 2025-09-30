/* eslint-disable jsdoc/reject-any-type */
import fs from "node:fs";

/**
 * @param {any} rawData
 * @param {string} dataPath
 * @returns {import("../_data/types.js").Category[]}
 */
export default function generateCategories(rawData, dataPath) {
  const fn = ({ id, name, color }) => ({ id, name, color });

  const categories = rawData.event.categories.map(fn);

  const template = `\
/**
 * Inspiré des données JSON de OpenPlanner.fr
 * Chemin : event.categories
 */

/**
 * @type {import('./types.js').Category[]}
 */
export default ${JSON.stringify(categories, undefined, "  ")};
`;

  fs.writeFileSync(`${dataPath}/categories.js`, template);

  return categories;
}
