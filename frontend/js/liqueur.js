// Turbo Cream Liqueur - JavaScript Functionality

// Age Verification State
const AGE_VERIFIED_KEY = 'turbo_age_verified';
const AGE_VERIFICATION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    initializeAgeGate();
    initializeNavigation();
    initializeAnimations();
    initializeProductCards();
    initializeForms();
    initializeModals();
    initializeBackToTop();
    initializeScrollEffects();
    initializeLuxuryEffects();
});

// Age Gate Functionality
function initializeAgeGate() {
    const ageGate = document.getElementById('ageGate');
    if (!ageGate) return;
    
    // Check if user has already verified age
    const ageVerified = localStorage.getItem(AGE_VERIFIED_KEY);
    const verificationTime = localStorage.getItem(AGE_VERIFIED_KEY + '_time');
    
    if (ageVerified === 'true' && verificationTime) {
        const timeDiff = Date.now() - parseInt(verificationTime);
        if (timeDiff < AGE_VERIFICATION_DURATION) {
            hideAgeGate();
            return;
        }
    }
    
    // Show age gate
    ageGate.style.display = 'flex';
}

function confirmAge() {
    // Store age verification
    localStorage.setItem(AGE_VERIFIED_KEY, 'true');
    localStorage.setItem(AGE_VERIFIED_KEY + '_time', Date.now().toString());
    
    // Hide age gate with animation
    hideAgeGate();
    
    // Show welcome message
    showNotification('Welcome to Turbo Cream Liqueur - Where African Heritage Meets Luxury', 'success');
}

function denyAge() {
    // Redirect to main MrCream site
    showNotification('You must be 18+ to access this content. Redirecting to MrCream homepage...', 'warning');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function hideAgeGate() {
    const ageGate = document.getElementById('ageGate');
    if (ageGate) {
        ageGate.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            ageGate.classList.add('hidden');
            ageGate.style.display = 'none';
        }, 500);
    }
}

// Navigation Scroll Effects
function initializeNavigation() {
    const navbar = document.querySelector('.liqueur-nav');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add specific animations based on element
                if (entry.target.classList.contains('product-card')) {
                    entry.target.style.animation = 'slideUp 0.8s ease forwards';
                } else if (entry.target.classList.contains('heritage-card')) {
                    entry.target.style.animation = 'fadeIn 1s ease forwards';
                } else if (entry.target.classList.contains('testimonial-card')) {
                    entry.target.style.animation = 'slideInRight 0.8s ease forwards';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.product-card, .heritage-card, .testimonial-card, .enjoy-card, .stat-box'
    );
    animatedElements.forEach(el => observer.observe(el));
}

