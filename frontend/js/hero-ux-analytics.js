/**
 * Hero Section UX Analytics and User Experience Tracking
 * Tracks user interactions, conversion events, and UX metrics
 */

class HeroUXAnalytics {
    constructor() {
        this.interactions = new Map();
        this.conversionEvents = [];
        this.userJourney = [];
        this.timeOnSlide = new Map();
        this.currentSlide = 0;
        this.slideStartTime = Date.now();

        this.init();
    }

    init() {
        console.log('📊 Initializing Hero UX Analytics...');

        this.setupCTATracking();
        this.setupSlideTracking();
        this.setupHoverTracking();
        this.setupScrollTracking();
        this.setupFormInteractionTracking();
        this.setupAccessibilityTracking();
        this.setupConversionFunnelTracking();

        console.log('✅ Hero UX Analytics activated!');
    }

    setupCTATracking() {
        // Track all CTA button clicks with detailed context
        document.querySelectorAll('[data-analytics]').forEach(button => {
            button.addEventListener('click', (e) => {
                const analyticsId = e.currentTarget.getAttribute('data-analytics');
                const slideContext = this.getCurrentSlideContext();
                const buttonText = e.currentTarget.textContent.trim();
                const timeOnSlide = Date.now() - this.slideStartTime;

                const ctaEvent = {
                    type: 'cta_click',
                    analyticsId,
                    buttonText,
                    slideContext,
                    timeOnSlide,
                    timestamp: Date.now(),
                    userAgent: navigator.userAgent,
                    viewport: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    },
                    scrollPosition: window.scrollY
                };

                this.trackEvent(ctaEvent);
                this.trackConversionEvent(analyticsId, slideContext);

                // Visual feedback for user
                this.showCTAFeedback(e.currentTarget);

                console.log('🎯 CTA Click:', ctaEvent);
            });
        });
    }

    setupSlideTracking() {
        // Track slide changes and time spent
        const swiperInstance = document.querySelector('.hero-swiper');
        if (swiperInstance) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        this.trackSlideChange();
                    }
                });
            });

            // Observe slide changes
            document.querySelectorAll('.swiper-slide').forEach(slide => {
                observer.observe(slide, { attributes: true });
            });

            // Track slide interaction with pagination
            document.querySelectorAll('.swiper-pagination-bullet, .indicator-dot').forEach(bullet => {
                bullet.addEventListener('click', () => {
                    this.trackEvent({
                        type: 'slide_navigation',
                        method: 'pagination',
                        targetSlide: Array.from(bullet.parentNode.children).indexOf(bullet),
                        timestamp: Date.now()
                    });
                });
            });
        }
    }

    setupHoverTracking() {
        // Track hover interactions for UX insights
        document.querySelectorAll('.floating-element, .btn-hero-primary, .btn-hero-secondary').forEach(element => {
            let hoverStartTime = 0;

            element.addEventListener('mouseenter', () => {
                hoverStartTime = Date.now();
            });

            element.addEventListener('mouseleave', () => {
                if (hoverStartTime > 0) {
                    const hoverDuration = Date.now() - hoverStartTime;

                    this.trackEvent({
                        type: 'element_hover',
                        element: element.className,
                        duration: hoverDuration,
                        slideContext: this.getCurrentSlideContext(),
                        timestamp: Date.now()
                    });
                }
            });
        });
    }

    setupScrollTracking() {
        // Track scroll behavior and engagement
        let scrollTimer;
        let maxScroll = 0;

        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);

            const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            maxScroll = Math.max(maxScroll, scrollPercentage);

            scrollTimer = setTimeout(() => {
                this.trackEvent({
                    type: 'scroll_engagement',
                    maxScrollPercentage: maxScroll,
                    currentScrollPercentage: scrollPercentage,
                    timestamp: Date.now()
                });
            }, 500);
        });
    }

    setupFormInteractionTracking() {
        // Track newsletter and form interactions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                const formType = form.getAttribute('data-form-type') || 'unknown';

                this.trackEvent({
                    type: 'form_submission',
                    formType,
                    slideContext: this.getCurrentSlideContext(),
                    timestamp: Date.now()
                });

                this.trackConversionEvent(`form_${formType}`, this.getCurrentSlideContext());
            });

            // Track form field interactions
            form.querySelectorAll('input, textarea, select').forEach(field => {
                field.addEventListener('focus', () => {
                    this.trackEvent({
                        type: 'form_field_focus',
                        fieldType: field.type,
                        fieldName: field.name,
                        formType: form.getAttribute('data-form-type'),
                        timestamp: Date.now()
                    });
                });
            });
        });
    }

    setupAccessibilityTracking() {
        // Track keyboard navigation usage
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ') {
                this.trackEvent({
                    type: 'keyboard_navigation',
                    key: e.key,
                    target: e.target.tagName,
                    timestamp: Date.now()
                });
            }
        });

        // Track focus events
        document.addEventListener('focusin', (e) => {
            if (e.target.matches('.btn-hero-primary, .btn-hero-secondary, .btn-hero-tertiary')) {
                this.trackEvent({
                    type: 'button_focus',
                    element: e.target.className,
                    method: 'keyboard',
                    timestamp: Date.now()
                });
            }
        });
    }

    setupConversionFunnelTracking() {
        // Track the conversion funnel progression
        const funnelSteps = [
            'page_load',
            'hero_view',
            'cta_hover',
            'cta_click',
            'form_start',
            'form_complete'
        ];

        this.conversionFunnel = {
            steps: funnelSteps,
            progress: new Map(),
            startTime: Date.now()
        };

        // Track page load
        this.trackFunnelStep('page_load');

        // Track hero view when user scrolls to it
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.trackFunnelStep('hero_view');
                }
            });
        }, { threshold: 0.5 });

        const heroSection = document.querySelector('.hero-swiper');
        if (heroSection) {
            heroObserver.observe(heroSection);
        }
    }

    trackSlideChange() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (activeSlide) {
            const newSlideIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);

            if (newSlideIndex !== this.currentSlide) {
                const timeOnPreviousSlide = Date.now() - this.slideStartTime;

                // Record time on previous slide
                this.timeOnSlide.set(this.currentSlide,
                    (this.timeOnSlide.get(this.currentSlide) || 0) + timeOnPreviousSlide);

                this.trackEvent({
                    type: 'slide_change',
                    fromSlide: this.currentSlide,
                    toSlide: newSlideIndex,
                    timeOnPreviousSlide,
                    timestamp: Date.now()
                });

                this.currentSlide = newSlideIndex;
                this.slideStartTime = Date.now();
            }
        }
    }

    getCurrentSlideContext() {
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (activeSlide) {
            if (activeSlide.classList.contains('slide-yoghurt')) return 'yoghurt';
            if (activeSlide.classList.contains('slide-waterpark')) return 'waterpark';
            if (activeSlide.classList.contains('slide-liqueur')) return 'liqueur';
        }
        return 'unknown';
    }

    trackEvent(event) {
        // Store event locally
        this.userJourney.push(event);

        // Send to analytics service (Google Analytics, Mixpanel, etc.)
        if (window.gtag) {
            gtag('event', event.type, {
                custom_parameter: JSON.stringify(event),
                event_category: 'hero_section',
                event_label: event.analyticsId || event.slideContext || 'general'
            });
        }

        // Send to custom analytics endpoint
        this.sendToAnalytics(event);
    }

    trackConversionEvent(eventId, context) {
        const conversionEvent = {
            id: eventId,
            context,
            timestamp: Date.now(),
            userJourneyLength: this.userJourney.length,
            timeToConversion: Date.now() - this.slideStartTime
        };

        this.conversionEvents.push(conversionEvent);

        // Track conversion funnel progress
        if (eventId.includes('cta')) {
            this.trackFunnelStep('cta_click');
        }

        console.log('💰 Conversion Event:', conversionEvent);
    }

    trackFunnelStep(step) {
        if (!this.conversionFunnel.progress.has(step)) {
            this.conversionFunnel.progress.set(step, Date.now());

            console.log(`🎯 Funnel Step: ${step} at ${Date.now() - this.conversionFunnel.startTime}ms`);
        }
    }

    showCTAFeedback(button) {
        // Add loading state
        button.classList.add('btn-loading');

        // Simulate processing time
        setTimeout(() => {
            button.classList.remove('btn-loading');
            button.classList.add('btn-success');

            setTimeout(() => {
                button.classList.remove('btn-success');
            }, 2000);
        }, 1500);
    }

    sendToAnalytics(event) {
        // Send to your analytics endpoint
        if (navigator.sendBeacon) {
            const data = JSON.stringify({
                event,
                sessionId: this.getSessionId(),
                userId: this.getUserId(),
                timestamp: Date.now()
            });

            navigator.sendBeacon('/api/analytics', data);
        }
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('mrcream_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('mrcream_session_id', sessionId);
        }
        return sessionId;
    }

    getUserId() {
        let userId = localStorage.getItem('mrcream_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('mrcream_user_id', userId);
        }
        return userId;
    }

    generateReport() {
        const report = {
            sessionSummary: {
                totalEvents: this.userJourney.length,
                conversionEvents: this.conversionEvents.length,
                timeOnSlides: Object.fromEntries(this.timeOnSlide),
                currentSlide: this.currentSlide
            },
            conversionFunnel: {
                steps: Array.from(this.conversionFunnel.progress.entries()),
                completionRate: (this.conversionFunnel.progress.size / this.conversionFunnel.steps.length) * 100
            },
            userJourney: this.userJourney,
            conversionEvents: this.conversionEvents
        };

        console.log('📊 UX Analytics Report:', report);
        return report;
    }

    // Public method to get insights
    getUXInsights() {
        return {
            mostEngagingSlide: this.getMostEngagingSlide(),
            conversionRate: this.getConversionRate(),
            userBehaviorPatterns: this.getUserBehaviorPatterns()
        };
    }

    getMostEngagingSlide() {
        let maxTime = 0;
        let mostEngaging = 'yoghurt';

        this.timeOnSlide.forEach((time, slide) => {
            if (time > maxTime) {
                maxTime = time;
                mostEngaging = slide;
            }
        });

        return { slide: mostEngaging, timeSpent: maxTime };
    }

    getConversionRate() {
        const totalViews = this.userJourney.filter(e => e.type === 'slide_view').length || 1;
        const conversions = this.conversionEvents.length;
        return (conversions / totalViews) * 100;
    }

    getUserBehaviorPatterns() {
        const patterns = {
            preferredInteractionMethod: 'click', // mouse vs keyboard
            averageTimePerSlide: 0,
            mostClickedCTA: null,
            scrollEngagement: 'high' // low, medium, high
        };

        // Calculate patterns from user journey data
        return patterns;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.heroUXAnalytics = new HeroUXAnalytics();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroUXAnalytics;
}