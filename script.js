const photoFiles = [
  "assets/images/photo1.jpg",
  "assets/images/photo2.jpg",
  "assets/images/photo3.jpg",
  "assets/images/photo4.jpg",
  "assets/images/photo5.jpg",
  "assets/images/photo6.jpg",
  "assets/images/photo7.jpg",
  "assets/images/photo8.jpg",
  "assets/images/photo9.jpg"
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
const finalWishButton = document.getElementById("finalWishButton");
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
const missionProgressFill = document.getElementById("missionProgressFill");
const missionProgressText = document.getElementById("missionProgressText");
const repoPreviewFrame = document.querySelector(".repo-preview-frame");
const codeMissionSong = document.getElementById("codeMissionSong");
const dinoAvatar = new Image();
dinoAvatar.src = "assets/images/photo2.jpg";

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
    await playBirthdaySong();
  } else {
    song.pause();
    songButton.textContent = "Play Song";
  }
});

song.addEventListener("ended", () => {
  songButton.textContent = "Play Song";
});

async function playBirthdaySong() {
  try {
    await song.play();
    songButton.textContent = "Pause Song";
    return true;
  } catch {
    songButton.textContent = "Tap Again to Play";
    return false;
  }
}

let lineIndex = 0;
let charIndex = 0;
const storyLines = [
  "You made it here, and this little birthday world is all for you.",
  "I wanted this mission to feel like a soft celebration from start to finish.",
  "Happy 23rd birthday, Venezya. I hope today feels warm, lovely, and unforgettable.",
  "Scroll slowly, smile often, and keep every tiny roar of joy."
];

function typeWriter() {
  const current = storyLines[lineIndex];
  if (charIndex <= current.length) {
    typeText.textContent = current.slice(0, charIndex++);
    setTimeout(typeWriter, 50);
    return;
  }

  setTimeout(() => {
    charIndex = 0;
    lineIndex = (lineIndex + 1) % storyLines.length;
    typeText.textContent = "";
    typeWriter();
  }, 1400);
}

surpriseButton.addEventListener("click", () => {
  megaSurprise();
});

finalWishButton?.addEventListener("click", () => {
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
  const ctxAudio = getSharedAudioContext();
  if (!ctxAudio) return;

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
}

let sharedAudioContext = null;

function getSharedAudioContext() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;

  if (!sharedAudioContext || sharedAudioContext.state === "closed") {
    sharedAudioContext = new AudioCtx();
  }

  if (sharedAudioContext.state === "suspended") {
    sharedAudioContext.resume().catch(() => {});
  }

  return sharedAudioContext;
}

function playJumpSfx() {
  const audioContext = getSharedAudioContext();
  if (!audioContext) return;

  const now = audioContext.currentTime;
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
  gain.connect(audioContext.destination);

  const chirp = audioContext.createOscillator();
  chirp.type = "triangle";
  chirp.frequency.setValueAtTime(480, now);
  chirp.frequency.exponentialRampToValueAtTime(760, now + 0.11);
  chirp.frequency.exponentialRampToValueAtTime(620, now + 0.28);
  chirp.connect(gain);
  chirp.start(now);

  const sparkle = audioContext.createOscillator();
  sparkle.type = "sine";
  sparkle.frequency.setValueAtTime(880, now + 0.04);
  sparkle.frequency.exponentialRampToValueAtTime(1180, now + 0.16);
  sparkle.connect(gain);
  sparkle.start(now + 0.03);

  chirp.stop(now + 0.28);
  sparkle.stop(now + 0.18);
}

