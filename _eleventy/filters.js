const { Level, Language } = require("../_data/types");

const markdownit = require("markdown-it")({ typographer: true, breaks: true });

const defaultDateFormat = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
});

const defaultDayFormat = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
  day: "numeric",
  weekday: "long",
});

const defaultTimeFormat = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
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
 * @template T
 * @param {T[]} value
 * @param {number} size
 * @returns {T[]}
 */
function subList(value, size) {
  return value.slice(0, size);
}

const hourDateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
  hour: "numeric",
});

/**
 * @param {?Date} value
 * @returns {string}
 */
function hours(value) {
  if (value == null) return "";
  const hour = hourDateTimeFormat
    .formatToParts(value)
    .find((p) => p.type === "hour")?.value;
  if (hour == null) return "";
  return Number.parseInt(hour).toString();
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
 * @param {import("../_data/types").Session[]} value
 * @param {Date} dateStart
 * @returns {import("../_data/types").Session[]}
 */
function filterByDateStart(value, dateStart) {
  return value.filter((e) => e.dateStart.getTime() === dateStart.getTime());
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
 * Calcule le nombre de slots que va occcuper une session.
 * @param {import('../_data/types').Session} session
 * @param {Date[]} slots
 * @returns {number}
 */
function countSlots({ dateStart, duration }, slots) {
  const timeStart = dateStart.getTime();
  const timeEnd = dateStart.getTime() + duration;
  return slots
    .map((slotDateStart) => slotDateStart.getTime())
    .filter(
      (slotTimeStart) => slotTimeStart >= timeStart && slotTimeStart < timeEnd,
    ).length;
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
  subList,
  hours,
  minutes,
  dateKey,
  filterByDateStart,
  mapName,
  formatLevel,
  formatLanguage,
  countSlots,
};

module.exports = res;
