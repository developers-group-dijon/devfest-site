const { SocialId } = require("../_data/types");

const markdownit = require("markdown-it")({ typographer: true, breaks: true });

const defaultDateFormat = new Intl.DateTimeFormat("fr-FR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
});
/**
 * @param {Date} value
 * @returns {string}
 */
function dateFormat(value) {
  return defaultDateFormat.format(value);
}

/**
 * @param {import("../_data/types").MdString} value
 * @returns {string}
 */
function md(value) {
  if (value == null) {
    return "";
  }
  return markdownit.render(value);
}

/**
 * @param {string} value
 * @returns {string}
 */
function normalizeAssetUrl(value) {
  if (value.startsWith("/")) {
    return `/assets${value}`;
  }
  return value;
}

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
    default:
      throw new Error(`Réseau social non supporté : ${socialId}`);
  }
}

/**
 * @template T
 * @param {T[]} value
 * @param {number} size
 * @returns {T[]}
 */
function subList(value, size) {
  return value.slice(0, size);
}

/**
 * @type {{[key: string]: Function}}
 */
const res = {
  md,
  dateFormat,
  normalizeAssetUrl,
  socialLink,
  subList,
};

module.exports = res;
