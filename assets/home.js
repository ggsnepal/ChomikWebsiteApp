(function(){
  // live status chip (uses the same /api/status as the status page; stays quiet if it fails)
  var chip=document.getElementById('live'), txt=document.getElementById('live-text'), sub=document.getElementById('live-sub');
  function fmtUp(s){var d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60);return d?d+'d '+h+'h':h?h+'h '+m+'m':m+'m'}
  if(chip&&window.fetch){
    fetch('/api/status',{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){
      var b=j&&j.bot; if(!j||!j.configured||!b){txt.textContent='Status page'; return}
      if(b.online){chip.classList.add('on'); txt.textContent='Chomik is online';
        sub.textContent=[b.latency_ms!=null?Math.round(b.latency_ms)+' ms':'',b.uptime_seconds!=null?'up '+fmtUp(b.uptime_seconds):''].filter(Boolean).join(' · ')}
      else{chip.classList.add('off'); txt.textContent='Chomik is offline right now'}
    }).catch(function(){txt.textContent='Status page'});
  }

  // game icons: one image in front, two faded behind it, cycling through all of them
  var stack=document.getElementById('games');
  if(stack){
    var slides=[].slice.call(stack.children), cur=0, timer=null;
    function place(){slides.forEach(function(el,i){el.setAttribute('data-pos',(i-cur+slides.length)%slides.length)})}
    place();
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
      var sio=new IntersectionObserver(function(es){es.forEach(function(e){
        if(e.isIntersecting){ if(!timer) timer=setInterval(function(){cur=(cur+1)%slides.length;place()},2600) }
        else if(timer){ clearInterval(timer); timer=null }
      })},{threshold:.2});
      sio.observe(stack);
    }
  }

  // gentle reveal on scroll
  var els=[].slice.call(document.querySelectorAll('.reveal'));
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});
  els.forEach(function(e){io.observe(e)});
})();
