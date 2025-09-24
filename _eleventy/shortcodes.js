import fs from "node:fs";
import { SocialId } from "../_data/types.js";

/**
 * @param {string} path
 * @returns {string}
 */
export function iconSvg(path) {
  return fs
    .readFileSync(`node_modules/@fortawesome/fontawesome-free/svgs/${path}.svg`)
    .toString();
}

/**
 * @param {SocialId} socialId
 * @returns {string}
 */
function socialIconSvg(socialId) {
  let iconName;
  switch (socialId) {
    case SocialId.GITHUB:
      iconName = "brands/github";
      break;
    case SocialId.LINKEDIN:
      iconName = "brands/linkedin";
      break;
    case SocialId.X:
      iconName = "brands/x-twitter";
      break;
    case SocialId.MASTODON:
      iconName = "brands/mastodon";
      break;
    case SocialId.BLUESKY:
      iconName = "brands/bluesky";
      break;
    case SocialId.LINK:
      iconName = "solid/link";
      break;
    case SocialId.INSTAGRAM:
      iconName = "brands/instagram";
      break;
    default:
      throw new Error(`Réseau social non supporté : ${socialId}`);
  }

  return iconSvg(`${iconName}`);
}

/**
 * @param {import("../_data/types.js").Social} value
 * @returns {string}
 */
export function social({ id, name, link }) {
  const icon = socialIconSvg(id);
  return `<a class="social-icon" href="${link}" title="${name} ⋅ ${link}">${icon}</a>`;
}

/**
 * @type {{[key: string]: Function}}
 */
export default {
  social,
  iconSvg,
};
