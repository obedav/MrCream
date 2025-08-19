// API Service Functions
window.MrCreamAPI = {
    // Yoghurt API
    async getYoghurtFlavours() {
        try {
            const response = await fetch(`${window.MrCreamApp.apiBaseUrl}/yoghurt/flavours`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching yoghurt flavours:', error);
            throw error;
        }
    },

    async createYoghurtOrder(orderData) {
        try {
            const response = await fetch(`${window.MrCreamApp.apiBaseUrl}/yoghurt/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating yoghurt order:', error);
            throw error;
        }
    },

    // Water Park API
    async getWaterParkAttractions() {
        try {
            const response = await fetch(`${window.MrCreamApp.apiBaseUrl}/waterpark/attractions`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching water park attractions:', error);
            throw error;
        }
    },

    async getWaterParkTickets() {
        try {
            const response = await fetch(`${window.MrCreamApp.apiBaseUrl}/waterpark/tickets`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching water park tickets:', error);
            throw error;
        }
    },

    async bookWaterParkTickets(bookingData) {
        try {
            const response = await fetch(`${window.MrCreamApp.apiBaseUrl}/waterpark/book`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error booking water park tickets:', error);
            throw error;
        }
    },

    // Liqueur API (Age-gated)
    async getLiqueurProducts(verificationToken) {
        try {
            const response = await fetch(`${window.MrCreamApp.apiBaseUrl}/liqueur/products?verificationToken=${verificationToken}`);
            if (response.status === 401) {
                throw new Error('Age verification required');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching liqueur products:', error);
            throw error;
        }
    },

    async getCocktailRecipes(verificationToken) {
        try {
            const response = await fetch(`${window.MrCreamApp.apiBaseUrl}/liqueur/cocktails?verificationToken=${verificationToken}`);
            if (response.status === 401) {
                throw new Error('Age verification required');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching cocktail recipes:', error);
            throw error;
        }
    }
};

// Utility functions for notifications
window.showSuccessMessage = function(message) {
    showNotification(message, 'success');
};

window.showErrorMessage = function(message) {
    showNotification(message, 'danger');
};

window.showInfoMessage = function(message) {
    showNotification(message, 'info');
};

window.showWarningMessage = function(message) {
    showNotification(message, 'warning');
};

// Utility function to format Nigerian currency
window.formatNaira = function(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
    }).format(amount);
};

// Loading state management
window.showLoading = function(elementId, message = 'Loading...') {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-primary mb-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted">${message}</p>
            </div>
        `;
    }
};

window.hideLoading = function(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
    }
};

// Error handling for API calls
window.handleApiError = function(error) {
    console.error('API Error:', error);
    
    if (error.message.includes('Age verification required')) {
        showErrorMessage('Age verification required to access this content.');
        setTimeout(() => {
            showAgeVerification();
        }, 1000);
    } else if (error.message.includes('Network')) {
        showErrorMessage('Network error. Please check your connection and try again.');
    } else {
        showErrorMessage('An error occurred. Please try again later.');
    }
};// MrCream Main JavaScript Functions

// Global application state
window.MrCreamApp = {
    currentPage: 'home',
    ageVerified: false,
    verificationToken: null,
    apiBaseUrl: 'https://localhost:7001/api',
    swiperInstance: null
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
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('✅ MrCream Application Ready! 🍓🏊‍♂️🥃');
});

// Navbar functionality
function initializeNavbar() {
    const navbar = document.getElementById('mainNavbar');
    
    if (!navbar) return;
    
    // Handle navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Handle mobile menu
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }

    // Smooth scrolling for anchor links
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
}

// Hero Swiper initialization
function initializeHeroSwiper() {
    const swiperContainer = document.querySelector('.hero-swiper');
    if (!swiperContainer) return;

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
    
    // Pause autoplay on hover
    if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', () => {
            heroSwiper.autoplay.stop();
        });
        
        swiperContainer.addEventListener('mouseleave', () => {
            heroSwiper.autoplay.start();
        });
    }
    
    return heroSwiper;
}

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

