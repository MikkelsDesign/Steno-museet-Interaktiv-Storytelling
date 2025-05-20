
// ———————— 1) Helper: persist scores —————————
function saveScoreToStorage(name, score) {
  const key = 'stenoLeaderboard';
  const entries = JSON.parse(localStorage.getItem(key) || '[]');
  entries.push({ name, score });
  localStorage.setItem(key, JSON.stringify(entries));
}

// -------------------- Setup og variabler -------------------
function initGame() {

const player = document.getElementById('player');
const game = document.getElementById('game');
const scoreBoard = document.getElementById('scoreboard');
const overlay    = document.getElementById('gameover');
const finalScore = document.getElementById('final-score');
const toLB       = document.getElementById('to-leaderboard');

let x = window.innerWidth / 2 - 20;
let score = 0;
let time = 60;
let left = false; // den venstre pil
let right = false; // den højre pil
let over = false;

function updateScoreboard() {
  scoreBoard.textContent = `Point: ${score} | Tid: ${time}`;
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


// -------------------- controls på skærm  --------------------
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

if (leftBtn && rightBtn) {
  // venstre knap
  leftBtn.addEventListener('mousedown', () => left = true);
  leftBtn.addEventListener('mouseup', () => left = false);
  leftBtn.addEventListener('mouseleave', () => left = false); // if mouse leaves while holding
  leftBtn.addEventListener('touchstart', e => { e.preventDefault(); left = true; });
  leftBtn.addEventListener('touchend', e => { e.preventDefault(); left = false; });

  // højre knap
  rightBtn.addEventListener('mousedown', () => right = true);
  rightBtn.addEventListener('mouseup', () => right = false);
  rightBtn.addEventListener('mouseleave', () => right = false);
  rightBtn.addEventListener('touchstart', e => { e.preventDefault(); right = true; });
  rightBtn.addEventListener('touchend', e => { e.preventDefault(); right = false; });
}

//  mousedown/mouseup: computer controls
//  touchstart/touchend: Mobil controls
//  mouseleave: gør at player stopper når man slipper knappen

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

      // show overlay + score
      finalScore.textContent = `Din Score: ${score}`;
      overlay.classList.remove('hidden');

      // prompt & save
      const name = prompt('Skriv dit navn til leaderboardet:', 'Navn');
      if (name !== null) {
        saveScoreToStorage(name.trim() || 'Navn', score);
      }

      // button handler
      toLB.addEventListener('click', () => {
        window.location.href = 'leaderboard.html';
      });

    } else {
      updateScoreboard();
      setTimeout(tick, 1000);
    }
  }




// Start spillet
player.style.left = x + 'px';
player.style.bottom = '10px';
loop();
tick();

}

// ------------------------------------LEADERBOARD----------------------------------


function initLeaderboard() {
  const listEl = document.getElementById('leaderboard-list');
  if (!listEl) return;
  const entries = JSON.parse(localStorage.getItem('stenoLeaderboard')||'[]')
                      .sort((a,b)=>b.score - a.score);
  entries.forEach((e,i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="rank">${i+1}.</span>
      <span class="name">${e.name}</span>
      <span class="score">${e.score}</span>
    `;
    listEl.appendChild(li);
  });
}

// Collision check
function collides(a, b) {
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();
  return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
}


// ———————— 5) Auto-init on DOMContentLoaded ——————
document.addEventListener('DOMContentLoaded', () => {
  // If your page has an element with id="game", start the game
  if (document.getElementById('game')) {
    initGame();
  }

  // If your page has an element with id="leaderboard-list", render it
  if (document.getElementById('leaderboard-list')) {
    initLeaderboard();
  }
});