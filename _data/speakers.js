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
const speakers = [];

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
      fs.createWriteStream(`./_assets/avatars/__${id}`).write(Buffer.from(b));
    });
});
*/

/*
# for f in __*; do convert $f -resize "128x128" "${f/__/}.webp"; rm "$f" ; done
*/
