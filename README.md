# Générateur de site pour le DevFest Dijon

Ce projet est un socle pour générer un site web static pour les éditions du DevFest Dijon.

Le style et l'organisatiaon du site sont grandement inspirés de [Hoverboard](https://github.com/gdg-x/hoverboard).

La stack sous-jacente est quant à elle très différente et repose sur [Eleventy](https://www.11ty.dev/).

# Organisation du dépôt

Le dépôt Git est prévu pour avoir :

- La branche `main` contenant la version en cours
- Une branche par édition précédente (au format `devfest-dijon-<année>`)

# CI et déploiement

Le site est publié par SFTP sur l'hébergement mutualisé OVH, par le workflow `.github/workflows/build-deploy.yml`.

## Organisation sur l'hébergement

Deux environnements sur le même SFTP, chacun dans son dossier, avec un sous-dossier par édition :

```
~ (racine du compte OVH)
├── devfest/              prod
│   ├── .htaccess
│   ├── 2024/
│   ├── 2025/
│   └── 2026/
└── devfest_test/         test
    ├── .htaccess
    ├── .htpasswd         identifiants du test (accès direct interdit)
    └── 2026/
```

Le `.htaccess` racine, généré par `_scripts/ovh/htaccess.js`, aiguille selon l'hôte :

| Environnement | Édition courante                                  | Archives                                                  |
| ------------- | ------------------------------------------------- | --------------------------------------------------------- |
| prod          | `https://devfest.developers-group-dijon.fr/`      | `https://devfest-<année>.developers-group-dijon.fr/`      |
| test          | `https://devfest-test.developers-group-dijon.fr/` | `https://devfest-test-<année>.developers-group-dijon.fr/` |

Il force aussi le HTTPS, applique les en-têtes de sécurité (CSP, Permissions-Policy, HSTS…) à toutes les éditions, sert la page 404 de chaque édition et empêche l'accès direct aux dossiers `/<année>/`. En test, il demande un identifiant et un mot de passe (uniquement en HTTPS) et ajoute `X-Robots-Tag: noindex`.

**Les en-têtes HTTP se modifient dans `_scripts/ovh/htaccess.js`** (`SECURITY_HEADERS`), jamais directement sur le serveur : le fichier est réécrit à chaque déploiement de l'édition courante.

## Quand le site est-il publié ?

L'édition publiée est celle de `_data/site.json` (`year`, et `url` : `devfest.…` pour l'édition courante, `devfest-<année>.…` pour une archive). L'environnement dépend de la branche :

| Branche                     | Publication                                           |
| --------------------------- | ----------------------------------------------------- |
| `main`                      | prod, dossier `<year>`, `.htaccess` racine mis à jour |
| branche tirée de `main`     | test, dossier `<year>`, `.htaccess` racine mis à jour |
| `devfest-dijon-<année>`     | prod, dossier `<year>` (archive)                      |
| branche tirée d'une archive | test, dossier `<year>` (archive)                      |
| pull request                | build et vérifications uniquement                     |

