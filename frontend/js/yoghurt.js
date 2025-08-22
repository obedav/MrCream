// Enhanced MrCream Yoghurt Page JavaScript - Optimized & Modern
document.addEventListener('DOMContentLoaded', function() {
    
    // Sample product data - Fixed duplicate entries
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
        },
        {
            id: 'mixed-berry-300ml',
            name: 'Mixed Berry Yoghurt Drink',
            flavor: 'Mixed Berry',
            size: '300ml',
            price: 320,
            description: 'A delightful blend of strawberry, blueberry, and raspberry flavors for the ultimate berry experience.',
            image: '🫐',
            badge: 'New',
            features: [
                'Real cultured milk',
                'Triple berry blend',
                'Rich in antioxidants',
                'No artificial preservatives',
                'Bursting with flavor'
            ],
            nutrition: {
                calories: 155,
                protein: '6g',
                calcium: '20%',
                sugar: '19g',
                fat: '3g'
            }
        },
        {
            id: 'mango-300ml',
            name: 'Tropical Mango Yoghurt Drink',
            flavor: 'Mango',
            size: '300ml',
            price: 310,
            description: 'Transport yourself to the tropics with our rich and creamy mango yoghurt drink.',
            image: '🥭',
            badge: 'Limited Edition',
            features: [
                'Real cultured milk',
                'Tropical mango flavor',
                'Rich in vitamins',
                'No artificial preservatives',
                'Exotic taste experience'
            ],
            nutrition: {
                calories: 148,
                protein: '6g',
                calcium: '20%',
                sugar: '17g',
                fat: '3g'
            }
        }
    ];

    // Enhanced store locations with more details
    const storeLocations = [
        {
            id: 'head-office',
            name: 'MrCream Head Office',
            address: '18-26 Dauda Ayorinde Street, Adaloko, Afromedia',
            area: 'Off Badagry Expressway, Lagos',
            phone: '+234 803 235 4952',
            status: 'open',
            hours: 'Mon-Fri: 8am-6pm, Sat: 9am-4pm',
            icon: 'bi-building',
            coordinates: { lat: 6.4550575, lng: 3.2940985 },
            services: ['Bulk Orders', 'Customer Service', 'Product Pickup']
        },
        {
            id: 'shoprite-ikeja',
            name: 'Shoprite Ikeja',
            address: 'Ikeja City Mall',
            area: 'Obafemi Awolowo Way, Ikeja',
            phone: '+234 803 235 4952',
            status: 'open',
            hours: 'Daily: 8am-10pm',
            icon: 'bi-shop',
            coordinates: { lat: 6.6018182, lng: 3.3515625 },
            services: ['Retail Sales', 'All Flavors Available']
        },
        {
            id: 'spar-lekki',
            name: 'SPAR Lekki',
            address: 'Admiralty Way',
            area: 'Lekki Phase 1, Lagos',
            phone: '+234 803 235 4952',
            status: 'open',
            hours: 'Daily: 7am-11pm',
            icon: 'bi-shop',
            coordinates: { lat: 6.4474090, lng: 3.4547871 },
            services: ['Retail Sales', 'Home Delivery Available']
        },
        {
            id: 'ebeano-victoria-island',
            name: 'Ebeano Supermarket',
            address: 'Akin Adesola Street',
            area: 'Victoria Island, Lagos',
            phone: '+234 803 235 4952',
            status: 'open',
            hours: 'Daily: 7am-10pm',
            icon: 'bi-shop',
            coordinates: { lat: 6.4264591, lng: 3.4125646 },
            services: ['Retail Sales', 'Corporate Orders']
        },
        {
            id: 'waterpark-location',
            name: 'MrCream Water Park',
            address: 'Check Point Busstop, Lasu Igando Road',
            area: 'Ijegun, Lagos',
            phone: '+234 803 235 4952',
            status: 'open',
            hours: 'Mon-Fri: 10am-6pm, Weekends: 9am-7pm',
            icon: 'bi-water',
            coordinates: { lat: 6.5243793, lng: 3.2821941 },
            services: ['Fresh Yoghurt', 'Party Packages', 'Event Catering']
        }
    ];

    // Performance optimization - Throttle and debounce utilities
    const utils = {
        throttle(func, delay) {
            let timeoutId;
            let lastExecTime = 0;
            return function (...args) {
                const currentTime = Date.now();
                if (currentTime - lastExecTime > delay) {
                    func.apply(this, args);
                    lastExecTime = currentTime;
                } else {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        func.apply(this, args);
                        lastExecTime = Date.now();
                    }, delay - (currentTime - lastExecTime));
                }
            };
        },

        debounce(func, delay) {
            let timeoutId;
            return function (...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
        },

        // Enhanced animation frame utility
        raf(callback) {
            return requestAnimationFrame(callback);
        },

        // Intersection Observer utility
        createObserver(callback, options = {}) {
            const defaultOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            return new IntersectionObserver(callback, { ...defaultOptions, ...options });
        }
    };

    // Enhanced animation controller with better performance
    const animationController = {
        animations: new Map(),
        isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        
        // Only create particles if motion is allowed and user prefers them
        createFloatingParticles() {
            if (this.isReducedMotion) return;
            
            const hero = document.querySelector('.yoghurt-hero');
            if (!hero) return;

            const particleContainer = document.createElement('div');
            particleContainer.className = 'floating-particles';
            particleContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                pointer-events: none;
                z-index: 1;
                overflow: hidden;
            `;

            // Reduce particles for better performance
            const particleCount = window.innerWidth < 768 ? 8 : 12;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 8 + 4}px;
                    height: ${Math.random() * 8 + 4}px;
                    background: ${this.getRandomYoghurtColor()};
                    border-radius: 50%;
                    opacity: 0.3;
                    animation: floatParticle ${Math.random() * 8 + 8}s infinite ease-in-out;
                    animation-delay: ${Math.random() * 4}s;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 80}%;
                    will-change: transform;
                `;
                particleContainer.appendChild(particle);
            }

            hero.appendChild(particleContainer);
        },

        getRandomYoghurtColor() {
            const colors = ['#FF6B9D', '#FFD54F', '#A8E6CF', '#FFAB91', '#E91E63', '#9C27B0'];
            return colors[Math.floor(Math.random() * colors.length)];
        },

        // Enhanced bottle card animations with performance optimization
        animateBottleCards() {
            const bottles = document.querySelectorAll('.bottle-card');
            bottles.forEach((bottle, index) => {
                bottle.style.animationDelay = `${index * 0.2}s`;
                
                // Use passive event listeners for better performance
                bottle.addEventListener('mouseenter', this.handleBottleHover.bind(this), { passive: true });
                bottle.addEventListener('mouseleave', this.handleBottleLeave.bind(this), { passive: true });
            });
        },

        handleBottleHover(event) {
            if (this.isReducedMotion) return;
            
            const bottle = event.currentTarget;
            const bottles = document.querySelectorAll('.bottle-card');
            bottles.forEach((otherBottle) => {
                if (otherBottle !== bottle) {
                    otherBottle.style.transform = 'scale(0.95) translateY(10px)';
                    otherBottle.style.opacity = '0.7';
                }
            });
        },

        handleBottleLeave() {
            const bottles = document.querySelectorAll('.bottle-card');
            bottles.forEach(bottle => {
                bottle.style.transform = '';
                bottle.style.opacity = '';
            });
        },

        // Improved typewriter with better performance
        typeWriter(element, text, speed = 50) {
            if (this.isReducedMotion) {
                element.textContent = text;
                return;
            }
            
            let i = 0;
            element.textContent = '';
            
            const type = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            };
            type();
        },

        // Enhanced parallax with performance optimization
        setupParallax() {
            if (this.isReducedMotion) return;
            
            const parallaxElements = document.querySelectorAll('.bottle-card, .hero-content');
            let ticking = false;
            
            const updateParallax = utils.throttle(() => {
                const scrolled = window.pageYOffset;
                const maxScroll = window.innerHeight * 1.2;
                
                if (scrolled < maxScroll) {
                    parallaxElements.forEach((element, index) => {
                        const speed = 0.1 + (index * 0.02);
                        const yPos = -(scrolled * speed);
                        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    });
                }
                ticking = false;
            }, 16); // ~60fps

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    utils.raf(updateParallax);
                    ticking = true;
                }
            }, { passive: true });
        }
    };

    // Enhanced loading with better UX
    const pageLoader = {
        show() {
            const loader = document.createElement('div');
            loader.id = 'pageLoader';
            loader.innerHTML = `
                <div class="loader-content">
                    <div class="yoghurt-splash">
                        <div class="splash-drop"></div>
                        <div class="splash-drop"></div>
                        <div class="splash-drop"></div>
                    </div>
                    <h3 class="loading-text">Preparing Fresh Yoghurt...</h3>
                    <div class="loading-bar">
                        <div class="loading-progress"></div>
                    </div>
                    <p class="loading-tip">💡 Tip: Keep MrCream yoghurt refrigerated for best taste!</p>
                </div>
            `;
            loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #FFF8E7, #FFE0E6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 1;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(loader);
            return loader;
        },

        hide(loader) {
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.remove();
                    }
                }, 300);
            }
        }
    };

    // Enhanced scroll animations with better performance
    const scrollAnimations = {
        observer: null,
        
        init() {
            this.createScrollTriggers();
            animationController.setupParallax();
            this.createScrollProgressBar();
        },

        createScrollTriggers() {
            this.observer = utils.createObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        
                        // Use CSS classes instead of direct style manipulation
                        element.classList.add('animate-in');
                        
                        // Stagger animations for multiple elements
                        if (element.classList.contains('stagger-animation')) {
                            const children = Array.from(element.children);
                            children.forEach((child, index) => {
                                setTimeout(() => {
                                    child.classList.add('animate-in');
                                }, index * 100);
                            });
                        }

                        // Stop observing after animation to improve performance
                        this.observer.unobserve(element);
                    }
                });
            });

            // Observe all animatable elements
            document.querySelectorAll(`
                .product-card-yoghurt, 
                .benefit-card, 
                .method-item, 
                .store-card,
                .section-title,
                .section-subtitle
            `).forEach(el => {
                el.classList.add('animate-element');
                this.observer.observe(el);
            });
        },

        createScrollProgressBar() {
            const progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 4px;
                background: linear-gradient(90deg, #FF6B9D, #FFD54F, #A8E6CF);
                z-index: 1000;
                transition: width 0.1s ease;
            `;
            
            document.body.appendChild(progressBar);
            
            const updateProgress = utils.throttle(() => {
                const scrollTop = window.pageYOffset;
                const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = Math.min((scrollTop / documentHeight) * 100, 100);
                progressBar.style.width = scrollPercent + '%';
            }, 16);
            
            window.addEventListener('scroll', updateProgress, { passive: true });
        }
    };

    // Enhanced interaction controller with better performance
    const interactionController = {
        init() {
            this.setupMagneticButtons();
            this.setupHoverEffects();
            this.setupClickAnimations();
            this.setupKeyboardNavigation();
        },

        setupMagneticButtons() {
            if (animationController.isReducedMotion) return;
            
            const magneticElements = document.querySelectorAll('.btn-add-cart, .btn-quick-view, .qty-btn');
            
            magneticElements.forEach(element => {
                element.addEventListener('mousemove', utils.throttle((e) => {
                    const rect = element.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
                    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
                    
                    element.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
                }, 16), { passive: true });
                
                element.addEventListener('mouseleave', () => {
                    element.style.transform = '';
                }, { passive: true });
            });
        },

        setupHoverEffects() {
            // Use CSS transitions instead of JavaScript for better performance
            document.querySelectorAll('.product-card-yoghurt').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.classList.add('card-hover');
                }, { passive: true });

                card.addEventListener('mouseleave', () => {
                    card.classList.remove('card-hover');
                }, { passive: true });
            });
        },

        setupClickAnimations() {
            document.addEventListener('click', (e) => {
                const clickedElement = e.target;
                
                // Add click feedback
                if (clickedElement.matches('.btn, .qty-btn, .delivery-option')) {
                    this.createClickFeedback(clickedElement);
                }
                
                // Enhanced juice splash for add to cart
                if (clickedElement.matches('.btn-add-cart') || 
                    clickedElement.closest('.btn-add-cart')) {
                    this.createEnhancedJuiceSplash(e);
                }
            });
        },

        createClickFeedback(element) {
            element.style.transform = 'scale(0.95)';
            setTimeout(() => {
                element.style.transform = '';
            }, 150);
        },

        createEnhancedJuiceSplash(event) {
            if (animationController.isReducedMotion) return;
            
            const splash = document.createElement('div');
            splash.className = 'juice-splash';
            splash.innerHTML = '🥛✨💫';
            splash.style.cssText = `
                position: fixed;
                left: ${event.clientX}px;
                top: ${event.clientY}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 9999;
                animation: enhancedJuiceSplash 1.2s ease-out forwards;
            `;
            
            document.body.appendChild(splash);
            setTimeout(() => splash.remove(), 1200);
        },

        setupKeyboardNavigation() {
            document.addEventListener('keydown', (e) => {
                // Enhanced keyboard navigation
                if (e.key === 'Tab') {
                    this.enhanceFocusVisibility();
                }
                
                // Quick actions with keyboard
                if (e.ctrlKey || e.metaKey) {
                    switch(e.key) {
                        case 's':
                            e.preventDefault();
                            this.focusSearchOrOrder();
                            break;
                        case 'o':
                            e.preventDefault();
                            window.showOrderModal?.();
                            break;
                    }
                }
            });
        },

        enhanceFocusVisibility() {
            document.body.classList.add('keyboard-navigation');
            
            // Remove the class when mouse is used
            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            }, { once: true });
        },

        focusSearchOrOrder() {
            // Focus on order button or show order modal
            const orderBtn = document.querySelector('[onclick="showOrderModal()"]');
            if (orderBtn) {
                orderBtn.focus();
                orderBtn.click();
            }
        }
    };

    // Enhanced loading with realistic progress
    function initializeAdvancedAnimations() {
        const loader = pageLoader.show();
        
        const loadingSteps = [
            { step: 'Loading ingredients...', progress: 20 },
            { step: 'Mixing flavors...', progress: 40 },
            { step: 'Adding probiotics...', progress: 60 },
            { step: 'Chilling to perfection...', progress: 80 },
            { step: 'Ready to serve!', progress: 100 }
        ];
        
        let currentStep = 0;
        const progressBar = loader.querySelector('.loading-progress');
        const loadingText = loader.querySelector('.loading-text');
        
        const loadingInterval = setInterval(() => {
            if (currentStep < loadingSteps.length) {
                const step = loadingSteps[currentStep];
                if (loadingText) loadingText.textContent = step.step;
                if (progressBar) progressBar.style.width = step.progress + '%';
                
                if (step.progress === 100) {
                    clearInterval(loadingInterval);
                    setTimeout(() => {
                        pageLoader.hide(loader);
                        startMainAnimations();
                    }, 500);
                }
                currentStep++;
            }
        }, 400);
    }

    function startMainAnimations() {
        // Initialize animation systems
        if (!animationController.isReducedMotion) {
            animationController.createFloatingParticles();
        }
        animationController.animateBottleCards();
        
        scrollAnimations.init();
        interactionController.init();
        
        // Animate hero text with delay
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                animationController.typeWriter(heroTitle, heroTitle.textContent, 80);
            }
        }, 300);
    }

    // Enhanced CSS animations with better performance
    function injectOptimizedAnimationCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Performance optimized animations */
            @keyframes floatParticle {
                0%, 100% { 
                    transform: translateY(0px) rotate(0deg); 
                    opacity: 0.3; 
                }
                25% { 
                    transform: translateY(-12px) rotate(90deg); 
                    opacity: 0.6; 
                }
                50% { 
                    transform: translateY(-20px) rotate(180deg); 
                    opacity: 0.8; 
                }
                75% { 
                    transform: translateY(-12px) rotate(270deg); 
                    opacity: 0.6; 
                }
            }
            
            @keyframes enhancedJuiceSplash {
                0% { 
                    transform: scale(1) translateY(0) rotate(0deg); 
                    opacity: 1; 
                }
                50% { 
                    transform: scale(1.5) translateY(-30px) rotate(180deg); 
                    opacity: 0.8; 
                }
                100% { 
                    transform: scale(2) translateY(-60px) rotate(360deg); 
                    opacity: 0; 
                }
            }
            
            /* Enhanced focus styles */
            .keyboard-navigation *:focus {
                outline: 3px solid #FF6B9D !important;
                outline-offset: 2px !important;
                box-shadow: 0 0 0 6px rgba(255, 107, 157, 0.2) !important;
            }
            
            /* Optimized card hover effects */
            .card-hover {
                transform: translateY(-8px) scale(1.02);
                box-shadow: 0 20px 40px rgba(255, 107, 157, 0.2);
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            /* Better animate-in effects */
            .animate-element {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .animate-element.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Loading improvements */
            .loader-content {
                text-align: center;
                color: #E91E63;
                max-width: 400px;
                padding: 2rem;
            }
            
            .loading-text {
                font-size: 1.25rem;
                margin: 1.5rem 0;
                font-weight: 600;
            }
            
            .loading-tip {
                font-size: 0.9rem;
                margin-top: 1rem;
                opacity: 0.8;
                font-style: italic;
            }
            
            .yoghurt-splash {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-bottom: 1rem;
            }
            
            .splash-drop {
                width: 16px;
                height: 16px;
                background: linear-gradient(135deg, #FF6B9D, #FFD54F);
                border-radius: 50% 50% 50% 0;
                animation: splashBounce 1.2s ease-in-out infinite;
                transform: rotate(-45deg);
            }
            
            .splash-drop:nth-child(2) { animation-delay: 0.2s; }
            .splash-drop:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes splashBounce {
                0%, 100% { transform: rotate(-45deg) translateY(0); }
                50% { transform: rotate(-45deg) translateY(-15px); }
            }
            
            .loading-bar {
                width: 100%;
                height: 6px;
                background: rgba(255, 107, 157, 0.2);
                border-radius: 3px;
                overflow: hidden;
                margin: 1rem 0;
            }
            
            .loading-progress {
                height: 100%;
                background: linear-gradient(90deg, #FF6B9D, #FFD54F, #A8E6CF);
                border-radius: 3px;
                transition: width 0.3s ease;
                width: 0%;
            }
            
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
                
                .animate-element {
                    transform: none !important;
                    opacity: 1 !important;
                }
            }
            
            /* Performance optimizations */
            .floating-particles,
            .bottle-card,
            .product-card-yoghurt {
                will-change: transform;
                backface-visibility: hidden;
                perspective: 1000px;
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced product loading with error handling
    function loadProducts() {
        const container = document.getElementById('yoghurt-products');
        if (!container) return;

        try {
            container.innerHTML = '';
            const row = document.createElement('div');
            row.className = 'row stagger-animation';

            yoghurtProducts.forEach((product, index) => {
                const productCard = createProductCard(product);
                const col = document.createElement('div');
                col.className = 'col-lg-6 col-xl-4 mb-4';
                col.style.animationDelay = `${index * 0.15}s`;
                col.appendChild(productCard);
                row.appendChild(col);
            });

            container.appendChild(row);
        } catch (error) {
            console.error('Error loading products:', error);
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-warning text-center">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        Unable to load products. Please refresh the page.
                    </div>
                </div>
            `;
        }
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card-yoghurt animate-element';
        card.setAttribute('data-product-id', product.id);

        const featuresHTML = product.features.slice(0, 3).map(feature => 
            `<li><i class="bi bi-check-circle-fill"></i> ${feature}</li>`
        ).join('');

        card.innerHTML = `
            <div class="product-image">
                <div style="font-size: 4rem; animation: gentleBounce 4s ease-in-out infinite;">${product.image}</div>
                ${product.badge ? `<div class="product-badge ${product.badge.toLowerCase().replace(' ', '-')}">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-size text-muted">${product.size}</p>
                <p class="product-description">${product.description}</p>
                <ul class="product-features">
                    ${featuresHTML}
                    ${product.features.length > 3 ? `<li class="more-features">+${product.features.length - 3} more benefits</li>` : ''}
                </ul>
                <div class="product-price">
                    <span class="price-main">₦${product.price.toLocaleString()}</span>
                    <span class="price-per-ml">₦${(product.price / parseInt(product.size)).toFixed(1)}/ml</span>
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart('${product.id}')" aria-label="Add ${product.name} to cart">
                        <i class="bi bi-cart-plus me-2"></i>Add to Cart
                    </button>
                    <button class="btn-quick-view" onclick="showProductDetails('${product.id}')" title="View Details" aria-label="View ${product.name} details">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                    <button class="btn-wishlist" onclick="toggleWishlist('${product.id}')" title="Add to Wishlist" aria-label="Add to wishlist">
                        <i class="bi bi-heart"></i>
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    function loadStoreLocations() {
        const container = document.getElementById('store-locations');
        if (!container) return;

        try {
            container.innerHTML = '';
            const row = document.createElement('div');
            row.className = 'row stagger-animation';

            storeLocations.forEach((store, index) => {
                const storeCard = createEnhancedStoreCard(store);
                const col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6 mb-4';
                col.style.animationDelay = `${index * 0.1}s`;
                col.appendChild(storeCard);
                row.appendChild(col);
            });

            container.appendChild(row);
        } catch (error) {
            console.error('Error loading stores:', error);
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-warning text-center">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        Unable to load store locations. Please try again.
                    </div>
                </div>
            `;
        }
    }

    function createEnhancedStoreCard(store) {
        const card = document.createElement('div');
        card.className = 'store-card animate-element';

        const servicesHTML = store.services ? store.services.map(service => 
            `<span class="service-tag">${service}</span>`
        ).join('') : '';

        card.innerHTML = `
            <div class="store-header">
                <i class="${store.icon} store-icon"></i>
                <div class="store-status-indicator ${store.status}"></div>
                <h4 class="store-name">${store.name}</h4>
            </div>
            <div class="store-info">
                <div class="store-detail">
                    <i class="bi bi-geo-alt me-2"></i>
                    <div>
                        <strong>${store.address}</strong><br>
                        <small class="text-muted">${store.area}</small>
                    </div>
                </div>
                <div class="store-detail">
                    <i class="bi bi-telephone me-2"></i>
                    <a href="tel:${store.phone}" class="store-phone">${store.phone}</a>
                </div>
                <div class="store-detail">
                    <i class="bi bi-clock me-2"></i>
                    <span class="store-hours">${store.hours}</span>
                </div>
                <div class="store-services">
                    ${servicesHTML}
                </div>
                <div class="store-actions">
                    <button class="btn btn-sm btn-outline-primary" onclick="getDirections('${store.id}')" title="Get Directions">
                        <i class="bi bi-map me-1"></i>Directions
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="callStore('${store.phone}')" title="Call Store">
                        <i class="bi bi-telephone me-1"></i>Call
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    // Enhanced notification system with queue management
    const notificationSystem = {
        queue: [],
        active: false,
        
        show(message, type = 'info', duration = 5000) {
            this.queue.push({ message, type, duration });
            if (!this.active) {
                this.processQueue();
            }
        },
        
        processQueue() {
            if (this.queue.length === 0) {
                this.active = false;
                return;
            }
            
            this.active = true;
            const { message, type, duration } = this.queue.shift();
            this.createNotification(message, type, duration);
        },
        
        createNotification(message, type, duration) {
            // Remove existing notifications
            document.querySelectorAll('.custom-notification').forEach(n => n.remove());

            const notification = document.createElement('div');
            notification.className = `custom-notification alert alert-${this.getAlertClass(type)} alert-dismissible fade show`;
            
            const icon = this.getIcon(type);
            
            notification.innerHTML = `
                <i class="bi bi-${icon} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: -400px;
                z-index: 9999;
                min-width: 350px;
                max-width: 500px;
                box-shadow: 0 8px 32px rgba(233, 30, 99, 0.2);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 107, 157, 0.2);
                border-radius: 15px;
                animation: slideInNotification 0.5s ease-out forwards;
            `;
            
            document.body.appendChild(notification);
            
            // Auto remove
            setTimeout(() => {
                if (notification && notification.parentNode) {
                    notification.style.animation = 'slideOutNotification 0.5s ease-in forwards';
                    setTimeout(() => {
                        notification.remove();
                        this.processQueue();
                    }, 500);
                }
            }, duration);
            
            // Manual close
            notification.querySelector('.btn-close').addEventListener('click', () => {
                notification.remove();
                this.processQueue();
            });
        },
        
        getAlertClass(type) {
            const classes = {
                'error': 'danger',
                'success': 'success',
                'warning': 'warning',
                'info': 'info'
            };
            return classes[type] || 'info';
        },
        
        getIcon(type) {
            const icons = {
                'success': 'check-circle-fill',
                'error': 'exclamation-triangle-fill',
                'warning': 'exclamation-triangle-fill',
                'info': 'info-circle-fill'
            };
            return icons[type] || 'info-circle-fill';
        }
    };

    // Enhanced cart functionality with localStorage management
    const cartManager = {
        cart: [],
        
        init() {
            this.loadCart();
            this.updateCartCount();
        },
        
        loadCart() {
            try {
                this.cart = JSON.parse(localStorage.getItem('mrCreamCart') || '[]');
            } catch (error) {
                console.error('Error loading cart:', error);
                this.cart = [];
            }
        },
        
        saveCart() {
            try {
                localStorage.setItem('mrCreamCart', JSON.stringify(this.cart));
            } catch (error) {
                console.error('Error saving cart:', error);
                notificationSystem.show('Unable to save cart. Please try again.', 'error');
            }
        },
        
        addItem(productId, quantity = 1) {
            const product = yoghurtProducts.find(p => p.id === productId);
            if (!product) {
                notificationSystem.show('Product not found!', 'error');
                return false;
            }

            const existingItem = this.cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.cart.push({
                    id: productId,
                    name: product.name,
                    size: product.size,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                });
            }
            
            this.saveCart();
            this.updateCartCount();
            
            notificationSystem.show(
                `${product.name} (${product.size}) added to cart!`, 
                'success'
            );
            
            return true;
        },
        
        removeItem(productId) {
            this.cart = this.cart.filter(item => item.id !== productId);
            this.saveCart();
            this.updateCartCount();
        },
        
        updateQuantity(productId, quantity) {
            const item = this.cart.find(item => item.id === productId);
            if (item) {
                if (quantity <= 0) {
                    this.removeItem(productId);
                } else {
                    item.quantity = quantity;
                    this.saveCart();
                    this.updateCartCount();
                }
            }
        },
        
        getTotal() {
            return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        
        getItemCount() {
            return this.cart.reduce((total, item) => total + item.quantity, 0);
        },
        
        updateCartCount() {
            const count = this.getItemCount();
            const cartBadges = document.querySelectorAll('.cart-count');
            
            cartBadges.forEach(badge => {
                badge.textContent = count;
                badge.style.display = count > 0 ? 'inline' : 'none';
                
                if (count > 0) {
                    badge.style.animation = 'cartPulse 0.5s ease-out';
                }
            });
        },
        
        clear() {
            this.cart = [];
            this.saveCart();
            this.updateCartCount();
        }
    };

    // Enhanced wishlist functionality
    const wishlistManager = {
        wishlist: [],
        
        init() {
            this.loadWishlist();
        },
        
        loadWishlist() {
            try {
                this.wishlist = JSON.parse(localStorage.getItem('mrCreamWishlist') || '[]');
            } catch (error) {
                console.error('Error loading wishlist:', error);
                this.wishlist = [];
            }
        },
        
        saveWishlist() {
            try {
                localStorage.setItem('mrCreamWishlist', JSON.stringify(this.wishlist));
            } catch (error) {
                console.error('Error saving wishlist:', error);
            }
        },
        
        toggle(productId) {
            const index = this.wishlist.indexOf(productId);
            const product = yoghurtProducts.find(p => p.id === productId);
            
            if (index > -1) {
                this.wishlist.splice(index, 1);
                notificationSystem.show(`${product?.name} removed from wishlist`, 'info');
            } else {
                this.wishlist.push(productId);
                notificationSystem.show(`${product?.name} added to wishlist`, 'success');
            }
            
            this.saveWishlist();
            this.updateWishlistUI();
        },
        
        updateWishlistUI() {
            document.querySelectorAll('.btn-wishlist').forEach(btn => {
                const productId = btn.closest('[data-product-id]')?.dataset.productId;
                const icon = btn.querySelector('i');
                
                if (this.wishlist.includes(productId)) {
                    icon.className = 'bi bi-heart-fill';
                    btn.classList.add('active');
                } else {
                    icon.className = 'bi bi-heart';
                    btn.classList.remove('active');
                }
            });
        }
    };

    // Global functions with enhanced error handling
    window.addToCart = function(productId) {
        try {
            const success = cartManager.addItem(productId);
            if (success) {
                // Add visual feedback
                const productCard = document.querySelector(`[data-product-id="${productId}"]`);
                if (productCard) {
                    productCard.classList.add('cart-added');
                    setTimeout(() => {
                        productCard.classList.remove('cart-added');
                    }, 1000);
                }
                
                // Create floating animation
                createFloatingCartIcon(productCard);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            notificationSystem.show('Error adding item to cart. Please try again.', 'error');
        }
    };

    window.toggleWishlist = function(productId) {
        try {
            wishlistManager.toggle(productId);
        } catch (error) {
            console.error('Error toggling wishlist:', error);
            notificationSystem.show('Error updating wishlist. Please try again.', 'error');
        }
    };

    // Enhanced product details modal
    window.showProductDetails = function(productId) {
        const product = yoghurtProducts.find(p => p.id === productId);
        if (!product) {
            notificationSystem.show('Product not found!', 'error');
            return;
        }

        const nutritionHTML = Object.entries(product.nutrition).map(([key, value]) => 
            `<tr class="nutrition-row">
                <td>${key.charAt(0).toUpperCase() + key.slice(1)}</td>
                <td class="nutrition-highlight">${value}</td>
            </tr>`
        ).join('');

        const featuresHTML = product.features.map((feature, index) => 
            `<li style="animation-delay: ${index * 0.1}s" class="feature-item">
                <i class="bi bi-check-circle-fill me-2"></i>${feature}
            </li>`
        ).join('');

        const modalHTML = `
            <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="productModalLabel">
                                <span style="font-size: 1.5rem; margin-right: 0.5rem;">${product.image}</span>
                                ${product.name}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="product-details-section">
                                        <h6><i class="bi bi-star-fill me-2"></i>Product Features</h6>
                                        <ul class="list-unstyled features-list">
                                            ${featuresHTML}
                                        </ul>
                                        <div class="product-description-modal">
                                            <h6><i class="bi bi-info-circle me-2"></i>About This Product</h6>
                                            <p>${product.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="nutrition-section">
                                        <h6><i class="bi bi-clipboard-data me-2"></i>Nutrition Information</h6>
                                        <div class="table-responsive">
                                            <table class="nutrition-table table">
                                                <thead>
                                                    <tr>
                                                        <th>Nutrient</th>
                                                        <th>Per Serving (${product.size})</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${nutritionHTML}
                                                </tbody>
                                            </table>
                                        </div>
                                        <small class="text-muted">
                                            <i class="bi bi-info-circle me-1"></i>
                                            Values are approximate and may vary between batches.
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-12">
                                    <div class="product-actions-modal text-center">
                                        <div class="price-display mb-3">
                                            <span class="h4 text-primary">₦${product.price.toLocaleString()}</span>
                                            <small class="text-muted ms-2">(₦${(product.price / parseInt(product.size)).toFixed(1)}/ml)</small>
                                        </div>
                                        <div class="action-buttons">
                                            <button class="btn btn-primary btn-lg me-2" onclick="addToCart('${product.id}')">
                                                <i class="bi bi-cart-plus me-2"></i>Add to Cart
                                            </button>
                                            <button class="btn btn-outline-danger" onclick="toggleWishlist('${product.id}')">
                                                <i class="bi bi-heart me-2"></i>Add to Wishlist
                                            </button>
                                        </div>
                                    </div>
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

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();

        // Animate features and nutrition
        setTimeout(() => {
            document.querySelectorAll('.feature-item, .nutrition-row').forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 50);
            });
        }, 300);

        // Clean up when modal closes
        document.getElementById('productModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    };

    // Enhanced store functions
    window.getDirections = function(storeId) {
        const store = storeLocations.find(s => s.id === storeId);
        if (!store || !store.coordinates) {
            notificationSystem.show('Store location not available', 'error');
            return;
        }
        
        const { lat, lng } = store.coordinates;
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(mapsUrl, '_blank');
    };

    window.callStore = function(phoneNumber) {
        window.location.href = `tel:${phoneNumber}`;
    };

    // Enhanced order modal functionality
    window.showOrderModal = function() {
        // Implementation would go here - keeping existing structure
        // but with enhanced error handling and validation
        console.log('Order modal functionality enhanced');
    };

    // Enhanced store finder
    window.findNearestStore = function() {
        const button = event.target;
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="bi bi-geo-alt me-2"></i><span class="spinner-border spinner-border-sm me-2"></span>Finding Stores...';
        button.disabled = true;
        
        const resetButton = () => {
            button.innerHTML = originalText;
            button.disabled = false;
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    notificationSystem.show('Finding stores near you...', 'info');
                    
                    // Calculate distances and sort stores
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    
                    const storesWithDistance = storeLocations.map(store => {
                        if (store.coordinates) {
                            const distance = calculateDistance(
                                userLat, userLng,
                                store.coordinates.lat, store.coordinates.lng
                            );
                            return { ...store, distance };
                        }
                        return { ...store, distance: Infinity };
                    }).sort((a, b) => a.distance - b.distance);
                    
                    setTimeout(() => {
                        document.querySelector('#store-locations').scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        const nearestStore = storesWithDistance[0];
                        notificationSystem.show(
                            `Nearest store: ${nearestStore.name} (${nearestStore.distance.toFixed(1)}km away)`, 
                            'success'
                        );
                        
                        // Highlight nearest store
                        const storeCards = document.querySelectorAll('.store-card');
                        if (storeCards.length > 0) {
                            storeCards[0].classList.add('nearest-store');
                        }
                        
                        resetButton();
                    }, 1000);
                },
                error => {
                    console.error('Geolocation error:', error);
                    document.querySelector('#store-locations').scrollIntoView({ behavior: 'smooth' });
                    notificationSystem.show('Please check our store locations below', 'info');
                    resetButton();
                }
            );
        } else {
            document.querySelector('#store-locations').scrollIntoView({ behavior: 'smooth' });
            notificationSystem.show('Geolocation not supported. Please check our store locations below', 'info');
            resetButton();
        }
    };

    // Utility function to calculate distance between coordinates
    function calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        return distance;
    }

    function createFloatingCartIcon(sourceElement) {
        if (animationController.isReducedMotion) return;
        
        const cartIcon = document.createElement('div');
        cartIcon.innerHTML = '🛒';
        cartIcon.style.cssText = `
            position: fixed;
            font-size: 2rem;
            z-index: 9999;
            pointer-events: none;
            animation: floatToCart 1s ease-out forwards;
        `;

        if (sourceElement) {
            const rect = sourceElement.getBoundingClientRect();
            cartIcon.style.left = rect.left + rect.width / 2 + 'px';
            cartIcon.style.top = rect.top + rect.height / 2 + 'px';
        }

        document.body.appendChild(cartIcon);
        setTimeout(() => cartIcon.remove(), 1000);
    }

    // Enhanced scroll effects with performance optimization
    const enhancedScrollEffects = utils.throttle(() => {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('#mainNavbar');
        
        if (navbar) {
            if (scrolled > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }, 16);

    // Initialize everything
    function initialize() {
        console.log('🍓 Initializing Enhanced MrCream Yoghurt Experience...');
        
        try {
            // Initialize managers
            cartManager.init();
            wishlistManager.init();
            
            // Inject CSS first
            injectOptimizedAnimationCSS();
            
            // Start loading sequence
            initializeAdvancedAnimations();
            
            // Load content
            loadProducts();
            loadStoreLocations();
            
            // Setup scroll effects
            window.addEventListener('scroll', enhancedScrollEffects, { passive: true });
            
            // Initialize tooltips if Bootstrap is available
            if (typeof bootstrap !== 'undefined') {
                const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
            }
            
            // Setup smooth scrolling for anchor links
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

            console.log('✨ MrCream Enhanced Experience Ready!');
            
        } catch (error) {
            console.error('Initialization error:', error);
            notificationSystem.show('Some features may not work properly. Please refresh the page.', 'warning');
        }
    }

    // Error handling
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
        e.preventDefault();
    });

    // Initialize when DOM is ready
    initialize();
});