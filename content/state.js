/** Tool state + active tool (extensible for future tools). */
const toolObject = {
  activeTool: "scale",
  tools: {
    scale: {
      text: "Scale",
      defaultValue: 1,
      currentValue: 1,
      min: 0.2,
      max: 2,
      step: 0.005,
      onChange(value) {
        toolObject.tools.scale.currentValue = value;
      },
    },
  },
};

function getActiveTool() {
  return toolObject.tools[toolObject.activeTool];
}

function getDisplayPercentForActiveTool() {
  const t = getActiveTool();
  if (!t || typeof t.currentValue !== "number") return 100;
  return Math.round(t.currentValue * 100);
}