// Product Cards Interactions
function initializeProductCards() {
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const bottle = card.querySelector('.bottle');
        
        card.addEventListener('mouseenter', () => {
            if (bottle) {
                bottle.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (bottle) {
                bottle.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Scroll to Products
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Show Purchase Modal
function showPurchaseModal(productName) {
    const modal = new bootstrap.Modal(document.getElementById('purchaseModal'));
    const modalBody = document.querySelector('#purchaseModal .modal-body');
    
    // Create purchase form
    modalBody.innerHTML = `
        <div class="purchase-form-container">
            <div class="product-summary mb-4">
                <h5 class="text-gold">${productName}</h5>
                <p class="text-muted">Premium African Cream Liqueur</p>
            </div>
            
            <form id="purchaseForm">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="purchaseName" class="form-label">Full Name *</label>
                        <input type="text" class="form-control" id="purchaseName" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="purchaseEmail" class="form-label">Email Address *</label>
                        <input type="email" class="form-control" id="purchaseEmail" required>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="purchasePhone" class="form-label">Phone Number *</label>
                        <input type="tel" class="form-control" id="purchasePhone" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="purchaseQuantity" class="form-label">Quantity *</label>
                        <select class="form-select" id="purchaseQuantity" required>
                            <option value="1">1 Bottle</option>
                            <option value="2">2 Bottles</option>
                            <option value="3">3 Bottles</option>
                            <option value="6">6 Bottles (Case)</option>
                            <option value="12">12 Bottles (2 Cases)</option>
                        </select>
                    </div>
                </div>
                
                <div class="mb-3">
                    <label for="deliveryAddress" class="form-label">Delivery Address *</label>
                    <textarea class="form-control" id="deliveryAddress" rows="3" required></textarea>
                </div>
                
                <div class="mb-3">
                    <label for="deliveryNotes" class="form-label">Delivery Notes (Optional)</label>
                    <textarea class="form-control" id="deliveryNotes" rows="2" 
                              placeholder="Special instructions for delivery..."></textarea>
                </div>
                
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="ageConfirm" required>
                    <label class="form-check-label" for="ageConfirm">
                        I confirm I am 18 years or older and agree to responsible consumption
                    </label>
                </div>
                
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="termsAgree" required>
                    <label class="form-check-label" for="termsAgree">
                        I agree to the terms and conditions
                    </label>
                </div>
                
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    Payment will be collected on delivery. Valid ID required.
                </div>
                
                <button type="submit" class="btn btn-luxury-primary w-100">
                    <i class="bi bi-check-circle me-2"></i>
                    Confirm Order
                </button>
            </form>
        </div>
    `;
    
    // Add form submission handler
    const form = document.getElementById('purchaseForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        processPurchase(productName);
    });
    
    modal.show();
}

// Process Purchase
function processPurchase(productName) {
    // Show loading state
    const submitBtn = document.querySelector('#purchaseForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
    
    // Simulate API call
    setTimeout(() => {
        // Generate order reference
        const orderRef = 'TRB' + Date.now().toString().slice(-8);
        
        // Hide modal
        bootstrap.Modal.getInstance(document.getElementById('purchaseModal')).hide();
        
        // Show success message
        showNotification(
            `Order confirmed! Reference: ${orderRef}. We'll contact you within 24 hours for delivery arrangement.`,
            'success'
        );
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 2000);
}

// Show Cocktail Recipes Modal
function showCocktailRecipes() {
    const modal = new bootstrap.Modal(document.getElementById('cocktailModal'));
    const modalBody = document.querySelector('#cocktailModal .modal-body');
    
    // Cocktail recipes data
    const recipes = [
        {
            name: 'Turbo Espresso Martini',
            image: 'images/turbo-martini.jpg',
            ingredients: ['60ml Turbo Cream Liqueur', '30ml Vodka', '30ml Fresh Espresso', 'Coffee beans'],
            method: 'Shake all ingredients with ice. Double strain into martini glass. Garnish with coffee beans.'
        },
        {
            name: 'African Sunset',
            image: 'images/african-sunset.jpg',
            ingredients: ['50ml Turbo Gold', '20ml Amarula', '10ml Honey', 'Orange peel'],
            method: 'Stir with ice. Strain over large ice cube. Express orange oils over drink.'
        },
        {
            name: 'Baobab White Russian',
            image: 'images/baobab-russian.jpg',
            ingredients: ['40ml Turbo Original', '30ml Vodka', '20ml Coffee Liqueur', 'Cream float'],
            method: 'Build over ice. Float cream on top. Dust with cocoa powder.'
        },
        {
            name: 'Lagos Cream Fizz',
            image: 'images/lagos-fizz.jpg',
            ingredients: ['50ml Turbo Cream', '20ml Gin', 'Champagne top', 'Lemon twist'],
            method: 'Shake Turbo and gin with ice. Strain into flute. Top with champagne.'
        }
    ];
    
    // Create recipes grid
    let recipesHTML = '<div class="row">';
    recipes.forEach(recipe => {
        recipesHTML += `
            <div class="col-md-6 mb-4">
                <div class="cocktail-recipe-item">
                    <div class="recipe-image mb-3">
                        <img src="${recipe.image}" alt="${recipe.name}" class="img-fluid rounded">
                    </div>
                    <h5 class="recipe-name">${recipe.name}</h5>
                    <div class="recipe-details">
                        <h6>Ingredients:</h6>
                        <ul class="ingredients-list">
                            ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                        </ul>
                        <h6>Method:</h6>
                        <p class="recipe-method">${recipe.method}</p>
                    </div>
                </div>
            </div>
        `;
    });
    recipesHTML += '</div>';
    
    modalBody.innerHTML = recipesHTML;
    modal.show();
}

// Show Notify Modal
function showNotifyModal() {
    const modal = new bootstrap.Modal(document.getElementById('notifyModal'));
    
    // Add form submission handler
    const form = document.getElementById('notifyForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        processNotification();
    });
    
    modal.show();
}

// Process Notification Signup
function processNotification() {
    const email = document.getElementById('notifyEmail').value;
    const phone = document.getElementById('notifyPhone').value;
    
    // Show loading
    const submitBtn = document.querySelector('#notifyForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Subscribing...';
    
    // Simulate API call
    setTimeout(() => {
        // Hide modal
        bootstrap.Modal.getInstance(document.getElementById('notifyModal')).hide();
        
        // Show success message
        showNotification(
            'Thank you! You\'ll be the first to know when our Limited Edition launches.',
            'success'
        );
        
        // Reset form
        document.getElementById('notifyForm').reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 1500);
}

// Show Store Locator
function showStoreLocator() {
    showNotification('Store locator opening... Finding stores near you.', 'info');
    
    // In production, this would open a map or store locator interface
    setTimeout(() => {
        const stores = [
            'Premium Wine & Spirits - Victoria Island',
            'Shoprite Liquor - Lekki',
            'The Wine Shop - Ikoyi'
        ];
        
        let message = 'Nearest stores:\n';
        stores.forEach(store => {
            message += `• ${store}\n`;
        });
        
        alert(message);
    }, 1000);
}

// Show Online Order
function showOnlineOrder() {
    showNotification('Redirecting to online store...', 'info');
    
    // In production, this would redirect to e-commerce platform
    setTimeout(() => {
        showPurchaseModal('Turbo Cream Liqueur');
    }, 1000);
}

// Form Handlers
function initializeForms() {
    // Movement/Newsletter Form
    const movementForm = document.getElementById('movementForm');
    if (movementForm) {
        movementForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleNewsletterSignup(movementForm);
        });
    }
}

// Newsletter Signup Handler
function handleNewsletterSignup(form) {
    const email = form.querySelector('input[type="email"]').value;
    
    // Show loading
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Joining...';
    
    // Simulate API call
    setTimeout(() => {
        showNotification(
            'Welcome to the Turbo Movement! Check your email for exclusive offers.',
            'success'
        );
        
        // Reset form
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
    }, 1500);
}

// Initialize Modals
function initializeModals() {
    // Ensure all modals have proper styling
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', () => {
            // Add luxury class to modal
            modal.classList.add('luxury-modal');
        });
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.liqueur-hero');
    const heroOverlay = document.querySelector('.hero-overlay');
    const bottleShowcase = document.querySelector('.bottle-showcase');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        if (heroOverlay) {
            heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (bottleShowcase) {
            bottleShowcase.style.transform = `translateY(${scrolled * -0.3}px)`;
        }
    });
}

// Luxury Effects
function initializeLuxuryEffects() {
    // Gold sparkle effect on hover
    const goldElements = document.querySelectorAll('.btn-luxury-primary, .product-badge, .heritage-badge');
    
    goldElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            createSparkle(e);
        });
    });
    
    // Floating animation for ingredients
    const floatingElements = document.querySelectorAll('.floating-ingredient');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Create Sparkle Effect
