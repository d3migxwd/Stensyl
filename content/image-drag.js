/**
 * Pan/drag for the screenshot image only — not part of toolObject / initCanvasTools.
 * Combines translate with scale from getScale() so scale +/- and pan stay in sync.
 */
function initImageDrag(img, { getScale }) {
  if (!img || typeof getScale !== "function") {
    return { refreshTransform: () => {} };
  }

  let translateX = 0;
  let translateY = 0;
  let dragging = false;
  let lastPointerX = 0;
  let lastPointerY = 0;

  img.draggable = false;

  function applyTransform() {
    img.style.transformOrigin = "center center";
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${getScale()})`;
  }

  function onPointerDown(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging = true;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    try {
      img.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!dragging) return;
    const dx = e.clientX - lastPointerX;
    const dy = e.clientY - lastPointerY;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    translateX += dx;
    translateY += dy;
    applyTransform();
    e.preventDefault();
  }

  function onPointerUp(e) {
    if (!dragging) return;
    dragging = false;
    try {
      img.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }

  img.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
  document.addEventListener("pointercancel", onPointerUp);

  return { refreshTransform: applyTransform };
}
