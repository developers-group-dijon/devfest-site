const { nn } = require("../_eleventy/utils");

/**
 * @param {Date} date
 * @returns {import('./types').Day}
 */
function buildDay(date) {
  return (
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  );
}

/**
 * @param {import('./types').WithRawEvent} data
 * @returns {import('./types').Event}
 */
function parseEvent({ rawEvent }) {
  return {
    ...rawEvent,
    dayCount: buildDay(rawEvent.dateEnd) - buildDay(rawEvent.dateStart) + 1,
    // TODO: calculer
    sessionCount: 0,
  };
}

/**
 * @param {import('./types').WithSpeakers} data
 * @returns {import('./types').SpeakersMap}
 */
function buildSpeakersMap(data) {
  const res = new Map();
  for (const s of data.speakers) {
    res.set(s.id, s);
  }
  return res;
}
/**
 * @param {import('./types').WithFormats} data
 * @returns {import('./types').FormatsMap}
 */
function buildFormatsMap(data) {
  const res = new Map();
  for (const s of data.formats) {
    res.set(s.id, s);
  }
  return res;
}

/**
 * @param {import('./types').WithTracks} data
 * @returns {import('./types').TracksMap}
 */
function buildTracksMap(data) {
  const res = new Map();
  for (const s of data.tracks) {
    res.set(s.id, s);
  }
  return res;
}

/**
 * @param {import('./types').WithCategories} data
 * @returns {import('./types').CategoriesMap}
 */
function buildCategoriesMap(data) {
  const res = new Map();
  for (const c of data.categories) {
    res.set(c.id, c);
  }
  return res;
}

/**
 * RawSessions avec quelques ajouts : format des dates, le jour, le données de référence (speakers, …)
 * @param { import('./types').WithSpeakersMap & import('./types').WithRawSessions & import('./types').WithFormatsMap & import('./types').WithCategoriesMap & import('./types').WithTracksMap } data
 * @returns {import('./types').ParsedSession[]}
 */
function parseSessions(data) {
  [data.formatsMap, data.categoriesMap, data.speakersMap, data.tracksMap];

  return data.rawSessions.map((session) => {
    const dateStart = new Date(session.dateStart);
    return {
      ...session,
      hideTrackTitle: session.hideTrackTitle !== false,
      dateStart,
      duration: session.durationMinutes * 60 * 1000,
      day: buildDay(dateStart),
      speakers: session.speakerIds?.map((id) => nn(data.speakersMap.get(id))),
      format: nn(data.formatsMap.get(session.formatId)),
      category: nn(data.categoriesMap.get(session.categoryId)),
      tracks:
        session.trackId != null
          ? [nn(data.tracksMap.get(session.trackId))]
          : session.trackRange != null
            ? session.trackRange.map((t) => nn(data.tracksMap.get(t)))
            : [],
    };
  });
}

module.exports = {
  event: parseEvent,
  speakersMap: buildSpeakersMap,
  formatsMap: buildFormatsMap,
  tracksMap: buildTracksMap,
  categoriesMap: buildCategoriesMap,
  parsedSessions: parseSessions,
};
