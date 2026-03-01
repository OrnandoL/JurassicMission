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

drawConfetti();
typeWriter();
setTimeout(burstConfetti, 500);
