// HoneycombBlindsCard — the runtime card that users see on their dashboard.
// Renders a stylised window with two rails (top/bottom motor) and an action
// row (open/stop/close + presets). Click-to-position on the scene.

import cardCss from "./card.css";
import { t } from "./i18n.js";
import {
  normalizeConfig,
  validateCardConfig,
  sanitizePosition,
  parseShadeColor,
  MAX_DROP,
  OPEN_THRESHOLD,
  CLOSED_THRESHOLD,
} from "./config.js";

const CARD_TEMPLATE = `
  <style>${cardCss}</style>
  <ha-card>
    <div class="card">
      <div class="title" id="title"></div>
      <div class="scene" id="scene">
        <div class="window"></div>
        <div class="top-box"></div>
        <div class="top-rail"></div>
        <div class="shade"></div>
        <div class="bottom-rail"></div>
      </div>
      <div class="status">
        <div><span id="label-top">Topmotor</span>: <strong id="top-pos">-</strong></div>
        <div><span id="label-bottom">Ondermotor</span>: <strong id="bottom-pos">-</strong></div>
        <div><span id="label-status">Status</span>: <strong id="status-text">-</strong></div>
      </div>
      <div class="actions" id="actions"></div>
    </div>
  </ha-card>
`;

function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function readCoverPosition(entity, fallback) {
  if (!entity) return fallback;
  const pos = entity.attributes && typeof entity.attributes.current_position === "number"
    ? entity.attributes.current_position
    : null;
  if (typeof pos === "number") return Math.max(0, Math.min(pos, 100));
  if (entity.state === "open") return 100;
  if (entity.state === "closed") return 0;
  return fallback;
}

export class HoneycombBlindsCard extends HTMLElement {
  setConfig(config) {
    validateCardConfig(config);
    this._config = normalizeConfig(config, this._hass);
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    this._render();
  }

