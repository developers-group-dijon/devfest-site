// Tests unitaires des shortcodes Nunjucks (_eleventy/shortcodes.js).
//
// `iconSvg` lit physiquement un SVG sur le filesystem
// (node_modules/@fortawesome/fontawesome-free/svgs/<path>.svg) et
// injecte aria-hidden + focusable=false sur la balise <svg>. Ces tests
// utilisent des paths FontAwesome réels et stables — on n'asserte que
// sur le contrat (attributs d'accessibilité, structure du lien social),
// pas sur le contenu du SVG qui peut varier d'une version à l'autre du
// package.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import shortcodesDefault, { iconSvg, social } from "../_eleventy/shortcodes.js";
import { SocialId } from "../_data/types.js";

describe("iconSvg", () => {
  test("injecte aria-hidden=true et focusable=false sur le SVG racine", () => {
    const html = iconSvg("solid/link");
    assert.match(html, /^<svg [^>]*aria-hidden="true"/);
    assert.match(html, /^<svg [^>]*focusable="false"/);
    // Sanity-check : le SVG d'origine est bien préservé (viewBox laissé intact)
    assert.match(html, /viewBox="/);
  });

  test("lance si le path n'existe pas (lecture filesystem en erreur)", () => {
    assert.throws(() => iconSvg("solid/inexistant-icon-123"));
  });

  test("est exposé via le default export pour Eleventy", () => {
    assert.equal(typeof shortcodesDefault["iconSvg"], "function");
  });
});

describe("social", () => {
  /**
   * Cas attendus pour chaque SocialId connu : chemin FontAwesome correspondant.
   * Si un nouvel id est ajouté à l'enum, ce test signale l'oubli (couverture
   * exhaustive du switch interne).
   */
  const CASES = [
    { id: SocialId.LINKEDIN, expectedSvg: "brands/linkedin" },
    { id: SocialId.GITHUB, expectedSvg: "brands/github" },
    { id: SocialId.X, expectedSvg: "brands/x-twitter" },
    { id: SocialId.MASTODON, expectedSvg: "brands/mastodon" },
    { id: SocialId.BLUESKY, expectedSvg: "brands/bluesky" },
    { id: SocialId.LINK, expectedSvg: "solid/link" },
    { id: SocialId.INSTAGRAM, expectedSvg: "brands/instagram" },
  ];

  // Confirme que CASES couvre tous les SocialId déclarés — protège contre
  // un nouvel id ajouté à l'enum sans test associé.
  test("couvre tous les SocialId déclarés", () => {
    const declared = new Set(Object.values(SocialId));
    const covered = new Set(CASES.map((c) => c.id));
    assert.deepEqual(covered, declared);
  });

  for (const { id, expectedSvg } of CASES) {
    test(`génère un lien pour SocialId.${id} avec le bon SVG`, () => {
      const html = social({
        id,
        name: "Mon profil",
        link: "https://exemple.fr",
      });
      // Marqueurs du SVG attendu : on compare avec ce qu'iconSvg renvoie
      // sur ce même path FontAwesome — donc on n'asserte pas sur du contenu
      // SVG volatile, juste sur l'identité du SVG injecté.
      const expectedSvgHtml = iconSvg(expectedSvg);
      assert.ok(
        html.includes(expectedSvgHtml),
        `Le HTML retourné doit contenir le SVG ${expectedSvg}`,
      );
      // Structure du lien
      assert.match(html, /class="social-icon"/);
      assert.match(html, /href="https:\/\/exemple\.fr"/);
      assert.match(html, /aria-label="Mon profil"/);
      assert.match(html, /title="Mon profil ⋅ https:\/\/exemple\.fr"/);
    });
  }

  test("est exposé via le default export pour Eleventy", () => {
    assert.equal(typeof shortcodesDefault["social"], "function");
  });
});
