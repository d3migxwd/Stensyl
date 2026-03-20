/**
 * Content script entry: messaging + bootstrap.
 * Load order is defined in manifest.json (content/*.js).
 */
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "start") {
    if (!document.getElementById("extension-area")) {
      createOverlay();
    }
    sendResponse({ ok: true });
  } else if (message.action === "stop") {
    const el = document.getElementById("upload-screen-container");
    if (el) el.remove();
    const extensionArea = document.getElementById("extension-area");
    if (extensionArea) extensionArea.remove();
    restoreScroll();
    chrome.storage.local.remove("lastScreenshot", () => {
      if (chrome.runtime.lastError) {
        console.error(
          "Failed clearing lastScreenshot:",
          chrome.runtime.lastError,
        );
      }
      sendResponse({ ok: true });
    });
    return true; // Keep the message channel open for async storage removal
  }
});
