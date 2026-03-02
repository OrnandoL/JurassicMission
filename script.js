const photoFiles = [
  "assets/images/photo1.jpg",
  "assets/images/photo2.jpg",
  "assets/images/photo3.jpg",
  "assets/images/photo4.jpg",
  "assets/images/photo5.jpg",
  "assets/images/photo6.jpg"
];

const loveLines = [
  "You make my world brighter than a meteor shower.",
  "Today we celebrate the cutest dino queen turning 23.",
  "Roaring happy birthday, Venezya Setiawan."
];

const gallery = document.getElementById("gallery");
const modal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");
const song = document.getElementById("birthdaySong");
const songButton = document.getElementById("songButton");
const surpriseButton = document.getElementById("surpriseButton");
const typeText = document.getElementById("typeText");
const gate = document.getElementById("gate");
const dinoGate = document.getElementById("dinoGate");
const mainContent = document.getElementById("mainContent");
const gatePassword = document.getElementById("gatePassword");
const gateButton = document.getElementById("gateButton");
const gateError = document.getElementById("gateError");
const dinoCanvas = document.getElementById("dinoCanvas");
const dinoScore = document.getElementById("dinoScore");
const dinoMessage = document.getElementById("dinoMessage");
const dinoStartButton = document.getElementById("dinoStartButton");
const dinoContinueButton = document.getElementById("dinoContinueButton");

const SITE_PASSWORD = "venez23";
const TARGET_SCORE = 23;

mainContent.classList.add("locked");
gatePassword.focus();

photoFiles.forEach((src, i) => {
  const card = document.createElement("button");
  card.className = "photo-card";
  card.setAttribute("aria-label", `Open photo ${i + 1}`);

  const img = document.createElement("img");
  img.src = src;
  img.alt = `Memory ${i + 1}`;
  img.loading = "lazy";

  card.appendChild(img);
  card.addEventListener("click", () => openModal(src, img.alt));
  gallery.appendChild(card);
});

function openModal(src, alt) {
  modalImage.src = src;
  modalImage.alt = alt;
  modal.classList.add("show");
}

function closePhoto() {
  modal.classList.remove("show");
}

closeModal.addEventListener("click", closePhoto);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closePhoto();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePhoto();
});

songButton.addEventListener("click", async () => {
  if (song.paused) {
    try {
      await song.play();
      songButton.textContent = "Pause Song";
    } catch {
      songButton.textContent = "Tap Again to Play";
    }
  } else {
    song.pause();
    songButton.textContent = "Play Birthday Song";
  }
});

song.addEventListener("ended", () => {
  songButton.textContent = "Play Birthday Song";
});

let lineIndex = 0;
let charIndex = 0;

function typeWriter() {
  const current = loveLines[lineIndex];
  if (charIndex <= current.length) {
    typeText.textContent = current.slice(0, charIndex++);
    setTimeout(typeWriter, 50);
    return;
  }

  setTimeout(() => {
    charIndex = 0;
    lineIndex = (lineIndex + 1) % loveLines.length;
    typeText.textContent = "";
    typeWriter();
  }, 1400);
}

surpriseButton.addEventListener("click", () => {
  burstConfetti();
  spawnEggs(16);
});

document.addEventListener("click", (e) => {
  if (mainContent.classList.contains("locked")) return;
  if (e.target.closest("button")) return;
  spawnEggs(4, e.clientX, e.clientY);
});

