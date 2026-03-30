/**
 * lazyLoad.js
 *
 * Provides a simple IntersectionObserver‑based lazy‑loading utility for images.
 * Images should have their actual URL in a `data-src` attribute and a low‑cost
 * placeholder in `src`. When the image enters the viewport (or near it), the
 * real source is assigned, triggering the load.
 */

export function initLazyLoad(root = document) {
  const images = root.querySelectorAll('img[data-src]');
  if (images.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Assign the actual source and clean up
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    },
    {
      rootMargin: '200px', // start loading a bit before it appears
      threshold: 0.1,
    }
  );

  images.forEach((img) => observer.observe(img));
}
