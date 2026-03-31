/**
 * gameCard.js
 *
 * Creates an accessible game card DOM element for a single game entry.
 * Each card displays: cover image, title, year, platform, genre, and description.
 */

import { isFavorite, toggleFavorite } from './favorites.js';

const PLACEHOLDER_IMAGE = '/images/placeholder.svg';

/**
 * Builds and returns an <li> element representing a single game card.
 *
 * @param {Object} game - Game data object from games.json
 * @param {string} game.id         - Unique slug identifier
 * @param {string} game.title      - Display title
 * @param {number} game.year       - Release year
 * @param {string} game.platform   - Platform name (e.g. "NES", "Arcade")
 * @param {string} game.genre      - Genre label (e.g. "Platform", "RPG")
 * @param {string} game.description - Short description paragraph
 * @param {string} game.coverImage  - Relative path to cover image
 * @returns {HTMLLIElement}
 */
export function createGameCard(game) {
  const { id, title, year, platform, genre, description, coverImage } = game;

  // --- Wrapper <li> ---
  const article = document.createElement('li');
  article.classList.add('game-card');
  article.setAttribute('role', 'listitem');

  // --- Cover image container ---
  const coverDiv = document.createElement('div');
  coverDiv.classList.add('game-card__cover');

  const img = document.createElement('img');
  // Use a tiny placeholder initially and lazy‑load the actual cover image.
  img.src = PLACEHOLDER_IMAGE;
  img.dataset.src = coverImage || PLACEHOLDER_IMAGE; // real source for lazy loading
  img.alt = `Cover art for ${title} (${year})`;
  img.width = 300;
  img.height = 400;
  // Native lazy‑loading as a fallback; IntersectionObserver will handle most cases.
  img.loading = 'lazy';
  img.decoding = 'async';

  // Fall back to placeholder if the image fails to load
  img.addEventListener('error', () => {
    if (img.src !== PLACEHOLDER_IMAGE) {
      img.src = PLACEHOLDER_IMAGE;
      img.alt = `Cover art unavailable for ${title}`;
    }
  });

  coverDiv.appendChild(img);

  // --- Card body ---
  const body = document.createElement('div');
  body.classList.add('game-card__body');

  // Title
  const titleEl = document.createElement('h3');
  titleEl.classList.add('game-card__title');
  titleEl.textContent = title;

  // Meta badges (year, platform, genre)
  const meta = document.createElement('div');
  meta.classList.add('game-card__meta');
  meta.setAttribute('aria-label', `${year} · ${platform} · ${genre}`);

  meta.appendChild(createBadge(String(year), 'year', 'Released'));
  meta.appendChild(createBadge(platform, 'platform', 'Platform'));
  meta.appendChild(createBadge(genre, 'genre', 'Genre'));

  // Description
  const descEl = document.createElement('p');
  descEl.classList.add('game-card__description');
  descEl.textContent = description;

  body.appendChild(titleEl);
  body.appendChild(meta);
  body.appendChild(descEl);

  article.appendChild(coverDiv);
  article.appendChild(body);

  // Favorite button
  const favBtn = document.createElement('button');
  favBtn.classList.add('favorite-btn');
  favBtn.setAttribute('aria-label', 'Mark as favorite');
  favBtn.innerHTML = '♥';
  // Set initial state
  if (isFavorite(id)) {
    favBtn.classList.add('favorited');
    favBtn.setAttribute('aria-pressed', 'true');
  } else {
    favBtn.setAttribute('aria-pressed', 'false');
  }
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(id);
    const nowFav = isFavorite(id);
    favBtn.classList.toggle('favorited', nowFav);
    favBtn.setAttribute('aria-pressed', nowFav ? 'true' : 'false');
  });
  // Append button to article (overlay on cover)
  article.appendChild(favBtn);

  return article;
}

/**
 * Creates a small badge <span> for a metadata value.
 *
 * @param {string} text      - The visible text
 * @param {string} modifier  - BEM modifier class (year | platform | genre)
 * @param {string} label     - Screen-reader label prefix
 * @returns {HTMLSpanElement}
 */
function createBadge(text, modifier, label) {
  const span = document.createElement('span');
  span.classList.add('game-card__badge', `game-card__badge--${modifier}`);
  span.textContent = text;
  // Provide meaningful context for screen readers
  span.setAttribute('aria-label', `${label}: ${text}`);
  return span;
}
