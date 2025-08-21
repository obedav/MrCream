// Enhanced MrCream Main JavaScript - Optimized for Background Image

// Add this to your main.js - Remove all background image loading

// Override any background image loading
function removeBackgroundImageLoading() {
    // Remove any existing background images
    document.body.style.backgroundImage = 'none';
    
    // Remove background from hero swiper
    const heroSwiper = document.querySelector('.hero-swiper');
    if (heroSwiper) {
        heroSwiper.style.backgroundImage = 'none';
        heroSwiper.style.background = 'transparent';
    }
    
    // Remove any background loading classes
    document.body.classList.remove('background-loaded', 'background-loading');
    
    // Cancel any pending background image loads
    const existingImages = document.querySelectorAll('link[rel="preload"][as="image"]');
    existingImages.forEach(link => {
        if (link.href.includes('MrCream-landing')) {
            link.remove();
        }
    });
    
    console.log('✅ Background image loading removed - using pure CSS gradients');
}

// Enhanced initializeBackgroundOptimizations - now CSS only
function initializeBackgroundOptimizations() {
    // Remove any image loading
    removeBackgroundImageLoading();
    
    // Add optimized CSS class
    document.body.classList.add('css-background-only');
    
    // Create optimized styles
    if (!document.getElementById('css-background-optimizations')) {
        const style = document.createElement('style');
        style.id = 'css-background-optimizations';
        style.textContent = `
            .css-background-only {
                /* Ensure no background images */
                background-image: none !important;
            }
            
            /* Smooth transitions for better UX */
            body, .hero-swiper {
                transition: background 0.3s ease;
            }
            
            /* Performance optimization */
            .floating-element,
            .hero-badge,
            .stat-item {
                will-change: transform;
                transform: translateZ(0); /* Enable hardware acceleration */
            }
        `;
        document.head.appendChild(style);
    }
    
    // Performance monitoring
    if ('performance' in window && 'navigation' in performance) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log(`⚡ Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms (CSS-only background)`);
                }
            }, 100);
        });
    }
}

// Override any existing background loading functions
window.loadBackgroundImage = function() {
    console.log('Background image loading disabled - using CSS gradients');
};

// Call the optimization function immediately
document.addEventListener('DOMContentLoaded', function() {
    initializeBackgroundOptimizations();
});

// Also call it immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBackgroundOptimizations);
} else {
    initializeBackgroundOptimizations();
}

// Performance tip: Preload critical CSS
function preloadCriticalCSS() {
    // Ensure CSS is loaded before showing content
    const criticalCSS = [
        'css/main.css',
        'css/hero.css'
    ];
    
    criticalCSS.forEach(cssFile => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = cssFile;
        link.onload = function() {
            this.rel = 'stylesheet';
        };
        document.head.appendChild(link);
    });
}

// Global application state
window.MrCreamApp = {
    currentPage: 'home',
    ageVerified: false,
    verificationToken: null,
    apiBaseUrl: 'https://localhost:7001/api',
    swiperInstance: null,
    navbarScrolled: false
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 MrCream Application Starting...');
    
    // Initialize all components
    initializeNavbar();
    initializeHeroSwiper();
    initializeSmoothScrolling();
    initializeAnimations();
    checkExistingAgeVerification();
    initializeContactForms();
    initializeTooltips();
    initializeBackgroundOptimizations();
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('✅ MrCream Application Ready! 🍓🏊‍♂️🥃');
});

