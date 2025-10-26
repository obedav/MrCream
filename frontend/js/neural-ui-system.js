/**
 * MrCream Neural Network UI System
 * Advanced AI-driven user interface enhancements
 * Creates an intelligent, adaptive, and engaging user experience
 */

class NeuralUISystem {
    constructor() {
        this.isActive = false;
        this.userBehaviorData = {
            mouseMovements: [],
            scrollPatterns: [],
            clicksHeatmap: new Map(),
            timeOnPage: Date.now(),
            preferredSpeed: 'normal',
            interactionCount: 0,
            deviceType: this.detectDeviceType(),
            colorPreference: 'cosmic'
        };

        this.particles = [];
        this.particleCanvas = null;
        this.particleContext = null;
        this.animationFrame = null;
        this.neuralNodes = [];

        // Performance monitoring
        this.performanceMetrics = {
            fps: 60,
            memoryUsage: 0,
            renderTime: 0
        };

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        console.log('🧠 Initializing Neural Network UI System...');

        this.createParticleSystem();
        this.initializeBehaviorTracking();
        this.setupIntelligentAnimations();
        this.createNeuralNetwork();
        this.startAdaptiveSystem();
        this.setupMicroInteractions();
        this.enablePerformanceOptimization();

        this.isActive = true;
        console.log('✨ Neural UI System activated!');
    }

    detectDeviceType() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        const isTablet = /tablet|ipad/i.test(userAgent) || (isMobile && window.innerWidth > 768);

