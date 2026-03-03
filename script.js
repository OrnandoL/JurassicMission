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
  "Today we celebrate the cutest 🦖 queen turning 23.",
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
const codeGate = document.getElementById("codeGate");
const mainContent = document.getElementById("mainContent");
const gatePassword = document.getElementById("gatePassword");
const gateButton = document.getElementById("gateButton");
const gateError = document.getElementById("gateError");
const dinoCanvas = document.getElementById("dinoCanvas");
const dinoScore = document.getElementById("dinoScore");
const dinoMessage = document.getElementById("dinoMessage");
const dinoStartButton = document.getElementById("dinoStartButton");
const adminSkipButton = document.getElementById("adminSkipButton");
const dinoContinueButton = document.getElementById("dinoContinueButton");
const codeGateContinueButton = document.getElementById("codeGateContinueButton");
const repoPreviewFrame = document.querySelector(".repo-preview-frame");

const SITE_PASSWORD = "venez23";
const TARGET_SCORE = 23;
const isAdminMode = new URLSearchParams(window.location.search).get("admin") === "1";

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
  megaSurprise();
});

document.addEventListener("click", (e) => {
  if (mainContent.classList.contains("locked")) return;
  if (e.target.closest("button")) return;
  spawnEggs(4, e.clientX, e.clientY);
});

function spawnEggs(count, x = window.innerWidth / 2, y = window.innerHeight * 0.78, spread = 70, life = 1000) {
  for (let i = 0; i < count; i++) {
    const egg = document.createElement("span");
    egg.className = "egg";
    egg.style.left = `${x + (Math.random() - 0.5) * spread}px`;
    egg.style.top = `${y + (Math.random() - 0.5) * 24}px`;
    document.body.appendChild(egg);
    setTimeout(() => egg.remove(), life);
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

function burstConfetti(originX = canvas.width / 2, originY = canvas.height * 0.34, amount = 130) {
  const colors = ["#2d6a4f", "#95d5b2", "#e9c46a", "#f4a261", "#e76f51"];
  for (let i = 0; i < amount; i++) {
    pieces.push({
      x: originX,
      y: originY,
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * -7 - 2.5,
      size: Math.random() * 8 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 125
    });
  }
}

function shakeScreen(duration = 700) {
  document.body.classList.add("screen-shake");
  setTimeout(() => document.body.classList.remove("screen-shake"), duration);
}

function showRoarBanner() {
  const banner = document.createElement("div");
  banner.className = "roar-banner";
  banner.textContent = "RAWR !!!";
  document.body.appendChild(banner);
  setTimeout(() => banner.remove(), 1300);
}

function rainEggs() {
  for (let i = 0; i < 26; i++) {
    setTimeout(() => {
      spawnEggs(1, 40 + Math.random() * (window.innerWidth - 80), 90 + Math.random() * 60, 20, 1200);
    }, i * 45);
  }
}

function megaSurprise() {
  const w = canvas.width;
  const h = canvas.height;
  playCuteRoar();
  burstConfetti(w * 0.5, h * 0.33, 180);
  setTimeout(() => burstConfetti(w * 0.25, h * 0.28, 120), 180);
  setTimeout(() => burstConfetti(w * 0.75, h * 0.28, 120), 300);
  spawnEggs(32, window.innerWidth / 2, window.innerHeight * 0.75, 220, 1200);
  rainEggs();
  shakeScreen(700);
  showRoarBanner();
}

function playCuteRoar() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const ctxAudio = new AudioCtx();
  const now = ctxAudio.currentTime;
  const master = ctxAudio.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.2, now + 0.04);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
  master.connect(ctxAudio.destination);

  const roar = ctxAudio.createOscillator();
  roar.type = "sawtooth";
  roar.frequency.setValueAtTime(250, now);
  roar.frequency.exponentialRampToValueAtTime(120, now + 0.35);
  roar.frequency.exponentialRampToValueAtTime(170, now + 0.55);

  const roarFilter = ctxAudio.createBiquadFilter();
  roarFilter.type = "lowpass";
  roarFilter.frequency.setValueAtTime(850, now);

  const chirp = ctxAudio.createOscillator();
  chirp.type = "triangle";
  chirp.frequency.setValueAtTime(520, now + 0.32);
  chirp.frequency.exponentialRampToValueAtTime(380, now + 0.62);

  const chirpGain = ctxAudio.createGain();
  chirpGain.gain.setValueAtTime(0.0001, now);
  chirpGain.gain.exponentialRampToValueAtTime(0.1, now + 0.34);
  chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.74);

  roar.connect(roarFilter);
  roarFilter.connect(master);
  chirp.connect(chirpGain);
  chirpGain.connect(master);

  roar.start(now);
  chirp.start(now + 0.28);
  roar.stop(now + 0.82);
  chirp.stop(now + 0.8);

  setTimeout(() => {
    ctxAudio.close();
  }, 1000);
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
  if (!gameWon) {
    dinoMessage.textContent = `You must score ${TARGET_SCORE} first before entering \u{1F996} World.`;
    window.alert(`Clear the game first. Reach score ${TARGET_SCORE} to unlock \u{1F996} World.`);
    return;
  }

  showCodeGate();
}

