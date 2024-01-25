const { nn, sortedEntries } = require("../_eleventy/utils");

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
 * @param {import('./types').WithRawEvent & import('./types').WithParsedSessions } data
 * @returns {import('./types').Event}
 */
function parseEvent(data) {
  [data.parsedSessions];
  return {
    ...data.rawEvent,
    dayCount:
      buildDay(data.rawEvent.dateEnd) - buildDay(data.rawEvent.dateStart) + 1,
    sessionCount: (data.parsedSessions || []).filter((s) => !s.hideTrackTitle)
      .length,
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

/**
 * Calcule les slots d'une journée.
 * Il s'agit des  de début des sessions.
 * @param { import('./types').WithParsedSessions } data
 * @returns {import('./types').SlotsByDay}
 */
function buildSlots(data) {
  [data.parsedSessions];
  // Identification des dates de début des sessions pour chaque jour
  // Pour ne pas avoir de dates de début en doublon, on passe par
  // une Map avec comme clé le {@type {import('./types').Time}} (number)
  // des dates de début.
  /** @type {Map<import("./types").Day, Map<number, Date>>} */
  const tmpMap = new Map();
  for (const session of data.parsedSessions) {
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
  /** @type {import('./types').SlotsByDay} */
  const res = new Map(
    sortedEntries(tmpMap).map(([day, dateMap]) => [
      day,
      sortedEntries(dateMap).map(([_, date]) => date),
    ]),
  );

  return res;
}

/**
 * Calcule le nombre de slots que va occcuper une session.
 * @param {import('./types').ParsedSession} session
 * @param {Date[]} slots
 * @returns {number}
 */
function countSlots({ dateStart, duration }, slots) {
  let res = 0;

  const timeStart = dateStart.getTime();
  const timeEnd = dateStart.getTime() + duration;
  for (const slotDateStart of slots) {
    const slotTimeStart = slotDateStart.getTime();
    if (slotTimeStart < timeStart) {
      continue;
    }
    if (slotTimeStart >= timeStart && slotDateStart.getTime() <= timeEnd) {
      res++;
    }
    break;
  }
  return res;
}

/**
 * @param { import('./types').WithParsedSessions & import('./types').WithSlotsByDay } data
 * @returns {import('./types').Session[]}
 */
function buildSessions(data) {
  [data.parsedSessions, data.slots];
  if (!data.parsedSessions) {
    return [];
  }
  return data.parsedSessions.map((session) => {
    return {
      ...session,
      nbSlots: countSlots(session, nn(data.slots.get(session.day))),
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
  slots: buildSlots,
  sessions: buildSessions,
};