function createSparkle(e) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
        border-radius: 50%;
        pointer-events: none;
        animation: sparkleAnimation 1s ease-out forwards;
        z-index: 1000;
    `;
    
    // Position sparkle at cursor
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    
    document.body.appendChild(sparkle);
    
    // Remove after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `luxury-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi ${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        min-width: 300px;
        padding: 15px 20px;
        background: ${getNotificationBackground(type)};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.5s ease;
        display: flex;
        align-items: center;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Get Notification Icon
function getNotificationIcon(type) {
    const icons = {
        success: 'bi-check-circle-fill',
        error: 'bi-x-circle-fill',
        warning: 'bi-exclamation-triangle-fill',
        info: 'bi-info-circle-fill'
    };
    return icons[type] || icons.info;
}

// Get Notification Background
function getNotificationBackground(type) {
    const backgrounds = {
        success: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
        error: 'linear-gradient(135deg, #F44336 0%, #da190b 100%)',
        warning: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
        info: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)'
    };
    return backgrounds[type] || backgrounds.info;
}

// Add Custom Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnimation {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(random(-50, 50)px, random(-50, 50)px) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(random(-100, 100)px, random(-100, 100)px) scale(0);
            opacity: 0;
        }
    }
    
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
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .luxury-modal .modal-content {
        background: linear-gradient(180deg, #1A1A1A 0%, #3E2723 100%);
        border: 2px solid #D4AF37;
        color: #FFF;
    }
    
    .luxury-modal .modal-header {
        border-bottom: 1px solid #D4AF37;
    }
    
    .luxury-modal .modal-title {
        color: #D4AF37;
        font-family: 'Playfair Display', serif;
    }
    
    .luxury-modal .btn-close {
        filter: invert(1);
    }
    
    .luxury-modal .form-control,
    .luxury-modal .form-select {
        background: rgba(212, 175, 55, 0.1);
        border: 1px solid #D4AF37;
        color: #FFF;
    }
    
    .luxury-modal .form-control:focus,
    .luxury-modal .form-select:focus {
        background: rgba(212, 175, 55, 0.2);
        border-color: #FFD700;
        box-shadow: 0 0 0 0.25rem rgba(212, 175, 55, 0.25);
        color: #FFF;
    }
    
    .luxury-modal .form-label {
        color: #F4E4BC;
    }
    
    .luxury-modal .form-check-input:checked {
        background-color: #D4AF37;
        border-color: #D4AF37;
    }
    
    .text-gold {
        color: #D4AF37;
    }
    
    .cocktail-recipe-item {
        background: rgba(212, 175, 55, 0.05);
        border: 1px solid #D4AF37;
        border-radius: 15px;
        padding: 1.5rem;
    }
    
    .recipe-name {
        color: #D4AF37;
        font-family: 'Playfair Display', serif;
        margin-bottom: 1rem;
    }
    
    .recipe-details h6 {
        color: #F4E4BC;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
    
    .ingredients-list {
        list-style: none;
        padding-left: 0;
        color: #9E9E9E;
    }
    
    .ingredients-list li:before {
        content: "• ";
        color: #D4AF37;
        font-weight: bold;
        margin-right: 0.5rem;
    }
    
    .recipe-method {
        color: #9E9E9E;
        font-style: italic;
    }
`;
document.head.appendChild(style);

// Initialize everything when page loads
window.addEventListener('load', () => {
    // Add loading complete class to body
    document.body.classList.add('loaded');
    
    // Initialize luxury cursor effect (optional)
    document.addEventListener('mousemove', (e) => {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-glow';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9998;
            transition: all 0.1s ease;
        `;
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        document.body.appendChild(cursor);
        
        setTimeout(() => {
            cursor.remove();
        }, 100);
    });
});

// Export functions for global use
window.confirmAge = confirmAge;
window.denyAge = denyAge;
window.scrollToProducts = scrollToProducts;
window.showPurchaseModal = showPurchaseModal;
window.showCocktailRecipes = showCocktailRecipes;
window.showNotifyModal = showNotifyModal;
window.showStoreLocator = showStoreLocator;
window.showOnlineOrder = showOnlineOrder;

console.log('🥃 Turbo Cream Liqueur - Luxury Experience Loaded');