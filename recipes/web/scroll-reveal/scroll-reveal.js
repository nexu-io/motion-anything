/* scroll-reveal.js — motion-anything recipe · category: scroll-reveal
 *
 * Reveals [data-reveal] elements as they scroll into view, once.
 * - Content rests visible: an element is primed (hidden) only while it is still below the fold and
 *   about to arrive, then revealed on entry. Above-the-fold content is never hidden or delayed, and
 *   nothing stays invisible if this script or the observer never runs.
 * - Respects prefers-reduced-motion (nothing is primed; content simply shows).
 * - Optional per-element stagger via data-reveal-delay="80" (milliseconds).
 * - Cleans up: unobserves each element once it is primed / revealed.
 *
 * Usage:
 *   <section data-reveal>…</section>
 *   <li data-reveal data-reveal-delay="80">…</li>
 */
(function () {
  'use strict';

  function init() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    var reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return; // content is already visible

    els.forEach(function (el) {
      var d = el.getAttribute('data-reveal-delay');
      if (d) el.style.setProperty('--reveal-delay', parseInt(d, 10) + 'ms');
    });

    // Prime: hide an element just before it scrolls in, while it is still below the fold.
    var prime = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          if (entry.boundingClientRect.top > window.innerHeight && !el.classList.contains('is-in')) {
            el.classList.add('is-primed');
          }
          prime.unobserve(el);
        });
      },
      { rootMargin: '0px 0px 35% 0px' }
    );

    // Reveal: once it is in view, let it rise in (a no-op for elements that were never primed).
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    els.forEach(function (el) { prime.observe(el); io.observe(el); });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
