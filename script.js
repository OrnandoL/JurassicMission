const galleryPhotos = [
  { src: "assets/images/photo1.jpg", alt: "Memory 1" },
  { src: "assets/images/photo2.jpg", alt: "Memory 2" },
  { src: "assets/images/photo3.jpg", alt: "Memory 3" },
  { src: "assets/images/photo4.jpg", alt: "Memory 4" },
  { src: "assets/images/photo5.jpg", alt: "Memory 5" },
  { src: "assets/images/photo6.jpg", alt: "Memory 6" },
  { src: "assets/images/photo7.jpg", alt: "Memory 7" }
];

const loveLines = [
  "Mission complete, birthday girl. This world is finally yours.",
  "Today we celebrate the cutest dinosaur queen turning 23.",
  "Every little surprise here was made to feel like you."
];

const spotlightMoments = [
  {
    tag: "Soft Energy",
    title: "You make everything feel calmer",
    body: "Even the loudest days feel easier when your warmth is somewhere inside them."
  },
  {
    tag: "Main Character",
    title: "You have the sweetest kind of glow",
    body: "The kind that makes simple moments feel bright, memorable, and worth keeping."
  },
  {
    tag: "Favorite Person",
    title: "You are fun in the best way",
    body: "Cute, playful, and unforgettable. Basically the reason this whole birthday mission exists."
  }
];

const heartReasons = [
  {
    title: "You make ordinary moments feel important",
    body: "That is such a rare gift, and it is one of the reasons people feel safe and happy around you."
  },
  {
    title: "You carry softness and strength at the same time",
    body: "You can be gentle without ever feeling small, and that balance is beautiful."
  },
  {
    title: "You deserve a year full of good things",
    body: "More peace, more laughter, more confidence, and more days that remind you how loved you are."
  }
];

const gallery = document.getElementById("gallery");
const momentCards = document.getElementById("momentCards");
const reasonCards = document.getElementById("reasonCards");
const galleryCount = document.getElementById("galleryCount");
const modal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");
const song = document.getElementById("birthdaySong");
const songButton = document.getElementById("songButton");
const songStatus = document.getElementById("songStatus");
const surpriseButton = document.getElementById("surpriseButton");
const worldExploreButton = document.getElementById("worldExploreButton");
const finalSurpriseButton = document.getElementById("finalSurpriseButton");
const openGalleryButton = document.getElementById("openGalleryButton");
const memoryCave = document.getElementById("memoryCave");
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

const SITE_PASSWORD = "venez23";
const TARGET_SCORE = 23;
const DINO_WORLD = String.fromCodePoint(0x1f996);
const isAdminMode = new URLSearchParams(window.location.search).get("admin") === "1";

mainContent.classList.add("locked");
gatePassword.focus();

populateCards();
populateGallery();
updateGalleryCount();

function populateCards() {
  if (momentCards) {
    spotlightMoments.forEach(({ tag, title, body }) => {
      const article = document.createElement("article");
      article.className = "moment-card";
      article.innerHTML = `
        <p class="section-tag">${tag}</p>
        <h3>${title}</h3>
        <p>${body}</p>
      `;
      momentCards.appendChild(article);
    });
  }

  if (reasonCards) {
    heartReasons.forEach(({ title, body }) => {
      const article = document.createElement("article");
      article.className = "reason-card";
      article.innerHTML = `
        <p class="section-tag">Because</p>
        <h3>${title}</h3>
        <p>${body}</p>
      `;
      reasonCards.appendChild(article);
    });
  }
}

function populateGallery() {
  galleryPhotos.forEach(({ src, alt }, index) => {
    const card = document.createElement("button");
    card.className = "photo-card";
    card.classList.add("is-loading");
    card.setAttribute("aria-label", `Open photo ${index + 1}`);

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    img.decoding = "async";

    img.addEventListener("load", () => {
      card.classList.remove("is-loading");
    });

    img.addEventListener("error", () => {
      card.remove();
      console.warn(`Gallery image skipped because it could not be loaded: ${src}`);
    });

    card.appendChild(img);
    card.addEventListener("click", () => openModal(src, alt));
    gallery.appendChild(card);
  });
}

