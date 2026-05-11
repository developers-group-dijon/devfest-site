# Générateur de site pour le DevFest Dijon

Ce projet est un socle pour générer un site web static pour les éditions du DevFest Dijon.

Le style et l'organisatiaon du site sont grandement inspirés de [Hoverboard](https://github.com/gdg-x/hoverboard).

La stack sous-jacente est quant à elle très différente et repose sur [Eleventy](https://www.11ty.dev/).

# Organisation du dépôt

Le dépôt Git est prévu pour avoir :

- La branche `main` contenant la version en cours
- Une branche par édition précédente (au format `devfest-dijon-<année>`)

# CI et déploiement

Le merges sur les branches branches `main` et `devfest-dijon-<année>` déclenches le workflow `.github/workflows/firebase-hosting-merge.yml`.
Cela correspond à :

1. Lint du code
2. Build du site
3. Déploiement sur le site Firebase correspondant à la `target` du nom de la branche (mis à part la target `main` qui déploie sur le `site` `devfest-dijon`, les autres `target`s déploient sur un `site` du même nom que la `target`)

Les autres branches et le pull-request déclenchent le workflow `.github/workflows/firebase-hosting-pull-request.yml`.
Cela reprend le mêmes étapes que le workflow `.github/workflows/firebase-hosting-merge.yml` à la différence que le déploiement Firebase se fait sur `channel` temporaire.
Le site de preview ainsi créé est accessible 7 jours (dans le cas d'une pull-request, un commentaire indiquant l'adresse de preview est ajouté par Firebase).

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

- Crée la branche `devfest-dijon-<année-courante>` (archive) et y met à jour `_data/site.json` vers l'URL d'archive `https://devfest-<année-courante>.developers-group-dijon.fr/`.
- Sur `main` : ajoute le mapping `target` → `site` dans `.firebaserc` et l'entrée `hosting` correspondante dans `firebase.json`, met à jour `_data/rawEvent.js` (nom, dates, `previousEditions`, `callForPaper: null`, `sponsoringUrl: null`), et vide les fichiers OpenPlanner (`rawSessions.js`, `speakers.js`, `formats.js`, `categories.js`, `tracks.js`).
- Crée 2 commits locaux (pas de `git push` automatique).

À la fin, le script affiche en sortie les étapes manuelles restantes :

1. **Créer le site Firebase pour l'archive** (interactif, console ou `firebase hosting:sites:create devfest-dijon-<année>`).
2. **Configurer le DNS et le domaine personnalisé** dans la console Firebase pour `devfest-<année>.developers-group-dijon.fr`.
3. **Pousser les deux branches** sur GitHub (`git push origin devfest-dijon-<année>` et `git push origin main`).
4. **Éditer les contenus éditoriaux** sur `main` : `_data/rawEvent.js` (visitors, comments, team, dates exactes), `_data/sponsors.js`, `_data/ticketing.js`, assets visuels (logos, photos).
5. **Régénérer les données quand l'export OpenPlanner est prêt** : `node _data_gen/generate-from-openplanner.js <url-json-export>`.

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
