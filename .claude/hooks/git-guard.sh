#!/usr/bin/env bash
# Hook PreToolUse (Bash) : fait respecter le workflow git du dépôt.
# - pas de `git push`
# - pas de commit sur `main` ni sur une branche d'archive `devfest-dijon-*`
# - merges et pulls en fast-forward uniquement (pas de commit de merge)
#
# Code de sortie 2 = commande bloquée, le message sur stderr est renvoyé à Claude.

cmd=$(jq -r '.tool_input.command // empty')
[ -z "$cmd" ] && exit 0

# Début de (sous-)commande : début de ligne ou après ; & | ( ou un retour ligne
start='(^|[;&|(]|\n)[[:space:]]*'
git_cmd="${start}git([[:space:]]+-C[[:space:]]+[^[:space:]]+)?[[:space:]]+"

block() {
  echo "Bloqué par .claude/hooks/git-guard.sh : $1" >&2
  exit 2
}

if grep -Pzq "${git_cmd}push\b" <<<"$cmd"; then
  block "Claude ne fait jamais de git push. C'est l'utilisateur qui pousse."
fi

if grep -Pzq "${git_cmd}commit\b" <<<"$cmd"; then
  # On tolère la création de branche dans la même commande (`git switch -c x && git commit …`)
  if ! grep -Pzq "${git_cmd}(switch[[:space:]]+-c|checkout[[:space:]]+-b)\b" <<<"$cmd"; then
    branch=$(git -C "${CLAUDE_PROJECT_DIR:-.}" rev-parse --abbrev-ref HEAD 2>/dev/null)
    if [[ "$branch" == "main" || "$branch" == devfest-dijon-* ]]; then
      block "pas de commit sur '$branch'. Créer d'abord une branche de travail (git switch -c <type>/<sujet>)."
    fi
  fi
fi

if grep -Pzq "${git_cmd}merge\b" <<<"$cmd"; then
  if ! grep -Pzq -- "--ff-only\b" <<<"$cmd" || grep -Pzq -- "--no-ff\b" <<<"$cmd"; then
    # `git merge --abort` / `--continue` ne créent pas de commit de merge
    if ! grep -Pzq -- "merge[[:space:]]+--(abort|quit)\b" <<<"$cmd"; then
      block "les merges se font uniquement en fast-forward : git merge --ff-only <branche>. Si ça échoue, rebaser la branche d'abord."
    fi
  fi
fi

if grep -Pzq "${git_cmd}pull\b" <<<"$cmd"; then
  if ! grep -Pzq -- "--(ff-only|rebase)\b" <<<"$cmd"; then
    block "git pull doit être fait en --ff-only (ou --rebase) pour éviter un commit de merge."
  fi
fi

exit 0
