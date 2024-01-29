const fs = require("node:fs");
const { SocialId } = require("../_data/types");

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
 * @param {SocialId} socialId
 * @returns {string}
 */
function socialIconSvg(socialId) {
  const base = "node_modules/@fortawesome/fontawesome-free/svgs/brands/";
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
  const data = fs.readFileSync(`${base}${iconName}.svg`);

  return data.toString();
}

/**
 * @param {import("../_data/types").Social} value
 * @returns {string}
 */
function social({ id, name, link }) {
  const icon = socialIconSvg(id);
  const href = socialLink(link, id);
  return `<a class="social-icon" href="${href}" title="${name} ⋅ ${link}">${icon}</a>`;
}

/**
 * @type {{[key: string]: Function}}
 */
const res = {
  social,
};

module.exports = res;