        if (isTablet) return 'tablet';
        if (isMobile) return 'mobile';
        return 'desktop';
    }

    createParticleSystem() {
        // Create particle canvas
        this.particleCanvas = document.createElement('canvas');
        this.particleCanvas.id = 'neural-particles';
        this.particleCanvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.7;
        `;

        document.body.appendChild(this.particleCanvas);
        this.particleContext = this.particleCanvas.getContext('2d');

        this.resizeCanvas();
        this.generateParticles();
        this.animateParticles();

        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.particleCanvas.width = window.innerWidth;
        this.particleCanvas.height = window.innerHeight;
    }

    generateParticles() {
        const particleCount = this.userBehaviorData.deviceType === 'mobile' ? 25 : 50;
        this.particles = [];

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                life: Math.random() * 100 + 50,
                maxLife: Math.random() * 100 + 50,
                color: this.getAdaptiveColor(),
                connections: [],
                energy: Math.random() * 100
            });
        }
    }

    getAdaptiveColor() {
        const colors = [
            'rgba(15, 45, 120, 0.6)',      // cosmic-blue
            'rgba(180, 85, 120, 0.6)',     // aurora-pink
            'rgba(140, 55, 115, 0.6)',     // nebula-purple
            'rgba(160, 35, 85, 0.6)',      // stellar-magenta
            'rgba(135, 206, 235, 0.6)',    // light-blue
            'rgba(200, 120, 140, 0.6)'     // rose-gold
        ];

        // Adapt colors based on time of day
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) {
            // Morning: brighter colors
            return colors[Math.floor(Math.random() * 2)];
        } else if (hour >= 12 && hour < 18) {
            // Afternoon: balanced colors
            return colors[Math.floor(Math.random() * colors.length)];
        } else {
            // Evening/Night: deeper colors
            return colors[Math.floor(Math.random() * 3) + 3];
        }
    }

    animateParticles() {
        if (!this.particleContext) return;

        this.particleContext.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);

        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Boundary wrapping
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;

            // Update life
            particle.life--;
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            // Draw particle
            const alpha = particle.life / particle.maxLife;
            this.particleContext.beginPath();
            this.particleContext.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.particleContext.fillStyle = particle.color.replace('0.6', alpha * 0.6);
            this.particleContext.fill();

            // Draw connections to nearby particles
            this.drawConnections(particle, i);
        }

        // Regenerate particles when needed
        if (this.particles.length < 20) {
            this.generateParticles();
        }

        this.animationFrame = requestAnimationFrame(() => this.animateParticles());
    }

    drawConnections(particle, index) {
        for (let j = index + 1; j < this.particles.length; j++) {
            const otherParticle = this.particles[j];
            const distance = Math.sqrt(
                Math.pow(particle.x - otherParticle.x, 2) +
                Math.pow(particle.y - otherParticle.y, 2)
            );

            if (distance < 100) {
                const alpha = (1 - distance / 100) * 0.3;
                this.particleContext.beginPath();
                this.particleContext.moveTo(particle.x, particle.y);
                this.particleContext.lineTo(otherParticle.x, otherParticle.y);
                this.particleContext.strokeStyle = `rgba(180, 85, 120, ${alpha})`;
                this.particleContext.lineWidth = 0.5;
                this.particleContext.stroke();
            }
        }
    }

    initializeBehaviorTracking() {
        let mouseTrackingInterval;

        // Track mouse movements
        document.addEventListener('mousemove', (e) => {
            clearTimeout(mouseTrackingInterval);
            mouseTrackingInterval = setTimeout(() => {
                this.userBehaviorData.mouseMovements.push({
                    x: e.clientX,
                    y: e.clientY,
                    timestamp: Date.now()
                });

                // Keep only last 50 movements
                if (this.userBehaviorData.mouseMovements.length > 50) {
                    this.userBehaviorData.mouseMovements.shift();
                }

                this.adaptToMouseMovement(e);
            }, 16); // ~60fps
        });

        // Track scroll patterns
        let scrollTimeout;
        document.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollSpeed = Math.abs(window.scrollY - (this.lastScrollY || 0));
                this.userBehaviorData.scrollPatterns.push({
                    y: window.scrollY,
                    speed: scrollSpeed,
                    timestamp: Date.now()
                });

                this.lastScrollY = window.scrollY;
                this.adaptToScrollPattern(scrollSpeed);
            }, 50);
        });

        // Track clicks
        document.addEventListener('click', (e) => {
            const key = `${Math.floor(e.clientX / 50)}-${Math.floor(e.clientY / 50)}`;
            this.userBehaviorData.clicksHeatmap.set(key,
                (this.userBehaviorData.clicksHeatmap.get(key) || 0) + 1);

            this.userBehaviorData.interactionCount++;
            this.createClickRipple(e.clientX, e.clientY);
        });
    }

    adaptToMouseMovement(e) {
        // Attract particles to mouse position
        const attractionRadius = 150;
        const attractionStrength = 0.02;

        this.particles.forEach(particle => {
            const dx = e.clientX - particle.x;
            const dy = e.clientY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < attractionRadius) {
                const force = (attractionRadius - distance) / attractionRadius;
                particle.vx += (dx / distance) * force * attractionStrength;
                particle.vy += (dy / distance) * force * attractionStrength;
                particle.energy = Math.min(particle.energy + force * 10, 100);
            }
        });
    }

    adaptToScrollPattern(scrollSpeed) {
        // Adjust animation speed based on scroll speed
        if (scrollSpeed > 20) {
            this.userBehaviorData.preferredSpeed = 'fast';
        } else if (scrollSpeed < 5) {
            this.userBehaviorData.preferredSpeed = 'slow';
        } else {
            this.userBehaviorData.preferredSpeed = 'normal';
        }

        this.adjustAnimationSpeed();
    }

    adjustAnimationSpeed() {
        const swiperInstance = window.MrCreamApp?.swiperInstance;
        if (swiperInstance) {
            const speedMap = {
                'slow': 8000,
                'normal': 6000,
                'fast': 4000
            };

            swiperInstance.autoplay.delay = speedMap[this.userBehaviorData.preferredSpeed];
        }
    }

    createClickRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            top: ${y}px;
            left: ${x}px;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(180, 85, 120, 0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: rippleExpand 0.8s ease-out forwards;
            pointer-events: none;
            z-index: 9998;
        `;

        document.body.appendChild(ripple);

        setTimeout(() => ripple.remove(), 800);
    }

    setupIntelligentAnimations() {
        // Add ripple animation styles
        if (!document.getElementById('neural-animations')) {
            const style = document.createElement('style');
            style.id = 'neural-animations';
            style.textContent = `
                @keyframes rippleExpand {
                    from {
                        width: 20px;
                        height: 20px;
                        opacity: 0.8;
                    }
                    to {
                        width: 200px;
                        height: 200px;
                        opacity: 0;
                    }
                }

                @keyframes neuralPulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.7;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 1;
                    }
                }

                @keyframes dataFlow {
                    from {
                        transform: translateX(-100%) rotate(0deg);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100vw) rotate(360deg);
                        opacity: 0;
                    }
                }

                .neural-active .floating-element {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .neural-active .floating-element:hover {
                    filter: brightness(1.2) saturate(1.3);
                    transform: translateY(-10px) scale(1.05) !important;
                }

                .neural-data-stream {
                    position: fixed;
                    width: 2px;
                    height: 20px;
                    background: linear-gradient(45deg, transparent, rgba(180, 85, 120, 0.8), transparent);
                    animation: dataFlow 3s linear infinite;
                    pointer-events: none;
                    z-index: 2;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.classList.add('neural-active');
    }

    createNeuralNetwork() {
        // Create neural network visualization nodes
        const nodeCount = this.userBehaviorData.deviceType === 'mobile' ? 8 : 15;

        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            node.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(180, 85, 120, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 2;
                animation: neuralPulse 2s ease-in-out infinite;
                animation-delay: ${i * 0.2}s;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
            `;

            document.body.appendChild(node);
            this.neuralNodes.push(node);
        }

        // Animate neural nodes
        this.animateNeuralNodes();
    }

    animateNeuralNodes() {
        this.neuralNodes.forEach((node, index) => {
            const speed = 0.5 + Math.random() * 0.5;
            const angle = (index / this.neuralNodes.length) * Math.PI * 2;

            setInterval(() => {
                const rect = node.getBoundingClientRect();
                let x = parseFloat(node.style.left) || rect.left;
                let y = parseFloat(node.style.top) || rect.top;

                x += Math.cos(angle + Date.now() * 0.001) * speed;
                y += Math.sin(angle + Date.now() * 0.001) * speed;

                // Keep within bounds
                if (x < 0) x = window.innerWidth;
                if (x > window.innerWidth) x = 0;
                if (y < 0) y = window.innerHeight;
                if (y > window.innerHeight) y = 0;

                node.style.left = x + 'px';
                node.style.top = y + 'px';
            }, 50);
        });
    }

    startAdaptiveSystem() {
        // Create data streams periodically
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.createDataStream();
            }
        }, 2000);

        // Adapt colors every minute
        setInterval(() => {
            this.adaptColors();
        }, 60000);

        // Performance monitoring
        setInterval(() => {
            this.monitorPerformance();
        }, 5000);
    }

    createDataStream() {
        const stream = document.createElement('div');
        stream.className = 'neural-data-stream';
        stream.style.cssText += `
            top: ${Math.random() * window.innerHeight}px;
            left: -10px;
            transform: rotate(${Math.random() * 360}deg);
        `;

        document.body.appendChild(stream);

        setTimeout(() => stream.remove(), 3000);
    }

    adaptColors() {
        const newColor = this.getAdaptiveColor();

        // Update particle colors gradually
        this.particles.forEach(particle => {
            if (Math.random() < 0.1) {
                particle.color = newColor;
            }
        });

        // Update neural node colors
        this.neuralNodes.forEach(node => {
            if (Math.random() < 0.2) {
                node.style.background = newColor;
            }
        });
    }

    setupMicroInteractions() {
        // Add haptic feedback simulation
        const elements = document.querySelectorAll('.btn, .floating-element, .nav-link');

        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (navigator.vibrate && this.userBehaviorData.deviceType === 'mobile') {
                    navigator.vibrate(10);
                }
                this.createHoverEffect(element);
            });

            element.addEventListener('click', () => {
                if (navigator.vibrate && this.userBehaviorData.deviceType === 'mobile') {
                    navigator.vibrate([20, 10, 20]);
                }
                this.createClickEffect(element);
            });
        });
    }

    createHoverEffect(element) {
        const rect = element.getBoundingClientRect();
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed;
            top: ${rect.top - 5}px;
            left: ${rect.left - 5}px;
            width: ${rect.width + 10}px;
            height: ${rect.height + 10}px;
            border: 2px solid rgba(180, 85, 120, 0.5);
            border-radius: 8px;
            pointer-events: none;
            z-index: 9997;
            animation: hoverGlow 0.3s ease forwards;
        `;

        document.body.appendChild(effect);

        setTimeout(() => effect.remove(), 300);
    }

    createClickEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 5; i++) {
            const spark = document.createElement('div');
            spark.style.cssText = `
                position: fixed;
                top: ${centerY}px;
                left: ${centerX}px;
                width: 4px;
                height: 4px;
                background: rgba(180, 85, 120, 0.8);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9996;
                animation: sparkFly 0.6s ease-out forwards;
                transform-origin: center;
            `;

            spark.style.setProperty('--angle', Math.random() * 360 + 'deg');
            spark.style.setProperty('--distance', 50 + Math.random() * 50 + 'px');

            document.body.appendChild(spark);

            setTimeout(() => spark.remove(), 600);
        }
    }

    enablePerformanceOptimization() {
        // Reduce particle count on mobile
        if (this.userBehaviorData.deviceType === 'mobile') {
            this.particles = this.particles.slice(0, 25);
        }

        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Adaptive quality based on performance
        this.adaptiveQuality();
    }

    pauseAnimations() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.particleCanvas.style.display = 'none';
    }

    resumeAnimations() {
        this.particleCanvas.style.display = 'block';
        this.animateParticles();
    }

    monitorPerformance() {
        if (performance.memory) {
            this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize;

            // Reduce quality if memory usage is high
            if (this.performanceMetrics.memoryUsage > 50 * 1024 * 1024) { // 50MB
                this.particles = this.particles.slice(0, 20);
            }
        }
    }

    adaptiveQuality() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!gl) {
            // Fallback for devices without WebGL
            this.particles = this.particles.slice(0, 15);
            this.particleCanvas.style.opacity = '0.5';
        }
    }

    // Public methods for external control
    increaseIntensity() {
        this.particles.forEach(particle => {
            particle.vx *= 1.2;
            particle.vy *= 1.2;
            particle.energy = Math.min(particle.energy * 1.1, 100);
        });
    }

    decreaseIntensity() {
        this.particles.forEach(particle => {
            particle.vx *= 0.8;
            particle.vy *= 0.8;
            particle.energy = Math.max(particle.energy * 0.9, 10);
        });
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        if (this.particleCanvas) {
            this.particleCanvas.remove();
        }

        this.neuralNodes.forEach(node => node.remove());

        document.body.classList.remove('neural-active');

        this.isActive = false;
        console.log('🧠 Neural UI System deactivated');
    }
}

// Add additional animation styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes hoverGlow {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes sparkFly {
        from {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--distance))) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(additionalStyles);

// Initialize Neural UI System when DOM is ready
let neuralUISystem = null;

function initializeNeuralUI() {
    if (!neuralUISystem) {
        neuralUISystem = new NeuralUISystem();

        // Expose to global scope for debugging
        window.NeuralUI = neuralUISystem;

        console.log('🚀 Neural Network UI System loaded successfully!');
    }
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNeuralUI);
} else {
    initializeNeuralUI();
}

export default NeuralUISystem;