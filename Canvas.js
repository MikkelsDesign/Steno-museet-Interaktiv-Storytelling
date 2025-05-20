const canvas = document.getElementById('webCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const nodes = [];
const nodeCount = 100;
const maxDist = 150;

// Color palette
const colors = {
  darkOrange: '#BB6620',
  mediumOrange: '#D7811E',
  lightOrange: '#FEA743',
  paleOrange: '#FFCA8C'
};

for (let i = 0; i < nodeCount; i++) {
  nodes.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  });
}

function drawWeb() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < nodes.length; i++) {
    const n1 = nodes[i];
    n1.x += n1.vx;
    n1.y += n1.vy;

    if (n1.x < 0 || n1.x > width) n1.vx *= -1;
    if (n1.y < 0 || n1.y > height) n1.vy *= -1;

    for (let j = i + 1; j < nodes.length; j++) {
      const n2 = nodes[j];
      const dx = n1.x - n2.x;
      const dy = n1.y - n2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const opacity = 1 - dist / maxDist;
        // Use different colors based on distance
        let color;
        if (dist < maxDist * 0.33) {
          color = colors.darkOrange;
        } else if (dist < maxDist * 0.66) {
          color = colors.mediumOrange;
        } else {
          color = colors.lightOrange;
        }
        
        ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
      }
    }

    // Use paleOrange for nodes
    ctx.fillStyle = colors.darkOrange;
    ctx.beginPath();
    ctx.arc(n1.x, n1.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

function animate() {
  drawWeb();
  requestAnimationFrame(animate);
}

animate();