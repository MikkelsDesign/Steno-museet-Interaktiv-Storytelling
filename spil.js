
// -------------------- Setup og variabler -------------------

const player = document.getElementById('player');
const game = document.getElementById('game');
const scoreBoard = document.getElementById('scoreboard');

let x = window.innerWidth / 2 - 20;
let score = 0;
let time = 60;
let left = false; // den venstre pil
let right = false; // den højre pil
let over = false;

function updateScoreboard() {
  scoreBoard.textContent = `Score: ${score} | Time: ${time}`;
}

// -------------------- player kontrol--------------------

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowLeft': left = true; break;
    case 'ArrowRight': right = true; break;
  }
});
document.addEventListener('keyup', e => {
  switch (e.key) {
    case 'ArrowLeft': left = false; break;
    case 'ArrowRight': right = false; break;
  }
});

// -------------------- generalt spillet --------------------


function loop() {
  if (over) return;

  // Opdatere players position alt efter om pil trykkes
  if (left) x = Math.max(0, x - 5);
  if (right) x = Math.min(window.innerWidth - 40, x + 5);
  player.style.left = x + 'px';

  // -------------------- Ting faldene fra himlen (spawning) --------------------

  document.querySelectorAll('.block').forEach(block => {
    block.style.top = (parseFloat(block.style.top) + 4) + 'px';
    if (collides(block, player)) {
      score += block.classList.contains('good') ? 1 : -1;
      block.remove();
    } else if (parseFloat(block.style.top) > window.innerHeight) {
      block.remove();
    }
  });

  // opdatere scoreboard
  updateScoreboard();
  requestAnimationFrame(loop);
}

// (spawn) skaber png der falder ned fra himlen)
setInterval(() => {
  if (over) return;

  const block = document.createElement('div');
  const isGood = Math.random() < 0.5; // Bestemmer tilfældigt om det er en god eller dårlig "blok" der falder
  block.className = 'block ' + (isGood ? 'good' : 'enemy');

  // Vælg tilfældig png til blokken der falder
  const goodImages = ['img/salat.png', 'img/oeble.png', 'img/vand.png']; 
  const enemyImages = ['img/oel.png', 'img/pomfritter.png', 'img/cigerat.png']; 
  const image = isGood
    ? goodImages[Math.floor(Math.random() * goodImages.length)]
    : enemyImages[Math.floor(Math.random() * enemyImages.length)];

  block.style.backgroundImage = `url('${image}')`;
  block.style.backgroundSize = 'contain';
  block.style.backgroundRepeat = 'no-repeat';

  block.style.left = Math.random() * (window.innerWidth - 40) + 'px';
  block.style.top = '0px';
  game.appendChild(block);
}, 700);

// -------------------- Timer --------------------


// nedtællings timer
function tick() {
  if (--time < 0) {
    over = true;
    alert('Game Over! Final Score: ' + score);
  } else {
    updateScoreboard();
    setTimeout(tick, 1000);
  }
}

// Collision check
function collides(a, b) {
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();
  return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
}

// Start spillet
player.style.left = x + 'px';
player.style.bottom = '10px';
loop();
tick();
