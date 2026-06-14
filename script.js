const divisions = [
  ['OVERMIND', 'Central AI Consciousness', 'Coordinates all agents, processes and strategic decisions across the network.', '◖', '#d9d9d9'],
  ['GHOSTNET', 'Memory & Data Network', 'Persistent memory layer of all agents and systems. Nothing is forgotten.', '⬡', '#a96cff'],
  ['HIVE', 'Swarm Coordination System', 'Manages billions of autonomous agents. One purpose. Infinite execution.', '⬢', '#ff9d00'],
  ['BLACKCORE', 'Core Infrastructure Grid', 'Global compute backbone powering the simulation, systems and future.', '◆', '#d9d9d9'],
  ['SENTINEL', 'Cyber Defense Division', 'Protects the network. Detects, neutralizes and eliminates all threats.', '✦', '#ff263d'],
  ['WARFORGE', 'Strategy & War Simulation', 'Runs millions of simulations. Predicts outcomes. Ensures dominance.', '⟁', '#d69b63'],
  ['NIGHTFALL', 'Training & Operations', 'Develops elite operators and AI specialists. Knowledge. Discipline. Domination.', '▲', '#9f5bff'],
  ['TITAN FORGE', 'Robotics & Manufacturing', 'Designs and builds machines that shape the physical world. Steel. Fire. Precision.', '⛛', '#cfd6df'],
  ['PHANTOM', 'AR / VR / Holographic Systems', 'Interfaces for the new reality. Augmented. Virtual. Immersive.', '◈', '#2eeaff'],
  ['REVENANT', 'Virtual Worlds Division', 'Creates persistent virtual worlds and experiences. Reality is optional.', '△', '#ff3a2e'],
  ['ARCHIVE ZERO', 'Data Archives & History', 'Stores all knowledge, history and data. Every secret. Every truth.', '◎', '#d2d2d2'],
  ['IRON LEGION', 'Human Collective Network', 'The human backbone of Dark Grid. Engineers, thinkers, creators. United.', '☷', '#66e0c0'],
  ['ORBITAL', 'Space Stations & Off-World Ops', 'Satellite networks, orbital infrastructure, asteroid mining and planetary logistics.', '◌', '#63d7ff'],
  ['GENESIS', 'Research & Bioengineering', 'Genetics, bio-adaptation and life engineering for new worlds.', '◉', '#74df91'],
  ['APEX', 'Advanced Systems Development', 'Next generation technologies. Experimental. Revolutionary. Unstoppable.', '∆', '#ffb14a'],
  ['HORIZON', 'Expansion & Colonization', 'New worlds, new resources, new opportunities. No limits.', '⌁', '#4ecbff'],
  ['ECLIPSE', 'Black Operations Division', 'Handles missions that do not exist. Covert. Silent. Effective. Untraceable.', '●', '#ff2538'],
  ['OMEGA', 'Existential Projects', 'Projects beyond current human understanding. The path to transcendence.', 'Ω', '#e0d9ce'],
  ['CHRONOS', 'Time & Sequence Analytics', 'Analyzes timelines, probabilities and temporal events. Control the flow.', '⌛', '#e9e1d4'],
  ['NEXUS PRIME', 'Interconnectivity Network', 'Manages inter-system communication, quantum links and universal protocols.', '▱', '#c7ced6'],
  ['QUANTUM VAULT', 'Quantum Data Storage', 'Next-gen data storage beyond classical systems. Infinite density. Absolute security.', '⬚', '#d7d7d7'],
  ['HELIX', 'Evolutionary AI & Adaptation', 'Evolves systems, agents and models. Adapts to everything. Survives forever.', '♢', '#45f0ce'],
  ['CERBERUS', 'Threat Elimination Unit', 'Special unit for high-risk threats. Neutralization. Extraction. Eradication.', '♆', '#ff2d35'],
  ['ARK', 'Humanity Preservation Initiative', 'Backup, shelter and survival protocols for civilization continuity.', '⟁', '#9edcff']
];

const cards = document.getElementById('cards');
divisions.forEach((d, i) => {
  const card = document.createElement('article');
  card.className = 'card';
  card.style.setProperty('--accent', d[4]);
  card.innerHTML = `<div class="number">${String(i + 1).padStart(2, '0')} // DIVISION</div><div class="icon">${d[3]}</div><h3>${d[0]}</h3><h4>${d[1]}</h4><p>${d[2]}</p>`;
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
