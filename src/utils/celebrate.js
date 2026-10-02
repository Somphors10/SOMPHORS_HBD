const CONFETTI_COLORS = ["#DDCCEF", "#C8AFE4", "#AA8BCF", "#FFFFFF", "#E6C98A", "#F1CFDC", "#8B69B3"];
const HEARTS = ["♡", "💜", "✦", "✨", "♥", "🤍", "✧"];

function getLayer() {
  let layer = document.getElementById("celebrate-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "celebrate-layer";
    document.body.appendChild(layer);
  }
  return layer;
}

export function spawnConfetti(count = 70) {
  const layer = getLayer();

  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("span");
    const isRibbon = i % 7 === 0;
    piece.className = isRibbon ? "confetti-piece ribbon" : "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    piece.style.setProperty("--spin", `${Math.random() * 720 - 360}deg`);
    piece.style.setProperty("--delay", `${Math.random() * 0.35}s`);
    piece.style.setProperty("--size", `${6 + Math.random() * 8}px`);
    layer.appendChild(piece);
    window.setTimeout(() => piece.remove(), 3800);
  }
}

export function spawnHearts(count = 18) {
  const layer = getLayer();

  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = HEARTS[i % HEARTS.length];
    heart.style.left = `${10 + Math.random() * 80}vw`;
    heart.style.setProperty("--delay", `${Math.random() * 0.5}s`);
    heart.style.setProperty("--duration", `${3.4 + Math.random() * 1.6}s`);
    layer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 5200);
  }
}

export function celebrate(options = {}) {
  spawnConfetti(options.confetti ?? 70);
  spawnHearts(options.hearts ?? 18);
}
