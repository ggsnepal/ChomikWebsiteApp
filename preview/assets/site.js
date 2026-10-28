(function(){
  var root=document.documentElement, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ICONS='/preview/assets/icons.svg';
  // theme toggle
  var t=document.getElementById('theme');
  if(t) t.addEventListener('click',function(){
    var d=root.getAttribute('data-theme')==='dark'?'light':'dark'; root.setAttribute('data-theme',d);
    try{localStorage.setItem('theme',d)}catch(e){}
  });
  // toast
  window.toast=function(m){var n=document.querySelector('.toast');if(!n){n=document.createElement('div');n.className='toast';n.setAttribute('role','status');document.body.appendChild(n)}
    n.textContent=m;n.style.opacity=1;clearTimeout(n._h);n._h=setTimeout(function(){n.style.opacity=0},1700)};
  // mascot: click to feed a seed, cheeks puff
  var pet=document.getElementById('pet'), count=document.getElementById('pet-n'), n=0;
  if(pet){
    var box=pet.parentNode;
    pet.addEventListener('click',function(){
      n++; if(count) count.textContent=n;
      pet.classList.remove('puff'); void pet.offsetWidth; pet.classList.add('puff');
      if(reduce) return;
      for(var i=0;i<7;i++){
        var f=document.createElement('span'); f.className='fly';
        f.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c3.6 2.6 5.6 6.6 5.6 10.4 0 4.2-2.4 8.1-5.6 8.6-3.2-.5-5.6-4.4-5.6-8.6C6.4 9.1 8.4 5.1 12 2.5z"/></svg>';
        var a=-Math.PI/2+(Math.random()-.5)*2.6, d=90+Math.random()*80;
        f.style.left='46%'; f.style.top='46%';
        f.style.setProperty('--dx',Math.cos(a)*d+'px'); f.style.setProperty('--dy',Math.sin(a)*d+'px'); f.style.setProperty('--rot',(Math.random()*360-180)+'deg');
        box.appendChild(f); setTimeout(function(x){return function(){x.remove()}}(f),950);
      }
    });
  }
  // live status chip (home page)
  var chip=document.getElementById('live'), txt=document.getElementById('live-text'), sub=document.getElementById('live-sub');
  function fmtUp(s){var d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60);return d?d+'d '+h+'h':h?h+'h '+m+'m':m+'m'}
  if(chip&&window.fetch){
    fetch('/api/status',{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){
      var b=j&&j.bot; if(!j||!j.configured||!b){txt.textContent='See live status'; return}
      if(b.online){chip.classList.add('on'); txt.textContent='Chomik is online';
        sub.textContent=[b.latency_ms!=null?Math.round(b.latency_ms)+' ms':'',b.uptime_seconds!=null?'up '+fmtUp(b.uptime_seconds):''].filter(Boolean).join(', ')}
      else{chip.classList.add('off'); txt.textContent='Chomik is offline right now'}
    }).catch(function(){txt.textContent='See live status'});
  }
})();
