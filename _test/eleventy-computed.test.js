// Tests unitaires des données calculées Eleventy (_data/eleventyComputed.js).
// Toutes les fonctions sont exposées via le default export, accessibles
// par leur nom de clé (event, sessions, slots, *Map).

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import computed from "../_data/eleventyComputed.js";

const fixtureRawEvent = {
  name: "DevFest Test",
  dateStart: new Date("2024-11-21T08:00:00Z"),
  dateEnd: new Date("2024-11-22T18:00:00Z"),
  openfeedbackId: "test-event",
};

const fixtureSpeakers = [
  { id: "spk1", name: "Alice" },
  { id: "spk2", name: "Bob" },
];

const fixtureFormats = [
  { id: "fmt-conf", name: "Conférence", durationMinutes: 50 },
  { id: "fmt-short", name: "Short", durationMinutes: 20 },
];

const fixtureCategories = [
  { id: "cat-web", name: "Web", color: "#000" },
  { id: "cat-ia", name: "IA", color: "#fff" },
];

const fixtureTracks = [
  { id: "tr-a", name: "Salle A" },
  { id: "tr-b", name: "Salle B" },
];

const fixtureRawSessions = [
  {
    id: "s1",
    title: "Session 1",
    dateStartStr: "2024-11-22T09:00:00Z",
    durationMinutes: 50,
    speakerIds: ["spk1"],
    formatId: "fmt-conf",
    categoryId: "cat-web",
    trackId: "tr-a",
    hideTrackTitle: false,
  },
  {
    id: "pause",
    title: "Pause café",
    dateStartStr: "2024-11-22T10:00:00Z",
    durationMinutes: 15,
    speakerIds: [],
    formatId: "fmt-conf",
    categoryId: "cat-web",
    trackRange: ["tr-a", "tr-b"],
    hideTrackTitle: true,
  },
];

describe("event", () => {
  test("dayCount couvre les jours inclus", () => {
    const event = computed.event({ rawEvent: fixtureRawEvent, sessions: [] });
    assert.equal(event.dayCount, 2); // 21 et 22
  });

  test("sessionCount exclut les sessions hideTrackTitle (pauses)", () => {
    const event = computed.event({
      rawEvent: fixtureRawEvent,
      sessions: [
        { hideTrackTitle: false },
        { hideTrackTitle: true },
        { hideTrackTitle: false },
      ],
    });
    assert.equal(event.sessionCount, 2);
  });

  test("sessions absentes ne plantent pas", () => {
    const event = computed.event({ rawEvent: fixtureRawEvent });
    assert.equal(event.sessionCount, 0);
  });
});

describe("speakersMap / formatsMap / tracksMap / categoriesMap", () => {
  test("indexent par id", () => {
    const speakersMap = computed.speakersMap({ speakers: fixtureSpeakers });
    assert.equal(speakersMap.get("spk1").name, "Alice");
    assert.equal(speakersMap.size, 2);

    const formatsMap = computed.formatsMap({ formats: fixtureFormats });
    assert.equal(formatsMap.get("fmt-conf").name, "Conférence");

    const tracksMap = computed.tracksMap({ tracks: fixtureTracks });
    assert.equal(tracksMap.get("tr-b").name, "Salle B");

    const categoriesMap = computed.categoriesMap({
      categories: fixtureCategories,
    });
    assert.equal(categoriesMap.get("cat-ia").name, "IA");
  });
});

describe("sponsorsMap", () => {
  test("aplatit les types de sponsors en Map indexée par name", () => {
    const sponsorsMap = computed.sponsorsMap({
      sponsors: [
        { name: "Or", sponsors: [{ name: "AcmeCo" }, { name: "FooBar" }] },
        { name: "Argent", sponsors: [{ name: "Baz" }] },
      ],
    });
    assert.equal(sponsorsMap.size, 3);
    assert.equal(sponsorsMap.get("AcmeCo").name, "AcmeCo");
  });
});

