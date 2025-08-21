// Enhanced MrCream Water Park JavaScript - Advanced Features

// Enhanced Global Water Park State with Real-time Features
window.WaterParkApp = {
    currentCapacity: 65,
    maxCapacity: 500,
    currentVisitors: 325,
    weatherCondition: 'sunny',
    waterTemperature: 28, // Celsius
    ambientTemperature: 32,
    waterQuality: 'excellent',
    operatingHours: {
        weekday: { open: '10:00', close: '18:00' },
        weekend: { open: '09:00', close: '19:00' }
    },
    attractions: {
        adultPool: { 
            status: 'open', 
            capacity: 85, 
            waitTime: 5,
            temperature: 28,
            depth: '1.5m - 3m',
            features: ['Wave generation', 'Lap lanes', 'Deep section']
        },
        kidsZone: { 
            status: 'open', 
            capacity: 45, 
            waitTime: 0,
            temperature: 30,
            depth: '0.3m - 1m',
            features: ['Mini slides', 'Water fountains', 'Splash pad']
        },
        vipPool: { 
            status: 'available', 
            capacity: 20, 
            waitTime: 0,
            temperature: 29,
            depth: '1.2m - 2.5m',
            features: ['Heated water', 'Private cabanas', 'Butler service']
        },
        waterSlides: { 
            status: 'open', 
            capacity: 60, 
            waitTime: 12,
            minHeight: '120cm',
            features: ['Spiral slides', 'Racing lanes', 'Tube rides']
        },
        lazyRiver: { 
            status: 'open', 
            capacity: 100, 
            waitTime: 3,
            length: '300m',
            features: ['Gentle current', 'Scenic route', 'Rest stops']
        }
    },
    events: {
        todaysEvents: [],
        upcomingEvents: [],
        specialOffers: []
    },
    notifications: [],
    emergencyMode: false,
    maintenanceMode: false
};

// Enhanced Performance Tracking
const PerformanceTracker = {
    startTime: Date.now(),
    metrics: {
        loadTime: 0,
        interactionCount: 0,
        errorCount: 0,
        apiCalls: 0
    },
    
    track(event, data = {}) {
        this.metrics.interactionCount++;
        console.log(`🎯 Event: ${event}`, data);
        
        // Send to analytics (simulated)
        if (window.gtag) {
            gtag('event', event, data);
        }
    },
    
    getMetrics() {
        return {
            ...this.metrics,
            sessionDuration: Date.now() - this.startTime,
            performanceScore: this.calculatePerformanceScore()
        };
    },
    
    calculatePerformanceScore() {
        const base = 100;
        const errorPenalty = this.metrics.errorCount * 5;
        const loadPenalty = this.metrics.loadTime > 3000 ? 10 : 0;
        return Math.max(0, base - errorPenalty - loadPenalty);
    }
};

// Advanced Weather and Environmental System
const EnvironmentalSystem = {
    weatherData: {
        current: 'sunny',
        temperature: 32,
        humidity: 65,
        windSpeed: 8,
        uvIndex: 7,
        visibility: 'excellent'
    },
    
    waterQualityMetrics: {
        ph: 7.2,
        chlorine: 1.8,
        temperature: 28,
        clarity: 'crystal clear',
        lastTested: new Date().toISOString()
    },
    
    async updateWeatherData() {
        try {
            // Simulate weather API call
            const weatherConditions = [
                { condition: 'sunny', temp: 32, humidity: 65 },
                { condition: 'partly-cloudy', temp: 30, humidity: 70 },
                { condition: 'cloudy', temp: 28, humidity: 75 },
                { condition: 'light-rain', temp: 25, humidity: 85 }
            ];
            
            const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
            
            this.weatherData = {
                ...this.weatherData,
                ...randomWeather,
                windSpeed: Math.random() * 15 + 5,
                uvIndex: Math.random() * 10 + 2,
                lastUpdated: new Date().toISOString()
            };
            
            window.WaterParkApp.weatherCondition = randomWeather.condition;
            window.WaterParkApp.ambientTemperature = randomWeather.temp;
            
            this.updateAttractionAvailability();
            this.displayWeatherAlert();
            
            PerformanceTracker.track('weather_updated', this.weatherData);
            
        } catch (error) {
            console.error('Weather update failed:', error);
            this.handleWeatherError();
        }
    },
    
    updateAttractionAvailability() {
        const weather = this.weatherData.current;
        
        if (weather === 'light-rain' || weather === 'thunderstorm') {
            // Close outdoor attractions
            Object.keys(window.WaterParkApp.attractions).forEach(key => {
                if (key !== 'indoorPool') {
                    window.WaterParkApp.attractions[key].status = 'closed';
                    window.WaterParkApp.attractions[key].closureReason = 'Weather conditions';
                }
            });
            
            NotificationSystem.addNotification({
                type: 'warning',
                title: 'Weather Alert',
                message: 'Some outdoor attractions temporarily closed due to weather',
                icon: '🌧️',
                duration: 0 // Persistent
            });
        } else {
            // Reopen attractions
            Object.keys(window.WaterParkApp.attractions).forEach(key => {
                if (window.WaterParkApp.attractions[key].status === 'closed' && 
                    window.WaterParkApp.attractions[key].closureReason === 'Weather conditions') {
                    window.WaterParkApp.attractions[key].status = 'open';
                    delete window.WaterParkApp.attractions[key].closureReason;
                }
            });
        }
    },
    
    displayWeatherAlert() {
        const weatherWidget = document.getElementById('weather-widget');
        if (weatherWidget) {
            const weather = this.weatherData;
            weatherWidget.innerHTML = `
                <div class="weather-info">
                    <div class="weather-icon">${this.getWeatherIcon(weather.current)}</div>
                    <div class="weather-details">
                        <span class="temperature">${weather.temperature}°C</span>
                        <span class="condition">${weather.current}</span>
                        <span class="uv-index">UV: ${weather.uvIndex.toFixed(1)}</span>
                    </div>
                </div>
            `;
        }
    },
    
    getWeatherIcon(condition) {
        const icons = {
            'sunny': '☀️',
            'partly-cloudy': '⛅',
            'cloudy': '☁️',
            'light-rain': '🌧️',
            'thunderstorm': '⛈️'
        };
        return icons[condition] || '🌤️';
    },
    
    handleWeatherError() {
        NotificationSystem.addNotification({
            type: 'error',
            title: 'Weather Service Unavailable',
            message: 'Unable to update weather data. Using cached information.',
            duration: 5000
        });
    }
};

