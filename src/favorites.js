// src/favorites.js
// Utility module for managing favorite games using localStorage.

const STORAGE_KEY = 'favorites';

// Use a storage abstraction that works in environments without localStorage (e.g., Node.js tests).
const storage = (typeof localStorage !== 'undefined') ? localStorage : {
  getItem: () => null,
  setItem: () => {},
};

// Load favorites from storage into a Set.
let favorites = new Set();
(function load() {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        favorites = new Set(arr);
      }
    }
  } catch (e) {
    console.error('Failed to load favorites from storage', e);
    favorites = new Set();
  }
})();

function save() {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
  } catch (e) {
    console.error('Failed to save favorites to storage', e);
  }
}

export function isFavorite(id) {
  return favorites.has(id);
}

export function toggleFavorite(id) {
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }
  save();
}

export function getFavorites() {
  // Return a new Set to avoid external mutation.
  return new Set(favorites);
}

/**
 * Initialise the "view favorites" toggle button.
 * @param {Function} renderCallback - Called with a boolean indicating whether to show only favorites.
 */
export function initFavoritesToggle(renderCallback) {
  const btn = document.getElementById('favorites-toggle');
  if (!btn) return;
  let showOnly = false;
  const update = () => {
    btn.setAttribute('aria-pressed', String(showOnly));
    btn.classList.toggle('active', showOnly);
  };
  btn.addEventListener('click', () => {
    showOnly = !showOnly;
    update();
    renderCallback(showOnly);
  });
  update();
}
