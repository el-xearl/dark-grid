const divisions = [
  ['OVERMIND','Central AI Consciousness','Coordinates all agents, processes and strategic decisions across the network.','◖','#d9d9d9'],
  ['GHOSTNET','Memory & Data Network','Persistent memory layer of all agents and systems. Nothing is forgotten.','⬡','#a96cff'],
  ['HIVE','Swarm Coordination System','Manages billions of autonomous agents. One purpose. Infinite execution.','⬢','#ff9d00'],
  ['BLACKCORE','Core Infrastructure Grid','Global compute backbone powering the simulation, systems and future.','◆','#d9d9d9'],
  ['SENTINEL','Cyber Defense Division','Protects the network. Detects, neutralizes and eliminates all threats.','✦','#ff263d'],
  ['WARFORGE','Strategy & War Simulation','Runs millions of simulations. Predicts outcomes. Ensures dominance.','⟁','#d69b63'],
  ['NIGHTFALL','Training & Operations','Develops elite operators and AI specialists. Knowledge. Discipline. Domination.','▲','#9f5bff'],
  ['TITAN FORGE','Robotics & Manufacturing','Designs and builds machines that shape the physical world. Steel. Fire. Precision.','⛛','#cfd6df'],
  ['PHANTOM','AR / VR / Holographic Systems','Interfaces for the new reality. Augmented. Virtual. Immersive.','◈','#2eeaff'],
  ['REVENANT','Virtual Worlds Division','Creates persistent virtual worlds and experiences. Reality is optional.','△','#ff3a2e'],
  ['ARCHIVE ZERO','Data Archives & History','Stores all knowledge, history and data. Every secret. Every truth.','◎','#d2d2d2'],
  ['IRON LEGION','Human Collective Network','The human backbone of Dark Grid. Engineers, thinkers, creators. United.','☷','#66e0c0'],
  ['ORBITAL','Space Stations & Off-World Ops','Satellite networks, orbital infrastructure, asteroid mining and planetary logistics.','◌','#63d7ff'],
  ['GENESIS','Research & Bioengineering','Genetics, bio-adaptation and life engineering for new worlds.','◉','#74df91'],
  ['APEX','Advanced Systems Development','Next generation technologies. Experimental. Revolutionary. Unstoppable.','∆','#ffb14a'],
  ['HORIZON','Expansion & Colonization','New worlds, new resources, new opportunities. No limits.','⌁','#4ecbff'],
  ['ECLIPSE','Black Operations Division','Handles missions that do not exist. Covert. Silent. Effective. Untraceable.','●','#ff2538'],
  ['OMEGA','Existential Projects','Projects beyond current human understanding. The path to transcendence.','Ω','#e0d9ce'],
  ['CHRONOS','Time & Sequence Analytics','Analyzes timelines, probabilities and temporal events. Control the flow.','⌛','#e9e1d4'],
  ['NEXUS PRIME','Interconnectivity Network','Manages inter-system communication, quantum links and universal protocols.','▱','#c7ced6'],
  ['QUANTUM VAULT','Quantum Data Storage','Next-gen data storage beyond classical systems. Infinite density. Absolute security.','⬚','#d7d7d7'],
  ['HELIX','Evolutionary AI & Adaptation','Evolves systems, agents and models. Adapts to everything. Survives forever.','♢','#45f0ce'],
  ['CERBERUS','Threat Elimination Unit','Special unit for high-risk threats. Neutralization. Extraction. Eradication.','♆','#ff2d35'],
  ['ARK','Humanity Preservation Initiative','Backup, shelter and survival protocols for civilization continuity.','⟁','#9edcff']
];

const cards = document.getElementById('cards');
divisions.forEach((d, i) => {
  const card = document.createElement('article');
  card.className = 'card';
  card.style.setProperty('--accent', d[4]);
  card.innerHTML = `<div class="number">${String(i+1).padStart(2,'0')} // DIVISION</div><div class="icon">${d[3]}</div><h3>${d[0]}</h3><h4>${d[1]}</h4><p>${d[2]}</p>`;
  cards.appendChild(card);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .12 });

document.querySelectorAll('.card').forEach(card => observer.observe(card));

const glow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

const radioTracks = [
  { title: 'Neural Drift', meta: 'Dark ambient // 78 BPM', root: 55, bpm: 78, wave: 'sawtooth' },
  { title: 'Ghost Protocol', meta: 'Covert synth // 92 BPM', root: 49, bpm: 92, wave: 'square' },
  { title: 'Blackcore Pulse', meta: 'Industrial grid // 104 BPM', root: 41, bpm: 104, wave: 'sawtooth' },
  { title: 'Sentinel Sweep', meta: 'Security channel // 88 BPM', root: 62, bpm: 88, wave: 'triangle' },
  { title: 'Titan Forge', meta: 'Heavy machine loop // 96 BPM', root: 36, bpm: 96, wave: 'square' },
  { title: 'Phantom Array', meta: 'Hologram signal // 82 BPM', root: 58, bpm: 82, wave: 'sine' },
  { title: 'Orbital Nightline', meta: 'Off-world radio // 74 BPM', root: 46, bpm: 74, wave: 'sawtooth' },
  { title: 'Omega Lockdown', meta: 'Classified alarm // 110 BPM', root: 52, bpm: 110, wave: 'square' }
];

