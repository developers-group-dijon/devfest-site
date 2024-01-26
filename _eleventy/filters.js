const fs = require("node:fs");
const { SocialId, Level, Language } = require("../_data/types");

const markdownit = require("markdown-it")({ typographer: true, breaks: true });

const defaultDateFormat = new Intl.DateTimeFormat("fr-FR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
});

const defaultDayFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  weekday: "long",
});

const defaultTimeFormat = new Intl.DateTimeFormat("fr-FR", {
  hour: "numeric",
  minute: "2-digit",
});

/**
 * @param {Date} value
 * @returns {string}
 */
function dateFormat(value) {
  return defaultDateFormat.format(value);
}

/**
 * @param {import('../_data/types').Day} value
 * @returns {string}
 */
function dayFormat(value) {
  return defaultDayFormat.format(
    new Date(value / 10000, (value / 100) % 100, value % 100),
  );
}

/**
 * @param {Date} value
 * @returns {string}
 */
function timeFormat(value) {
  return defaultTimeFormat.format(value);
}

/**
 * @param {Date} value
 * @returns {string}
 */
function shortDateFormat(value) {
  return defaultDayFormat.format(value);
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
function socialIcon(socialId) {
  switch (socialId) {
    case SocialId.GITHUB:
      return "github.svg";
    case SocialId.LINKEDIN:
      return "linkedin";
    case SocialId.TWITTER:
      return "x-twitter.svg";
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
 * @template T
 * @param {T[]} value
 * @param {number} size
 * @returns {T[]}
 */
function subList(value, size) {
  return value.slice(0, size);
}

/**
 * @param {?Date} value
 * @returns {string}
 */
function hours(value) {
  return `${value?.getHours()}`;
}

/**
 * @param {?Date} value
 * @returns {string}
 */
function minutes(value) {
  const minutes = value?.getMinutes();
  if (minutes == null) {
    return "";
  }
  if (minutes >= 10) {
    return `${minutes}`;
  }
  return `0${minutes}`;
}

/**
 * @param {Date} value
 * @returns {string}
 */
function dateKey(value) {
  return `${value.getTime()}`;
}

/**
 * @param {import("../_data/types").WithName[]} value
 * @returns {string[]}
 */
function mapName(value) {
  return value.map((v) => v.name);
}

/**
 * @param {Level=} value
 * @returns {string}
 */
function formatLevel(value) {
  if (value == null) {
    return "";
  }
  switch (value) {
    case Level.ADVANCED:
      return "Avancé";
    case Level.INTERMEDIATE:
      return "Intermédiaire";
    case Level.BEGINNER:
      return "Débutant";
  }
  throw new Error(`Level non géré : ${value}`);
}

/**
 * @param {Language=} value
 * @returns {string}
 */
function formatLanguage(value) {
  if (value == null) {
    return "";
  }
  switch (value) {
    case Language.FRENCH:
      return "FR";
    case Language.ENGLISH:
      return "EN";
  }
  throw new Error(`Language non géré : ${value}`);
}

/**
 * @type {{[key: string]: Function}}
 */
const res = {
  md,
  dateFormat,
  dayFormat,
  shortDateFormat,
  timeFormat,
  normalizeAssetUrl,
  socialLink,
  socialIcon,
  socialIconSvg,
  subList,
  hours,
  minutes,
  dateKey,
  mapName,
  formatLevel,
  formatLanguage,
};

module.exports = res;
