/* blur-text.js — text-kinetic · split words + stagger a blur→focus. Reduced-motion → instant.
 * Words are split inside inline children too (<em>, <strong>, <a>…), so the heading keeps its markup. */
(function(g){ 'use strict';
  function red(){ return g.matchMedia && g.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function split(el){ var i=0;
    (function walk(node){ Array.prototype.slice.call(node.childNodes).forEach(function(n){
      if(n.nodeType===1){ walk(n); return; } if(n.nodeType!==3) return; var frag=document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(function(p){ if(p===''){return;} if(/^\s+$/.test(p)){ if(!i){return;} var sp=document.createElement('span'); sp.className='bt-sp'; frag.appendChild(sp); return; }
        var w=document.createElement('span'); w.className='bt-w'; w.textContent=p; w.style.setProperty('--bt-d',(i*90)+'ms'); i++; frag.appendChild(w); });
      node.replaceChild(frag, n); }); })(el); }
  function init(){ var els=document.querySelectorAll('[data-blur-text]'); if(!els.length) return;
    els.forEach(split); if(red()){ els.forEach(function(e){ e.classList.add('in'); }); return; }
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ els.forEach(function(e){ e.classList.add('in'); }); }); }); }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded', init);
})(window);