// Advanced Notification System
const NotificationSystem = {
    notifications: [],
    maxNotifications: 5,
    
    addNotification(notification) {
        const id = Date.now() + Math.random();
        const newNotification = {
            id,
            type: notification.type || 'info',
            title: notification.title || '',
            message: notification.message || '',
            icon: notification.icon || this.getDefaultIcon(notification.type),
            duration: notification.duration !== undefined ? notification.duration : 5000,
            timestamp: new Date(),
            actions: notification.actions || []
        };
        
        this.notifications.unshift(newNotification);
        
        // Limit notifications
        if (this.notifications.length > this.maxNotifications) {
            this.notifications = this.notifications.slice(0, this.maxNotifications);
        }
        
        this.renderNotifications();
        
        // Auto-remove if duration is set
        if (newNotification.duration > 0) {
            setTimeout(() => {
                this.removeNotification(id);
            }, newNotification.duration);
        }
        
        PerformanceTracker.track('notification_shown', {
            type: newNotification.type,
            title: newNotification.title
        });
        
        return id;
    },
    
    removeNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.renderNotifications();
    },
    
    renderNotifications() {
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
        
        container.innerHTML = this.notifications.map(notification => `
            <div class="notification notification-${notification.type}" data-id="${notification.id}">
                <div class="notification-header">
                    <span class="notification-icon">${notification.icon}</span>
                    <span class="notification-title">${notification.title}</span>
                    <button class="notification-close" onclick="NotificationSystem.removeNotification(${notification.id})">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div class="notification-body">
                    <p>${notification.message}</p>
                    ${notification.actions.length > 0 ? `
                        <div class="notification-actions">
                            ${notification.actions.map(action => `
                                <button class="btn btn-sm btn-outline-primary" onclick="${action.callback}">
                                    ${action.label}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="notification-time">
                    ${this.formatTime(notification.timestamp)}
                </div>
            </div>
        `).join('');
    },
    
    getDefaultIcon(type) {
        const icons = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        return icons[type] || 'ℹ️';
    },
    
    formatTime(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        
        return timestamp.toLocaleDateString();
    }
};

// Advanced Real-time Data Manager
const RealTimeDataManager = {
    websocket: null,
    reconnectAttempts: 0,
    maxReconnectAttempts: 5,
    
    connect() {
        // Simulate WebSocket connection for real-time updates
        this.simulateRealTimeUpdates();
    },
    
    simulateRealTimeUpdates() {
        // Simulate capacity updates every 30 seconds
        setInterval(() => {
            this.updateCapacity();
        }, 30000);
        
        // Simulate wait time updates every 2 minutes
        setInterval(() => {
            this.updateWaitTimes();
        }, 120000);
        
        // Simulate weather updates every 10 minutes
        setInterval(() => {
            EnvironmentalSystem.updateWeatherData();
        }, 600000);
        
        // Simulate special events
        setInterval(() => {
            this.checkForSpecialEvents();
        }, 300000); // 5 minutes
    },
    
    updateCapacity() {
        const change = (Math.random() - 0.5) * 15; // ±7.5% change
        const newCapacity = Math.max(20, Math.min(95, 
            window.WaterParkApp.currentCapacity + change));
        
        const oldCapacity = window.WaterParkApp.currentCapacity;
        window.WaterParkApp.currentCapacity = newCapacity;
        window.WaterParkApp.currentVisitors = Math.round(
            (newCapacity / 100) * window.WaterParkApp.maxCapacity
        );
        
        // Trigger capacity alert if significant change
        if (Math.abs(newCapacity - oldCapacity) > 10) {
            this.triggerCapacityAlert(newCapacity, oldCapacity);
        }
        
        updateCapacityDisplay();
        PerformanceTracker.track('capacity_updated', {
            old: oldCapacity,
            new: newCapacity,
            visitors: window.WaterParkApp.currentVisitors
        });
    },
    
    updateWaitTimes() {
        Object.keys(window.WaterParkApp.attractions).forEach(key => {
            const attraction = window.WaterParkApp.attractions[key];
            if (attraction.status === 'open') {
                // Random wait time fluctuation
                const baseWaitTime = attraction.waitTime || 0;
                const variation = Math.random() * 10 - 5; // ±5 minutes
                attraction.waitTime = Math.max(0, Math.round(baseWaitTime + variation));
            }
        });
        
        updateAttractionStatus();
        PerformanceTracker.track('wait_times_updated');
    },
    
    triggerCapacityAlert(newCapacity, oldCapacity) {
        let alertType = 'info';
        let message = '';
        
        if (newCapacity > 85 && oldCapacity <= 85) {
            alertType = 'warning';
            message = 'Park capacity is getting high. Consider visiting later for shorter wait times.';
        } else if (newCapacity < 50 && oldCapacity >= 50) {
            alertType = 'success';
            message = 'Great time to visit! Lower crowds mean shorter wait times.';
        }
        
        if (message) {
            NotificationSystem.addNotification({
                type: alertType,
                title: 'Capacity Update',
                message,
                icon: newCapacity > 85 ? '🚨' : '🎉'
            });
        }
    },
    
    checkForSpecialEvents() {
        const events = [
            {
                name: 'Splash Hour',
                description: 'Free ice cream for all visitors!',
                probability: 0.1,
                duration: 3600000 // 1 hour
            },
            {
                name: 'DJ Pool Party',
                description: 'Live DJ at the main pool area',
                probability: 0.05,
                duration: 7200000 // 2 hours
            },
            {
                name: 'Photo Contest',
                description: 'Share your best pool photos to win prizes!',
                probability: 0.15,
                duration: 1800000 // 30 minutes
            }
        ];
        
        events.forEach(event => {
            if (Math.random() < event.probability) {
                this.triggerSpecialEvent(event);
            }
        });
    },
    
    triggerSpecialEvent(event) {
        NotificationSystem.addNotification({
            type: 'success',
            title: `🎉 Special Event: ${event.name}`,
            message: event.description,
            duration: 0,
            actions: [
                {
                    label: 'Learn More',
                    callback: `showEventDetails('${event.name}')`
                }
            ]
        });
        
        // Add to today's events
        window.WaterParkApp.events.todaysEvents.push({
            ...event,
            startTime: new Date(),
            endTime: new Date(Date.now() + event.duration)
        });
        
        PerformanceTracker.track('special_event_triggered', {
            eventName: event.name
        });
    }
};

// Enhanced 3D Visual Effects Manager
const VisualEffectsManager = {
    particleSystem: null,
    isInitialized: false,
    
    init() {
        if (this.isInitialized) return;
        
        this.createParticleSystem();
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initLoadingAnimations();
        
        this.isInitialized = true;
        PerformanceTracker.track('visual_effects_initialized');
    },
    
    createParticleSystem() {
        // Create floating water droplets
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-system';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createParticle(particleContainer);
            }, i * 500);
        }
        
        // Continuously add new particles
        setInterval(() => {
            this.createParticle(particleContainer);
        }, 3000);
    },
    
    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'water-particle';
        
        const size = Math.random() * 8 + 4;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 15;
        const opacity = Math.random() * 0.6 + 0.2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(0, 255, 255, ${opacity}) 0%, transparent 70%);
            border-radius: 50%;
            left: ${left}%;
            top: -20px;
            animation: particleFall ${animationDuration}s linear;
        `;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, animationDuration * 1000);
    },
    
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all animatable elements
        const animatableElements = document.querySelectorAll(
            '.attraction-card, .ticket-card, .event-card, .safety-item, .facility-item, .location-item-detailed'
        );
        
        animatableElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            observer.observe(el);
        });
    },
    
    animateElement(element) {
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Add stagger effect for groups
        const siblings = Array.from(element.parentNode.children);
        const index = siblings.indexOf(element);
        
        setTimeout(() => {
            element.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    },
    
    initHoverEffects() {
        document.addEventListener('mousemove', (e) => {
            this.updateMousePosition(e.clientX, e.clientY);
        });
        
        // Add ripple effect to interactive elements
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn, .card, .nav-link')) {
                this.createRippleEffect(e);
            }
        });
    },
    
    updateMousePosition(x, y) {
        // Update floating cards position based on mouse
        const floatingCards = document.querySelectorAll('.floating-attraction-card');
        
        floatingCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (x - centerX) * 0.01;
            const deltaY = (y - centerY) * 0.01;
            
            card.style.transform += ` translate(${deltaX}px, ${deltaY}px)`;
        });
    },
    
    createRippleEffect(event) {
        const element = event.target.closest('.btn, .card, .nav-link');
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('span');
        
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    },
    
    initLoadingAnimations() {
        // Add skeleton loading for dynamic content
        const loadingElements = document.querySelectorAll('.loading-container');
        
        loadingElements.forEach(element => {
            this.addSkeletonLoader(element);
        });
    },
    
    addSkeletonLoader(container) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-loader';
        skeleton.innerHTML = `
            <div class="skeleton-item skeleton-title"></div>
            <div class="skeleton-item skeleton-text"></div>
            <div class="skeleton-item skeleton-text short"></div>
            <div class="skeleton-item skeleton-button"></div>
        `;
        
        container.appendChild(skeleton);
    }
};

// Enhanced Accessibility Manager
const AccessibilityManager = {
    preferences: {
        reducedMotion: false,
        highContrast: false,
        largeText: false,
        screenReader: false
    },
    
    init() {
        this.detectPreferences();
        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
        this.setupFocusManagement();
        
        PerformanceTracker.track('accessibility_initialized');
    },
    
    detectPreferences() {
        // Detect reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.preferences.reducedMotion = true;
            this.applyReducedMotion();
        }
        
        // Detect high contrast preference
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            this.preferences.highContrast = true;
            this.applyHighContrast();
        }
        
        // Detect screen reader
        if (window.navigator.userAgent.includes('NVDA') || 
            window.navigator.userAgent.includes('JAWS') ||
            window.speechSynthesis) {
            this.preferences.screenReader = true;
            this.setupScreenReaderSupport();
        }
    },
    
    applyReducedMotion() {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
        
        // Disable particle system
        const particleSystem = document.querySelector('.particle-system');
        if (particleSystem) {
            particleSystem.style.display = 'none';
        }
    },
    
    applyHighContrast() {
        document.body.classList.add('high-contrast-mode');
        
        // Update color scheme
        document.documentElement.style.setProperty('--primary-color', '#0066ff');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--background-color', '#000000');
    },
    
    setupKeyboardNavigation() {
        // Add keyboard navigation for custom elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.highlightFocusedElement();
            }
            
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
            
            if (e.key === 'Enter' || e.key === ' ') {
                this.handleActivation(e);
            }
        });
    },
    
    setupScreenReaderSupport() {
        // Add ARIA labels and descriptions
        this.addAriaLabels();
        this.setupLiveRegions();
        this.announcePageChanges();
    },
    
    addAriaLabels() {
        // Add missing ARIA labels
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (button.textContent.trim()) {
                button.setAttribute('aria-label', button.textContent.trim());
            }
        });
        
        // Add role attributes
        const cards = document.querySelectorAll('.attraction-card, .ticket-card, .event-card');
        cards.forEach(card => {
            card.setAttribute('role', 'article');
            card.setAttribute('tabindex', '0');
        });
    },
    
    setupLiveRegions() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        
        document.body.appendChild(liveRegion);
    },
    
    announce(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            
            // Clear after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    },
    
    setupFocusManagement() {
        // Trap focus in modals
        document.addEventListener('focusin', (e) => {
            const modal = e.target.closest('.modal');
            if (modal && modal.classList.contains('show')) {
                this.trapFocusInModal(modal, e);
            }
        });
    },
    
    trapFocusInModal(modal, event) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey && event.target === firstElement) {
            lastElement.focus();
            event.preventDefault();
        } else if (!event.shiftKey && event.target === lastElement) {
            firstElement.focus();
            event.preventDefault();
        }
    }
};

// Enhanced Error Handling System
const ErrorHandler = {
    errors: [],
    maxErrors: 10,
    
    init() {
        window.addEventListener('error', (e) => {
            this.handleJavaScriptError(e);
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            this.handlePromiseRejection(e);
        });
        
        // Override console.error for tracking
        const originalError = console.error;
        console.error = (...args) => {
            this.logError('Console Error', args.join(' '));
            originalError.apply(console, args);
        };
    },
    
    handleJavaScriptError(event) {
        const error = {
            type: 'JavaScript Error',
            message: event.message,
            filename: event.filename,
            line: event.lineno,
            column: event.colno,
            stack: event.error?.stack,
            timestamp: new Date(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        this.logError('JavaScript Error', error);
        PerformanceTracker.metrics.errorCount++;
        
        // Show user-friendly error message
        if (!this.isMinorError(error)) {
            NotificationSystem.addNotification({
                type: 'error',
                title: 'Something went wrong',
                message: 'We encountered an issue. Please refresh the page or try again later.',
                actions: [
                    {
                        label: 'Refresh Page',
                        callback: 'location.reload()'
                    }
                ]
            });
        }
    },
    
    handlePromiseRejection(event) {
        const error = {
            type: 'Promise Rejection',
            message: event.reason?.message || event.reason,
            stack: event.reason?.stack,
            timestamp: new Date()
        };
        
        this.logError('Promise Rejection', error);
        PerformanceTracker.metrics.errorCount++;
    },
    
    logError(type, error) {
        this.errors.push({ type, error, timestamp: new Date() });
        
        // Limit stored errors
        if (this.errors.length > this.maxErrors) {
            this.errors = this.errors.slice(-this.maxErrors);
        }
        
        // Send to monitoring service (simulated)
        this.sendToMonitoring(type, error);
    },
    
    isMinorError(error) {
        const minorErrors = [
            'ResizeObserver loop limit exceeded',
            'Non-Error promise rejection captured',
            'Script error'
        ];
        
        return minorErrors.some(minor => 
            error.message?.includes(minor) || error.type?.includes(minor)
        );
    },
    
    sendToMonitoring(type, error) {
        // Simulate sending to error monitoring service
        console.log('📊 Error logged:', { type, error });
        
        // In production, this would send to services like Sentry, LogRocket, etc.
        if (window.Sentry) {
            window.Sentry.captureException(error);
        }
    },
    
    getErrorReport() {
        return {
            totalErrors: this.errors.length,
            recentErrors: this.errors.slice(-5),
            errorTypes: this.getErrorTypeSummary(),
            performanceImpact: PerformanceTracker.metrics.errorCount
        };
    },
    
    getErrorTypeSummary() {
        const summary = {};
        this.errors.forEach(({ type }) => {
            summary[type] = (summary[type] || 0) + 1;
        });
        return summary;
    }
};

// Initialize Enhanced Water Park System
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌊 Enhanced MrCream Water Park System Loading...');
    
    const startTime = performance.now();
    
    try {
        // Initialize core systems
        ErrorHandler.init();
        AccessibilityManager.init();
        VisualEffectsManager.init();
        RealTimeDataManager.connect();
        
        // Initialize original water park functionality
        initializeWaterPark();
        
        // Start environmental monitoring
        EnvironmentalSystem.updateWeatherData();
        
        const loadTime = performance.now() - startTime;
        PerformanceTracker.metrics.loadTime = loadTime;
        
        console.log(`✅ Enhanced Water Park System Loaded in ${loadTime.toFixed(2)}ms`);
        
        // Welcome notification
        setTimeout(() => {
            NotificationSystem.addNotification({
                type: 'success',
                title: '🏊‍♂️ Welcome to MrCream Water Park!',
                message: 'Enjoy real-time updates, live capacity monitoring, and enhanced accessibility features.',
                duration: 8000
            });
        }, 2000);
        
        PerformanceTracker.track('water_park_initialized', {
            loadTime,
            features: ['realtime', 'accessibility', 'visual_effects', 'notifications']
        });
        
    } catch (error) {
        console.error('❌ Failed to initialize Enhanced Water Park System:', error);
        ErrorHandler.logError('Initialization Error', error);
        
        // Fallback to basic functionality
        try {
            initializeWaterPark();
            console.log('🔄 Fallback initialization successful');
        } catch (fallbackError) {
            console.error('❌ Fallback initialization also failed:', fallbackError);
        }
    }
});

// Enhanced Utility Functions
function showEventDetails(eventName) {
    const event = window.WaterParkApp.events.todaysEvents.find(e => e.name === eventName);
    if (!event) return;
    
    const modal = createEventDetailsModal(event);
    document.body.appendChild(modal);
    
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
    
    PerformanceTracker.track('event_details_viewed', { eventName });
}

function createEventDetailsModal(event) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">
                        🎉 ${event.name}
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-4">
                        <h4>${event.name}</h4>
                        <p class="lead">${event.description}</p>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h6>Event Details</h6>
                            <table class="table table-borderless">
                                <tr>
                                    <td><strong>Start Time:</strong></td>
                                    <td>${event.startTime.toLocaleTimeString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>End Time:</strong></td>
                                    <td>${event.endTime.toLocaleTimeString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>Duration:</strong></td>
                                    <td>${Math.round((event.endTime - event.startTime) / 60000)} minutes</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-6">
                            <h6>How to Participate</h6>
                            <ul class="list-unstyled">
                                <li><i class="bi bi-check-circle text-success me-2"></i>Visit the main pool area</li>
                                <li><i class="bi bi-check-circle text-success me-2"></i>Look for event staff</li>
                                <li><i class="bi bi-check-circle text-success me-2"></i>Follow event instructions</li>
                                <li><i class="bi bi-check-circle text-success me-2"></i>Have fun!</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="shareEvent('${event.name}')">
                        <i class="bi bi-share me-2"></i>Share Event
                    </button>
                </div>
            </div>
        </div>
    `;
    return modal;
}

