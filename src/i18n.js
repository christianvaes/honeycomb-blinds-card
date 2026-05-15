// Translations for both the card runtime and the editor.
// Adding a language: define a new dict and add it to LANGUAGES.

const en = {
  // card
  open: "Open",
  close: "Close",
  stop: "Stop",
  topmotor: "Top motor",
  bottommotor: "Bottom motor",
  status: "Status",
  preset: "Preset",
  opening: "Opening",
  closing: "Closing",
  open_state: "Open",
  closed_state: "Closed",
  partial: "Partially open",
  // editor
  name: "Name",
  top_motor: "Top motor",
  bottom_motor: "Bottom motor",
  shade_color: "Shade color",
  open_position: "Open position",
  close_position: "Close position",
  presets: "Extra presets",
  positions: "Positions",
  add_preset: "Add preset",
  new_preset: "New preset",
  top: "Top",
  bottom: "Bottom",
  remove: "Remove",
};

const nl = {
  // card
  open: "Openen",
  close: "Sluiten",
  stop: "Stop",
  topmotor: "Topmotor",
  bottommotor: "Ondermotor",
  status: "Status",
  preset: "Stand",
  opening: "Bezig met openen",
  closing: "Bezig met sluiten",
  open_state: "Open",
  closed_state: "Gesloten",
  partial: "Gedeeltelijk",
  // editor
  name: "Naam",
  top_motor: "Bovenste motor",
  bottom_motor: "Onderste motor",
  shade_color: "Kleur gordijn",
  open_position: "Openen positie",
  close_position: "Sluiten positie",
  presets: "Extra standen",
  positions: "Posities",
  add_preset: "Stand toevoegen",
  new_preset: "Nieuwe stand",
  top: "Boven",
  bottom: "Onder",
  remove: "Verwijder",
};

const LANGUAGES = { en, nl };

/**
 * Look up a translated string for the active HA language.
 * Falls back to English, then to the key itself if no match.
 *
 * @param {string} key Translation key.
 * @param {object} [hass] HA hass object (for hass.locale.language).
 * @returns {string}
 */
export function t(key, hass) {
  const lang = hass?.locale?.language || hass?.language || "en";
  return LANGUAGES[lang]?.[key] || LANGUAGES.en[key] || key;
}
