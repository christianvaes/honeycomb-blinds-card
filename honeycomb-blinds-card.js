(() => {
  // src/card.css
  var card_default = ':host {\n  --hc-taupe: #b9a38b;\n  --hc-taupe-dark: #a89178;\n  --hc-black: #111111;\n  --hc-rail: 16px;\n  --hc-height: 240px;\n  --hc-width: 100%;\n}\n\nha-card {\n  overflow: hidden;\n}\n\n.card {\n  padding: 16px;\n}\n\n.title {\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin-bottom: 12px;\n}\n\n.scene {\n  position: relative;\n  width: var(--hc-width);\n  height: var(--hc-height);\n  border-radius: 12px;\n  background: #0f0f0f;\n  border: 1px solid rgba(0, 0, 0, 0.4);\n  overflow: hidden;\n  cursor: pointer;\n}\n\n.window {\n  position: absolute;\n  inset: 12px;\n  border-radius: 10px;\n  border: 6px solid var(--hc-black);\n  background:\n    linear-gradient(160deg, rgba(116, 150, 185, 0.75) 0%, rgba(168, 195, 222, 0.55) 40%, rgba(220, 236, 248, 0.85) 100%),\n    linear-gradient(0deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12));\n  box-shadow: inset 0 0 34px rgba(0, 0, 0, 0.28);\n  z-index: 1;\n}\n\n.window::before {\n  content: "";\n  position: absolute;\n  inset: 6% 8% 50% 8%;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0));\n  border-radius: 10px;\n  opacity: 0.7;\n}\n\n.window::after {\n  content: "";\n  position: absolute;\n  inset: 58% 10% 8% 10%;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0));\n  border-radius: 12px;\n  opacity: 0.6;\n}\n\n.top-box {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 18px;\n  background: var(--hc-black);\n  z-index: 4;\n}\n\n.top-rail {\n  position: absolute;\n  left: 8px;\n  right: 8px;\n  height: var(--hc-rail);\n  background: var(--hc-black);\n  border-radius: 8px;\n  z-index: 3;\n  transform: translateY(var(--top-y, 0px));\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);\n}\n\n.bottom-rail {\n  position: absolute;\n  left: 8px;\n  right: 8px;\n  height: calc(var(--hc-rail) + 4px);\n  background: var(--hc-black);\n  border-radius: 10px;\n  z-index: 3;\n  transform: translateY(var(--bottom-y, 200px));\n  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.25);\n}\n\n.shade {\n  position: absolute;\n  left: 10px;\n  right: 10px;\n  top: calc(var(--top-y, 0px) + var(--hc-rail));\n  height: calc(var(--bottom-y, 200px) - var(--top-y, 0px) - var(--hc-rail));\n  background:\n    repeating-linear-gradient(\n      0deg,\n      var(--hc-taupe) 0px,\n      var(--hc-taupe) 8px,\n      var(--hc-taupe-dark) 8px,\n      var(--hc-taupe-dark) 10px\n    );\n  border-radius: 6px;\n  z-index: 2;\n  transition: height 0.2s ease, top 0.2s ease;\n}\n\n.status {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n  margin-top: 12px;\n  font-size: 0.9rem;\n  color: var(--secondary-text-color);\n}\n\n.status strong {\n  color: var(--primary-text-color);\n}\n\n.actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-top: 14px;\n}\n\n.button {\n  position: relative;\n  flex: 1 1 120px;\n  padding: 10px 14px;\n  border-radius: var(--ha-card-border-radius, 12px);\n  border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.2));\n  background: var(--ha-card-background, var(--card-background-color, #fff));\n  color: var(--primary-text-color);\n  font-weight: 600;\n  cursor: pointer;\n  overflow: hidden;\n  transition: transform 0.05s ease, box-shadow 0.2s ease;\n}\n\n.button.selected {\n  border-color: var(--primary-color);\n  box-shadow: inset 0 0 0 1px var(--primary-color);\n  background: var(--ha-card-background, var(--card-background-color, #fff));\n}\n\n.button:disabled {\n  opacity: 0.55;\n  cursor: default;\n  pointer-events: none;\n}\n\n.button.selected:disabled {\n  border-color: var(--primary-color);\n  box-shadow: inset 0 0 0 1px var(--primary-color);\n  opacity: 1;\n}\n\n.button ha-ripple {\n  color: currentColor;\n}\n\n.button:active {\n  transform: translateY(1px);\n}\n';

  // src/i18n.js
  var en = {
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
    remove: "Remove"
  };
  var nl = {
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
    remove: "Verwijder"
  };
  var LANGUAGES = { en, nl };
  function t(key, hass) {
    const lang = hass?.locale?.language || hass?.language || "en";
    return LANGUAGES[lang]?.[key] || LANGUAGES.en[key] || key;
  }

  // src/config.js
  var SCENE_HEIGHT = 240;
  var RAIL_HEIGHT = 16;
  var MAX_DROP = SCENE_HEIGHT - RAIL_HEIGHT;
  var OPEN_THRESHOLD = 99;
  var CLOSED_THRESHOLD = 1;
  var MAX_PRESETS = 50;
  var MAX_NAME_LENGTH = 64;
  var DEFAULT_SHADE_COLOR = "#b9a38b";
  var DEFAULT_SHADE_RGB = [185, 163, 139];
  var DEFAULT_PRESETS = [
    { name: "Midden", top: 46, bottom: 15, enabled: true },
    { name: "Onderkant gesloten", top: 46, bottom: 0, enabled: true }
  ];
  var DEFAULT_CONFIG = {
    name: "",
    tap_action: "nearest",
    open_top: 0,
    open_bottom: 100,
    close_top: 0,
    close_bottom: 0,
    presets: DEFAULT_PRESETS,
    shade_color: DEFAULT_SHADE_COLOR
  };
  var COVER_ENTITY_RE = /^cover\.[a-z0-9_]+$/;
  function validateCardConfig(config) {
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
  function sanitizePosition(value, fallback = 0) {
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
      enabled: fb.enabled !== false
    };
    if (!preset || typeof preset !== "object") return { ...base };
    const rawName = typeof preset.name === "string" ? preset.name : base.name;
    return {
      name: rawName.slice(0, MAX_NAME_LENGTH),
      top: sanitizePosition(preset.top, base.top),
      bottom: sanitizePosition(preset.bottom, base.bottom),
      enabled: preset.enabled !== false
    };
  }
  function normalizeConfig(config, hass) {
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
  function parseShadeColor(input) {
    const buildResult = (r2, g2, b2) => {
      const clamp = (v) => Math.max(0, Math.min(Math.round(v), 255));
      const cr = clamp(r2);
      const cg = clamp(g2);
      const cb = clamp(b2);
      const dark = [cr, cg, cb].map((v) => Math.max(0, Math.round(v * 0.9)));
      return {
        base: `rgb(${cr}, ${cg}, ${cb})`,
        dark: `rgb(${dark[0]}, ${dark[1]}, ${dark[2]})`,
        rgb: [cr, cg, cb]
      };
    };
    if (!input) {
      const [r2, g2, b2] = DEFAULT_SHADE_RGB;
      return buildResult(r2, g2, b2);
    }
    if (Array.isArray(input) && input.length === 3) {
      const [r2, g2, b2] = input.map((v) => Number(v) || 0);
      return buildResult(r2, g2, b2);
    }
    if (typeof input === "string") {
      const m = /^#?([0-9a-fA-F]{6})$/.exec(input.trim());
      if (m) {
        const v = m[1];
        return buildResult(
          parseInt(v.slice(0, 2), 16),
          parseInt(v.slice(2, 4), 16),
          parseInt(v.slice(4, 6), 16)
        );
      }
    }
    const [r, g, b] = DEFAULT_SHADE_RGB;
    return buildResult(r, g, b);
  }

  // src/card.js
  var CARD_TEMPLATE = `
  <style>${card_default}</style>
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
    return String(text ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
  }
  function readCoverPosition(entity, fallback) {
    if (!entity) return fallback;
    const pos = entity.attributes && typeof entity.attributes.current_position === "number" ? entity.attributes.current_position : null;
    if (typeof pos === "number") return Math.max(0, Math.min(pos, 100));
    if (entity.state === "open") return 100;
    if (entity.state === "closed") return 0;
    return fallback;
  }
  var HoneycombBlindsCard = class extends HTMLElement {
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
        cover_bottom: covers[1] || ""
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
      let topY = topPos / 100 * MAX_DROP;
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
      const presets = Array.isArray(this._config.presets) ? this._config.presets.filter((p) => p && p.enabled !== false) : [];
      this._visiblePresets = presets;
      const buttons = [
        { key: "open", action: "open", label: t("open", this._hass), top: this._config.open_top, bottom: this._config.open_bottom },
        { key: "stop", action: "stop", label: t("stop", this._hass) },
        { key: "close", action: "close", label: t("close", this._hass), top: this._config.close_top, bottom: this._config.close_bottom },
        ...presets.map((preset, index) => ({
          key: `preset-${index}`,
          action: "preset",
          label: preset.name || `${t("preset", this._hass)} ${index + 1}`,
          index,
          top: preset.top,
          bottom: preset.bottom
        }))
      ];
      const activeKey = buttons.find((btn) => positionsMatch(currentTop, currentBottom, btn.top, btn.bottom))?.key ?? null;
      this._actionsEl.innerHTML = buttons.map((btn) => {
        const selected = btn.key === activeKey;
        const indexAttr = typeof btn.index === "number" ? ` data-index="${btn.index}"` : "";
        const selectedClass = selected ? " selected" : "";
        const ariaPressed = selected ? "true" : "false";
        const disabledAttr = selected ? ' disabled aria-disabled="true"' : "";
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
        this._setTop(y / MAX_DROP * 100);
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
      const topY = currentTop / 100 * MAX_DROP;
      const bottomY = (1 - currentBottom / 100) * MAX_DROP;
      const distTop = Math.abs(y - topY);
      const distBottom = Math.abs(y - bottomY);
      if (distTop <= distBottom) {
        this._setTop(y / MAX_DROP * 100);
      } else {
        this._setBottom((1 - y / MAX_DROP) * 100);
      }
    }
    _setTop(position) {
      this._hass.callService("cover", "set_cover_position", {
        entity_id: this._config.cover_top,
        position: sanitizePosition(position, 0)
      });
    }
    _setBottom(position) {
      this._hass.callService("cover", "set_cover_position", {
        entity_id: this._config.cover_bottom,
        position: sanitizePosition(position, 0)
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
  };
  function positionsMatch(currentTop, currentBottom, targetTop, targetBottom) {
    if (typeof targetTop !== "number" || typeof targetBottom !== "number") return false;
    return sanitizePosition(currentTop, 0) === sanitizePosition(targetTop, 0) && sanitizePosition(currentBottom, 0) === sanitizePosition(targetBottom, 0);
  }

  // src/editor.css
  var editor_default = ".form {\n  display: grid;\n  gap: 16px;\n}\n\n.section {\n  display: grid;\n  gap: 8px;\n}\n\nlabel.section-label {\n  font-size: 0.9rem;\n  color: var(--secondary-text-color);\n}\n\nha-form {\n  width: 100%;\n  display: block;\n}\n\n.preset {\n  display: grid;\n  grid-template-columns: 1.5fr 0.8fr 0.8fr auto;\n  gap: 8px;\n  align-items: center;\n}\n\n.mini {\n  padding: 6px 12px;\n  border-radius: var(--ha-card-border-radius, 12px);\n  border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.2));\n  background: var(--card-background-color, #fff);\n  color: var(--primary-text-color);\n  font: inherit;\n  cursor: pointer;\n  white-space: nowrap;\n}\n";

  // src/editor.js
  var EDITOR_TEMPLATE = `
  <style>${editor_default}</style>
  <div class="form">
    <ha-form id="main-form"></ha-form>
    <div class="section">
      <label class="section-label" id="label-positions"></label>
      <ha-form id="positions-form"></ha-form>
    </div>
    <div class="section">
      <label class="section-label" id="label-presets"></label>
      <div id="presets"></div>
      <button id="add-preset" class="mini" type="button"></button>
    </div>
  </div>
`;
  var computeLabel = (schema) => schema.label || schema.name;
  var NUMBER_SELECTOR = { number: { min: 0, max: 100, mode: "box" } };
  var HoneycombBlindsCardEditor = class extends HTMLElement {
    setConfig(config) {
      this._config = { ...DEFAULT_CONFIG, ...config };
      if (!Array.isArray(this._config.presets)) this._config.presets = [];
      this._render();
    }
    set hass(hass) {
      this._hass = hass;
      this._render();
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
      this.shadowRoot.innerHTML = EDITOR_TEMPLATE;
    }
    _bindEvents() {
      this.shadowRoot.getElementById("main-form").addEventListener("value-changed", (e) => {
        this._updateConfig(e.detail.value);
      });
      this.shadowRoot.getElementById("positions-form").addEventListener("value-changed", (e) => {
        const v = e.detail.value || {};
        const top = v.top_row || {};
        const bottom = v.bottom_row || {};
        this._updateConfig({
          open_top: sanitizePosition(top.open_top ?? this._config.open_top, 0),
          close_top: sanitizePosition(top.close_top ?? this._config.close_top, 0),
          open_bottom: sanitizePosition(bottom.open_bottom ?? this._config.open_bottom, 100),
          close_bottom: sanitizePosition(bottom.close_bottom ?? this._config.close_bottom, 0)
        });
      });
      this.shadowRoot.getElementById("add-preset").addEventListener("click", () => {
        const presets = Array.isArray(this._config.presets) ? [...this._config.presets] : [];
        presets.push({ name: t("new_preset", this._hass), top: 0, bottom: 0, enabled: true });
        this._updateConfig({ presets });
        this._renderPresets();
      });
    }
    _updateView() {
      const mainForm = this.shadowRoot.getElementById("main-form");
      mainForm.hass = this._hass;
      mainForm.computeLabel = computeLabel;
      mainForm.schema = this._formSchema();
      mainForm.data = this._formData();
      const positionsForm = this.shadowRoot.getElementById("positions-form");
      positionsForm.hass = this._hass;
      positionsForm.computeLabel = computeLabel;
      positionsForm.schema = this._positionsSchema();
      positionsForm.data = this._positionsData();
      this.shadowRoot.getElementById("label-positions").textContent = t("positions", this._hass);
      this.shadowRoot.getElementById("label-presets").textContent = t("presets", this._hass);
      this.shadowRoot.getElementById("add-preset").textContent = t("add_preset", this._hass);
      this._renderPresets();
    }
    _formSchema() {
      return [
        { name: "name", label: t("name", this._hass), selector: { text: {} } },
        { name: "cover_top", label: t("top_motor", this._hass), selector: { entity: { domain: "cover" } } },
        { name: "cover_bottom", label: t("bottom_motor", this._hass), selector: { entity: { domain: "cover" } } },
        { name: "shade_color", label: t("shade_color", this._hass), selector: { color_rgb: {} } }
      ];
    }
    _positionsSchema() {
      return [
        {
          name: "top_row",
          type: "grid",
          schema: [
            { name: "open_top", label: `${t("open_position", this._hass)} (${t("top", this._hass)})`, selector: NUMBER_SELECTOR },
            { name: "close_top", label: `${t("close_position", this._hass)} (${t("top", this._hass)})`, selector: NUMBER_SELECTOR }
          ]
        },
        {
          name: "bottom_row",
          type: "grid",
          schema: [
            { name: "open_bottom", label: `${t("open_position", this._hass)} (${t("bottom", this._hass)})`, selector: NUMBER_SELECTOR },
            { name: "close_bottom", label: `${t("close_position", this._hass)} (${t("bottom", this._hass)})`, selector: NUMBER_SELECTOR }
          ]
        }
      ];
    }
    _presetFieldSchemas() {
      return {
        name: [{ name: "name", label: t("name", this._hass), selector: { text: {} } }],
        top: [{ name: "top", label: t("top", this._hass), selector: NUMBER_SELECTOR }],
        bottom: [{ name: "bottom", label: t("bottom", this._hass), selector: NUMBER_SELECTOR }]
      };
    }
    _formData() {
      return {
        name: this._config.name || "",
        cover_top: this._config.cover_top || "",
        cover_bottom: this._config.cover_bottom || "",
        shade_color: parseShadeColor(this._config.shade_color).rgb
      };
    }
    _positionsData() {
      return {
        top_row: {
          open_top: this._config.open_top ?? 0,
          close_top: this._config.close_top ?? 0
        },
        bottom_row: {
          open_bottom: this._config.open_bottom ?? 100,
          close_bottom: this._config.close_bottom ?? 0
        }
      };
    }
    _renderPresets() {
      const container = this.shadowRoot.getElementById("presets");
      if (!container) return;
      const presets = Array.isArray(this._config.presets) ? this._config.presets : [];
      if (this._presetRows && this._presetRows.length === presets.length) {
        presets.forEach((preset, index) => {
          const row = this._presetRows[index];
          if (!row) return;
          const safeName = typeof preset.name === "string" ? preset.name : t("preset", this._hass);
          if (row.nameForm.data?.name !== safeName) {
            row.nameForm.data = { name: safeName };
          }
          const topVal = preset.top ?? 0;
          if (row.topForm.data?.top !== topVal) {
            row.topForm.data = { top: topVal };
          }
          const bottomVal = preset.bottom ?? 0;
          if (row.bottomForm.data?.bottom !== bottomVal) {
            row.bottomForm.data = { bottom: bottomVal };
          }
        });
        return;
      }
      container.innerHTML = "";
      this._presetRows = [];
      const schemas = this._presetFieldSchemas();
      presets.forEach((preset, index) => {
        const row = document.createElement("div");
        row.className = "preset";
        const makeForm = (key, data) => {
          const f = document.createElement("ha-form");
          f.hass = this._hass;
          f.computeLabel = computeLabel;
          f.schema = schemas[key];
          f.data = data;
          f.addEventListener("value-changed", (e) => {
            const next = Array.isArray(this._config.presets) ? [...this._config.presets] : [];
            const val = e.detail.value || {};
            next[index] = {
              ...next[index],
              name: typeof val.name === "string" ? val.name : next[index]?.name,
              top: "top" in val ? Number(val.top) : next[index]?.top,
              bottom: "bottom" in val ? Number(val.bottom) : next[index]?.bottom
            };
            this._updateConfig({ presets: next });
          });
          return f;
        };
        const nameForm = makeForm("name", { name: typeof preset.name === "string" ? preset.name : t("preset", this._hass) });
        const topForm = makeForm("top", { top: preset.top ?? 0 });
        const bottomForm = makeForm("bottom", { bottom: preset.bottom ?? 0 });
        row.appendChild(nameForm);
        row.appendChild(topForm);
        row.appendChild(bottomForm);
        const remove = document.createElement("button");
        remove.className = "mini";
        remove.type = "button";
        remove.textContent = t("remove", this._hass);
        remove.addEventListener("click", () => {
          const next = Array.isArray(this._config.presets) ? [...this._config.presets] : [];
          next.splice(index, 1);
          this._updateConfig({ presets: next });
          this._renderPresets();
        });
        row.appendChild(remove);
        container.appendChild(row);
        this._presetRows.push({ row, nameForm, topForm, bottomForm });
      });
    }
    _updateConfig(changes) {
      this._config = { ...this._config, ...changes };
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true
      }));
    }
  };

  // src/version.js
  var VERSION = "0.6.0";

  // src/index.js
  customElements.define("honeycomb-blinds-card", HoneycombBlindsCard);
  customElements.define("honeycomb-blinds-card-editor", HoneycombBlindsCardEditor);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "honeycomb-blinds-card",
    name: "Honeycomb Blinds Card",
    preview: true,
    description: "Control a two-motor honeycomb blinds (top + bottom).",
    documentationURL: "https://github.com/christianvaes/honeycomb-blinds-card"
  });
  console.info(
    `%c HONEYCOMB-BLINDS-CARD %c ${VERSION} `,
    "color: white; background: #b9a38b; font-weight: 700;",
    "color: #b9a38b; background: white; font-weight: 700;"
  );
})();
