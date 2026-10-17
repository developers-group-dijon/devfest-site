#!/usr/bin/env bash
# Hook PostToolUse (Edit|Write) : formate le fichier modifié par Claude
# avec les outils du projet (prettier, puis eslint --fix pour le JS et
# stylelint --fix pour le CSS). Les erreurs restantes non corrigeables
# sont renvoyées à Claude pour qu'il les traite.

file=$(jq -r '.tool_response.filePath // .tool_input.file_path // empty')
[ -z "$file" ] || [ ! -f "$file" ] && exit 0

root="${CLAUDE_PROJECT_DIR:-.}"
case "$file" in
  "$root"/node_modules/* | "$root"/_site/*) exit 0 ;;
  "$root"/*) ;;
  *) exit 0 ;;
esac
cd "$root" || exit 0
bin=node_modules/.bin

"$bin"/prettier --write --ignore-unknown --log-level=warn "$file" >/dev/null 2>&1

errors=""
case "$file" in
  "$root"/_assets/*.js)
    errors=$(BROWSERSLIST_ENV=run "$bin"/eslint --fix "$file" 2>&1) ;;
  *.js)
    errors=$(BROWSERSLIST_ENV=build "$bin"/eslint --fix "$file" 2>&1) ;;
  "$root"/_assets/*.css)
    errors=$(BROWSERSLIST_ENV=run "$bin"/stylelint --fix "$file" 2>&1) ;;
esac

if [ -n "$errors" ]; then
  jq -n --arg e "$errors" '{
    hookSpecificOutput: {
      hookEventName: "PostToolUse",
      additionalContext: ("Erreurs de lint restantes après --fix :\n" + $e)
    }
  }'
fi
exit 0
