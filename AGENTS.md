# AGENTS.md

## Repository
- Main branch: `main`
- Remote: `https://github.com/christianvaes/honeycomb-blinds-card.git`

## Project Type
- Home Assistant custom Lovelace card for HACS (Dashboard type).
- Card name: `Honeycomb Blinds Card`.
- Card type id: `custom:honeycomb-blinds-card`.

## Architecture (since v0.6.0)
- Source lives in `src/`, bundled to a single `honeycomb-blinds-card.js` in the repo root by esbuild.
- The bundle is committed to git so HACS users can install it directly without running a build.

## Key Files
- Source modules:
  - `src/index.js` — entry: registers custom elements, console banner
  - `src/card.js` — `HoneycombBlindsCard` class (runtime)
  - `src/card.css` — card runtime styles
  - `src/editor.js` — `HoneycombBlindsCardEditor` class (visual editor)
  - `src/editor.css` — editor styles
  - `src/config.js` — pure functions: constants, `DEFAULT_CONFIG`, `normalizeConfig`, `sanitizePosition`, `parseShadeColor`, `validateCardConfig`
  - `src/i18n.js` — translation dicts (`en`, `nl`) and `t(key, hass)` helper
  - `src/version.js` — **AUTO-GENERATED** from `package.json` by `scripts/sync-version.js`; do not edit by hand
- Build & tooling:
  - `package.json` — defines build/watch/lint scripts and devDeps (esbuild only)
  - `scripts/sync-version.js` — copies version from `package.json` to `src/version.js`
  - `.eslintrc.json` — minimal recommended config (eslint not installed yet; install separately if needed)
- Generated artifact (mee-gecommit):
  - `honeycomb-blinds-card.js` — the esbuild bundle (~29kb)
- Repo metadata:
  - `hacs.json` — HACS install metadata
  - `README.md` — user-facing docs
  - `icon.svg`, `preview.png` — assets

## Build & Development Workflow
- One-time setup: `npm install` (installs esbuild into `node_modules/`).
- Edit source under `src/`. **NEVER edit `honeycomb-blinds-card.js` directly** — it is a generated bundle.
- During development: `npm run watch` (esbuild rebuilds on save, inline sourcemaps).
- Before commit: `npm run build` (clean production bundle, no sourcemaps).
- Always stage both `src/...` and the rebuilt `honeycomb-blinds-card.js` together when committing.
- `node_modules/` is gitignored.

## HACS Rules
- Keep `hacs.json` valid JSON at all times (no trailing commas).
- Current `hacs.json` intentionally has no `icon` field.
- `filename` in `hacs.json` must remain `honeycomb-blinds-card.js` unless the card file is renamed.
- The bundle file in the repo root is what HACS downloads — keep it in sync with `src/` by rebuilding before commit.

## Functional Rules
- Do not change card type id unless explicitly requested.
- Preserve top/bottom motor behavior and mapping as implemented in current card logic.
- Preserve configurable presets and user-defined preset names (do not auto-translate configured names).
- Preserve editor support in Home Assistant UI.
- `DEFAULT_CONFIG` and `DEFAULT_PRESETS` live in `src/config.js` only — single source of truth. Don't duplicate them in `card.js` or `editor.js`.
- All translations live in `src/i18n.js` only — single source of truth.
- Config helpers (`normalizeConfig`, `sanitizePosition`, `parseShadeColor`) are pure functions in `src/config.js` — no class state, no `this`.

## Versioning
- Single source of truth: `package.json` `version` field.
- `src/version.js` is regenerated from it by `scripts/sync-version.js` (runs automatically as `prebuild` hook).
- Release tagging convention: `vX.Y.Z`, must match `package.json`.

## Delivery Workflow
- After edits: summarize changed files and why.
- Commit and release only when explicitly requested.
- For a release:
  1. Bump `version` in `package.json`.
  2. Run `npm run build` (this also re-syncs `src/version.js`).
  3. Commit `src/` + `package.json` + `honeycomb-blinds-card.js` together.
  4. `git push origin main`.
  5. `gh release create vX.Y.Z --target main --title "vX.Y.Z" --notes "..."`.

## Session Hygiene
- If a session starts with wrong cwd, switch commands explicitly to this path.
- `.claude/` is gitignored — it is local agent state, do not commit.
