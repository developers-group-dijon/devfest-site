// Tests unitaires des filtres Nunjucks (_eleventy/filters.js).
// Lancés via `node --test`.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import filters from "../_eleventy/filters.js";
import { Language, Level } from "../_data/types.js";

describe("md", () => {
  test("rend du markdown en HTML", () => {
    const html = filters.md("**gras**");
    assert.match(html, /<strong>gras<\/strong>/);
  });

  test("retourne une chaîne vide si null/undefined", () => {
    assert.equal(filters.md(null), "");
    assert.equal(filters.md(undefined), "");
  });
});

describe("normalizeAssetUrl", () => {
  test("préfixe les chemins absolus avec /assets", () => {
    assert.equal(
      filters.normalizeAssetUrl("/css/style.css"),
      "/assets/css/style.css",
    );
  });

  test("laisse intact ce qui ne commence pas par /", () => {
    assert.equal(
      filters.normalizeAssetUrl("https://cdn.example.com/x.png"),
      "https://cdn.example.com/x.png",
    );
    assert.equal(filters.normalizeAssetUrl("relative/x.png"), "relative/x.png");
  });
});

describe("formatLevel", () => {
  test("traduit les niveaux", () => {
    assert.equal(filters.formatLevel(Level.BEGINNER), "Débutant");
    assert.equal(filters.formatLevel(Level.INTERMEDIATE), "Intermédiaire");
    assert.equal(filters.formatLevel(Level.ADVANCED), "Avancé");
  });

  test("retourne une chaîne vide si null", () => {
    assert.equal(filters.formatLevel(null), "");
    assert.equal(filters.formatLevel(undefined), "");
  });
});

describe("formatLanguage", () => {
  test("traduit les langues en codes 2 lettres", () => {
    assert.equal(filters.formatLanguage(Language.FRENCH), "FR");
    assert.equal(filters.formatLanguage(Language.ENGLISH), "EN");
  });

  test("retourne une chaîne vide si null", () => {
    assert.equal(filters.formatLanguage(null), "");
  });
});

describe("dayFormat", () => {
  test("formate un Day (YYYYMMDD number) en français — jour de semaine + jour du mois", () => {
    // 22 novembre 2024 (vendredi)
    assert.equal(filters.dayFormat(20241122), "vendredi 22");
  });
});

describe("dateFormat / timeFormat / shortDateFormat", () => {
  // Toutes ces sorties dépendent du locale fr-FR + timezone Europe/Paris,
  // fixés via Intl.DateTimeFormat dans `_eleventy/filters.js`.
  const sampleDate = new Date("2024-11-22T08:00:00Z"); // 09:00 Paris (vendredi)

  test("dateFormat : jour-mois-année avec jour de semaine", () => {
    assert.equal(filters.dateFormat(sampleDate), "vendredi 22 novembre 2024");
  });

  test("timeFormat : heure:minute (TZ Europe/Paris)", () => {
    assert.equal(filters.timeFormat(sampleDate), "9:00");
    const half = new Date("2024-11-22T08:30:00Z");
    assert.equal(filters.timeFormat(half), "9:30");
  });

  test("shortDateFormat : alias de dayFormat à partir d'une Date", () => {
    assert.equal(filters.shortDateFormat(sampleDate), "vendredi 22");
  });
});

describe("subList", () => {
  test("tronque à la taille demandée", () => {
    assert.deepEqual(filters.subList([1, 2, 3, 4, 5], 3), [1, 2, 3]);
  });

  test("ne dépasse pas la longueur réelle", () => {
    assert.deepEqual(filters.subList([1, 2], 5), [1, 2]);
  });
});

describe("hours / minutes / dateKey", () => {
  test("hours extrait l'heure (zone Europe/Paris)", () => {
    // 2024-11-22T09:30:00+01:00 → 9h en Europe/Paris
    const d = new Date("2024-11-22T08:30:00.000Z");
    assert.equal(filters.hours(d), "9");
  });

  test("minutes formate sur 2 chiffres si < 10", () => {
    const d1 = new Date("2024-11-22T08:05:00.000Z");
    const d2 = new Date("2024-11-22T08:30:00.000Z");
    assert.equal(filters.minutes(d1), "05");
    assert.equal(filters.minutes(d2), "30");
  });

  test("minutes retourne '' si null", () => {
    assert.equal(filters.minutes(null), "");
  });

  test("dateKey est une string du timestamp", () => {
    const d = new Date(1700000000000);
    assert.equal(filters.dateKey(d), "1700000000000");
  });
});

