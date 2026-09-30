---
name: resume-branch
description: Check out an existing branch (or pick up work on the current one) and offer to rebase it onto main if it has fallen behind. Use when the user asks to switch to, resume, pick up or "reprendre" a branch.
argument-hint: "[branch]"
---

# Resume work on a branch

Target branch: `$ARGUMENTS` (if empty, use the current branch).

1. **Make sure the working tree is clean.** Run `git status --short`. If there are uncommitted changes, ask the user whether to commit them (skill `/commit`), stash them, or cancel. Never discard them.

2. **Update refs.** Run `git fetch --prune origin`. Only fetch, never push.

3. **Check out the branch** with `git switch <branch>`. If it only exists on the remote, `git switch` creates the tracking branch.
   - If the local branch is behind its `origin/<branch>` counterpart, fast-forward it: `git merge --ff-only origin/<branch>`.

4. **Measure the gap with main**, comparing against both `main` and `origin/main`:
   - `git log --oneline HEAD..origin/main`: commits the branch is missing
   - `git log --oneline origin/main..HEAD`: the branch's own commits
   - If local `main` is behind `origin/main`, say so and offer `git switch main && git merge --ff-only origin/main`.

5. **Offer the rebase** if the branch is missing commits from main. Summarize both lists, then **ask** before running `git rebase origin/main`.
   - On conflicts, resolve them file by file and explain each resolution. Continue with `git rebase --continue`. Abort (`git rebase --abort`) if the user asks.
   - After the rebase, run `npm run check`.
   - If the branch had already been pushed, tell the user they will need `git push --force-with-lease`. You never run it.

6. **Summarize**: which branch, how far ahead or behind, and whether `check` passes.