function updateGalleryCount() {
  if (!galleryCount) return;
  galleryCount.textContent = `${galleryPhotos.length} memories waiting`;
}

function openModal(src, alt) {
  modalImage.src = src;
  modalImage.alt = alt;
  modal.classList.add("show");
}

function closePhoto() {
  modal.classList.remove("show");
}

function scrollToMemoryCave() {
  memoryCave?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      songButton.textContent = "Pause Birthday Song";
      if (songStatus) songStatus.textContent = "Soundtrack glowing";
    } catch {
      songButton.textContent = "Tap Again to Play";
      if (songStatus) songStatus.textContent = "Soundtrack waiting";
    }
  } else {
    song.pause();
    songButton.textContent = "Play Birthday Song";
    if (songStatus) songStatus.textContent = "Soundtrack paused";
  }
});

song.addEventListener("ended", () => {
  songButton.textContent = "Play Birthday Song";
  if (songStatus) songStatus.textContent = "Soundtrack ready";
});

worldExploreButton?.addEventListener("click", scrollToMemoryCave);
openGalleryButton?.addEventListener("click", scrollToMemoryCave);
surpriseButton.addEventListener("click", megaSurprise);
finalSurpriseButton?.addEventListener("click", megaSurprise);

let lineIndex = 0;
let charIndex = 0;

function typeWriter() {
  const current = loveLines[lineIndex];
  if (charIndex <= current.length) {
    typeText.textContent = current.slice(0, charIndex++);
    setTimeout(typeWriter, 46);
    return;
  }

  setTimeout(() => {
    charIndex = 0;
    lineIndex = (lineIndex + 1) % loveLines.length;
    typeText.textContent = "";
    typeWriter();
  }, 1600);
}

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
  const colors = ["#3d6e58", "#93c88f", "#f0c05c", "#f2a97e", "#dc7f95"];
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

function showRoarBanner(text = "RAWR !!!") {
  const banner = document.createElement("div");
  banner.className = "roar-banner";
  banner.textContent = text;
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
    dinoMessage.textContent = `You must score ${TARGET_SCORE} first before entering ${DINO_WORLD} World.`;
    window.alert(`Clear the game first. Reach score ${TARGET_SCORE} to unlock ${DINO_WORLD} World.`);
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

  repoPreviewFrame.src = "about:blank";
}

function enterBirthdayWorld() {
  stopPreviewSong();
  gate.classList.add("hidden");
  dinoGate.classList.add("hidden");
  codeGate.classList.add("hidden");
  mainContent.classList.remove("locked");
  mainContent.classList.add("revealed");
  mainContent.setAttribute("aria-hidden", "false");
  gate.setAttribute("aria-hidden", "true");
  dinoGate.setAttribute("aria-hidden", "true");
  codeGate.setAttribute("aria-hidden", "true");
  gateError.textContent = "";
  gatePassword.value = "";
  burstConfetti(canvas.width * 0.5, canvas.height * 0.22, 140);
  spawnEggs(16, window.innerWidth / 2, window.innerHeight * 0.74, 180, 1200);
  showRoarBanner("Birthday World");
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

const gravity = 0.6;
const jumpPower = -10.8;
const groundY = dinoCanvas.height - 34;
const dinoHitbox = { left: 6, right: 6, top: 5, bottom: 4 };

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
  dinoMessage.textContent = "Press Space or tap the game to help our birthday dino hop.";
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
  dinoMessage.textContent = "Admin bypass enabled. Our mascot is already ready for the next chapter.";
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
  const { left, right, top, bottom } = dinoHitbox;
  return (
    dino.x + left < obs.x + obs.width &&
    dino.x + dino.width - right > obs.x &&
    dino.y + top < obs.y + obs.height &&
    dino.y + dino.height - bottom > obs.y
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
        dinoMessage.textContent = `She made all 23 jumps. Click Enter ${DINO_WORLD} World to continue.`;
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
    dinoMessage.textContent = "Almost there. Press Restart Game and help her try again.";
  }
}

function drawGround() {
  dinoCtx.strokeStyle = "#355f4a";
  dinoCtx.lineWidth = 2;
  dinoCtx.beginPath();
  dinoCtx.moveTo(0, groundY + 1);
  dinoCtx.lineTo(dinoCanvas.width, groundY + 1);
  dinoCtx.stroke();
}

