# JurassicMission

Interactive birthday website with a mission-style flow:
1. Password gate
2. Dino jump challenge
3. Code mission preview (embedded `happybirthday` view)
4. Main birthday world (gallery, song, surprise effects)

## Highlights
- Password-protected entry flow
- Mini dino game unlock challenge
- Admin bypass option for testing
- Embedded WhatsApp-style `happybirthday` mission page
- Photo gallery modal + confetti/egg surprise effects
- Mobile-tuned UI adjustments

## Project Structure
- `index.html`: Main flow and gates
- `script.js`: App logic, game logic, gate transitions
- `style.css`: Main site styling and responsive layout
- `assets/`: Main site images/audio assets
- `happybirthday/`: Embedded third-party-based mission page
  - `happybirthday/index.html`
  - `happybirthday/style/main.css`
  - `happybirthday/script/main.js`
  - `happybirthday/music/`

## Local Run
1. Open folder `birthday-site-try-jurassic`
2. Run `npm install` once
3. Run `npm run preview`
4. Open `http://127.0.0.1:8123/`
5. Use password from `script.js` (`SITE_PASSWORD`)

Quick links:
- Main site: `http://127.0.0.1:8123/`
- Embedded chapter: `http://127.0.0.1:8123/happybirthday/`

Optional:
- You can still use Live Server if you prefer
- You can override the port with `npm run preview -- 9000`

## Test/Admin Bypass
Add `?admin=1` to URL to reveal admin skip button on the dino gate.

Example:
`http://127.0.0.1:5500/index.html?admin=1`

## Content Customization
### Main mission page
- Title/tag text: `index.html`
- Rotating love lines: `script.js` -> `loveLines`
- Photos:
  - Place files in `assets/images/`
  - If the new photos are `.HEIC`, run `npm run convert:images` to generate web-safe `.jpg` copies
  - Update `script.js` -> `photoFiles` if you want to add or reorder gallery items
- Main birthday song:
  - Path: `assets/audio/happybirthday.mp3`
  - Control button in hero section

### HEIC workflow
1. Drop `.HEIC` photos into `assets/images/`
2. Run `npm install`
3. Run `npm run convert:images`
4. Use the generated `.jpg` files in the gallery manifest

Notes:
- Original `.HEIC` files stay as source assets
- The website should reference the generated `.jpg` files for best browser compatibility

### Embedded code mission (`happybirthday`)
- Header name/status and chat content: `happybirthday/index.html`
- WhatsApp-style layout: `happybirthday/style/main.css`
- Embedded mission audio source: `happybirthday/index.html` (`./music/hbd2.mpeg`)

## Deployment
### GitHub Pages
1. Push `main` branch to GitHub
2. GitHub repo -> Settings -> Pages
3. Source: `Deploy from a branch`
4. Branch: `main`, folder: `/ (root)`

Live URL pattern:
`https://<username>.github.io/<repo-name>/`

### Netlify (if used)
- Connect repository and deploy from `main`
- Publish directory: project root (`.`)

## Notes
- This project contains an embedded subproject in `happybirthday/`; keep the folder tracked as regular files (not nested git submodule) for reliable deploys.
- If preview audio continues after leaving code mission, `script.js` includes logic to stop iframe audio and unload iframe when continuing.

## Policy and Compliance
- License status: proprietary / all rights reserved -> `LICENSE`
- Privacy policy -> `PRIVACY.md`
- Security policy -> `SECURITY.md`
- Third-party notices -> `THIRD_PARTY_LICENSES.md`
