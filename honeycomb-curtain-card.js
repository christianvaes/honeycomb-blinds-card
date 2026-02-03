class HoneycombCurtainCard extends HTMLElement {
  setConfig(config) {
    if (!config || !config.cover_top || !config.cover_bottom) {
      throw new Error("You must define 'cover_top' and 'cover_bottom'.");
    }
    this._config = {
      name: "",
      tap_action: "nearest",
      ...config,
    };
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    this._render();
  }

  getCardSize() {
    return 3;
  }

  _render() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            --hc-taupe: #b9a38b;
            --hc-taupe-dark: #a89178;
            --hc-black: #111111;
            --hc-rail: 16px;
            --hc-height: 240px;
            --hc-width: 100%;
          }

          ha-card {
            overflow: hidden;
          }

          .card {
            padding: 16px;
          }

          .title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 12px;
          }

          .scene {
            position: relative;
            width: var(--hc-width);
            height: var(--hc-height);
            border-radius: 10px;
            background: linear-gradient(180deg, #f7f4f0 0%, #f2ede6 100%);
            border: 1px solid rgba(0, 0, 0, 0.08);
            overflow: hidden;
            cursor: pointer;
          }

          .top-box {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 18px;
            background: var(--hc-black);
            z-index: 4;
          }

          .top-rail {
            position: absolute;
            left: 8px;
            right: 8px;
            height: var(--hc-rail);
            background: var(--hc-black);
            border-radius: 8px;
            z-index: 3;
            transform: translateY(var(--top-y, 0px));
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
          }

          .bottom-rail {
            position: absolute;
            left: 8px;
            right: 8px;
            height: calc(var(--hc-rail) + 4px);
            background: var(--hc-black);
            border-radius: 10px;
            z-index: 3;
            transform: translateY(var(--bottom-y, 200px));
            box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.25);
          }

          .shade {
            position: absolute;
            left: 10px;
            right: 10px;
            top: calc(var(--top-y, 0px) + var(--hc-rail));
            height: calc(var(--bottom-y, 200px) - var(--top-y, 0px) - var(--hc-rail));
            background:
              repeating-linear-gradient(
                0deg,
                var(--hc-taupe) 0px,
                var(--hc-taupe) 8px,
                var(--hc-taupe-dark) 8px,
                var(--hc-taupe-dark) 10px
              );
            border-radius: 6px;
            z-index: 2;
            transition: height 0.2s ease, top 0.2s ease;
          }

          .status {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-top: 12px;
            font-size: 0.9rem;
            color: var(--secondary-text-color);
          }

          .status strong {
            color: var(--primary-text-color);
          }

          .actions {
            display: flex;
            gap: 10px;
            margin-top: 14px;
          }

          .btn {
            flex: 1;
            padding: 10px 12px;
            border-radius: 10px;
            border: 1px solid rgba(0, 0, 0, 0.12);
            background: #ffffff;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.05s ease, box-shadow 0.2s ease;
          }

          .btn:active {
            transform: translateY(1px);
          }

          .btn.primary {
            background: #111111;
            color: white;
            border-color: #111111;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }

          .hint {
            margin-top: 8px;
            font-size: 0.8rem;
            color: var(--secondary-text-color);
          }
        </style>
        <ha-card>
          <div class="card">
            <div class="title" id="title"></div>
            <div class="scene" id="scene">
              <div class="top-box"></div>
              <div class="top-rail"></div>
              <div class="shade"></div>
              <div class="bottom-rail"></div>
            </div>
            <div class="status">
              <div>Topmotor: <strong id="top-pos">-</strong></div>
              <div>Ondermotor: <strong id="bottom-pos">-</strong></div>
              <div>Status: <strong id="status-text">-</strong></div>
              <div>Opening: <strong id="open-span">-</strong></div>
            </div>
            <div class="actions">
              <button class="btn" id="btn-open">Open</button>
              <button class="btn" id="btn-stop">Stop</button>
              <button class="btn primary" id="btn-close">Sluit</button>
            </div>
            <div class="hint">Tik op het plaatje om de dichtstbijzijnde rail te verplaatsen.</div>
          </div>
        </ha-card>
      `;

      this.shadowRoot.getElementById("btn-open").addEventListener("click", () => {
        this._setBoth(100, 0);
      });

      this.shadowRoot.getElementById("btn-stop").addEventListener("click", () => {
        this._stopBoth();
      });

      this.shadowRoot.getElementById("btn-close").addEventListener("click", () => {
        this._setBoth(0, 100);
      });

      this.shadowRoot.getElementById("scene").addEventListener("click", (ev) => {
        this._onSceneClick(ev);
      });
    }

    const titleEl = this.shadowRoot.getElementById("title");
    if (this._config.name) {
      titleEl.textContent = this._config.name;
      titleEl.style.display = "block";
    } else {
      titleEl.style.display = "none";
    }

    const topEntity = this._hass.states[this._config.cover_top];
    const bottomEntity = this._hass.states[this._config.cover_bottom];

    const topPos = this._getPosition(topEntity, 100);
    const bottomPos = this._getPosition(bottomEntity, 0);

    const height = 240;
    const rail = 16;
    const maxDrop = height - rail;

    let topY = (1 - topPos / 100) * maxDrop;
    let bottomY = (bottomPos / 100) * maxDrop;

    topY = Math.max(0, Math.min(topY, maxDrop - rail));
    bottomY = Math.max(rail, Math.min(bottomY, maxDrop));

    const minGap = rail * 1.5;
    if (bottomY < topY + minGap) bottomY = topY + minGap;
    if (bottomY > maxDrop) bottomY = maxDrop;

    const scene = this.shadowRoot.getElementById("scene");
    scene.style.setProperty("--top-y", `${topY}px`);
    scene.style.setProperty("--bottom-y", `${bottomY}px`);

    const openSpan = Math.max(0, bottomY - topY) / maxDrop * 100;

    this.shadowRoot.getElementById("top-pos").textContent = `${Math.round(topPos)}%`;
    this.shadowRoot.getElementById("bottom-pos").textContent = `${Math.round(bottomPos)}%`;
    this.shadowRoot.getElementById("open-span").textContent = `${Math.round(openSpan)}%`;
    this.shadowRoot.getElementById("status-text").textContent = this._statusText(topEntity, bottomEntity);
  }

  _getPosition(entity, fallback) {
    if (!entity) return fallback;
    const pos = entity.attributes && typeof entity.attributes.current_position === "number"
      ? entity.attributes.current_position
      : null;

    if (typeof pos === "number") return Math.max(0, Math.min(pos, 100));
    if (entity.state === "open") return 100;
    if (entity.state === "closed") return 0;
    return fallback;
  }

  _statusText(topEntity, bottomEntity) {
    if (!topEntity || !bottomEntity) return "Onbekend";
    if (topEntity.state === "opening" || bottomEntity.state === "opening") return "Bezig met openen";
    if (topEntity.state === "closing" || bottomEntity.state === "closing") return "Bezig met sluiten";
    if (topEntity.state === "open" && bottomEntity.state === "open") return "Open";
    if (topEntity.state === "closed" && bottomEntity.state === "closed") return "Gesloten";
    return "Gedeeltelijk";
  }

  _onSceneClick(ev) {
    const rect = ev.currentTarget.getBoundingClientRect();
    const y = Math.max(0, Math.min(ev.clientY - rect.top, rect.height));
    const height = 240;
    const rail = 16;
    const maxDrop = height - rail;

    const tapAction = this._config.tap_action || "nearest";

    if (tapAction === "top") {
      const topPos = 100 - (y / maxDrop) * 100;
      this._setTop(topPos);
      return;
    }

    if (tapAction === "bottom") {
      const bottomPos = (y / maxDrop) * 100;
      this._setBottom(bottomPos);
      return;
    }

    const topEntity = this._hass.states[this._config.cover_top];
    const bottomEntity = this._hass.states[this._config.cover_bottom];
    const currentTop = this._getPosition(topEntity, 100);
    const currentBottom = this._getPosition(bottomEntity, 0);

    const topY = (1 - currentTop / 100) * maxDrop;
    const bottomY = (currentBottom / 100) * maxDrop;

    const distTop = Math.abs(y - topY);
    const distBottom = Math.abs(y - bottomY);

    if (distTop <= distBottom) {
      const topPos = 100 - (y / maxDrop) * 100;
      this._setTop(topPos);
    } else {
      const bottomPos = (y / maxDrop) * 100;
      this._setBottom(bottomPos);
    }
  }

  _setTop(position) {
    const pos = Math.max(0, Math.min(Math.round(position), 100));
    this._hass.callService("cover", "set_cover_position", {
      entity_id: this._config.cover_top,
      position: pos,
    });
  }

  _setBottom(position) {
    const pos = Math.max(0, Math.min(Math.round(position), 100));
    this._hass.callService("cover", "set_cover_position", {
      entity_id: this._config.cover_bottom,
      position: pos,
    });
  }

  _setBoth(topPos, bottomPos) {
    this._setTop(topPos);
    this._setBottom(bottomPos);
  }

  _stopBoth() {
    this._hass.callService("cover", "stop_cover", {
      entity_id: this._config.cover_top,
    });
    this._hass.callService("cover", "stop_cover", {
      entity_id: this._config.cover_bottom,
    });
  }
}

customElements.define("honeycomb-curtain-card", HoneycombCurtainCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "honeycomb-curtain-card",
  name: "Honeycomb Curtain Card",
  description: "Control a two-motor honeycomb curtain (top + bottom).",
});
