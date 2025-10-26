// Enhanced Navigation JavaScript - Best Practice UI/UX Implementation
// Provides accessibility, loading states, keyboard navigation, and smooth interactions

class EnhancedNavigation {
    constructor() {
        this.navbar = document.getElementById('mainNavbar');
        this.navToggle = document.querySelector('.enhanced-toggle');
        this.navCollapse = document.getElementById('navbarNav');
        this.navLinks = document.querySelectorAll('.enhanced-nav-link');
        this.isMenuOpen = false;
        this.currentIndex = 0;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupMobileToggle();
        this.setupKeyboardNavigation();
        this.setupLoadingStates();
        this.setupAccessibility();
        this.setupFocusManagement();
        this.addSkipToContentLink();
        this.setupTooltips();
        this.initializeNavEffects();
    }

    // Enhanced scroll effect with performance optimization
    setupScrollEffect() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    
                    if (scrollY > 50) {
                        this.navbar.classList.add('scrolled');
                        this.navbar.setAttribute('data-scrolled', 'true');
                    } else {
                        this.navbar.classList.remove('scrolled');
                        this.navbar.setAttribute('data-scrolled', 'false');
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Use passive listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        handleScroll();
    }

    // Enhanced mobile toggle with smooth animations
    setupMobileToggle() {
        if (!this.navToggle) return;

        this.navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.navbar.contains(e.target) && 
                !this.navToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
                this.navToggle.focus();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991 && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.isMenuOpen = true;
        this.navToggle.setAttribute('aria-expanded', 'true');
        this.navToggle.setAttribute('aria-label', 'Close navigation menu');
        this.navCollapse.classList.add('show');
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu opened');
        
        // Focus first menu item
        setTimeout(() => {
            const firstLink = this.navCollapse.querySelector('.enhanced-nav-link');
            if (firstLink) firstLink.focus();
        }, 100);

        // Add body lock for iOS
        document.body.style.overflow = 'hidden';
        
        // Animation class for enhanced mobile menu
        this.navCollapse.classList.add('menu-opening');
        setTimeout(() => {
            this.navCollapse.classList.remove('menu-opening');
        }, 300);
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navToggle.setAttribute('aria-label', 'Open navigation menu');
        
        // Animation class for enhanced mobile menu
        this.navCollapse.classList.add('menu-closing');
        setTimeout(() => {
            this.navCollapse.classList.remove('show', 'menu-closing');
        }, 300);

        // Announce to screen readers
        this.announceToScreenReader('Navigation menu closed');

        // Restore body scroll
        document.body.style.overflow = '';
    }

