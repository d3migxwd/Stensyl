// 2. LOGIC: Handles the data fetching and DOM injection
async function switchToCanvas() {
  const extensionArea = document.getElementById("extension-area");
  if (!extensionArea) return;

  try {
    // Await the data from storage (Manifest V3 supports Promises)
    const result = await chrome.storage.local.get("lastScreenshot");

    if (result.lastScreenshot) {
      // Inject the HTML with the actual Base64 string
      extensionArea.innerHTML = createCanvasHTML(result.lastScreenshot);
      if (STENSYL_DEBUG) console.log("Canvas screen loaded.");

      // Initialize any canvas-specific logic here.
      initCanvasToggle();
      const screenshotImg = document.getElementById("screenshot-preview");
      const { refreshTransform } = initImageDrag(screenshotImg, {
        getScale: () => toolObject.tools.scale.currentValue,
      });
      initCanvasTools(refreshTransform);
    } else {
      console.error("No screenshot found in storage.");
      alert("Please upload a screenshot first!");
    }
  } catch (error) {
    console.error("Failed to switch to canvas:", error);
  }
}