describe("minutesBetween", () => {
  test("calcule l'écart en minutes entre deux dates", () => {
    const a = new Date("2024-11-22T09:00:00Z");
    const b = new Date("2024-11-22T09:25:00Z");
    assert.equal(filters.minutesBetween(b, a), 25);
  });

  test("retourne undefined si prev absent", () => {
    const a = new Date("2024-11-22T09:00:00Z");
    assert.equal(filters.minutesBetween(a, null), undefined);
    assert.equal(filters.minutesBetween(a, undefined), undefined);
  });
});

describe("filterByDateStart", () => {
  test("retient les sessions au timestamp exact", () => {
    const t = new Date("2024-11-22T09:00:00Z");
    const sessions = [
      { id: "a", dateStart: new Date("2024-11-22T09:00:00Z") },
      { id: "b", dateStart: new Date("2024-11-22T10:00:00Z") },
      { id: "c", dateStart: new Date("2024-11-22T09:00:00Z") },
    ];
    const res = filters.filterByDateStart(sessions, t);
    assert.deepEqual(
      res.map((s) => s.id),
      ["a", "c"],
    );
  });
});

describe("mapName", () => {
  test("extrait les .name d'une liste", () => {
    assert.deepEqual(filters.mapName([{ name: "x" }, { name: "y" }]), [
      "x",
      "y",
    ]);
  });

  test("liste vide", () => {
    assert.deepEqual(filters.mapName([]), []);
  });
});

describe("sessionIds", () => {
  test("ne garde que les sessions avec hideTrackTitle strictement === false", () => {
    // Le manifeste sert à filtrer les favoris : les sessions sans page de
    // détail (pauses, keynotes) ne doivent pas y figurer. La comparaison
    // est volontairement stricte (=== false) pour exclure les sessions
    // dont le flag n'a pas été défini explicitement.
    const raw = [
      { id: "s1", hideTrackTitle: false },
      { id: "s2", hideTrackTitle: true },
      { id: "s3", hideTrackTitle: false },
      { id: "s4" }, // pas de flag → exclue
      { id: "s5", hideTrackTitle: undefined }, // explicitement undefined → exclue
    ];
    assert.deepEqual(filters.sessionIds(raw), ["s1", "s3"]);
  });
});

