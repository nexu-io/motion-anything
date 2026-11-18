/* elastic-slider.js — feedback-delight · drag the track (or use the keys); springy fill + knob.
 * Writes --es-p / --es-x for the CSS, which moves transforms only. The track is a role="slider":
 * arrows ±1, PageUp/PageDown ±10, Home/End. Give it an aria-label. */
(function(g){ 'use strict';
  function attach(el){ if(el.__es) return; el.__es=1; var track=el.querySelector('.es-track'), fill=el.querySelector('.es-fill'), p=.4;
    if(fill.parentNode===track){ var rail=document.createElement('div'); rail.className='es-rail'; track.insertBefore(rail, fill); rail.appendChild(fill); } // clips the scaled fill to the track's rounded ends
    function render(){ el.style.setProperty('--es-p', p); el.style.setProperty('--es-x', (p*track.clientWidth)+'px'); track.setAttribute('aria-valuenow', Math.round(p*100)); }
    function set(v){ p=Math.max(0,Math.min(1,v)); render(); }
    function setX(clientX){ var r=track.getBoundingClientRect(); set((clientX-r.left)/r.width); }
    if(!track.hasAttribute('role')) track.setAttribute('role','slider'); if(!track.hasAttribute('tabindex')) track.tabIndex=0;
    track.setAttribute('aria-valuemin','0'); track.setAttribute('aria-valuemax','100');
    var drag=false; track.addEventListener('pointerdown', function(e){ drag=true; setX(e.clientX); track.setPointerCapture(e.pointerId); });
    track.addEventListener('pointermove', function(e){ if(drag) setX(e.clientX); }); track.addEventListener('pointerup', function(){ drag=false; }); track.addEventListener('pointercancel', function(){ drag=false; });
    track.addEventListener('keydown', function(e){ var d={ArrowRight:.01,ArrowUp:.01,ArrowLeft:-.01,ArrowDown:-.01,PageUp:.1,PageDown:-.1}[e.key];
      if(d!=null) set(p+d); else if(e.key==='Home') set(0); else if(e.key==='End') set(1); else return; e.preventDefault(); });
    if(g.ResizeObserver) new ResizeObserver(render).observe(track); else g.addEventListener('resize', render);
    render(); }
  function init(){ var els=document.querySelectorAll('.es'); for(var i=0;i<els.length;i++) attach(els[i]); }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded', init);
})(window);
