// File: script.js
const el = document.createElement('button');
el.className = 'sound-btn';
el.setAttribute('aria-pressed','false');
el.dataset.id = i;


const label = document.createElement('div');
label.className = 'label';
label.textContent = `Button ${i+1}`;


const meta = document.createElement('div');
meta.className = 'meta';
meta.textContent = 'click to play';


el.appendChild(label);
el.appendChild(meta);


// style
const st = randomStyle();
el.style.background = st.accent;
el.style.borderColor = st.border;


// click action
el.addEventListener('pointerdown', (e)=>{
// visual feedback
el.classList.add('playing');
el.setAttribute('aria-pressed','true');
meta.textContent = 'playing...';
// pick some random properties per-button so each has a feel
const opts = {
duration: rand(0.08, 1.2),
startFreq: rand(60, 2000)
};
playRandomSound(opts);
setTimeout(()=>{
el.classList.remove('playing');
el.setAttribute('aria-pressed','false');
meta.textContent = 'click to play';
}, Math.max(300, opts.duration*1000));
});


// keyboard activation
el.addEventListener('keydown', (ev)=>{
if(ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); el.click(); }
});


return el;
}


function buildGrid(count){
grid.innerHTML = '';
for(let i=0;i<count;i++){
const btn = makeButton(i);
grid.appendChild(btn);
}
}


// initialize
buildGrid(parseInt(btnCount.value,10));


regen.addEventListener('click', ()=> buildGrid(parseInt(btnCount.value,10)));
randomizeAll.addEventListener('click', ()=>{
// tweak styles on existing buttons
document.querySelectorAll('.sound-btn').forEach((el,i)=>{
const st = randomStyle();
el.style.background = st.accent;
el.style.borderColor = st.border;
});
});


stopAll.addEventListener('click', ()=>{
activeNodes.forEach(node=>{
try{ node.stop && node.stop(); }catch(e){}
});
activeNodes.clear();
});


// clicking anywhere resumes audio on some browsers
document.addEventListener('pointerdown', ensureAudioStarted, {once:true});


// small accessibility: space/enter on focused buttons
document.addEventListener('keydown', (e)=>{
if(e.code === 'Space' || e.code === 'Enter'){
const focused = document.activeElement;
if(focused && focused.classList && focused.classList.contains('sound-btn')){
focused.click();
e.preventDefault();
}
}
});


// expose a global helper for quick testing in console
window.__randomSound = ()=> playRandomSound();
})();  