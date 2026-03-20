function initCanvasToggle() {
  const canvasToggleEl = document.getElementById("canvasToggle");
  if (!canvasToggleEl) return;

  // Default on canvas start: keep page scrolling disabled.
  stopScroll();

  const syncScrollWithCanvasState = () => {
    if (canvasToggleEl.classList.contains("active")) {
      stopScroll();
    } else {
      restoreScroll();
    }
  };

  // Ensure scroll state matches the initial class state.
  syncScrollWithCanvasState();

  canvasToggleEl.addEventListener("click", () => {
    canvasToggleEl.classList.toggle("active");
    syncScrollWithCanvasState();
  });
}

function initCanvasTools(refreshTransform) {
  const img = document.getElementById("screenshot-preview");
  const toolValueEl = document.getElementById("toolValue");
  const increaseBtn = document.getElementById("increaseSize");
  const decreaseBtn = document.getElementById("decreaseSize");

  if (!img || !toolValueEl || !increaseBtn || !decreaseBtn) return;

  const applyScaleFromTool = () => {
    if (toolObject.activeTool !== "scale") return;
    toolValueEl.textContent = String(getDisplayPercentForActiveTool());
    refreshTransform();
  };

  const adjustScale = (direction) => {
    if (toolObject.activeTool !== "scale") return;
    const t = toolObject.tools.scale;
    const next = clamp(t.currentValue + direction * t.step, t.min, t.max);
    t.onChange(next);
    applyScaleFromTool();
  };

  increaseBtn.addEventListener("click", () => adjustScale(1));
  decreaseBtn.addEventListener("click", () => adjustScale(-1));

  applyScaleFromTool();
}