Le workflow (`.github/workflows/build-deploy.yml`) reprend les étapes du site [developers-group-dijon/site](https://github.com/developers-group-dijon/site) : **build** (`npm run check`, build, audit perf + a11y en test), puis **deploy-test** ou **deploy-production**. Il vérifie aussi `site.json` : `year` doit correspondre à `url`, `main` doit porter l'édition courante et `devfest-dijon-<année>` l'archive de son année.

Pour modifier une édition passée : tirer une branche depuis `devfest-dijon-<année>`, pousser (publication en test sur `devfest-test-<année>.…`), ouvrir la PR vers la branche d'archive, puis la fusionner (publication en prod sur `devfest-<année>.…`).

Il n'y a qu'une place de test par édition : deux branches de la même édition s'écrasent, le dernier push l'emporte.

## Configuration GitHub

Mêmes noms que pour le site developers-group-dijon. Les secrets sont définis dans les environnements GitHub (_Settings_ > _Environments_) :

| Secret               | Environnements   | Contenu                                                                                                        |
| -------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------- |
| `FTP_SERVER`         | test, production | serveur SFTP (ex. `ssh.clusterXXX.hosting.ovh.net`)                                                            |
| `FTP_USERNAME`       | test, production | identifiant FTP/SSH                                                                                            |
| `FTP_PASSWORD`       | test, production | mot de passe FTP/SSH                                                                                           |
| `TEST_AUTH_USER`     | test             | identifiant de l'environnement de test                                                                         |
| `TEST_AUTH_PASSWORD` | test             | mot de passe de l'environnement de test                                                                        |
| `TEST_HTPASSWD_PATH` | test             | chemin absolu du `.htpasswd` publié dans le dossier de test (ex. `/homez.123/<compte>/devfest_test/.htpasswd`) |

Les dossiers sur le SFTP sont fixés en tête du workflow : `devfest` (prod) et `devfest_test` (test).

## Côté OVH

Dans _Hébergement_ > _Multisite_, chaque nom d'hôte est déclaré avec SSL activé et le dossier racine de son environnement :

- `devfest.developers-group-dijon.fr` et chaque `devfest-<année>.developers-group-dijon.fr` → `devfest`
- `devfest-test.developers-group-dijon.fr` et chaque `devfest-test-<année>.developers-group-dijon.fr` → `devfest_test`

`npm run new-edition` rappelle les deux entrées à ajouter pour chaque nouvelle archive.

# Personnaliser le contenu du site

- Modifier les données de l'édition (`_data` et `_assets`)
- Personnaliser le style

## Données JS

Les fichiers `js` dans le répertoire `_data`

- Utilisées par Eleventy pour générer le contenu des pages
- Inspirées de ce que fournit https://openplanner.fr (en JS pas JSON pour avoir la validation JSDoc)

Le script `_data_gen/generate-from-openplanner.js` permet de générer certains fichiers JS de données à partir de l'URL d'export JSON depuis OpenPlanner (version public).

Pour exécuter le script : `node _data_gen/generate-from-openplanner.js https://storage.googleapis.com/conferencecenterr.appspot.com/events/<xxxxx>/<yyyyy>.json`

## Style, images et photos

Les fichiers dans le répertoire `_assets`

### Style

- Personnaliser du style CSS
  - Custom properties dans `_assets/style.css` pour faire une gestion de thèmes (ultra) simplifiée (https://www.color-hex.com/ peut être un outil utile)
  - Au besoin modifier des autres fichiers CSS
    - `style.css` : styles partagés
    - `layout.css` : styles de mise structuration des HTML (ne devrait pas être modifié dans le cadre de la personnalisation du contenu pour un évènement)
    - 1 fichier CSS par page du site (`session.css`, `schedule.css`)
- Modifier les polices de caractères
  - Ajouter les polices comme dépendance dans le projet NPM
  - Prendre en compte les fichiers dans `.eleventy.js`
  - Inclure les CSS de la police dans `_layouts/base.njk`
  - Modifier le CSS du projet (utiliser la police de caractères)

### Images et photos

On distingue 2 types de contenu images.

Dans tous les cas les fichiers sont référencés avec des URLs relatives au dossier `_assets` (par exemple `/avatar/foo.webp`)

- Les données : référencés dans les fichiers `_data`
  - `_assets/avatars` pour les speakers et les membres de l'équipe organisatrice (taille recommandée 128x128)
  - `_assets/sponsors` pour les logos des sponsors (taille recommandée 300x150)

- le style/thème du site : référencés dans les métadonnées Frontmatter des fichiers layouts et template des pages
  - `_layout/base.njk`
    - `brandLogo` : logo dans le header (taille recommandée 150x30)
    - `icons` : favicons
  - `_pages/index.njk`
    - `bigLogo` : logo dans la zone _hero_ (taille recommandée 400x150)
    - `background` : arrière plan de la zone _hero_ (taille recommandée 2000x1100)
    - `teamPhoto` : photo de l'équipe (taille recommandée 700x500)
    - `photos` : 8 photos (taille recommandée [500..800]x[500..800])
  - sur les autres pages (layout `_layouts/page.njk`)
    - `image` : arrière plan d l'entête (taille recommandée 2000x500)

**Attention** : penser à vérifier le rendu du texte affiché (en blanc) sur les images d'arrière plan.

# Nouvelle édition du site

Depuis la branche `main` propre, lancer :

```sh
npm run new-edition <année>
```

(exemple : `npm run new-edition 2027` pour préparer l'édition 2027 et archiver l'édition courante).

Le script :

- Lit l'année courante dans `_data/site.json` (`year`).
- Crée la branche `devfest-dijon-<année-courante>` (archive) et y met à jour `_data/site.json` vers l'URL d'archive `https://devfest-<année-courante>.developers-group-dijon.fr` (même `year`).
- Sur `main` : passe `year` de `_data/site.json` à la nouvelle année, met à jour `_data/rawEvent.js` (nom, dates, `previousEditions`, `callForPaper: null`, `sponsoringUrl: null`), et vide les fichiers OpenPlanner (`rawSessions.js`, `speakers.js`, `formats.js`, `categories.js`, `tracks.js`).
- Crée 2 commits locaux (pas de `git push` automatique).

À la fin, le script affiche en sortie les étapes manuelles restantes :

1. **Déclarer les multisites OVH de l'archive**, avec SSL : `devfest-<année>.developers-group-dijon.fr` (dossier de prod) et `devfest-test-<année>.developers-group-dijon.fr` (dossier de test).
2. **Pousser les deux branches** sur GitHub (`git push origin devfest-dijon-<année>` puis `git push origin main`) : chaque push publie son édition, et celui de `main` fait pointer l'hôte principal vers la nouvelle édition.
3. **Éditer les contenus éditoriaux** sur `main` : `_data/rawEvent.js` (visitors, comments, team, dates exactes), `_data/sponsors.js`, `_data/ticketing.js` (`url`/`pricings`, plus `embedUrl` — voir ci-dessous), assets visuels (logos, photos).
4. **Régénérer les données quand l'export OpenPlanner est prêt** : `node _data_gen/generate-from-openplanner.js <url-json-export>`.

Si le prestataire de billetterie change et que `embedUrl` est utilisée : ajouter son origine à `frame-src` et à `payment=(…)` dans `SECURITY_HEADERS` (`_scripts/ovh/htaccess.js`), sinon l'iframe est bloquée en production.

### Billetterie embarquée (`ticketing.embedUrl`)

`_data/ticketing.js` porte deux URL, écrites en entier :

- `url` — le lien externe vers la billetterie. Seul champ nécessaire : les déclencheurs (lien « Billetterie » du header, cartes de tarifs de l'accueil) sont alors de simples `<a>`. Un tarif peut avoir le sien via `pricing.url`.
- `embedUrl` — la même billetterie en version embarquable, paramètres d'intégration compris (côté Skedl : `?embed=true&showHero=false&showMerch=true&showSponsors=true…`). **Sa seule présence** transforme les déclencheurs en `<button>` ouvrant un `<dialog>`, avec un `<noscript>` de repli vers `url`. Surchargeable par tarif via `pricing.embedUrl`.

Les deux URL sont utilisées telles quelles, sans transformation au build : les paramètres d'intégration se règlent donc dans les données, sans toucher au code. Penser à les faire évoluer ensemble.

Trois conséquences à ne pas oublier quand `embedUrl` est renseignée :

- son origine doit figurer dans `frame-src` **et** dans `payment=(…)` de la `Permissions-Policy` (`SECURITY_HEADERS` dans `_scripts/ovh/htaccess.js`) — sans quoi la CSP bloque l'iframe et la délégation de la Payment Request API échoue. **C'est cette liste `frame-src` qui constitue la frontière de confiance** : l'iframe n'est pas mise en `sandbox`, un bac à sable assez permissif pour un tunnel de paiement devant inclure `allow-scripts` + `allow-same-origin`, combinaison qui permet à l'iframe de le retirer elle-même ;
- `Esc` ne ferme pas le dialog quand le focus est passé dans l'iframe : l'événement clavier part au document embarqué. Comportement inhérent au cross-origin, non corrigeable côté site ; d'où le bouton de fermeture toujours visible, le clic hors panneau et le lien « ouvrir dans un onglet » ;
- la hauteur de l'iframe suit le message `skedl:resize` émis par la billetterie (origine et frame émettrice vérifiées, cf. `_assets/js/ticketing-sheet.js`). Un autre prestataire n'émettra pas ce message : l'iframe gardera alors le `70dvh` de `_assets/css/ticketing.css` et son défilement interne.

# Contribuer et outils de développement

## Organisation du code

À la racine :

- `_assets` : les ressources statiques (JS de run, CSS, images), non _traitées_ par Eleventy
- `_data` : les données utilisées par Eleventy pour générer le site
  - `eleventyComputed.js` : construction de _nouvelles_ données pour Eleventy à partir des autres données (traitement, manipulation, etc.)
- `_eleventy` : filtres et shortcodes Eleventy
- `_layout` : les layouts des pages
- `_site` : résultat du build
- `pages` : les pages (et templates de pages) du site
- `.eleventy.js` : la configuration d'Eleventy
- autres fichiers et dossiers : fichiers de configuration des outils de build/lint/ci/etc.

## Stack technique

### Dev

- [Eleventy](https://www.11ty.dev/)
- Templating [Nunjucks](https://mozilla.github.io/nunjucks/)

### Lint

- [JSDoc](https://jsdoc.app/) : `tsconfig.json`
- [ESLint](https://eslint.org/) : `.eslintrc.js`, `.eslintignore`
- [Prettier](https://prettier.io/) : `.prettierrc.js`
- [Stylelint](https://stylelint.io/) : `.stylelintrc.js`
- [Commitlint](https://commitlint.js.org/) : `.commitlintrc.js`
- [Browserlist](https://browsersl.ist/) (code JS de dev + code JS et CSS de run) : `.browserslistrc`

### Run

Pas de bibliothèques : uniquement du HTML, des CSS et un peu de JS.

## Build et commandes principales

Les commandes utiles sont toutes définies comme `script` dans `package.json`.

- `lint` : vérifie code
- `format` : format le code
- `build` : construit le site dans `_site`
- `serve` : construit, watch et sert le site en local sur le port `8080`