function playCrashSfx() {
  const audioContext = getSharedAudioContext();
  if (!audioContext) return;

  const now = audioContext.currentTime;
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.07, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
  gain.connect(audioContext.destination);

  const bonk = audioContext.createOscillator();
  bonk.type = "triangle";
  bonk.frequency.setValueAtTime(260, now);
  bonk.frequency.exponentialRampToValueAtTime(160, now + 0.14);
  bonk.frequency.exponentialRampToValueAtTime(110, now + 0.38);
  bonk.connect(gain);
  bonk.start(now);

  const wobble = audioContext.createOscillator();
  wobble.type = "sine";
  wobble.frequency.setValueAtTime(180, now + 0.04);
  wobble.frequency.exponentialRampToValueAtTime(120, now + 0.3);
  wobble.connect(gain);
  wobble.start(now + 0.03);

  bonk.stop(now + 0.38);
  wobble.stop(now + 0.32);
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

function setCodeMissionProgress(percent) {
  const safePercent = Math.max(0, Math.min(100, Number(percent) || 0));
  if (missionProgressFill) {
    missionProgressFill.style.width = `${safePercent}%`;
  }
  if (missionProgressText) {
    missionProgressText.textContent = `Mission Progress: ${safePercent}%`;
  }
}

function lockCodeGateContinue() {
  if (!codeGateContinueButton) return;
  codeGateContinueButton.classList.add("hidden");
  codeGateContinueButton.disabled = true;
}

function unlockCodeGateContinue() {
  if (!codeGateContinueButton) return;
  codeGateContinueButton.classList.remove("hidden");
  codeGateContinueButton.disabled = false;
}

function stopPreviewSong() {
  if (codeMissionSong) {
    codeMissionSong.pause();
    codeMissionSong.currentTime = 0;
  }

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

  // Ensure embedded page is unloaded so mission audio cannot keep playing.
  repoPreviewFrame.src = "about:blank";
}

async function enterBirthdayWorld() {
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
  await playBirthdaySong();
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
  setCodeMissionProgress(0);
  lockCodeGateContinue();
  if (codeMissionSong) {
    codeMissionSong.currentTime = 0;
    codeMissionSong.play().catch(() => {});
  }
  if (repoPreviewFrame) {
    repoPreviewFrame.src = `./happybirthday/index.html?embedded=1&t=${Date.now()}`;
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
let crashSfxPlayed = false;
let lastLandingAt = 0;
let gameClock = 0;

const gravity = 0.6;
const jumpPower = -10.8;
const groundY = dinoCanvas.height - 34;
const dinoHitbox = { left: 7, right: 7, top: 8, bottom: 4 };

function resetDinoGame() {
  obstacles.length = 0;
  gameScore = 0;
  spawnTimer = 0;
  speed = 2.4;
  gameOver = false;
  gameWon = false;
  crashSfxPlayed = false;
  lastLandingAt = 0;
  gameClock = 0;
  dino.y = groundY - dino.height;
  dino.vy = 0;
  dinoScore.textContent = `Score: ${gameScore} / ${TARGET_SCORE}`;
  dinoMessage.textContent = "Press Space or tap the game to help her hop.";
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
  dinoMessage.textContent = "Admin bypass enabled. Princess dino is ready for the next chapter.";
  dinoContinueButton.classList.remove("hidden");
  unlockSite();
}

function jumpDino() {
  if (!gameRunning || gameOver || gameWon) return;
  const onGround = dino.y >= groundY - dino.height - 0.1;
  if (onGround) {
    dino.vy = jumpPower;
    playJumpSfx();
  }
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
  return (
    dino.x + dinoHitbox.left < obs.x + obs.width - 4 &&
    dino.x + dino.width - dinoHitbox.right > obs.x + 4 &&
    dino.y + dinoHitbox.top < obs.y + obs.height - 4 &&
    dino.y + dino.height - dinoHitbox.bottom > obs.y + 4
  );
}

function updateGame(delta) {
  gameClock += delta;
  const wasAirborne = dino.y < groundY - dino.height - 0.1;
  dino.vy += gravity;
  dino.y += dino.vy;
  if (dino.y > groundY - dino.height) {
    dino.y = groundY - dino.height;
    if (wasAirborne) {
      lastLandingAt = gameClock;
    }
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
        dinoMessage.textContent = "She made all 23 hops. Click Enter \u{1F996} World to continue.";
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
    if (!crashSfxPlayed) {
      crashSfxPlayed = true;
      playCrashSfx();
    }
    dinoMessage.textContent = "Almost. Press Restart Game and help the princess dino try again.";
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

  drawPrincessDino();

  dinoCtx.fillStyle = "#4e8a6a";
  obstacles.forEach((obs) => {
    dinoCtx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });
}

function getDinoAnimationState() {
  const airborne = dino.y < groundY - dino.height - 0.1;
  const idleBob = airborne ? 0 : Math.sin(gameClock / 150) * 1.2;
  const landingBounce = Math.max(0, 1 - (gameClock - lastLandingAt) / 160);
  const tilt = airborne ? Math.max(-0.18, Math.min(0.2, dino.vy / 28)) : Math.sin(gameClock / 210) * 0.02;
  const squashY = airborne ? 0.92 : 1 + landingBounce * 0.08;
  const squashX = airborne ? 1.06 : 1 - landingBounce * 0.05;
  const skirtBounce = airborne ? Math.min(2.4, Math.abs(dino.vy) * 0.18) : idleBob * 0.35;
  const crownBounce = airborne ? -Math.min(1.8, Math.abs(dino.vy) * 0.12) : -landingBounce * 1.2;

  return { airborne, idleBob, landingBounce, tilt, squashX, squashY, skirtBounce, crownBounce };
}

function drawPrincessDino() {
  const bodyX = dino.x;
  const bodyY = dino.y;
  const bodyW = dino.width;
  const bodyH = dino.height;
  const state = getDinoAnimationState();

  dinoCtx.save();
  dinoCtx.translate(bodyX + bodyW * 0.52, bodyY + bodyH * 0.27 + state.idleBob);
  dinoCtx.rotate(state.tilt);
  dinoCtx.scale(state.squashX, state.squashY);

  drawDinoTail(bodyW, bodyH);
  drawDinoBody(bodyW, bodyH);
  drawDinoBackSpikes(bodyW, bodyH);
  drawDinoSkirt(bodyW, bodyH, state.skirtBounce);
  drawDinoArms(bodyW, bodyH);
  drawDinoLegs(bodyW, bodyH, state.airborne);
  drawDinoFace(bodyW, bodyH);
  drawDinoCrown(bodyW, bodyH, state.crownBounce);

  dinoCtx.restore();
}

function drawDinoBody(bodyW, bodyH) {
  dinoCtx.fillStyle = "#59ba79";
  dinoCtx.beginPath();
  dinoCtx.ellipse(0, bodyH * 0.26, bodyW * 0.19, bodyH * 0.22, 0, 0, Math.PI * 2);
  dinoCtx.fill();

  dinoCtx.beginPath();
  dinoCtx.ellipse(bodyW * 0.06, -bodyH * 0.22, bodyW * 0.68, bodyH * 0.58, -0.1, 0, Math.PI * 2);
  dinoCtx.fill();

  dinoCtx.fillStyle = "#8fdfab";
  dinoCtx.beginPath();
  dinoCtx.ellipse(bodyW * 0.02, bodyH * 0.2, bodyW * 0.1, bodyH * 0.14, -0.04, 0, Math.PI * 2);
  dinoCtx.fill();
}

function drawDinoTail(bodyW, bodyH) {
  dinoCtx.fillStyle = "#4ba06a";
  dinoCtx.beginPath();
  dinoCtx.moveTo(-bodyW * 0.16, bodyH * 0.28);
  dinoCtx.quadraticCurveTo(-bodyW * 0.46, bodyH * 0.24, -bodyW * 0.44, bodyH * 0.02);
  dinoCtx.quadraticCurveTo(-bodyW * 0.12, bodyH * 0.14, -bodyW * 0.04, bodyH * 0.22);
  dinoCtx.closePath();
  dinoCtx.fill();
}

function drawDinoBackSpikes(bodyW, bodyH) {
  dinoCtx.strokeStyle = "#ffffff";
  dinoCtx.lineWidth = 2;
  for (let i = 0; i < 4; i += 1) {
    const x = -bodyW * 0.08 - i * bodyW * 0.08;
    const y = -bodyH * 0.3 + i * bodyH * 0.09;
    dinoCtx.beginPath();
    dinoCtx.arc(x, y, bodyW * 0.055, Math.PI * 0.12, Math.PI * 1.2);
    dinoCtx.stroke();
  }
}

function drawDinoSkirt(bodyW, bodyH, skirtBounce) {
  const bellyY = bodyH * 0.27 + skirtBounce * 0.4;
  dinoCtx.fillStyle = "rgba(255, 255, 255, 0.18)";
  dinoCtx.beginPath();
  dinoCtx.ellipse(bodyW * 0.02, bellyY, bodyW * 0.1, bodyH * 0.1, 0, 0, Math.PI * 2);
  dinoCtx.fill();
}

function drawDinoArms(bodyW, bodyH) {
  dinoCtx.strokeStyle = "#59ba79";
  dinoCtx.lineCap = "round";
  dinoCtx.lineWidth = bodyW * 0.11;

  dinoCtx.beginPath();
  dinoCtx.moveTo(bodyW * 0.16, bodyH * 0.2);
  dinoCtx.quadraticCurveTo(bodyW * 0.32, bodyH * 0.16, bodyW * 0.26, bodyH * 0.3);
  dinoCtx.stroke();
}

function drawDinoLegs(bodyW, bodyH, airborne) {
  dinoCtx.strokeStyle = "#4ba06a";
  dinoCtx.lineCap = "round";
  dinoCtx.lineWidth = bodyW * 0.1;
  const legLift = airborne ? -bodyH * 0.04 : 0;

  dinoCtx.beginPath();
  dinoCtx.moveTo(-bodyW * 0.03, bodyH * 0.46);
  dinoCtx.lineTo(-bodyW * 0.04, bodyH * 0.74 + legLift);
  dinoCtx.stroke();

  dinoCtx.beginPath();
  dinoCtx.moveTo(bodyW * 0.07, bodyH * 0.44);
  dinoCtx.lineTo(bodyW * 0.08, bodyH * 0.72 + legLift * 0.6);
  dinoCtx.stroke();
}

function drawDinoFace(bodyW, bodyH) {
  const faceX = bodyW * 0.08;
  const faceY = -bodyH * 0.25;
  const faceR = bodyW * 0.5;

  dinoCtx.fillStyle = "#ffe9f1";
  dinoCtx.beginPath();
  dinoCtx.arc(faceX, faceY, faceR + 5, 0, Math.PI * 2);
  dinoCtx.fill();

  dinoCtx.save();
  dinoCtx.beginPath();
  dinoCtx.arc(faceX, faceY, faceR, 0, Math.PI * 2);
  dinoCtx.clip();

  if (dinoAvatar.complete && dinoAvatar.naturalWidth > 0) {
    dinoCtx.drawImage(dinoAvatar, faceX - faceR, faceY - faceR, faceR * 2, faceR * 2);
  } else {
    dinoCtx.fillStyle = "#fff5f8";
    dinoCtx.fillRect(faceX - faceR, faceY - faceR, faceR * 2, faceR * 2);

    dinoCtx.strokeStyle = "#6e1d43";
    dinoCtx.lineWidth = 1.4;
    dinoCtx.lineCap = "round";

    dinoCtx.beginPath();
    dinoCtx.arc(faceX - faceR * 0.1, faceY - faceR * 0.05, faceR * 0.24, Math.PI * 0.15, Math.PI * 0.92);
    dinoCtx.stroke();

    dinoCtx.beginPath();
    dinoCtx.moveTo(faceX - faceR * 0.15, faceY + faceR * 0.32);
    dinoCtx.quadraticCurveTo(faceX + faceR * 0.12, faceY + faceR * 0.5, faceX + faceR * 0.34, faceY + faceR * 0.2);
    dinoCtx.stroke();
  }

  dinoCtx.restore();

  dinoCtx.strokeStyle = "#ffffff";
  dinoCtx.lineWidth = 2;
  dinoCtx.beginPath();
  dinoCtx.arc(faceX, faceY, faceR + 0.5, 0, Math.PI * 2);
  dinoCtx.stroke();

  dinoCtx.strokeStyle = "#c84584";
  dinoCtx.lineWidth = 1;
  dinoCtx.beginPath();
  dinoCtx.arc(faceX, faceY, faceR + 5, 0, Math.PI * 2);
  dinoCtx.stroke();

  dinoCtx.fillStyle = "#ff9dc6";
  dinoCtx.beginPath();
  dinoCtx.arc(faceX - faceR * 0.86, faceY + faceR * 0.62, bodyW * 0.05, 0, Math.PI * 2);
  dinoCtx.fill();
}

function drawDinoCrown(bodyW, bodyH, crownBounce) {
  const crownY = -bodyH * 1.16 + crownBounce;

  dinoCtx.fillStyle = "#f2c64d";
  dinoCtx.beginPath();
  dinoCtx.moveTo(-bodyW * 0.02, crownY + bodyH * 0.05);
  dinoCtx.lineTo(bodyW * 0.04, crownY - bodyH * 0.11);
  dinoCtx.lineTo(bodyW * 0.12, crownY + bodyH * 0.01);
  dinoCtx.lineTo(bodyW * 0.2, crownY - bodyH * 0.14);
  dinoCtx.lineTo(bodyW * 0.27, crownY + bodyH * 0.03);
  dinoCtx.lineTo(bodyW * 0.33, crownY - bodyH * 0.09);
  dinoCtx.lineTo(bodyW * 0.4, crownY + bodyH * 0.06);
  dinoCtx.lineTo(-bodyW * 0.01, crownY + bodyH * 0.06);
  dinoCtx.closePath();
  dinoCtx.fill();

  dinoCtx.fillStyle = "#d7941d";
  dinoCtx.fillRect(bodyW * 0.01, crownY + bodyH * 0.04, bodyW * 0.34, bodyH * 0.05);

  dinoCtx.fillStyle = "#fff8d6";
  dinoCtx.beginPath();
  dinoCtx.arc(bodyW * 0.2, crownY - bodyH * 0.03, bodyW * 0.05, 0, Math.PI * 2);
  dinoCtx.fill();
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

window.addEventListener("message", (event) => {
  if (!repoPreviewFrame || event.source !== repoPreviewFrame.contentWindow) return;
  const payload = event.data || {};
  if (payload.type === "happybirthday:progress") {
    setCodeMissionProgress(payload.value);
    return;
  }
  if (payload.type === "happybirthday:completed") {
    setCodeMissionProgress(100);
    unlockCodeGateContinue();
    codeGateContinueButton?.focus();
    return;
  }
  if (payload.type === "happybirthday:restarted") {
    setCodeMissionProgress(0);
    lockCodeGateContinue();
  }
});
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






