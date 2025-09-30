/* eslint-disable jsdoc/reject-any-type */
import fs from "node:fs";

/**
 * @param {any} rawData
 * @param {string} dataPath
 * @returns {import("../_data/types.js").Track[]}
 */
export default function generateTracks(rawData, dataPath) {
  const fn = ({ id, name }) => ({ id, name });

  const tracks = rawData.event.tracks.map(fn);

  const template = `\
/**
 * Inspiré des données JSON de OpenPlanner.fr
 * Chemin : event.tracks
 */

/**
 * @type {import('./types.js').Track[]}
 */
export default ${JSON.stringify(tracks, undefined, "  ")};
`;

  fs.writeFileSync(`${dataPath}/tracks.js`, template);

  return tracks;
}
