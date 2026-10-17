---
name: resume-branch
description: Se place sur une branche existante (ou reprend le travail sur la branche courante) et propose de la rebaser sur main si elle a pris du retard. À utiliser quand l'utilisateur demande de changer de branche, de reprendre une branche ou de s'y remettre.
argument-hint: "[branche]"
---

# Reprendre le travail sur une branche

Branche cible : `$ARGUMENTS` (si vide, utiliser la branche courante).

1. **S'assurer que l'arbre de travail est propre.** Lancer `git status --short`. S'il y a des changements non committés, demander à l'utilisateur s'il faut les committer (skill `/commit`), les mettre de côté avec un stash, ou annuler. Ne jamais les supprimer.

2. **Mettre à jour les références.** Lancer `git fetch --prune origin`. Uniquement un fetch, jamais de push.

3. **Se placer sur la branche** avec `git switch <branche>`. Si elle n'existe que sur le dépôt distant, `git switch` crée la branche de suivi.
   - Si la branche locale est en retard sur `origin/<branche>`, l'avancer en fast-forward : `git merge --ff-only origin/<branche>`.

4. **Mesurer l'écart avec main**, en comparant avec `main` et avec `origin/main` :
   - `git log --oneline HEAD..origin/main` : les commits qui manquent à la branche
   - `git log --oneline origin/main..HEAD` : les commits propres à la branche
   - Si le `main` local est en retard sur `origin/main`, le signaler et proposer `git switch main && git merge --ff-only origin/main`.

5. **Proposer le rebase** s'il manque des commits de main à la branche. Résumer les deux listes, puis **demander** avant de lancer `git rebase origin/main`.
   - En cas de conflits, les résoudre fichier par fichier en expliquant chaque résolution. Continuer avec `git rebase --continue`. Abandonner (`git rebase --abort`) si l'utilisateur le demande.
   - Après le rebase, lancer `npm run check`.
   - Si la branche avait déjà été poussée, prévenir l'utilisateur qu'il devra faire un `git push --force-with-lease`. Claude ne le lance jamais.

6. **Résumer** : quelle branche, combien de commits d'avance ou de retard, et si `check` passe.
