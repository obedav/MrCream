/**
 * MrCream Main Application JavaScript
 * Common functionality shared across all pages
 */

// ============================================
// APPLICATION STATE
// ============================================

const App = {
    currentPage: '',
    ageVerified: false,
    verificationToken: null,
    isLoading: false,

    // Initialize app state from localStorage
    init() {
        this.currentPage = this.getCurrentPageName();
        this.loadAgeVerification();
        this.setupEventListeners();
        this.checkAPIHealth();
    },

    // Get current page name from URL
    getCurrentPageName() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '');
        return page || 'index';
    },

    // Load age verification from localStorage
    loadAgeVerification() {
        const stored = localStorage.getItem('mrCreamAgeVerified');
        if (stored) {
            const data = JSON.parse(stored);
            // Check if verification is still valid (24 hours)
            const verificationAge = Date.now() - data.timestamp;
            if (verificationAge < 24 * 60 * 60 * 1000) {
                this.ageVerified = true;
                this.verificationToken = data.token;
            } else {
                localStorage.removeItem('mrCreamAgeVerified');
            }
        }
    },

    // Save age verification to localStorage
    saveAgeVerification(token) {
        this.ageVerified = true;
        this.verificationToken = token;
        localStorage.setItem('mrCreamAgeVerified', JSON.stringify({
            token: token,
            timestamp: Date.now()
        }));
    },

    // Setup common event listeners
    setupEventListeners() {
        // Mobile menu toggle
        document.addEventListener('click', (e) => {
            if (e.target.matches('.mobile-menu-toggle')) {
                this.toggleMobileMenu();
            }
        });

        // Smooth scroll for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    },

    // Check if backend API is healthy
    async checkAPIHealth() {
        try {
            await window.MrCreamAPI.healthCheck();
            console.log('✓ API connection healthy');
        } catch (error) {
            console.warn('⚠ API connection failed:', error.message);
            console.warn('Using default product data. Start the backend API to enable live data.');
            // Don't show intrusive notification - just log it
        }
    }
};

// ============================================
// UI UTILITIES
// ============================================

/**
 * Show loading spinner
 */
function showLoading(container = null) {
    const target = container || document.querySelector('main');
    if (target) {
        target.classList.add('loading');
        // You can add a spinner element here if needed
    }
    App.isLoading = true;
}

/**
 * Hide loading spinner
 */
function hideLoading(container = null) {
    const target = container || document.querySelector('main');
    if (target) {
        target.classList.remove('loading');
    }
    App.isLoading = false;
}

/**
 * Show notification/toast message
 * @param {string} message - Message to display
 * @param {string} type - 'success', 'error', 'warning', 'info'
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add to DOM
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Auto remove after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * Show error message
 */
function showError(message) {
    showNotification(message, 'error', 5000);
}

/**
 * Show success message
 */
function showSuccess(message) {
    showNotification(message, 'success', 3000);
}

/**
 * Confirm dialog
 */
function confirm(message) {
    return window.confirm(message);
}

/**
 * Format currency
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

/**
 * Format date
 */
function formatDate(date, format = 'short') {
    const d = new Date(date);
    if (format === 'short') {
        return d.toLocaleDateString();
    } else if (format === 'long') {
        return d.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    return d.toISOString();
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// FORM UTILITIES
// ============================================

/**
 * Validate email
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate phone number
 */
function isValidPhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Get form data as object
 */
function getFormData(formElement) {
    const formData = new FormData(formElement);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
}

/**
 * Reset form with validation
 */
function resetForm(formElement) {
    formElement.reset();
    // Clear validation states
    const inputs = formElement.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });
}

// ============================================
// MOBILE MENU
// ============================================

function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');

    if (menu) {
        menu.classList.toggle('active');
        toggle?.classList.toggle('active');
    }
}

// ============================================
// SCROLL UTILITIES
// ============================================

// Add navbar scroll effect
window.addEventListener('scroll', throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}, 100));

// ============================================
// INITIALIZATION
// ============================================

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Send analytics when page loads
window.addEventListener('load', () => {
    window.MrCreamAPI?.sendAnalytics({
        page: App.currentPage,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
});

// Export App globally
window.MrCreamApp = App;