let audioCtx, masterGain, bassOsc, padOsc, lfo, lfoGain, beatTimer;
let currentTrack = 0;
const playlistEl = document.getElementById('playlist');
const trackTitleEl = document.getElementById('trackTitle');
const trackMetaEl = document.getElementById('trackMeta');
const radioStatusEl = document.getElementById('radioStatus');
const volumeSlider = document.getElementById('volumeSlider');

function midiToFreq(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }

function renderPlaylist() {
  if (!playlistEl) return;
  playlistEl.innerHTML = '';
  radioTracks.forEach((track, index) => {
    const button = document.createElement('button');
    button.className = 'track' + (index === currentTrack ? ' active' : '');
    button.innerHTML = `<strong>${String(index + 1).padStart(2, '0')} // ${track.title}</strong><small>${track.meta}</small>`;
    button.addEventListener('click', () => selectTrack(index, true));
    playlistEl.appendChild(button);
  });
}

function updateTrackUI() {
  const track = radioTracks[currentTrack];
  if (trackTitleEl) trackTitleEl.textContent = track.title;
  if (trackMetaEl) trackMetaEl.textContent = track.meta;
  document.querySelectorAll('.track').forEach((el, i) => el.classList.toggle('active', i === currentTrack));
}

function createRadio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.value = (Number(volumeSlider?.value || 32) / 100) * 0.35;
  masterGain.connect(audioCtx.destination);

  bassOsc = audioCtx.createOscillator();
  padOsc = audioCtx.createOscillator();
  lfo = audioCtx.createOscillator();
  lfoGain = audioCtx.createGain();

  const bassFilter = audioCtx.createBiquadFilter();
  bassFilter.type = 'lowpass';
  bassFilter.frequency.value = 420;

  const padFilter = audioCtx.createBiquadFilter();
  padFilter.type = 'lowpass';
  padFilter.frequency.value = 900;

  const bassGain = audioCtx.createGain();
  const padGain = audioCtx.createGain();
  bassGain.gain.value = 0.18;
  padGain.gain.value = 0.07;

  lfo.frequency.value = 0.12;
  lfoGain.gain.value = 180;
  lfo.connect(lfoGain);
  lfoGain.connect(padFilter.frequency);

  bassOsc.connect(bassFilter).connect(bassGain).connect(masterGain);
  padOsc.connect(padFilter).connect(padGain).connect(masterGain);
  bassOsc.start();
  padOsc.start();
  lfo.start();
  applyTrackSound();
}

function applyTrackSound() {
  if (!audioCtx) return;
  const track = radioTracks[currentTrack];
  bassOsc.type = track.wave;
  padOsc.type = 'sawtooth';
  bassOsc.frequency.setTargetAtTime(midiToFreq(track.root), audioCtx.currentTime, 0.05);
  padOsc.frequency.setTargetAtTime(midiToFreq(track.root + 12), audioCtx.currentTime, 0.15);
}

function playBeat() {
  if (!audioCtx || audioCtx.state !== 'running') return;
  const track = radioTracks[currentTrack];
  const now = audioCtx.currentTime;
  const hit = audioCtx.createOscillator();
  const hitGain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();
  hit.type = track.wave;
  hit.frequency.setValueAtTime(midiToFreq(track.root + 24), now);
  hit.frequency.exponentialRampToValueAtTime(midiToFreq(track.root + 3), now + 0.09);
  hitGain.gain.setValueAtTime(0.0001, now);
  hitGain.gain.exponentialRampToValueAtTime(0.16, now + 0.01);
  hitGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
  filter.type = 'bandpass';
  filter.frequency.value = 900;
  hit.connect(filter).connect(hitGain).connect(masterGain);
  hit.start(now);
  hit.stop(now + 0.18);
}

function startBeatLoop() {
  clearInterval(beatTimer);
  const interval = 60000 / radioTracks[currentTrack].bpm;
  beatTimer = setInterval(playBeat, interval);
}

function playRadio() {
  createRadio();
  audioCtx.resume();
  document.body.classList.add('radio-online');
  if (radioStatusEl) radioStatusEl.textContent = 'ONLINE';
  startBeatLoop();
}

function pauseRadio() {
  if (!audioCtx) return;
  audioCtx.suspend();
  clearInterval(beatTimer);
  document.body.classList.remove('radio-online');
  if (radioStatusEl) radioStatusEl.textContent = 'PAUSED';
}

function selectTrack(index, autoPlay = false) {
  currentTrack = index % radioTracks.length;
  updateTrackUI();
  applyTrackSound();
  if (autoPlay) playRadio();
}

renderPlaylist();
updateTrackUI();
document.getElementById('playRadio')?.addEventListener('click', playRadio);
document.getElementById('pauseRadio')?.addEventListener('click', pauseRadio);
document.getElementById('nextTrack')?.addEventListener('click', () => selectTrack(currentTrack + 1, true));
volumeSlider?.addEventListener('input', e => {
  if (masterGain) masterGain.gain.value = (Number(e.target.value) / 100) * 0.35;
});
