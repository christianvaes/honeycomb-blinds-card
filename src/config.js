// Single source of truth for constants, defaults, and config-related logic.
// All exports are pure functions or constants — no class state.

import { t } from "./i18n.js";

// --- Scene geometry ---
export const SCENE_HEIGHT = 240;
export const RAIL_HEIGHT = 16;
export const MAX_DROP = SCENE_HEIGHT - RAIL_HEIGHT;

// --- State thresholds ---
export const OPEN_THRESHOLD = 99;   // bottom >= this → considered open
export const CLOSED_THRESHOLD = 1;  // both <= this → considered closed

// --- Safety limits ---
export const MAX_PRESETS = 50;
export const MAX_NAME_LENGTH = 64;

// --- Defaults ---
export const DEFAULT_SHADE_COLOR = "#b9a38b";
export const DEFAULT_SHADE_RGB = [185, 163, 139];

export const DEFAULT_PRESETS = [
  { name: "Midden", top: 46, bottom: 15, enabled: true },
  { name: "Onderkant gesloten", top: 46, bottom: 0, enabled: true },
];

export const DEFAULT_CONFIG = {
  name: "",
  tap_action: "nearest",
  open_top: 0,
  open_bottom: 100,
  close_top: 0,
  close_bottom: 0,
  presets: DEFAULT_PRESETS,
  shade_color: DEFAULT_SHADE_COLOR,
};

// --- Validation ---
const COVER_ENTITY_RE = /^cover\.[a-z0-9_]+$/;

/**
 * Throws with a clear message if the card config is missing or invalid
 * pieces that the runtime relies on.
 *
 * @param {object} config Raw user config.
 */
export function validateCardConfig(config) {
  if (!config || !config.cover_top || !config.cover_bottom) {
    throw new Error("You must define 'cover_top' and 'cover_bottom'.");
  }
  if (!COVER_ENTITY_RE.test(String(config.cover_top))) {
    throw new Error(`'cover_top' must be a cover entity (got '${config.cover_top}').`);
  }
  if (!COVER_ENTITY_RE.test(String(config.cover_bottom))) {
    throw new Error(`'cover_bottom' must be a cover entity (got '${config.cover_bottom}').`);
  }
}

// --- Sanitization helpers ---

/**
 * Coerce to a number in [0, 100], rounded. Returns fallback if not finite.
 */
export function sanitizePosition(value, fallback = 0) {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.max(0, Math.min(Math.round(num), 100));
}

function normalizePreset(preset, fallbackPreset, hass) {
  const fb = fallbackPreset || {};
  const base = {
    name: typeof fb.name === "string" ? fb.name : t("preset", hass),
    top: sanitizePosition(fb.top, 0),
    bottom: sanitizePosition(fb.bottom, 0),
    enabled: fb.enabled !== false,
  };

  if (!preset || typeof preset !== "object") return { ...base };
  const rawName = typeof preset.name === "string" ? preset.name : base.name;
  return {
    name: rawName.slice(0, MAX_NAME_LENGTH),
    top: sanitizePosition(preset.top, base.top),
    bottom: sanitizePosition(preset.bottom, base.bottom),
    enabled: preset.enabled !== false,
  };
}

/**
 * Merge user config with defaults and sanitize every field.
 * The result is what the rest of the code should work with.
 *
 * @param {object} config Raw user config.
 * @param {object} [hass] Optional HA hass object for translation fallbacks.
 * @returns {object}
 */
export function normalizeConfig(config, hass) {
  const merged = { ...DEFAULT_CONFIG, ...config };

  merged.open_top = sanitizePosition(merged.open_top, DEFAULT_CONFIG.open_top);
  merged.open_bottom = sanitizePosition(merged.open_bottom, DEFAULT_CONFIG.open_bottom);
  merged.close_top = sanitizePosition(merged.close_top, DEFAULT_CONFIG.close_top);
  merged.close_bottom = sanitizePosition(merged.close_bottom, DEFAULT_CONFIG.close_bottom);

  const rawPresets = Array.isArray(config?.presets) ? config.presets : DEFAULT_PRESETS;
  const limited = rawPresets.slice(0, MAX_PRESETS);
  merged.presets = limited.map((p, i) => normalizePreset(p, DEFAULT_PRESETS[i], hass));

  return merged;
}

// --- Color parsing ---

/**
 * Accepts either a `[r, g, b]` array or a `#RRGGBB` hex string.
 * Returns `{ base, dark }` as CSS `rgb(...)` strings plus the
 * canonical `rgb` array for editor use. Falls back to the default
 * shade when input is missing or invalid.
 *
 * @param {string|number[]|undefined|null} input
 * @returns {{ base: string, dark: string, rgb: number[] }}
 */
export function parseShadeColor(input) {
  const buildResult = (r, g, b) => {
    const clamp = (v) => Math.max(0, Math.min(Math.round(v), 255));
    const cr = clamp(r);
    const cg = clamp(g);
    const cb = clamp(b);
    const dark = [cr, cg, cb].map((v) => Math.max(0, Math.round(v * 0.9)));
    return {
      base: `rgb(${cr}, ${cg}, ${cb})`,
      dark: `rgb(${dark[0]}, ${dark[1]}, ${dark[2]})`,
      rgb: [cr, cg, cb],
    };
  };

  if (!input) {
    const [r, g, b] = DEFAULT_SHADE_RGB;
    return buildResult(r, g, b);
  }

  if (Array.isArray(input) && input.length === 3) {
    const [r, g, b] = input.map((v) => Number(v) || 0);
    return buildResult(r, g, b);
  }

  if (typeof input === "string") {
    const m = /^#?([0-9a-fA-F]{6})$/.exec(input.trim());
    if (m) {
      const v = m[1];
      return buildResult(
        parseInt(v.slice(0, 2), 16),
        parseInt(v.slice(2, 4), 16),
        parseInt(v.slice(4, 6), 16),
      );
    }
  }

  const [r, g, b] = DEFAULT_SHADE_RGB;
  return buildResult(r, g, b);
}