// Enhanced Sharing Functions
function shareEvent(eventName) {
    const shareData = {
        title: `🎉 ${eventName} at MrCream Water Park`,
        text: `Join us for ${eventName}! Don't miss this special event at MrCream Water Park.`,
        url: window.location.href + `#event-${eventName.replace(/\s+/g, '-').toLowerCase()}`
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => {
                PerformanceTracker.track('event_shared', { eventName, method: 'native' });
                NotificationSystem.addNotification({
                    type: 'success',
                    title: 'Event Shared!',
                    message: 'Thank you for sharing our special event!',
                    duration: 3000
                });
            })
            .catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(`${shareData.title} - ${shareData.text} ${shareData.url}`)
            .then(() => {
                PerformanceTracker.track('event_shared', { eventName, method: 'clipboard' });
                NotificationSystem.addNotification({
                    type: 'success',
                    title: 'Link Copied!',
                    message: 'Event details copied to clipboard. Share with your friends!',
                    duration: 3000
                });
            });
    }
}

// Enhanced Emergency and Safety Functions
function handleEmergencyAlert(type, location, description) {
    window.WaterParkApp.emergencyMode = true;
    
    // Stop all non-essential animations
    VisualEffectsManager.particleSystem?.pause();
    
    // Create emergency notification
    NotificationSystem.addNotification({
        type: 'error',
        title: `🚨 EMERGENCY ALERT - ${type.toUpperCase()}`,
        message: `Location: ${location}. ${description}. Please follow staff instructions.`,
        duration: 0, // Persistent
        actions: [
            {
                label: 'Call Emergency',
                callback: 'callEmergencyServices()'
            },
            {
                label: 'Get Directions',
                callback: `showEmergencyDirections('${location}')`
            }
        ]
    });
    
    // Update all attraction statuses
    Object.keys(window.WaterParkApp.attractions).forEach(key => {
        window.WaterParkApp.attractions[key].status = 'emergency-closed';
    });
    
    updateAttractionStatus();
    
    // Announce to screen readers
    AccessibilityManager.announce(`Emergency alert: ${type} at ${location}. Please follow staff instructions immediately.`);
    
    PerformanceTracker.track('emergency_alert', { type, location });
}

