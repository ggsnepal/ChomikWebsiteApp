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

  // game icons: every couple of seconds the tiles shuffle into a new order (FLIP animation)
  var grid=document.getElementById('games');
  if(grid&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    var tiles=[].slice.call(grid.children), timer=null, busy=false;
    function shuffle(){
      if(busy||document.hidden)return;
      busy=true;
      var first=tiles.map(function(t){return t.getBoundingClientRect()});
      var before=tiles.slice(), order;
      do{ order=tiles.slice(); for(var i=order.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=order[i];order[i]=order[j];order[j]=x} }
      while(order.length>1&&order.every(function(t,i){return t===before[i]}));
      tiles=order; tiles.forEach(function(t){grid.appendChild(t)});
      before.forEach(function(t){
        var f=first[before.indexOf(t)], l=t.getBoundingClientRect();
        var dx=f.left-l.left, dy=f.top-l.top;
        if(!dx&&!dy)return;
        var tilt=(Math.random()*10-5).toFixed(1);
        t.style.zIndex=2;
        t.animate([
          {transform:'translate('+dx+'px,'+dy+'px) rotate(0deg)'},
          {transform:'translate('+(dx/2)+'px,'+(dy/2-14)+'px) rotate('+tilt+'deg) scale(1.06)',offset:.5},
          {transform:'none'}
        ],{duration:700,easing:'cubic-bezier(.34,1.3,.5,1)'}).onfinish=function(){t.style.zIndex=''};
      });
      setTimeout(function(){busy=false},760);
    }
    var gio=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){ if(!timer) timer=setInterval(shuffle,2400) }
      else if(timer){ clearInterval(timer); timer=null }
    })},{threshold:.2});
    gio.observe(grid);
  }

  // gentle reveal on scroll
  var els=[].slice.call(document.querySelectorAll('.reveal'));
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});
  els.forEach(function(e){io.observe(e)});
})();
