(function(){
  var data=window.CHOMIK_COMMANDS||[];
  var grid=document.getElementById('cmds'), count=document.getElementById('count'), input=document.getElementById('q'), chipsBox=document.getElementById('chips');
  var CAT={Roblox:'cube',Reports:'flag',Say:'chat',Fun:'sparkle',Games:'gamepad',Image:'image',Tools:'sliders',Social:'globe',Notifier:'bell',General:'gear',Other:'cube'};
  var KEY=[['avatar','user'],['headshot','user'],['bust','user'],['outfits','user'],['user','user'],['username','id'],['names','id'],['display','id'],['id','id'],['resolve','id'],['accountage','clock'],
    ['friends','heart'],['followers','heart'],['followings','heart'],['mutuals','users'],['group','users'],['groups','users'],['game','gamepad'],['games','gamepad'],['universe','gamepad'],['subplaces','gamepad'],['gamepass','gamepad'],
    ['report','flag'],['reports','flag'],['say','chat'],['attach','chat'],['support','chat'],['cipher','lock'],['bruteforce','link'],['subdomain','link'],['settings','gear'],['help','search'],['invite','plus'],['wordle','gamepad'],['wordbomb','gamepad']];
  function icon(c){var toks=c.name.split(/[ -]/);for(var i=0;i<KEY.length;i++){if(toks.indexOf(KEY[i][0])>-1)return KEY[i][1]}return CAT[c.category]||'cube'}
  function slug(s){return s.toLowerCase().replace(/[^a-z]/g,'')}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function svg(n){return '<svg class="i" aria-hidden="true"><use href="#i-'+n+'"/></svg>'}
  var cats=Array.from(new Set(data.map(function(c){return c.category}))).sort();
  var params=new URLSearchParams(location.search);
  var state={cat:cats.indexOf(params.get('cat'))>-1?params.get('cat'):'All', q:params.get('q')||''}; input.value=state.q;

  function chips(){
    chipsBox.innerHTML='';
    ['All'].concat(cats).forEach(function(c){
      var b=document.createElement('button'); b.type='button'; b.className='chip c-'+slug(c)+(state.cat===c?' on':'');
      b.innerHTML=(c==='All'?svg('search'):svg(CAT[c]||'cube'))+esc(c); b.onclick=function(){state.cat=c;chips();render()}; chipsBox.appendChild(b);
    });
  }
  function render(){
    var q=state.q.trim().toLowerCase();
    var list=data.filter(function(c){
      if(state.cat!=='All'&&c.category!==state.cat) return false; if(!q) return true;
      return c.name.toLowerCase().indexOf(q)>-1||c.description.toLowerCase().indexOf(q)>-1||c.category.toLowerCase().indexOf(q)>-1||c.params.some(function(p){return p.name.toLowerCase().indexOf(q)>-1});
    });
    count.textContent=list.length+(list.length===1?' command':' commands')+(q?' matching "'+state.q.trim()+'"':'');
    if(!list.length){grid.innerHTML='<div class="empty"><h3>nothing here yet</h3><p class="fine">try a different word or pick another category.</p></div>';return}
    grid.innerHTML=list.map(function(c,i){
      return '<article class="cmd c-'+slug(c.category)+'" role="button" tabindex="0" data-i="'+data.indexOf(c)+'" style="animation-delay:'+Math.min(i,18)*22+'ms">'+
        '<span class="ico">'+svg(icon(c))+'</span><div class="body"><div class="top"><code>/'+esc(c.name)+'</code><span class="tag">'+esc(c.category)+'</span></div>'+
        '<p>'+esc(c.description)+'</p></div></article>';
    }).join('');
  }

  // ---- details modal ----
  var modal=document.createElement('div'); modal.className='modal'; modal.setAttribute('aria-hidden','true');
  modal.innerHTML='<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="m-title"></div>'; document.body.appendChild(modal);
  var sheet=modal.firstChild, lastFocus=null, closing=null;
  function usage(c){return '/'+c.name+c.params.map(function(p){return p.required?' '+p.name+':<value>':' ['+p.name+':<value>]'}).join('')}
  function openModal(c){
    clearTimeout(closing); lastFocus=document.activeElement;
    var req=c.params.filter(function(p){return p.required}), opt=c.params.filter(function(p){return !p.required});
    function plist(l){return l.map(function(p){return '<div class="prm"><b>'+esc(p.name)+'</b><span class="'+(p.required?'req':'opt')+'">'+(p.required?'required':'optional')+'</span>'+(p.description?'<p>'+esc(p.description)+'</p>':'')+'</div>'}).join('')}
    sheet.className='sheet c-'+slug(c.category);
    sheet.innerHTML='<div class="sheet-head"><span class="ico">'+svg(icon(c))+'</span><div><h2 id="m-title">/'+esc(c.name)+'</h2><span class="tag">'+esc(c.category)+'</span></div>'+
      '<button type="button" class="x-btn" aria-label="Close">'+svg('x')+'</button></div><div class="sheet-body">'+
      '<p class="desc">'+esc(c.description)+'</p><h3>Usage</h3><code class="usage">'+esc(usage(c))+'</code>'+
      (c.prefix&&c.prefix.length?'<h3>Prefix version</h3><code class="usage">'+c.prefix.map(function(p){return esc(','+p)}).join('   ')+'</code>':'')+
      (c.params.length?'<h3>Options</h3>'+plist(req)+plist(opt):'<h3>Options</h3><p class="desc" style="margin:0">No options, just run it.</p>')+
      '<div class="sheet-actions"><button type="button" class="btn copy">'+svg('copy')+'Copy command</button>'+
      '<button type="button" class="btn blue more-cat">'+svg('search')+'More in '+esc(c.category)+'</button></div></div>';
    sheet.querySelector('.copy').onclick=function(){var t='/'+c.name;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){window.toast('copied '+t)},function(){window.toast(t)})};
    sheet.querySelector('.more-cat').onclick=function(){state.cat=c.category;state.q='';input.value='';chips();render();closeModal()};
    sheet.querySelector('.x-btn').onclick=closeModal; sheet.querySelector('.sheet-body').scrollTop=0;
    modal.setAttribute('aria-hidden','false'); document.body.classList.add('lock');
    requestAnimationFrame(function(){modal.classList.add('show'); sheet.querySelector('.x-btn').focus({preventScroll:true})});
  }
  function closeModal(){
    modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('lock');
    if(lastFocus&&lastFocus.focus) lastFocus.focus();
  }
  modal.addEventListener('click',function(e){if(e.target===modal) closeModal()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('show')) closeModal()});
  grid.addEventListener('click',function(e){var card=e.target.closest('.cmd'); if(card) openModal(data[+card.dataset.i])});
  grid.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('cmd')){e.preventDefault();openModal(data[+e.target.dataset.i])}});
  input.addEventListener('input',function(){state.q=input.value;render()});
  chips(); render();
})();