function callEmergencyServices() {
    // In a real implementation, this would trigger emergency protocols
    window.open('tel:+234803235495');
    
    PerformanceTracker.track('emergency_call_initiated');
}

function showEmergencyDirections(location) {
    NotificationSystem.addNotification({
        type: 'info',
        title: '🧭 Emergency Directions',
        message: `Proceed to nearest exit. Emergency assembly point: Main entrance parking area.`,
        duration: 0
    });
}

// Enhanced Analytics and Insights
const AnalyticsManager = {
    sessions: [],
    events: [],
    
    init() {
        this.startSession();
        this.trackPageView();
        this.setupEventTracking();
    },
    
    startSession() {
        const session = {
            id: this.generateSessionId(),
            startTime: new Date(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            features: this.detectFeatures()
        };
        
        this.sessions.push(session);
        localStorage.setItem('waterpark_session', JSON.stringify(session));
    },
    
    generateSessionId() {
        return 'wp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    detectFeatures() {
        return {
            webgl: !!window.WebGLRenderingContext,
            webrtc: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
            geolocation: !!navigator.geolocation,
            touchscreen: 'ontouchstart' in window,
            serviceWorker: 'serviceWorker' in navigator,
            webAssembly: typeof WebAssembly === 'object'
        };
    },
    
    trackPageView() {
        this.trackEvent('page_view', {
            page: window.location.pathname,
            title: document.title,
            timestamp: new Date(),
            loadTime: PerformanceTracker.metrics.loadTime
        });
    },
    
    trackEvent(eventName, data = {}) {
        const event = {
            name: eventName,
            data,
            timestamp: new Date(),
            sessionId: this.getCurrentSessionId(),
            page: window.location.pathname
        };
        
        this.events.push(event);
        
        // Send to analytics service (simulated)
        if (window.gtag) {
            gtag('event', eventName, data);
        }
        
        console.log('📈 Analytics Event:', event);
    },
    
    getCurrentSessionId() {
        const session = localStorage.getItem('waterpark_session');
        return session ? JSON.parse(session).id : null;
    },
    
    getInsights() {
        return {
            totalEvents: this.events.length,
            sessionDuration: this.getSessionDuration(),
            popularFeatures: this.getPopularFeatures(),
            userEngagement: this.calculateEngagement(),
            performanceMetrics: PerformanceTracker.getMetrics()
        };
    },
    
    getSessionDuration() {
        const session = this.sessions[this.sessions.length - 1];
        if (!session) return 0;
        
        return Date.now() - session.startTime.getTime();
    },
    
    getPopularFeatures() {
        const featureCounts = {};
        this.events.forEach(event => {
            const feature = event.name;
            featureCounts[feature] = (featureCounts[feature] || 0) + 1;
        });
        
        return Object.entries(featureCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);
    },
    
    calculateEngagement() {
        const sessionDuration = this.getSessionDuration();
        const eventCount = this.events.length;
        const averageTimePerEvent = sessionDuration / Math.max(eventCount, 1);
        
        return {
            sessionDuration,
            eventCount,
            averageTimePerEvent,
            engagementScore: Math.min(100, (eventCount * 10) + (sessionDuration / 1000))
        };
    }
};

// Enhanced Progressive Web App Features
const PWAManager = {
    isInstalled: false,
    deferredPrompt: null,
    
    init() {
        this.checkInstallStatus();
        this.setupInstallPrompt();
        this.registerServiceWorker();
        this.setupOfflineDetection();
    },
    
    checkInstallStatus() {
        // Check if app is installed
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            this.isInstalled = true;
            PerformanceTracker.track('pwa_installed_usage');
        }
    },
    
    setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            
            // Show install button
            this.showInstallButton();
        });
        
        window.addEventListener('appinstalled', () => {
            this.isInstalled = true;
            this.deferredPrompt = null;
            
            NotificationSystem.addNotification({
                type: 'success',
                title: '📱 App Installed!',
                message: 'MrCream Water Park is now installed on your device!',
                duration: 5000
            });
            
            PerformanceTracker.track('pwa_installed');
        });
    },
    
    showInstallButton() {
        const installButton = document.createElement('button');
        installButton.className = 'btn btn-primary position-fixed';
        installButton.style.cssText = `
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            border-radius: 50px;
            padding: 12px 20px;
        `;
        installButton.innerHTML = '<i class="bi bi-download me-2"></i>Install App';
        
        installButton.addEventListener('click', () => {
            this.installApp();
        });
        
        document.body.appendChild(installButton);
        
        // Remove button after 30 seconds if not clicked
        setTimeout(() => {
            if (installButton.parentNode && !this.isInstalled) {
                installButton.remove();
            }
        }, 30000);
    },
    
    async installApp() {
        if (!this.deferredPrompt) return;
        
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        
        PerformanceTracker.track('pwa_install_prompt', { outcome });
        
        if (outcome === 'accepted') {
            console.log('PWA install accepted');
        } else {
            console.log('PWA install dismissed');
        }
        
        this.deferredPrompt = null;
    },
    
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                    PerformanceTracker.track('service_worker_registered');
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    },
    
    setupOfflineDetection() {
        window.addEventListener('online', () => {
            NotificationSystem.addNotification({
                type: 'success',
                title: '🌐 Back Online',
                message: 'Connection restored. All features are now available.',
                duration: 3000
            });
            
            PerformanceTracker.track('connection_restored');
        });
        
        window.addEventListener('offline', () => {
            NotificationSystem.addNotification({
                type: 'warning',
                title: '📡 Connection Lost',
                message: 'You are now offline. Some features may be limited.',
                duration: 0
            });
            
            PerformanceTracker.track('connection_lost');
        });
    }
};

