# Stensyl

A browser extension that overlays a **design screenshot** on top of the page you’re building so you can compare implementation to design—like a **stencil**—without juggling Figma (or another design tool) and your HTML/CSS in separate tabs.

**Why it exists:** As a frontend dev it’s easy to lose fidelity on padding, margins, spacing, and overall layout. Stensyl helps you see what matches, what’s off, and where the UI is drifting from the design.

**Where it runs:** Content scripts load on **`http://` and `https://` pages only** (including localhost)—not on `file://` docs or browser-internal URLs like `chrome://`.

See **[content/README.md](content/README.md)** for how the content scripts are organized and loaded.

**Privacy:** [PRIVACY.md](PRIVACY.md) — all data stays local; no accounts or telemetry.

Want to help? See **[CONTRIBUTORS.md](CONTRIBUTORS.md)**. Planned features: **[docs/FUTURE-FEATURES.md](docs/FUTURE-FEATURES.md)**.
