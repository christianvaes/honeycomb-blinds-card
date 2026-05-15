# AGENTS.md

## Repository
- Main branch: `main`
- Remote: `https://github.com/christianvaes/honeycomb-blinds-card.git`

## Project Type
- Home Assistant custom Lovelace card for HACS (Dashboard type).
- Card name: `Honeycomb Blinds Card`.
- Card type id: `custom:honeycomb-blinds-card`.

## Key Files

## HACS Rules
- Keep `hacs.json` valid JSON at all times (no trailing commas).
- Current `hacs.json` intentionally has no `icon` field.
- `filename` in `hacs.json` must remain `honeycomb-blinds-card.js` unless the card file is renamed.

## Functional Rules
- Do not change card type id unless explicitly requested.
- Preserve top/bottom motor behavior and mapping as implemented in current card logic.
- Preserve configurable presets and user-defined preset names (do not auto-translate configured names).
- Preserve editor support in Home Assistant UI.

## Delivery Workflow
- After edits: summarize changed files and why.
- Commit and release only when explicitly requested.
- Release tagging convention currently used: `vX.Y.Z`.

## Session Hygiene
- If a session starts with wrong cwd, switch commands explicitly to this path.
