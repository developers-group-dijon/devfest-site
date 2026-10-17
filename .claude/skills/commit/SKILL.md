---
name: commit
description: Committe les changements en cours sous forme d'une série de commits atomiques qui respectent les conventions du dépôt (conventional commits en français, type `data`, jamais sur main). À utiliser quand l'utilisateur demande de committer, d'enregistrer ou de « faire les commits ».
---

# Committer les changements en cours

1. **Vérifier la branche.** Lancer `git rev-parse --abbrev-ref HEAD`. Si c'est `main` ou `devfest-dijon-*`, s'arrêter et proposer un nom de branche de travail (`<type>/<sujet-court>`, par ex. `data/programme-2026`). La créer avec `git switch -c` seulement après accord de l'utilisateur.

2. **Faire l'inventaire des changements.** Lancer `git status --short` et `git diff` (plus `git diff --cached`). Laisser de côté tout fichier qui n'a pas été modifié pendant cette session et dire à l'utilisateur lesquels ont été ignorés (par exemple un `package-lock.json` modifié par quelqu'un d'autre).

3. **Valider.** Lancer `npm run check`. En cas d'échec, corriger le problème ou le signaler. Ne jamais committer un état en échec.

4. **Regrouper en commits logiques.** Une intention par commit, dans l'ordre qui garde chaque commit au vert :
   - `data:` contenu de `_data/` ou nouvelles images dans `_assets/` (programme, sponsors, équipe, billetterie)
   - `style:` changements visuels/CSS
   - `feat:` / `fix:` / `perf:` / `refactor:` comportement dans les templates, `_eleventy/`, `_assets/js/`
   - `test:` tests, sauf s'ils accompagnent le `feat`/`fix` qu'ils couvrent (à privilégier)
   - `docs:`, `ci:`, `build:`, `chore:` pour le reste

   Ajouter les fichiers un par un (`git add <fichiers>`). Quand un même fichier contient deux intentions, indexer une version intermédiaire plutôt que d'utiliser `git add -p`, qui est interactif : écrire cette version intermédiaire, puis `git hash-object -w` + `git update-index --cacheinfo`.

5. **Rédiger le message** en français :
   - sujet : `<type>: <verbe au présent, 3e personne, minuscule> …`, sans point final, en moins de 72 caractères environ (`fix: corrige …`, `data: ajoute …`, `feat: intègre …`)
   - corps (optionnel, coupé à 72) : le _pourquoi_, et le SHA du commit corrigé le cas échéant
   - terminer par le trailer d'attribution demandé par la session

   Passer le message avec un heredoc (`git commit -F - <<'EOF'`).

6. **Montrer le résultat** avec `git log --oneline main..HEAD`. **Ne pas pousser** : c'est l'utilisateur qui pousse.

Les hooks de `.claude/settings.json` bloquent les commits sur main et vérifient chaque message avec commitlint. Si commitlint signale une erreur, corriger avec `git commit --amend`.
