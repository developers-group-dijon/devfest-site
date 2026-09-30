---
name: commit
description: Commit the current changes as a series of atomic commits that follow the repository conventions (French conventional commits, `data` type, never on main). Use when the user asks to commit, save or "faire les commits".
---

# Commit the current changes

1. **Check the branch.** Run `git rev-parse --abbrev-ref HEAD`. If it is `main` or `devfest-dijon-*`, stop and propose a work branch name (`<type>/<short-topic>`, e.g. `data/programme-2026`). Create it with `git switch -c` only after the user agrees.

2. **Inventory the changes.** Run `git status --short` and `git diff` (plus `git diff --cached`). Leave out any file you did not change in this session and tell the user which ones you skipped (a `package-lock.json` modified by someone else, for example).

3. **Validate.** Run `npm run check`. If it fails, fix the problem or report it. Never commit a red state.

4. **Group into logical commits.** One intent per commit, in the order that keeps each commit green:
   - `data:` content in `_data/` or new images in `_assets/` (program, sponsors, team, ticketing)
   - `style:` visual/CSS changes
   - `feat:` / `fix:` / `perf:` / `refactor:` behaviour in templates, `_eleventy/`, `_assets/js/`
   - `test:` tests, unless they belong with the `feat`/`fix` they cover (preferred)
   - `docs:`, `ci:`, `build:`, `chore:` for the rest

   Stage by path (`git add <files>`). When one file holds two intents, stage a partial blob instead of using the interactive `git add -p`: write the intermediate version, then `git hash-object -w` + `git update-index --cacheinfo`.

5. **Write the message** in French:
   - subject: `<type>: <verbe au présent, 3e personne, minuscule> …`, no trailing period, under about 72 characters (`fix: corrige …`, `data: ajoute …`, `feat: intègre …`)
   - body (optional, wrapped at 72): the _why_, and the SHA of the commit being fixed if relevant
   - end with the attribution trailer required by the session

   Pass the message with a heredoc (`git commit -F - <<'EOF'`).

6. **Show the result** with `git log --oneline main..HEAD`. **Do not push.** The user pushes.

The hooks in `.claude/settings.json` block commits on main and check each message with commitlint. If commitlint complains, fix it with `git commit --amend`.
