// Tests du générateur de `.htaccess` OVH (_scripts/ovh/htaccess.js).
// Le comportement réel des règles (redirections, réécritures, auth) a été
// validé sur un Apache 2.4 ; ici on verrouille le contenu généré.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  SECURITY_HEADERS,
  apacheQuote,
  buildRootHtaccess,
  hostname,
} from "../_scripts/ovh/htaccess.js";

const HTPASSWD = "/homez.123/login/.htpasswd-devfest-test";

describe("hostname", () => {
  test("édition courante et archives en prod", () => {
    assert.equal(hostname("prod"), "devfest.developers-group-dijon.fr");
    assert.equal(
      hostname("prod", 2024),
      "devfest-2024.developers-group-dijon.fr",
    );
  });

  test("édition courante et archives en test", () => {
    assert.equal(hostname("test"), "devfest-test.developers-group-dijon.fr");
    assert.equal(
      hostname("test", 2024),
      "devfest-test-2024.developers-group-dijon.fr",
    );
  });

  test("lance si l'environnement est inconnu", () => {
    // @ts-expect-error environnement volontairement invalide
    assert.throws(() => hostname("preprod"), /inconnu/);
  });
});

describe("apacheQuote", () => {
  test("échappe les guillemets doubles et les antislashs", () => {
    assert.equal(apacheQuote('a "b" \\c'), '"a \\"b\\" \\\\c"');
  });

  test("lance sur une valeur multiligne", () => {
    assert.throws(() => apacheQuote("a\nb"), /plusieurs lignes/);
  });
});

describe("buildRootHtaccess (prod)", () => {
  const out = buildRootHtaccess({ env: "prod", currentYear: 2026 });

  test("force HTTPS en tenant compte de X-Forwarded-Proto", () => {
    assert.match(out, /RewriteCond %\{HTTPS\} !=on/);
    assert.match(out, /RewriteCond %\{HTTP:X-Forwarded-Proto\} !=https/);
    assert.match(
      out,
      /RewriteRule \^ https:\/\/%\{HTTP_HOST\}%\{REQUEST_URI\} \[R=301,L\]/,
    );
  });

  test("sert l'édition courante depuis son dossier", () => {
    assert.ok(
      out.includes(
        "RewriteCond %{HTTP_HOST} ^devfest\\.developers-group-dijon\\.fr(:\\d+)?$ [NC]\nRewriteRule ^(?!\\d{4}/)(.*)$ /2026/$1 [L]",
      ),
    );
  });

  test("sert les archives depuis le dossier de leur année", () => {
    assert.ok(
      out.includes(
        "RewriteCond %{HTTP_HOST} ^devfest-(\\d{4})\\.developers-group-dijon\\.fr(:\\d+)?$ [NC]\nRewriteRule ^(?!\\d{4}/)(.*)$ /%1/$1 [L]",
      ),
    );
  });

  test("masque les dossiers d'édition et gère le slash final", () => {
    assert.ok(out.includes("RewriteRule ^\\d{4}(/|$) - [R=404,L]"));
    assert.ok(
      out.includes(
        "RewriteRule ^(.+/)?[^./]+$ https://%{HTTP_HOST}%{REQUEST_URI}/ [R=301,L]",
      ),
    );
  });

  test("reprend tous les en-têtes de sécurité, guillemets échappés", () => {
    for (const name of Object.keys(SECURITY_HEADERS)) {
      assert.match(out, new RegExp(`^Header always set ${name} "`, "m"));
    }
    assert.ok(
      out.includes(
        'Header always set Permissions-Policy "geolocation=(), microphone=(), camera=(), interest-cohort=(), payment=(self \\"https://skedl.link\\")"',
      ),
    );
    assert.ok(
      out.includes(
        'frame-src https://www.openstreetmap.org https://skedl.link"',
      ),
    );
  });

  test("page 404, cache public, ni authentification ni noindex", () => {
    assert.match(out, /^ErrorDocument 404 \/404\.html$/m);
    assert.match(out, /Cache-Control "public, max-age=3600"/);
    assert.doesNotMatch(out, /Auth|X-Robots-Tag/);
  });
});

describe("buildRootHtaccess (test)", () => {
  const out = buildRootHtaccess({
    env: "test",
    currentYear: 2026,
    htpasswdPath: HTPASSWD,
  });

  test("utilise les hôtes devfest-test", () => {
    assert.ok(out.includes("^devfest-test\\.developers-group-dijon\\.fr"));
    assert.ok(out.includes("^devfest-test-(\\d{4})\\.developers-group-dijon"));
  });

  test("protège par mot de passe, uniquement en HTTPS", () => {
    assert.ok(
      out.includes(
        `<If "%{HTTPS} == 'on' || req('X-Forwarded-Proto') == 'https'">`,
      ),
    );
    assert.ok(out.includes(`AuthUserFile "${HTPASSWD}"`));
    assert.match(out, /Require valid-user/);
  });

  test("exclut l'indexation et désactive le cache", () => {
    assert.match(out, /X-Robots-Tag "noindex, nofollow"/);
    assert.match(out, /Cache-Control "no-cache"/);
  });

  test("lance sans chemin absolu vers le .htpasswd", () => {
    assert.throws(
      () => buildRootHtaccess({ env: "test", currentYear: 2026 }),
      /chemin absolu/,
    );
    assert.throws(
      () =>
        buildRootHtaccess({
          env: "test",
          currentYear: 2026,
          htpasswdPath: ".htpasswd",
        }),
      /chemin absolu/,
    );
  });
});

describe("buildRootHtaccess (erreurs)", () => {
  test("lance si l'année courante est invalide", () => {
    assert.throws(
      () => buildRootHtaccess({ env: "prod", currentYear: NaN }),
      /invalide/,
    );
    assert.throws(
      () => buildRootHtaccess({ env: "prod", currentYear: 26 }),
      /invalide/,
    );
  });

  test("lance si l'environnement est inconnu", () => {
    assert.throws(
      // @ts-expect-error environnement volontairement invalide
      () => buildRootHtaccess({ env: "preprod", currentYear: 2026 }),
      /inconnu/,
    );
  });
});
