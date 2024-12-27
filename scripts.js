const canvas2 = document.getElementById("head-bob-turn");
const context2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

const images2 = [];
const frameCount2 = 131;
let currentFrameIndex = 0;

// Generate frame URLs
const currentFrame2 = (index) =>
    `frames/${(index + 1).toString().padStart(0, "0")}.avif`;

// Preload images
for (let i = 0; i < frameCount2; i++) {
    const img = new Image();
    img.src = currentFrame2(i);
    images2.push(img);
}

// Initial render
images2[0].onload = render2;

function handleScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    // Video animation
    const stickyStart = windowHeight;
    const stickyEnd = stickyStart + windowHeight;
    const progress = Math.min(
        Math.max((scrollTop - stickyStart) / (stickyEnd - stickyStart), 0),
        1
    );

    if (progress > 0 && progress <= 1) {
        currentFrameIndex = Math.floor(progress * (frameCount2 - 1));
        render2();
    }
}

function render2() {
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    const img = images2[currentFrameIndex];
    if (img.complete) {
        context2.drawImage(img, 0, 0, canvas2.width, canvas2.height);
    }
}

// Attach scroll listener
window.addEventListener("scroll", handleScroll);

function resizeCanvas() {
    const aspectRatio = 1458 / 820;
    const windowAspectRatio = window.innerWidth / window.innerHeight;

    if (windowAspectRatio > aspectRatio) {
        canvas2.width = window.innerWidth;
        canvas2.height = window.innerWidth / aspectRatio;
    } else {
        canvas2.height = window.innerHeight;
        canvas2.width = window.innerHeight * aspectRatio;
    }
    render2();
}

// Attach resize function
window.addEventListener("resize", resizeCanvas);
resizeCanvas();