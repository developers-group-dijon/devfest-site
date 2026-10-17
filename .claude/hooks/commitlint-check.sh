#!/usr/bin/env bash
# Hook PostToolUse (Bash) : après un `git commit`, valide le message du
# commit créé avec commitlint. On vérifie après coup plutôt que d'analyser
# le `-m` (heredoc, `-F`, etc.) : en cas d'échec, Claude doit faire un
# `git commit --amend`.

cmd=$(jq -r '.tool_input.command // empty')
grep -Pzq '(^|[;&|(]|\n)[[:space:]]*git([[:space:]]+-C[[:space:]]+[^[:space:]]+)?[[:space:]]+commit\b' <<<"$cmd" || exit 0

cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
if ! out=$(git log -1 --format=%B | node_modules/.bin/commitlint 2>&1); then
  jq -n --arg out "$out" '{
    decision: "block",
    reason: ("Le message du dernier commit ne respecte pas commitlint.config.js. Corriger avec git commit --amend.\n" + $out)
  }'
fi
exit 0
