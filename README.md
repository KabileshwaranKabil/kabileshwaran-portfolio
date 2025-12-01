# Personal Portfolio — M. Kabileshwaran

This repository is a responsive, data-driven personal portfolio built with plain HTML, CSS, and JavaScript. It showcases projects, study notes, and contact information. The site is intentionally lightweight and easy to extend into a full-stack project later.

## Highlights
- Clean single-page layout with sections for About, Skills, Projects, Notes, and Contact
- Data-driven content: projects and notes are rendered from `data/*.json`
- Local-first assets: project screenshots and previews are stored under `assets/` and `projects/`
- Theme toggle (light/dark) with CSS variables
- Responsive mobile-first design with accessible semantics

## Tech Stack
- HTML5
- CSS3 (variables, responsive grid)
- Vanilla JavaScript (ES modules not required)

## Repository Structure

```
.
├─ index.html
├─ css/
│  ├─ variables.css
│  └─ styles.css
├─ js/
│  ├─ main.js
  ├─ ux.js
  ├─ projects.js
  │  └─ notes.js
├─ data/
│  ├─ projects.json
│  └─ notes.json
├─ assets/
│  ├─ images/
│  └─ notes/
└─ resources/
```

## Running locally

1. Start a simple HTTP server (required to fetch JSON files correctly):

```powershell
python -m http.server 8000
```

2. Open `http://localhost:8000` in your browser.

## Adding Projects
- Edit `data/projects.json` and follow the existing object structure (title, description, images, repo, demo, tech).
- Place screenshot images under `assets/images/` and reference local paths in the JSON.

## Notes (Google Drive)
- Study notes are tracked in `data/notes.json`. Each entry includes a `link` that points to the Google Drive folder or file. For best UX, make Drive files shareable (Anyone with the link can view) and paste the file-level URL in `data/notes.json`.

## Contributing
Contributions are welcome — open an issue or a pull request. See `CONTRIBUTING.md` for guidelines.

## License
This project is licensed under the MIT License — see `LICENSE`.

---
If you want, I can also prepare a deploy pipeline (GitHub Pages or Netlify) and add a small CI check to validate HTML/CSS/JS before publishing.
# Personal Portfolio (Scaffold)

This is a minimal, extendable static personal-portfolio scaffold built with HTML, CSS, and Vanilla JavaScript.

Quick start

1. Open `index.html` in a browser, or run a local static server (recommended):

```powershell
# From project root
python -m http.server 5500; Start-Process "http://localhost:5500"
```

2. Edit `data/projects.json` to add your projects. Add images under `assets/images/`.

What's included

- `index.html` — single-page layout with hero, about, skills, projects, notes, contact.
- `css/variables.css` — theme variables for light/dark mode.
- `css/styles.css` — main styles (responsive, accessible).
- `js/ux.js` — typing intro and reveal-on-scroll.
- `js/projects.js` — loads `data/projects.json`, renders project cards and filtering.
- `js/main.js` — theme toggle, smooth scrolling, contact form handlers.
- `data/projects.json` — sample project entries extracted from your GitHub profile (placeholders).

Next steps

- Provide headshot, project screenshots, and resume PDF to replace placeholders.
- Optionally: fetch READMEs from GitHub per-repo and populate project descriptions.
- Deploy to GitHub Pages, Netlify, or Vercel.

If you want, I can now fetch each repository README and attach screenshots into `assets/images/` placeholders.