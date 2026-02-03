# Honeycomb Curtain Card

A Lovelace custom card to control a two-motor honeycomb curtain (top and bottom rails) in Home Assistant.

## Features
- Displays a stylized honeycomb curtain in hazel taupe with black top box and black bottom rail.
- Shows current position of both motors and a visual status of the curtain.
- Tap the image to move the nearest rail.
- Buttons to fully open, stop, or fully close the curtain.

## Installation (HACS)
1. Add this repository to HACS as a **Custom Repository** (type: **Dashboard**).
2. Install **Honeycomb Curtain Card**.
3. In moderne Home Assistant versies voegt HACS de resource automatisch toe.

## Usage
```yaml
type: custom:honeycomb-curtain-card
name: Honeycomb Gordijn
cover_top: cover.bovenste_motor
cover_bottom: cover.onderste_motor
```

## Options
- `name` (optional): Title shown above the card.
- `cover_top` (required): Entity id of the top motor cover.
- `cover_bottom` (required): Entity id of the bottom motor cover.
- `open_top` / `open_bottom` (optional): Positions for the **Openen** button.
- `close_top` / `close_bottom` (optional): Positions for the **Sluiten** button.
- `presets` (optional): Extra standen met `name`, `top`, `bottom`, `enabled`.
- `tap_action` (optional): Which rail to move when tapping the image.
  - `nearest` (default): Move the closest rail to the tap position.
  - `top`: Always move the top rail.
  - `bottom`: Always move the bottom rail.

## Behavior
- **Openen** button uses `open_top`/`open_bottom`.
- **Stop** button sends `stop_cover` to both motors.
- **Sluiten** button uses `close_top`/`close_bottom`.
- Extra standen gebruiken de `presets` waardes en kunnen via de GUI toegevoegd/verwijderd worden.

## Notes
- Home Assistant uses positions from `0` to `100`. This card assumes:
  - Top motor: `0 = fully up`, `100 = fully down`.
  - Bottom motor: `0 = fully down`, `100 = fully up`.

Default extra standen:
- `Midden`: top `46`, bottom `15`
- `Onderkant gesloten`: top `46`, bottom `0`

If your device reports differently, please let me know and I can add an inversion option.
