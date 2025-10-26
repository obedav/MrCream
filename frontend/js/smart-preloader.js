/**
 * MrCream Smart Preloading & Performance Optimization System
 * Intelligent resource loading based on user behavior prediction
 * Advanced performance monitoring and optimization
 */

class SmartPreloader {
    constructor() {
        this.loadedResources = new Set();
        this.preloadedResources = new Set();
        this.userBehavior = {
            scrollDirection: 'down',
            currentSection: 0,
            timeSpentOnSections: new Map(),
            clickPatterns: [],
            deviceCapabilities: null
        };

        this.performanceMetrics = {
            loadTimes: new Map(),
            bandwidthEstimate: null,
            connectionType: 'unknown',
            deviceMemory: 0,
            hardwareConcurrency: 0
        };

        this.preloadStrategies = new Map();
        this.resourceQueue = [];
        this.isActive = false;

        this.init();
    }

    init() {
        console.log('🚀 Initializing Smart Preloader...');

        this.detectDeviceCapabilities();
        this.setupPerformanceObservers();
        this.initializeBehaviorPrediction();
        this.setupPreloadingStrategies();
        this.startIntelligentPreloading();

        this.isActive = true;
        console.log('✅ Smart Preloader activated!');
    }

    detectDeviceCapabilities() {
        // Get device memory
        this.performanceMetrics.deviceMemory = navigator.deviceMemory || 4; // Default to 4GB

        // Get CPU cores
        this.performanceMetrics.hardwareConcurrency = navigator.hardwareConcurrency || 4;

        // Detect connection type
        if ('connection' in navigator) {
            const connection = navigator.connection;
            this.performanceMetrics.connectionType = connection.effectiveType || 'unknown';
            this.performanceMetrics.bandwidthEstimate = connection.downlink;

            // Listen for connection changes
            connection.addEventListener('change', () => {
                this.performanceMetrics.connectionType = connection.effectiveType;
                this.performanceMetrics.bandwidthEstimate = connection.downlink;
                this.adaptToConnectionChange();
            });
        }

        // Categorize device capabilities
        this.userBehavior.deviceCapabilities = this.categorizeDevice();

        console.log('📱 Device capabilities detected:', {
            memory: this.performanceMetrics.deviceMemory + 'GB',
            cores: this.performanceMetrics.hardwareConcurrency,
            connection: this.performanceMetrics.connectionType,
            category: this.userBehavior.deviceCapabilities
        });
    }

    categorizeDevice() {
        const memory = this.performanceMetrics.deviceMemory;
        const cores = this.performanceMetrics.hardwareConcurrency;
        const connection = this.performanceMetrics.connectionType;

        if (memory >= 8 && cores >= 8 && ['4g', 'wifi'].includes(connection)) {
            return 'high-end';
        } else if (memory >= 4 && cores >= 4) {
            return 'mid-range';
        } else {
            return 'low-end';
        }
    }

