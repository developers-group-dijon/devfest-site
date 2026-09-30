# CLAUDE.md

Générateur de site statique pour la conférence DevFest Dijon, construit avec Eleventy 3 + Nunjucks et publié par SFTP sur un hébergement mutualisé OVH (Apache). Le code, les commentaires, les tests, les messages de commit et l'interface sont tous en **français** : continuer à écrire en français.

## Workflow git (obligatoire)

- **Ne jamais lancer `git push`**, sous aucune forme. C'est l'utilisateur qui pousse.
- **Ne jamais committer sur `main`** (ni sur une branche d'archive `devfest-dijon-<année>`). Avant le premier commit, créer une branche de travail (`git switch -c <type>/<sujet-court>`, par ex. `feat/billetterie-embed`).
- **Découper les commits en unités logiques.** Chaque commit fait une seule chose et passe `npm run check` à lui seul. Ne pas mélanger dans un même commit des données (`data:`), du style (`style:`) et du comportement (`feat:`/`fix:`). Ajouter les fichiers un par un : `git add -p` est interactif et indisponible pour Claude ; le skill `/commit` décrit l'alternative.
- **Au passage sur une branche existante, ou à la reprise d'une ancienne branche :** lancer d'abord `git fetch` et comparer avec `main` (`git log --oneline main..HEAD`, `git log --oneline HEAD..main`). Si `main` a avancé, **proposer un rebase** sur `main` avant toute autre chose. Ne pas rebaser sans l'accord de l'utilisateur.
- **Les merges se font uniquement en fast-forward :** `git merge --ff-only <branche>`. Aucun commit de merge ne doit apparaître dans l'historique. Si le fast-forward échoue, rebaser la branche sur la cible puis réessayer. Ne jamais utiliser `--no-ff` et ne jamais se rabattre sur un vrai merge.
- Ne pas toucher aux changements qu'on n'a pas faits (par exemple un `package-lock.json` déjà modifié) : les laisser en dehors de ses commits.

### Messages de commit

Commitlint impose le format (`commitlint.config.js`, basé sur config-conventional). `npm run check` le lance sur tout l'historique.

- Types autorisés : `build chore ci docs feat fix perf refactor revert style test` **+ `data`** (modifications de contenu dans `_data/` ou d'images dans `_assets/` : programme, sponsors, horaires).
- Sujet en français, en minuscules, verbe au présent à la 3e personne, sans point final : `fix: corrige frame-src de la CSP`, `data: ajoute APRR en sponsor bronze`.
- Corps optionnel en français, coupé à environ 72 colonnes, qui explique le _pourquoi_ (et cite le SHA du commit corrigé le cas échéant).
- `style:` sert aux changements **visuels/CSS** du site, pas seulement au formatage.

### Outillage Claude (`.claude/`)

Des hooks (`.claude/settings.json` → `.claude/hooks/*.sh`) font respecter les règles ci-dessus :

- `git-guard.sh` (PreToolUse Bash) : bloque `git push`, les commits sur `main`/`devfest-dijon-*`, les merges qui ne sont pas en `--ff-only` et les `git pull` sans `--ff-only`/`--rebase`.
- `commitlint-check.sh` (PostToolUse Bash) : après un `git commit`, valide le message. En cas d'échec, corriger avec `git commit --amend`.
- `format.sh` (PostToolUse Edit|Write) : prettier + `eslint --fix` / `stylelint --fix` sur le fichier modifié, et signale les erreurs non corrigeables automatiquement.
- `session-branch-status.sh` (SessionStart) : branche courante et avance/retard sur `main`.

Skills : `/commit` (commits atomiques selon les conventions) et `/resume-branch [branche]` (fetch + checkout + proposition de rebase).

## Commandes

| Commande                                            | Rôle                                                                                                                |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `npm run serve`                                     | Serveur de dev local avec watch (port 8080, incrémental)                                                            |
| `npm run build`                                     | Build Eleventy (`ELEVENTY_PRODUCTION=true`) + génération de l'image OG (`_scripts/generate-og.js`) dans `_site/`    |
| `npm run clean-build`                               | `rm -rf _site` puis build (ce que lance la CI)                                                                      |
| `npm run check`                                     | Tout ce que vérifie la CI, en parallèle : prettier, eslint (run + build), stylelint, tsc (JSDoc), commitlint, tests |
| `npm run fix`                                       | prettier + eslint + stylelint en mode `--fix`                                                                       |
| `npm run check:test`                                | Tests (`node --test`, `TZ=Europe/Paris`)                                                                            |
| `TZ=Europe/Paris node --test _test/filters.test.js` | Lancer un seul fichier de test                                                                                      |
| `npm run audit`                                     | Build + Lighthouse (perf) + pa11y (a11y). Lancé par la CI sur les PR                                                |
| `npm run new-edition <année>`                       | Archive l'édition courante et prépare la suivante (voir le README)                                                  |
| `node _data_gen/generate-from-openplanner.js <url>` | Régénère les données à partir de l'export JSON OpenPlanner                                                          |

Toujours lancer `npm run check` avant de proposer un commit. Le README mentionne des scripts `lint`/`format` et des fichiers de config du type `.eslintrc.js` : ces informations sont périmées. Utiliser les scripts et fichiers de config listés ici.

## Architecture

```
.eleventy.js      Config Eleventy : passthrough _assets → /assets, polices (sous-ensemble Noto Sans,
                  Bitcount Grid Single), enregistrement des filtres et shortcodes
_data/            Données Eleventy, écrites en **JS** (pas en JSON) pour que JSDoc puisse les typer
  types.js        Typedefs JSDoc (Raw*, Session, Speaker, Event…). Source de vérité des types
  raw*.js, speakers.js, formats.js, categories.js, tracks.js
                  Générés depuis OpenPlanner (_data_gen). À éditer à la main seulement pour des ajustements fins
  rawEvent.js, sponsors.js, team.js, ticketing.js, site.json
                  Données éditoriales, maintenues à la main
  eleventyComputed.js
                  Construit les données dérivées (sessions, event, maps du programme…) à partir des données brutes
_data_gen/        Générateurs OpenPlanner → _data/*.js (et téléchargement des avatars)
_eleventy/        Filtres Nunjucks (filters.js), shortcodes (shortcodes.js), utilitaires
_layouts/         base.njk (squelette HTML, header, CSS/JS), page.njk (image d'entête + contenu)
_includes/        Partials : og-tags.njk, ticketing-trigger.njk
pages/            Templates des pages (index, schedule, session/speaker paginés, favoris, team…)
_assets/          Fichiers statiques, copiés tels quels dans /assets
  css/            style.css (custom properties du thème), layout.css, un fichier CSS par page
  js/             JS navigateur vanilla en modules ES, sans bibliothèque
_scripts/         Génération de l'image OG (sharp), new-edition.js
  ovh/            Déploiement OVH : htaccess.js (.htaccess racine), target.js (où publier), deploy.sh (SFTP)
_test/            Tests node:test + jsdom (_helpers/dom.js, timers.js)
_audit/           Scripts Lighthouse/pa11y
```

### Conventions clés

- **Aucune dépendance au runtime** : le site généré, c'est du HTML + du CSS + un peu de JS vanilla. Ne pas ajouter de bibliothèque front.
- **Les pages** déclarent leurs ressources dans le front matter : `css: "/css/<page>.css"`, `js: "/js/<module>.js"`, `image: "/background/…"`. Les URL des assets sont relatives à `_assets/` (par exemple `/avatars/foo.webp`).
- **Pagination** : les données calculées (`eleventyComputed`) ne sont **pas** disponibles dans `pagination`. Les templates paginent sur `rawSessions` puis résolvent la `session` correspondante dans `eleventyComputed` (voir `pages/session.njk`). `hideTrackTitle: true` (pauses, keynotes) signifie pas de page de détail et pas de comptage.
- **JS navigateur** : séparer la _logique pure_ (`*-utils.js`, testable sans DOM ni stockage) du module d'_orchestration DOM/stockage_. Par exemple, `favorites-utils.js` est pur tandis que `favorites.js` gère le localStorage, le hash et l'événement `favorites:change`. Les nouveaux modules suivent le même schéma, avec des tests pour le module utils et des tests d'intégration jsdom pour l'autre.
  - `favorites*` = module cœur des favoris ; `favoris*` = la page « Mon planning » (`/favoris`). Les deux noms coexistent volontairement.
  - La clé localStorage des favoris est propre à chaque édition (`body[data-edition]`).
- **JSDoc partout** (vérifié par `tsc --checkJs`, exigé par eslint-plugin-jsdoc hors de `_test/`). Les descriptions de `@param`/`@returns`/`@property` sont optionnelles. Importer les types via `import('./types.js').X`.
- **Commentaires en français**, qui expliquent le _pourquoi_ : contrainte navigateur, choix non évident, limitation connue. Chaque fichier JS commence par un bloc de commentaire décrivant son rôle.
- **Compatibilité navigateurs** : `.browserslistrc` définit deux environnements. `run` concerne `_assets/**` (JS + CSS, vérifié par `stylelint-no-unsupported-browser-features`) et `build` concerne Node. Les media queries utilisent la notation préfixée `min-width`/`max-width`, pas la syntaxe par intervalle (imposé par stylelint).
- **Prettier** avec la config par défaut (2 espaces, guillemets doubles, virgules finales). Ne pas reformater à la main : lancer `npm run fix:prettier`.
- **Tests** : `node:test` + `node:assert/strict`, noms de tests en français (`test("renvoie … quand …")`). Les modules navigateur sont chargés après `setupDOM()` avec un cache-bust de l'import pour rejouer les effets de bord exécutés au chargement du module.

### Sécurité / hébergement

- Les en-têtes HTTP (CSP, Permissions-Policy…) sont dans `SECURITY_HEADERS` de `_scripts/ovh/htaccess.js`, qui génère le `.htaccess` racine (HTTPS forcé, aiguillage par hôte vers le dossier `<année>/`, 404, auth Basic en test). Ne jamais les modifier sur le serveur. Toute nouvelle iframe ou origine externe (par exemple un prestataire de billetterie) doit être ajoutée à `frame-src`, et pour le paiement aussi à `payment=(…)`. Voir la section « Billetterie embarquée » du README.
- `default-src 'self'` : aucun script, police ou image externe. Les polices sont servies depuis `node_modules` via passthrough.

## Branches et déploiement

- Workflow unique : `.github/workflows/build-deploy.yml`. La cible est calculée par `_scripts/ovh/target.js` (testé dans `_test/ovh-target.test.js`).
- `main` = édition courante, publiée en prod dans le dossier de l'année de `_data/rawEvent.js`, servie sur `devfest.developers-group-dijon.fr`.
- `devfest-dijon-<année>` = archives des éditions précédentes, publiées dans le dossier `<année>/` et servies sur `devfest-<année>.developers-group-dijon.fr`. Ne pas les modifier sauf demande explicite.
- Les PR du dépôt sont publiées sur l'environnement de test (`devfest-test[-<année>].developers-group-dijon.fr`, protégé par mot de passe), après `check` + `clean-build` + `audit`. Il n'y a qu'un seul environnement de test.
- Les autres push (branches de travail) ne font que build, vérifications et audit.
- Renovate met à jour les dépendances chaque mois (commits `chore(deps): …`).