function drawObstacle(obs) {
  dinoCtx.fillStyle = "#4e8a6a";
  dinoCtx.fillRect(obs.x, obs.y, obs.width, obs.height);
}

function drawDinoShadow(time) {
  const bob = Math.sin(time / 240) * 0.8;
  const airborneLift = Math.max(0, groundY - dino.height - dino.y);
  const shadowScale = Math.max(0.62, 1 - airborneLift / 90);
  dinoCtx.fillStyle = "rgba(22, 46, 33, 0.16)";
  dinoCtx.beginPath();
  dinoCtx.ellipse(
    dino.x + dino.width * 0.5,
    groundY + 3 - bob * 0.2,
    dino.width * 0.42 * shadowScale,
    3.2 * shadowScale,
    0,
    0,
    Math.PI * 2
  );
  dinoCtx.fill();
}

function drawDinoTail(bodyW, bodyH) {
  dinoCtx.fillStyle = "#4d9d6a";
  dinoCtx.beginPath();
  dinoCtx.moveTo(-bodyW * 0.16, bodyH * 0.06);
  dinoCtx.lineTo(-bodyW * 0.6, -bodyH * 0.05);
  dinoCtx.lineTo(-bodyW * 0.26, -bodyH * 0.22);
  dinoCtx.closePath();
  dinoCtx.fill();
}

function drawDinoLegs(bodyW, bodyH) {
  dinoCtx.fillStyle = "#4d9d6a";
  dinoCtx.beginPath();
  dinoCtx.roundRect(-bodyW * 0.12, bodyH * 0.22, bodyW * 0.18, bodyH * 0.2, 3);
  dinoCtx.roundRect(bodyW * 0.12, bodyH * 0.22, bodyW * 0.18, bodyH * 0.2, 3);
  dinoCtx.fill();
}

function drawDinoBody(bodyW, bodyH) {
  dinoCtx.fillStyle = "#62bd7b";
  dinoCtx.beginPath();
  dinoCtx.ellipse(0, bodyH * 0.02, bodyW * 0.42, bodyH * 0.36, -0.08, 0, Math.PI * 2);
  dinoCtx.fill();

  dinoCtx.fillStyle = "#8bd09c";
  dinoCtx.beginPath();
  dinoCtx.ellipse(bodyW * 0.16, bodyH * 0.02, bodyW * 0.23, bodyH * 0.24, -0.08, 0, Math.PI * 2);
  dinoCtx.fill();

  dinoCtx.fillStyle = "#70ca8a";
  dinoCtx.beginPath();
  dinoCtx.ellipse(bodyW * 0.24, -bodyH * 0.24, bodyW * 0.27, bodyH * 0.24, -0.08, 0, Math.PI * 2);
  dinoCtx.fill();
}

function drawDinoHair(bodyW, bodyH) {
  dinoCtx.fillStyle = "#5b423e";
  dinoCtx.beginPath();
  dinoCtx.ellipse(bodyW * 0.12, -bodyH * 0.24, bodyW * 0.16, bodyH * 0.16, 0.1, 0, Math.PI * 2);
  dinoCtx.ellipse(bodyW * 0.01, -bodyH * 0.14, bodyW * 0.15, bodyH * 0.2, -0.2, 0, Math.PI * 2);
  dinoCtx.fill();
}

function drawDinoHat(bodyW, bodyH) {
  dinoCtx.fillStyle = "#efb346";
  dinoCtx.beginPath();
  dinoCtx.ellipse(bodyW * 0.16, -bodyH * 0.38, bodyW * 0.28, bodyH * 0.18, -0.1, Math.PI, 0, false);
  dinoCtx.fill();

  dinoCtx.fillStyle = "#db9439";
  dinoCtx.beginPath();
  dinoCtx.ellipse(bodyW * 0.22, -bodyH * 0.29, bodyW * 0.23, bodyH * 0.08, -0.1, 0, Math.PI * 2);
  dinoCtx.fill();

  dinoCtx.fillStyle = "#fff8ed";
  dinoCtx.beginPath();
  dinoCtx.arc(bodyW * 0.18, -bodyH * 0.39, bodyW * 0.1, 0, Math.PI * 2);
  dinoCtx.fill();

  dinoCtx.strokeStyle = "#d94437";
  dinoCtx.lineWidth = 1.5;
  dinoCtx.lineCap = "round";
  dinoCtx.beginPath();
  dinoCtx.moveTo(bodyW * 0.11, -bodyH * 0.37);
  dinoCtx.lineTo(bodyW * 0.15, -bodyH * 0.43);
  dinoCtx.lineTo(bodyW * 0.18, -bodyH * 0.39);
  dinoCtx.lineTo(bodyW * 0.21, -bodyH * 0.43);
  dinoCtx.lineTo(bodyW * 0.25, -bodyH * 0.37);
  dinoCtx.stroke();
}