    setupPerformanceObservers() {
        // Performance Observer for resource loading
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    this.recordLoadTime(entry.name, entry.loadEnd - entry.startTime);
                });
            });

            observer.observe({ entryTypes: ['resource'] });
        }

        // Long Task Observer for main thread blocking
        if ('PerformanceObserver' in window) {
            const longTaskObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.duration > 50) {
                        console.warn(`⚠️ Long task detected: ${entry.duration}ms`);
                        this.optimizePerformance();
                    }
                });
            });

            try {
                longTaskObserver.observe({ entryTypes: ['longtask'] });
            } catch (e) {
                // Longtask observer not supported
            }
        }

        // Memory pressure detection
        if ('memory' in performance) {
            setInterval(() => {
                const memoryInfo = performance.memory;
                const memoryUsage = memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize;

                if (memoryUsage > 0.8) {
                    console.warn('🧠 High memory usage detected, optimizing...');
                    this.handleMemoryPressure();
                }
            }, 10000);
        }
    }

    initializeBehaviorPrediction() {
        let scrollTimeout;
        let lastScrollY = window.scrollY;

        // Track scroll behavior
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const currentScrollY = window.scrollY;
                this.userBehavior.scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
                lastScrollY = currentScrollY;

                this.predictNextSection();
                this.preloadBasedOnScroll();
            }, 100);
        }, { passive: true });

        // Track section time
        this.trackSectionTime();

        // Track click patterns for navigation prediction
        document.addEventListener('click', (e) => {
            const clickData = {
                target: e.target.tagName,
                className: e.target.className,
                href: e.target.href,
                timestamp: Date.now(),
                position: { x: e.clientX, y: e.clientY }
            };

            this.userBehavior.clickPatterns.push(clickData);

            // Keep only last 20 clicks
            if (this.userBehavior.clickPatterns.length > 20) {
                this.userBehavior.clickPatterns.shift();
            }

            this.predictNavigationIntent(clickData);
        });
    }

    trackSectionTime() {
        const sections = document.querySelectorAll('.swiper-slide');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionIndex = Array.from(sections).indexOf(entry.target);

                if (entry.isIntersecting) {
                    this.userBehavior.currentSection = sectionIndex;
                    this.sectionStartTime = Date.now();
                } else if (this.sectionStartTime) {
                    const timeSpent = Date.now() - this.sectionStartTime;
                    const currentTime = this.userBehavior.timeSpentOnSections.get(sectionIndex) || 0;
                    this.userBehavior.timeSpentOnSections.set(sectionIndex, currentTime + timeSpent);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    setupPreloadingStrategies() {
        // Strategy 1: Critical resources (immediate)
        this.preloadStrategies.set('critical', {
            priority: 'high',
            resources: [
                'css/main.css',
                'css/hero.css',
                'js/main.js',
                'images/logo/Logo.png'
            ],
            condition: () => true
        });

        // Strategy 2: Next page prediction (based on current page)
        this.preloadStrategies.set('next-page', {
            priority: 'medium',
            resources: [],
            condition: () => this.predictNextPageVisit()
        });

        // Strategy 3: Images in viewport soon
        this.preloadStrategies.set('upcoming-images', {
            priority: 'medium',
            resources: [],
            condition: () => this.userBehavior.scrollDirection === 'down'
        });

        // Strategy 4: User preference based
        this.preloadStrategies.set('user-preference', {
            priority: 'low',
            resources: [],
            condition: () => this.hasUserPreferences()
        });
    }

    startIntelligentPreloading() {
        // Start with critical resources
        this.executePreloadStrategy('critical');

        // Set up adaptive preloading based on device capabilities
        const preloadInterval = this.getPreloadInterval();

        setInterval(() => {
            if (this.shouldPreload()) {
                this.executeAdaptivePreloading();
            }
        }, preloadInterval);

        // Preload on user idle
        this.setupIdlePreloading();
    }

    getPreloadInterval() {
        switch (this.userBehavior.deviceCapabilities) {
            case 'high-end': return 1000;
            case 'mid-range': return 2000;
            case 'low-end': return 5000;
            default: return 3000;
        }
    }

    shouldPreload() {
        // Don't preload if device is under stress
        if (this.performanceMetrics.memoryUsage > 0.7) return false;

        // Don't preload on slow connections
        if (['slow-2g', '2g'].includes(this.performanceMetrics.connectionType)) {
            return false;
        }

        // Don't preload if battery is low (if available)
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2 && !battery.charging) {
                    return false;
                }
            });
        }

        return true;
    }

    executeAdaptivePreloading() {
        // Predict what to preload based on user behavior
        const predictions = this.generatePreloadPredictions();

        predictions.forEach(prediction => {
            this.preloadResource(prediction.url, prediction.type, prediction.priority);
        });
    }

    generatePreloadPredictions() {
        const predictions = [];

        // Predict next slide images
        if (window.MrCreamApp?.swiperInstance) {
            const swiper = window.MrCreamApp.swiperInstance;
            const nextSlideIndex = (swiper.realIndex + 1) % swiper.slides.length;
            const nextSlide = swiper.slides[nextSlideIndex];

            if (nextSlide) {
                const images = nextSlide.querySelectorAll('img[src]');
                images.forEach(img => {
                    if (!this.preloadedResources.has(img.src)) {
                        predictions.push({
                            url: img.src,
                            type: 'image',
                            priority: 'high',
                            reason: 'next-slide'
                        });
                    }
                });
            }
        }

        // Predict page navigation based on click patterns
        const navigationPrediction = this.predictNavigationTarget();
        if (navigationPrediction) {
            predictions.push({
                url: navigationPrediction.url,
                type: 'document',
                priority: 'medium',
                reason: 'navigation-prediction'
            });
        }

        // Predict images that will enter viewport soon
        const upcomingImages = this.predictUpcomingImages();
        upcomingImages.forEach(img => {
            predictions.push({
                url: img.src,
                type: 'image',
                priority: 'low',
                reason: 'upcoming-viewport'
            });
        });

        return predictions;
    }

    predictUpcomingImages() {
        const images = document.querySelectorAll('img[src]');
        const upcomingImages = [];

        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Image is below the fold but close to viewport
            if (rect.top > windowHeight && rect.top < windowHeight * 2) {
                if (!this.preloadedResources.has(img.src)) {
                    upcomingImages.push(img);
                }
            }
        });

        return upcomingImages;
    }

    predictNavigationTarget() {
        // Analyze click patterns to predict next navigation
        const recentClicks = this.userBehavior.clickPatterns.slice(-5);
        const navigationClicks = recentClicks.filter(click => click.href);

        if (navigationClicks.length === 0) return null;

        // Find most frequent navigation target
        const targetCounts = new Map();
        navigationClicks.forEach(click => {
            const href = this.normalizeHref(click.href);
            targetCounts.set(href, (targetCounts.get(href) || 0) + 1);
        });

        let mostLikely = null;
        let maxCount = 0;

        targetCounts.forEach((count, href) => {
            if (count > maxCount) {
                maxCount = count;
                mostLikely = href;
            }
        });

        return mostLikely ? { url: mostLikely, confidence: maxCount / navigationClicks.length } : null;
    }

    normalizeHref(href) {
        try {
            const url = new URL(href, window.location.href);
            return url.pathname + url.search;
        } catch {
            return href;
        }
    }

    preloadResource(url, type, priority = 'low') {
        if (this.preloadedResources.has(url)) return;

        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;

        switch (type) {
            case 'image':
                link.as = 'image';
                break;
            case 'script':
                link.as = 'script';
                break;
            case 'style':
                link.as = 'style';
                break;
            case 'font':
                link.as = 'font';
                link.crossOrigin = 'anonymous';
                break;
            case 'document':
                link.rel = 'prefetch'; // Use prefetch for documents
                break;
        }

        // Set priority
        if ('fetchPriority' in link) {
            link.fetchPriority = priority;
        }

        link.onload = () => {
            console.log(`✅ Preloaded: ${url} (${type})`);
            this.preloadedResources.add(url);
        };

        link.onerror = () => {
            console.warn(`❌ Failed to preload: ${url}`);
        };

        document.head.appendChild(link);

        // Track preload attempt
        this.preloadedResources.add(url);
    }

    setupIdlePreloading() {
        let idleTimeout;

        const resetIdleTimer = () => {
            clearTimeout(idleTimeout);
            idleTimeout = setTimeout(() => {
                this.performIdlePreloading();
            }, 3000); // 3 seconds of inactivity
        };

        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetIdleTimer, { passive: true });
        });

        resetIdleTimer();
    }

    performIdlePreloading() {
        console.log('😴 User idle detected, performing low-priority preloading...');

        // Preload next page in navigation
        const navLinks = document.querySelectorAll('.nav-link[href]');
        navLinks.forEach(link => {
            if (!this.preloadedResources.has(link.href)) {
                this.preloadResource(link.href, 'document', 'low');
            }
        });

        // Preload non-critical images
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            if (!this.preloadedResources.has(img.src)) {
                this.preloadResource(img.src, 'image', 'low');
            }
        });
    }

    // Performance optimization methods
    optimizePerformance() {
        // Reduce animation complexity
        document.body.classList.add('performance-mode');

        // Defer non-critical scripts
        this.deferNonCriticalScripts();

        // Optimize images
        this.optimizeImages();

        console.log('⚡ Performance optimizations applied');
    }

    handleMemoryPressure() {
        // Clear preload cache
        this.preloadedResources.clear();

        // Remove unused preload links
        document.querySelectorAll('link[rel="preload"], link[rel="prefetch"]').forEach(link => {
            link.remove();
        });

        // Trigger garbage collection if available
        if (window.gc) {
            window.gc();
        }

        console.log('🧠 Memory pressure handled');
    }

    deferNonCriticalScripts() {
        const scripts = document.querySelectorAll('script[src]:not([data-critical])');
        scripts.forEach(script => {
            if (!script.defer && !script.async) {
                script.defer = true;
            }
        });
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
            }

            // Add decode hint for better performance
            img.decoding = 'async';
        });
    }

    adaptToConnectionChange() {
        const connectionType = this.performanceMetrics.connectionType;

        console.log(`📶 Connection changed to: ${connectionType}`);

        if (['slow-2g', '2g'].includes(connectionType)) {
            // Aggressive optimization for slow connections
            this.enableDataSaverMode();
        } else if (['3g'].includes(connectionType)) {
            // Moderate optimization
            this.enableModerateSavingMode();
        } else {
            // Full quality for fast connections
            this.enableFullQualityMode();
        }
    }

    enableDataSaverMode() {
        console.log('🔋 Data saver mode enabled');

        // Disable autoplay
        if (window.MrCreamApp?.swiperInstance) {
            window.MrCreamApp.swiperInstance.autoplay.stop();
        }

        // Reduce image quality
        document.body.classList.add('data-saver-mode');

        // Stop neural UI if active
        if (window.NeuralUI) {
            window.NeuralUI.decreaseIntensity();
        }
    }

    enableModerateSavingMode() {
        console.log('⚡ Moderate saving mode enabled');
        document.body.classList.add('moderate-saving-mode');
    }

    enableFullQualityMode() {
        console.log('🚀 Full quality mode enabled');
        document.body.classList.remove('data-saver-mode', 'moderate-saving-mode');

        // Resume autoplay
        if (window.MrCreamApp?.swiperInstance) {
            window.MrCreamApp.swiperInstance.autoplay.start();
        }
    }

    recordLoadTime(resource, time) {
        this.performanceMetrics.loadTimes.set(resource, time);

        // Adaptive optimization based on load times
        if (time > 2000) { // >2 seconds
            console.warn(`⏱️ Slow resource detected: ${resource} (${time}ms)`);
            this.optimizeSlowResource(resource);
        }
    }

    optimizeSlowResource(resource) {
        // Add resource to priority list for next visit
        if (resource.includes('.jpg') || resource.includes('.png')) {
            // Consider converting to WebP
            console.log(`📸 Consider optimizing image: ${resource}`);
        }
    }

    // Prediction helper methods
    predictNextSection() {
        const currentSection = this.userBehavior.currentSection;
        const scrollDirection = this.userBehavior.scrollDirection;

        if (scrollDirection === 'down') {
            return Math.min(currentSection + 1, 2); // Max 3 sections (0,1,2)
        } else {
            return Math.max(currentSection - 1, 0);
        }
    }

    preloadBasedOnScroll() {
        const predictedSection = this.predictNextSection();
        const slides = document.querySelectorAll('.swiper-slide');

        if (slides[predictedSection]) {
            const images = slides[predictedSection].querySelectorAll('img[src]');
            images.forEach(img => {
                if (!this.preloadedResources.has(img.src)) {
                    this.preloadResource(img.src, 'image', 'high');
                }
            });
        }
    }

    predictNextPageVisit() {
        // Analyze time spent on sections to predict interest
        let maxTime = 0;
        let preferredSection = 0;

        this.userBehavior.timeSpentOnSections.forEach((time, section) => {
            if (time > maxTime) {
                maxTime = time;
                preferredSection = section;
            }
        });

        // Map section to likely next page
        const sectionToPage = {
            0: 'yoghurt.html',
            1: 'waterpark.html',
            2: 'liqueur.html'
        };

        return sectionToPage[preferredSection] || null;
    }

    hasUserPreferences() {
        return this.userBehavior.timeSpentOnSections.size > 0;
    }

    executePreloadStrategy(strategyName) {
        const strategy = this.preloadStrategies.get(strategyName);
        if (!strategy || !strategy.condition()) return;

        strategy.resources.forEach(resource => {
            this.preloadResource(resource, this.getResourceType(resource), strategy.priority);
        });
    }

    getResourceType(resource) {
        if (resource.includes('.css')) return 'style';
        if (resource.includes('.js')) return 'script';
        if (resource.includes('.png') || resource.includes('.jpg') || resource.includes('.jpeg') || resource.includes('.webp')) return 'image';
        if (resource.includes('.woff') || resource.includes('.woff2')) return 'font';
        return 'document';
    }

    // Public API
    getStats() {
        return {
            preloadedCount: this.preloadedResources.size,
            deviceCapabilities: this.userBehavior.deviceCapabilities,
            connectionType: this.performanceMetrics.connectionType,
            currentSection: this.userBehavior.currentSection,
            averageLoadTime: Array.from(this.performanceMetrics.loadTimes.values())
                .reduce((sum, time) => sum + time, 0) / this.performanceMetrics.loadTimes.size || 0
        };
    }

    destroy() {
        // Clean up preload links
        document.querySelectorAll('link[rel="preload"], link[rel="prefetch"]').forEach(link => {
            link.remove();
        });

        document.body.classList.remove('performance-mode', 'data-saver-mode', 'moderate-saving-mode');

        this.isActive = false;
        console.log('🚀 Smart Preloader deactivated');
    }
}

// Initialize Smart Preloader
let smartPreloader = null;

function initializeSmartPreloader() {
    if (!smartPreloader) {
        smartPreloader = new SmartPreloader();

        // Expose to global scope
        window.SmartPreloader = smartPreloader;

        // Add performance mode styles
        const performanceStyles = document.createElement('style');
        performanceStyles.textContent = `
            .performance-mode * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }

            .data-saver-mode img {
                filter: blur(0.5px);
            }

            .data-saver-mode .floating-element {
                opacity: 0.5;
            }

            .moderate-saving-mode .floating-element {
                opacity: 0.8;
            }
        `;
        document.head.appendChild(performanceStyles);

        console.log('🚀 Smart Preloader loaded successfully!');
    }
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSmartPreloader);
} else {
    initializeSmartPreloader();
}

export default SmartPreloader;