# Publishing the privacy policy (GitHub Pages)

The Chrome Web Store and Firefox AMO require a privacy policy URL. Use GitHub Pages to host `docs/privacy.html`.

## 1. Push the repo to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/Stensyl.git  # if not already set
git push -u origin main
```

## 2. Enable GitHub Pages

1. Go to **Settings** → **Pages** in your repo.
2. Under **Source**, choose **Deploy from a branch**.
3. **Branch:** `main` (or `master`)
4. **Folder:** `/docs`
5. Click **Save**.

## 3. Privacy policy URL

After a minute or two, the policy will be at:

```
https://YOUR_USERNAME.github.io/Stensyl/privacy.html
```

Use this URL when submitting to the Chrome Web Store and Firefox AMO.

## 4. Update the GitHub URL in PRIVACY.md

If your username or repo name differs, update the contact link in `PRIVACY.md` and `docs/privacy.html`.