function drawDinoFace(bodyW, bodyH, time) {
  const blinkWindow = time % 3200;
  const isBlinking = blinkWindow > 2660 && blinkWindow < 2860;
  const blushPulse = 1 + Math.sin(time / 260) * 0.08;

  dinoCtx.fillStyle = "#ffb0a1";
  dinoCtx.beginPath();
  dinoCtx.ellipse(
    bodyW * 0.18,
    -bodyH * 0.18,
    bodyW * 0.08 * blushPulse,
    bodyH * 0.05 * blushPulse,
    0,
    0,
    Math.PI * 2
  );
  dinoCtx.fill();

  dinoCtx.strokeStyle = "#2a332f";
  dinoCtx.lineWidth = 1.2;
  dinoCtx.lineCap = "round";
  dinoCtx.beginPath();
  if (isBlinking) {
    dinoCtx.moveTo(bodyW * 0.24, -bodyH * 0.26);
    dinoCtx.lineTo(bodyW * 0.34, -bodyH * 0.26);
  } else {
    dinoCtx.ellipse(bodyW * 0.29, -bodyH * 0.26, bodyW * 0.045, bodyH * 0.04, 0, Math.PI * 0.1, Math.PI * 0.9);
  }
  dinoCtx.stroke();

  dinoCtx.fillStyle = "#2a332f";
  dinoCtx.beginPath();
  dinoCtx.arc(bodyW * 0.42, -bodyH * 0.18, bodyW * 0.025, 0, Math.PI * 2);
  dinoCtx.fill();

  dinoCtx.strokeStyle = "#6a564d";
  dinoCtx.lineWidth = 1;
  dinoCtx.beginPath();
  dinoCtx.moveTo(bodyW * 0.3, -bodyH * 0.1);
  dinoCtx.quadraticCurveTo(bodyW * 0.35, -bodyH * 0.04, bodyW * 0.42, -bodyH * 0.09);
  dinoCtx.stroke();
}

function drawCuteDino(time) {
  const onGround = dino.y >= groundY - dino.height - 0.1;
  const bob = onGround ? Math.sin(time / 240) * 0.8 : 0;
  let scaleX = 1;
  let scaleY = 1;

  if (!onGround) {
    if (dino.vy < 0) {
      scaleX = 0.96;
      scaleY = 1.06;
    } else {
      scaleX = 1.05;
      scaleY = 0.95;
    }
  } else if (gameRunning) {
    scaleX = 1.01;
    scaleY = 0.99;
  }

  const bodyW = dino.width;
  const bodyH = dino.height;
  const centerX = dino.x + bodyW * 0.5;
  const centerY = dino.y + bodyH * 0.5 + bob;

  drawDinoShadow(time);

  dinoCtx.save();
  dinoCtx.translate(centerX, centerY);
  dinoCtx.scale(scaleX, scaleY);
  drawDinoTail(bodyW, bodyH);
  drawDinoLegs(bodyW, bodyH);
  drawDinoBody(bodyW, bodyH);
  drawDinoHair(bodyW, bodyH);
  drawDinoHat(bodyW, bodyH);
  drawDinoFace(bodyW, bodyH, time);
  dinoCtx.restore();
}

function drawGame() {
  dinoCtx.clearRect(0, 0, dinoCanvas.width, dinoCanvas.height);
  drawGround();
  drawCuteDino(lastFrame || 0);
  obstacles.forEach(drawObstacle);
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
setTimeout(() => burstConfetti(canvas.width * 0.5, canvas.height * 0.22, 70), 500);
