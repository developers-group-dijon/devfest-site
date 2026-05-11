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
  test("formate un Day (YYYYMMDD number) en français", () => {
    // 22 novembre 2024 (vendredi)
    const result = filters.dayFormat(20241122);
    assert.match(result, /vendredi/);
    assert.match(result, /22/);
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

describe("minutesBeetween", () => {
  test("calcule l'écart en minutes entre deux dates", () => {
    const a = new Date("2024-11-22T09:00:00Z");
    const b = new Date("2024-11-22T09:25:00Z");
    assert.equal(filters.minutesBeetween(b, a), 25);
  });

  test("retourne undefined si prev absent", () => {
    const a = new Date("2024-11-22T09:00:00Z");
    assert.equal(filters.minutesBeetween(a, null), undefined);
    assert.equal(filters.minutesBeetween(a, undefined), undefined);
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
  test("ne garde que les sessions non hideTrackTitle", () => {
    const raw = [
      { id: "s1", hideTrackTitle: false },
      { id: "s2", hideTrackTitle: true },
      { id: "s3", hideTrackTitle: false },
    ];
    assert.deepEqual(filters.sessionIds(raw), ["s1", "s3"]);
  });
});

describe("concurrentSessions", () => {
  test("repère les sessions qui chevauchent dans le temps", () => {
    const current = {
      id: "current",
      dateStart: new Date("2024-11-22T09:00:00Z"),
      duration: 50 * 60 * 1000,
      hideTrackTitle: false,
      tracks: [{ id: "t1" }],
    };
    const sessions = [
      current,
      {
        id: "overlap-start",
        dateStart: new Date("2024-11-22T09:30:00Z"),
        duration: 50 * 60 * 1000,
        hideTrackTitle: false,
        tracks: [{ id: "t2" }],
      },
      {
        id: "before",
        dateStart: new Date("2024-11-22T08:00:00Z"),
        duration: 50 * 60 * 1000,
        hideTrackTitle: false,
        tracks: [{ id: "t3" }],
      },
      {
        id: "pause-hidden",
        dateStart: new Date("2024-11-22T09:00:00Z"),
        duration: 50 * 60 * 1000,
        hideTrackTitle: true,
        tracks: [],
      },
    ];

    const res = filters.concurrentSessions(sessions, current);
    assert.deepEqual(
      res.map((s) => s.id),
      ["overlap-start"],
    );
  });

  test("exclut la session elle-même", () => {
    const current = {
      id: "self",
      dateStart: new Date("2024-11-22T09:00:00Z"),
      duration: 50 * 60 * 1000,
      hideTrackTitle: false,
      tracks: [{ id: "t1" }],
    };
    assert.deepEqual(filters.concurrentSessions([current], current), []);
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
