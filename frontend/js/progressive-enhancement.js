/**
 * Progressive Enhancement and Loading States for MrCream
 * Optimizes user experience with intelligent loading and performance monitoring
 */

class ProgressiveEnhancement {
    constructor() {
        this.isLoaded = false;
        this.criticalResourcesLoaded = 0;
        this.totalCriticalResources = 3; // Swiper, Bootstrap, Fonts
        this.performanceMetrics = {
            loadStart: performance.now(),
            firstPaint: 0,
            domContentLoaded: 0,
            loadComplete: 0
        };

        this.connectionSpeed = this.detectConnectionSpeed();
        this.init();
    }

    init() {
        console.log('🚀 Initializing Progressive Enhancement System...');

        // Add loading screen
        this.createLoadingScreen();

        // Monitor critical resources
        this.monitorCriticalResources();

        // Setup progressive image loading
        this.setupProgressiveImageLoading();

        // Setup connection-aware features
        this.setupConnectionAwareFeatures();

        // Monitor performance
        this.setupPerformanceMonitoring();

        // Setup intersection observer for content
        this.setupContentObserver();

        console.log('✨ Progressive Enhancement System activated!');
    }

    createLoadingScreen() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">MrCream</div>
                <div class="loader-spinner"></div>
                <div class="loader-text">Loading your delicious experience...</div>
            </div>
        `;

        document.body.insertBefore(loader, document.body.firstChild);
        this.loaderElement = loader;
    }

    monitorCriticalResources() {
        // Monitor CSS loading
        this.waitForStylesheets();

        // Monitor JavaScript loading
        this.waitForScripts();

        // Monitor font loading
        this.waitForFonts();

        // Check if DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.performanceMetrics.domContentLoaded = performance.now();
                this.onCriticalResourceLoaded();
            });
        } else {
            this.performanceMetrics.domContentLoaded = performance.now();
            this.onCriticalResourceLoaded();
        }
    }

    waitForStylesheets() {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        let loadedStylesheets = 0;

        stylesheets.forEach(stylesheet => {
            if (stylesheet.sheet) {
                loadedStylesheets++;
            } else {
                stylesheet.addEventListener('load', () => {
                    loadedStylesheets++;
                    if (loadedStylesheets === stylesheets.length) {
                        this.onCriticalResourceLoaded();
                    }
                });
            }
        });

        if (loadedStylesheets === stylesheets.length) {
            this.onCriticalResourceLoaded();
        }
    }

    waitForScripts() {
        const scripts = document.querySelectorAll('script[src]');
        let loadedScripts = 0;

        scripts.forEach(script => {
            if (script.readyState === 'complete') {
                loadedScripts++;
            } else {
                script.addEventListener('load', () => {
                    loadedScripts++;
                    if (loadedScripts === scripts.length) {
                        this.onCriticalResourceLoaded();
                    }
                });
            }
        });

        if (loadedScripts === scripts.length) {
            this.onCriticalResourceLoaded();
        }
    }

    waitForFonts() {
        if ('fonts' in document) {
            document.fonts.ready.then(() => {
                console.log('📝 Fonts loaded successfully');
                this.onCriticalResourceLoaded();
            });
        } else {
            // Fallback for browsers without FontFace API
            setTimeout(() => {
                this.onCriticalResourceLoaded();
            }, 1000);
        }
    }

    onCriticalResourceLoaded() {
        this.criticalResourcesLoaded++;

        if (this.criticalResourcesLoaded >= this.totalCriticalResources) {
            // Add small delay to ensure smooth transition
            setTimeout(() => {
                this.hideLoadingScreen();
                this.initializeContent();
            }, 500);
        }
    }

    hideLoadingScreen() {
        if (this.loaderElement) {
            this.loaderElement.classList.add('hidden');

            setTimeout(() => {
                if (this.loaderElement && this.loaderElement.parentNode) {
                    this.loaderElement.parentNode.removeChild(this.loaderElement);
                }
            }, 800);
        }

        this.performanceMetrics.loadComplete = performance.now();
        this.logPerformanceMetrics();
        this.isLoaded = true;
    }

    setupProgressiveImageLoading() {
        const images = document.querySelectorAll('.product-image-full');

        images.forEach(img => {
            // Create placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.textContent = 'Loading...';

            // Insert placeholder
            const parent = img.parentNode;
            parent.style.position = 'relative';
            parent.appendChild(placeholder);

            // Handle image loading
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                placeholder.classList.add('hidden');
            });

            img.addEventListener('error', () => {
                placeholder.className = 'image-error';
                placeholder.textContent = 'Image unavailable';
            });

            // If image is already cached
            if (img.complete && img.naturalHeight !== 0) {
                img.classList.add('loaded');
                placeholder.classList.add('hidden');
            }
        });
    }

    setupConnectionAwareFeatures() {
        // Add connection class to body
        document.body.classList.add(`connection-${this.connectionSpeed}`);

        // Adjust features based on connection
        if (this.connectionSpeed === 'slow') {
            console.log('🐌 Slow connection detected - optimizing experience...');

            // Disable heavy animations
            const style = document.createElement('style');
            style.textContent = `
                .floating-element {
                    animation-duration: 8s !important;
                }
                .swiper-slide .hero-content > *,
                .swiper-slide .hero-visual .floating-element {
                    animation: none !important;
                    opacity: 1 !important;
                    transform: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    detectConnectionSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection;

            if (connection.effectiveType === '4g') {
                return 'fast';
            } else if (connection.effectiveType === '3g') {
                return 'medium';
            } else {
                return 'slow';
            }
        }

