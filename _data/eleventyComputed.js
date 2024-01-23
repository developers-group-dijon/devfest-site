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

module.exports = {
  event: parseEvent,
};
