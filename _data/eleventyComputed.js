import { nn, sortedEntries } from "../_eleventy/utils.js";

/**
 * @param {Date} date
 * @returns {import('./types.js').Day}
 */
function buildDay(date) {
  return (
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  );
}

/**
 * @param {import('./types.js').WithRawEvent & import('./types.js').WithSessions } data
 * @returns {import('./types.js').Event}
 */
function parseEvent(data) {
  [data.sessions];
  return {
    ...data.rawEvent,
    dayCount:
      buildDay(data.rawEvent.dateEnd) - buildDay(data.rawEvent.dateStart) + 1,
    sessionCount: (data.sessions || []).filter((s) => !s.hideTrackTitle).length,
  };
}

/**
 * @param {import('./types.js').WithSpeakers} data
 * @returns {import('./types.js').SpeakersMap}
 */
function buildSpeakersMap(data) {
  const res = new Map();
  for (const s of data.speakers) {
    res.set(s.id, s);
  }
  return res;
}
/**
 * @param {import('./types.js').WithFormats} data
 * @returns {import('./types.js').FormatsMap}
 */
function buildFormatsMap(data) {
  const res = new Map();
  for (const s of data.formats) {
    res.set(s.id, s);
  }
  return res;
}

/**
 * @param {import('./types.js').WithTracks} data
 * @returns {import('./types.js').TracksMap}
 */
function buildTracksMap(data) {
  const res = new Map();
  for (const s of data.tracks) {
    res.set(s.id, s);
  }
  return res;
}

/**
 * @param {import('./types.js').WithCategories} data
 * @returns {import('./types.js').CategoriesMap}
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
 * @param { import('./types.js').WithSpeakersMap & import('./types.js').WithRawSessions & import('./types.js').WithFormatsMap & import('./types.js').WithCategoriesMap & import('./types.js').WithTracksMap } data
 * @returns {import('./types.js').Session[]}
 */
function parseSessions(data) {
  [data.formatsMap, data.categoriesMap, data.speakersMap, data.tracksMap];

  return data.rawSessions.map((session) => {
    const dateStart = session.dateStart;
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

/**
 * Calcule les slots d'une journée.
 * Il s'agit des  de début des sessions.
 * @param { import('./types.js').WithSessions } data
 * @returns {import('./types.js').SlotsByDay}
 */
function buildSlots(data) {
  [data.sessions];
  // Identification des dates de début des sessions pour chaque jour
  // Pour ne pas avoir de dates de début en doublon, on passe par
  // une Map avec comme clé le {@type {import('./types.js').Time}} (number)
  // des dates de début.
  /** @type {Map<import("./types.js").Day, Map<number, Date>>} */
  const tmpMap = new Map();
  for (const session of data.sessions) {
    if (!tmpMap.has(session.day)) {
      tmpMap.set(session.day, new Map());
    }
    nn(tmpMap.get(session.day)).set(
      session.dateStart.getTime(),
      session.dateStart,
    );
  }

  // On trie les entrées de la map (jour et date)
  // et on ne garde que les dates pour les slots
  /** @type {import('./types.js').SlotsByDay} */
  const res = new Map(
    sortedEntries(tmpMap).map(([day, dateMap]) => [
      day,
      sortedEntries(dateMap).map(([_, date]) => date),
    ]),
  );

  return res;
}

export default {
  event: parseEvent,
  speakersMap: buildSpeakersMap,
  formatsMap: buildFormatsMap,
  tracksMap: buildTracksMap,
  categoriesMap: buildCategoriesMap,
  sessions: parseSessions,
  slots: buildSlots,
};
