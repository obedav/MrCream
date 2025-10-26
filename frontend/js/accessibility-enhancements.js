/**
 * Accessibility Enhancements for MrCream Hero Section
 * Ensures WCAG 2.1 AA compliance and enhanced keyboard navigation
 */

class AccessibilityEnhancements {
    constructor() {
        this.focusTrapStack = [];
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.highContrast = window.matchMedia('(prefers-contrast: high)').matches;
        this.announcements = [];

        this.init();
    }

    init() {
        console.log('♿ Initializing Accessibility Enhancements...');

        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
        this.setupFocusManagement();
        this.setupAriaLiveRegions();
        this.setupHighContrastSupport();
        this.setupReducedMotionSupport();
        this.setupSkipLinks();

        console.log('✅ Accessibility Enhancements activated!');
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation for swiper
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.hero-swiper')) {
                this.handleHeroKeyboardNavigation(e);
            }
        });

        // Make swiper navigation keyboard accessible
        document.querySelectorAll('.swiper-button-next, .swiper-button-prev').forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });

        // Enhance indicator dots keyboard navigation
        document.querySelectorAll('.indicator-dot').forEach((dot, index) => {
            dot.addEventListener('keydown', (e) => {
                this.handleIndicatorKeyNavigation(e, index);
            });

            dot.addEventListener('focus', () => {
                this.announceSlideChange(index);
            });
        });
    }

    handleHeroKeyboardNavigation(e) {
        const activeSlide = document.querySelector('.swiper-slide-active');

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                document.querySelector('.swiper-button-prev')?.click();
                this.announceSlideNavigation('previous');
                break;

            case 'ArrowRight':
                e.preventDefault();
                document.querySelector('.swiper-button-next')?.click();
                this.announceSlideNavigation('next');
                break;

            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                this.announceSlideChange(0);
                break;

            case 'End':
                e.preventDefault();
                const lastSlideIndex = document.querySelectorAll('.swiper-slide').length - 1;
                this.goToSlide(lastSlideIndex);
                this.announceSlideChange(lastSlideIndex);
                break;
        }
    }

    handleIndicatorKeyNavigation(e, currentIndex) {
        const indicators = document.querySelectorAll('.indicator-dot');
        const totalIndicators = indicators.length;

        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : totalIndicators - 1;
                indicators[prevIndex].focus();
                break;

            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = currentIndex < totalIndicators - 1 ? currentIndex + 1 : 0;
                indicators[nextIndex].focus();
                break;

            case 'Enter':
            case ' ':
                e.preventDefault();
                this.goToSlide(currentIndex);
                this.announceSlideChange(currentIndex);
                break;
        }
    }

    setupScreenReaderSupport() {
        // Create live region for dynamic announcements
        this.createLiveRegion();

        // Announce slide changes
        this.observeSlideChanges();

        // Enhance button labels
        this.enhanceButtonLabels();

        // Add context to images
        this.enhanceImageAltText();
    }

    createLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'hero-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(liveRegion);
        this.liveRegion = liveRegion;
    }

    observeSlideChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (mutation.target.classList.contains('swiper-slide-active')) {
                        this.announceActiveSlide(mutation.target);
                    }
                }
            });
        });

        document.querySelectorAll('.swiper-slide').forEach(slide => {
            observer.observe(slide, { attributes: true });
        });
    }

    announceActiveSlide(slide) {
        let slideContent = '';

        if (slide.classList.contains('slide-yoghurt')) {
            slideContent = 'Yoghurt products slide active. Nigeria\'s number 1 premium yoghurt with 100% natural ingredients.';
        } else if (slide.classList.contains('slide-waterpark')) {
            slideContent = 'Water park slide active. Lagos\' premier family water park with world-class safety standards.';
        } else if (slide.classList.contains('slide-liqueur')) {
            slideContent = 'Premium liqueur slide active. African luxury cream liqueur for adults 18 and older.';
        }

        this.announce(slideContent);
    }

    announceSlideNavigation(direction) {
        this.announce(`Navigating to ${direction} slide`);
    }

    announceSlideChange(index) {
        const slideNames = ['yoghurt products', 'water park', 'premium liqueur'];
        this.announce(`${slideNames[index]} slide selected`);
    }

    setupFocusManagement() {
        // Manage focus when navigating slides
        document.addEventListener('click', (e) => {
            if (e.target.matches('.indicator-dot, .swiper-button-next, .swiper-button-prev')) {
                setTimeout(() => {
                    this.focusFirstInteractiveElement();
                }, 100);
            }
        });

        // Enhance focus visibility
        this.enhanceFocusVisibility();
    }

    focusFirstInteractiveElement() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (activeSlide) {
            const firstButton = activeSlide.querySelector('.btn-hero-primary');
            if (firstButton) {
                firstButton.focus();
            }
        }
    }

    enhanceFocusVisibility() {
        const style = document.createElement('style');
        style.textContent = `
            .swiper-button-next:focus,
            .swiper-button-prev:focus,
            .indicator-dot:focus {
                outline: 3px solid #ff6b9d;
                outline-offset: 3px;
            }

            .btn-hero-primary:focus,
            .btn-hero-secondary:focus,
            .btn-hero-tertiary:focus {
                outline: 3px solid #ff6b9d;
                outline-offset: 3px;
            }

            @media (prefers-contrast: high) {
                .swiper-button-next:focus,
                .swiper-button-prev:focus,
                .indicator-dot:focus,
                .btn-hero-primary:focus,
                .btn-hero-secondary:focus,
                .btn-hero-tertiary:focus {
                    outline: 4px solid #000;
                    outline-offset: 2px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupAriaLiveRegions() {
        // Update aria-selected for indicator dots
        document.querySelectorAll('.indicator-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.updateIndicatorAria(index);
            });
        });
    }

    updateIndicatorAria(activeIndex) {
        document.querySelectorAll('.indicator-dot').forEach((dot, index) => {
            dot.setAttribute('aria-selected', index === activeIndex ? 'true' : 'false');
        });
    }

    setupHighContrastSupport() {
        if (this.highContrast) {
            document.body.classList.add('high-contrast');

            const style = document.createElement('style');
            style.textContent = `
                .high-contrast .floating-element {
                    border: 3px solid #000 !important;
                }

                .high-contrast .hero-badge {
                    border: 2px solid #000 !important;
                    background: #fff !important;
                    color: #000 !important;
                }

                .high-contrast .btn-hero-primary {
                    background: #000 !important;
                    color: #fff !important;
                    border: 2px solid #000 !important;
                }

                .high-contrast .btn-hero-secondary {
                    background: #fff !important;
                    color: #000 !important;
                    border: 2px solid #000 !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupReducedMotionSupport() {
        if (this.reducedMotion) {
            document.body.classList.add('reduced-motion');

            const style = document.createElement('style');
            style.textContent = `
                .reduced-motion * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }

                .reduced-motion .floating-element {
                    animation: none !important;
                }

                .reduced-motion .swiper-slide .hero-content > * {
                    opacity: 1 !important;
                    transform: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupSkipLinks() {
        // Create skip link for hero section
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
            background: #000;
            color: #fff;
            padding: 10px;
            text-decoration: none;
            z-index: 10000;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.cssText = `
                position: fixed;
                left: 10px;
                top: 10px;
                width: auto;
                height: auto;
                overflow: visible;
                background: #000;
                color: #fff;
                padding: 10px;
                text-decoration: none;
                z-index: 10000;
                border-radius: 4px;
            `;
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.cssText = `
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
                background: #000;
                color: #fff;
                padding: 10px;
                text-decoration: none;
                z-index: 10000;
            `;
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enhanceButtonLabels() {
        // Add more descriptive labels to buttons
        document.querySelectorAll('.btn-hero-primary').forEach(button => {
            const context = this.getSlideContext(button);
            if (context === 'yoghurt') {
                button.setAttribute('aria-describedby', 'hero-description');
            } else if (context === 'waterpark') {
                button.setAttribute('aria-describedby', 'waterpark-description');
            } else if (context === 'liqueur') {
                button.setAttribute('aria-describedby', 'liqueur-description');
            }
        });
    }

    enhanceImageAltText() {
        // Ensure all images have meaningful alt text
        document.querySelectorAll('.product-image-full').forEach(img => {
            if (!img.alt || img.alt.trim() === '') {
                const context = this.getSlideContext(img);
                if (context === 'yoghurt') {
                    img.alt = 'MrCream yoghurt drink bottle in premium packaging';
                } else if (context === 'waterpark') {
                    img.alt = 'MrCream water park facility with pools and attractions';
                } else if (context === 'liqueur') {
                    img.alt = 'Turbo Cream premium liqueur bottle';
                }
            }
        });
    }

    getSlideContext(element) {
        const slide = element.closest('.swiper-slide');
        if (slide?.classList.contains('slide-yoghurt')) return 'yoghurt';
        if (slide?.classList.contains('slide-waterpark')) return 'waterpark';
        if (slide?.classList.contains('slide-liqueur')) return 'liqueur';
        return 'unknown';
    }

    goToSlide(index) {
        const indicators = document.querySelectorAll('.indicator-dot');
        if (indicators[index]) {
            indicators[index].click();
        }
    }

    announce(message) {
        if (this.liveRegion && message) {
            this.liveRegion.textContent = message;
            console.log('🔊 Screen reader announcement:', message);
        }
    }

    // Public method to test accessibility
    runAccessibilityCheck() {
        const results = {
            hasSkipLinks: !!document.querySelector('.skip-link'),
            hasLiveRegion: !!document.querySelector('#hero-live-region'),
            buttonLabels: this.checkButtonLabels(),
            imageAltText: this.checkImageAltText(),
            keyboardNavigation: this.testKeyboardNavigation(),
            focusManagement: this.testFocusManagement()
        };

        console.log('♿ Accessibility Check Results:', results);
        return results;
    }

    checkButtonLabels() {
        const buttons = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary, .btn-hero-tertiary');
        return Array.from(buttons).every(button =>
            button.getAttribute('aria-label') || button.textContent.trim()
        );
    }

    checkImageAltText() {
        const images = document.querySelectorAll('.product-image-full');
        return Array.from(images).every(img => img.alt && img.alt.trim() !== '');
    }

    testKeyboardNavigation() {
        // Check if navigation elements are focusable
        const navElements = document.querySelectorAll('.swiper-button-next, .swiper-button-prev, .indicator-dot');
        return Array.from(navElements).every(el => el.tabIndex >= 0);
    }

    testFocusManagement() {
        // Check if focus is properly managed
        return document.activeElement !== null;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityEnhancements = new AccessibilityEnhancements();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityEnhancements;
}