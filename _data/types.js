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

/**
 * Durée en millisecondes
 * @typedef {number} Duration
 */

/**
 * @typedef WithName
 * @property {string} name
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
 * @property {Link[]} aPropos
 * @property {Link[]} contact
 * @property {Link[]} resources
 */

/**
 * @typedef WithRawEvent
 * @property {RawEvent} rawEvent
 */

/**
 * @typedef Link
 * @property {string} name
 * @property {string} url
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

///////////////////////////////
// Sponsor
///////////////////////////////

/**
 * @typedef SponsorType
 * @property {string} id
 * @property {string} name
 * @property {Sponsor[]} sponsors
 */

/**
 * @typedef Sponsor
 * @property {string} id
 * @property {string} logoUrl
 * @property {string} name
 * @property {string} website
 */

///////////////////////////////
// Track
///////////////////////////////

/**
 * @typedef Track
 * @property {string} id
 * @property {string} name
 */
/**
 * @typedef WithTracks
 * @property {Track[]} tracks
 */
/**
 * @typedef {Map<string, Track>} TracksMap
 */
/**
 * @typedef WithTracksMap
 * @property {TracksMap} tracksMap
 */

///////////////////////////////
// Member et speaker
///////////////////////////////

/**
 * @typedef Member
 * @property {string} id
 * @property {string} name
 * @property {?string} jobTitle
 * @property {?string} bio
 * @property {?string} company
 * @property {?string} photoUrl
 * @property {Social[]} socials
 * @property {?string} companyLogoUrl
 */

/**
 * @typedef Speaker
 * @property {string} id
 * @property {string} name
 * @property {?string} jobTitle
 * @property {?string} bio
 * @property {?string} company
 * @property {?string} photoUrl
 * @property {Social[]} socials
 * @property {?string} companyLogoUrl
 */
/**
 * @typedef WithSpeakersMap
 * @property {SpeakersMap} speakersMap
 */
/**
 * @typedef {Map<string, Speaker>} SpeakersMap
 */
/**
 * @typedef WithSpeakers
 * @property {Speaker[]} speakers
 */

/**
 * @typedef Social
 * @property {string} id
 * @property {string} name
 * @property {string} link
 */

/**
 * @readonly
 * @enum {string}
 */
const SocialId = {
  LINKEDIN: "linkedin",
  GITHUB: "github",
  TWITTER: "twitter",
};

/**
 * @readonly
 * @enum {string}
 */
const Language = {
  FRENCH: "French",
  ENGLISH: "English",
};

/**
 * @readonly
 * @enum {string}
 */
const Level = {
  ADVANCED: "advanced",
  INTERMEDIATE: "intermediate",
  BEGINNER: "beginner",
};

///////////////////////////////
// Category
///////////////////////////////
/**
 * @typedef Category
 * @property {string} id
 * @property {string} name
 * @property {string} color
 */
/**
 * @typedef WithCategories
 * @property {Category[]} categories
 */
/**
 * @typedef {Map<string, Category>} CategoriesMap
 */
/**
 * @typedef WithCategoriesMap
 * @property {CategoriesMap} categoriesMap
 */

///////////////////////////////
// Format
///////////////////////////////
/**
 * @typedef Format
 * @property {string} id
 * @property {string} name
 * @property {number} durationMinutes
 */
/**
 * @typedef WithFormats
 * @property {Format[]} formats
 */
/**
 * @typedef {Map<string, Format>} FormatsMap
 */
/**
/**
 * @typedef WithFormatsMap
 * @property {FormatsMap} formatsMap
 */

///////////////////////////////
// Session
///////////////////////////////
/**
 * @typedef RawSession
 * @property {string} id
 * @property {Date} dateStart
 * @property {string} title
 * @property {?string} abstract
 * @property {number} durationMinutes
 * @property {string[]} speakerIds
 * @property {?string} trackId
 * @property {string[]?} trackRange
 * @property {string} formatId
 * @property {string} categoryId
 * @property {boolean=} hideTrackTitle
 * @property {Language=} language
 * @property {Level=} level
 */
/**
 * @typedef WithRawSessions
 * @property {RawSession[]} rawSessions
 */

/**
 * @typedef ParsedSessionProperties
 * @property {Day} day
 * @property {Duration} duration
 * @property {Speaker[]} speakers
 * @property {Format} format
 * @property {Category} category
 * @property {Track[]} tracks
 * @typedef {RawSession & ParsedSessionProperties} ParsedSession
 */
/**
 * @typedef WithParsedSessions
 * @property {ParsedSession[]} parsedSessions
 */

/**
 * @typedef SessionProperties
 * @property {number} nbSlots
 * @typedef {ParsedSession & SessionProperties} Session
 */

///////////////////////////////
// Slot
///////////////////////////////
/**
 * @typedef {Map<Time, Date>} SlotsByTimeMap
 */
/**
 * @typedef {Map<Day, Date[]>} SlotsByDay
 */
/**
 * @typedef WithSlotsByDay
 * @property {SlotsByDay} slots
 */

module.exports = {
  SocialId,
  Language,
  Level,
};
