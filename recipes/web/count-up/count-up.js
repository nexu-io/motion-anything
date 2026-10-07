/* count-up.js — motion-anything recipe · category: emphasis
 *
 * Animates [data-count] elements up to their target when they enter the viewport, once.
 * - data-count="10000"  (target)   data-count-suffix="+"   data-count-prefix="$"
 * - data-count-decimals="1"  for non-integer figures (4.9, 99.9%, $1.2M); default 0.
 * - Honors prefers-reduced-motion (sets the final value immediately).
 * - Uses an ease-out curve; updates textContent (no layout thrash with tabular figures).
 *
 * Usage:  <span data-count="10000" data-count-suffix="+">0</span>
 */
(function () {
  'use strict';

  function decimals(el) {
    return Math.min(Math.max(parseInt(el.getAttribute('data-count-decimals'), 10) || 0, 0), 20);
  }

  function format(n, prefix, suffix, d) {
    d = d || 0;
    return (prefix || '') +
      n.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d }) +
      (suffix || '');
  }

  function run(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var prefix = el.getAttribute('data-count-prefix') || '';
    var suffix = el.getAttribute('data-count-suffix') || '';
    var dur = parseInt(el.getAttribute('data-count-duration'), 10) || 900;
    var d = decimals(el);
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = format(target * eased, prefix, suffix, d);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function init() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    var reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) {
        el.textContent = format(parseFloat(el.getAttribute('data-count')) || 0,
          el.getAttribute('data-count-prefix') || '', el.getAttribute('data-count-suffix') || '', decimals(el));
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
