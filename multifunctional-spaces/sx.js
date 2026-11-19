(function(PID){
var TR=(function(){
function rng(s){return function(){s=(s*16807)%2147483647;return (s-1)/2147483646}}
function cl(x){return x<0?0:x>1?1:x}
function ease(x){x=cl(x);return x*x*(3-2*x)}
var T={};
/* glitch - Secret Coterie */
T.glitch=function(){var r=rng(11),B=[];for(var i=0;i<30;i++)B.push({y:r(),h:.008+r()*.06,th:r()*.85,c:Math.floor(r()*6),dx:r()-.5});
 var cols=['#0a0014','#00f0d0','#ff2e88','#7a2cff','#f5ff3a','#39ff14'];
 return function(x,W,H,p,t){var f=Math.floor(t/110),rr=rng(f*97+5);
  x.fillStyle='#0a0014';x.globalAlpha=cl((p-.6)/.4);x.fillRect(0,0,W,H);x.globalAlpha=1;
  B.forEach(function(b,i){if(b.th>p*1.05)return;var jx=(rr()-.5)*W*.2*(1-p*.6)+b.dx*W*.06;x.fillStyle=cols[(b.c+f+i)%6];x.fillRect(jx-W*.1,b.y*H,W*1.2,Math.max(2,b.h*H))});
  for(var k=0;k<Math.floor(14*Math.min(p*2,1));k++){x.fillStyle=cols[Math.floor(rr()*6)];x.fillRect(rr()*W,rr()*H,20+rr()*120,4+rr()*18)}
  if(p>.15){x.globalAlpha=.4;x.fillStyle='#00f0d0';x.fillRect(rr()*W*.5,rr()*H,W*.5,6);x.fillStyle='#ff2e88';x.fillRect(rr()*W*.5,rr()*H,W*.5,6);x.globalAlpha=1}
  if(p>.4){x.fillStyle='rgba(0,0,0,.14)';for(var y=0;y<H;y+=4)x.fillRect(0,y,W,1)}}};
/* clouds - Reconnecting with spaces */
T.clouds=function(){var r=rng(23),C=[],cols=5,rows=4;
 for(var j=0;j<rows;j++)for(var i=0;i<cols;i++)C.push({u:(i+.5)/cols+(r()-.5)*.1,v:(j+.5)/rows+(r()-.5)*.1,d:r()*.3,dir:(j%2?-1:1),s:.9+r()*.5});
 return function(x,W,H,p){x.globalAlpha=cl((p-.55)/.45);x.fillStyle='#dcebee';x.fillRect(0,0,W,H);x.globalAlpha=1;
  var R=W/cols*.95;C.forEach(function(c){var q=ease((p-c.d)/.7);if(q<=0)return;var cx=c.u*W-c.dir*(1-q)*W*.18,cy=c.v*H,rad=R*c.s*(Math.max(W,H*1.3)/W);x.globalAlpha=q*.8;
   for(var k=0;k<5;k++){var ox=(k-2)*rad*.5,oy=Math.sin(k*1.7)*rad*.18,rr=rad*(.62+.22*Math.sin(k*2.3+1));var g=x.createRadialGradient(cx+ox,cy+oy,0,cx+ox,cy+oy,rr);g.addColorStop(0,'rgba(255,255,255,.7)');g.addColorStop(.55,'rgba(236,246,248,.5)');g.addColorStop(1,'rgba(200,224,230,0)');x.fillStyle=g;x.beginPath();x.arc(cx+ox,cy+oy,rr,0,6.3);x.fill()}x.globalAlpha=1})}};
/* rain of notes - Mused */
T.rain=function(){var r=rng(5),N=26,cols=['#ff2a1f','#ff5a1f','#ff8a2a','#ffae25','#ffcb1f','#b8e51f','#21e85c','#1fd3a8','#00a8ea','#5a86ff','#7d52e0','#b3309f'],C=[];
 for(var i=0;i<N;i++){var segs=[],y=0;while(y<2400){var h=24+r()*110;segs.push({y:y,h:h,c:cols[Math.floor(r()*cols.length)]});y+=h}C.push({d:r()*.45,segs:segs})}
 return function(x,W,H,p,t,mode){var w=W/N,s=H/800;C.forEach(function(c,i){var q=ease((p-c.d)/.55);if(q<=0)return;var fh=q*H*1.02,y0=mode==='in'?0:H-fh,y1=mode==='in'?fh:H;
  x.fillStyle='#151515';x.fillRect(i*w,y0,w+1,y1-y0);
  c.segs.forEach(function(sg){var a=sg.y*s,b=a+sg.h*s;if(b<y0||a>y1)return;a=Math.max(a,y0);b=Math.min(b,y1);x.fillStyle=sg.c;x.fillRect(i*w+1,a+1,w-1,Math.max(1,b-a-2))});
  if(q<1){var hy=mode==='in'?y1-16:y0;x.fillStyle='rgba(255,255,255,.45)';x.fillRect(i*w+1,hy,w-1,10)}})}};
/* slats - Bench */
T.slats=function(){var S=18;return function(x,W,H,p){var w=W/S;for(var i=0;i<S;i++){var q=ease((p-(i/S)*.5)/.5);if(q<=0)continue;var a=(1-q)*Math.PI/2,ww=w*Math.cos(a)+(q>=1?1:0),cx=(i+.5)*w;
  var g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#b9cfee');g.addColorStop(.5,'#ecb8a6');g.addColorStop(.62,'#2b3828');g.addColorStop(1,'#161c15');x.fillStyle=g;x.fillRect(cx-ww/2,0,ww,H);
  x.fillStyle='rgba(20,14,10,'+(Math.sin(a)*.55)+')';x.fillRect(cx-ww/2,0,ww,H);x.fillStyle='rgba(0,0,0,.18)';x.fillRect(cx+ww/2-1,0,1,H)}}};
/* equalizer - Music Strip */
T.eq=function(){var r=rng(9),N=46,D=[];for(var i=0;i<N;i++)D.push({d:r()*.4,c:['#b08428','#d9a93f','#8a6620','#e8c36a'][i%4]});
 return function(x,W,H,p,t){x.globalAlpha=cl((p-.8)/.2);x.fillStyle='#1d1815';x.fillRect(0,0,W,H);x.globalAlpha=1;var w=W/N;
  D.forEach(function(b,i){var q=ease((p-b.d)/.6);if(q<=0)return;var h=H*q+Math.sin(t/90+i*1.3)*H*.04*(1-q);h=Math.max(0,Math.min(H,h));x.fillStyle=b.c;x.fillRect(i*w+1,H-h,w-1+(q>=1?1:0),h)})}};
/* beam - Leap of Light */
T.beam=function(){return function(x,W,H,p){var soft=Math.min(320,W*.3),e=ease(p)*(W+soft)-soft;x.fillStyle='#0a0d18';x.fillRect(0,0,Math.max(0,e),H);
 var g=x.createLinearGradient(e,0,e+soft,0);g.addColorStop(0,'rgba(10,13,24,1)');g.addColorStop(.35,'rgba(255,210,120,.16)');g.addColorStop(1,'rgba(10,13,24,0)');x.fillStyle=g;x.fillRect(e,0,soft,H)}};
/* wave - Sightsonic */
T.wave=function(){var r=rng(31),N=44,D=[];for(var i=0;i<N;i++)D.push({d:Math.abs(i-N/2)/N*.5+r()*.1,a:.35+r()*.65});
 return function(x,W,H,p){x.globalAlpha=cl((p-.78)/.22);x.fillStyle='#f3eee3';x.fillRect(0,0,W,H);x.globalAlpha=1;var w=W/N;
  D.forEach(function(b,i){var q=ease((p-b.d)/.55);if(q<=0)return;var h=H*Math.min(1,q*(q>=1?1:b.a*1.2));x.fillStyle='#d9381e';x.fillRect(i*w+w*.18,(H-h)/2,w*.64+(q>=1?w*.4:0),h)})}};
/* shutter - Capturing Play */
T.shutter=function(){return function(x,W,H,p){var q=ease(p),h=q*H/2+(q>=1?1:0);x.fillStyle='#111';x.fillRect(0,0,W,h);x.fillRect(0,H-h,W,h);
 if(q>0&&q<1){x.fillStyle='#ff4b1f';x.fillRect(0,h-1,W,2);x.fillRect(0,H-h-1,W,2)}}};
/* fade - neutral hub */
T.fade=function(){return function(x,W,H,p){x.globalAlpha=ease(p);x.fillStyle='#f4f3ef';x.fillRect(0,0,W,H);x.globalAlpha=1}};
function run(type,mode,dur){return new Promise(function(res){var c=document.createElement('canvas');c.style.cssText='position:fixed;left:0;top:0;width:100%;height:100%;z-index:2147483000;pointer-events:none';c.width=innerWidth;c.height=innerHeight;document.documentElement.appendChild(c);
 var x=c.getContext('2d'),d=T[type](),t0=performance.now();
 function f(now){var t=now-t0,u=cl(t/dur),p=mode==='in'?u:1-u;x.clearRect(0,0,c.width,c.height);if(p>0||mode==='in')d(x,c.width,c.height,p,t,mode);
  if(u<1)requestAnimationFrame(f);else{if(mode==='out'){c.remove();res(null)}else res(c)}}
 f(performance.now())})}
function frame(type,p,mode){var c=document.createElement('canvas');c.id='dbg';c.style.cssText='position:fixed;left:0;top:0;width:100%;height:100%;z-index:2147483000';c.width=innerWidth;c.height=innerHeight;document.documentElement.appendChild(c);T[type]()(c.getContext('2d'),c.width,c.height,p,500,mode||'in')}
function has(t){return !!T[t]}
function cover(t){var c=document.createElement('canvas');c.style.cssText='position:fixed;left:0;top:0;width:100%;height:100%;z-index:2147483000;pointer-events:none';c.width=innerWidth;c.height=innerHeight;document.documentElement.appendChild(c);T[t]()(c.getContext('2d'),c.width,c.height,1,0,'in');return c}
return {run:run,frame:frame,has:has,cover:cover}})();
var HUB='../',PROJ=[{"id": "bench", "n": "01", "t": "A Memoir to Public Benches", "short": "Memoir to Public Benches", "fx": "slats", "type": "Installation", "facts": [["Type", "Kinetic public bench and film"], ["Recognition", "Special Jury Commendation, XIV Florence Biennale"], ["Build", "2.4 m bench, 6 major and 18 minor slats on castors"], ["Made in", "A course, August to end of November"]], "url": "../bench/"}, {"id": "mused", "n": "02", "t": "Mused", "short": "Mused", "fx": "rain", "type": "Product", "facts": [["Type", "Product and interaction design"], ["Context", "M.Des New Media Design, NID Gandhinagar"], ["For", "Piano self-learners"]], "url": "../mused/"}, {"id": "strip", "n": "03", "t": "What remains when the song fades?", "short": "The Music Strip", "fx": "eq", "type": "Interactive", "facts": [["Type", "Interactive documentary"], ["Context", "Graduation research, Science Gallery Bangalore"], ["Material", "About 33 interviews with Bangalore's 1980s music scene"]], "url": "../music-strip/"}, {"id": "coterie", "n": "04", "t": "Secret Coterie of Subterranean Statuary", "short": "Secret Coterie", "fx": "glitch", "type": "Speculative", "facts": [["Type", "Speculative design, design fiction"], ["Year", "2023"], ["World", "Doshire, a fictional city set in 2030"]], "url": "../secret-coterie/"}, {"id": "rm", "n": "05", "t": "Reconnecting with spaces and self", "short": "Reconnecting with spaces", "fx": "clouds", "type": "Research", "facts": [["Type", "Research study"], ["Context", "Research Methodology, NID"], ["Subject", "Multifunctional spaces and wellbeing"]], "url": "../multifunctional-spaces/"}, {"id": "lol", "n": "06", "t": "Leap of Light", "short": "Leap of Light", "fx": "beam", "type": "Competition", "facts": [["Type", "Light sculpture proposal"], ["Status", "Shortlisted, top 30 of 730, Amsterdam Light Festival Edition 15"], ["Team", "With Aaditya S, Saipreethi Durairama, Nivedita Singh"]], "url": "../leap-of-light/"}, {"id": "sight", "n": "07", "t": "Sightsonic", "short": "Sightsonic", "fx": "wave", "type": "Concept", "facts": [["Type", "Concept, accessible entertainment platform"], ["Status", "Competition entry, conceptual work"], ["Team", "With Athulya"]], "url": "../sightsonic/"}, {"id": "play", "n": "08", "t": "Capturing Play", "short": "Capturing Play", "fx": "shutter", "type": "Photography", "facts": [["Type", "Documentary photography"], ["Context", "Open elective Capturing Play, two-week module"], ["Series", "Three stories, 81 photographs"]], "url": "../capturing-play/"}];
var me=null,idx=-1;PROJ.forEach(function(p,i){if(p.id===PID){me=p;idx=i}});if(!me)return;
var prev=PROJ[(idx+PROJ.length-1)%PROJ.length],next=PROJ[(idx+1)%PROJ.length];
var inFrame=window.top!==window.self,reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
/* arrival: cover, then reveal */
var from=(location.search.match(/[?&]from=([a-z]+)/)||[])[1];
function arrive(){var h=document.getElementById('sx-hide'),R=function(){document.documentElement.classList.add('sx-ready')};
 if(!from||reduce||!TR.has(from)){if(h)h.remove();R();return}
 var c=TR.cover(from);if(h)h.remove();setTimeout(function(){R();TR.run(from,'out',750).then(function(){c.remove()});},120);setTimeout(function(){c.remove();R()},3500)}
/* back/forward cache: never restore a page with a transition cover stuck on it */
window.addEventListener('pageshow',function(e){if(e.persisted){document.querySelectorAll('canvas').forEach(function(c){if(c.style.zIndex==='2147483000')c.remove()});document.documentElement.classList.add('sx-ready')}});
/* shell */
var css='.sx{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;color:#111;background:#f4f3ef;position:relative;z-index:30;-webkit-font-smoothing:antialiased;line-height:1.4;text-align:left}.sx *{box-sizing:border-box;margin:0}.sx a{color:inherit;text-decoration:none}'+
'.sx-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 24px;border-bottom:1px solid #111;font:11px/1.2 ui-monospace,"SF Mono",Menlo,Consolas,monospace;letter-spacing:.06em;text-transform:uppercase}'+
'.sx-bar .l,.sx-bar .r{display:flex;gap:18px;align-items:center}.sx-bar a:hover{color:#ff4b1f}.sx-bar b{font-weight:700}.sx-mid{color:#77776f}'+
'.sx-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));border-bottom:1px solid #111}'+
'.sx-facts div{padding:14px 24px 16px;border-left:1px solid rgba(17,17,17,.2)}.sx-facts div:first-child{border-left:0}'+
'.sx-facts dt{font:10px/1.2 ui-monospace,"SF Mono",Menlo,Consolas,monospace;letter-spacing:.08em;text-transform:uppercase;color:#77776f;margin-bottom:5px}.sx-facts dd{font-size:15px;line-height:1.35;font-weight:500;margin:0}'+
'.sx-foot{border-top:1px solid #111;display:grid;grid-template-columns:1fr 1fr}.sx-foot a{display:block;padding:34px 24px 40px;transition:background .2s}.sx-foot a:hover{background:#ebeae4}.sx-foot a+a{border-left:1px solid #111;text-align:right}'+
'.sx-foot small{display:block;font:10px/1.2 ui-monospace,"SF Mono",Menlo,Consolas,monospace;letter-spacing:.08em;text-transform:uppercase;color:#77776f;margin-bottom:8px}.sx-foot span{font-size:clamp(20px,3.2vw,34px);font-weight:800;letter-spacing:-.03em;line-height:1.05}'+
'.sx-end{padding:12px 24px;font:10px/1.2 ui-monospace,"SF Mono",Menlo,Consolas,monospace;letter-spacing:.06em;text-transform:uppercase;display:flex;justify-content:space-between;border-top:1px solid rgba(17,17,17,.2)}'+
'.sx-home{position:fixed;left:16px;bottom:16px;z-index:2147482000;background:#fff;color:#111!important;padding:13px 20px;font:600 12px/1 ui-monospace,"SF Mono",Menlo,Consolas,monospace;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border:2px solid #ff4b1f;border-radius:999px;box-shadow:0 4px 18px rgba(0,0,0,.35);transition:background .2s,color .2s}.sx-home:hover{background:#ff4b1f;color:#fff!important}'+
'.sx-c{display:flex;gap:18px}.sx-c a{color:inherit;text-decoration:underline;text-underline-offset:3px}.sx-c a:hover{color:#ff4b1f}'+
'@media(max-width:640px){.sx-bar{padding:10px 14px}.sx-mid{display:none}.sx-bar .r{gap:12px}.sx-facts div{padding:12px 14px}.sx-foot a{padding:24px 14px 28px}.sx-end{padding:10px 14px}}';
function lnk(p,cls,label){return '<a href="'+p.url+'" data-id="'+p.id+'"'+(cls?' class="'+cls+'"':'')+'>'+label+'</a>'}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function build(){
 var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 var top=document.createElement('div');top.className='sx';top.setAttribute('role','navigation');top.setAttribute('aria-label','Portfolio');
 top.innerHTML='<div class="sx-bar"><div class="l"><a href="'+HUB+'" data-hub="1">&larr; Home</a></div><div class="sx-mid"><b>Anjal B</b> &nbsp;/&nbsp; '+me.n+' of '+String(PROJ.length).padStart(2,'0')+'</div><div class="r">'+lnk(prev,'','&larr; '+esc(prev.short))+lnk(next,'',esc(next.short)+' &rarr;')+'</div></div>'+
 '<dl class="sx-facts">'+me.facts.map(function(f){return '<div><dt>'+esc(f[0])+'</dt><dd>'+esc(f[1])+'</dd></div>'}).join('')+'</dl>';
 var bot=document.createElement('div');bot.className='sx';
 bot.innerHTML='<div class="sx-foot"><a href="'+prev.url+'" data-id="'+prev.id+'"><small>Previous &middot; '+prev.n+'</small><span>'+esc(prev.short)+'</span></a><a href="'+next.url+'" data-id="'+next.id+'"><small>Next &middot; '+next.n+'</small><span>'+esc(next.short)+' &rarr;</span></a></div><div class="sx-end"><a href="'+HUB+'" data-hub="1">&larr; Home</a><span class="sx-c"><a href="mailto:anjal2098@gmail.com">Email</a><a href="'+HUB+'resume/Anjal_B_Resume.pdf">Resume</a><a href="https://www.linkedin.com/in/anjal-b-496605155/" target="_blank" rel="noopener">LinkedIn</a></span></div>';
 document.body.insertBefore(top,document.body.firstChild);document.body.appendChild(bot);
 var pill=document.createElement('a');pill.className='sx-home';pill.href=HUB;pill.setAttribute('data-hub','1');pill.innerHTML='&larr; Home';document.body.appendChild(pill);
 [top,bot,pill].forEach(function(r){r.addEventListener('click',function(e){var a=e.target.closest('a');if(!a||(!a.getAttribute('data-hub')&&!a.getAttribute('data-id'))||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;
  var hub=a.getAttribute('data-hub'),tp=hub?null:PROJ.filter(function(p){return p.id===a.getAttribute('data-id')})[0],fx=hub?'fade':tp.fx,url=(hub?HUB:tp.url);
  var dest=url+(url.indexOf('?')<0?'?':'&')+'from='+fx;
  if(inFrame){a.target='_blank';a.rel='noopener';a.href=dest;return}
  e.preventDefault();if(reduce){location.href=dest;return}TR.run(fx,'in',800).then(function(){location.href=dest})})})}
if(document.body)build();else document.addEventListener('DOMContentLoaded',build);
var armed=false;function go(){if(armed)return;armed=true;arrive()}
if(document.readyState==='complete')go();else{window.addEventListener('load',go);setTimeout(go,900)}
setTimeout(function(){var h=document.getElementById('sx-hide');if(h)h.remove()},4500);
})('rm');
