/**
 * main.js
 *
 * Application entry point.
 * Bootstraps the gallery and sets up minor UI details (footer year).
 */

import './style.css';
import { initGallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', () => {
  // Set footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Initialise gallery grid
  const gridEl = document.getElementById('game-grid');
  if (gridEl) {
    initGallery(gridEl);
  }
});
