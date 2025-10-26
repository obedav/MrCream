/**
 * MrCream Advanced Micro-Interactions & Accessibility System
 * Sophisticated interaction feedback, haptic responses, and accessibility enhancements
 */

class MicroInteractionsSystem {
    constructor() {
        this.isActive = false;
        this.hapticSupported = 'vibrate' in navigator;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

        this.interactions = new Map();
        this.feedbackQueue = [];
        this.accessibilityFeatures = new Set();

        this.soundEffects = new Map();
        this.visualEffects = new Map();

        this.userPreferences = {
            soundEnabled: true,
            hapticsEnabled: true,
            animationsEnabled: !this.prefersReducedMotion,
            highContrast: this.prefersHighContrast,
            focusIndicatorsEnabled: true,
            keyboardNavigationEnabled: true
        };

        this.init();
    }

    init() {
        console.log('🎯 Initializing Micro-Interactions System...');

        this.setupAccessibilityFeatures();
        this.createVisualEffects();
        this.initializeSoundSystem();
        this.setupInteractionHandlers();
        this.enhanceFormInteractions();
        this.setupKeyboardNavigation();
        this.createHoverEffects();
        this.setupFocusManagement();

        this.isActive = true;
        console.log('✨ Micro-Interactions System activated!');
    }

    setupAccessibilityFeatures() {
        // Enhanced focus indicators
        this.addFocusEnhancements();

        // Screen reader improvements
        this.addAriaEnhancements();

        // Keyboard navigation
        this.enhanceKeyboardNavigation();

        // Color contrast adjustments
        if (this.prefersHighContrast) {
            this.enableHighContrastMode();
        }

        // Motion sensitivity
        if (this.prefersReducedMotion) {
            this.enableReducedMotionMode();
        }
    }

    addFocusEnhancements() {
        const style = document.createElement('style');
        style.id = 'focus-enhancements';
        style.textContent = `
            .micro-focus-ring {
                position: relative;
                outline: none;
            }

            .micro-focus-ring::after {
                content: '';
                position: absolute;
                top: -4px;
                left: -4px;
                right: -4px;
                bottom: -4px;
                border: 3px solid rgba(180, 85, 120, 0.8);
                border-radius: 12px;
                opacity: 0;
                transform: scale(0.95);
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
                z-index: 1;
            }

            .micro-focus-ring:focus::after,
            .micro-focus-ring:focus-visible::after {
                opacity: 1;
                transform: scale(1);
            }

            .enhanced-focus {
                position: relative;
                overflow: visible;
            }

            .enhanced-focus::before {
                content: '';
                position: absolute;
                inset: -8px;
                border-radius: 16px;
                background: linear-gradient(45deg,
                    rgba(180, 85, 120, 0.3) 0%,
                    rgba(140, 55, 115, 0.3) 50%,
                    rgba(180, 85, 120, 0.3) 100%);
                opacity: 0;
                transform: scale(0.9);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: -1;
                animation: focusPulse 2s ease-in-out infinite;
                animation-play-state: paused;
            }

            .enhanced-focus:focus::before {
                opacity: 1;
                transform: scale(1);
                animation-play-state: running;
            }

            @keyframes focusPulse {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.6; }
            }
        `;
        document.head.appendChild(style);

        // Apply focus enhancements to interactive elements
        document.querySelectorAll('button, .btn, a, input, select, textarea, [tabindex]').forEach(element => {
            element.classList.add('micro-focus-ring');

            // Add enhanced focus for important elements
            if (element.classList.contains('btn-hero-primary') ||
                element.classList.contains('btn-hero-secondary') ||
                element.classList.contains('floating-element')) {
                element.classList.add('enhanced-focus');
            }
        });
    }

