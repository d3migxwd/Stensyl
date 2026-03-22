# Future features

Planned improvements that were not implemented in the initial release. Reference this document when picking up development.

---

## 1. Drag and drop upload

**Area:** Upload screen ([`content/overlay.js`](../content/overlay.js) → `createUploadScreen`)

**Current:** Users must click the upload area or "Upload" button to open the file picker.

**Goal:** Add drag-and-drop support so users can drag a PNG/JPEG onto the upload area to upload. Update the UI and buttons to reflect both interaction methods.

**Notes:**
- Use `dragenter`, `dragover`, `dragleave`, `drop` on the upload container.
- Validate dropped files (mime type or extension) before processing.
- Provide visual feedback on `dragover` (e.g. highlight, dashed border).
- Ensure the same validation as the file input (PNG, JPEG only).

---

## 2. Resize screenshot (width/height)

**Area:** Canvas screen, screenshot overlay ([`content/image-drag.js`](../content/image-drag.js), [`content/canvas-controls.js`](../content/canvas-controls.js))

**Current:** Screenshot can be dragged to reposition. Scale is controlled via tool buttons.

**Goal:** When the user hovers near the edge of the screenshot, the cursor updates to indicate resize (e.g. `ew-resize` for horizontal, `ns-resize` for vertical). Dragging from the edge adjusts **width** or **height** of the screenshot independently.

**Notes:**
- Resize is **width and height only** (edges, not corners).
- Define a hover threshold (e.g. 8px) from each edge to trigger resize mode.
- Cursor feedback: `ew-resize` for left/right, `ns-resize` for top/bottom.
- Consider min/max dimensions to avoid unusable sizes.

---

## 3. Scroll or pinch to scale

**Area:** Screenshot preview ([`content/canvas-controls.js`](../content/canvas-controls.js), [`content/state.js`](../content/state.js) → `toolObject.tools.scale`)

**Current:** Scale is adjusted via +/- buttons only.

**Goal:** Allow the user to scale the screenshot with:
- **Mouse:** Scroll wheel while hovering over the screenshot.
- **Touch:** Pinch gesture on touch devices.

**Notes:**
- Use `wheel` with `deltaY` (invert for natural direction if needed).
- For touch, use `touchstart` / `touchmove` to compute pinch distance; scale based on change.
- Respect existing `scale` min/max (0.2–2) in `state.js`.
- Consider scroll-to-zoom centering (zoom toward cursor position).

---

## 4. Measure tool (rectangle and circle)

**Area:** Canvas screen, tools ([`content/state.js`](../content/state.js), new measure logic)

**Goal:** A measure tool that lets the user draw a **rectangle** or **circle** on the overlay. The tool displays **width and height** (for rect: w×h; for circle: diameter or radius). 

**Rules:**
- User can draw **one shape at a time**. Redrawing replaces the current shape.
- Shape can be closed by:
  - Changing the selected tool (e.g. back to Scale), or
  - Clicking a "Close" button on the shape.
- Coordinates/measurements should be in pixels (or match the overlay’s coordinate system).

**Implementation outline:**
- Add `rect` and `circle` tools to `toolObject` in `state.js`.
- Draw an overlay (SVG or canvas) for the shape.
- Track drag: `mousedown` → start shape, `mousemove` → update size, `mouseup` → finalize.
- Show dimensions (e.g. "120 × 80 px" for rect, "Ø 64 px" for circle).
- Add a close/clear control on the shape or in the tools UI.

---

## 5. Tools dropdown (drop-up)

**Area:** Canvas tools section ([`content/canvas-controls.js`](../content/canvas-controls.js), [`content/canvas-html.js`](../content/canvas-html.js))

**Current:** The active tool (e.g. Scale) is shown; +/- buttons adjust the value. No way to switch tools yet.

**Goal:** Where the selected tool is displayed (`#toolValue` or equivalent), add an **onclick** that toggles a **drop-up** menu with all available tools:
- **Resize** (future)
- **Scale** (current)
- **Rect** (measure rectangle)
- **Circle** (measure circle)

**Notes:**
- Drop-up opens **above** the control to avoid overlapping the canvas.
- Clicking outside or selecting a tool closes the dropdown.
- Update `toolObject.activeTool` and refresh the UI when the tool changes.
- Ensure the dropdown is keyboard-accessible (focus, Enter/Space to select).

---

## Summary

| # | Feature            | Area              | Dependencies                      |
|---|--------------------|-------------------|-----------------------------------|
| 1 | Drag & drop upload | `overlay.js`      | None                              |
| 2 | Resize screenshot  | `image-drag.js`   | Edge detection, cursor, transform |
| 3 | Scroll/pinch scale | `canvas-controls` | `wheel`, touch events             |
| 4 | Measure tool       | `state.js`, new   | Shapes overlay, dimensions        |
| 5 | Tools dropdown     | `canvas-controls` | Depends on #4 for rect/circle     |

Feature **5** (tools dropdown) should be implemented in tandem with **4** (measure tool) so the dropdown can list all tools including Rect and Circle.
