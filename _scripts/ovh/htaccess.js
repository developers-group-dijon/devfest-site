// Génère le `.htaccess` placé à la racine d'un environnement OVH (prod ou
// test). Chaque édition est publiée dans un sous-dossier `<année>/` et ce
// fichier aiguille les requêtes selon le nom d'hôte :
//   - `devfest[-test].<domaine>`          → dossier de l'édition courante
//   - `devfest[-test]-<année>.<domaine>` → dossier `<année>/` (archives)
//
// Il porte aussi ce que faisait Firebase Hosting : HTTPS forcé, en-têtes de
// sécurité (CSP…), page 404, compression et cache court. Les en-têtes
// s'appliquent à toutes les éditions, archives comprises (elles n'utilisent
// aucune ressource externe hors de `frame-src`).
//
// L'environnement de test est en plus protégé par une authentification
// Basic (demandée uniquement en HTTPS, après la redirection, pour que le mot
// de passe ne circule jamais en clair) et exclu de l'indexation.
//
// Usage : node _scripts/ovh/htaccess.js <prod|test> <année-courante>
//   Variable d'environnement requise en test : HTPASSWD_PATH (chemin absolu
//   du .htpasswd sur l'hébergement, secret TEST_HTPASSWD_PATH). Comme pour le
//   site developers-group-dijon, le .htpasswd est publié à la racine du
//   dossier de test et son accès direct est interdit.

import { pathToFileURL } from "node:url";

export const DOMAIN = "developers-group-dijon.fr";

/** Préfixe du nom d'hôte de chaque environnement. */
export const HOST_PREFIXES = {
  prod: "devfest",
  test: "devfest-test",
};

/**
 * En-têtes HTTP de sécurité, repris de l'ancienne configuration Firebase.
 * Toute nouvelle iframe (billetterie, carte…) doit être ajoutée à `frame-src`,
 * et pour un paiement aussi à `payment=(…)`.
 * @type {Record<string, string>}
 */
export const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy": [
    "default-src 'self'",
    "frame-ancestors 'none'",
    "style-src 'self' 'unsafe-inline'",
    "frame-src https://www.openstreetmap.org https://skedl.link",
  ].join("; "),
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": [
    "geolocation=()",
    "microphone=()",
    "camera=()",
    "interest-cohort=()",
    'payment=(self "https://skedl.link")',
  ].join(", "),
};

/**
 * Nom d'hôte d'une édition dans un environnement.
 * @param {"prod"|"test"} env
 * @param {number} [archiveYear] - absent pour l'édition courante
 * @returns {string}
 */
export function hostname(env, archiveYear) {
  const prefix = HOST_PREFIXES[env];
  if (!prefix) {
    throw new Error(`Environnement inconnu : ${env}`);
  }
  return archiveYear
    ? `${prefix}-${archiveYear}.${DOMAIN}`
    : `${prefix}.${DOMAIN}`;
}

/**
 * Met une valeur entre guillemets doubles pour une directive Apache.
 * @param {string} value
 * @returns {string}
 */
export function apacheQuote(value) {
  if (/[\r\n]/.test(value)) {
    throw new Error(`Valeur Apache sur plusieurs lignes : ${value}`);
  }
  return `"${value.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;
}

/**
 * @param {string} s
 * @returns {string}
 */
function regexEscape(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Construit le `.htaccess` racine d'un environnement.
 * @param {object} opts
 * @param {"prod"|"test"} opts.env
 * @param {number} opts.currentYear - édition servie sur l'hôte principal
 * @param {string} [opts.htpasswdPath] - chemin absolu du .htpasswd (test uniquement)
 * @returns {string}
 */
export function buildRootHtaccess({ env, currentYear, htpasswdPath }) {
  if (!Number.isInteger(currentYear) || String(currentYear).length !== 4) {
    throw new Error(`Année courante invalide : ${currentYear}`);
  }
  if (env === "test" && !htpasswdPath?.startsWith("/")) {
    throw new Error(
      "L'environnement de test exige un chemin absolu vers le .htpasswd",
    );
  }
  const prefix = regexEscape(HOST_PREFIXES[env] ?? "");
  if (!prefix) {
    throw new Error(`Environnement inconnu : ${env}`);
  }
  const domain = regexEscape(DOMAIN);

  const headers = Object.entries(SECURITY_HEADERS).map(
    ([name, value]) => `Header always set ${name} ${apacheQuote(value)}`,
  );
  if (env === "test") {
    headers.push(`Header always set X-Robots-Tag "noindex, nofollow"`);
  }
  // Même durée de cache que Firebase Hosting par défaut ; aucune en test pour
  // voir immédiatement le résultat d'un déploiement.
  headers.push(
    env === "prod"
      ? `Header set Cache-Control "public, max-age=3600"`
      : `Header set Cache-Control "no-cache"`,
  );

  const auth =
    env === "test"
      ? `
# Authentification de l'environnement de test. Demandée seulement en HTTPS :
# en HTTP, la redirection ci-dessous passe d'abord, sinon le navigateur
# enverrait le mot de passe en clair.
<If "%{HTTPS} == 'on' || req('X-Forwarded-Proto') == 'https'">
  AuthType Basic
  AuthName "DevFest Dijon (test)"
  AuthUserFile ${apacheQuote(htpasswdPath ?? "")}
  Require valid-user
</If>
<Files ".htpasswd">
  Require all denied
</Files>
`
      : "";

  return `# Généré par _scripts/ovh/htaccess.js : ne pas modifier sur le serveur.
# Environnement : ${env}. Édition courante : ${currentYear}.

Options -Indexes
DirectoryIndex index.html
AddDefaultCharset utf-8
ErrorDocument 404 /404.html

${headers.join("\n")}

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript text/javascript application/json application/xml image/svg+xml
</IfModule>
${auth}
RewriteEngine On

# HTTPS forcé. OVH peut terminer le TLS en amont : X-Forwarded-Proto fait foi.
RewriteCond %{HTTPS} !=on
RewriteCond %{HTTP:X-Forwarded-Proto} !=https
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# Les dossiers d'édition ne sont pas accessibles directement (contenu dupliqué).
RewriteCond %{ENV:REDIRECT_STATUS} ^$
RewriteRule ^\\d{4}(/|$) - [R=404,L]

# Slash final ajouté ici plutôt que par mod_dir, dont la redirection
# exposerait le dossier de l'édition dans l'URL.
RewriteCond %{ENV:REDIRECT_STATUS} ^$
RewriteRule ^(.+/)?[^./]+$ https://%{HTTP_HOST}%{REQUEST_URI}/ [R=301,L]

# Édition courante
RewriteCond %{HTTP_HOST} ^${prefix}\\.${domain}(:\\d+)?$ [NC]
RewriteRule ^(?!\\d{4}/)(.*)$ /${currentYear}/$1 [L]

# Archives : ${HOST_PREFIXES[env]}-<année>.${DOMAIN} → /<année>/
RewriteCond %{HTTP_HOST} ^${prefix}-(\\d{4})\\.${domain}(:\\d+)?$ [NC]
RewriteRule ^(?!\\d{4}/)(.*)$ /%1/$1 [L]
`;
}

// Exécution si lancé en CLI (pas si importé pour les tests)
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [env, year] = process.argv.slice(2);
  if (env !== "prod" && env !== "test") {
    console.error("Usage : node _scripts/ovh/htaccess.js <prod|test> <année>");
    process.exit(1);
  }
  process.stdout.write(
    buildRootHtaccess({
      env,
      currentYear: Number(year),
      htpasswdPath: process.env.HTPASSWD_PATH,
    }),
  );
}
