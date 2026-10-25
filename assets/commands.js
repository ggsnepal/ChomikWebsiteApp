(function(){
  var data = window.CHOMIK_COMMANDS || [];
  var grid = document.getElementById('cmds'), count = document.getElementById('count'),
      input = document.getElementById('q'), chipsBox = document.getElementById('chips');
  var cats = ['All'].concat(Array.from(new Set(data.map(function(c){return c.category}))).sort());
  var state = {cat:'All', q:''};

  var params = new URLSearchParams(location.search);
  if(params.get('q')){ state.q = params.get('q'); input.value = state.q; }

  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]}); }

  function chips(){
    chipsBox.innerHTML = '';
    cats.forEach(function(c){
      var b = document.createElement('button'); b.type='button'; b.className = 'chip' + (state.cat===c?' on':''); b.textContent = c;
      b.onclick = function(){ state.cat = c; chips(); render(); };
      chipsBox.appendChild(b);
    });
  }

  function render(){
    var q = state.q.trim().toLowerCase();
    var list = data.filter(function(c){
      if(state.cat!=='All' && c.category!==state.cat) return false;
      if(!q) return true;
      return c.name.toLowerCase().indexOf(q)>-1 || c.description.toLowerCase().indexOf(q)>-1 ||
             c.category.toLowerCase().indexOf(q)>-1 || c.params.some(function(p){return p.name.toLowerCase().indexOf(q)>-1});
    });
    count.textContent = list.length + (list.length===1 ? ' command' : ' commands') + (q ? ' matching "' + state.q.trim() + '"' : '');
    if(!list.length){ grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><h3>nothing here yet</h3><p class="small">try a different word or pick another category.</p></div>'; return; }
    grid.innerHTML = list.map(function(c,i){
      var ps = c.params.length ? c.params.map(function(p){
        return '<div class="param"><b>' + esc(p.name) + '</b>' + (p.required?'<span class="req">required</span>':'') + (p.description?' &mdash; '+esc(p.description):'') + '</div>';
      }).join('') : '<div class="param">no options, just run it.</div>';
      return '<article class="cmd" tabindex="0" data-name="' + esc(c.name) + '" style="animation-delay:' + Math.min(i,20)*25 + 'ms">' +
        '<div class="top"><code>/' + esc(c.name) + '</code><span class="tag">' + esc(c.category) + '</span></div>' +
        '<p>' + esc(c.description) + '</p>' +
        '<div class="more">' + ps + '<button type="button" class="btn sm pink copy" style="margin-top:10px">copy command</button></div></article>';
    }).join('');
  }

  grid.addEventListener('click', function(e){
    var card = e.target.closest('.cmd'); if(!card) return;
    if(e.target.closest('.copy')){
      var text = '/' + card.dataset.name;
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function(){ window.toast('copied ' + text); }, function(){ window.toast(text); });
      return;
    }
    card.classList.toggle('open');
  });
  grid.addEventListener('keydown', function(e){
    if((e.key==='Enter'||e.key===' ') && e.target.classList.contains('cmd')){ e.preventDefault(); e.target.classList.toggle('open'); }
  });
  input.addEventListener('input', function(){ state.q = input.value; render(); });

  chips(); render();
})();