    // Enhanced keyboard navigation
    setupKeyboardNavigation() {
        this.navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'ArrowDown':
                    case 'ArrowRight':
                        e.preventDefault();
                        this.focusNextLink(index);
                        break;
                    case 'ArrowUp':
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.focusPreviousLink(index);
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.focusFirstLink();
                        break;
                    case 'End':
                        e.preventDefault();
                        this.focusLastLink();
                        break;
                    case 'Enter':
                    case ' ':
                        // Let the default behavior handle the navigation
                        break;
                }
            });
        });
    }

    focusNextLink(currentIndex) {
        const nextIndex = (currentIndex + 1) % this.navLinks.length;
        this.navLinks[nextIndex].focus();
    }

    focusPreviousLink(currentIndex) {
        const prevIndex = (currentIndex - 1 + this.navLinks.length) % this.navLinks.length;
        this.navLinks[prevIndex].focus();
    }

    focusFirstLink() {
        this.navLinks[0].focus();
    }

    focusLastLink() {
        this.navLinks[this.navLinks.length - 1].focus();
    }

    // Loading states for navigation links
    setupLoadingStates() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't add loading state for anchor links or external links
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('http')) {
                    this.showLoadingState(link);
                }
            });
        });
    }

    showLoadingState(link) {
        link.classList.add('loading');
        link.setAttribute('aria-busy', 'true');
        
        // Remove loading state after navigation or timeout
        setTimeout(() => {
            link.classList.remove('loading');
            link.setAttribute('aria-busy', 'false');
        }, 2000);
    }

    // Enhanced accessibility features
    setupAccessibility() {
        // Add role and aria-label to navigation
        if (this.navbar) {
            this.navbar.setAttribute('role', 'navigation');
            this.navbar.setAttribute('aria-label', 'Main navigation');
        }

        // Set up proper ARIA attributes for menu items
        this.navLinks.forEach((link, index) => {
            link.setAttribute('tabindex', '0');
            link.setAttribute('role', 'menuitem');
            
            // Add position information for screen readers
            link.setAttribute('aria-posinset', index + 1);
            link.setAttribute('aria-setsize', this.navLinks.length);
        });

        // Set up ARIA live region for announcements
        this.createAriaLiveRegion();
    }

    createAriaLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'nav-announcements';
        liveRegion.className = 'nav-announcement';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        document.body.appendChild(liveRegion);
        this.liveRegion = liveRegion;
    }

    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = '';
            setTimeout(() => {
                this.liveRegion.textContent = message;
            }, 100);
        }
    }

    // Focus management for accessibility
    setupFocusManagement() {
        let focusableElements = [];
        
        // Update focusable elements when menu state changes
        const updateFocusableElements = () => {
            if (this.isMenuOpen) {
                focusableElements = [
                    this.navToggle,
                    ...this.navLinks
                ];
            } else {
                focusableElements = [this.navToggle];
            }
        };

        // Trap focus in mobile menu
        document.addEventListener('keydown', (e) => {
            if (!this.isMenuOpen || e.key !== 'Tab') return;
            
            updateFocusableElements();
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
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
        });
    }

    // Add skip to content link for accessibility
    addSkipToContentLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.setAttribute('tabindex', '0');
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content ID if it doesn't exist
        let mainContent = document.getElementById('main-content');
        if (!mainContent) {
            mainContent = document.querySelector('main') || 
                       document.querySelector('.hero-swiper') || 
                       document.querySelector('main-content');
            if (mainContent) {
                mainContent.id = 'main-content';
                mainContent.setAttribute('tabindex', '-1');
            }
        }
    }

    // Enhanced tooltips for navigation items
    setupTooltips() {
        this.navLinks.forEach(link => {
            const text = link.querySelector('.nav-text')?.textContent;
            if (text) {
                link.setAttribute('title', text);
                link.setAttribute('aria-label', text);
            }
        });

        // Enhanced tooltip for age-restricted content
        const liqueurLink = document.querySelector('[href="liqueur.html"]');
        if (liqueurLink) {
            liqueurLink.setAttribute('aria-label', 'Premium Liqueur - 18 years or older required');
        }
    }

    // Initialize navigation visual effects
    initializeNavEffects() {
        // Smooth entrance animation for navigation items
        if (!this.prefersReducedMotion) {
            this.navLinks.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    link.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, index * 100 + 200);
            });
        }

        // Add intersection observer for navbar animations
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.navbar.classList.add('in-view');
                } else {
                    this.navbar.classList.remove('in-view');
                }
            });
        }, observerOptions);

        // Observe the first section after navbar
        const heroSection = document.querySelector('.hero-swiper');
        if (heroSection) {
            observer.observe(heroSection);
        }
    }

    // Public method to highlight current page
    highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        this.navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            
            if (linkPath === currentPage || 
                (currentPage === '' && linkPath === 'index.html') ||
                (currentPage === 'index.html' && linkPath === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // Public method to add navigation loading indicator
    showGlobalLoading() {
        const loader = document.createElement('div');
        loader.className = 'nav-global-loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        this.navbar.appendChild(loader);
        
        return loader;
    }

    hideGlobalLoading(loader) {
        if (loader && loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    }
}

// Enhanced page load functionality
class PageLoadEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.setupPageLoadingStates();
        this.setupSmoothTransitions();
    }

    setupPageLoadingStates() {
        // Show loading state for all internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && this.isInternalLink(link)) {
                this.showPageTransition();
            }
        });
    }

    isInternalLink(link) {
        const href = link.getAttribute('href');
        return href && 
               !href.startsWith('#') && 
               !href.startsWith('http') && 
               !href.startsWith('mailto:') && 
               !href.startsWith('tel:');
    }

    showPageTransition() {
        if (document.querySelector('.page-transition')) return;

        const transition = document.createElement('div');
        transition.className = 'page-transition';
        transition.innerHTML = `
            <div class="transition-content">
                <div class="transition-spinner"></div>
                <p>Loading page...</p>
            </div>
        `;
        
        document.body.appendChild(transition);
        
        // Auto-hide after 3 seconds as fallback
        setTimeout(() => {
            this.hidePageTransition();
        }, 3000);
    }

    hidePageTransition() {
        const transition = document.querySelector('.page-transition');
        if (transition) {
            transition.style.opacity = '0';
            setTimeout(() => {
                if (transition.parentNode) {
                    transition.parentNode.removeChild(transition);
                }
            }, 300);
        }
    }

    setupSmoothTransitions() {
        // Add smooth page transition styles
        if (!document.getElementById('page-transition-styles')) {
            const style = document.createElement('style');
            style.id = 'page-transition-styles';
            style.textContent = `
                .page-transition {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, 
                        rgba(252, 252, 255, 0.95) 0%,
                        rgba(200, 120, 140, 0.1) 100%);
                    backdrop-filter: blur(20px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    transition: opacity 0.3s ease;
                }
                
                .transition-content {
                    text-align: center;
                    color: var(--text-primary);
                }
                
                .transition-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(15, 45, 120, 0.2);
                    border-top-color: var(--cosmic-blue);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize enhanced navigation
    window.enhancedNavigation = new EnhancedNavigation();
    window.pageLoadEnhancer = new PageLoadEnhancer();
    
    // Highlight current page
    window.enhancedNavigation.highlightCurrentPage();
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const navTiming = performance.getEntriesByType('navigation')[0];
            console.log('🚀 Navigation Performance:', {
                domContentLoaded: navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart,
                loadComplete: navTiming.loadEventEnd - navTiming.loadEventStart,
                totalLoad: navTiming.loadEventEnd - navTiming.navigationStart
            });
        });
    }
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EnhancedNavigation, PageLoadEnhancer };
}