  getCardSize() {
    return 3;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 12, rows: 11, min_rows: 11 };
  }

  static getConfigElement() {
    return document.createElement("honeycomb-blinds-card-editor");
  }

  static getStubConfig(hass) {
    const covers = Object.keys(hass.states).filter((id) => id.startsWith("cover."));
    return {
      type: "custom:honeycomb-blinds-card",
      name: "Honeycomb Blinds",
      cover_top: covers[0] || "",
      cover_bottom: covers[1] || "",
    };
  }

  _render() {
    if (!this._hass || !this._config) return;
    if (!this.shadowRoot) {
      this._setupDom();
      this._bindEvents();
    }
    this._updateView();
  }

  _setupDom() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = CARD_TEMPLATE;
    this._actionsEl = this.shadowRoot.getElementById("actions");
  }

  _bindEvents() {
    this._actionsEl.addEventListener("click", (ev) => {
      const btn = ev.target.closest("button");
      if (!btn) return;
      const action = btn.dataset.action;
      if (action === "open") {
        this._setBoth(this._config.open_top, this._config.open_bottom);
      } else if (action === "close") {
        this._setBoth(this._config.close_top, this._config.close_bottom);
      } else if (action === "stop") {
        this._stopBoth();
      } else if (action === "preset") {
        const idx = Number(btn.dataset.index || -1);
        const preset = this._visiblePresets && this._visiblePresets[idx];
        if (preset) this._setBoth(preset.top, preset.bottom);
      }
    });

    this.shadowRoot.getElementById("scene").addEventListener("click", (ev) => {
      this._onSceneClick(ev);
    });
  }

  _updateView() {
    const titleEl = this.shadowRoot.getElementById("title");
    if (this._config.name) {
      titleEl.textContent = this._config.name;
      titleEl.style.display = "block";
    } else {
      titleEl.style.display = "none";
    }

    const topEntity = this._hass.states[this._config.cover_top];
    const bottomEntity = this._hass.states[this._config.cover_bottom];
    const topPos = readCoverPosition(topEntity, 0);
    const bottomPos = readCoverPosition(bottomEntity, 0);

    let topY = (topPos / 100) * MAX_DROP;
    let bottomY = (1 - bottomPos / 100) * MAX_DROP;
    topY = Math.max(0, Math.min(topY, MAX_DROP));
    bottomY = Math.max(0, Math.min(bottomY, MAX_DROP));
    if (bottomY < topY) bottomY = topY;

    const scene = this.shadowRoot.getElementById("scene");
    const shades = parseShadeColor(this._config.shade_color);
    scene.style.setProperty("--top-y", `${topY}px`);
    scene.style.setProperty("--bottom-y", `${bottomY}px`);
    scene.style.setProperty("--hc-taupe", shades.base);
    scene.style.setProperty("--hc-taupe-dark", shades.dark);

    this.shadowRoot.getElementById("top-pos").textContent = `${Math.round(topPos)}%`;
    this.shadowRoot.getElementById("bottom-pos").textContent = `${Math.round(bottomPos)}%`;
    this.shadowRoot.getElementById("status-text").textContent = this._statusText(topEntity, bottomEntity, topPos, bottomPos);

    this._renderActions(topPos, bottomPos);

    this.shadowRoot.getElementById("label-top").textContent = t("topmotor", this._hass);
    this.shadowRoot.getElementById("label-bottom").textContent = t("bottommotor", this._hass);
    this.shadowRoot.getElementById("label-status").textContent = t("status", this._hass);
  }

  _renderActions(currentTop, currentBottom) {
    if (!this._actionsEl) return;
    const presets = Array.isArray(this._config.presets)
      ? this._config.presets.filter((p) => p && p.enabled !== false)
      : [];
    this._visiblePresets = presets;

    const buttons = [
      { key: "open",  action: "open",  label: t("open", this._hass),  top: this._config.open_top,  bottom: this._config.open_bottom },
      { key: "stop",  action: "stop",  label: t("stop", this._hass) },
      { key: "close", action: "close", label: t("close", this._hass), top: this._config.close_top, bottom: this._config.close_bottom },
      ...presets.map((preset, index) => ({
        key: `preset-${index}`,
        action: "preset",
        label: preset.name || `${t("preset", this._hass)} ${index + 1}`,
        index,
        top: preset.top,
        bottom: preset.bottom,
      })),
    ];

    const activeKey = buttons.find((btn) => positionsMatch(currentTop, currentBottom, btn.top, btn.bottom))?.key ?? null;

    this._actionsEl.innerHTML = buttons.map((btn) => {
      const selected = btn.key === activeKey;
      const indexAttr = typeof btn.index === "number" ? ` data-index="${btn.index}"` : "";
      const selectedClass = selected ? " selected" : "";
      const ariaPressed = selected ? "true" : "false";
      const disabledAttr = selected ? " disabled aria-disabled=\"true\"" : "";
      const safeLabel = escapeHtml(btn.label);
      return `<button type="button" class="button${selectedClass}" data-action="${btn.action}" aria-pressed="${ariaPressed}"${disabledAttr}${indexAttr}>${safeLabel}<ha-ripple aria-hidden="true"></ha-ripple></button>`;
    }).join("");
  }

  _statusText(topEntity, bottomEntity, topPos, bottomPos) {
    if (!topEntity || !bottomEntity) return "-";
    if (topEntity.state === "opening" || bottomEntity.state === "opening") return t("opening", this._hass);
    if (topEntity.state === "closing" || bottomEntity.state === "closing") return t("closing", this._hass);

    const top = typeof topPos === "number" ? topPos : 0;
    const bottom = typeof bottomPos === "number" ? bottomPos : 0;
    const isOpen = top <= CLOSED_THRESHOLD && bottom >= OPEN_THRESHOLD;
    const isClosed = top <= CLOSED_THRESHOLD && bottom <= CLOSED_THRESHOLD;

    if (isOpen) return t("open_state", this._hass);
    if (isClosed) return t("closed_state", this._hass);
    return t("partial", this._hass);
  }

  _onSceneClick(ev) {
    const rect = ev.currentTarget.getBoundingClientRect();
    const y = Math.max(0, Math.min(ev.clientY - rect.top, rect.height));
    const tapAction = this._config.tap_action || "nearest";

    if (tapAction === "top") {
      this._setTop((y / MAX_DROP) * 100);
      return;
    }
    if (tapAction === "bottom") {
      this._setBottom((1 - y / MAX_DROP) * 100);
      return;
    }

    const topEntity = this._hass.states[this._config.cover_top];
    const bottomEntity = this._hass.states[this._config.cover_bottom];
    const currentTop = readCoverPosition(topEntity, 0);
    const currentBottom = readCoverPosition(bottomEntity, 0);

    const topY = (currentTop / 100) * MAX_DROP;
    const bottomY = (1 - currentBottom / 100) * MAX_DROP;
    const distTop = Math.abs(y - topY);
    const distBottom = Math.abs(y - bottomY);

    if (distTop <= distBottom) {
      this._setTop((y / MAX_DROP) * 100);
    } else {
      this._setBottom((1 - y / MAX_DROP) * 100);
    }
  }

  _setTop(position) {
    this._hass.callService("cover", "set_cover_position", {
      entity_id: this._config.cover_top,
      position: sanitizePosition(position, 0),
    });
  }

  _setBottom(position) {
    this._hass.callService("cover", "set_cover_position", {
      entity_id: this._config.cover_bottom,
      position: sanitizePosition(position, 0),
    });
  }

  _setBoth(topPos, bottomPos) {
    this._setTop(topPos);
    this._setBottom(bottomPos);
  }

  _stopBoth() {
    this._hass.callService("cover", "stop_cover", { entity_id: this._config.cover_top });
    this._hass.callService("cover", "stop_cover", { entity_id: this._config.cover_bottom });
  }
}

function positionsMatch(currentTop, currentBottom, targetTop, targetBottom) {
  if (typeof targetTop !== "number" || typeof targetBottom !== "number") return false;
  return sanitizePosition(currentTop, 0) === sanitizePosition(targetTop, 0) &&
    sanitizePosition(currentBottom, 0) === sanitizePosition(targetBottom, 0);
}
