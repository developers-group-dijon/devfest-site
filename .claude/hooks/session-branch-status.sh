#!/usr/bin/env bash
# Hook SessionStart : donne à Claude l'état de la branche courante par
# rapport à `main`, pour qu'il propose un rebase quand on reprend une
# branche en retard (cf. CLAUDE.md). Pas de `git fetch` ici : le hook doit
# rester rapide et ne pas dépendre du réseau.

cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null) || exit 0

if [[ "$branch" == "main" || "$branch" == devfest-dijon-* ]]; then
  msg="Branche courante : $branch. Aucun commit n'est autorisé ici : créer une branche de travail avant de committer."
else
  behind=$(git rev-list --count "HEAD..main" 2>/dev/null || echo "?")
  ahead=$(git rev-list --count "main..HEAD" 2>/dev/null || echo "?")
  msg="Branche courante : $branch ($ahead commit(s) en avance, $behind en retard sur main local)."
  if [ "$behind" != "0" ]; then
    msg="$msg La branche est en retard : proposer à l'utilisateur un git fetch puis un rebase sur main avant de continuer."
  fi
fi

jq -n --arg m "$msg" '{
  hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: $m }
}'
