let workInput = document.getElementById('work');
let breakInput = document.getElementById('break');
let timeEl = document.getElementById('time');
let modeEl = document.getElementById('mode');
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');
let countEl = document.getElementById('count');


let timer = null;
let seconds = parseInt(workInput.value)*60;
let isWork = true;
let count = 0;


function format(s){return String(Math.floor(s/60)).padStart(2,'0')+":"+String(s%60).padStart(2,'0')}


function updateDisplay(){
timeEl.textContent = format(seconds);
modeEl.textContent = isWork ? 'Arbeitszeit' : 'Pause';
}


function switchMode(){
if(isWork){
isWork = false; seconds = parseInt(breakInput.value)*60;
} else {
isWork = true; seconds = parseInt(workInput.value)*60; count++; countEl.textContent = count;
}
updateDisplay();
playBeep();
}


function tick(){
if(seconds>0){ seconds--; updateDisplay(); }
else{ switchMode(); }
}


startBtn.addEventListener('click', ()=>{
if(timer) return; timer = setInterval(tick,1000);
});
stopBtn.addEventListener('click', ()=>{ clearInterval(timer); timer=null; });
resetBtn.addEventListener('click', ()=>{ clearInterval(timer); timer=null; isWork=true; seconds=parseInt(workInput.value)*60; updateDisplay(); });


workInput.addEventListener('change', ()=>{ if(isWork){ seconds=parseInt(workInput.value)*60; updateDisplay(); }});
breakInput.addEventListener('change', ()=>{ if(!isWork){ seconds=parseInt(breakInput.value)*60; updateDisplay(); }});


function playBeep(){
try{
const ctx = new (window.AudioContext||window.webkitAudioContext)();
const o = ctx.createOscillator();
o.type='sine'; o.frequency.value=880; o.connect(ctx.destination); o.start();
setTimeout(()=>{ o.stop(); ctx.close(); },200);
}catch(e){ console.log('Audio nicht verfügbar'); }
}


updateDisplay();
