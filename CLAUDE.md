# CLAUDE.md

Static site generator for the DevFest Dijon conference, built with Eleventy 3 + Nunjucks and deployed to Firebase Hosting. The code, comments, tests, commit messages and UI are all in **French**. Keep writing in French.

## Git workflow (mandatory)

- **Never run `git push`**, in any form. The user pushes.
- **Never commit on `main`** (or on an archive branch `devfest-dijon-<year>`). Before the first commit, create a work branch (`git switch -c <type>/<short-topic>`, e.g. `feat/billetterie-embed`).
- **Split commits into logical units.** Each commit does one thing and passes `npm run check` on its own. Don't mix data changes (`data:`), styling (`style:`) and behaviour (`feat:`/`fix:`) in one commit. Stage files by path. `git add -p` is interactive and unavailable to Claude; the `/commit` skill describes the alternative.
- **Checking out an existing branch, or picking up work on an old one:** first run `git fetch` and compare with `main` (`git log --oneline main..HEAD`, `git log --oneline HEAD..main`). If `main` has moved ahead, **offer to rebase** onto `main` before doing anything else. Don't rebase without the user's agreement.
- **Merges are fast-forward only:** `git merge --ff-only <branch>`. There must be no merge commits in history. If the fast-forward fails, rebase the branch onto the target, then retry. Never use `--no-ff` and never fall back to a real merge.
- Don't touch changes you didn't make (for example, a `package-lock.json` that was already modified). Leave them out of your commits.

### Commit messages

Commitlint enforces the format (`commitlint.config.js`, based on config-conventional). `npm run check` runs it on the whole history.

- Allowed types: `build chore ci docs feat fix perf refactor revert style test` **+ `data`** (content changes to `_data/` or `_assets/` images: program, sponsors, schedule).
- Subject in French, lowercase, verb in the 3rd-person present, no trailing period: `fix: corrige frame-src de la CSP`, `data: ajoute APRR en sponsor bronze`.
- Optional body in French, wrapped at about 72 columns, explaining the _why_ (and citing the SHA of the commit being fixed when relevant).
- `style:` is used for **visual/CSS** changes to the site, not only formatting.

### Claude tooling (`.claude/`)

Hooks (`.claude/settings.json` → `.claude/hooks/*.sh`) enforce the rules above:

- `git-guard.sh` (PreToolUse Bash): blocks `git push`, commits on `main`/`devfest-dijon-*`, merges that aren't `--ff-only`, and `git pull` without `--ff-only`/`--rebase`.
- `commitlint-check.sh` (PostToolUse Bash): after a `git commit`, validates the message. If it fails, fix it with `git commit --amend`.
- `format.sh` (PostToolUse Edit|Write): prettier + `eslint --fix` / `stylelint --fix` on the modified file, and reports errors that can't be fixed automatically.
- `session-branch-status.sh` (SessionStart): current branch and how far it is ahead of or behind `main`.

Skills: `/commit` (atomic commits following the conventions) and `/resume-branch [branch]` (fetch + checkout + offer to rebase).

## Commands

| Command                                             | Purpose                                                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `npm run serve`                                     | Local dev server with watch (port 8080, incremental)                                                         |
| `npm run build`                                     | Eleventy build (`ELEVENTY_PRODUCTION=true`) + OG image generation (`_scripts/generate-og.js`) into `_site/`  |
| `npm run clean-build`                               | `rm -rf _site` then build (what CI runs)                                                                     |
| `npm run check`                                     | Everything CI checks, in parallel: prettier, eslint (run + build), stylelint, tsc (JSDoc), commitlint, tests |
| `npm run fix`                                       | prettier + eslint + stylelint in `--fix` mode                                                                |
| `npm run check:test`                                | Tests (`node --test`, `TZ=Europe/Paris`)                                                                     |
| `TZ=Europe/Paris node --test _test/filters.test.js` | Run a single test file                                                                                       |
| `npm run audit`                                     | Build + Lighthouse (perf) + pa11y (a11y). Runs in CI on PRs                                                  |
| `npm run new-edition <year>`                        | Archive the current edition and prepare the next one (see README)                                            |
| `node _data_gen/generate-from-openplanner.js <url>` | Regenerate data from the OpenPlanner JSON export                                                             |

Always run `npm run check` before proposing a commit. The README mentions `lint`/`format` scripts and `.eslintrc.js`-style config files: they are out of date. Use the scripts and config files listed here.

## Architecture

