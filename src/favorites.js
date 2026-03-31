/**
 * favorites.js
 *
 * Simple utility module for persisting a list of favorite game IDs in
 * localStorage. Exposes helpers to query and toggle favorite state.
 */

const STORAGE_KEY = 'favoriteGames';

/** Retrieve the array of favorite IDs from localStorage. */
export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    // If parsing fails or storage is unavailable, fallback to empty array
    return [];
  }
}

/** Check whether a given game ID is marked as a favorite. */
export function isFavorite(id) {
  const favs = getFavorites();
  return favs.includes(id);
}

/** Toggle the favorite state for a game ID. Returns the new state (true if now favorited). */
export function toggleFavorite(id) {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  let newState;
  if (idx >= 0) {
    favs.splice(idx, 1);
    newState = false;
  } else {
    favs.push(id);
    newState = true;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  } catch (e) {
    // ignore storage errors
  }
  return newState;
}

/** Replace the entire favorites list (used for resetting, etc.). */
export function setFavorites(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    // ignore errors
  }
}
