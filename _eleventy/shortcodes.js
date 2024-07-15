import fs from "node:fs";
import { SocialId } from "../_data/types.js";

/**
 * @param {string} userId
 * @param {SocialId} socialId
 * @returns {string}
 */
function socialLink(userId, socialId) {
  switch (socialId) {
    case SocialId.GITHUB:
      return `https://github.com/${userId}`;
    case SocialId.LINKEDIN:
      return `https://www.linkedin.com/in/${userId}`;
    case SocialId.TWITTER:
      return `https://twitter.com/${userId}`;
    default:
      throw new Error(`Réseau social non supporté : ${socialId}`);
  }
}

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
  const base = "brands/";
  let iconName;
  switch (socialId) {
    case SocialId.GITHUB:
      iconName = "github";
      break;
    case SocialId.LINKEDIN:
      iconName = "linkedin";
      break;
    case SocialId.TWITTER:
      iconName = "x-twitter";
      break;
    default:
      throw new Error(`Réseau social non supporté : ${socialId}`);
  }

  return iconSvg(`${base}${iconName}`);
}

/**
 * @param {import("../_data/types.js").Social} value
 * @returns {string}
 */
export function social({ id, name, link }) {
  const icon = socialIconSvg(id);
  const href = socialLink(link, id);
  return `<a class="social-icon" href="${href}" title="${name} ⋅ ${link}">${icon}</a>`;
}

/**
 * @type {{[key: string]: Function}}
 */
export default {
  social,
  iconSvg,
};
