/**
 * Inspiré des données JSON de OpenPlanner.fr
 * Chemin : speakers
 * Modifications :
 * - télécharger et faire une version optimisée des photos (128x128)
 * - ajuster les bio (Markdown possible)
 * - compléter jobTitle
 *
 * Cette donnée sera parsée/complétée pour avoir une donnée "speakers"
 */

/**
 * @type {import('./types.js').Speaker[]}
 */
export default [];

/*
const fs = require("node:fs");
const Buffer = require('buffer').Buffer;
speakers.forEach(({ id, photoUrl }) => {
  if (!photoUrl) {
    return;
  }
  fetch(photoUrl)
    .then((r) => r.arrayBuffer())
    .then((b) => {
      fs.createWriteStream(`./_assets/avatars/${id}`).write(Buffer.from(b));
    });
});

# for f in *; do convert $f -resize "128x128" "$f.webp"; rm "$f" ; done
*/