```
.eleventy.js      Eleventy config: passthrough _assets → /assets, fonts (Noto Sans subset,
                  Bitcount Grid Single), registers the filters and shortcodes
_data/            Eleventy data, written in **JS** (not JSON) so JSDoc can type-check it
  types.js        JSDoc typedefs (Raw*, Session, Speaker, Event…). The source of truth for types
  raw*.js, speakers.js, formats.js, categories.js, tracks.js
                  Generated from OpenPlanner (_data_gen). Edit by hand only for fine adjustments
  rawEvent.js, sponsors.js, team.js, ticketing.js, site.json
                  Editorial data, maintained by hand
  eleventyComputed.js
                  Builds derived data (sessions, event, schedule maps…) from the raw data
_data_gen/        OpenPlanner → _data/*.js generators (plus avatar downloads)
_eleventy/        Nunjucks filters (filters.js), shortcodes (shortcodes.js), utils
_layouts/         base.njk (HTML skeleton, header, CSS/JS), page.njk (header image + content)
_includes/        Partials: og-tags.njk, ticketing-trigger.njk
pages/            Page templates (index, schedule, session/speaker paginated, favoris, team…)
_assets/          Static files, copied unchanged to /assets
  css/            style.css (theme custom properties), layout.css, one CSS file per page
  js/             Vanilla browser JS as ES modules, no libraries
_scripts/         OG image generation (sharp), new-edition.js
_test/            node:test tests + jsdom (_helpers/dom.js, timers.js)
_audit/           Lighthouse/pa11y scripts
```

### Key conventions

- **No runtime dependencies**: the generated site is HTML + CSS + a little vanilla JS. Don't add front-end libraries.
- **Pages** declare their resources in front matter: `css: "/css/<page>.css"`, `js: "/js/<module>.js"`, `image: "/background/…"`. Asset URLs are relative to `_assets/` (for example `/avatars/foo.webp`).
- **Pagination**: computed data (`eleventyComputed`) is **not** available inside `pagination`. The templates paginate over `rawSessions` and then resolve the matching `session` in `eleventyComputed` (see `pages/session.njk`). `hideTrackTitle: true` (breaks, keynotes) means no detail page and not counted.
- **Browser JS**: split _pure logic_ (`*-utils.js`, testable without DOM or storage) from the _DOM/storage orchestration_ module. For example, `favorites-utils.js` is pure while `favorites.js` owns localStorage, the hash and the `favorites:change` event. New modules follow the same pattern, with tests for the utils module and jsdom integration tests for the other one.
  - `favorites*` = core favorites module; `favoris*` = the "Mon planning" page (`/favoris`). The two names coexist on purpose.
  - The favorites localStorage key is scoped by edition (`body[data-edition]`).
- **JSDoc everywhere** (typechecked by `tsc --checkJs`, required by eslint-plugin-jsdoc outside `_test/`). Descriptions of `@param`/`@returns`/`@property` are optional. Import types via `import('./types.js').X`.
- **Comments in French**, explaining the _why_: browser constraints, a non-obvious choice, a known limitation. Every JS file starts with a comment block describing its role.
- **Browser compatibility**: `.browserslistrc` has two environments. `run` is for `_assets/**` (JS + CSS, checked by `stylelint-no-unsupported-browser-features`) and `build` is for Node. Media queries use `min-width`/`max-width` prefix notation, not range syntax (enforced by stylelint).
- **Prettier** with default settings (2 spaces, double quotes, trailing commas). Don't reformat by hand; run `npm run fix:prettier`.
- **Tests**: `node:test` + `node:assert/strict`, test names in French (`test("renvoie … quand …")`). Browser modules are loaded after `setupDOM()` with an import cache-bust to re-run the module's load-time side effects.

### Security / hosting

- HTTP headers (CSP, Permissions-Policy…) live in `firebase.json`, under the `main` target. Any new iframe or external origin (such as a ticketing provider) must be added to `frame-src`, and for payment also to `payment=(…)`. See the "Billetterie embarquée" section of the README.
- `default-src 'self'`: no external scripts, fonts or images. Fonts are served from `node_modules` via passthrough.

## Branches and deployment

- `main` = current edition, deployed to the `devfest-dijon` site (Firebase target `main`).
- `devfest-dijon-<year>` = archives of previous editions, each deployed to its own site. Don't change them unless explicitly asked.
- Any other branch or PR gets a temporary Firebase preview channel (7 days) after `check` + `clean-build` + `audit`.
- Renovate updates dependencies monthly (`chore(deps): …` commits).
