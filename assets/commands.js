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
      var ps=c.params.length?c.params.map(function(p){return '<div class="param"><b>'+esc(p.name)+'</b>'+(p.required?'<span class="req">required</span>':'')+(p.description?' &mdash; '+esc(p.description):'')+'</div>'}).join(''):'<div class="param">no options, just run it.</div>';
      return '<article class="cmd c-'+slug(c.category)+'" tabindex="0" data-name="'+esc(c.name)+'" style="animation-delay:'+Math.min(i,18)*22+'ms">'+
        '<span class="ico">'+svg(icon(c))+'</span><div><div class="top"><code>/'+esc(c.name)+'</code><span class="tag">'+esc(c.category)+'</span></div></div>'+
        '<p>'+esc(c.description)+'</p><div class="more">'+ps+'<button type="button" class="btn sm copy" style="margin-top:10px">'+svg('copy')+'copy command</button></div></article>';
    }).join('');
  }
  grid.addEventListener('click',function(e){
    var card=e.target.closest('.cmd'); if(!card) return;
    if(e.target.closest('.copy')){var text='/'+card.dataset.name;
      (navigator.clipboard?navigator.clipboard.writeText(text):Promise.reject()).then(function(){window.toast('copied '+text)},function(){window.toast(text)}); return}
    card.classList.toggle('open');
  });
  grid.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('cmd')){e.preventDefault();e.target.classList.toggle('open')}});
  input.addEventListener('input',function(){state.q=input.value;render()});
  chips(); render();
})();
