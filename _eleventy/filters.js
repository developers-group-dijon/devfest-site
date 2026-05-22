/* eslint-disable jsdoc/reject-function-type */
import { Level, Language } from "../_data/types.js";

import markdownitConstr from "markdown-it";

const markdownit = markdownitConstr({ typographer: true, breaks: true });

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
 * @param {import('../_data/types.js').Day} value
 * @returns {string}
 */
function dayFormat(value) {
  return defaultDayFormat.format(
    new Date(
      Math.floor(value / 10000),
      Math.floor((value % 10000) / 100) - 1,
      value % 100,
    ),
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
 * @param {import("../_data/types.js").MdString} value
 * @returns {string}
 */
function md(value) {
  if (value == null) {
    return "";
  }
  return markdownit.render(value);
}

/**
 * Génère un résumé en texte brut à partir d'un texte Markdown, à destination
 * des meta sociales (og:description, twitter:description). Le markdown est
 * rendu en HTML, les balises strippées, les whitespaces normalisés, puis le
 * résultat est tronqué au dernier mot avant maxLen avec un ellipsis.
 * @param {?string=} value
 * @param {number=} maxLen
 * @returns {string}
 */
function excerpt(value, maxLen = 200) {
  if (value == null) {
    return "";
  }
  const plain = markdownit
    .render(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLen) {
    return plain;
  }
  const cut = plain.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  const head = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  return `${head}…`;
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
  return Number.parseInt(
    hourDateTimeFormat.formatToParts(value).find((p) => p.type === "hour")
      .value,
  ).toString();
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
 * @param {Date} lastTime
 * @param {?Date} prevTime
 * @returns {?number}
 */
function minutesBetween(lastTime, prevTime) {
  if (!prevTime) {
    return undefined;
  }
  return (lastTime.getTime() - prevTime.getTime()) / 1000 / 60;
}

/**
 * @param {import("../_data/types.js").Session[]} value
 * @param {Date} dateStart
 * @returns {import("../_data/types.js").Session[]}
 */
function filterByDateStart(value, dateStart) {
  return value.filter((e) => e.dateStart.getTime() === dateStart.getTime());
}

/**
 * @param {import("../_data/types.js").WithName[]} value
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
 * Liste les ids des sessions qui ont une page de détail dédiée
 * (= éligibles aux favoris). Utilisé pour injecter le manifeste
 * inline lu par `_assets/js/favorites.js`.
 * @param {import("../_data/types.js").RawSession[]} value
 * @returns {string[]}
 */
function sessionIds(value) {
  return value
    .filter((session) => session.hideTrackTitle === false)
    .map((session) => session.id);
}

/**
 * Sessions qui se déroulent en même temps que la session courante (chevauchement
 * temporel), en excluant la session elle-même et les sessions qui occupent
 * toutes les pistes (pauses, keynotes…).
 * @param {import('../_data/types.js').Session[]} sessions
 * @param {import('../_data/types.js').Session} currentSession
 * @returns {import('../_data/types.js').Session[]}
 */
function concurrentSessions(sessions, currentSession) {
  const start = currentSession.dateStart.getTime();
  const end = start + currentSession.duration;
  return sessions
    .filter(
      (s) =>
        s.id !== currentSession.id &&
        !s.hideTrackTitle &&
        s.dateStart.getTime() < end &&
        s.dateStart.getTime() + s.duration > start,
    )
    .sort((a, b) => {
      const byDate = a.dateStart.getTime() - b.dateStart.getTime();
      if (byDate !== 0) return byDate;
      const trackA = a.tracks[0]?.id ?? "";
      const trackB = b.tracks[0]?.id ?? "";
      return String(trackA).localeCompare(String(trackB));
    });
}

/**
 * Calcule le nombre de slots que va occcuper une session.
 * @param {import('../_data/types.js').Session} session
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
export default {
  md,
  excerpt,
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
  minutesBetween,
  sessionIds,
  concurrentSessions,
};
