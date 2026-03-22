// Background service worker (Manifest V3)
// Set true locally when you want install/update logs in the service worker console.
const DEBUG = false;

chrome.runtime.onInstalled.addListener((details) => {
  if (DEBUG) {
    console.log("Stensyl extension installed", details.reason);
  }
});
