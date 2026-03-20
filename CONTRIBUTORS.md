# Contributing to Stensyl

Thanks for your interest in helping improve Stensyl.

## Ways to contribute

- **Bug reports** — Open an issue with steps to reproduce, browser + extension version, and what you expected vs what happened.
- **Feature ideas** — Open an issue to discuss before large changes; small improvements can go straight to a PR.
- **Pull requests** — Fix bugs, improve docs, or add features that fit the project goals (see [README.md](README.md)).

## Before you send a PR

1. **Load the extension locally** — Chrome: `chrome://extensions` → Developer mode → **Load unpacked** → select this repo folder. Confirm your change works.
2. **Content scripts** — New or renamed files must be listed in **[manifest.json](manifest.json)** in the correct **load order**. See **[content/README.md](content/README.md)** for the dependency chain.
3. **Keep scope focused** — One logical change per PR is easier to review.

## Code & project notes

- This repo uses **classic scripts** (no bundler): globals are shared across files under `content/`; order matters.
- **CSS** for the overlay lives in [content.css](content.css).
- **Manifest** is MV3; background is [background.js](background.js), popup is [popup.html](popup.html).

## Conduct

Be respectful and constructive in issues and PRs. Assume good intent.

## Questions

If something is unclear, open an issue and ask.
