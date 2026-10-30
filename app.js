import { profile, posts, writingPosts } from './content.js';

const app = document.querySelector('#app');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const mobileQuery = matchMedia('(max-width: 1023px), (orientation: portrait)');
const routes = { about:'/',timeline:'/?page=timeline',reading:'/?page=reading',design:'/?page=design',writing:'/writing' };
let cleanups = [], navigationTimer, currentRoute='';
const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dateLabel = date => new Date(date+'T12:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});

function header(active, article=false) {
  return `<header class="site-header"><${article?'p':'h1'} class="site-name"><a data-route href="/">${escape(profile.name)}</a></${article?'p':'h1'}><nav class="primary-nav" aria-label="Primary">${Object.entries(routes).map(([name,url])=>`<a data-route href="${url}" ${name===active?'aria-current="page"':''}>${name==='reading'?'learn':name}</a>`).join('')}</nav></header>`;
}
function footer() {
  return `<footer class="site-footer">${Object.entries(profile.socials).map(([name,url])=>url?`<a href="${escape(url)}" target="_blank" rel="noreferrer">${name}</a>`:`<button data-action="social" data-social="${name}">${name}</button>`).join('')}<button data-action="email" aria-label="Reveal email" aria-expanded="false">email</button></footer>`;
}
function timeline() {
  return `<p>${escape(profile.timelineIntro)}</p><ul class="timeline-list">${profile.timeline.map((item,i)=>`<li class="timeline-item"><button class="timeline-button" aria-expanded="false" aria-controls="chapter-${i}"><span class="timeline-label">${escape(item.label)}</span><span class="timeline-title">${escape(item.title)}</span><span class="chevron" aria-hidden="true">⌄</span></button><div id="chapter-${i}" class="timeline-details" inert><div><ul>${item.details.map(d=>`<li>${escape(d)}</li>`).join('')}</ul></div></div></li>`).join('')}</ul>`;
}
function postRows(list=writingPosts) {
  return `<ul class="post-list">${list.map(p=>`<li><a ${p.href?'target="_blank" rel="noreferrer"':'data-route'} data-post="${p.slug}" href="${p.href||'/writing/'+p.slug}"><time datetime="${p.date}">${p.date}</time><span>${escape(p.title)}</span></a></li>`).join('')}</ul>`;
}
function designCard(type) {
  const contents={
    Search:`<div class="demo-search"><span aria-hidden="true">⌕</span><input aria-label="Search design experiments" placeholder="Search" type="search"></div><output class="search-result" aria-live="polite"></output>`,
    'Business card':`<div class="business-card" tabindex="0" aria-label="Sample business card"><small>◒ Shantanu Patil</small><strong>${escape(profile.name)}</strong><small>AI &amp; data engineering</small><div class="card-meta"><span>${escape(profile.email)}</span><span>New York</span></div></div>`,
    Wheel:`<div class="wheel" aria-label="Animated circular progress illustration"><span>75<small style="font-size:16px">%</small></span></div>`,
    Signature:`<canvas class="signature-pad" width="520" height="210" tabindex="0" aria-label="Draw your signature here"></canvas><button class="clear-signature">Clear</button>`,
    Clock:`<div class="clock" aria-label="Current time in New York"><span class="clock-time"></span><small>in New York City</small></div>`,
    Carousel:`<div class="photo-carousel"><button data-carousel="-1" aria-label="Previous photo">‹</button><img src="/assets/park.jpg" alt="Park and city landscape"><button data-carousel="1" aria-label="Next photo">›</button></div>`,
    'Scattered points':`<img class="point-field" src="/assets/batman.jpg" alt="Monochrome photography experiment">`,
    Contributions:`<div class="contributions" aria-label="Illustrative contribution grid">${Array.from({length:112},(_,i)=>`<i style="background:${['#151b19','#253d2e','#37633f','#559954','#8cca78'][(i*7+i%9)%5]}"></i>`).join('')}</div>`,
    'Liquid toggle':`<button class="liquid-toggle" role="switch" aria-label="Liquid toggle" aria-checked="false"><span></span></button>`,
    'Duration picker':`<div class="duration"><label><select aria-label="Duration hours">${Array.from({length:13},(_,i)=>`<option ${i===2?'selected':''}>${i}</option>`).join('')}</select><small>hr</small></label><label><select aria-label="Duration minutes">${Array.from({length:12},(_,i)=>`<option ${i===9?'selected':''}>${String(i*5).padStart(2,'0')}</option>`).join('')}</select><small>min</small></label></div>`
  };
  return `<article class="demo-card" data-demo="${type}"><h2>${type}</h2><div class="demo">${contents[type]}</div></article>`;
}
function gallery() {
  const columns = mobileQuery.matches && innerWidth<640
    ? [['Search','Business card','Wheel','Signature','Clock','Carousel','Scattered points','Contributions','Liquid toggle','Duration picker']]
    : [['Search','Business card','Wheel','Signature','Clock'],['Carousel','Scattered points','Contributions','Liquid toggle','Duration picker']];
  return `<div class="marquee" aria-label="Interactive design experiments">${columns.map(items=>`<div class="marquee-column"><div class="marquee-track">${items.map(designCard).join('')}${items.map(type=>`<div inert aria-hidden="true">${designCard(type)}</div>`).join('')}</div></div>`).join('')}</div>`;
}

function render({focus=false}={}) {
  cleanups.forEach(fn=>fn());cleanups=[];
  const url=new URL(location.href), slug=url.pathname.replace(/\/$/,'').split('/')[2];
  let page=url.pathname.startsWith('/writing')?'writing':url.searchParams.get('page')||'about';
  if(!routes[page]) page='about';
  const post=slug?posts.find(p=>p.slug===slug):null;
  currentRoute=location.pathname+location.search;
  document.title=post?`${post.title} · ${profile.name}`:`${page==='about'?'':(page==='reading'?'Learn':page[0].toUpperCase()+page.slice(1))+' · '}${profile.name}`;
  document.documentElement.style.background=page==='about'?'#fff':'#000';
  document.querySelector('meta[name="theme-color"]').content=page==='about'?'#fff':'#000';
  if(slug && !post) {
    app.innerHTML=`<main id="page-content" class="article-scene"><div class="article-column">${header('writing',true)}<h1>Page not found</h1><p>This page could not be found.</p><a data-route class="text-link" href="/writing">← all writing</a>${footer()}</div></main>`;
  } else if(post) {
    app.innerHTML=`<main class="article-scene fade-in" id="page-content" tabindex="-1"><div class="article-column">${header('writing',true)}<article><div class="article-meta"><a data-route href="/writing">← writing</a><time datetime="${post.date}">${dateLabel(post.date)}</time></div><img class="article-cover" src="/assets/${post.cover}" alt="Illustrative cover photograph"><h1 class="article-title">${escape(post.title)}</h1><div class="article-body"><p>${escape(post.intro)}</p>${post.sections.map(([heading,paragraphs])=>`<h2>${escape(heading)}</h2>${paragraphs.map(p=>`<p>${escape(p)}</p>`).join('')}`).join('')}</div></article><section class="more-writing"><h2>more writing</h2>${posts.filter(p=>p!==post).map(p=>`<a data-route href="/writing/${p.slug}"><span>${escape(p.title)}</span><time>${dateLabel(p.date)}</time></a>`).join('')}<a data-route class="text-link" href="/writing">all writing</a></section>${footer()}</div></main>`;
  } else {
    const art=page==='design'?'':`<div class="art" aria-hidden="true"><canvas></canvas><video muted playsinline preload="auto"></video></div>`;
    let content='';
    if(page==='about') content=`${mobileQuery.matches?'':art}<div class="about-scroll"><div class="about-center"><div class="shell">${header(page)}<div class="copy">${profile.about.map(p=>`<p>${p}</p>`).join('')}</div>${footer()}</div></div></div>${mobileQuery.matches?art:''}`;
    if(page==='timeline') content=`${mobileQuery.matches?`<div class="mobile-header">${header(page)}</div>`:''}${art}<div class="timeline-scroll"><div class="timeline-center"><div class="shell">${header(page)}<div class="copy">${timeline()}</div>${footer()}</div></div></div>`;
    if(page==='reading') content=`${mobileQuery.matches?'':art}<div class="shell">${header(page)}<div class="copy"><p>${escape(profile.readingIntro)}</p><ul class="book-list">${profile.books.map(b=>`<li>${b.href?`<a href="${escape(b.href)}" target="_blank" rel="noreferrer">${escape(b.title)}</a>`:escape(b)}</li>`).join('')}</ul></div>${footer()}</div>${mobileQuery.matches?art:''}`;
    if(page==='design') content=`<div class="shell">${header(page)}<p class="copy">${escape(profile.design)}</p>${footer()}</div>${gallery()}`;
    if(page==='writing') content=`${art}<div class="writing-center"><div class="shell">${header(page)}${postRows()}<a class="all-writing text-link" href="https://fde.guru/posts" target="_blank" rel="noreferrer">all writing ↗</a>${footer()}</div></div><div class="ledger-preview" aria-hidden="true"></div>`;
    app.innerHTML=`<main id="page-content" tabindex="-1" class="scene ${page} fade-in">${content}</main>`;
    if(page!=='design') cleanups.push(startArtwork(page));
    if(page==='design') {
      initializeDemos();
      if(profile.autoAdvance&&!reducedMotion.matches){let idle;const reset=()=>{clearTimeout(idle);idle=setTimeout(()=>navigate('/writing'),mobileQuery.matches?93000:68000);};['pointerdown','touchstart','wheel','keydown'].forEach(type=>window.addEventListener(type,reset,{passive:true}));reset();cleanups.push(()=>{clearTimeout(idle);['pointerdown','touchstart','wheel','keydown'].forEach(type=>window.removeEventListener(type,reset));});}
    }
    if(page==='writing') initializePostPreviews();
  }
  window.scrollTo(0,0);
  if(focus) document.querySelector('#page-content').focus({preventScroll:true});
}

function navigate(href,{replace=false}={}) {
  const next=new URL(href,location.origin);
  if(next.pathname+next.search===currentRoute) return;
  clearTimeout(navigationTimer);
  const scene=document.querySelector('main');
  if(scene)scene.style.opacity='0';
  navigationTimer=setTimeout(()=>{history[replace?'replaceState':'pushState']({},'',next.pathname+next.search);render({focus:true});},reducedMotion.matches?0:220);
}
app.addEventListener('click',event=>{
  const link=event.target.closest('a[data-route]');
  if(link&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&event.button===0){event.preventDefault();navigate(link.href);return;}
  const timelineButton=event.target.closest('.timeline-button');
  if(timelineButton){const open=timelineButton.getAttribute('aria-expanded')!=='true';timelineButton.setAttribute('aria-expanded',String(open));const details=document.getElementById(timelineButton.getAttribute('aria-controls'));details.classList.toggle('open',open);details.inert=!open;return;}
  const button=event.target.closest('[data-action]');
  if(button?.dataset.action==='email'){const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Hide email':'Reveal email');scramble(button,open?profile.email:'email');}
  if(button?.dataset.action==='goal')showDialog('What I’m looking for',profile.goal);
  if(button?.dataset.action==='social')showDialog(button.dataset.social,'Your profile link goes here. Add the address in content.js when you’re ready to personalize this site.');
});
window.addEventListener('popstate',()=>{clearTimeout(navigationTimer);render({focus:true});});
mobileQuery.addEventListener('change',()=>render());
reducedMotion.addEventListener('change',()=>render());
function scramble(element,text) {
  if(reducedMotion.matches){element.textContent=text;return;}
  const symbols='01[]{}<>/|#$%&*+-=~';let step=0;
  const interval=setInterval(()=>{step++;element.textContent=[...text].map((c,i)=>i<step/2?c:symbols[(step*11+i*7)%symbols.length]).join('');if(step>=text.length*2){clearInterval(interval);element.textContent=text;}},18);
  cleanups.push(()=>clearInterval(interval));
}
function showDialog(title,text) {
  const dialog=document.createElement('dialog');dialog.className='modal';
  dialog.innerHTML=`<button class="modal-close" aria-label="Close">×</button><h2>${escape(title)}</h2><p>${escape(text)}</p>`;
  document.body.append(dialog);dialog.showModal();
  dialog.querySelector('button').onclick=()=>dialog.close();
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>dialog.remove(),{once:true});
}

// Render the locally stored video as colored diamond halftones. The original
// footage remains untouched; no third-party scripts or analytics are loaded.
function startArtwork(page) {
  const container=app.querySelector('.art'),canvas=container.querySelector('canvas'),video=container.querySelector('video');
  const context=canvas.getContext('2d'),sample=document.createElement('canvas'),pixels=sample.getContext('2d',{willReadFrequently:true});
  const files=page==='timeline'?['fish3.mp4','fish4.mp4','fish2.mp4']:[{about:'butterfly.mp4',reading:'orchids.mp4',writing:'mountain.mp4'}[page]];
  const dark=page!=='about';let frame=0,last=0,disposed=false,width=0,height=0,sourceIndex=0,cycles=0;
  const resize=()=>{width=container.clientWidth;height=container.clientHeight;canvas.width=Math.round(width*devicePixelRatio);canvas.height=Math.round(height*devicePixelRatio);context.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);};
  const observer=new ResizeObserver(resize);observer.observe(container);resize();
  video.src='/assets/'+files[0];video.loop=page==='writing';video.muted=true;
  function draw() {
    if(!width||!height||video.readyState<2)return;
    const columns=page==='about'?140:mobileQuery.matches?160:280;
    const spacing=width/columns,rows=Math.ceil(height/spacing);
    sample.width=columns;sample.height=rows;
    pixels.fillStyle=dark?'#000':'#fff';pixels.fillRect(0,0,columns,rows);
    const scale=Math.max(columns/video.videoWidth,rows/video.videoHeight);
    const w=video.videoWidth*scale,h=video.videoHeight*scale;
    pixels.drawImage(video,(columns-w)/2,(rows-h)/2,w,h);
    const data=pixels.getImageData(0,0,columns,rows).data;
    context.globalAlpha=1;context.fillStyle=dark?'#000':'#fff';context.fillRect(0,0,width,height);
    const threshold=page==='reading'?.2:dark?.08:.22,saturation=dark?2:6;
    // Group similarly colored dots to avoid thousands of individual fill calls.
    const groups=new Map();
    for(let y=0;y<rows;y++)for(let x=0;x<columns;x++){
      const index=(y*columns+x)*4;let r=data[index],g=data[index+1],b=data[index+2];
      const light=(.299*r+.587*g+.114*b)/255,ink=dark?light:1-light;
      if(ink<threshold)continue;
      const alpha=Math.min(1,(ink-threshold)/.12);
      if(page==='reading'){const mean=(r+g+b)/3;r=Math.min(255,Math.max(0,mean+(r-mean)*saturation)*1.32);g=Math.min(255,Math.max(0,mean+(g-mean)*saturation)*1.1);b=Math.min(255,Math.max(0,mean+(b-mean)*saturation)*1.35);}
      else if(Math.max(r,g,b)-Math.min(r,g,b)>15){const mean=(r+g+b)/3;r=Math.min(255,Math.max(0,mean+(r-mean)*saturation));g=Math.min(255,Math.max(0,mean+(g-mean)*saturation));b=Math.min(255,Math.max(0,mean+(b-mean)*saturation));const avg=(r+g+b)/3,target=dark?Math.max(150,280*ink):Math.min(170,(1-ink)*250);if(avg){r=Math.min(255,r*target/avg);g=Math.min(255,g*target/avg);b=Math.min(255,b*target/avg);}}
      else r=g=b=dark?220*ink:(1-ink)*140;
      const color=`rgba(${Math.round(r/17)*17},${Math.round(g/17)*17},${Math.round(b/17)*17},${Math.round(alpha*16)/16})`;
      if(!groups.has(color))groups.set(color,new Path2D());
      const path=groups.get(color),cx=(x+.5)*spacing,cy=(y+.5)*spacing,size=spacing*.85*(dark?1:Math.sqrt(ink));
      path.moveTo(cx,cy-size);path.lineTo(cx+size,cy);path.lineTo(cx,cy+size);path.lineTo(cx-size,cy);path.closePath();
    }
    for(const [color,path] of groups){context.fillStyle=color;context.fill(path);}
  }
  function tick(now){if(disposed)return;if(!document.hidden&&now-last>50){draw();last=now;}frame=requestAnimationFrame(tick);}
  const play=()=>video.play().catch(()=>{draw();});
  video.addEventListener('loadeddata',()=>{draw();if(reducedMotion.matches){video.currentTime=Math.min(2,video.duration/3);video.pause();}else play();});
  video.addEventListener('seeked',()=>{if(reducedMotion.matches)draw();});
  video.addEventListener('ended',()=>{cycles++;if(profile.autoAdvance&&!reducedMotion.matches&&cycles>=2&&page!=='writing'){navigate(routes[{about:'timeline',timeline:'reading',reading:'design'}[page]]);return;}sourceIndex=(sourceIndex+1)%files.length;if(files.length>1)video.src='/assets/'+files[sourceIndex];else video.currentTime=0;play();});
  const visibility=()=>{if(document.hidden)video.pause();else if(!reducedMotion.matches)play();};document.addEventListener('visibilitychange',visibility);
  if(!reducedMotion.matches)frame=requestAnimationFrame(tick);
  return ()=>{disposed=true;cancelAnimationFrame(frame);video.pause();video.removeAttribute('src');video.load();observer.disconnect();document.removeEventListener('visibilitychange',visibility);};
}

