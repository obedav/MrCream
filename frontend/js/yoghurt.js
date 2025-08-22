// Enhanced MrCream Yoghurt Page JavaScript with Advanced Animations
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

    // Animation controller
    const animationController = {
        animations: new Map(),
        
        // Create floating particles animation
// Update the createFloatingParticles function
createFloatingParticles() {
    const hero = document.querySelector('.yoghurt-hero');
    if (!hero) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh; /* Limit to viewport height only */
        pointer-events: none;
        z-index: 1;
        overflow: hidden; /* Prevent particles from extending beyond */
    `;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${this.getRandomYoghurtColor()};
            border-radius: 50%;
            opacity: 0.3;
            animation: floatParticle ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 80}%; /* Keep particles in top 80% only */
            will-change: transform; /* Optimize performance */
        `;
        particleContainer.appendChild(particle);
    }

    hero.appendChild(particleContainer);
},

        getRandomYoghurtColor() {
            const colors = ['#FF6B9D', '#FFD54F', '#A8E6CF', '#FFAB91', '#E91E63'];
            return colors[Math.floor(Math.random() * colors.length)];
        },

        // Enhanced bottle card animations
        animateBottleCards() {
            const bottles = document.querySelectorAll('.bottle-card');
            bottles.forEach((bottle, index) => {
                bottle.style.animationDelay = `${index * 0.3}s`;
                
                // Add magnetic hover effect
                bottle.addEventListener('mouseenter', () => {
                    bottles.forEach((otherBottle, otherIndex) => {
                        if (otherIndex !== index) {
                            otherBottle.style.transform = 'scale(0.95) translateY(10px)';
                            otherBottle.style.opacity = '0.7';
                        }
                    });
                });

                bottle.addEventListener('mouseleave', () => {
                    bottles.forEach(otherBottle => {
                        otherBottle.style.transform = '';
                        otherBottle.style.opacity = '';
                    });
                });
            });
        },

        // Typewriter effect for hero text
        typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        },

        // Morphing background animation
        createMorphingBackground() {
            const hero = document.querySelector('.yoghurt-hero');
            if (!hero) return;

            const morphingBg = document.createElement('div');
            morphingBg.className = 'morphing-background';
            morphingBg.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, 
                    rgba(255, 107, 157, 0.1), 
                    rgba(255, 213, 79, 0.1), 
                    rgba(168, 230, 207, 0.1));
                background-size: 400% 400%;
                animation: morphBackground 15s ease infinite;
                z-index: 0;
            `;

            hero.appendChild(morphingBg);
        },

        // Liquid splash effect on scroll
        createLiquidSplash() {
            let ticking = false;
            
            function updateSplash() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                const splashElements = document.querySelectorAll('.bottle-card, .product-card-yoghurt');
                splashElements.forEach((element, index) => {
                    const speed = 1 + (index * 0.1);
                    element.style.transform = `translateY(${rate * speed}px) rotateX(${scrolled * 0.01}deg)`;
                });
                
                ticking = false;
            }

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(updateSplash);
                    ticking = true;
                }
            });
        }
    };

    // Enhanced page loader with yoghurt theme
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
                    
                    <div class="loading-bar">
                        <div class="loading-progress"></div>
                    </div>
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
                transition: opacity 0.1s ease;
            `;
            
            document.body.appendChild(loader);
            return loader;
        },

        hide(loader) {
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }
        }
    };

    // Advanced scroll animations
    const scrollAnimations = {
        init() {
            this.createScrollTriggers();
            this.setupParallax();
            this.createScrollProgressBar();
        },

        createScrollTriggers() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        
                        // Stagger animations for multiple elements
                        if (element.classList.contains('stagger-animation')) {
                            const children = element.children;
                            Array.from(children).forEach((child, index) => {
                                setTimeout(() => {
                                    child.classList.add('animate-in');
                                }, index * 100);
                            });
                        } else {
                            element.classList.add('animate-in');
                        }

                        // Add ripple effect for cards
                        if (element.classList.contains('product-card-yoghurt') || 
                            element.classList.contains('benefit-card')) {
                            this.createRippleEffect(element);
                        }
                    }
                });
            }, observerOptions);

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
                observer.observe(el);
            });
        },

        createRippleEffect(element) {
            const ripple = document.createElement('div');
            ripple.className = 'card-ripple';
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(255, 107, 157, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: rippleExpand 0.8s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            element.style.position = 'relative';
            element.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 800);
        },

            setupParallax() {
            const parallaxElements = document.querySelectorAll('.bottle-card, .hero-content');
            
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const maxScroll = window.innerHeight * 1.5; // Add this limit
                
                if (scrolled < maxScroll) { // Add this condition
                    parallaxElements.forEach((element, index) => {
                        const speed = 0.2 + (index * 0.05); // Reduced from 0.5
                        const yPos = -(scrolled * speed);
                        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    });
                }
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
            
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / documentHeight) * 100;
                progressBar.style.width = scrollPercent + '%';
            });
        }
    };

    // Enhanced interactions
    const interactionController = {
        init() {
            this.setupMagneticButtons();
            this.setupHoverEffects();
            this.setupClickAnimations();
            this.setupKeyboardNavigation();
        },

        setupMagneticButtons() {
            const magneticElements = document.querySelectorAll('.btn-add-cart, .btn-quick-view, .qty-btn');
            
            magneticElements.forEach(element => {
                element.addEventListener('mousemove', (e) => {
                    const rect = element.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
                });
                
                element.addEventListener('mouseleave', () => {
                    element.style.transform = '';
                });
            });
        },

        setupHoverEffects() {
            // Product cards liquid hover effect
            document.querySelectorAll('.product-card-yoghurt').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    this.createLiquidHover(card);
                });
            });

            // Store cards wave effect
            document.querySelectorAll('.store-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    this.createWaveEffect(card);
                });
            });
        },

        createLiquidHover(element) {
            const liquid = document.createElement('div');
            liquid.className = 'liquid-hover';
            liquid.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), 
                    rgba(255, 107, 157, 0.1) 0%, 
                    transparent 50%);
                border-radius: inherit;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 1;
            `;
            
            element.style.position = 'relative';
            element.appendChild(liquid);
            
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                liquid.style.setProperty('--x', x + '%');
                liquid.style.setProperty('--y', y + '%');
                liquid.style.opacity = '1';
            });
            
            element.addEventListener('mouseleave', () => {
                liquid.style.opacity = '0';
                setTimeout(() => liquid.remove(), 300);
            });
        },

        createWaveEffect(element) {
            const wave = document.createElement('div');
            wave.className = 'wave-effect';
            wave.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(255, 107, 157, 0.2);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: waveExpand 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(wave);
            
            setTimeout(() => wave.remove(), 600);
        },

        setupClickAnimations() {
            document.addEventListener('click', (e) => {
                const clickedElement = e.target;
                
                // Add click ripple to buttons
                if (clickedElement.matches('.btn, .qty-btn, .delivery-option')) {
                    this.createClickRipple(e, clickedElement);
                }
                
                // Juice splash effect for add to cart
                if (clickedElement.matches('.btn-add-cart') || 
                    clickedElement.closest('.btn-add-cart')) {
                    this.createJuiceSplash(e);
                }
            });
        },

        createClickRipple(event, element) {
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: clickRipple 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        },

        createJuiceSplash(event) {
            const splash = document.createElement('div');
            splash.className = 'juice-splash';
            splash.innerHTML = '🥛💫✨';
            splash.style.cssText = `
                position: fixed;
                left: ${event.clientX}px;
                top: ${event.clientY}px;
                font-size: 2rem;
                pointer-events: none;
                z-index: 9999;
                animation: juiceSplash 1s ease-out forwards;
            `;
            
            document.body.appendChild(splash);
            setTimeout(() => splash.remove(), 1000);
        },

        setupKeyboardNavigation() {
            document.addEventListener('keydown', (e) => {
                // Enhanced keyboard navigation
                if (e.key === 'Tab') {
                    this.showFocusRing(e);
                }
                
                // Quick actions with keyboard
                if (e.ctrlKey || e.metaKey) {
                    switch(e.key) {
                        case 's':
                            e.preventDefault();
                            this.showSearchModal();
                            break;
                        case 'o':
                            e.preventDefault();
                            window.showOrderModal?.();
                            break;
                    }
                }
            });
        },

        showFocusRing(event) {
            const focusedElement = event.target;
            if (focusedElement.matches('.btn, .product-card-yoghurt, .store-card')) {
                focusedElement.style.outline = '3px solid #FF6B9D';
                focusedElement.style.outlineOffset = '2px';
                
                setTimeout(() => {
                    focusedElement.style.outline = '';
                    focusedElement.style.outlineOffset = '';
                }, 2000);
            }
        }
    };

    // Advanced loading sequence
    function initializeAdvancedAnimations() {
        const loader = pageLoader.show();
        
        // Simulate loading with progress
        let progress = 0;
        const progressBar = loader.querySelector('.loading-progress');
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    pageLoader.hide(loader);
                    startMainAnimations();
                }, 500);
            }
            
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        }, 200);
    }

    function startMainAnimations() {
        // Initialize all animation systems
       // animationController.createFloatingParticles();
       // animationController.createMorphingBackground();
        animationController.animateBottleCards();
       // animationController.createLiquidSplash();
        
        scrollAnimations.init();
        interactionController.init();
        
        // Animate hero text
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroTitle) {
            setTimeout(() => {
                animationController.typeWriter(heroTitle, heroTitle.textContent, 100);
            }, 500);
        }
        
        if (heroSubtitle) {
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 1500);
        }
    }

    // Add dynamic CSS animations
    function injectAnimationCSS() {
        const style = document.createElement('style');
        style.textContent = `
                @keyframes floatParticle {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg); 
                        opacity: 0.3; 
                    }
                    25% { 
                        transform: translateY(-15px) rotate(90deg); /* Reduced movement */
                        opacity: 0.6; 
                    }
                    50% { 
                        transform: translateY(-25px) rotate(180deg); /* Reduced movement */
                        opacity: 0.8; 
                    }
                    75% { 
                        transform: translateY(-15px) rotate(270deg); /* Reduced movement */
                        opacity: 0.6; 
                    }
                }
                            
            @keyframes morphBackground {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            @keyframes rippleExpand {
                0% { width: 0; height: 0; opacity: 1; }
                100% { width: 200px; height: 200px; opacity: 0; }
            }
            
            @keyframes waveExpand {
                0% { width: 0; height: 0; opacity: 0.8; }
                100% { width: 300px; height: 300px; opacity: 0; }
            }
            
            @keyframes clickRipple {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
            }
            
            @keyframes juiceSplash {
                0% { transform: scale(1) translateY(0); opacity: 1; }
                50% { transform: scale(1.5) translateY(-20px); opacity: 0.8; }
                100% { transform: scale(2) translateY(-40px); opacity: 0; }
            }
            
            .animate-element {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .animate-element.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .loader-content {
                text-align: center;
                color: #E91E63;
            }
            
            .yoghurt-splash {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-bottom: 2rem;
            }
            
            .splash-drop {
                width: 20px;
                height: 20px;
                background: linear-gradient(135deg, #FF6B9D, #FFD54F);
                border-radius: 50% 50% 50% 0;
                animation: splashBounce 1.5s ease-in-out infinite;
                transform: rotate(-45deg);
            }
            
            .splash-drop:nth-child(2) { animation-delay: 0.3s; }
            .splash-drop:nth-child(3) { animation-delay: 0.6s; }
            
            @keyframes splashBounce {
                0%, 100% { transform: rotate(-45deg) translateY(0); }
                50% { transform: rotate(-45deg) translateY(-20px); }
            }
            
            .loading-bar {
                width: 200px;
                height: 4px;
                background: rgba(255, 107, 157, 0.3);
                border-radius: 2px;
                overflow: hidden;
                margin: 1rem auto;
            }
            
            .loading-progress {
                height: 100%;
                background: linear-gradient(90deg, #FF6B9D, #FFD54F);
                border-radius: 2px;
                transition: width 0.3s ease;
                width: 0%;
            }
        `;
        document.head.appendChild(style);
    }

    // Load products with enhanced animations
    function loadProducts() {
        const container = document.getElementById('yoghurt-products');
        if (!container) return;

        container.innerHTML = '';
        const row = document.createElement('div');
        row.className = 'row stagger-animation';

        yoghurtProducts.forEach((product, index) => {
            const productCard = createProductCard(product);
            const col = document.createElement('div');
            col.className = 'col-lg-6 col-xl-6 mb-4';
            col.style.animationDelay = `${index * 0.2}s`;
            col.appendChild(productCard);
            row.appendChild(col);
        });

        container.appendChild(row);
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card-yoghurt animate-element';
        card.setAttribute('data-product-id', product.id);

        const featuresHTML = product.features.map(feature => 
            `<li><i class="bi bi-check-circle-fill"></i> ${feature}</li>`
        ).join('');

        card.innerHTML = `
            <div class="product-image">
                <div style="font-size: 5rem; animation: bounce 3s ease-in-out infinite;">${product.image}</div>
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

        container.innerHTML = '';
        const row = document.createElement('div');
        row.className = 'row stagger-animation';

        storeLocations.forEach((store, index) => {
            const storeCard = createStoreCard(store);
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 mb-4';
            col.style.animationDelay = `${index * 0.15}s`;
            col.appendChild(storeCard);
            row.appendChild(col);
        });

        container.appendChild(row);
    }

    function createStoreCard(store) {
        const card = document.createElement('div');
        card.className = 'store-card animate-element';

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

    // Enhanced notification system with animations
    function showNotification(message, type = 'info') {
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
            right: -400px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 8px 32px rgba(233, 30, 99, 0.2);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 107, 157, 0.2);
            border-radius: 15px;
            animation: slideInNotification 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove with slide out animation
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.style.animation = 'slideOutNotification 0.5s ease-in forwards';
                setTimeout(() => notification.remove(), 500);
            }
        }, 5000);
    }

    // Enhanced cart functionality with animations
    window.addToCart = function(productId) {
        const product = yoghurtProducts.find(p => p.id === productId);
        if (!product) return;

        // Add cart animation
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (productCard) {
            productCard.style.transform = 'scale(1.05)';
            productCard.style.boxShadow = '0 20px 60px rgba(255, 107, 157, 0.3)';
            
            setTimeout(() => {
                productCard.style.transform = '';
                productCard.style.boxShadow = '';
            }, 300);
        }

        showNotification(`${product.name} (${product.size}) added to cart!`, 'success');
        
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
        
        // Create floating cart icon animation
        createFloatingCartIcon(productCard);
    };

    function createFloatingCartIcon(sourceElement) {
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

    // Enhanced product details modal with animations
    window.showProductDetails = function(productId) {
        const product = yoghurtProducts.find(p => p.id === productId);
        if (!product) return;

        const nutritionHTML = Object.entries(product.nutrition).map(([key, value]) => 
            `<tr class="nutrition-row"><td>${key.charAt(0).toUpperCase() + key.slice(1)}</td><td class="nutrition-highlight">${value}</td></tr>`
        ).join('');

        const featuresHTML = product.features.map((feature, index) => 
            `<li style="animation-delay: ${index * 0.1}s" class="feature-item"><i class="bi bi-check-circle-fill me-2"></i>${feature}</li>`
        ).join('');

        const modalHTML = `
            <div class="modal fade" id="productModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <span style="font-size: 1.5rem; margin-right: 0.5rem; animation: bounce 2s ease-in-out infinite;">${product.image}</span>
                                ${product.name} (${product.size})
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6><i class="bi bi-star-fill me-2"></i>Product Features</h6>
                                    <ul class="list-unstyled features-list">
                                        ${featuresHTML}
                                    </ul>
                                    <p class="mt-3 product-description-modal">${product.description}</p>
                                    <div class="text-center">
                                        <button class="btn btn-primary btn-lg pulse-button" onclick="addToCart('${product.id}')">
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

        const existingModal = document.getElementById('productModal');
        if (existingModal) {
            existingModal.remove();
        }

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();

        // Animate modal content
        setTimeout(() => {
            document.querySelectorAll('.feature-item').forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 100);
            });

            document.querySelectorAll('.nutrition-row').forEach((row, index) => {
                setTimeout(() => {
                    row.style.opacity = '1';
                    row.style.transform = 'translateX(0)';
                }, index * 50);
            });
        }, 300);

        document.getElementById('productModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    };

    // Enhanced order modal with advanced animations
    window.showOrderModal = function() {
        const orderFormHTML = `
            <div class="order-form">
                <h4 class="order-section-title"><i class="bi bi-cup-straw me-2"></i>Select Your Products</h4>
                <div class="row" id="orderProducts">
                    ${yoghurtProducts.map((product, index) => `
                        <div class="col-md-6 mb-3" style="animation-delay: ${index * 0.1}s">
                            <div class="order-product-card animate-element" data-product-id="${product.id}">
                                <div class="d-flex align-items-center">
                                    <span style="font-size: 2rem; animation: bounce 2s ease-in-out infinite; animation-delay: ${index * 0.2}s;">${product.image}</span>
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
                    <div class="delivery-option animate-element" onclick="selectDeliveryOption('pickup')">
                        <input type="radio" name="delivery" value="pickup" id="pickup">
                        <div>
                            <div class="delivery-title">Store Pickup</div>
                            <div class="delivery-description">Pick up from any of our store locations</div>
                            <div class="delivery-price">Free</div>
                        </div>
                    </div>
                    <div class="delivery-option animate-element" onclick="selectDeliveryOption('delivery')">
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
                            <input type="text" id="customerName" required class="animated-input">
                        </div>
                        <div class="form-group">
                            <label for="customerPhone">Phone Number *</label>
                            <input type="tel" id="customerPhone" required class="animated-input">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="customerEmail">Email Address</label>
                        <input type="email" id="customerEmail" class="animated-input">
                    </div>
                    <div class="form-group" id="addressGroup" style="display: none;">
                        <label for="customerAddress">Delivery Address *</label>
                        <textarea id="customerAddress" rows="3" placeholder="Please provide your complete address including landmarks" class="animated-input"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="orderNotes">Special Instructions (Optional)</label>
                        <textarea id="orderNotes" rows="2" placeholder="Any special requests or instructions for your order" class="animated-input"></textarea>
                    </div>
                </div>

                <div class="text-center">
                    <button type="button" class="btn btn-primary btn-lg pulse-button" onclick="submitOrder()">
                        <i class="bi bi-check-circle me-2"></i>Place Order
                    </button>
                </div>
            </div>
        `;

        document.getElementById('order-form-content').innerHTML = orderFormHTML;
        
        const modal = new bootstrap.Modal(document.getElementById('orderModal'));
        modal.show();

        // Animate form elements
        setTimeout(() => {
            document.querySelectorAll('.animate-element').forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('animate-in');
                }, index * 100);
            });
        }, 300);

        // Add focus animations to inputs
        document.querySelectorAll('.animated-input').forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.2)';
            });

            input.addEventListener('blur', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });

        document.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', function() {
                updateOrderSummary();
            });
        });
    };

    // Enhanced quantity update with animations
    window.updateQuantity = function(productId, change) {
        const qtyInput = document.getElementById(`qty-${productId}`);
        if (!qtyInput) return;

        let currentQty = parseInt(qtyInput.value) || 0;
        let newQty = Math.max(0, Math.min(20, currentQty + change));
        
        // Animate quantity change
        qtyInput.style.transform = 'scale(1.2)';
        qtyInput.style.color = '#FF6B9D';
        
        setTimeout(() => {
            qtyInput.value = newQty;
            qtyInput.style.transform = '';
            qtyInput.style.color = '';
        }, 150);
        
        updateOrderSummary();
        
        // Animate product card if quantity changed
        if (newQty !== currentQty) {
            const productCard = qtyInput.closest('.order-product-card');
            if (productCard) {
                productCard.style.backgroundColor = 'rgba(255, 107, 157, 0.1)';
                setTimeout(() => {
                    productCard.style.backgroundColor = '';
                }, 300);
            }
        }
    };

    // Enhanced delivery option selection
    window.selectDeliveryOption = function(option) {
        document.querySelectorAll('input[name="delivery"]').forEach(radio => {
            radio.checked = radio.value === option;
        });

        document.querySelectorAll('.delivery-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        const selectedOption = document.querySelector(`input[value="${option}"]`).closest('.delivery-option');
        selectedOption.classList.add('selected');
        
        // Add selection animation
        selectedOption.style.transform = 'scale(1.02)';
        selectedOption.style.backgroundColor = 'rgba(255, 107, 157, 0.1)';
        
        setTimeout(() => {
            selectedOption.style.transform = '';
            selectedOption.style.backgroundColor = '';
        }, 300);

        const addressGroup = document.getElementById('addressGroup');
        if (option === 'delivery') {
            addressGroup.style.display = 'block';
            addressGroup.style.animation = 'slideInUp 0.3s ease-out';
            document.getElementById('customerAddress').required = true;
        } else {
            addressGroup.style.animation = 'slideOutDown 0.3s ease-in';
            setTimeout(() => {
                addressGroup.style.display = 'none';
            }, 300);
            document.getElementById('customerAddress').required = false;
        }

        updateOrderSummary();
    };

    // Enhanced order summary with animations
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
                    <div class="summary-row animate-summary">
                        <span>${product.name} (${product.size}) x ${qty}</span>
                        <span>₦${itemTotal.toLocaleString()}</span>
                    </div>
                `;
            }
        });

        const deliveryOption = document.querySelector('input[name="delivery"]:checked');
        const deliveryCost = deliveryOption && deliveryOption.value === 'delivery' ? 1000 : 0;
        
        if (deliveryCost > 0) {
            summaryHTML += `
                <div class="summary-row animate-summary">
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
                <div class="summary-row total animate-summary">
                    <span>Total</span>
                    <span>₦${total.toLocaleString()}</span>
                </div>
            `;
            summaryContent.innerHTML = summaryHTML;
            
            // Animate summary items
            setTimeout(() => {
                document.querySelectorAll('.animate-summary').forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }, 100);
        }
    }

    // Enhanced order submission with celebrations
    window.submitOrder = function() {
        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const deliveryOption = document.querySelector('input[name="delivery"]:checked');
        
        if (!name || !phone || !deliveryOption) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

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

        if (deliveryOption.value === 'delivery') {
            const address = document.getElementById('customerAddress').value.trim();
            if (!address) {
                showNotification('Please provide delivery address', 'error');
                return;
            }
        }

        // Create celebration effect
        createCelebrationEffect();

        const orderNumber = 'MC' + Date.now().toString().slice(-8);

        const successHTML = `
            <div class="order-success">
                <div class="success-icon">
                    <i class="bi bi-check-circle-fill"></i>
                </div>
                <h3 class="success-title">Order Placed Successfully!</h3>
                <div class="order-number">Order #${orderNumber}</div>
                <p class="success-message">Thank you for choosing MrCream! We'll contact you shortly to confirm your order.</p>
                <p class="text-muted contact-info">
                    <i class="bi bi-telephone me-2"></i>
                    Questions? Call us at <a href="tel:+2348032354952">+234 803 235 4952</a>
                </p>
            </div>
        `;

        document.getElementById('order-form-content').innerHTML = successHTML;

        // Animate success elements
        setTimeout(() => {
            document.querySelector('.success-icon').style.animation = 'successBounce 1s ease-out';
            document.querySelector('.success-title').style.animation = 'slideInUp 0.5s ease-out 0.3s both';
            document.querySelector('.order-number').style.animation = 'slideInUp 0.5s ease-out 0.6s both';
            document.querySelector('.success-message').style.animation = 'slideInUp 0.5s ease-out 0.9s both';
            document.querySelector('.contact-info').style.animation = 'slideInUp 0.5s ease-out 1.2s both';
        }, 100);

        showNotification('Order placed successfully! We\'ll contact you shortly.', 'success');

        console.log('Order data:', {
            orderNumber,
            customer: { name, phone },
            delivery: deliveryOption.value,
            items: getOrderItems(),
            timestamp: new Date().toISOString()
        });
    };

    function createCelebrationEffect() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration-container';
        celebration.innerHTML = '🎉🥛✨🍓🌟💫';
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            z-index: 10000;
            pointer-events: none;
            animation: celebrationExplode 2s ease-out forwards;
        `;
        
        document.body.appendChild(celebration);
        setTimeout(() => celebration.remove(), 2000);
    }

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

    // Enhanced store finder with animations
    window.findNearestStore = function() {
        const button = event.target;
        button.style.transform = 'scale(0.95)';
        button.innerHTML = '<i class="bi bi-geo-alt me-2"></i>Finding Stores...';
        
        setTimeout(() => {
            button.style.transform = '';
            button.innerHTML = '<i class="bi bi-geo-alt me-2"></i>Find Nearest Store';
        }, 300);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    showNotification('Finding stores near you...', 'info');
                    setTimeout(() => {
                        document.querySelector('#store-locations').scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                        showNotification('Showing nearby stores below!', 'success');
                        
                        // Highlight nearest store (simulate)
                        const stores = document.querySelectorAll('.store-card');
                        if (stores.length > 0) {
                            stores[0].style.animation = 'highlightStore 2s ease-in-out';
                        }
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

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('mrCreamCart') || '[]');
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        
        const cartBadge = document.querySelector('.cart-count');
        if (cartBadge) {
            cartBadge.textContent = count;
            cartBadge.style.display = count > 0 ? 'inline' : 'none';
            
            // Animate cart count update
            if (count > 0) {
                cartBadge.style.animation = 'cartPulse 0.5s ease-out';
            }
        }
    }

    // Enhanced scroll effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('#mainNavbar');
        
        // Enhanced navbar animation
        if (navbar) {
            if (scrolled > 100) {
                navbar.classList.add('scrolled');
                navbar.style.transform = 'translateY(0)';
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Parallax for hero elements
        const hero = document.querySelector('.yoghurt-hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Update scroll progress
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrolled / documentHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
    });

    // Add more advanced CSS animations
    function injectAdvancedAnimationCSS() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInNotification {
                from { right: -400px; opacity: 0; }
                to { right: 20px; opacity: 1; }
            }
            
            @keyframes slideOutNotification {
                from { right: 20px; opacity: 1; }
                to { right: -400px; opacity: 0; }
            }
            
            @keyframes floatToCart {
                0% { transform: scale(1) rotate(0deg); opacity: 1; }
                50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
                100% { transform: scale(0.5) rotate(360deg) translateY(-100px); opacity: 0; }
            }
            
            @keyframes slideInUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes slideOutDown {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(30px); opacity: 0; }
            }
            
            @keyframes celebrationExplode {
                0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; }
                50% { transform: translate(-50%, -50%) scale(1.5) rotate(180deg); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(3) rotate(360deg); opacity: 0; }
            }
            
            @keyframes highlightStore {
                0%, 100% { transform: scale(1); box-shadow: 0 8px 32px rgba(233, 30, 99, 0.1); }
                50% { transform: scale(1.05); box-shadow: 0 16px 48px rgba(233, 30, 99, 0.3); }
            }
            
            @keyframes cartPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.3); }
            }
            
            .feature-item {
                opacity: 0;
                transform: translateX(-20px);
                transition: all 0.3s ease;
            }
            
            .nutrition-row {
                opacity: 0;
                transform: translateX(20px);
                transition: all 0.3s ease;
            }
            
            .pulse-button {
                animation: gentlePulse 2s ease-in-out infinite;
            }
            
            @keyframes gentlePulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
            
            .order-section-title {
                background: linear-gradient(135deg, #FF6B9D, #FFD54F);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 2rem;
            }
            
            .animate-summary {
                opacity: 0;
                transform: translateX(-20px);
                transition: all 0.3s ease;
            }
            
            .success-title,
            .success-message,
            .contact-info {
                opacity: 0;
                transform: translateY(20px);
            }
            
            .nutrition-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 1rem;
            }
            
            .nutrition-table th,
            .nutrition-table td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid rgba(255, 107, 157, 0.1);
            }
            
            .nutrition-table th {
                background: rgba(255, 107, 157, 0.1);
                font-weight: 700;
                color: var(--text-dark);
            }
            
            .nutrition-highlight {
                font-weight: 700;
                color: var(--yoghurt-strawberry);
            }
            
            .features-list .feature-item {
                padding: 8px 0;
                display: flex;
                align-items: center;
            }
            
            .product-description-modal {
                background: rgba(255, 248, 231, 0.5);
                padding: 1rem;
                border-radius: 10px;
                border-left: 4px solid var(--yoghurt-strawberry);
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize everything
    function initialize() {
        console.log('🍓 Initializing Enhanced MrCream Yoghurt Experience...');
        
        // Inject CSS first
        injectAnimationCSS();
        injectAdvancedAnimationCSS();
        
        // Start advanced loading sequence
        initializeAdvancedAnimations();
        
        // Load content
        loadProducts();
        loadStoreLocations();
        
        // Initialize cart count
        updateCartCount();
        
        // Add smooth scrolling for navigation
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

        // Add easter egg - Konami code for special animation
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        
        document.addEventListener('keydown', function(e) {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                activateEasterEgg();
                konamiCode = [];
            }
        });

        // Performance optimization - preload critical images
        preloadCriticalAssets();
        
        // Add service worker for offline capability (if available)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {
                // Service worker not available, continue normally
            });
        }

        console.log('✨ MrCream Enhanced Experience Ready!');
    }

    function activateEasterEgg() {
        // Create rainbow yoghurt effect
        const rainbowEffect = document.createElement('div');
        rainbowEffect.className = 'rainbow-yoghurt-effect';
        rainbowEffect.innerHTML = '🌈🥛✨🦄💫🍓🌟';
        rainbowEffect.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 5rem;
            z-index: 10000;
            pointer-events: none;
            background: linear-gradient(45deg, 
                rgba(255, 0, 150, 0.1), 
                rgba(0, 255, 255, 0.1), 
                rgba(255, 255, 0, 0.1), 
                rgba(255, 0, 255, 0.1));
            animation: rainbowSpin 3s ease-in-out;
        `;

        document.body.appendChild(rainbowEffect);
        
        // Add rainbow animation to all yoghurt emojis
        document.querySelectorAll('.bottle-icon, .product-image div').forEach(element => {
            element.style.animation = 'rainbowBounce 2s ease-in-out infinite';
        });
        
        // Show special message
        showNotification('🌈 You found the secret yoghurt rainbow! 🥛✨', 'success');
        
        // Clean up after 5 seconds
        setTimeout(() => {
            rainbowEffect.remove();
            document.querySelectorAll('.bottle-icon, .product-image div').forEach(element => {
                element.style.animation = '';
            });
        }, 5000);
    }

    function preloadCriticalAssets() {
        // Preload critical fonts and resources
        const criticalAssets = [
            'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Dancing+Script:wght@400;500;600;700&display=swap',
            'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css'
        ];

        criticalAssets.forEach(asset => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = asset;
            document.head.appendChild(link);
        });
    }

    // Advanced intersection observer for better performance
    function createAdvancedObserver() {
        const observerOptions = {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const ratio = entry.intersectionRatio;

                if (ratio > 0.5) {
                    // Element is mostly visible
                    element.classList.add('fully-visible');
                    
                    // Add specific animations based on element type
                    if (element.classList.contains('product-card-yoghurt')) {
                        element.style.animationPlayState = 'running';
                    }
                    
                    if (element.classList.contains('bottle-card')) {
                        element.style.transform = 'scale(1)';
                    }
                } else if (ratio < 0.1) {
                    // Element is barely visible
                    element.classList.remove('fully-visible');
                }
            });
        }, observerOptions);

        // Observe all interactive elements
        document.querySelectorAll(`
            .product-card-yoghurt, 
            .bottle-card, 
            .benefit-card, 
            .method-item, 
            .store-card
        `).forEach(el => observer.observe(el));

        return observer;
    }

    // Mouse tracking for enhanced interactions
    function initializeMouseTracking() {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update floating particles position
            document.querySelectorAll('.floating-particles div').forEach((particle, index) => {
                const speed = (index + 1) * 0.001;
                const x = (mouseX - window.innerWidth / 2) * speed;
                const y = (mouseY - window.innerHeight / 2) * speed;
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });

        // Add magnetic effect to interactive elements
        document.querySelectorAll('.product-card-yoghurt, .store-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) * 0.1;
                const deltaY = (e.clientY - centerY) * 0.1;
                
                card.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // Voice interaction support (experimental)
    function initializeVoiceSupport() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = function(event) {
                const command = event.results[0][0].transcript.toLowerCase();
                
                if (command.includes('order') || command.includes('buy')) {
                    window.showOrderModal?.();
                    showNotification('Voice command recognized: Opening order form', 'info');
                } else if (command.includes('store') || command.includes('location')) {
                    window.findNearestStore?.();
                    showNotification('Voice command recognized: Finding stores', 'info');
                } else if (command.includes('strawberry')) {
                    const strawberryCard = document.querySelector('[data-product-id*="strawberry"]');
                    if (strawberryCard) {
                        strawberryCard.scrollIntoView({ behavior: 'smooth' });
                        showNotification('Voice command recognized: Showing strawberry products', 'info');
                    }
                }
            };

            // Add voice control button (hidden until first interaction)
            const voiceButton = document.createElement('button');
            voiceButton.innerHTML = '<i class="bi bi-mic"></i>';
            voiceButton.className = 'voice-control-btn';
            voiceButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #FF6B9D, #FFD54F);
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 1000;
                opacity: 0;
                transform: scale(0);
                transition: all 0.3s ease;
                box-shadow: 0 8px 25px rgba(255, 107, 157, 0.3);
            `;

            voiceButton.addEventListener('click', () => {
                recognition.start();
                voiceButton.style.animation = 'pulse 1s ease-in-out infinite';
                showNotification('Listening... Try saying "order", "stores", or "strawberry"', 'info');
            });

            recognition.onend = () => {
                voiceButton.style.animation = '';
            };

            document.body.appendChild(voiceButton);

            // Show voice button after user interaction
            document.addEventListener('click', () => {
                voiceButton.style.opacity = '1';
                voiceButton.style.transform = 'scale(1)';
            }, { once: true });
        }
    }

    // Accessibility enhancements
    function enhanceAccessibility() {
        // Add ARIA labels and descriptions
        document.querySelectorAll('.product-card-yoghurt').forEach((card, index) => {
            card.setAttribute('role', 'article');
            card.setAttribute('aria-label', `Product ${index + 1}`);
            card.setAttribute('tabindex', '0');
        });

        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.setAttribute('aria-describedby', 'cart-help');
        });

        // Add hidden help text
        const helpText = document.createElement('div');
        helpText.id = 'cart-help';
        helpText.className = 'sr-only';
        helpText.textContent = 'Add this product to your shopping cart';
        document.body.appendChild(helpText);

        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const focused = document.activeElement;
                if (focused.classList.contains('product-card-yoghurt')) {
                    e.preventDefault();
                    const addButton = focused.querySelector('.btn-add-cart');
                    if (addButton) addButton.click();
                }
            }
        });

        // High contrast mode detection
        if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
            document.body.classList.add('high-contrast');
        }

        // Reduced motion preferences
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }

    // Analytics and performance monitoring
    function initializeAnalytics() {
        // Track user interactions
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.matches('.btn-add-cart')) {
                console.log('Analytics: Product added to cart', target.closest('[data-product-id]')?.dataset.productId);
            }
            
            if (target.matches('.btn-quick-view')) {
                console.log('Analytics: Product details viewed', target.closest('[data-product-id]')?.dataset.productId);
            }
        });

        // Performance monitoring
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    // Error handling and fallbacks
    function setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
            
            // Show user-friendly error message
            showNotification('Something went wrong, but don\'t worry! Try refreshing the page.', 'error');
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
            e.preventDefault();
        });
    }

    // Initialize everything when DOM is ready
    initialize();
    createAdvancedObserver();
    initializeMouseTracking();
    initializeVoiceSupport();
    enhanceAccessibility();
    initializeAnalytics();
    setupErrorHandling();

    // Add final rainbow animation CSS
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbowSpin {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            50% { transform: scale(1) rotate(180deg); opacity: 1; }
            100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes rainbowBounce {
            0%, 100% { transform: scale(1) rotate(0deg); filter: hue-rotate(0deg); }
            25% { transform: scale(1.2) rotate(90deg); filter: hue-rotate(90deg); }
            50% { transform: scale(1.4) rotate(180deg); filter: hue-rotate(180deg); }
            75% { transform: scale(1.2) rotate(270deg); filter: hue-rotate(270deg); }
        }
        
        .high-contrast .product-card-yoghurt,
        .high-contrast .store-card {
            border: 3px solid #000;
            background: #fff;
        }
        
        .reduced-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .voice-control-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 35px rgba(255, 107, 157, 0.4);
        }
    `;
    document.head.appendChild(rainbowStyle);

    console.log('🎉 Enhanced MrCream Yoghurt Page Fully Loaded with Advanced Animations!');
});