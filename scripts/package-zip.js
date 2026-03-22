const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const out = path.join(root, "stensyl.zip");

const files = [
  "manifest.json",
  "background.js",
  "popup.html",
  "popup.css",
  "popup.js",
  "content.css",
  "content/scroll.js",
  "content/state.js",
  "content/utils.js",
  "content/canvas-html.js",
  "content/image-drag.js",
  "content/canvas-controls.js",
  "content/canvas-flow.js",
  "content/overlay.js",
  "content/entry.js",
  "assets/images/logos/icon-16.png",
  "assets/images/logos/icon-32.png",
  "assets/images/logos/icon-48.png",
  "assets/images/logos/icon-128.png",
];

if (fs.existsSync(out)) fs.unlinkSync(out);
execSync(`zip -r stensyl.zip ${files.join(" ")} -x "*.DS_Store"`, {
  cwd: root,
  stdio: "inherit",
});
console.log("Created stensyl.zip");
