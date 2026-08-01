// 1. CANVAS FUTURISTA / CYBER GRID
const canvas = document.getElementById('cyber-grid');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = 'rgba(0, 225, 255, 0.05)';
  ctx.lineWidth = 1;

  const gridSize = 40;
  
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Resplandor ligero cerca al mouse
  let gradient = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, 250);
  gradient.addColorStop(0, 'rgba(0, 225, 255, 0.15)');
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(drawGrid);
}
drawGrid();

// 2. TERMINAL INTERACTIVA BASH
const input = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');

const commands = {
  'help': 'Comandos disponibles: <span class="highlight">proyectos</span>, <span class="highlight">contacto</span>, <span class="highlight">skills</span>, <span class="highlight">clear</span>, <span class="highlight">quiensoy</span>',
  'quiensoy': 'Johan Cruz : Creador de contenido multimedia, editor de video, diseñador de marca y desarrollador web.',
  'proyectos': 'Desplázate hacia abajo a la sección [MATRIX_WORK] o haz clic en las tarjetas del Bento Grid.',
  'skills': 'Premiere (95%), Motion Graphics (88%), Photoshop/Illustrator (92%), Web Dev (82%).',
  'contacto': 'WhatsApp Directo: +57 302 289 1516 | IG: @by.fg_portafolio'
};

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = input.value.trim().toLowerCase();
    
    // Crear línea de comando ingresado
    const userLine = document.createElement('p');
    userLine.className = 'system-msg';
    userLine.innerHTML = `<span class="prompt">fg@multimedia:~$</span> ${val}`;
    terminalBody.appendChild(userLine);

    if (val === 'clear') {
      terminalBody.innerHTML = '';
    } else if (commands[val]) {
      const responseLine = document.createElement('p');
      responseLine.className = 'system-msg';
      responseLine.innerHTML = `> ${commands[val]}`;
      terminalBody.appendChild(responseLine);
    } else if (val !== '') {
      const errorLine = document.createElement('p');
      errorLine.className = 'system-msg';
      errorLine.innerHTML = `> Comando no reconocido: '${val}'. Escribe <span class="highlight">'help'</span>.`;
      terminalBody.appendChild(errorLine);
    }

    input.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
});

// 3. MODAL HUD INTERACTIVO
function openHudModal(title, desc, imgSrc, category) {
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-desc').innerText = desc;
  document.getElementById('modal-img').src = imgSrc;
  document.getElementById('modal-category').innerText = `// ${category}`;
  document.getElementById('hud-modal').style.display = 'flex';
}

function closeHudModal() {
  document.getElementById('hud-modal').style.display = 'none';
}

// Cerrar si hace clic fuera del contenido
window.addEventListener('click', (e) => {
  const modal = document.getElementById('hud-modal');
  if (e.target === modal) {
    closeHudModal();
  }
});