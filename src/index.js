// Bundle entry point. Registers the card and editor custom elements,
// announces the card to Lovelace's card picker, and logs a banner so users
// reporting issues can easily share their installed version.

import { HoneycombBlindsCard } from "./card.js";
import { HoneycombBlindsCardEditor } from "./editor.js";
import { VERSION } from "./version.js";

customElements.define("honeycomb-blinds-card", HoneycombBlindsCard);
customElements.define("honeycomb-blinds-card-editor", HoneycombBlindsCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "honeycomb-blinds-card",
  name: "Honeycomb Blinds Card",
  preview: true,
  description: "Control a two-motor honeycomb blinds (top + bottom).",
  documentationURL: "https://github.com/christianvaes/honeycomb-blinds-card",
});

console.info(
  `%c HONEYCOMB-BLINDS-CARD %c ${VERSION} `,
  "color: white; background: #b9a38b; font-weight: 700;",
  "color: #b9a38b; background: white; font-weight: 700;",
);
