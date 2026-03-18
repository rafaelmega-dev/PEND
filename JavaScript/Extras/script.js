// Sparkle particles effect
function createSparkles() {
    const canvas = document.querySelector('.sparkles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.hue = 330 + Math.random() * 30; // Pink/purple tones
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

            this.opacity += (Math.random() * 0.02 - 0.01);
            if (this.opacity > 0.8) this.opacity = 0.8;
            if (this.opacity < 0.1) this.opacity = 0.1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
            ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Add floating hearts around the main heart
function createFloatingHearts() {
    const container = document.querySelector('.container');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.pointerEvents = 'none';
        heart.style.opacity = '0.7';
        heart.style.animation = `floatUp ${Math.random() * 3 + 2}s linear forwards`;
        heart.style.zIndex = '5';
        heart.style.filter = 'drop-shadow(0 0 10px #ff6b9d)';
        
        container.parentNode.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

// Add the glow effect to heart
function addHeartGlow() {
    const heart = document.querySelector('.heart');
    const glow = document.createElement('div');
    glow.classList.add('heart-glow');
    heart.appendChild(glow);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    addHeartGlow();
    createSparkles();
    createFloatingHearts();
});

// Add CSS animation for floating hearts (injected dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