// Enhanced Navbar functionality with background optimization
function initializeNavbar() {
    const navbar = document.getElementById('mainNavbar');
    
    if (!navbar) return;
    
    // Enhanced scroll effect with smooth transitions
    let ticking = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        const shouldBeScrolled = scrollY > 50;
        
        if (shouldBeScrolled !== window.MrCreamApp.navbarScrolled) {
            window.MrCreamApp.navbarScrolled = shouldBeScrolled;
            
            if (shouldBeScrolled) {
                navbar.classList.add('scrolled');
                navbar.style.background = `linear-gradient(90deg, 
                    rgba(8, 25, 65, 0.96) 0%,
                    rgba(15, 45, 120, 0.94) 20%,
                    rgba(140, 55, 115, 0.92) 40%,
                    rgba(160, 35, 85, 0.94) 60%,
                    rgba(180, 85, 120, 0.92) 80%,
                    rgba(200, 120, 140, 0.96) 100%)`;
                navbar.style.backdropFilter = 'blur(30px) saturate(1.8)';
                navbar.style.boxShadow = `
                    0 12px 40px rgba(8, 25, 65, 0.4),
                    0 6px 20px rgba(140, 55, 115, 0.3),
                    inset 0 1px 0 rgba(252, 252, 255, 0.2)`;
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.background = `linear-gradient(90deg, 
                    rgba(8, 25, 65, 0.92) 0%,
                    rgba(15, 45, 120, 0.90) 20%,
                    rgba(140, 55, 115, 0.88) 40%,
                    rgba(160, 35, 85, 0.90) 60%,
                    rgba(180, 85, 120, 0.88) 80%,
                    rgba(200, 120, 140, 0.92) 100%)`;
                navbar.style.backdropFilter = 'blur(25px) saturate(1.6)';
                navbar.style.boxShadow = `
                    0 8px 32px rgba(8, 25, 65, 0.3),
                    0 4px 16px rgba(140, 55, 115, 0.25),
                    0 2px 8px rgba(160, 35, 85, 0.2),
                    inset 0 1px 0 rgba(252, 252, 255, 0.15)`;
            }
        }
        
        ticking = false;
    }
    
    function requestNavbarUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    // Optimized scroll listener
    window.addEventListener('scroll', requestNavbarUpdate, { passive: true });
    
    // Handle mobile menu with enhanced functionality
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = navbarCollapse.classList.contains('show');
            
            if (isExpanded) {
                // Closing
                navbarCollapse.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => {
                    navbarCollapse.classList.remove('show');
                    navbarCollapse.style.animation = '';
                }, 250);
            } else {
                // Opening
                navbarCollapse.classList.add('show');
                navbarCollapse.style.animation = 'slideDown 0.3s ease';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
                navbarCollapse.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => {
                    navbarCollapse.classList.remove('show');
                    navbarCollapse.style.animation = '';
                }, 250);
            }
        });
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.style.animation = 'slideUp 0.3s ease';
                    setTimeout(() => {
                        navbarCollapse.classList.remove('show');
                        navbarCollapse.style.animation = '';
                    }, 250);
                }
            });
        });
    }

    // Enhanced smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add navbar animations CSS if not present
    if (!document.getElementById('navbar-animations')) {
        const style = document.createElement('style');
        style.id = 'navbar-animations';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-20px);
                }
            }
            
            #mainNavbar {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .navbar-collapse {
                transition: all 0.3s ease;
            }
            
            @media (max-width: 991px) {
                .navbar-collapse.show {
                    background: linear-gradient(135deg, 
                        rgba(8, 25, 65, 0.95) 0%,
                        rgba(15, 45, 120, 0.92) 50%,
                        rgba(140, 55, 115, 0.95) 100%);
                    backdrop-filter: blur(30px);
                    border-radius: 15px;
                    margin-top: 15px;
                    padding: 20px;
                    border: 1px solid rgba(180, 85, 120, 0.3);
                    box-shadow: 0 10px 30px rgba(8, 25, 65, 0.4);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Background optimizations
function initializeBackgroundOptimizations() {
    // Check if background image is loaded
    const backgroundImage = new Image();
    const imageUrl = 'images/MrCream-landing.png';
    
    backgroundImage.onload = function() {
        console.log('✅ Background image loaded successfully');
        document.body.classList.add('background-loaded');
        
        // Add CSS for loaded state
        if (!document.getElementById('background-optimizations')) {
            const style = document.createElement('style');
            style.id = 'background-optimizations';
            style.textContent = `
                body.background-loaded {
                    background-image: url('${imageUrl}');
                    background-size: cover;
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-attachment: scroll;
                    min-height: 100vh;
                    position: relative;
                }
                
                body.background-loaded::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(8, 25, 65, 0.2);
                    z-index: -1;
                    pointer-events: none;
                }
                
                @media (max-width: 768px) {
                    body.background-loaded {
                        background-attachment: scroll;
                        background-size: cover;
                        background-position: center center;
                    }
                    
                    body.background-loaded::before {
                        background: rgba(8, 25, 65, 0.3);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    backgroundImage.onerror = function() {
        console.warn('⚠️ Background image failed to load, using fallback');
        document.body.style.background = 'var(--gradient-primary)';
    };
    
    backgroundImage.src = imageUrl;
    
    // Optimize performance for mobile
    if (window.innerWidth <= 768) {
        // Reduce backdrop-filter intensity on mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .floating-element,
                .hero-badge,
                .stat-item,
                .btn-hero-secondary {
                    backdrop-filter: blur(8px) !important;
                }
                
                #mainNavbar {
                    backdrop-filter: blur(15px) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Hero Swiper initialization with background considerations
function initializeHeroSwiper() {
    const swiperContainer = document.querySelector('.hero-swiper');
    if (!swiperContainer) return;

    // Remove background from swiper since body has it now
    swiperContainer.style.background = 'transparent';

    const heroSwiper = new Swiper('.hero-swiper', {
        // Basic settings
        direction: 'horizontal',
        loop: true,
        speed: 1000,
        effect: 'fade',
        
        // Autoplay
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        
        // Fade effect
        fadeEffect: {
            crossFade: true
        },
        
        // Navigation
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        
        // Keyboard control
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        
        // Mouse wheel
        mousewheel: {
            enabled: true,
            sensitivity: 0.5
        },
        
        // Touch settings
        touchRatio: 1,
        touchAngle: 45,
        
        // Performance optimizations
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 1
        },
        
        // Callbacks
        on: {
            init: function() {
                updateSlideIndicators(0);
                console.log('Hero swiper initialized');
            },
            slideChange: function() {
                updateSlideIndicators(this.realIndex);
                triggerSlideAnimations(this.realIndex);
            },
            slideChangeTransitionStart: function() {
                // Add entrance animations to active slide content
                const activeSlide = this.slides[this.activeIndex];
                animateSlideContent(activeSlide, 'enter');
            }
        }
    });
    
    // Store swiper instance globally
    window.MrCreamApp.swiperInstance = heroSwiper;
    
    // Custom slide indicators
    initializeSlideIndicators(heroSwiper);
    
    // Enhanced pause autoplay on hover with smooth transitions
    if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', () => {
            heroSwiper.autoplay.stop();
            swiperContainer.style.transform = 'scale(1.02)';
            swiperContainer.style.transition = 'transform 0.3s ease';
        });
        
        swiperContainer.addEventListener('mouseleave', () => {
            heroSwiper.autoplay.start();
            swiperContainer.style.transform = 'scale(1)';
        });
    }
    
    return heroSwiper;
}

// Rest of your existing functions remain the same...
// (I'm keeping the existing functions to avoid duplication)

// Custom slide indicators
function initializeSlideIndicators(swiper) {
    const indicators = document.querySelectorAll('.indicator-dot');
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            swiper.slideTo(index);
        });
    });
}

// Update slide indicators
function updateSlideIndicators(activeIndex) {
    const indicators = document.querySelectorAll('.indicator-dot');
    
    indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Enhanced setup event listeners with background optimizations
function setupEventListeners() {
    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        const swiper = window.MrCreamApp.swiperInstance;
        if (swiper) {
            if (document.hidden) {
                swiper.autoplay.stop();
            } else {
                swiper.autoplay.start();
            }
        }
    });
    
    // Enhanced window resize handler
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Update swiper on resize
            const swiper = window.MrCreamApp.swiperInstance;
            if (swiper) {
                swiper.update();
            }
            
            // Reoptimize background for new screen size
            if (window.innerWidth <= 768) {
                document.body.style.backgroundAttachment = 'scroll';
            } else {
                document.body.style.backgroundAttachment = 'scroll'; // Keep scroll for better performance
            }
        }, 250);
    });
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        const swiper = window.MrCreamApp.swiperInstance;
        if (!swiper) return;
        
        // Don't interfere if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                swiper.slidePrev();
                break;
            case 'ArrowRight':
                e.preventDefault();
                swiper.slideNext();
                break;
            case ' ':
                if (e.target === document.body) {
                    e.preventDefault();
                    if (swiper.autoplay.running) {
                        swiper.autoplay.stop();
                        showInfoMessage('Slideshow paused. Press space to resume.');
                    } else {
                        swiper.autoplay.start();
                        showInfoMessage('Slideshow resumed.');
                    }
                }
                break;
            case 'Escape':
                // Close any open modals
                const openModals = document.querySelectorAll('.modal.show');
                openModals.forEach(modal => {
                    const modalInstance = bootstrap.Modal.getInstance(modal);
                    if (modalInstance) {
                        modalInstance.hide();
                    }
                });
                break;
        }
    });
    
    // Enhanced product card click handlers with age verification
    document.addEventListener('click', function(e) {
        if (e.target.closest('.product-card') || e.target.closest('.liqueur-card') || 
            e.target.closest('[href*="liqueur"]')) {
            const element = e.target.closest('.product-card, .liqueur-card, [href*="liqueur"]');
            
            if (element && (element.classList.contains('liqueur-card') || 
                element.getAttribute('href') && element.getAttribute('href').includes('liqueur'))) {
                // Check age verification for liqueur
                if (!window.MrCreamApp.ageVerified) {
                    e.preventDefault();
                    showAgeVerification();
                    return;
                }
            }
        }
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log(`⚡ Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
                }
            }, 0);
        });
    }
}

