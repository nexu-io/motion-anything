/* rotating-text.js — text-kinetic · cycles data-words in place: the word rises out, the next rises in.
 * Reduced-motion → static (the first word stays; no auto-updating text). Pauses while off screen or hidden. */
(function(g){ 'use strict';
  function red(){ return g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function attach(el){ if(el.__rot) return; el.__rot=1; var words=(el.getAttribute('data-words')||el.textContent).split('|'); var i=0, seen=true;
    el.textContent=''; var w=document.createElement('span'); w.className='rot-w'; w.textContent=words[0].trim(); el.appendChild(w);
    if(g.IntersectionObserver) new IntersectionObserver(function(es){ seen=es[0].isIntersecting; }).observe(el);
    setInterval(function(){ if(red() || !seen || document.hidden) return; i=(i+1)%words.length; el.classList.add('swap');
      setTimeout(function(){ w.textContent=words[i].trim(); el.classList.remove('swap'); el.classList.add('enter'); void w.offsetWidth; el.classList.remove('enter'); }, 460); }, 2200); }
  function init(){ var els=document.querySelectorAll('.rot'); for(var i=0;i<els.length;i++) attach(els[i]); }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded', init);
})(window);
