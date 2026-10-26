(function(){
  var $=function(id){return document.getElementById(id)};
  var banner=$('st-banner'), bannerText=$('st-banner-text'), updated=$('st-updated');
  var pill=$('st-bot-pill'), lat=$('st-latency'), upt=$('st-uptime'), av=$('st-avail'), hist=$('st-hist'), seen=$('st-seen'), rbx=$('st-rbx');
  var LABEL={operational:'Operational',degraded:'Degraded',down:'Down'}, CLS={operational:'',degraded:'is-warn',down:'is-bad'};

  function setBanner(kind,text){banner.className='st-banner '+kind; bannerText.textContent=text}
  function setPill(el,cls,text){el.className='pill '+cls; el.textContent=text}
  function fmtUp(s){
    if(s==null) return '-';
    var d=Math.floor(s/86400), h=Math.floor(s%86400/3600), m=Math.floor(s%3600/60);
    return d? d+'d '+h+'h '+m+'m' : h? h+'h '+m+'m' : m+'m';
  }
  function ago(ts,now){
    if(!ts) return '';
    var s=Math.max(0,now-ts);
    return s<90? 'just now' : s<5400? Math.round(s/60)+' minutes ago' : fmtUp(s)+' ago';
  }
  function renderHist(h){
    hist.textContent='';
    var total=144, pad=Math.max(0,total-h.length), i, el;
    for(i=0;i<pad;i++){el=document.createElement('i'); el.className='na'; hist.appendChild(el)}
    h.slice(-total).forEach(function(ok){el=document.createElement('i'); if(!ok) el.className='off'; hist.appendChild(el)});
    var up=h.filter(Boolean).length;
    hist.setAttribute('aria-label','Availability over the last 24 hours: '+up+' of '+h.length+' ten-minute periods online');
  }
  function render(d){
    var b=d.bot, bad=d.roblox.filter(function(r){return r.status!=='operational'}), allDown=bad.length===d.roblox.length;
    if(!d.configured){
      setPill(pill,'is-load','Not set up'); lat.textContent=upt.textContent=av.textContent='-'; renderHist([]);
      seen.textContent="Chomik status isn't configured yet.";
      setBanner('is-load',"Chomik status isn't configured yet");
    } else if(!b.online){
      setPill(pill,'is-bad','Offline'); lat.textContent='-'; upt.textContent='-';
      seen.textContent=b.last_seen? 'Last seen '+ago(b.last_seen,d.now)+'.' : 'No heartbeat received yet.';
      setBanner('is-bad','Chomik is offline');
    } else {
      setPill(pill,'','Online'); lat.textContent=b.latency_ms+' ms'; upt.textContent=fmtUp(b.uptime_seconds);
      seen.textContent='Last heartbeat '+ago(b.last_seen,d.now)+'.';
      setBanner(bad.length?'is-warn':'', bad.length? (allDown?'Roblox APIs are down':'Some Roblox APIs are having problems') : 'Chomik is online');
    }
    if(d.configured){ av.textContent=b.availability_24h==null?'-':b.availability_24h+'%'; renderHist(b.history||[]) }
    if(d.configured && b.online && !bad.length) bannerText.textContent='Chomik is online and Roblox APIs are working';
    rbx.textContent='';
    d.roblox.forEach(function(r){
      var li=document.createElement('li'), n=document.createElement('b'), ms=document.createElement('span'), p=document.createElement('span');
      n.textContent=r.name; ms.className='ms'; ms.textContent=r.ms==null?'no response':r.ms+' ms'; p.className='pill '+CLS[r.status]; p.textContent=LABEL[r.status];
      li.appendChild(n); li.appendChild(ms); li.appendChild(p); rbx.appendChild(li);
    });
    updated.textContent=new Date().toLocaleTimeString();
  }
  function fail(){
    setBanner('is-bad','Status temporarily unavailable');
    setPill(pill,'is-load','Unknown');
  }
  function load(){
    var c=window.AbortController?new AbortController():null, t=setTimeout(function(){c&&c.abort()},15000);
    fetch('/api/status',{cache:'no-store',signal:c?c.signal:undefined})
      .then(function(r){if(!r.ok) throw 0; return r.json()})
      .then(function(d){if(!d||!d.bot||!Array.isArray(d.roblox)) throw 0; render(d)})
      .catch(fail)
      .then(function(){clearTimeout(t)});
  }
  load(); setInterval(load,30000);
})();