        // Fallback: assume medium connection
        return 'medium';
    }

    setupContentObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });

            // Observe all fade-in elements
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(el => observer.observe(el));
        } else {
            // Fallback for browsers without IntersectionObserver
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(el => el.classList.add('visible'));
        }
    }

    initializeContent() {
        // Add fade-in classes to hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const children = heroContent.children;
            Array.from(children).forEach((child, index) => {
                if (!child.classList.contains('fade-in')) {
                    child.classList.add('fade-in');

                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                }
            });
        }

        // Initialize floating elements
        this.initializeFloatingElements();

        // Trigger content loaded event
        document.dispatchEvent(new CustomEvent('contentLoaded'));
    }

    initializeFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');

        floatingElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }, 200 + (index * 150));
        });
    }

    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        this.monitorLCP();
        this.monitorFID();
        this.monitorCLS();

        // Create performance indicator (development only)
        if (this.isDevelopment()) {
            this.createPerformanceIndicator();
        }
    }

    monitorLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('📊 LCP (Largest Contentful Paint):', lastEntry.startTime.toFixed(2), 'ms');
            });

            try {
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.log('LCP monitoring not supported');
            }
        }
    }

    monitorFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('⚡ FID (First Input Delay):', entry.processingStart - entry.startTime, 'ms');
                });
            });

            try {
                observer.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                console.log('FID monitoring not supported');
            }
        }
    }

    monitorCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('📐 CLS (Cumulative Layout Shift):', clsValue.toFixed(4));
            });

            try {
                observer.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                console.log('CLS monitoring not supported');
            }
        }
    }

    createPerformanceIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'performance-indicator';
        document.body.appendChild(indicator);

        setInterval(() => {
            const loadTime = this.performanceMetrics.loadComplete - this.performanceMetrics.loadStart;
            indicator.textContent = `Load: ${loadTime.toFixed(0)}ms | ${this.connectionSpeed}`;
        }, 1000);
    }

    isDevelopment() {
        return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    }

    logPerformanceMetrics() {
        const metrics = this.performanceMetrics;
        const loadTime = metrics.loadComplete - metrics.loadStart;

        console.log('📈 Performance Metrics:');
        console.log(`  Total Load Time: ${loadTime.toFixed(2)}ms`);
        console.log(`  DOM Content Loaded: ${(metrics.domContentLoaded - metrics.loadStart).toFixed(2)}ms`);
        console.log(`  Connection Speed: ${this.connectionSpeed}`);

        // Report to analytics (if available)
        if (window.gtag) {
            gtag('event', 'page_load_time', {
                custom_parameter: loadTime,
                connection_type: this.connectionSpeed
            });
        }
    }
}

// Initialize progressive enhancement when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.progressiveEnhancement = new ProgressiveEnhancement();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProgressiveEnhancement;
}