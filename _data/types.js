///////////////////////////////
// Types de base
///////////////////////////////

/**
 * Day au format YYYYMMDD en number. Utilisé comme clé dans les maps.
 * @typedef {number} Day
 */

/**
 * Time d'une Date. Utilisé comme clé dans les maps.
 * @typedef {number} Time
 */

/**
 * String contenant du Markdown.
 * @typedef {string} MdString
 */

///////////////////////////////
// Event
///////////////////////////////

/**
 * @typedef RawEvent
 * @property {string} name
 * @property {Date} dateStart
 * @property {Date} dateEnd
 * @property {EventLocalisation} location
 * @property {string[]} access
 * @property {string} visitors
 * @property {PreviousEdition[]} previousEditions
 * @property {EditionComment[]} comments
 * @property {Team} team
 */

/**
 * @typedef WithRawEvent
 * @property {RawEvent} rawEvent
 */

/**
 * @typedef Team
 * @property {MdString} message
 * @property {MdString} why
 * @property {string} photo
 */

/**
 * @typedef EditionComment
 * @property {string} title
 * @property {MdString} content
 */

/**
 * @typedef PreviousEdition
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef EventLocalisation
 * @property {string} name
 * @property {?string} description
 * @property {string[]} adress
 * @property {string} url
 */

/**
 * @typedef EventProperties
 * @property {number} dayCount
 * @property {number} sessionCount
 * @typedef {RawEvent & EventProperties} Event
 */

///////////////////////////////
// Ticketing
///////////////////////////////

/**
 * @typedef Ticketing
 * @property {string} url
 * @property {?string} comment
 * @property {TicketPricing[]} princings
 */

/**
 * @typedef TicketPricing
 * @property {string} id
 * @property {string} name
 * @property {string} price
 * @property {?string} comment
 * @property {?string} url
 */

module.exports = {};
