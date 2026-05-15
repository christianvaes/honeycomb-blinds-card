// HoneycombBlindsCardEditor — the visual editor shown when configuring the
// card in Lovelace's UI. Uses HA's ha-form for the inputs so the right input
// components load reliably (ha-textfield directly is not always upgraded in
// editor context).

import editorCss from "./editor.css";
import { t } from "./i18n.js";
import {
  DEFAULT_CONFIG,
  parseShadeColor,
  sanitizePosition,
} from "./config.js";

const EDITOR_TEMPLATE = `
  <style>${editorCss}</style>
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

const computeLabel = (schema) => schema.label || schema.name;
const NUMBER_SELECTOR = { number: { min: 0, max: 100, mode: "box" } };

export class HoneycombBlindsCardEditor extends HTMLElement {
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
        close_bottom: sanitizePosition(bottom.close_bottom ?? this._config.close_bottom, 0),
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
      { name: "name",         label: t("name", this._hass),         selector: { text: {} } },
      { name: "cover_top",    label: t("top_motor", this._hass),    selector: { entity: { domain: "cover" } } },
      { name: "cover_bottom", label: t("bottom_motor", this._hass), selector: { entity: { domain: "cover" } } },
      { name: "shade_color",  label: t("shade_color", this._hass),  selector: { color_rgb: {} } },
    ];
  }

  _positionsSchema() {
    return [
      {
        name: "top_row",
        type: "grid",
        schema: [
          { name: "open_top",  label: `${t("open_position", this._hass)} (${t("top", this._hass)})`,  selector: NUMBER_SELECTOR },
          { name: "close_top", label: `${t("close_position", this._hass)} (${t("top", this._hass)})`, selector: NUMBER_SELECTOR },
        ],
      },
      {
        name: "bottom_row",
        type: "grid",
        schema: [
          { name: "open_bottom",  label: `${t("open_position", this._hass)} (${t("bottom", this._hass)})`,  selector: NUMBER_SELECTOR },
          { name: "close_bottom", label: `${t("close_position", this._hass)} (${t("bottom", this._hass)})`, selector: NUMBER_SELECTOR },
        ],
      },
    ];
  }

  _presetFieldSchemas() {
    return {
      name:   [{ name: "name",   label: t("name", this._hass),   selector: { text: {} } }],
      top:    [{ name: "top",    label: t("top", this._hass),    selector: NUMBER_SELECTOR }],
      bottom: [{ name: "bottom", label: t("bottom", this._hass), selector: NUMBER_SELECTOR }],
    };
  }

  _formData() {
    return {
      name: this._config.name || "",
      cover_top: this._config.cover_top || "",
      cover_bottom: this._config.cover_bottom || "",
      shade_color: parseShadeColor(this._config.shade_color).rgb,
    };
  }

  _positionsData() {
    return {
      top_row: {
        open_top: this._config.open_top ?? 0,
        close_top: this._config.close_top ?? 0,
      },
      bottom_row: {
        open_bottom: this._config.open_bottom ?? 100,
        close_bottom: this._config.close_bottom ?? 0,
      },
    };
  }

  _renderPresets() {
    const container = this.shadowRoot.getElementById("presets");
    if (!container) return;
    const presets = Array.isArray(this._config.presets) ? this._config.presets : [];

    // Row count unchanged → just update data on existing forms so we keep focus
    // while the user is typing.
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

    // Length changed (add/remove) → full rebuild.
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
            name:   typeof val.name   === "string" ? val.name   : next[index]?.name,
            top:    "top"    in val ? Number(val.top)    : next[index]?.top,
            bottom: "bottom" in val ? Number(val.bottom) : next[index]?.bottom,
          };
          this._updateConfig({ presets: next });
        });
        return f;
      };

      const nameForm   = makeForm("name",   { name:   typeof preset.name === "string" ? preset.name : t("preset", this._hass) });
      const topForm    = makeForm("top",    { top:    preset.top    ?? 0 });
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
      composed: true,
    }));
  }
}
