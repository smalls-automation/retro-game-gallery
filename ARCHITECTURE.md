# Architecture Overview

## Purpose & Users

A family‑focused digital museum of classic video games. The site is a static SPA hosted on GitHub Pages, accessible to anyone without authentication.

## Core Phase‑1 Features (Deliverables)

1. **Gallery Grid** – Responsive layout displaying game cards with title, year, platform, genre, description, and cover image.
2. **Search & Filter** – Text search plus dropdown filters for Platform and Genre, combinable.
3. **Favorites** – Heart icon to toggle favorite, persisted via `localStorage`.
4. **Data Source** – Static `games.json` file and local `images/` folder for cover images.
5. **Accessibility** – Semantic HTML, alt text for images, keyboard navigation, WCAG 2.1 AA compliance where feasible.
6. **Performance** – Lazy‑load images, optimise asset size, aim for initial load < 2 seconds on typical broadband.

## Phase‑2 Enhancements (Optional)

- Sorting options (alphabetical, release year)
- Pagination / infinite scroll
- Dark mode toggle
- Share / export favorite list
- SEO meta tags, Open Graph support

## Phase‑3 Delivery

- Documentation (README, ARCHITECTURE, usage guide)
- CI workflow for lint/format checks
- Deploy to GitHub Pages
- Post‑deployment testing checklist

## Technical Stack

- **Frontend**: Any modern JavaScript framework/library (React, Vue, Svelte, or vanilla JS). The choice will be made by the implementation team.
- **Build**: Static site generation using Vite, CRA, or similar to produce plain HTML/CSS/JS.
- **Storage**: `localStorage` for persisting favorites.
- **Deployment**: GitHub Pages.

## Non‑Functional Requirements

- **Performance**: Initial page load < 2 seconds, lazy loading of images.
- **Responsiveness**: Fully responsive across desktop, tablet, and mobile.
- **Accessibility**: WCAG 2.1 AA compliance (semantic markup, alt text, keyboard navigation).

---

*This document captures the agreed architecture and will guide the implementation phases.*