describe("concurrentSessions", () => {
  /**
   * Fabrique une session avec une durée par défaut de 50 minutes.
   * @param {string} id
   * @param {string} startISO
   * @param {{durationMin?: number, hideTrackTitle?: boolean, trackId?: string}} [opts]
   */
  function makeSession(id, startISO, opts = {}) {
    return {
      id,
      dateStart: new Date(startISO),
      duration: (opts.durationMin ?? 50) * 60 * 1000,
      hideTrackTitle: opts.hideTrackTitle ?? false,
      tracks: [{ id: opts.trackId ?? "t1" }],
    };
  }

  // Session courante de référence : 09:00 → 09:50.
  const current = makeSession("current", "2024-11-22T09:00:00Z", {
    trackId: "tA",
  });

  test("repère les sessions qui commencent pendant la session courante", () => {
    const overlapStart = makeSession("overlap-start", "2024-11-22T09:30:00Z", {
      trackId: "tB",
    });
    const res = filters.concurrentSessions([current, overlapStart], current);
    assert.deepEqual(
      res.map((s) => s.id),
      ["overlap-start"],
    );
  });

  test("repère les sessions qui finissent pendant la session courante", () => {
    // 08:30 + 50 min = 09:20 → chevauche 09:00–09:50
    const overlapEnd = makeSession("overlap-end", "2024-11-22T08:30:00Z", {
      trackId: "tB",
    });
    const res = filters.concurrentSessions([current, overlapEnd], current);
    assert.deepEqual(
      res.map((s) => s.id),
      ["overlap-end"],
    );
  });

  test("repère les sessions qui englobent la session courante", () => {
    // 08:30 → 10:30 (120 min) englobe entièrement 09:00 → 09:50
    const englobante = makeSession("englobante", "2024-11-22T08:30:00Z", {
      durationMin: 120,
      trackId: "tB",
    });
    const res = filters.concurrentSessions([current, englobante], current);
    assert.deepEqual(
      res.map((s) => s.id),
      ["englobante"],
    );
  });

  test("repère les sessions entièrement incluses dans la session courante", () => {
    // 09:10 → 09:30 (20 min) entièrement dans 09:00 → 09:50
    const incluse = makeSession("incluse", "2024-11-22T09:10:00Z", {
      durationMin: 20,
      trackId: "tB",
    });
    const res = filters.concurrentSessions([current, incluse], current);
    assert.deepEqual(
      res.map((s) => s.id),
      ["incluse"],
    );
  });

  test("écarte une session adjacente avant (sa fin == début de la courante)", () => {
    // 08:10 + 50 min = 09:00 → frontière exacte, NE chevauche PAS
    const adjBefore = makeSession("adj-before", "2024-11-22T08:10:00Z", {
      trackId: "tB",
    });
    assert.deepEqual(
      filters.concurrentSessions([current, adjBefore], current),
      [],
    );
  });

  test("écarte une session adjacente après (son début == fin de la courante)", () => {
    // 09:50 → 10:40 — frontière exacte, NE chevauche PAS
    const adjAfter = makeSession("adj-after", "2024-11-22T09:50:00Z", {
      trackId: "tB",
    });
    assert.deepEqual(
      filters.concurrentSessions([current, adjAfter], current),
      [],
    );
  });

  test("écarte les sessions hideTrackTitle (pauses, keynotes)", () => {
    const pause = {
      id: "pause-hidden",
      dateStart: new Date("2024-11-22T09:00:00Z"),
      duration: 50 * 60 * 1000,
      hideTrackTitle: true,
      tracks: [],
    };
    assert.deepEqual(filters.concurrentSessions([current, pause], current), []);
  });

  test("exclut la session elle-même", () => {
    assert.deepEqual(filters.concurrentSessions([current], current), []);
  });

  test("tri : par dateStart croissant", () => {
    const late = makeSession("late", "2024-11-22T09:40:00Z", { trackId: "tB" });
    const early = makeSession("early", "2024-11-22T09:10:00Z", {
      trackId: "tC",
    });
    const res = filters.concurrentSessions([current, late, early], current);
    assert.deepEqual(
      res.map((s) => s.id),
      ["early", "late"],
    );
  });

  test("tri : à dateStart identique, par tracks[0].id alphabétique", () => {
    // Deux sessions concurrentes commencent exactement au même horodatage —
    // la branche localeCompare de _eleventy/filters.js doit départager.
    const tBeta = makeSession("beta", "2024-11-22T09:10:00Z", {
      trackId: "tBeta",
    });
    const tAlpha = makeSession("alpha", "2024-11-22T09:10:00Z", {
      trackId: "tAlpha",
    });
    const res = filters.concurrentSessions([current, tBeta, tAlpha], current);
    assert.deepEqual(
      res.map((s) => s.id),
      ["alpha", "beta"],
    );
  });
});

describe("countSlots", () => {
  test("compte les slots couverts par la session", () => {
    const session = {
      dateStart: new Date("2024-11-22T09:00:00Z"),
      duration: 60 * 60 * 1000,
    };
    const slots = [
      new Date("2024-11-22T08:00:00Z"),
      new Date("2024-11-22T09:00:00Z"),
      new Date("2024-11-22T09:30:00Z"),
      new Date("2024-11-22T10:00:00Z"),
      new Date("2024-11-22T11:00:00Z"),
    ];
    // De 09:00 (inclus) à 10:00 (exclu) → slots 09:00 et 09:30 → 2
    assert.equal(filters.countSlots(session, slots), 2);
  });
});
