// Background service worker (Manifest V3)
// Runs when the extension is installed or updated

chrome.runtime.onInstalled.addListener((details) => {
  console.log('Stensyl extension installed', details.reason);
});
