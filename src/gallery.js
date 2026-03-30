/**
 * gallery.js
 *
 * Fetches game data and renders the responsive gallery grid.
 * Wires up search and filter controls for real-time filtering.
 */

import { createGameCard } from './gameCard.js';
import { initFilters, filterGames } from './filters.js';
import { initLazyLoad } from './lazyLoad.js';

const GAMES_URL = '/games.json';

/**
 * Initialises the gallery by fetching game data and rendering all cards
 * into the provided grid element. Also sets up search and filter controls
 * so the displayed games update in real time as the user types or selects.
 *
 * @param {HTMLElement} gridEl - The container element for the game cards
 * @returns {Promise<void>}
 */
export async function initGallery(gridEl) {
  try {
    const games = await fetchGames();

    // Initial render — show all games
    renderGallery(gridEl, games);

    // Wire up filter controls; re-render on any change
    initFilters(games, (filterState) => {
      const filtered = filterGames(games, filterState);
      renderGallery(gridEl, filtered);
    });
  } catch (err) {
    console.error('[Gallery] Failed to load games:', err);
    renderError(gridEl, 'Sorry, we could not load the game collection. Please try refreshing the page.');
  }
}

/**
 * Fetches and parses the games JSON data file.
 *
 * @returns {Promise<Object[]>}
 */
async function fetchGames() {
  const response = await fetch(GAMES_URL);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} — ${response.statusText}`);
  }
  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('games.json is empty or not an array');
  }
  return data;
}

/**
 * Clears the grid and renders a card for every game in the provided array.
 * Shows a friendly "no results" message when the array is empty (e.g. after filtering).
 *
 * @param {HTMLElement} gridEl
 * @param {Object[]} games
 */
function renderGallery(gridEl, games) {
  // Remove loading placeholder or previous cards
  gridEl.innerHTML = '';
  // Mark as no longer busy
  gridEl.setAttribute('aria-busy', 'false');

  if (games.length === 0) {
    const p = document.createElement('p');
    p.classList.add('no-results-message');
    p.textContent = 'No games match your search or filters.';
    gridEl.appendChild(p);
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const game of games) {
    fragment.appendChild(createGameCard(game));
  }
  gridEl.appendChild(fragment);

  // Initialize lazy loading for newly added images
  initLazyLoad(gridEl);
}

/**
 * Replaces grid contents with a user-facing error message.
 *
 * @param {HTMLElement} gridEl
 * @param {string} message
 */
function renderError(gridEl, message) {
  gridEl.innerHTML = '';
  gridEl.setAttribute('aria-busy', 'false');

  const p = document.createElement('p');
  p.classList.add('error-message');
  p.setAttribute('role', 'alert');
  p.textContent = message;
  gridEl.appendChild(p);
}
