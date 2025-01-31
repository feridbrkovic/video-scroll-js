const canvas = document.getElementById("moving-car");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = [];
const frameCount = 232;
let currentFrameIndex = 0;

// Generate frame URLs
const currentFrame = (index) =>
    `frames/${(index + 1).toString().padStart(0, "0")}.avif`;

// Preload images
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Initial render
images[0].onload = render;

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
        currentFrameIndex = Math.floor(progress * (frameCount - 1));
        render();
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const img = images[currentFrameIndex];
    if (img.complete) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

// Attach scroll listener
window.addEventListener("scroll", handleScroll);

function resizeCanvas() {
    const aspectRatio = 1458 / 820;
    const windowAspectRatio = window.innerWidth / window.innerHeight;

    if (windowAspectRatio > aspectRatio) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth / aspectRatio;
    } else {
        canvas.height = window.innerHeight;
        canvas.width = window.innerHeight * aspectRatio;
    }
    render();
}

// Attach resize function
window.addEventListener("resize", resizeCanvas);
resizeCanvas();