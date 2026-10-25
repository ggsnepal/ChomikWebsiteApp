// bubbles on click, copy toast, shared bits
(function(){
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('pointerdown', function(e){
    if(reduce) return;
    for(var i=0;i<7;i++){
      var b=document.createElement('span'); b.className='bubble';
      var s=10+Math.random()*16; b.style.width=b.style.height=s+'px';
      b.style.left=e.clientX+'px'; b.style.top=e.clientY+'px';
      b.style.setProperty('--dx',(Math.random()*90-45)+'px'); b.style.setProperty('--dy',(-30-Math.random()*70)+'px');
      document.body.appendChild(b); setTimeout(function(x){return function(){x.remove()}}(b),850);
    }
  });
  window.toast = function(msg){
    var t=document.querySelector('.toast'); if(!t){t=document.createElement('div'); t.className='toast'; document.body.appendChild(t)}
    t.textContent=msg; t.classList.add('show'); clearTimeout(t._h); t._h=setTimeout(function(){t.classList.remove('show')},1700);
  };
  var m=document.querySelector('.mascot img');
  if(m) m.addEventListener('click', function(){ window.toast('squeak!'); });
})();
