# Migration des archives vers la publication OVH

Plan pour reporter la publication OVH sur les branches d'archive `devfest-dijon-2023`, `devfest-dijon-2024` et `devfest-dijon-2025`, une fois `ci/deploiement-ovh` validée et fusionnée dans `main`.

Chaque archive suit le parcours prévu pour toute modification d'une édition passée : une branche tirée de l'archive est publiée en test sur `devfest-test-<année>.…`, puis fusionnée dans l'archive pour être publiée en prod sur `devfest-<année>.…`.

Ce plan a été rejoué sur les trois branches (worktrees jetables, Node 24) : installation, vérification (`check` ou `lint`), build et calcul de la cible passent.

Supprimer ce fichier une fois les trois archives migrées.

## Prérequis

1. `ci/deploiement-ovh` est fusionnée dans `main` et `main` est publiée en prod et en test (les `.htaccess` racine de `devfest/` et `devfest_test/` existent).
2. Secrets renseignés dans les environnements GitHub `test` et `production` (voir README).
3. Multisites OVH déclarés avec SSL, dossier racine `devfest` ou `devfest_test` :
   - `devfest-2023`, `devfest-2024`, `devfest-2025` `.developers-group-dijon.fr` → `devfest`
   - `devfest-test-2023`, `devfest-test-2024`, `devfest-test-2025` `.developers-group-dijon.fr` → `devfest_test`

## Ce qui change sur chaque archive

| Fichier                                                   | 2023      | 2024          | 2025          |
| --------------------------------------------------------- | --------- | ------------- | ------------- |
| `firebase.json`, `.firebaserc`, workflows Firebase        | supprimés | supprimés     | supprimés     |
| `.github/workflows/build-deploy.yml` (copie de `main`)    | ajouté    | ajouté        | ajouté        |
| `_scripts/ovh/{htaccess.js,target.js,deploy.sh}`          | ajoutés   | ajoutés       | ajoutés       |
| `_data/site.json` : `url` d'archive + `year`              | **créé**  | `year` ajouté | `year` ajouté |
| `_scripts/ovh/package.json` (`"type": "module"`)          | ajouté    | —             | —             |
| `tsconfig.json`, `.eslintignore` : exclure `_scripts/ovh` | modifiés  | —             | —             |

2023 n'est pas en ESM (pas de `"type": "module"`) et son ESLint / tsconfig analysent les scripts en CommonJS : d'où les trois ajustements propres à cette branche. Le code de l'édition n'est pas modifié.

## Procédure, archive par archive

Commencer par 2025 (la plus proche de `main`), puis 2024, puis 2023. Remplacer `YYYY` par l'année.

### 1. Préparer la branche

```sh
git fetch origin
git switch -c ci/ovh-YYYY origin/devfest-dijon-YYYY
```

### 2. Commit 1 — remplacer Firebase par la publication OVH

```sh
git rm firebase.json .firebaserc \
  .github/workflows/firebase-hosting-merge.yml \
  .github/workflows/firebase-hosting-pull-request.yml
git checkout origin/main -- .github/workflows/build-deploy.yml \
  _scripts/ovh/htaccess.js _scripts/ovh/target.js _scripts/ovh/deploy.sh
```

**2023 uniquement :**

```sh
printf '{\n  "type": "module"\n}\n' > _scripts/ovh/package.json
sed -i 's#"exclude": \["_site"\]#"exclude": ["_site", "_scripts/ovh"]#' tsconfig.json
printf '_scripts/ovh\n' >> .eslintignore
git add _scripts/ovh/package.json tsconfig.json .eslintignore
```

```sh
git commit -m "ci: remplace le déploiement Firebase par une publication OVH"
```

### 3. Commit 2 — porter l'année dans `site.json`

```sh
printf '{\n  "url": "https://devfest-YYYY.developers-group-dijon.fr",\n  "year": YYYY\n}\n' > _data/site.json
git add _data/site.json
git commit -m "feat: porte l'année de l'édition dans site.json"
```

### 4. Vérifier en local

```sh
npm ci
if npm run | grep -qE '^  check$'; then npm run check; else npm run lint; fi   # 2023 et 2024 : lint
npm run clean-build
BRANCH=devfest-dijon-YYYY node _scripts/ovh/target.js
# attendu : env=prod year=YYYY update_root=false url=https://devfest-YYYY.developers-group-dijon.fr
```

### 5. Publier en test

```sh
git push -u origin ci/ovh-YYYY
```

Le workflow publie dans `devfest_test/YYYY/`. Vérifier `https://devfest-test-YYYY.developers-group-dijon.fr/` (identifiants de test) :

- page d'accueil, programme, une page de session et une page de speaker ;
- une URL inexistante renvoie la page 404 de l'édition ;
- `http://` redirige vers `https://` ;
- `https://devfest-test.developers-group-dijon.fr/` affiche toujours l'édition courante (l'archive ne touche pas au `.htaccess` racine).

### 6. Publier en prod

Ouvrir la PR `ci/ovh-YYYY` → `devfest-dijon-YYYY` et la fusionner en fast-forward (bouton _Rebase and merge_, ou en local `git switch devfest-dijon-YYYY && git merge --ff-only ci/ovh-YYYY` puis push). Le push sur l'archive publie dans `devfest/YYYY/`.

Vérifier `https://devfest-YYYY.developers-group-dijon.fr/` comme en test, plus les en-têtes :

```sh
curl -sI https://devfest-YYYY.developers-group-dijon.fr/ | grep -iE 'content-security|strict-transport|x-frame'
```

Supprimer ensuite la branche `ci/ovh-YYYY`.

## Après les trois archives

1. Basculer les noms d'hôte encore servis par Firebase vers OVH (DNS) si ce n'est pas déjà fait, puis vérifier chaque URL.
2. Supprimer les sites Firebase Hosting et le secret `FIREBASE_SERVICE_ACCOUNT_DEVFEST_DIJON`.
3. Supprimer ce fichier.
