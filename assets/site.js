/* shared helpers: category colors (orange / green / blue only) + command groups */
(function(){
  var CAT={Roblox:'var(--orange)',Fun:'var(--orange)',Tools:'var(--green)',Games:'var(--green)',Social:'var(--green)',Image:'var(--blue)',AI:'var(--blue)',General:'var(--blue)'};
  window.CH={
    data:window.CHOMIK_COMMANDS||[],
    col:function(c){return CAT[c]||'var(--ink)'},
    red:'#ee5a4f',
    /* every command gets its own color: hues walk round the wheel by the golden angle, lightness alternates */
    cmdColor:function(c){
      if(c.archived) return CH.red;
      var live=CH.data.filter(function(x){return !x.archived}), i=live.indexOf(c); if(i<0) i=0;
      var h=Math.round((i*137.508+18)%360), l=[62,70,56][i%3], s=[78,68,84][(i>>1)%3];
      return 'hsl('+h+' '+s+'% '+l+'%)';
    },
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