function initializeDemos() {
  const updateClock=()=>app.querySelectorAll('.clock-time').forEach(el=>{el.textContent=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hour:'numeric',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());});
  updateClock();const timer=setInterval(updateClock,1000);cleanups.push(()=>clearInterval(timer));
  app.querySelectorAll('.liquid-toggle').forEach(el=>el.onclick=()=>el.setAttribute('aria-checked',String(el.getAttribute('aria-checked')!=='true')));
  app.querySelectorAll('.demo-search input').forEach(input=>input.oninput=()=>{const query=input.value.trim().toLowerCase();const count=['Search','Business card','Wheel','Signature','Clock','Carousel','Scattered points','Contributions','Liquid toggle','Duration picker'].filter(x=>x.toLowerCase().includes(query)).length;input.closest('.demo').querySelector('output').textContent=query?`${count} matching ${count===1?'experiment':'experiments'}`:'';});
  const photos=['park.jpg','bike.jpg','skyline.jpg','cars.jpg','batman.jpg'];
  app.querySelectorAll('.photo-carousel').forEach(carousel=>{let index=0;carousel.querySelectorAll('button').forEach(button=>button.onclick=()=>{index=(index+Number(button.dataset.carousel)+photos.length)%photos.length;carousel.querySelector('img').src='/assets/'+photos[index];carousel.querySelector('img').alt=`Reference photograph ${index+1} of ${photos.length}`;});});
  app.querySelectorAll('.signature-pad').forEach(canvas=>{
    const ctx=canvas.getContext('2d');ctx.strokeStyle='#ddd';ctx.lineWidth=3;ctx.lineCap='round';let drawing=false;
    const point=e=>{const r=canvas.getBoundingClientRect();return[(e.clientX-r.left)*canvas.width/r.width,(e.clientY-r.top)*canvas.height/r.height];};
    canvas.onpointerdown=e=>{drawing=true;canvas.setPointerCapture(e.pointerId);ctx.beginPath();ctx.moveTo(...point(e));};
    canvas.onpointermove=e=>{if(drawing){ctx.lineTo(...point(e));ctx.stroke();}};
    canvas.onpointerup=canvas.onpointercancel=()=>{drawing=false;};
    canvas.closest('.demo').querySelector('button').onclick=()=>ctx.clearRect(0,0,canvas.width,canvas.height);
  });
}
function initializePostPreviews(){
  const preview=app.querySelector('.ledger-preview');
  app.querySelectorAll('[data-post]').forEach(link=>{const post=writingPosts.find(p=>p.slug===link.dataset.post);const show=()=>{preview.innerHTML=`<img src="/assets/${post.cover}" alt=""><p>${escape(post.description)}</p>`;preview.classList.add('visible');};const hide=()=>preview.classList.remove('visible');link.addEventListener('mouseenter',show);link.addEventListener('focus',show);link.addEventListener('mouseleave',hide);link.addEventListener('blur',hide);});
}
render();