// Enhanced Search and Filter System
const SearchManager = {
    searchIndex: [],
    filters: {
        category: 'all',
        ageGroup: 'all',
        waitTime: 'all',
        status: 'all'
    },
    
    init() {
        this.buildSearchIndex();
        this.setupSearchInterface();
        this.setupFilters();
    },
    
    buildSearchIndex() {
        // Index attractions
        Object.entries(window.WaterParkApp.attractions).forEach(([key, attraction]) => {
            this.searchIndex.push({
                id: key,
                type: 'attraction',
                title: this.formatAttractionName(key),
                content: attraction.features?.join(' ') || '',
                category: 'attractions',
                data: attraction
            });
        });
        
        // Index other searchable content
        const searchableElements = document.querySelectorAll('[data-searchable]');
        searchableElements.forEach(element => {
            this.searchIndex.push({
                id: element.id || Date.now() + Math.random(),
                type: 'content',
                title: element.getAttribute('data-search-title') || element.textContent.slice(0, 50),
                content: element.textContent,
                category: element.getAttribute('data-search-category') || 'general',
                element: element
            });
        });
    },
    
    formatAttractionName(key) {
        return key.replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase())
                  .trim();
    },
    
    search(query, filters = {}) {
        if (!query || query.length < 2) {
            return this.getFilteredResults(filters);
        }
        
        const terms = query.toLowerCase().split(' ').filter(term => term.length > 1);
        
        const results = this.searchIndex.filter(item => {
            const title = item.title.toLowerCase();
            const content = item.content.toLowerCase();
            
            const matchesQuery = terms.some(term => 
                title.includes(term) || content.includes(term)
            );
            
            const matchesFilters = this.applyFilters(item, filters);
            
            return matchesQuery && matchesFilters;
        });
        
        // Sort by relevance
        return results.sort((a, b) => {
            const aScore = this.calculateRelevanceScore(a, terms);
            const bScore = this.calculateRelevanceScore(b, terms);
            return bScore - aScore;
        });
    },
    
    calculateRelevanceScore(item, terms) {
        let score = 0;
        const title = item.title.toLowerCase();
        const content = item.content.toLowerCase();
        
        terms.forEach(term => {
            if (title.includes(term)) score += 10;
            if (content.includes(term)) score += 5;
            if (title.startsWith(term)) score += 5;
        });
        
        return score;
    },
    
    applyFilters(item, filters) {
        // Apply category filter
        if (filters.category && filters.category !== 'all') {
            if (item.category !== filters.category) return false;
        }
        
        // Apply status filter for attractions
        if (filters.status && filters.status !== 'all' && item.type === 'attraction') {
            if (item.data.status !== filters.status) return false;
        }
        
        // Apply wait time filter
        if (filters.waitTime && filters.waitTime !== 'all' && item.type === 'attraction') {
            const waitTime = item.data.waitTime || 0;
            switch (filters.waitTime) {
                case 'short': return waitTime < 5;
                case 'medium': return waitTime >= 5 && waitTime < 15;
                case 'long': return waitTime >= 15;
            }
        }
        
        return true;
    },
    
    getFilteredResults(filters) {
        return this.searchIndex.filter(item => this.applyFilters(item, filters));
    },
    
    setupSearchInterface() {
        // Create search modal
        const searchModal = this.createSearchModal();
        document.body.appendChild(searchModal);
        
        // Add search trigger
        const searchTrigger = document.createElement('button');
        searchTrigger.className = 'btn btn-outline-light search-trigger';
        searchTrigger.innerHTML = '<i class="bi bi-search"></i>';
        searchTrigger.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1000;
            border-radius: 50%;
            width: 50px;
            height: 50px;
        `;
        
        searchTrigger.addEventListener('click', () => {
            this.openSearch();
        });
        
        document.body.appendChild(searchTrigger);
        
        // Keyboard shortcut (Ctrl+K or Cmd+K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
        });
    },
    
    createSearchModal() {
        const modal = document.createElement('div');
        modal.className = 'modal fade search-modal';
        modal.id = 'searchModal';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="search-input-container w-100">
                            <input type="text" class="form-control search-input" 
                                   placeholder="Search attractions, facilities, or information..."
                                   id="searchInput">
                            <i class="bi bi-search search-icon"></i>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="search-filters mb-3">
                            <div class="row">
                                <div class="col-md-3">
                                    <select class="form-select" id="categoryFilter">
                                        <option value="all">All Categories</option>
                                        <option value="attractions">Attractions</option>
                                        <option value="facilities">Facilities</option>
                                        <option value="events">Events</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <select class="form-select" id="statusFilter">
                                        <option value="all">All Status</option>
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <select class="form-select" id="waitTimeFilter">
                                        <option value="all">Any Wait Time</option>
                                        <option value="short">Short (< 5 min)</option>
                                        <option value="medium">Medium (5-15 min)</option>
                                        <option value="long">Long (15+ min)</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <button class="btn btn-outline-secondary w-100" onclick="SearchManager.clearFilters()">
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="search-results" id="searchResults">
                            <div class="text-center text-muted py-4">
                                <i class="bi bi-search display-4"></i>
                                <p>Start typing to search...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    },
    
    openSearch() {
        const modal = new bootstrap.Modal(document.getElementById('searchModal'));
        modal.show();
        
        // Focus search input
        setTimeout(() => {
            document.getElementById('searchInput').focus();
        }, 300);
        
        this.setupSearchEventListeners();
        PerformanceTracker.track('search_opened');
    },
    
    setupSearchEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const statusFilter = document.getElementById('statusFilter');
        const waitTimeFilter = document.getElementById('waitTimeFilter');
        
        const performSearch = () => {
            const query = searchInput.value;
            const filters = {
                category: categoryFilter.value,
                status: statusFilter.value,
                waitTime: waitTimeFilter.value
            };
            
            const results = this.search(query, filters);
            this.displaySearchResults(results, query);
            
            PerformanceTracker.track('search_performed', {
                query,
                filters,
                resultCount: results.length
            });
        };
        
        // Debounced search
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(performSearch, 300);
        });
        
        // Filter changes
        [categoryFilter, statusFilter, waitTimeFilter].forEach(filter => {
            filter.addEventListener('change', performSearch);
        });
    },
    
    displaySearchResults(results, query) {
        const container = document.getElementById('searchResults');
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="text-center text-muted py-4">
                    <i class="bi bi-search display-4"></i>
                    <p>No results found${query ? ` for "${query}"` : ''}</p>
                    <small>Try adjusting your search terms or filters</small>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="search-results-header mb-3">
                <small class="text-muted">${results.length} result${results.length !== 1 ? 's' : ''} found</small>
            </div>
            <div class="search-results-list">
                ${results.map(result => this.renderSearchResult(result, query)).join('')}
            </div>
        `;
    },
    
    renderSearchResult(result, query) {
        const highlightedTitle = this.highlightSearchTerms(result.title, query);
        const highlightedContent = this.highlightSearchTerms(
            result.content.slice(0, 100) + (result.content.length > 100 ? '...' : ''), 
            query
        );
        
        return `
            <div class="search-result-item" onclick="SearchManager.selectResult('${result.id}', '${result.type}')">
                <div class="search-result-header">
                    <h6 class="search-result-title">${highlightedTitle}</h6>
                    <span class="badge bg-secondary">${result.category}</span>
                </div>
                <p class="search-result-content">${highlightedContent}</p>
                ${result.type === 'attraction' ? `
                    <div class="search-result-meta">
                        <span class="status-indicator ${result.data.status}"></span>
                        <small>${result.data.status} ${result.data.waitTime ? `• ${result.data.waitTime} min wait` : ''}</small>
                    </div>
                ` : ''}
            </div>
        `;
    },
    
    highlightSearchTerms(text, query) {
        if (!query) return text;
        
        const terms = query.toLowerCase().split(' ').filter(term => term.length > 1);
        let highlightedText = text;
        
        terms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
        });
        
        return highlightedText;
    },
    
    selectResult(id, type) {
        PerformanceTracker.track('search_result_selected', { id, type });
        
        if (type === 'attraction') {
            this.showAttractionFromSearch(id);
        } else if (type === 'content') {
            this.scrollToContent(id);
        }
        
        // Close search modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('searchModal'));
        if (modal) modal.hide();
    },
    
    showAttractionFromSearch(attractionId) {
        const attraction = window.WaterParkApp.attractions[attractionId];
        if (attraction) {
            showAttractionDetails(this.formatAttractionName(attractionId));
        }
    },
    
    scrollToContent(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight element briefly
            element.style.outline = '3px solid var(--glow-blue)';
            element.style.outlineOffset = '5px';
            
            setTimeout(() => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            }, 2000);
        }
    },
    
    clearFilters() {
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('statusFilter').value = 'all';
        document.getElementById('waitTimeFilter').value = 'all';
        
        // Trigger search update
        const event = new Event('change');
        document.getElementById('categoryFilter').dispatchEvent(event);
    }
};

// Initialize all enhanced systems
function initializeEnhancedSystems() {
    AnalyticsManager.init();
    PWAManager.init();
    SearchManager.init();
    
    console.log('🚀 All enhanced systems initialized');
}

// Call enhanced systems initialization after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancedSystems);
} else {
    initializeEnhancedSystems();
}

// Export enhanced functions for global access
window.EnvironmentalSystem = EnvironmentalSystem;
window.NotificationSystem = NotificationSystem;
window.PerformanceTracker = PerformanceTracker;
window.AccessibilityManager = AccessibilityManager;
window.AnalyticsManager = AnalyticsManager;
window.SearchManager = SearchManager;
window.handleEmergencyAlert = handleEmergencyAlert;
window.shareEvent = shareEvent;