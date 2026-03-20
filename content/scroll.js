/** Page scroll lock helpers (used by overlay + canvas toggle). */
function restoreScroll() {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

function stopScroll() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}
