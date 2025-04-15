// Simulated C code background
const cCode = `
#include <stdio.h>
#include <stdlib.h>
#include "guna_bday.h"

int main() {
    printf("Happy Birthday, Guna!\\n");
    int age = getAge() + 1;
    for (int i = 0; i < age; i++) {
        printf("🎉 Cheers to %d!\\n", i + 1);
    }
    celebrate();
    return 0;
}

void celebrate() {
    char* wish = "You're awesome, Guna!";
    printf("%s\\n", wish);
    play_music("bday_song.mp3");
    launch_fireworks();
}
`;

document.getElementById('c-code').textContent = cCode;

// Starry background
const starCanvas = document.getElementById('stars');
const starCtx = starCanvas.getContext('2d');
starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;

let stars = [];

function createStar() {
    return {
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.5
    };
}

function updateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > starCanvas.height) star.y = 0;
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        starCtx.fillStyle = rgba(255, 255, 255, ${star.opacity});
        starCtx.fill();
    });
    requestAnimationFrame(updateStars);
}

for (let i = 0; i < 100; i++) {
    stars.push(createStar());
}
updateStars();

// Confetti effect
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle() {
    const shapes = ['circle', 'star', 'heart'];
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 5,
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * 6 - 3,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        color: hsl(${Math.random() * 360}, 100%, 50%),
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        opacity: 1
    };
}

function drawShape(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = rgba(${parseInt(p.color.slice(4, p.color.indexOf(','))), parseInt(p.color.slice(p.color.indexOf(',') + 1, p.color.lastIndexOf(','))), parseInt(p.color.slice(p.color.lastIndexOf(',') + 1, p.color.indexOf(')'))), ${p.opacity});
    ctx.beginPath();
    if (p.shape === 'circle') {
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
    } else if (p.shape === 'star') {
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * p.size, Math.sin((18 + i * 72) * Math.PI / 180) * p.size);
            ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * p.size * 0.5, Math.sin((54 + i * 72) * Math.PI / 180) * p.size * 0.5);
        }
        ctx.closePath();
    } else if (p.shape === 'heart') {
        ctx.moveTo(0, p.size);
        ctx.quadraticCurveTo(-p.size * 1.5, p.size * 0.5, -p.size * 0.75, -p.size * 0.5);
        ctx.quadraticCurveTo(-p.size * 0.25, -p.size * 1.25, 0, -p.size * 0.75);
        ctx.quadraticCurveTo(p.size * 0.25, -p.size * 1.25, p.size * 0.75, -p.size * 0.5);
        ctx.quadraticCurveTo(p.size * 1.5, p.size * 0.5, 0, p.size);
        ctx.closePath();
    }
    ctx.fill();
    ctx.restore();
}

function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.size *= 0.98;
        p.rotation += p.rotationSpeed;
        p.opacity *= 0.99;
        if (p.size < 0.5 || p.opacity < 0.1) {
            particles.splice(i, 1);
            i--;
        }
    }
    particles.forEach(p => {
        drawShape(p);
        // Add glow
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = rgba(${parseInt(p.color.slice(4, p.color.indexOf(','))), parseInt(p.color.slice(p.color.indexOf(',') + 1, p.color.lastIndexOf(','))), parseInt(p.color.slice(p.color.lastIndexOf(',') + 1, p.color.indexOf(')'))), ${p.opacity * 0.5});
        ctx.filter = 'blur(8px)';
        drawShape({...p, size: p.size * 1.5});
        ctx.restore();
    });
    if (particles.length > 0) {
        requestAnimationFrame(updateParticles);
    }
}

function launchConfetti() {
    for (let i = 0; i < 100; i++) {
        particles.push(createParticle());
    }
    updateParticles();
}

// Music control
function playMusic() {
    const audio = document.getElementById('bday-song');
    audio.play().catch(err => console.log("Audio play failed:", err));
    launchConfetti();
}

// Resize canvases on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
});