describe("sessions (parseSessions)", () => {
  /**
   * Construit le `data` complet attendu par parseSessions.
   */
  function buildData(rawSessions = fixtureRawSessions) {
    return {
      rawEvent: fixtureRawEvent,
      rawSessions,
      speakersMap: computed.speakersMap({ speakers: fixtureSpeakers }),
      formatsMap: computed.formatsMap({ formats: fixtureFormats }),
      tracksMap: computed.tracksMap({ tracks: fixtureTracks }),
      categoriesMap: computed.categoriesMap({ categories: fixtureCategories }),
    };
  }

  test("résout les références speakers/format/category", () => {
    const sessions = computed.sessions(buildData());
    const s1 = sessions.find((s) => s.id === "s1");
    assert.equal(s1.speakers[0].name, "Alice");
    assert.equal(s1.format.name, "Conférence");
    assert.equal(s1.category.name, "Web");
  });

  test("ajoute dateStart, duration (ms), day (YYYYMMDD)", () => {
    const sessions = computed.sessions(buildData());
    const s1 = sessions.find((s) => s.id === "s1");
    assert.ok(s1.dateStart instanceof Date);
    assert.equal(s1.duration, 50 * 60 * 1000);
    assert.equal(s1.day, 20241122);
  });

  test("trackId → tracks à 1 élément", () => {
    const sessions = computed.sessions(buildData());
    const s1 = sessions.find((s) => s.id === "s1");
    assert.equal(s1.tracks.length, 1);
    assert.equal(s1.tracks[0].id, "tr-a");
  });

  test("trackRange → tracks multiples", () => {
    const sessions = computed.sessions(buildData());
    const pause = sessions.find((s) => s.id === "pause");
    assert.equal(pause.tracks.length, 2);
    assert.deepEqual(
      pause.tracks.map((t) => t.id),
      ["tr-a", "tr-b"],
    );
  });

  test("hideTrackTitle est forcé à false si non explicitement true", () => {
    // Une session sans hideTrackTitle explicite devient hidden par défaut.
    const data = buildData([
      {
        id: "no-flag",
        title: "T",
        dateStartStr: "2024-11-22T09:00:00Z",
        durationMinutes: 50,
        speakerIds: [],
        formatId: "fmt-conf",
        categoryId: "cat-web",
        trackId: "tr-a",
      },
    ]);
    const [session] = computed.sessions(data);
    assert.equal(session.hideTrackTitle, false);
  });

  test("feedbackUrl construit à partir de openfeedbackId + date + id", () => {
    const sessions = computed.sessions(buildData());
    const s1 = sessions.find((s) => s.id === "s1");
    assert.equal(
      s1.feedbackUrl,
      "https://openfeedback.io/test-event/2024-11-22/s1",
    );
  });

  test("feedbackUrl est undefined si openfeedbackId absent", () => {
    const data = buildData();
    data.rawEvent = { ...fixtureRawEvent, openfeedbackId: undefined };
    const sessions = computed.sessions(data);
    assert.equal(sessions[0].feedbackUrl, undefined);
  });

  // Cas limites : on fige ici le comportement actuel face à des données
  // partielles ou incohérentes (typiquement un export OpenPlanner qui
  // change ou un nettoyage manuel raté). `nn()` étant un cast non-lançant
  // (cf. `_eleventy/utils.js`), une référence introuvable produit
  // `undefined` plutôt qu'une erreur — comportement à connaître quand on
  // touche au pipeline.
  describe("cas limites", () => {
    test("speakerIds = [] → speakers = []", () => {
      const data = buildData([
        {
          ...fixtureRawSessions[0],
          id: "no-speakers",
          speakerIds: [],
        },
      ]);
      const [session] = computed.sessions(data);
      assert.deepEqual(session.speakers, []);
    });

    test("speakerIds absent → speakers = undefined (chaînage optionnel)", () => {
      const data = buildData([
        {
          ...fixtureRawSessions[0],
          id: "no-speakers-field",
          speakerIds: undefined,
        },
      ]);
      const [session] = computed.sessions(data);
      assert.equal(session.speakers, undefined);
    });

    test("ni trackId ni trackRange → tracks = []", () => {
      const data = buildData([
        {
          id: "no-track",
          title: "T",
          dateStartStr: "2024-11-22T09:00:00Z",
          durationMinutes: 50,
          speakerIds: [],
          formatId: "fmt-conf",
          categoryId: "cat-web",
          hideTrackTitle: false,
        },
      ]);
      const [session] = computed.sessions(data);
      assert.deepEqual(session.tracks, []);
    });

    test("formatId introuvable dans formatsMap → format = undefined (cast silencieux)", () => {
      const data = buildData([
        {
          ...fixtureRawSessions[0],
          id: "unknown-format",
          formatId: "fmt-inexistant",
        },
      ]);
      const [session] = computed.sessions(data);
      assert.equal(session.format, undefined);
    });

    test("categoryId introuvable → category = undefined", () => {
      const data = buildData([
        {
          ...fixtureRawSessions[0],
          id: "unknown-cat",
          categoryId: "cat-inexistante",
        },
      ]);
      const [session] = computed.sessions(data);
      assert.equal(session.category, undefined);
    });

    test("dateStartStr invalide → dateStart = Invalid Date, day = NaN", () => {
      // Comportement actuel : la session est créée mais corrompue. Si OpenPlanner
      // pousse une date pourrie, le pipeline NE plante PAS — on retrouve juste
      // des NaN qui se propagent. Ce test sert de filet de sécurité pour
      // détecter une régression vers (ou loin de) ce comportement.
      const data = buildData([
        {
          ...fixtureRawSessions[0],
          id: "bad-date",
          dateStartStr: "not a date",
        },
      ]);
      const [session] = computed.sessions(data);
      assert.ok(session.dateStart instanceof Date);
      assert.ok(Number.isNaN(session.dateStart.getTime()));
      assert.ok(Number.isNaN(session.day));
    });
  });
});

describe("slots (buildSlots)", () => {
  test("groupe les dateStart uniques par jour, triées", () => {
    const sessions = [
      { day: 20241122, dateStart: new Date("2024-11-22T10:00:00Z") },
      { day: 20241122, dateStart: new Date("2024-11-22T09:00:00Z") },
      { day: 20241122, dateStart: new Date("2024-11-22T09:00:00Z") }, // doublon
      { day: 20241121, dateStart: new Date("2024-11-21T14:00:00Z") },
    ];
    const slots = computed.slots({ sessions });
    assert.equal(slots.size, 2);
    const day22 = slots.get(20241122);
    assert.equal(day22.length, 2);
    // Trié croissant
    assert.ok(day22[0].getTime() < day22[1].getTime());
  });

  test("jours triés dans l'ordre croissant", () => {
    const sessions = [
      { day: 20241122, dateStart: new Date("2024-11-22T09:00:00Z") },
      { day: 20241121, dateStart: new Date("2024-11-21T09:00:00Z") },
    ];
    const slots = computed.slots({ sessions });
    assert.deepEqual([...slots.keys()], [20241121, 20241122]);
  });
});
