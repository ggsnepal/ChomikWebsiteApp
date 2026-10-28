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

  // ---- race demo: solving a cipher with Chomik vs a pile of browser tabs ----
  var race=document.getElementById('race');
  if(race){
    var $=function(id){return document.getElementById(id)};
    var chat=$('chat'), typing=$('typing'), typed=$('typed'), tabstrip=$('tabstrip'), addr=$('addr'), ptext=$('ptext'), pbar=$('pbar');
    var tC=$('t-chomik'), tT=$('t-tabs'), ph=typing.querySelector('.ph');
    var SPEED=4, timers=[], clock=null, t0=0, stopC=null, stopT=null;
    var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    function at(ms,fn){timers.push(setTimeout(fn,ms))}
    function fmt(ms){var s=Math.floor(ms*SPEED/1000);return Math.floor(s/60)+':'+('0'+s%60).slice(-2)}
    function el(tag,cls,text){var e=document.createElement(tag); if(cls)e.className=cls; if(text!=null)e.textContent=text; return e}
    function msg(name,color,bodyNodes,avatarImg){
      var m=el('div','msg'), av=el('div','av'); av.style.setProperty('--c',color);
      if(avatarImg){var im=el('img'); im.src='assets/chomik.webp'; im.alt=''; av.appendChild(im)} else av.textContent=name[0];
      var b=el('div','body'); b.appendChild(el('b',null,name)); bodyNodes.forEach(function(n){b.appendChild(n)});
      m.appendChild(av); m.appendChild(b); chat.insertBefore(m,typing); return m;
    }
    function code(t){return el('code',null,t)}
    function out(title,sub){var d=el('div','card-out',title); d.appendChild(el('small',null,sub)); return d}
    function reset(){
      timers.forEach(clearTimeout); timers=[]; clearInterval(clock);
      [].slice.call(chat.querySelectorAll('.msg')).forEach(function(n){n.remove()});
      typed.textContent=''; ph.classList.remove('hide'); tabstrip.textContent=''; addr.textContent=' ';
      ptext.textContent='Time to start searching…'; pbar.style.transition='none'; pbar.style.width='0';
      tC.textContent=tT.textContent='0:00'; tC.classList.remove('done'); tT.classList.remove('done'); stopC=stopT=null;
    }
    function tab(title,url,text,pct){
      [].slice.call(tabstrip.children).forEach(function(t){t.classList.remove('on')});
      var t=el('div','tab on',title); tabstrip.appendChild(t);
      addr.textContent=url; ptext.textContent=text; pbar.style.transition='none'; pbar.style.width='0'; void pbar.offsetWidth;
      pbar.style.transition='width .9s linear'; pbar.style.width=pct+'%';
    }
    function final(){
      reset();
      var u=el('span',null,''); u.appendChild(code('/cipher decode')); msg('You','#4a90d9',[u]);
      msg('Chomik','#f28c28',[out('The code is 4271','Caesar cipher, shift 3')],true);
      tC.textContent='0:09'; tC.classList.add('done'); ph.classList.add('hide');
      [['Google','google.com'],['Cipher ID','dcode.fr'],['Decoder','cryptii.com'],['ROT tool','rot13.com']].forEach(function(x){tab(x[0],x[1],'',100)});
      ptext.textContent='The code is 4271'; tT.textContent='0:44'; tT.classList.add('done');
    }
    function play(){
      reset(); t0=Date.now();
      clock=setInterval(function(){var d=Date.now()-t0; if(!stopC)tC.textContent=fmt(d); if(!stopT)tT.textContent=fmt(d)},200);
      // Chomik lane
      var cmd='/cipher decode', i=0;
      for(i=0;i<cmd.length;i++)(function(n){at(350+n*55,function(){ph.classList.add('hide'); typed.textContent=cmd.slice(0,n+1)})})(i);
      at(1350,function(){typed.textContent=''; var u=el('span'); u.appendChild(code('/cipher decode')); u.appendChild(document.createTextNode(' type: Identify')); msg('You','#4a90d9',[u])});
      at(1900,function(){msg('Chomik','#f28c28',[out('Caesar cipher, shift 3','Detected automatically')],true)});
      at(2300,function(){msg('Chomik','#f28c28',[out('The code is 4271','Decoded')],true); stopC=Date.now()-t0; tC.textContent=fmt(stopC); tC.classList.add('done')});
      // Tabs lane
      at(300, function(){tab('Google','google.com','Searching "what cipher is this"…',35)});
      at(2200,function(){tab('Cipher ID','dcode.fr/cipher-identifier','Pasting the text into an identifier…',45)});
      at(4300,function(){tab('Decoder','cryptii.com','Trying a Caesar decoder…',55)});
      at(6400,function(){tab('Shift 1?','caesar-cipher.com','Wrong shift. Try the next one…',70)});
      at(8500,function(){tab('ROT tool','rot13.com','Shift 3 looks readable…',90)});
      at(10600,function(){ptext.textContent='The code is 4271'; pbar.style.width='100%'; stopT=Date.now()-t0; tT.textContent=fmt(stopT); tT.classList.add('done')});
      at(15500,play);
    }
    if(reduce||!('IntersectionObserver' in window)) final();
    else {
      var seen=false, vis=new IntersectionObserver(function(es){es.forEach(function(e){
        if(e.isIntersecting&&!seen){seen=true; play()} else if(!e.isIntersecting&&seen){seen=false; reset()}})},{threshold:.35});
      vis.observe(race);
    }
  }
  // gentle reveal on scroll
  var els=[].slice.call(document.querySelectorAll('.reveal'));
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});
  els.forEach(function(e){io.observe(e)});
})();
