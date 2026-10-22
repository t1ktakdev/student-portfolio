# t1ktakdev — Developer Portfolio

A small, fast, accessible portfolio built to showcase **real public repositories** by [t1ktakdev](https://github.com/t1ktakdev).

The site is static by design: no build process, external font service, analytics, framework, token, or API key.

## Features

- Responsive editorial interface with desktop and mobile navigation
- Light/dark theme, persisted locally where storage is available
- Search by project name, description, or technology
- Filter by project category, including a useful empty state
- Semantic landmarks, skip link, accessible labels, keyboard controls
- Respects `prefers-reduced-motion`
- Safe outbound repository links

Project entries are curated from the account's verified **public repositories**. Names, descriptions, and language information can be checked by opening the linked source repositories. This site does not claim employment experience, external clients, or fabricated impact metrics.

## Local development

Any simple web server will work:

```sh
python -m http.server 8000
```

Then visit http://localhost:8000/.

There are no dependencies. To check JavaScript syntax:

```sh
node --check script.js
```

To run the included structural smoke tests:

```sh
node --test tests/*.test.mjs
```

Browser interactions were additionally tested in a local Chrome + Selenium session (theme switching and persistence, search, filtering, mobile navigation, keyboard interactions, and JavaScript console). Those environment-specific screenshots and results are retained outside this public repository.

## Architecture

- `index.html` — accessible markup, navigation, portfolio sections.
- `style.css` — responsive layout, themes, focus states.
- `script.js` — project dataset, safe DOM rendering, search/filter and menu interactions.
- `favicon.svg` — small first-party favicon.
- `tests/` — dependency-free static smoke checks.

## Privacy

Public-facing developer identity: **t1ktakdev**. Personal names, private addresses, academic reports, machine-local paths, tokens and identity-bearing files must never be added to this repository.

Use GitHub's no-reply commit email to avoid exposing a private address. The repository's `.gitignore` blocks common local reports, secrets and dependencies; it is not a substitute for reviewing history and staged files before every push.

## License

This repository contains portfolio website code for learning and demonstration. Linked external repositories have their own respective licenses.