function stopPreviewSong() {
  if (!repoPreviewFrame) return;

  try {
    const frameDoc = repoPreviewFrame.contentDocument || repoPreviewFrame.contentWindow?.document;
    if (!frameDoc) return;

    const audios = frameDoc.querySelectorAll("audio, .song");
    audios.forEach((audioEl) => {
      audioEl.pause();
      audioEl.currentTime = 0;
    });
  } catch {
    // Ignore cross-frame access issues.
  }

  // Ensure embedded page is unloaded so hbd.mpeg cannot keep playing.
  repoPreviewFrame.src = "about:blank";
}

function enterBirthdayWorld() {
  stopPreviewSong();
  gate.classList.add("hidden");
  dinoGate.classList.add("hidden");
  codeGate.classList.add("hidden");
  mainContent.classList.remove("locked");
  mainContent.setAttribute("aria-hidden", "false");
  gate.setAttribute("aria-hidden", "true");
  dinoGate.setAttribute("aria-hidden", "true");
  codeGate.setAttribute("aria-hidden", "true");
  gateError.textContent = "";
  gatePassword.value = "";
}

function showDinoGate() {
  gate.classList.add("hidden");
  gate.setAttribute("aria-hidden", "true");
  dinoGate.classList.remove("hidden");
  dinoGate.setAttribute("aria-hidden", "false");
  if (adminSkipButton) {
    adminSkipButton.hidden = !isAdminMode;
  }
  if (isAdminMode && adminSkipButton) {
    dinoMessage.textContent = "Admin mode active. You can skip this game.";
  }
}

function showCodeGate() {
  dinoGate.classList.add("hidden");
  dinoGate.setAttribute("aria-hidden", "true");
  codeGate.classList.remove("hidden");
  codeGate.setAttribute("aria-hidden", "false");
  if (codeGateContinueButton) {
    codeGateContinueButton.focus();
  }
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

function adminSkipDinoGame() {
  if (!isAdminMode || !dinoContinueButton) return;
  gameWon = true;
  gameRunning = false;
  gameOver = false;
  gameScore = TARGET_SCORE;
  dinoScore.textContent = `Score: ${TARGET_SCORE} / ${TARGET_SCORE}`;
  dinoMessage.textContent = "Admin bypass enabled. Entering \u{1F996} World.";
  dinoContinueButton.classList.remove("hidden");
  unlockSite();
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
        dinoMessage.textContent = "You reached 23 jumps. Click Enter \u{1F996} World to continue.";
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
    dinoMessage.textContent = "Oops, 🦖 crashed. Press Restart Game and try again.";
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

  const bodyX = dino.x;
  const bodyY = dino.y;
  const bodyW = dino.width;
  const bodyH = dino.height;
  const centerX = bodyX + bodyW * 0.5;
  const centerY = bodyY + bodyH * 0.58;

  dinoCtx.fillStyle = "#5fbf7f";
  dinoCtx.beginPath();
  dinoCtx.ellipse(centerX, centerY, bodyW * 0.52, bodyH * 0.46, 0, 0, Math.PI * 2);
  dinoCtx.fill();

  dinoCtx.fillStyle = "#72cf90";
  dinoCtx.beginPath();
  dinoCtx.ellipse(bodyX + bodyW * 0.68, bodyY + bodyH * 0.28, bodyW * 0.28, bodyH * 0.25, 0, 0, Math.PI * 2);
  dinoCtx.fill();

  dinoCtx.fillStyle = "#4f9b68";
  dinoCtx.beginPath();
  dinoCtx.moveTo(bodyX + bodyW * 0.04, bodyY + bodyH * 0.72);
  dinoCtx.lineTo(bodyX - bodyW * 0.22, bodyY + bodyH * 0.58);
  dinoCtx.lineTo(bodyX + bodyW * 0.08, bodyY + bodyH * 0.46);
  dinoCtx.closePath();
  dinoCtx.fill();

  dinoCtx.fillStyle = "#4f9b68";
  dinoCtx.fillRect(bodyX + bodyW * 0.3, bodyY + bodyH * 0.88, bodyW * 0.17, bodyH * 0.14);
  dinoCtx.fillRect(bodyX + bodyW * 0.56, bodyY + bodyH * 0.88, bodyW * 0.17, bodyH * 0.14);

  dinoCtx.fillStyle = "#1f3b2b";
  dinoCtx.beginPath();
  dinoCtx.arc(bodyX + bodyW * 0.76, bodyY + bodyH * 0.25, 2.2, 0, Math.PI * 2);
  dinoCtx.fill();

  dinoCtx.fillStyle = "#ff8fb0";
  dinoCtx.beginPath();
  dinoCtx.arc(bodyX + bodyW * 0.69, bodyY + bodyH * 0.33, 2.6, 0, Math.PI * 2);
  dinoCtx.fill();

  dinoCtx.fillStyle = "#f46c98";
  dinoCtx.beginPath();
  dinoCtx.arc(bodyX + bodyW * 0.81, bodyY + bodyH * 0.08, 3.1, 0, Math.PI * 2);
  dinoCtx.arc(bodyX + bodyW * 0.69, bodyY + bodyH * 0.08, 3.1, 0, Math.PI * 2);
  dinoCtx.fill();
  dinoCtx.fillStyle = "#f7a6c2";
  dinoCtx.fillRect(bodyX + bodyW * 0.72, bodyY + bodyH * 0.06, 3.4, 4.2);

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
if (adminSkipButton) {
  adminSkipButton.addEventListener("click", adminSkipDinoGame);
}
dinoContinueButton.addEventListener("click", unlockSite);
if (codeGateContinueButton) {
  codeGateContinueButton.addEventListener("click", enterBirthdayWorld);
}
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


