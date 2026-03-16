const song = document.querySelector(".song");
const musicChip = document.getElementById("musicChip");
const musicChipLabel = document.getElementById("musicChipLabel");
let timelineStarted = false;
let musicChipVisible = false;
const isEmbedded = new URLSearchParams(window.location.search).get("embedded") === "1";

if (isEmbedded) {
    document.body.classList.add("embedded-mode");
}

window.addEventListener("load", async () => {
    startTimelineOnce();
    const autoplayWorked = await tryPlaySong();
    if (!autoplayWorked) {
        showMusicChip("Play music");
    }
});

async function tryPlaySong() {
    if (!song) return false;

    try {
        await song.play();
        return true;
    } catch {
        return false;
    }
}

function showMusicChip(label) {
    if (!musicChip) return;
    musicChipVisible = true;
    musicChip.classList.remove("hidden");
    if (musicChipLabel) {
        musicChipLabel.textContent = label;
    }
}

function hideMusicChip() {
    if (!musicChip || musicChipVisible) return;
    musicChip.classList.add("hidden");
}

function updateMusicChipState(isPlaying) {
    if (!musicChipVisible || !musicChip) return;
    musicChip.classList.toggle("is-playing", isPlaying);
    if (musicChipLabel) {
        musicChipLabel.textContent = isPlaying ? "Music on" : "Play music";
    }
}

musicChip?.addEventListener("click", async () => {
    if (!song) return;

    if (!song.paused) {
        song.pause();
        updateMusicChipState(false);
        return;
    }

    const started = await tryPlaySong();
    if (started) {
        updateMusicChipState(true);
    } else {
        showMusicChip("Tap to play");
    }
});

song?.addEventListener("play", () => {
    if (musicChipVisible) {
        updateMusicChipState(true);
    } else {
        hideMusicChip();
    }
});

song?.addEventListener("pause", () => {
    updateMusicChipState(false);
});

function startTimelineOnce() {
    if (timelineStarted) return;
    timelineStarted = true;
    animationTimeline();
}

const animationTimeline = () => {
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    };

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    };

    const tl = new TimelineMax();
    let lastProgress = -1;

    const sendProgress = (value) => {
        if (window.parent === window) return;
        window.parent.postMessage({ type: "happybirthday:progress", value }, "*");
    };

    const sendMissionEvent = (type) => {
        if (window.parent === window) return;
        window.parent.postMessage({ type }, "*");
    };

    tl.set(".container", {
        visibility: "visible"
    });

    if (isEmbedded) {
        tl.set(".one, .three", { autoAlpha: 0 })
        .set(".four", { autoAlpha: 1 })
        .from(".chapter-intro", 0.45, {
            y: 8,
            opacity: 0.45
        })
        .from(".text-box", 0.5, {
            y: 16,
            scale: 0.98,
            opacity: 0.35
        }, "-=0.18")
        .from(".fake-btn", 0.18, {
            scale: 0.9,
            opacity: 0
        }, "-=0.2")
        .staggerTo(".hbd-chatbox span", 1.5, {
            visibility: "visible"
        }, 0.05)
        .to(".fake-btn", 0.1, {
            backgroundColor: "rgb(127, 206, 248)"
        }, "+=2.2")
        .to(".four", 0.42, {
            scale: 0.92,
            opacity: 0,
            y: -80
        }, "+=0.45");
    } else {
        tl.from(".one", 0.45, {
            opacity: 0.24,
            y: 8
        })
        .from(".two", 0.28, {
            opacity: 0.28,
            y: 8
        })
        .to(".one", 0.6, {
            opacity: 0,
            y: 10
        }, "+=3.5")
        .to(".two", 0.6, {
            opacity: 0,
            y: 10
        }, "-=1")
        .from(".three", 0.55, {
            opacity: 0.24,
            y: 8
        })
        .to(".three", 0.55, {
            opacity: 0,
            y: 10
        }, "+=2.6")
        .from(".four", 0.55, {
            scale: 0.96,
            y: 14,
            opacity: 0.32
        })
        .from(".fake-btn", 0.22, {
            scale: 0.86,
            opacity: 0
        })
        .staggerTo(".hbd-chatbox span", 1.5, {
            visibility: "visible"
        }, 0.05)
        .to(".fake-btn", 0.1, {
            backgroundColor: "rgb(127, 206, 248)"
        }, "+=4")
        .to(".four", 0.45, {
            scale: 0.88,
            opacity: 0,
            y: -150
        }, "+=0.9");
    }

    tl
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
        scale: 1.2,
        x: 10,
        backgroundColor: "rgb(21, 161, 237)",
        color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-5", 0.7, {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
    }, "+=1.5")
    .to(".idea-5 span", 0.7, {
        rotation: 90,
        x: 8
    }, "+=1.4")
    .to(".idea-5", 0.7, {
        scale: 0.2,
        opacity: 0
    }, "+=2")
    .staggerFrom(".idea-6 span", 0.8, {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
    }, 0.2)
    .staggerTo(".idea-6 span", 0.8, {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
    }, 0.2, "+=1.5")
    .staggerFromTo(".baloons img", 2.5, {
        opacity: 0.9,
        y: 1400
    }, {
        opacity: 1,
        y: -1000
    }, 0.2)
    .from(".portrait-frame", 0.5, {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45
    }, "-=2")
    .from(".hat", 0.5, {
        x: -100,
        y: 350,
        rotation: -180,
        opacity: 0
    })
    .staggerFrom(".wish-hbd span", 0.7, {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5)
    }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, {
        scale: 1.4,
        rotationY: 150
    }, {
        scale: 1,
        rotationY: 0,
        color: "#ff7ea7",
        ease: Expo.easeOut
    }, 0.1, "party")
    .from(".wish h5", 0.5, {
        opacity: 0,
        y: 10,
        skewX: "-15deg"
    }, "party")
    .staggerTo(".eight svg", 1.5, {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4
    }, 0.3)
    .to(".six", 0.5, {
        opacity: 0,
        y: 30,
        zIndex: "-1"
    })
    .staggerFrom(".nine p, .nine button", 1, ideaTextTrans, 0.8)
    .to(".last-smile", 0.5, {
        rotation: 90
    }, "+=1");

    tl.eventCallback("onUpdate", () => {
        const progress = Math.round(tl.progress() * 100);
        if (progress === lastProgress) return;
        lastProgress = progress;
        sendProgress(progress);
    });

    tl.eventCallback("onComplete", () => {
        sendMissionEvent("happybirthday:completed");
    });

    const replayBtn = document.getElementById("replay");
    replayBtn.addEventListener("click", () => {
        lastProgress = -1;
        sendMissionEvent("happybirthday:restarted");
        sendProgress(0);
        tl.restart();
    });
};
