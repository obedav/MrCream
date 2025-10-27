/**
 * MrCream Modern UX Enhancements
 * Best Practice Implementation - 2025
 * Includes: Accessibility, Performance, Modern Interactions
 */

(function() {
    'use strict';

    /* ========================================
       1. INITIALIZATION
       ======================================== */

    class ModernUX {
        constructor() {
            this.isInitialized = false;
            this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            this.isTouch = 'ontouchstart' in window;
            this.init();
        }

        init() {
            if (this.isInitialized) return;

            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }

        setup() {
            this.setupSkipNavigation();
            this.setupKeyboardNavigation();
            this.setupSmoothScroll();
            this.setupLazyLoading();
            this.setupFormEnhancements();
            this.setupToastNotifications();
            this.setupLoadingStates();
            this.setupAccessibilityHelpers();
            this.setupPerformanceMonitoring();
            this.isInitialized = true;

            console.log('✅ Modern UX initialized');
        }

        /* ========================================
           2. SKIP NAVIGATION (WCAG 2.4.1)
           ======================================== */

        setupSkipNavigation() {
            // Check if skip link already exists
            if (document.querySelector('.skip-to-content')) return;

            // Create skip to content link
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.className = 'skip-to-content';
            skipLink.textContent = 'Skip to main content';
            skipLink.setAttribute('tabindex', '0');

            // Insert at the beginning of body
            document.body.insertBefore(skipLink, document.body.firstChild);

            // Add ID to main content if not present
            const main = document.querySelector('main') || document.querySelector('.hero-swiper');
            if (main && !main.id) {
                main.id = 'main-content';
                main.setAttribute('tabindex', '-1');
            }

            // Handle skip link click
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: this.prefersReducedMotion ? 'auto' : 'smooth' });
                }
            });
        }

        /* ========================================
           3. KEYBOARD NAVIGATION
           ======================================== */

        setupKeyboardNavigation() {
            let isUsingKeyboard = false;

            // Detect keyboard usage
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    isUsingKeyboard = true;
                    document.body.classList.add('keyboard-navigation');
                }
            });

            // Detect mouse usage
            document.addEventListener('mousedown', () => {
                isUsingKeyboard = false;
                document.body.classList.remove('keyboard-navigation');
            });

            // Trap focus in modals
            this.setupModalFocusTrap();

            // Keyboard shortcuts
            this.setupKeyboardShortcuts();
        }

        setupModalFocusTrap() {
            const modals = document.querySelectorAll('.modal');

            modals.forEach(modal => {
                modal.addEventListener('shown.bs.modal', () => {
                    const focusableElements = modal.querySelectorAll(
                        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
                    );

                    if (focusableElements.length > 0) {
                        const firstElement = focusableElements[0];
                        const lastElement = focusableElements[focusableElements.length - 1];

                        modal.addEventListener('keydown', (e) => {
                            if (e.key === 'Tab') {
                                if (e.shiftKey) {
                                    if (document.activeElement === firstElement) {
                                        e.preventDefault();
                                        lastElement.focus();
                                    }
                                } else {
                                    if (document.activeElement === lastElement) {
                                        e.preventDefault();
                                        firstElement.focus();
                                    }
                                }
                            }
                        });

                        firstElement.focus();
                    }
                });
            });
        }

        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // Alt + H = Home
                if (e.altKey && e.key === 'h') {
                    e.preventDefault();
                    window.location.href = '/';
                }

                // Alt + S = Search (if search exists)
                if (e.altKey && e.key === 's') {
                    const searchInput = document.querySelector('input[type="search"]');
                    if (searchInput) {
                        e.preventDefault();
                        searchInput.focus();
                    }
                }

                // Escape = Close modal or menu
                if (e.key === 'Escape') {
                    const openModal = document.querySelector('.modal.show');
                    const openMenu = document.querySelector('.navbar-collapse.show');

                    if (openModal) {
                        const modalInstance = bootstrap.Modal.getInstance(openModal);
                        if (modalInstance) modalInstance.hide();
                    }

                    if (openMenu) {
                        const toggleButton = document.querySelector('.navbar-toggler');
                        if (toggleButton) toggleButton.click();
                    }
                }
            });
        }

        /* ========================================
           4. SMOOTH SCROLL
           ======================================== */

        setupSmoothScroll() {
            // Only add smooth scroll if user doesn't prefer reduced motion
            if (!this.prefersReducedMotion) {
                document.documentElement.style.scrollBehavior = 'smooth';
            }

            // Handle anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const targetId = anchor.getAttribute('href');
                    if (targetId === '#') return;

                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: this.prefersReducedMotion ? 'auto' : 'smooth',
                            block: 'start'
                        });

                        // Update URL without triggering scroll
                        if (history.pushState) {
                            history.pushState(null, null, targetId);
                        }

                        // Set focus for accessibility
                        target.setAttribute('tabindex', '-1');
                        target.focus();
                    }
                });
            });
        }

        /* ========================================
           5. LAZY LOADING
           ======================================== */

        setupLazyLoading() {
            // Use native lazy loading for images
            const images = document.querySelectorAll('img[data-src]');

            if ('loading' in HTMLImageElement.prototype) {
                images.forEach(img => {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                });
            } else {
                // Fallback to Intersection Observer
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                images.forEach(img => imageObserver.observe(img));
            }
        }

        /* ========================================
           6. FORM ENHANCEMENTS
           ======================================== */

        setupFormEnhancements() {
            const forms = document.querySelectorAll('form[novalidate]');

            forms.forEach(form => {
                // Real-time validation
                const inputs = form.querySelectorAll('input, textarea, select');

                inputs.forEach(input => {
                    // Validate on blur
                    input.addEventListener('blur', () => {
                        this.validateField(input);
                    });

                    // Clear error on input
                    input.addEventListener('input', () => {
                        if (input.classList.contains('is-invalid')) {
                            this.validateField(input);
                        }
                    });
                });

                // Form submission
                form.addEventListener('submit', (e) => {
                    let isValid = true;

                    inputs.forEach(input => {
                        if (!this.validateField(input)) {
                            isValid = false;
                        }
                    });

                    if (!isValid) {
                        e.preventDefault();
                        e.stopPropagation();

                        // Focus first invalid field
                        const firstInvalid = form.querySelector('.is-invalid');
                        if (firstInvalid) {
                            firstInvalid.focus();
                        }

                        // Show error toast
                        this.showToast('Please correct the errors in the form', 'error');
                    } else {
                        // Show loading state
                        this.setLoadingState(form, true);
                    }

                    form.classList.add('was-validated');
                });
            });
        }

        validateField(field) {
            const errorElement = field.parentElement.querySelector('.invalid-feedback') ||
                               field.parentElement.querySelector('.error-message');

            // Check native validation
            const isValid = field.checkValidity();

            if (!isValid) {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
                field.setAttribute('aria-invalid', 'true');

                if (errorElement) {
                    errorElement.textContent = field.validationMessage;
                    field.setAttribute('aria-describedby', errorElement.id || 'error-' + field.name);
                }
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
                field.setAttribute('aria-invalid', 'false');

                if (errorElement) {
                    errorElement.textContent = '';
                }
            }

            return isValid;
        }

        /* ========================================
           7. TOAST NOTIFICATIONS
           ======================================== */

        setupToastNotifications() {
            // Create toast container if it doesn't exist
            if (!document.querySelector('.toast-container')) {
                const container = document.createElement('div');
                container.className = 'toast-container position-fixed top-0 end-0 p-3';
                container.setAttribute('style', 'z-index: 9999;');
                container.setAttribute('aria-live', 'polite');
                container.setAttribute('aria-atomic', 'true');
                document.body.appendChild(container);
            }
        }

        showToast(message, type = 'info', duration = 5000) {
            const container = document.querySelector('.toast-container');
            const toast = document.createElement('div');
            toast.className = `toast align-items-center text-white bg-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'primary'} border-0`;
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'assertive');
            toast.setAttribute('aria-atomic', 'true');

            toast.innerHTML = `
                <div class="d-flex">
                    <div class="toast-body">
                        ${this.escapeHtml(message)}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            `;

            container.appendChild(toast);

            // Initialize Bootstrap toast
            const bsToast = new bootstrap.Toast(toast, { delay: duration });
            bsToast.show();

            // Remove from DOM after hidden
            toast.addEventListener('hidden.bs.toast', () => {
                toast.remove();
            });
        }

        /* ========================================
           8. LOADING STATES
           ======================================== */

        setupLoadingStates() {
            // Add loading indicators to async buttons
            document.querySelectorAll('[data-loading-text]').forEach(button => {
                button.addEventListener('click', () => {
                    this.setLoadingState(button, true);
                });
            });
        }

        setLoadingState(element, isLoading) {
            if (isLoading) {
                element.setAttribute('data-original-text', element.textContent);
                element.setAttribute('aria-busy', 'true');
                element.disabled = true;

                const loadingText = element.getAttribute('data-loading-text') || 'Loading...';
                element.innerHTML = `
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ${loadingText}
                `;
            } else {
                element.textContent = element.getAttribute('data-original-text');
                element.removeAttribute('aria-busy');
                element.disabled = false;
            }
        }

        /* ========================================
           9. ACCESSIBILITY HELPERS
           ======================================== */

        setupAccessibilityHelpers() {
            // Announce dynamic content changes
            this.setupLiveRegions();

            // Enhance focus management
            this.enhanceFocusManagement();

            // Add ARIA labels where missing
            this.addMissingAriaLabels();
        }

        setupLiveRegions() {
            // Create polite live region
            if (!document.querySelector('[role="status"]')) {
                const liveRegion = document.createElement('div');
                liveRegion.setAttribute('role', 'status');
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.setAttribute('aria-atomic', 'true');
                liveRegion.className = 'sr-only';
                liveRegion.id = 'live-region-polite';
                document.body.appendChild(liveRegion);
            }

            // Create assertive live region
            if (!document.querySelector('[role="alert"]')) {
                const alertRegion = document.createElement('div');
                alertRegion.setAttribute('role', 'alert');
                alertRegion.setAttribute('aria-live', 'assertive');
                alertRegion.setAttribute('aria-atomic', 'true');
                alertRegion.className = 'sr-only';
                alertRegion.id = 'live-region-assertive';
                document.body.appendChild(alertRegion);
            }
        }

        announce(message, assertive = false) {
            const region = document.querySelector(assertive ? '#live-region-assertive' : '#live-region-polite');
            if (region) {
                region.textContent = message;

                // Clear after announcement
                setTimeout(() => {
                    region.textContent = '';
                }, 1000);
            }
        }

        enhanceFocusManagement() {
            // Remember and restore focus
            let lastFocusedElement;

            document.addEventListener('focusin', (e) => {
                lastFocusedElement = e.target;
            });

            // Restore focus when modal closes
            document.querySelectorAll('.modal').forEach(modal => {
                modal.addEventListener('hidden.bs.modal', () => {
                    if (lastFocusedElement && lastFocusedElement !== modal) {
                        lastFocusedElement.focus();
                    }
                });
            });
        }

        addMissingAriaLabels() {
            // Add labels to buttons without text
            document.querySelectorAll('button:not([aria-label])').forEach(button => {
                if (!button.textContent.trim()) {
                    const icon = button.querySelector('i');
                    if (icon) {
                        const className = icon.className;
                        let label = 'Button';

                        if (className.includes('close')) label = 'Close';
                        else if (className.includes('menu')) label = 'Menu';
                        else if (className.includes('search')) label = 'Search';

                        button.setAttribute('aria-label', label);
                    }
                }
            });
        }

        /* ========================================
           10. PERFORMANCE MONITORING
           ======================================== */

        setupPerformanceMonitoring() {
            if ('PerformanceObserver' in window) {
                // Monitor long tasks
                try {
                    const observer = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            if (entry.duration > 50) {
                                console.warn('⚠️ Long task detected:', entry.duration.toFixed(2) + 'ms');
                            }
                        }
                    });
                    observer.observe({ entryTypes: ['longtask'] });
                } catch (e) {
                    // Longtask not supported
                }
            }

            // Log performance metrics
            window.addEventListener('load', () => {
                setTimeout(() => {
                    if ('performance' in window && 'getEntriesByType' in performance) {
                        const perfData = performance.getEntriesByType('navigation')[0];
                        if (perfData) {
                            console.log('📊 Performance Metrics:');
                            console.log('  DOM Content Loaded:', Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart) + 'ms');
                            console.log('  Page Load Complete:', Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms');
                            console.log('  First Paint:', Math.round(perfData.responseStart - perfData.fetchStart) + 'ms');
                        }
                    }
                }, 100);
            });
        }

        /* ========================================
           11. UTILITY METHODS
           ======================================== */

        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }

    /* ========================================
       12. INITIALIZE
       ======================================== */

    // Create global instance
    window.modernUX = new ModernUX();

})();