// Enhanced notification system with better positioning for background
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed notification-toast`;
    notification.style.cssText = `
        top: 120px; 
        right: 20px; 
        z-index: 9999; 
        min-width: 350px; 
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 20px 60px rgba(8, 25, 65, 0.3);
        border-radius: 15px;
        border: none;
        backdrop-filter: blur(25px);
        background: linear-gradient(135deg, 
            rgba(252, 252, 255, 0.95) 0%,
            rgba(240, 245, 255, 0.9) 100%);
        border: 1px solid rgba(180, 85, 120, 0.2);
    `;
    
    const iconMap = {
        success: 'check-circle-fill',
        danger: 'exclamation-triangle-fill',
        info: 'info-circle-fill',
        warning: 'exclamation-triangle-fill'
    };
    
    const colorMap = {
        success: 'text-success',
        danger: 'text-danger',
        info: 'text-primary',
        warning: 'text-warning'
    };
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${iconMap[type]} me-2 ${colorMap[type]}"></i>
            <span class="text-dark">${message}</span>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Add notification animations CSS
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Export your existing functions
window.showAgeVerification = showAgeVerification;
window.verifyAge = verifyAge;
window.showSuccessMessage = function(message) { showNotification(message, 'success'); };
window.showErrorMessage = function(message) { showNotification(message, 'danger'); };
window.showInfoMessage = function(message) { showNotification(message, 'info'); };
window.showWarningMessage = function(message) { showNotification(message, 'warning'); };

// Your existing functions go here (keeping them to avoid duplication)
// ... [Include all your existing functions like checkExistingAgeVerification, etc.]

console.log(`
🎉 Welcome to MrCream - Enhanced Version!
🥛 Yoghurt Drinks | 💧 Water Park | 🥃 Premium Liqueur
Where Every Drop is a Splash of Joy!

🇳🇬 Proudly Nigerian | Built with ❤️
✨ Now with optimized background performance!
`);