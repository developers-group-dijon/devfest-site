/* eslint-disable jsdoc/reject-any-type */
import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { pipeline } from "node:stream/promises";

/**
 *
 * @param {string?} input
 * @returns {string}
 */
function slugify(input) {
  if (!input) return "";

  // make lower case and trim
  var slug = input.toLowerCase().trim();

  // remove accents from charaters
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // replace invalid chars with spaces
  slug = slug.replace(/[^a-z0-9\s-]/g, " ").trim();

  // replace multiple spaces or hyphens with a single hyphen
  slug = slug.replace(/[\s-]+/g, "-");

  return slug;
}

/**
 *
 * @param {any} rawData
 * @param {string} dataPath
 * @param {string} assetsPath
 * @returns {Promise<import("../_data/types.js").Speaker[]>}
 */
export default async function generateSpeakers(rawData, dataPath, assetsPath) {
  /**
   *
   * @param {string?} photoUrl
   * @param {string} name
   * @param {string} format
   * @returns {Promise<string?>}
   */
  async function preparePhoto(photoUrl, name, format = "webp") {
    if (photoUrl == null) {
      return null;
    }

    const baseNewUrl = `/avatars/${name}`;
    const path = `${assetsPath}${baseNewUrl}`;
    const tmpDest = `${path}.tmp`;
    const dest = `${path}.${format}`;
    const newUrl = `${baseNewUrl}.${format}`;

    const response = await fetch(photoUrl);

    if (!response.ok) {
      console.warn(
        `Error lors de la récupération de la photo pour ${name} ${photoUrl}`,
      );
      return null;
    }

    (await pipeline(response.body, fs.createWriteStream(tmpDest)),
      spawnSync("convert", [tmpDest, "-resize", "128x128", dest]));
    fs.rmSync(tmpDest);

    return newUrl;
  }
  const socialFn = ({ name, link, icon }) => ({ id: icon, name, link });

  const speakers = [];
  for (const speaker of rawData.speakers) {
    const { id, name, bio, company, jobTitle, photoUrl, socials } = speaker;

    const slug = slugify(name);
    const newPhotoUrl = await preparePhoto(photoUrl, slug);

    const newSpeaker = {
      id,
      name,
      bio,
      company,
      jobTitle,
      photoUrl: newPhotoUrl,
      socials: socials.map(socialFn),
    };

    speakers.push(newSpeaker);
  }

  const template = `\
/**
 * Inspiré des données JSON de OpenPlanner.fr
 * Chemin : speakers
 * Modifications :
 * - mettre un bel id (slug du nom)
 * - télécharger et faire une version optimisée des photos (128x128) et modifier photoUrl
 * - ajuster les bio (Markdown possible)
 * - compléter jobTitle
 *
 * Cette donnée sera parsée/complétée pour avoir une donnée "speakers"
 */

/**
 * @type {import('./types.js').Speaker[]}
 */
const speakers = ${JSON.stringify(speakers, undefined, "  ")};

export default speakers;

/*
const fs = await import("node:fs");
const {Buffer} = await import('buffer');
speakers.forEach(({ id, photoUrl }) => {
  if (!photoUrl) {
    return;
  }
  fetch(photoUrl)
    .then((r) => r.arrayBuffer())
    .then((b) => {
      fs.createWriteStream(\`./_assets/avatars/__\${id}\`).write(Buffer.from(b));
    });
});
*/

/*
# for f in __*; do convert $f -resize "128x128" "\${f/__/}.webp"; rm "$f" ; done
*/

`;

  fs.writeFileSync(`${dataPath}/speakers.js`, template);

  return speakers;
}
