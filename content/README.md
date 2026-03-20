# Stensyl — content scripts

## What this is for

**Stensyl** helps frontend developers **verify that the UI they’re building matches the design** by showing an **overlayed screenshot** on top of the live page. You can align it to components or whole flows and use it like a **stencil**: compare spacing, padding, margins, typography, and layout without constantly switching between a design tab (Figma, etc.) and your implementation.

If you’ve ever caught yourself flipping between design and the browser to eyeball measurements, this is meant to shorten that loop and make it obvious **where the implementation matches** and **where it’s off** (“which part you’re butchering”).

This folder holds the **content scripts** that inject that overlay into web pages.

---

## Is `README.md` in `content/` okay?

**Yes.** Keeping a README next to the scripts it describes is normal: it explains what lives here and how pieces connect. The project also has a short **[`README.md`](../README.md)** at the repo root for anyone landing on the repository; this file goes deeper for **content-script** structure and load order.

---

## Technical: classic scripts & load order

Scripts run in **manifest order**; each file shares the same global scope (no `import`/`export`).

| Order | File | Role |
| ----: | --- | --- |
| 1 | `scroll.js` | `restoreScroll`, `stopScroll` |
| 2 | `state.js` | `toolObject`, `getActiveTool`, `getDisplayPercentForActiveTool` |
| 3 | `utils.js` | `clamp` |
| 4 | `canvas-html.js` | `createCanvasHTML`, `blurButton` |
| 5 | `image-drag.js` | `initImageDrag` |
| 6 | `canvas-controls.js` | `initCanvasToggle`, `initCanvasTools` |
| 7 | `canvas-flow.js` | `switchToCanvas` |
| 8 | `overlay.js` | `createOverlay` |
| 9 | `entry.js` | `chrome.runtime.onMessage` listener |

When adding a new file, insert it in the right **dependency order** and update `manifest.json`.
