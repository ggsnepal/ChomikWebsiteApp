/* shared helpers: one color per category + command groups */
(function(){
  var CAT={Roblox:'#f58f2b',Fun:'#ff6fa5',Tools:'#4cc98a',Games:'#c8d94a',Social:'#2fc9c0',Image:'#5aa7ff',AI:'#a78bfa',General:'#9fb0c8',Archived:'#ee5a4f'};
  window.CH={
    data:window.CHOMIK_COMMANDS||[],
    col:function(c){return CAT[c]||'var(--ink)'},
    red:'#ee5a4f',
    cmdColor:function(c){return c.archived?CH.red:CH.col(c.category)},
    el:function(t,cls,txt){var e=document.createElement(t); if(cls)e.className=cls; if(txt!=null)e.textContent=txt; return e},
    q:function(s,r){return (r||document).querySelector(s)},
    byCat:function(cs){return CH.data.filter(function(x){return !x.archived&&cs.indexOf(x.category)>-1})},
    /* how commands are grouped on the home + features pages */
    groups:[
      {id:'roblox',cats:['Roblox'],c:'var(--orange)'},
      {id:'tools',cats:['Tools'],c:'var(--green)'},
      {id:'image',cats:['Image'],c:'var(--blue)'},
      {id:'ai',cats:['AI'],c:'var(--blue)'},
      {id:'fun',cats:['Fun','Games'],c:'var(--orange)'},
      {id:'basics',cats:['Social','General'],c:'var(--green)'}
    ],
    link:function(name){return '/commands.html#'+encodeURIComponent(name)}
  };
})();
