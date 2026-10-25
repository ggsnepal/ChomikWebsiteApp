(function(){
  var root=document.documentElement, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  // theme toggle
  var t=document.getElementById('theme');
  if(t) t.addEventListener('click',function(){
    var d=root.getAttribute('data-theme')==='dark'?'light':'dark'; root.setAttribute('data-theme',d);
    try{localStorage.setItem('theme',d)}catch(e){}
  });
  // click animation on buttons / chips / tiles
  var colors=['#f28c28','#eab72c','#4fa56a','#4a90d9','#c08a55'];
  document.addEventListener('click',function(e){
    var el=e.target.closest('.btn,.chip,.tile,.cloud'); if(!el||reduce) return;
    if(el.classList.contains('btn')){el.classList.remove('squish'); void el.offsetWidth; el.classList.add('squish')}
    var r=el.getBoundingClientRect(), x=e.clientX||r.left+r.width/2, y=e.clientY||r.top+r.height/2;
    for(var i=0;i<8;i++){
      var s=document.createElement('i'); s.className='spark'; s.style.left=x+'px'; s.style.top=y+'px';
      s.style.background=colors[i%colors.length]; var a=Math.PI*2*i/8+Math.random()*.5, d=26+Math.random()*26;
      s.style.setProperty('--dx',Math.cos(a)*d+'px'); s.style.setProperty('--dy',Math.sin(a)*d+'px');
      document.body.appendChild(s); setTimeout(function(n){return function(){n.remove()}}(s),700);
    }
  });
  // announcement cloud
  var c=document.getElementById('cloud');
  if(c){
    try{ if(sessionStorage.getItem('cloudGone')) c.remove(); }catch(e){}
    c.addEventListener('click',function(){
      c.classList.add('out'); try{sessionStorage.setItem('cloudGone','1')}catch(e){}
      setTimeout(function(){c.remove()},380);
    });
  }
  window.toast=function(m){var n=document.querySelector('.toast');if(!n){n=document.createElement('div');n.className='toast';
    n.style.cssText='position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:var(--green);color:#fff;font-weight:800;padding:9px 20px;border-radius:999px;z-index:1000;transition:opacity .3s';document.body.appendChild(n)}
    n.textContent=m;n.style.opacity=1;clearTimeout(n._h);n._h=setTimeout(function(){n.style.opacity=0},1600)};
})();