// Trigger slide-specific animations
function triggerSlideAnimations(slideIndex) {
    // Animate statistics counters
    const activeSlide = document.querySelector(`.swiper-slide-active`);
    if (activeSlide) {
        const statNumbers = activeSlide.querySelectorAll('.stat-number');
        statNumbers.forEach(animateCounter);
    }
}

// Animate slide content
function animateSlideContent(slide, direction) {
    const elements = slide.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-stats, .hero-cta');
    
    elements.forEach((element, index) => {
        if (direction === 'enter') {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number
        const suffix = element.textContent.replace(/[\d]/g, '');
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Smooth scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
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
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp', 'fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .feature-icon, .location-info, .product-preview-card, .location-item');
    animateElements.forEach(el => observer.observe(el));
}

// Age verification system
function checkExistingAgeVerification() {
    const ageVerified = sessionStorage.getItem('ageVerified');
    const verificationToken = sessionStorage.getItem('verificationToken');
    const expiresAt = sessionStorage.getItem('verificationExpires');
    
    if (ageVerified === 'true' && verificationToken && expiresAt) {
        const expirationDate = new Date(expiresAt);
        const now = new Date();
        
        if (now < expirationDate) {
            // Still valid
            window.MrCreamApp.ageVerified = true;
            window.MrCreamApp.verificationToken = verificationToken;
            console.log('✅ Age verification still valid');
        } else {
            // Expired - clear storage
            sessionStorage.removeItem('ageVerified');
            sessionStorage.removeItem('verificationToken');
            sessionStorage.removeItem('verificationExpires');
            console.log('⏰ Age verification expired');
        }
    }
}

// Show age verification modal
function showAgeVerification() {
    // Check if user has already verified age
    if (window.MrCreamApp.ageVerified) {
        // User already verified, redirect to liqueur page
        window.location.href = 'liqueur.html';
        return;
    }
    
    // Create age verification modal if it doesn't exist
    if (!document.getElementById('ageVerificationModal')) {
        createAgeVerificationModal();
    }
    
    const modal = new bootstrap.Modal(document.getElementById('ageVerificationModal'));
    modal.show();
}

function createAgeVerificationModal() {
    const modalHTML = `
        <div class="modal fade" id="ageVerificationModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="bi bi-shield-check me-2"></i>
                            Age Verification Required
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-4">
                            <i class="bi bi-shield-exclamation text-warning" style="font-size: 3rem;"></i>
                            <h4 class="mt-3">You must be 18 years or older</h4>
                            <p class="text-muted">Please enter your date of birth to verify your age and access our premium liqueur content.</p>
                        </div>
                        <form id="ageVerificationForm">
                            <div class="mb-3">
                                <label for="dateOfBirth" class="form-label">Date of Birth</label>
                                <input type="date" class="form-control" id="dateOfBirth" required>
                            </div>
                            <div class="mb-3">
                                <label for="country" class="form-label">Country</label>
                                <select class="form-select" id="country">
                                    <option value="Nigeria" selected>Nigeria</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="termsAccept" required>
                                <label class="form-check-label" for="termsAccept">
                                    I confirm that I am of legal drinking age and agree to drink responsibly.
                                </label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-2"></i>Cancel
                        </button>
                        <button type="button" class="btn btn-primary" onclick="verifyAge()">
                            <i class="bi bi-check-circle me-2"></i>Verify Age
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Handle age verification
async function verifyAge() {
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const country = document.getElementById('country').value;
    const termsAccept = document.getElementById('termsAccept').checked;
    
    if (!dateOfBirth) {
        showErrorMessage('Please enter your date of birth.');
        return;
    }
    
    if (!termsAccept) {
        showErrorMessage('Please accept the terms to continue.');
        return;
    }
    
    // Calculate age
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    const verifyButton = document.querySelector('#ageVerificationModal .btn-primary');
    const originalText = verifyButton.innerHTML;
    
    try {
        // Show loading state
        verifyButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Verifying...';
        verifyButton.disabled = true;
        
        if (age >= 18) {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Generate verification token
            const verificationToken = 'mrcream_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
            
            // Store verification
            window.MrCreamApp.ageVerified = true;
            window.MrCreamApp.verificationToken = verificationToken;
            
            // Store in sessionStorage for this session
            sessionStorage.setItem('ageVerified', 'true');
            sessionStorage.setItem('verificationToken', verificationToken);
            sessionStorage.setItem('verificationExpires', expiresAt.toISOString());
            
            // Hide modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('ageVerificationModal'));
            modal.hide();
            
            showSuccessMessage(`Welcome! Age verified successfully. You are ${age} years old and can access our premium content.`);
            
            // Redirect to liqueur page after short delay
            setTimeout(() => {
                window.location.href = 'liqueur.html';
            }, 2000);
            
        } else {
            showErrorMessage('You must be 18 years or older to access this content. Please enjoy our other products!');
            
            // Close modal and redirect to main page
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('ageVerificationModal'));
                modal.hide();
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }, 2000);
        }
        
    } catch (error) {
        console.error('Age verification error:', error);
        showErrorMessage('Age verification failed. Please check your connection and try again.');
    } finally {
        // Reset button
        if (verifyButton) {
            verifyButton.innerHTML = originalText;
            verifyButton.disabled = false;
        }
    }
}

// Contact forms
function initializeContactForms() {
    const forms = document.querySelectorAll('form[data-form-type]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

// Handle form submission
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const formType = form.getAttribute('data-form-type');
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Show success message
        showNotification('Thank you! We will get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Close modal if form is in modal
        const modal = form.closest('.modal');
        if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
    }, 2000);
}

// Tooltips initialization
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed notification-toast`;
    notification.style.cssText = `
        top: 100px; 
        right: 20px; 
        z-index: 9999; 
        min-width: 350px; 
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        border-radius: 15px;
        border: none;
    `;
    
    const iconMap = {
        success: 'check-circle-fill',
        danger: 'exclamation-triangle-fill',
        info: 'info-circle-fill',
        warning: 'exclamation-triangle-fill'
    };
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${iconMap[type]} me-2"></i>
            <span>${message}</span>
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

// Console welcome message and export functions
console.log(`
🎉 Welcome to MrCream!
🥛 Yoghurt Drinks | 💧 Water Park | 🥃 Premium Liqueur
Where Every Drop is a Splash of Joy!

🇳🇬 Proudly Nigerian | Built with ❤️
`);

// Make functions globally available
window.showAgeVerification = showAgeVerification;
window.verifyAge = verifyAge;
window.MrCreamUtils = MrCreamUtils;

// Export additional functions to global scope
window.MrCreamApp.showAgeVerification = showAgeVerification;
window.MrCreamApp.verifyAge = verifyAge;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showAgeVerification,
        verifyAge,
        MrCreamUtils,
        MrCreamAPI: window.MrCreamAPI
    };
}

// Setup additional event listeners
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
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Update swiper on resize
            const swiper = window.MrCreamApp.swiperInstance;
            if (swiper) {
                swiper.update();
            }
        }, 250);
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        const swiper = window.MrCreamApp.swiperInstance;
        if (!swiper) return;
        
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
                    } else {
                        swiper.autoplay.start();
                    }
                }
                break;
        }
    });
    
    // Handle focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    // Skip to main content functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only sr-only-focusable';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        z-index: 10000;
        padding: 8px 16px;
        background: var(--mrcream-primary);
        color: white;
        text-decoration: none;
        border-radius: 0 0 6px 6px;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Product card click handlers
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
}

// Utility functions
const MrCreamUtils = {
    // Format currency
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(amount);
    },
    
    // Format phone number
    formatPhone: function(phone) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    },
    
    // Validate email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Get query parameter
    getQueryParam: function(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },
    
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Make functions globally available
window.showAgeVerification = showAgeVerification;
window.verifyAge = verifyAge;
window.MrCreamUtils = MrCreamUtils;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showAgeVerification,
        verifyAge,
        MrCreamUtils
    };
}