function spawnEggs(count, x = window.innerWidth / 2, y = window.innerHeight * 0.78) {
  for (let i = 0; i < count; i++) {
    const egg = document.createElement("span");
    egg.className = "egg";
    egg.style.left = `${x + (Math.random() - 0.5) * 70}px`;
    egg.style.top = `${y + (Math.random() - 0.5) * 24}px`;
    document.body.appendChild(egg);
    setTimeout(() => egg.remove(), 1000);
  }
}

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let pieces = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function burstConfetti() {
  const colors = ["#2d6a4f", "#95d5b2", "#e9c46a", "#f4a261", "#e76f51"];
  for (let i = 0; i < 130; i++) {
    pieces.push({
      x: canvas.width / 2,
      y: canvas.height * 0.34,
      vx: (Math.random() - 0.5) * 9,
      vy: Math.random() * -6 - 2,
      size: Math.random() * 7 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 110
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces = pieces.filter((p) => p.life > 0);
  pieces.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.12;
    p.life -= 1;

    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });

  requestAnimationFrame(drawConfetti);
}

function unlockSite() {
  gate.classList.add("hidden");
  dinoGate.classList.add("hidden");
  mainContent.classList.remove("locked");
  mainContent.setAttribute("aria-hidden", "false");
  gate.setAttribute("aria-hidden", "true");
  dinoGate.setAttribute("aria-hidden", "true");
  gateError.textContent = "";
  gatePassword.value = "";
}

function showDinoGate() {
  gate.classList.add("hidden");
  gate.setAttribute("aria-hidden", "true");
  dinoGate.classList.remove("hidden");
  dinoGate.setAttribute("aria-hidden", "false");
}

function tryUnlock() {
  if (gatePassword.value.trim() === SITE_PASSWORD) {
    showDinoGate();
    return;
  }

  gateError.textContent = "Wrong password. Try again.";
}

gateButton.addEventListener("click", tryUnlock);
gatePassword.addEventListener("keydown", (e) => {
  if (e.key === "Enter") tryUnlock();
});

const dinoCtx = dinoCanvas.getContext("2d");
const dino = { x: 42, y: 0, width: 28, height: 32, vy: 0 };
const obstacles = [];
let gameRunning = false;
let gameOver = false;
let gameWon = false;
let gameScore = 0;
let lastFrame = 0;
let spawnTimer = 0;
let speed = 2.4;

const gravity = 0.6;
const jumpPower = -10.8;
const groundY = dinoCanvas.height - 34;

function resetDinoGame() {
  obstacles.length = 0;
  gameScore = 0;
  spawnTimer = 0;
  speed = 2.4;
  gameOver = false;
  gameWon = false;
  dino.y = groundY - dino.height;
  dino.vy = 0;
  dinoScore.textContent = `Score: ${gameScore} / ${TARGET_SCORE}`;
  dinoMessage.textContent = "Press Space or tap the game to jump.";
  dinoContinueButton.classList.add("hidden");
  drawGame();
}

function startDinoGame() {
  resetDinoGame();
  gameRunning = true;
  dinoStartButton.textContent = "Restart Game";
}

function jumpDino() {
  if (!gameRunning || gameOver || gameWon) return;
  const onGround = dino.y >= groundY - dino.height - 0.1;
  if (onGround) dino.vy = jumpPower;
}

function spawnObstacle() {
  const height = 22 + Math.random() * 16;
  const width = 10 + Math.random() * 6;
  obstacles.push({
    x: dinoCanvas.width + 10,
    y: groundY - height,
    width,
    height,
    counted: false
  });
}

function checkCollision(obs) {
  const padding = 5;
  return (
    dino.x + padding < obs.x + obs.width - padding &&
    dino.x + dino.width - padding > obs.x + padding &&
    dino.y + padding < obs.y + obs.height - padding &&
    dino.y + dino.height - padding > obs.y + padding
  );
}

function updateGame(delta) {
  dino.vy += gravity;
  dino.y += dino.vy;
  if (dino.y > groundY - dino.height) {
    dino.y = groundY - dino.height;
    dino.vy = 0;
  }

  spawnTimer += delta;
  if (spawnTimer > 1300 + Math.random() * 700) {
    spawnObstacle();
    spawnTimer = 0;
  }

  speed += 0.00035 * delta;
  obstacles.forEach((obs) => {
    obs.x -= speed;
    if (!obs.counted && obs.x + obs.width < dino.x) {
      obs.counted = true;
      gameScore += 1;
      dinoScore.textContent = `Score: ${gameScore} / ${TARGET_SCORE}`;
      if (gameScore >= TARGET_SCORE) {
        gameWon = true;
        gameRunning = false;
        dinoMessage.textContent = "You reached 23. You are already 23rd today, birthday queen.";
        dinoContinueButton.classList.remove("hidden");
        dinoContinueButton.focus();
      }
    }
  });

  while (obstacles.length && obstacles[0].x + obstacles[0].width < -20) {
    obstacles.shift();
  }

  if (!gameWon && obstacles.some(checkCollision)) {
    gameOver = true;
    gameRunning = false;
    dinoMessage.textContent = "Oops, dino crashed. Press Restart Game and try again.";
  }
}

function drawGame() {
  dinoCtx.clearRect(0, 0, dinoCanvas.width, dinoCanvas.height);

  dinoCtx.strokeStyle = "#355f4a";
  dinoCtx.lineWidth = 2;
  dinoCtx.beginPath();
  dinoCtx.moveTo(0, groundY + 1);
  dinoCtx.lineTo(dinoCanvas.width, groundY + 1);
  dinoCtx.stroke();

  dinoCtx.fillStyle = "#2d6a4f";
  dinoCtx.fillRect(dino.x, dino.y, dino.width, dino.height);
  dinoCtx.fillRect(dino.x + 8, dino.y - 8, 12, 10);

  dinoCtx.fillStyle = "#4e8a6a";
  obstacles.forEach((obs) => {
    dinoCtx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });
}

function gameLoop(ts) {
  const delta = lastFrame ? ts - lastFrame : 16;
  lastFrame = ts;

  if (gameRunning) updateGame(delta);
  drawGame();
  requestAnimationFrame(gameLoop);
}

dinoStartButton.addEventListener("click", startDinoGame);
dinoContinueButton.addEventListener("click", unlockSite);
dinoCanvas.addEventListener("pointerdown", jumpDino);
document.addEventListener("keydown", (e) => {
  if (dinoGate.classList.contains("hidden")) return;
  if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
  if (e.code === "Space" || e.key === "ArrowUp") {
    e.preventDefault();
    jumpDino();
  }
});

resetDinoGame();
requestAnimationFrame(gameLoop);

drawConfetti();
typeWriter();
setTimeout(burstConfetti, 500);
