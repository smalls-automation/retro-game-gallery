/**
 * filters.js
 *
 * Manages search and filter controls for the game gallery.
 * Provides utilities to populate dropdowns and filter the games array.
 */

/**
 * Populates a <select> element with unique sorted option values.
 * The first placeholder option is preserved; existing options after it are replaced.
 *
 * @param {HTMLSelectElement} selectEl - The select element to populate
 * @param {string[]} values            - Unique, sorted option values to add
 */
function populateSelect(selectEl, values) {
  while (selectEl.options.length > 1) {
    selectEl.remove(1);
  }
  for (const value of values) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    selectEl.appendChild(option);
  }
}

/**
 * Extracts unique sorted string values for a given field from the games array.
 *
 * @param {Object[]} games - Full games array
 * @param {string}   field - Property name to extract values from
 * @returns {string[]}
 */
function uniqueSorted(games, field) {
  return [...new Set(games.map((g) => g[field]))].sort();
}

/**
 * Filters the games array based on a text query and dropdown selections.
 * All active criteria must match (AND logic).
 *
 * @param {Object[]} games    - Full games array
 * @param {string}   query    - Text search query (case-insensitive match on title and description)
 * @param {string}   platform - Selected platform value, or '' for all
 * @param {string}   genre    - Selected genre value, or '' for all
 * @returns {Object[]} Filtered subset of games
 */
export function filterGames(games, { query, platform, genre }) {
  const q = query.trim().toLowerCase();
  return games.filter((game) => {
    if (platform && game.platform !== platform) return false;
    if (genre && game.genre !== genre) return false;
    if (
      q &&
      !game.title.toLowerCase().includes(q) &&
      !game.description.toLowerCase().includes(q)
    ) {
      return false;
    }
    return true;
  });
}

/**
 * Initialises the filter bar controls, populates the platform and genre
 * dropdowns from the provided games data, and wires up real-time event
 * listeners that invoke onFilterChange whenever any control changes.
 *
 * @param {Object[]} games          - Full games array (used to derive dropdown options)
 * @param {Function} onFilterChange - Callback invoked with { query, platform, genre }
 *                                    whenever any filter control changes
 */
export function initFilters(games, onFilterChange) {
  const searchInput = document.getElementById('search-input');
  const platformSelect = document.getElementById('platform-filter');
  const genreSelect = document.getElementById('genre-filter');

  if (!searchInput || !platformSelect || !genreSelect) return;

  populateSelect(platformSelect, uniqueSorted(games, 'platform'));
  populateSelect(genreSelect, uniqueSorted(games, 'genre'));

  function notifyChange() {
    onFilterChange({
      query: searchInput.value,
      platform: platformSelect.value,
      genre: genreSelect.value,
    });
  }

  searchInput.addEventListener('input', notifyChange);
  platformSelect.addEventListener('change', notifyChange);
  genreSelect.addEventListener('change', notifyChange);
}