    addAriaEnhancements() {
        // Enhance buttons without proper labels
        document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(button => {
            const text = button.textContent.trim();
            if (!text && button.querySelector('i')) {
                const icon = button.querySelector('i');
                const iconClass = icon.className;

                if (iconClass.includes('arrow-left') || iconClass.includes('prev')) {
                    button.setAttribute('aria-label', 'Previous slide');
                } else if (iconClass.includes('arrow-right') || iconClass.includes('next')) {
                    button.setAttribute('aria-label', 'Next slide');
                } else if (iconClass.includes('play')) {
                    button.setAttribute('aria-label', 'Play slideshow');
                } else if (iconClass.includes('pause')) {
                    button.setAttribute('aria-label', 'Pause slideshow');
                }
            }
        });

        // Add live region for dynamic content
        if (!document.getElementById('live-region')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.cssText = `
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
            document.body.appendChild(liveRegion);
        }
    }

    enhanceKeyboardNavigation() {
        let tabIndex = 0;
        const tabbableElements = [];

        // Create tab order for complex elements
        document.querySelectorAll('.floating-element, .hero-cta .btn, .nav-link').forEach(element => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
            tabbableElements.push(element);
        });

        // Enhanced keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Tab trapping for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabTrapping(e);
            }
        });
    }

    handleKeyboardShortcuts(e) {
        // Alt + number keys for quick navigation
        if (e.altKey && !isNaN(e.key) && e.key >= '1' && e.key <= '3') {
            e.preventDefault();
            const slideIndex = parseInt(e.key) - 1;

            if (window.MrCreamApp?.swiperInstance) {
                window.MrCreamApp.swiperInstance.slideTo(slideIndex);
                this.announceToScreenReader(`Navigated to slide ${e.key}`);
            }
        }

        // Space bar to pause/play slideshow
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            if (window.MrCreamApp?.swiperInstance) {
                const swiper = window.MrCreamApp.swiperInstance;
                if (swiper.autoplay.running) {
                    swiper.autoplay.stop();
                    this.announceToScreenReader('Slideshow paused');
                } else {
                    swiper.autoplay.start();
                    this.announceToScreenReader('Slideshow resumed');
                }
            }
        }

        // Arrow keys for slide navigation
        if (['ArrowLeft', 'ArrowRight'].includes(e.key) &&
            !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
            e.preventDefault();

            if (window.MrCreamApp?.swiperInstance) {
                const swiper = window.MrCreamApp.swiperInstance;
                if (e.key === 'ArrowLeft') {
                    swiper.slidePrev();
                } else {
                    swiper.slideNext();
                }
            }
        }
    }

    createVisualEffects() {
        // Ripple effect system
        this.createRippleEffect();

        // Hover glow system
        this.createHoverGlowSystem();

        // Click sparkle effects
        this.createSparkleSystem();

        // Loading shimmer effects
        this.createShimmerEffects();
    }

    createRippleEffect() {
        const rippleElements = document.querySelectorAll('.btn, .floating-element, .card');

        rippleElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.createRipple(e, element);
                this.triggerHapticFeedback('light');
            });
        });
    }

    createRipple(event, element) {
        if (!this.userPreferences.animationsEnabled) return;

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background: rgba(255, 255, 255, 0.3);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
        `;

        const rippleContainer = element.querySelector('.ripple-container') || element;
        rippleContainer.style.position = 'relative';
        rippleContainer.style.overflow = 'hidden';

        rippleContainer.appendChild(ripple);

        // Add ripple animation if not exists
        if (!document.getElementById('ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => ripple.remove(), 600);
    }

    createHoverGlowSystem() {
        const glowElements = document.querySelectorAll('.floating-element, .btn-hero-primary, .btn-hero-secondary');

        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.addHoverGlow(element);
                this.triggerHapticFeedback('subtle');
            });

            element.addEventListener('mouseleave', () => {
                this.removeHoverGlow(element);
            });
        });
    }

    addHoverGlow(element) {
        if (!this.userPreferences.animationsEnabled) return;

        element.style.filter = (element.style.filter || '') + ' drop-shadow(0 0 20px rgba(180, 85, 120, 0.5))';
        element.style.transition = 'filter 0.3s ease';
    }

    removeHoverGlow(element) {
        element.style.filter = element.style.filter.replace(/drop-shadow\([^)]*\)/g, '').trim();
    }

    createSparkleSystem() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn, .floating-element, .card')) {
                this.createSparkles(e.clientX, e.clientY);
            }
        });
    }

    createSparkles(x, y) {
        if (!this.userPreferences.animationsEnabled) return;

        const sparkleCount = 6;
        const colors = ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#98FB98'];

        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${x}px;
                top: ${y}px;
                animation: sparkle 0.8s ease-out forwards;
            `;

            const angle = (i / sparkleCount) * Math.PI * 2;
            const distance = 30 + Math.random() * 20;

            sparkle.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
            sparkle.style.setProperty('--dy', Math.sin(angle) * distance + 'px');

            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 800);
        }

        // Add sparkle animation
        if (!document.getElementById('sparkle-animation')) {
            const style = document.createElement('style');
            style.id = 'sparkle-animation';
            style.textContent = `
                @keyframes sparkle {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                    }
                    50% {
                        transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initializeSoundSystem() {
        if (!this.userPreferences.soundEnabled) return;

        // Create audio context for sound effects
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createSoundEffects();
        } catch (error) {
            console.warn('Audio context not supported');
        }
    }

    createSoundEffects() {
        // Synthesized sound effects for interactions
        this.soundEffects.set('click', this.createTone(800, 0.1, 'sine'));
        this.soundEffects.set('hover', this.createTone(600, 0.05, 'sine'));
        this.soundEffects.set('success', this.createTone(1000, 0.2, 'triangle'));
        this.soundEffects.set('error', this.createTone(300, 0.3, 'sawtooth'));
    }

    createTone(frequency, duration, waveform = 'sine') {
        return () => {
            if (!this.audioContext || !this.userPreferences.soundEnabled) return;

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = waveform;

            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }

    setupInteractionHandlers() {
        // Button interactions
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', () => {
                this.playSound('click');
                this.triggerHapticFeedback('medium');
            });

            button.addEventListener('mouseenter', () => {
                this.playSound('hover');
                this.triggerHapticFeedback('subtle');
            });
        });

        // Navigation interactions
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.playSound('click');
                this.triggerHapticFeedback('light');
            });
        });

        // Floating element interactions
        document.querySelectorAll('.floating-element').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.triggerHapticFeedback('subtle');
                this.createHoverPreview(element);
            });

            element.addEventListener('mouseleave', () => {
                this.removeHoverPreview(element);
            });
        });
    }

    enhanceFormInteractions() {
        document.querySelectorAll('input, textarea, select').forEach(field => {
            // Focus animations
            field.addEventListener('focus', () => {
                this.playSound('hover');
                this.addFieldAnimation(field, 'focus');
            });

            field.addEventListener('blur', () => {
                this.addFieldAnimation(field, 'blur');
            });

            // Real-time validation feedback
            field.addEventListener('input', () => {
                this.validateFieldRealtime(field);
            });
        });

        // Form submission feedback
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                this.handleFormSubmission(form, e);
            });
        });
    }

    addFieldAnimation(field, type) {
        if (!this.userPreferences.animationsEnabled) return;

        const container = field.closest('.form-field-wrapper') || field.parentElement;

        if (type === 'focus') {
            container.style.transform = 'scale(1.02)';
            container.style.boxShadow = '0 0 20px rgba(180, 85, 120, 0.3)';
            container.style.transition = 'all 0.3s ease';
        } else {
            container.style.transform = 'scale(1)';
            container.style.boxShadow = 'none';
        }
    }

    validateFieldRealtime(field) {
        const isValid = field.checkValidity();
        const feedback = field.nextElementSibling;

        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            this.playSound('success');
        } else if (field.value.length > 0) {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
    }

    createHoverPreview(element) {
        if (!this.userPreferences.animationsEnabled) return;

        const preview = document.createElement('div');
        preview.className = 'hover-preview';
        preview.style.cssText = `
            position: fixed;
            background: rgba(252, 252, 255, 0.95);
            backdrop-filter: blur(20px);
            padding: 15px 20px;
            border-radius: 12px;
            font-size: 14px;
            color: var(--text-primary);
            box-shadow: 0 10px 30px rgba(8, 25, 65, 0.3);
            z-index: 9998;
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            max-width: 200px;
            border: 1px solid rgba(180, 85, 120, 0.2);
        `;

        const rect = element.getBoundingClientRect();
        preview.style.left = rect.right + 15 + 'px';
        preview.style.top = rect.top + 'px';

        // Get preview content based on element
        const previewText = this.getPreviewText(element);
        preview.textContent = previewText;

        document.body.appendChild(preview);

        // Animate in
        requestAnimationFrame(() => {
            preview.style.opacity = '1';
            preview.style.transform = 'translateY(0)';
        });

        element.hoverPreview = preview;
    }

    removeHoverPreview(element) {
        if (element.hoverPreview) {
            element.hoverPreview.style.opacity = '0';
            element.hoverPreview.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                if (element.hoverPreview) {
                    element.hoverPreview.remove();
                    element.hoverPreview = null;
                }
            }, 300);
        }
    }

    getPreviewText(element) {
        if (element.querySelector('img')) {
            const img = element.querySelector('img');
            if (img.alt.includes('Strawberry')) return '🍓 Rich strawberry yoghurt drink';
            if (img.alt.includes('Vanilla')) return '🍦 Smooth vanilla yoghurt drink';
            if (img.alt.includes('Pool') || img.alt.includes('Water')) return '🏊‍♂️ Family-friendly water activities';
            if (img.alt.includes('Liqueur') || img.alt.includes('Turbo')) return '🥃 Premium cream liqueur (18+)';
        }

        return 'Click to explore more';
    }

    triggerHapticFeedback(intensity = 'light') {
        if (!this.hapticSupported || !this.userPreferences.hapticsEnabled) return;

        const patterns = {
            subtle: 5,
            light: [10],
            medium: [20, 10, 20],
            strong: [50, 10, 50, 10, 50]
        };

        const pattern = patterns[intensity] || patterns.light;
        navigator.vibrate(pattern);
    }

    playSound(soundName) {
        if (!this.userPreferences.soundEnabled) return;

        const soundEffect = this.soundEffects.get(soundName);
        if (soundEffect) {
            soundEffect();
        }
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;

            // Clear after a delay to allow next announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    enableHighContrastMode() {
        document.body.classList.add('high-contrast-mode');

        const style = document.createElement('style');
        style.id = 'high-contrast-styles';
        style.textContent = `
            .high-contrast-mode {
                filter: contrast(200%) brightness(110%);
            }

            .high-contrast-mode .floating-element {
                border: 3px solid #000;
            }

            .high-contrast-mode .btn {
                border: 2px solid #000;
                font-weight: bold;
            }

            .high-contrast-mode .hero-title {
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            }
        `;
        document.head.appendChild(style);
    }

    enableReducedMotionMode() {
        document.body.classList.add('reduced-motion');

        const style = document.createElement('style');
        style.id = 'reduced-motion-styles';
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }

            .reduced-motion .floating-element {
                animation: none !important;
            }

            .reduced-motion .swiper-slide {
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    handleFormSubmission(form, event) {
        event.preventDefault();

        // Visual feedback
        const submitButton = form.querySelector('[type="submit"]');
        if (submitButton) {
            submitButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                submitButton.style.transform = 'scale(1)';
            }, 150);
        }

        // Sound and haptic feedback
        this.playSound('success');
        this.triggerHapticFeedback('strong');

        // Simulate form processing
        this.showFormFeedback(form, 'processing');

        setTimeout(() => {
            this.showFormFeedback(form, 'success');
        }, 2000);
    }

    showFormFeedback(form, type) {
        const messages = {
            processing: '⏳ Processing your request...',
            success: '✅ Thank you! Your message has been sent.',
            error: '❌ There was an error. Please try again.'
        };

        const feedback = document.createElement('div');
        feedback.className = `form-feedback form-feedback-${type}`;
        feedback.textContent = messages[type];
        feedback.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            padding: 15px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#fff3cd'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#856404'};
            border-radius: 8px;
            margin-top: 10px;
            border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#ffeaa7'};
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 100;
        `;

        form.style.position = 'relative';
        form.appendChild(feedback);

        // Animate in
        requestAnimationFrame(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
        });

        // Announce to screen readers
        this.announceToScreenReader(messages[type]);

        // Remove after delay
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 300);
        }, 4000);
    }

    // Public API
    setPreference(key, value) {
        this.userPreferences[key] = value;

        if (key === 'animationsEnabled') {
            document.body.classList.toggle('reduced-motion', !value);
        } else if (key === 'highContrast') {
            document.body.classList.toggle('high-contrast-mode', value);
        }
    }

    getStats() {
        return {
            hapticSupported: this.hapticSupported,
            soundEnabled: this.userPreferences.soundEnabled,
            accessibilityFeatures: Array.from(this.accessibilityFeatures),
            interactionCount: this.interactions.size
        };
    }

    destroy() {
        // Clean up audio context
        if (this.audioContext) {
            this.audioContext.close();
        }

        // Remove added styles
        document.querySelectorAll('#focus-enhancements, #ripple-animation, #sparkle-animation, #high-contrast-styles, #reduced-motion-styles').forEach(style => {
            style.remove();
        });

        // Remove added classes
        document.body.classList.remove('high-contrast-mode', 'reduced-motion');

        this.isActive = false;
        console.log('🎯 Micro-Interactions System deactivated');
    }
}

// Initialize Micro-Interactions System
let microInteractions = null;

function initializeMicroInteractions() {
    if (!microInteractions) {
        microInteractions = new MicroInteractionsSystem();

        // Expose to global scope
        window.MicroInteractions = microInteractions;

        console.log('🎯 Micro-Interactions System loaded successfully!');
    }
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMicroInteractions);
} else {
    initializeMicroInteractions();
}

export default MicroInteractionsSystem;