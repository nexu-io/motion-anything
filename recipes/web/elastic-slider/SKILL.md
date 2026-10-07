---
name: elastic-slider
description: |
  A slider with a springy fill and knob — playful, tactile input. Use for a single prominent control (volume, brightness). Under prefers-reduced-motion it moves without the spring.
triggers: ["elastic slider","springy slider","弹性滑块","回弹滑动条"]
od: { mode: prototype, surface: web, platform: desktop, category: animation-motion, preview: { type: html }, design_system: { requires: false } }
---
# elastic-slider
Elastic Slider Dependency-free, reduced-motion safe.
## How to apply
Copy css+js; `<div class="es"><div class="es-track" aria-label="Volume"><div class="es-fill"></div><div class="es-knob"></div></div></div>`.
## Accessibility & performance
- Transforms only: the fill scales (`scaleX`) and the knob translates, so dragging never triggers layout (MOTION-SPEC §5).
- The track becomes a keyboard-operable `role="slider"` (arrows ±1, PageUp/PageDown ±10, Home/End) and reports `aria-valuenow` 0–100. Give it an `aria-label`.
- `touch-action: none` on the track, so a drag on a touch screen moves the slider instead of scrolling the page.
