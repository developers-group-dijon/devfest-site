/* eslint-disable jsdoc/reject-any-type */
import fs from "node:fs";
import formats from "../_data/formats.js";

/**
 *
 * @param {any} rawData
 * @param {string} dataPath
 * @returns {import("../_data/types.js").Format[]}
 */
export default function generateFormats(rawData, dataPath) {
  const fn = ({ id, name, durationMinutes }) => ({ id, name, durationMinutes });

  const categories = rawData.event.formats.map(fn);

  const template = `\
/**
 * Inspiré des données JSON de OpenPlanner.fr
 * Chemin : event.formats
 */

/**
 * @type {import('./types.js').Format[]}
 */
export default ${JSON.stringify(categories, undefined, "  ")};
`;

  fs.writeFileSync(`${dataPath}/formats.js`, template);

  return formats;
}
