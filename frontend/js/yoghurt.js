// MrCream Yoghurt Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Sample product data
    const yoghurtProducts = [
        {
            id: 'strawberry-300ml',
            name: 'Strawberry Yoghurt Drink',
            flavor: 'Strawberry',
            size: '300ml',
            price: 300,
            description: 'Our classic strawberry yoghurt drink made with real cultured milk and natural strawberry flavors. Perfect for a quick refresh!',
            image: '🍓',
            badge: 'Popular',
            features: [
                'Real cultured milk',
                'Natural strawberry flavor',
                'Rich in probiotics',
                'No artificial preservatives',
                'Perfect for all ages'
            ],
            nutrition: {
                calories: 150,
                protein: '6g',
                calcium: '20%',
                sugar: '18g',
                fat: '3g'
            }
        },
        {
            id: 'strawberry-500ml',
            name: 'Strawberry Yoghurt Drink',
            flavor: 'Strawberry',
            size: '500ml',
            price: 350,
            description: 'Larger size of our beloved strawberry yoghurt drink. More goodness, more satisfaction!',
            image: '🍓',
            badge: 'Best Value',
            features: [
                'Real cultured milk',
                'Natural strawberry flavor',
                'Rich in probiotics',
                'No artificial preservatives',
                'Family size portion'
            ],
            nutrition: {
                calories: 250,
                protein: '10g',
                calcium: '35%',
                sugar: '30g',
                fat: '5g'
            }
        },
        {
            id: 'vanilla-300ml',
            name: 'Vanilla Yoghurt Drink',
            flavor: 'Vanilla',
            size: '300ml',
            price: 300,
            description: 'Smooth and aromatic vanilla yoghurt drink that delivers creamy satisfaction in every sip.',
            image: '🌟',
            badge: 'Premium',
            features: [
                'Real cultured milk',
                'Premium vanilla extract',
                'Rich in probiotics',
                'No artificial preservatives',
                'Sophisticated taste'
            ],
            nutrition: {
                calories: 145,
                protein: '6g',
                calcium: '20%',
                sugar: '16g',
                fat: '3g'
            }
        },
        {
            id: 'vanilla-500ml',
            name: 'Vanilla Yoghurt Drink',
            flavor: 'Vanilla',
            size: '500ml',
            price: 350,
            description: 'Larger serving of our premium vanilla yoghurt drink for those who want more of the good stuff.',
            image: '🌟',
            badge: 'Family Size',
            features: [
                'Real cultured milk',
                'Premium vanilla extract',
                'Rich in probiotics',
                'No artificial preservatives',
                'Perfect for sharing'
            ],
            nutrition: {
                calories: 240,
                protein: '10g',
                calcium: '35%',
                sugar: '26g',
                fat: '5g'
            }
        }
    ];

    // Sample store locations
    const storeLocations = [
        {
            id: 'head-office',
            name: 'MrCream Head Office',
            address: '18-26 Dauda Ayorinde Street, Adaloko, Afromedia',
            area: 'Off Badagry Expressway, Lagos',
            phone: '+234 803 235 4952',
            status: 'open',
            hours: 'Mon-Fri: 8am-6pm, Sat: 9am-4pm',
            icon: 'bi-building'
        },
        {
            id: 'shoprite-ikeja',
            name: 'Shoprite Ikeja',
            address: 'Ikeja City Mall',
            area: 'Obafemi Awolowo Way, Ikeja',
            phone: '+234 803 235 4952',
            status: 'open',
            hours: 'Daily: 8am-10pm',
            icon: 'bi-shop'
        },
        {
            id: 'spar-lekki',
            name: 'SPAR Lekki',
            address: 'Admiralty Way',
            area: 'Lekki Phase 1, Lagos',
            phone: '+234 803 235 4952',
            status: 'open',
            hours: 'Daily: 7am-11pm',
            icon: 'bi-shop'
        },
        {
            id: 'ebeano-victoria-island',
            name: 'Ebeano Supermarket',
            address: 'Akin Adesola Street',
            area: 'Victoria Island, Lagos',
            phone: '+234 803 235 4952',
            status: 'open',
            hours: 'Daily: 7am-10pm',
            icon: 'bi-shop'
        },
        {
            id: 'waterpark-location',
            name: 'MrCream Water Park',
            address: 'Check Point Busstop, Lasu Igando Road',
            area: 'Ijegun, Lagos',
            phone: '+234 803 235 4952',
            status: 'open',
            hours: 'Mon-Fri: 10am-6pm, Weekends: 9am-7pm',
            icon: 'bi-water'
        }
    ];

    // Load products
    loadProducts();
    
    // Load store locations
    loadStoreLocations();
    
    // Initialize event listeners
    initializeEventListeners();

    function loadProducts() {
        const container = document.getElementById('yoghurt-products');
        if (!container) return;

        // Clear loading state
        container.innerHTML = '';

        const row = document.createElement('div');
        row.className = 'row';

        yoghurtProducts.forEach(product => {
            const productCard = createProductCard(product);
            const col = document.createElement('div');
            col.className = 'col-lg-6 col-xl-6 mb-4';
            col.appendChild(productCard);
            row.appendChild(col);
        });

        container.appendChild(row);
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card-yoghurt';
        card.setAttribute('data-product-id', product.id);

        const featuresHTML = product.features.map(feature => 
            `<li><i class="bi bi-check-circle-fill"></i> ${feature}</li>`
        ).join('');

        card.innerHTML = `
            <div class="product-image">
                <div style="font-size: 5rem;">${product.image}</div>
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name} (${product.size})</h3>
                <p class="product-description">${product.description}</p>
                <ul class="product-features">
                    ${featuresHTML}
                </ul>
                <div class="product-price">
                    <span class="price-main">₦${product.price.toLocaleString()}</span>
                    <span class="price-size">${product.size}</span>
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart('${product.id}')">
                        <i class="bi bi-cart-plus me-2"></i>Add to Cart
                    </button>
                    <button class="btn-quick-view" onclick="showProductDetails('${product.id}')" title="Quick View">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    function loadStoreLocations() {
        const container = document.getElementById('store-locations');
        if (!container) return;

        // Clear loading state
        container.innerHTML = '';

        const row = document.createElement('div');
        row.className = 'row';

        storeLocations.forEach(store => {
            const storeCard = createStoreCard(store);
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 mb-4';
            col.appendChild(storeCard);
            row.appendChild(col);
        });

        container.appendChild(row);
    }

    function createStoreCard(store) {
        const card = document.createElement('div');
        card.className = 'store-card';

        card.innerHTML = `
            <div class="store-header">
                <i class="${store.icon} store-icon"></i>
                <h4 class="store-name">${store.name}</h4>
            </div>
            <div class="store-info">
                <p><i class="bi bi-geo-alt me-2"></i>${store.address}</p>
                <p><i class="bi bi-map me-2"></i>${store.area}</p>
                <p><i class="bi bi-telephone me-2"></i><a href="tel:${store.phone}">${store.phone}</a></p>
                <p><i class="bi bi-clock me-2"></i>${store.hours}</p>
                <span class="store-status ${store.status}">${store.status === 'open' ? 'Open' : 'Closed'}</span>
            </div>
        `;

        return card;
    }

    function initializeEventListeners() {
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Global functions for button interactions
    window.addToCart = function(productId) {
        const product = yoghurtProducts.find(p => p.id === productId);
        if (!product) return;

        // Show success notification
        showNotification(`${product.name} (${product.size}) added to cart!`, 'success');
        
        // Add to cart logic (could integrate with a cart system)
        let cart = JSON.parse(localStorage.getItem('mrCreamCart') || '[]');
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                size: product.size,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('mrCreamCart', JSON.stringify(cart));
        updateCartCount();
    };

    window.showProductDetails = function(productId) {
        const product = yoghurtProducts.find(p => p.id === productId);
        if (!product) return;

        const nutritionHTML = Object.entries(product.nutrition).map(([key, value]) => 
            `<tr><td>${key.charAt(0).toUpperCase() + key.slice(1)}</td><td class="nutrition-highlight">${value}</td></tr>`
        ).join('');

        const featuresHTML = product.features.map(feature => 
            `<li><i class="bi bi-check-circle-fill me-2"></i>${feature}</li>`
        ).join('');

        const modalHTML = `
            <div class="modal fade" id="productModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header nutrition-modal">
                            <h5 class="modal-title">
                                <span style="font-size: 1.5rem; margin-right: 0.5rem;">${product.image}</span>
                                ${product.name} (${product.size})
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6><i class="bi bi-star-fill me-2"></i>Product Features</h6>
                                    <ul class="list-unstyled">
                                        ${featuresHTML}
                                    </ul>
                                    <p class="mt-3">${product.description}</p>
                                    <div class="text-center">
                                        <button class="btn btn-primary btn-lg" onclick="addToCart('${product.id}')">
                                            <i class="bi bi-cart-plus me-2"></i>Add to Cart - ₦${product.price.toLocaleString()}
                                        </button>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <h6><i class="bi bi-clipboard-data me-2"></i>Nutrition Information</h6>
                                    <table class="nutrition-table">
                                        <thead>
                                            <tr>
                                                <th>Nutrient</th>
                                                <th>Per Serving</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${nutritionHTML}
                                        </tbody>
                                    </table>
                                    <small class="text-muted mt-2 d-block">
                                        <i class="bi bi-info-circle me-1"></i>
                                        Values are approximate and may vary between batches.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal
        const existingModal = document.getElementById('productModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();

        // Clean up modal after hiding
        document.getElementById('productModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    };

    window.showOrderModal = function() {
        const orderFormHTML = `
            <div class="order-form">
                <h4><i class="bi bi-cup-straw me-2"></i>Select Your Products</h4>
                <div class="row" id="orderProducts">
                    ${yoghurtProducts.map(product => `
                        <div class="col-md-6 mb-3">
                            <div class="order-product-card" data-product-id="${product.id}">
                                <div class="d-flex align-items-center">
                                    <span style="font-size: 2rem;">${product.image}</span>
                                    <div class="flex-grow-1 ms-3">
                                        <h6 class="mb-1">${product.name}</h6>
                                        <p class="mb-2 text-muted">${product.size} - ₦${product.price}</p>
                                        <div class="quantity-selector">
                                            <button type="button" class="qty-btn" onclick="updateQuantity('${product.id}', -1)">-</button>
                                            <input type="number" class="qty-input" value="0" min="0" max="20" id="qty-${product.id}">
                                            <button type="button" class="qty-btn" onclick="updateQuantity('${product.id}', 1)">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="order-summary">
                    <h5><i class="bi bi-receipt me-2"></i>Order Summary</h5>
                    <div id="orderSummaryContent">
                        <p class="text-muted text-center">Select products to see your order summary</p>
                    </div>
                </div>

                <div class="delivery-options">
                    <h5><i class="bi bi-truck me-2"></i>Delivery Options</h5>
                    <div class="delivery-option" onclick="selectDeliveryOption('pickup')">
                        <input type="radio" name="delivery" value="pickup" id="pickup">
                        <div>
                            <div class="delivery-title">Store Pickup</div>
                            <div class="delivery-description">Pick up from any of our store locations</div>
                            <div class="delivery-price">Free</div>
                        </div>
                    </div>
                    <div class="delivery-option" onclick="selectDeliveryOption('delivery')">
                        <input type="radio" name="delivery" value="delivery" id="delivery">
                        <div>
                            <div class="delivery-title">Home Delivery</div>
                            <div class="delivery-description">Delivered to your doorstep within Lagos</div>
                            <div class="delivery-price">₦1,000</div>
                        </div>
                    </div>
                </div>

                <div class="contact-form">
                    <h5><i class="bi bi-person me-2"></i>Contact Information</h5>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="customerName">Full Name *</label>
                            <input type="text" id="customerName" required>
                        </div>
                        <div class="form-group">
                            <label for="customerPhone">Phone Number *</label>
                            <input type="tel" id="customerPhone" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="customerEmail">Email Address</label>
                        <input type="email" id="customerEmail">
                    </div>
                    <div class="form-group" id="addressGroup" style="display: none;">
                        <label for="customerAddress">Delivery Address *</label>
                        <textarea id="customerAddress" rows="3" placeholder="Please provide your complete address including landmarks"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="orderNotes">Special Instructions (Optional)</label>
                        <textarea id="orderNotes" rows="2" placeholder="Any special requests or instructions for your order"></textarea>
                    </div>
                </div>

                <div class="text-center">
                    <button type="button" class="btn btn-primary btn-lg" onclick="submitOrder()">
                        <i class="bi bi-check-circle me-2"></i>Place Order
                    </button>
                </div>
            </div>
        `;

        document.getElementById('order-form-content').innerHTML = orderFormHTML;
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('orderModal'));
        modal.show();

        // Initialize quantity change listeners
        document.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', function() {
                updateOrderSummary();
            });
        });
    };

    window.updateQuantity = function(productId, change) {
        const qtyInput = document.getElementById(`qty-${productId}`);
        if (!qtyInput) return;

        let currentQty = parseInt(qtyInput.value) || 0;
        let newQty = Math.max(0, Math.min(20, currentQty + change));
        
        qtyInput.value = newQty;
        updateOrderSummary();
    };

    window.selectDeliveryOption = function(option) {
        // Update radio button
        document.querySelectorAll('input[name="delivery"]').forEach(radio => {
            radio.checked = radio.value === option;
        });

        // Update visual selection
        document.querySelectorAll('.delivery-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        document.querySelector(`input[value="${option}"]`).closest('.delivery-option').classList.add('selected');

        // Show/hide address field
        const addressGroup = document.getElementById('addressGroup');
        if (option === 'delivery') {
            addressGroup.style.display = 'block';
            document.getElementById('customerAddress').required = true;
        } else {
            addressGroup.style.display = 'none';
            document.getElementById('customerAddress').required = false;
        }

        updateOrderSummary();
    };

    function updateOrderSummary() {
        const summaryContent = document.getElementById('orderSummaryContent');
        if (!summaryContent) return;

        let total = 0;
        let itemCount = 0;
        let summaryHTML = '';

        yoghurtProducts.forEach(product => {
            const qtyInput = document.getElementById(`qty-${product.id}`);
            if (!qtyInput) return;

            const qty = parseInt(qtyInput.value) || 0;
            if (qty > 0) {
                const itemTotal = product.price * qty;
                total += itemTotal;
                itemCount += qty;
                summaryHTML += `
                    <div class="summary-row">
                        <span>${product.name} (${product.size}) x ${qty}</span>
                        <span>₦${itemTotal.toLocaleString()}</span>
                    </div>
                `;
            }
        });

        // Add delivery cost
        const deliveryOption = document.querySelector('input[name="delivery"]:checked');
        const deliveryCost = deliveryOption && deliveryOption.value === 'delivery' ? 1000 : 0;
        
        if (deliveryCost > 0) {
            summaryHTML += `
                <div class="summary-row">
                    <span>Delivery</span>
                    <span>₦${deliveryCost.toLocaleString()}</span>
                </div>
            `;
            total += deliveryCost;
        }

        if (itemCount === 0) {
            summaryContent.innerHTML = '<p class="text-muted text-center">Select products to see your order summary</p>';
        } else {
            summaryHTML += `
                <div class="summary-row total">
                    <span>Total</span>
                    <span>₦${total.toLocaleString()}</span>
                </div>
            `;
            summaryContent.innerHTML = summaryHTML;
        }
    }

    window.submitOrder = function() {
        // Validate form
        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const deliveryOption = document.querySelector('input[name="delivery"]:checked');
        
        if (!name || !phone || !deliveryOption) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Check if any products selected
        let hasProducts = false;
        yoghurtProducts.forEach(product => {
            const qtyInput = document.getElementById(`qty-${product.id}`);
            if (qtyInput && parseInt(qtyInput.value) > 0) {
                hasProducts = true;
            }
        });

        if (!hasProducts) {
            showNotification('Please select at least one product', 'error');
            return;
        }

        // If delivery selected, check address
        if (deliveryOption.value === 'delivery') {
            const address = document.getElementById('customerAddress').value.trim();
            if (!address) {
                showNotification('Please provide delivery address', 'error');
                return;
            }
        }

        // Generate order number
        const orderNumber = 'MC' + Date.now().toString().slice(-8);

        // Show success message
        const successHTML = `
            <div class="order-success">
                <div class="success-icon">
                    <i class="bi bi-check-circle-fill"></i>
                </div>
                <h3>Order Placed Successfully!</h3>
                <div class="order-number">Order #${orderNumber}</div>
                <p>Thank you for choosing MrCream! We'll contact you shortly to confirm your order.</p>
                <p class="text-muted">
                    <i class="bi bi-telephone me-2"></i>
                    Questions? Call us at <a href="tel:+2348032354952">+234 803 235 4952</a>
                </p>
            </div>
        `;

        document.getElementById('order-form-content').innerHTML = successHTML;

        // Send notification
        showNotification('Order placed successfully! We\'ll contact you shortly.', 'success');

        // Here you would normally send the order data to your backend
        console.log('Order data:', {
            orderNumber,
            customer: {
                name,
                phone,
                email: document.getElementById('customerEmail').value,
                address: document.getElementById('customerAddress').value
            },
            delivery: deliveryOption.value,
            notes: document.getElementById('orderNotes').value,
            items: getOrderItems(),
            timestamp: new Date().toISOString()
        });
    };

    function getOrderItems() {
        const items = [];
        yoghurtProducts.forEach(product => {
            const qtyInput = document.getElementById(`qty-${product.id}`);
            if (qtyInput) {
                const qty = parseInt(qtyInput.value) || 0;
                if (qty > 0) {
                    items.push({
                        id: product.id,
                        name: product.name,
                        size: product.size,
                        price: product.price,
                        quantity: qty,
                        total: product.price * qty
                    });
                }
            }
        });
        return items;
    }

    window.findNearestStore = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    showNotification('Finding stores near you...', 'info');
                    // Simulate finding nearest store
                    setTimeout(() => {
                        document.querySelector('#store-locations').scrollIntoView({ behavior: 'smooth' });
                        showNotification('Showing nearby stores below!', 'success');
                    }, 1000);
                },
                error => {
                    document.querySelector('#store-locations').scrollIntoView({ behavior: 'smooth' });
                    showNotification('Please check our store locations below', 'info');
                }
            );
        } else {
            document.querySelector('#store-locations').scrollIntoView({ behavior: 'smooth' });
            showNotification('Please check our store locations below', 'info');
        }
    };

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.custom-notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `custom-notification alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show`;
        
        const icon = type === 'success' ? 'check-circle-fill' : 
                    type === 'error' ? 'exclamation-triangle-fill' : 
                    'info-circle-fill';
        
        notification.innerHTML = `
            <i class="bi bi-${icon} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 150);
            }
        }, 5000);
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('mrCreamCart') || '[]');
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Update cart count in navbar if exists
        const cartBadge = document.querySelector('.cart-count');
        if (cartBadge) {
            cartBadge.textContent = count;
            cartBadge.style.display = count > 0 ? 'inline' : 'none';
        }
    }

    // Initialize cart count on page load
    updateCartCount();

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.yoghurt-hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.product-card-yoghurt, .benefit-card, .method-item, .store-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add loading states for better UX
    function showLoading(element) {
        element.innerHTML = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary mb-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted">Loading...</p>
            </div>
        `;
    }

    // Performance optimization - lazy load images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    lazyLoadImages();

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const modal = bootstrap.Modal.getInstance(openModal);
                if (modal) modal.hide();
            }
        }
    });

    // Add print styles support
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });

    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });

    console.log('🍓 MrCream Yoghurt Page Loaded Successfully!');
});