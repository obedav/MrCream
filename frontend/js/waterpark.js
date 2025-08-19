// MrCream Water Park JavaScript Functions - Complete Version

// Global water park state
window.WaterParkApp = {
    currentCapacity: 65, // percentage
    maxCapacity: 500,
    currentVisitors: 325,
    weatherCondition: 'sunny',
    operatingHours: {
        weekday: { open: '10:00', close: '18:00' },
        weekend: { open: '09:00', close: '19:00' }
    },
    attractions: {
        adultPool: { status: 'open', capacity: 85, waitTime: 5 },
        kidsZone: { status: 'open', capacity: 45, waitTime: 0 },
        vipPool: { status: 'available', capacity: 20, waitTime: 0 },
        merryGoRound: { status: 'open', capacity: 60, waitTime: 10 }
    }
};

// Initialize water park functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeWaterPark();
});

function initializeWaterPark() {
    console.log('🏊‍♂️ Initializing Water Park...');
    
    initializeLiveCapacity();
    initializeAttractionCards();
    initializeTicketBooking();
    initializeEventBooking();
    initializeWeatherUpdates();
    initializeOperatingHours();
    initializeAnimations();
    loadAttractions();
    loadTickets();
    loadEvents();
    
    // Update live data every 30 seconds
    setInterval(updateLiveData, 30000);
    
    console.log('✅ Water Park initialized successfully!');
}

// Live capacity monitoring
function initializeLiveCapacity() {
    updateCapacityDisplay();
    
    // Update current visitors display
    const visitorsElement = document.getElementById('current-visitors');
    if (visitorsElement) {
        visitorsElement.textContent = `${window.WaterParkApp.currentVisitors} visitors`;
    }
    
    // Simulate capacity changes
    setInterval(() => {
        // Random capacity fluctuation (±5%)
        const change = (Math.random() - 0.5) * 10;
        window.WaterParkApp.currentCapacity = Math.max(0, Math.min(100, 
            window.WaterParkApp.currentCapacity + change));
        
        window.WaterParkApp.currentVisitors = Math.round(
            (window.WaterParkApp.currentCapacity / 100) * window.WaterParkApp.maxCapacity
        );
        
        updateCapacityDisplay();
    }, 15000);
}

function updateCapacityDisplay() {
    const capacityFill = document.querySelector('.capacity-fill, #capacity-fill');
    const capacityStatus = document.querySelector('.capacity-status');
    const capacityText = document.getElementById('capacity-text');
    const currentVisitors = document.getElementById('current-visitors');
    const liveIndicators = document.querySelectorAll('.live-indicator');

    
    if (capacityFill) {
        capacityFill.style.width = `${window.WaterParkApp.currentCapacity}%`;
    }
    
    if (capacityText) {
        capacityText.textContent = `${window.WaterParkApp.currentVisitors} / ${window.WaterParkApp.maxCapacity} visitors`;
    }
    
    if (currentVisitors) {
        currentVisitors.textContent = `${window.WaterParkApp.currentVisitors} visitors`;
    }
    
    if (capacityStatus) {
        const capacity = window.WaterParkApp.currentCapacity;
        if (capacity < 70) {
            capacityStatus.textContent = 'Safe Levels';
            capacityStatus.className = 'capacity-status safe';
            capacityStatus.style.color = '#2527a0';
        } else if (capacity < 85) {
            capacityStatus.textContent = 'Moderate';
            capacityStatus.className = 'capacity-status moderate';
            capacityStatus.style.color = '#FFA502';
        } else {
            capacityStatus.textContent = 'Near Capacity';
            capacityStatus.className = 'capacity-status full';
            capacityStatus.style.color = '#FF4757';
        }
    }
    
    // Animate live indicators
    liveIndicators.forEach(indicator => {
        indicator.style.animation = 'pulse-red 2s infinite';
    });
}

// Load attractions dynamically
function loadAttractions() {
    const attractionsData = [
        {
            id: 'adult-pool',
            name: 'Adult Swimming Pool',
            description: 'Olympic-sized pool with wave generation system for the ultimate swimming experience',
            icon: '🏊‍♂️',
            features: ['Wave pool sessions', 'Lap swimming lanes', 'Deep diving section', 'Poolside loungers'],
            age: 'Ages 16+',
            capacity: '150 guests'
        },
        {
            id: 'kids-zone',
            name: 'Kids Splash Zone',
            description: 'Safe and fun water playground designed specially for children',
            icon: '🎠',
            features: ['Mini slides', 'Water fountains', 'Shallow pools', 'Lifeguard supervised'],
            age: 'Ages 3-12',
            capacity: '80 children'

        },
        {
            id: 'vip-pool',
            name: 'VIP Pool Experience',
            description: 'Exclusive pool area with premium amenities and personalized service',
            icon: '👑',
            features: ['Private cabanas', 'Dedicated staff', 'Premium refreshments', 'Heated pool'],
            age: 'All ages',
            capacity: '30 guests'
        },
        {
            id: 'water-slides',
            name: 'Thrill Slides',
            description: 'Heart-pumping water slides for adrenaline seekers',
            icon: '🎢',
            features: ['Spiral slides', 'Racing lanes', 'Tube rides', 'Height variations'],
            age: 'Ages 10+',
            capacity: '50 riders/hour'
        },
        {
            id: 'lazy-river',
            name: 'Lazy River',
            description: 'Relax and float along our scenic lazy river',
            icon: '🏖️',
            features: ['Gentle current', 'Scenic route', 'Tube rentals', 'Refreshment stops'],
            age: 'All ages',
            capacity: '100 guests'
        },
        {
            id: 'food-court',
            name: 'Poolside Dining',
            description: 'Delicious meals and MrCream treats by the pool',
            icon: '🍔',
            features: ['MrCream Yoghurt Bar', 'Grilled items', 'Fresh juices', 'Snacks & treats'],
            age: 'All ages',
            capacity: 'Open seating'
        }
    ];
    
    const container = document.getElementById('attractions-grid');
    if (!container) return;
    
    
    // Clear loading state
    container.innerHTML = '';
    
    attractionsData.forEach((attraction, index) => {
        const card = createAttractionCard(attraction, index);
        container.appendChild(card);
    });
}

function createAttractionCard(attraction, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    col.style.opacity = '0';
    col.style.transform = 'translateY(30px)';
    
    col.innerHTML = `
        <div class="attraction-card" data-attraction="${attraction.id}">
            <div class="attraction-image">
                ${attraction.icon}
                <span class="attraction-badge">Popular</span>
            </div>
            <div class="attraction-info">
                <h4 class="attraction-name">${attraction.name}</h4>
                <p class="attraction-description">${attraction.description}</p>
                <ul class="attraction-features">
                    ${attraction.features.map(f => `<li><i class="bi bi-check-circle"></i> ${f}</li>`).join('')}
                </ul>
                <div class="attraction-meta">
                    <span class="age-restriction">${attraction.age}</span>
                    <span class="capacity-info-card">${attraction.capacity}</span>
                </div>
                <div class="attraction-status mt-3">
                    <span class="status-dot open"></span>
                    <small>Open • No wait</small>
                </div>
            </div>
        </div>
    `;
    
    // Animate in with delay
    setTimeout(() => {
        col.style.transition = 'all 0.6s ease';
        col.style.opacity = '1';
        col.style.transform = 'translateY(0)';
    }, index * 100);
    
    return col;
}

// Load tickets dynamically
function loadTickets() {
    const ticketsData = [
        {
            id: 'day-pass',
            name: 'Day Pass',
            description: 'Full day access to all standard attractions',
            price: '₦5,000',
            icon: '🎟️',
            validity: 'Valid for one day',
            includes: ['All pools access', 'Standard slides', 'Changing rooms', 'Parking'],
            featured: false
        },
        {
            id: 'family-package',
            name: 'Family Package',
            description: 'Perfect for families of 4 with special discounts',
            price: '₦15,000',
            icon: '👨‍👩‍👧‍👦',
            validity: '2 Adults + 2 Children',
            includes: ['All attractions', 'Family cabana', 'Lunch vouchers', 'Free parking'],
            featured: true
        },
        {
            id: 'vip-experience',
            name: 'VIP Experience',
            description: 'Premium access with exclusive benefits',
            price: '₦20,000',
            icon: '⭐',
            validity: 'Full day VIP access',
            includes: ['VIP pool access', 'Private cabana', 'Complimentary meals', 'Priority service'],
            featured: false
        }
    ];
    
    const container = document.getElementById('tickets-grid');
    if (!container) return;
    
    // Clear loading state
    container.innerHTML = '';
    
    ticketsData.forEach((ticket, index) => {
        const card = createTicketCard(ticket, index);
        container.appendChild(card);
    });
}

function createTicketCard(ticket, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    col.style.opacity = '0';
    col.style.transform = 'translateY(30px)';
    
    col.innerHTML = `
        <div class="ticket-card ${ticket.featured ? 'featured' : ''}">
            <div class="ticket-icon">${ticket.icon}</div>
            <h4 class="ticket-name">${ticket.name}</h4>
            <p class="ticket-description">${ticket.description}</p>
            <div class="ticket-price">${ticket.price}</div>
            <p class="ticket-validity">${ticket.validity}</p>
            <ul class="ticket-includes">
                ${ticket.includes.map(item => `<li><i class="bi bi-check-circle"></i> ${item}</li>`).join('')}
            </ul>
            <button class="btn btn-book-ticket" onclick="showTicketBookingModal('${ticket.name}', '${ticket.price}')">
                Book Now
            </button>
        </div>
    `;
    
    // Animate in with delay
    setTimeout(() => {
        col.style.transition = 'all 0.6s ease';
        col.style.opacity = '1';
        col.style.transform = 'translateY(0)';
    }, index * 100);
    
    return col;
}

// Load events dynamically
function loadEvents() {
    const eventsData = [
        {
            id: 'birthday-party',
            name: 'Birthday Parties',
            description: 'Make birthdays unforgettable with our special party packages',
            icon: '🎂',
            details: {
                duration: '4 hours',
                guests: 'Up to 30',
                includes: ['Dedicated party area', 'Decorations', 'Birthday cake', 'Party host', 'Games & activities']
            },
            price: '₦80,000'
        },
        {
            id: 'corporate-events',
            name: 'Corporate Events',
            description: 'Team building and corporate retreats in a fun environment',
            icon: '💼',
            details: {
                duration: 'Full day',
                guests: '50-200',
                includes: ['Exclusive areas', 'Team activities', 'Meeting spaces', 'Catering options', 'AV equipment']
            },
            price: '₦500,000'
        },
        {
            id: 'school-excursions',
            name: 'School Excursions',
            description: 'Educational and fun water park experiences for schools',
            icon: '🎒',
            details: {
                duration: '5 hours',
                guests: '30-100 students',
                includes: ['Safety briefing', 'Guided tours', 'Educational programs', 'Lunch packages', 'Teacher passes']
            },
            price: '₦3,000/student'
        }
    ];
    
    const container = document.getElementById('events-grid');
    if (!container) return;
    
    // Clear loading state
    container.innerHTML = '';
    
    eventsData.forEach((event, index) => {
        const card = createEventCard(event, index);
        container.appendChild(card);
    });
}

function createEventCard(event, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    col.style.opacity = '0';
    col.style.transform = 'translateY(30px)';
    
    col.innerHTML = `
        <div class="event-card">
            <div class="event-icon">${event.icon}</div>
            <h4 class="event-name">${event.name}</h4>
            <p class="event-description">${event.description}</p>
            <div class="event-details">
                <div class="event-detail-row">
                    <strong>Duration:</strong>
                    <span>${event.details.duration}</span>
                </div>
                <div class="event-detail-row">
                    <strong>Capacity:</strong>
                    <span>${event.details.guests}</span>
                </div>
            </div>
            <ul class="event-includes">
                ${event.details.includes.map(item => `<li><i class="bi bi-check-circle"></i> ${item}</li>`).join('')}
            </ul>
            <div class="event-price">From ${event.price}</div>
            <button class="btn btn-primary-waterpark w-100" onclick="showEventBookingModal('${event.name}', '${event.price}')">
                Get Quote
            </button>
        </div>
    `;
    
    // Animate in with delay
    setTimeout(() => {
        col.style.transition = 'all 0.6s ease';
        col.style.opacity = '1';
        col.style.transform = 'translateY(0)';
    }, index * 100);
    
    return col;
}

// Attraction cards with live status
function initializeAttractionCards() {
    updateAttractionStatus();
    
    // Add click handlers for attraction cards
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.attraction-card, .floating-attraction-card');
        if (card) {
            const attractionName = card.querySelector('.attraction-name, h5')?.textContent;
            if (attractionName) {
                showAttractionDetails(attractionName);
            }
        }
    });
    
    // Add hover effects
    document.addEventListener('mouseenter', function(e) {
        const card = e.target.closest('.attraction-card, .floating-attraction-card');
        if (card) {
            showCapacityTooltip(card);
        }
    }, true);
    
    document.addEventListener('mouseleave', function(e) {
        const card = e.target.closest('.attraction-card, .floating-attraction-card');
        if (card) {
            hideCapacityTooltip();
        }
    }, true);
}

function updateAttractionStatus() {
    const attractions = window.WaterParkApp.attractions;
    
    Object.keys(attractions).forEach(key => {
        const attraction = attractions[key];
        const statusDots = document.querySelectorAll(`[data-attraction="${key}"] .status-dot`);
        const statusTexts = document.querySelectorAll(`[data-attraction="${key}"] .attraction-status small`);
        
        statusDots.forEach(dot => {
            dot.className = `status-dot ${attraction.status}`;
        });
        
        statusTexts.forEach(text => {
            if (attraction.waitTime > 0) {
                text.textContent = `${attraction.waitTime} min wait`;
            } else {
                text.textContent = 'No wait';
            }
        });
    });
}

function showAttractionDetails(attractionName) {
    const modal = createAttractionModal(attractionName);
    document.body.appendChild(modal);
    
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    // Remove modal when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

// Event booking functionality
function initializeEventBooking() {
    // Event delegation for dynamically loaded event cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.event-card .btn')) {
            const eventCard = e.target.closest('.event-card');
            if (eventCard) {
                const eventName = eventCard.querySelector('.event-name').textContent;
                const eventPrice = eventCard.querySelector('.event-price').textContent;
                showEventBookingModal(eventName, eventPrice);
            }
        }
    });
}

function showEventBookingModal(eventName, eventPrice) {
    const modal = createEventBookingModal(eventName, eventPrice);
    document.body.appendChild(modal);
    
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

function createEventBookingModal(eventName, eventPrice) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="bi bi-calendar-event me-2"></i>
                        Book ${eventName}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-info">
                        <i class="bi bi-info-circle me-2"></i>
                        Event: <strong>${eventName}</strong> - Starting from <strong>${eventPrice}</strong>
                    </div>
                    
                    <form id="eventBookingForm">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="eventContactName" class="form-label">Contact Name *</label>
                                <input type="text" class="form-control" id="eventContactName" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="eventContactEmail" class="form-label">Email Address *</label>
                                <input type="email" class="form-control" id="eventContactEmail" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="eventContactPhone" class="form-label">Phone Number *</label>
                                <input type="tel" class="form-control" id="eventContactPhone" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="eventDate" class="form-label">Preferred Date *</label>
                                <input type="date" class="form-control" id="eventDate" required min="${new Date().toISOString().split('T')[0]}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="guestCount" class="form-label">Expected Guests *</label>
                                <select class="form-select" id="guestCount" required>
                                    <option value="">Select guest count</option>
                                    <option value="10-20">10-20 guests</option>
                                    <option value="21-50">21-50 guests</option>
                                    <option value="51-100">51-100 guests</option>
                                    <option value="100+">100+ guests</option>
                                </select>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="eventDuration" class="form-label">Duration</label>
                                <select class="form-select" id="eventDuration">
                                    <option value="2-hours">2 hours</option>
                                    <option value="4-hours" selected>4 hours</option>
                                    <option value="full-day">Full day</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="eventRequirements" class="form-label">Special Requirements</label>
                            <textarea class="form-control" id="eventRequirements" rows="4" 
                                      placeholder="Please describe your event requirements, catering needs, decorations, special activities, etc."></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Add-on Services</h6>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="catering">
                                    <label class="form-check-label" for="catering">
                                        Catering Services
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="decorations">
                                    <label class="form-check-label" for="decorations">
                                        Decorations
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="photography">
                                    <label class="form-check-label" for="photography">
                                        Photography Service
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h6>Preferred Areas</h6>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="vipArea">
                                    <label class="form-check-label" for="vipArea">
                                        VIP Pool Area
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="kidsArea">
                                    <label class="form-check-label" for="kidsArea">
                                        Kids Zone
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="entirePark">
                                    <label class="form-check-label" for="entirePark">
                                        Entire Park (Premium)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" form="eventBookingForm" class="btn btn-primary-waterpark">
                        <i class="bi bi-send me-2"></i>
                        Submit Inquiry
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const form = modal.querySelector('#eventBookingForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleEventInquiry(this, eventName);
    });
    
    return modal;
}

async function handleEventInquiry(form, eventName) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const inquiryRef = 'EV' + Date.now().toString().slice(-6);
        
        showSuccessMessage(`📞 Inquiry submitted! Reference: ${inquiryRef}. Our events team will contact you within 24 hours.`);
        
        const modal = bootstrap.Modal.getInstance(form.closest('.modal'));
        modal.hide();
        
    } catch (error) {
        showErrorMessage('Failed to submit inquiry. Please try again or call us directly.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Weather updates and operating status
function initializeWeatherUpdates() {
    updateWeatherStatus();
    
    // Update weather every 10 minutes
    setInterval(updateWeatherStatus, 600000);
}

function updateWeatherStatus() {
    const weatherConditions = ['sunny', 'partly-cloudy', 'cloudy', 'light-rain'];
    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    
    window.WaterParkApp.weatherCondition = randomWeather;
    
    // Update weather-dependent messaging
    updateOperatingStatus();
}

function updateOperatingStatus() {
    const weather = window.WaterParkApp.weatherCondition;
    const statusElements = document.querySelectorAll('.operating-status');
    
    statusElements.forEach(element => {
        if (weather === 'light-rain') {
            element.innerHTML = `
                <div class="alert alert-warning">
                    <i class="bi bi-cloud-rain me-2"></i>
                    <strong>Weather Update:</strong> Light rain detected. Some outdoor attractions may be temporarily closed for safety.
                </div>
            `;
        } else {
            element.innerHTML = `
                <div class="alert alert-success">
                    <i class="bi bi-sun me-2"></i>
                    <strong>Perfect Weather:</strong> All attractions are open and operating normally!
                </div>
            `;
        }
    });
}

// Operating hours display
function initializeOperatingHours() {
    updateOperatingHoursDisplay();
}

function updateOperatingHoursDisplay() {
    const now = new Date();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    const hours = isWeekend ? 
        window.WaterParkApp.operatingHours.weekend : 
        window.WaterParkApp.operatingHours.weekday;
    
    const hoursElements = document.querySelectorAll('.operating-hours');
    hoursElements.forEach(element => {
        element.textContent = `${hours.open} - ${hours.close}`;
    });
    
    // Add current status
    const statusElements = document.querySelectorAll('.current-status');
    const currentHour = now.getHours();
    const openHour = parseInt(hours.open.split(':')[0]);
    const closeHour = parseInt(hours.close.split(':')[0]);
    
    statusElements.forEach(element => {
        if (currentHour >= openHour && currentHour < closeHour) {
            element.innerHTML = '<span class="text-success fw-bold">Currently Open</span>';
        } else {
            element.innerHTML = '<span class="text-danger fw-bold">Currently Closed</span>';
        }
    });
}

// Animation initialization
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.attraction-card, .ticket-card, .event-card, .safety-item, .facility-item');
    animateElements.forEach(el => observer.observe(el));
}

// Update live data
function updateLiveData() {
    updateCapacityDisplay();
    updateAttractionStatus();
    updateOperatingHoursDisplay();
    
    console.log('🔄 Live data updated');
}

// Check capacity function
function checkCapacity() {
    const capacity = window.WaterParkApp.currentCapacity;
    const visitors = window.WaterParkApp.currentVisitors;
    const maxCapacity = window.WaterParkApp.maxCapacity;
    
    let status, message;
    if (capacity < 70) {
        status = 'success';
        message = `✅ Great time to visit! Currently ${visitors} of ${maxCapacity} visitors (${Math.round(capacity)}% capacity)`;
    } else if (capacity < 85) {
        status = 'warning';
        message = `⚠️ Moderate crowds. Currently ${visitors} of ${maxCapacity} visitors (${Math.round(capacity)}% capacity)`;
    } else {
        status = 'danger';
        message = `🚨 Near capacity! Currently ${visitors} of ${maxCapacity} visitors (${Math.round(capacity)}% capacity). Consider visiting later.`;
    }
    
    showCapacityAlert(status, message);
}

function showCapacityAlert(status, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${status} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-5`;
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '350px';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Utility functions
function downloadTicket(bookingRef) {
    // Simulate ticket download
    const ticketData = {
        reference: bookingRef,
        date: new Date().toISOString(),
        park: 'MrCream Water Park'
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ticketData, null, 2));
    const downloadElement = document.createElement('a');
    downloadElement.setAttribute("href", dataStr);
    downloadElement.setAttribute("download", `MrCream-Ticket-${bookingRef}.json`);
    downloadElement.click();
    
    showInfoMessage('📄 Ticket downloaded! Present this at the entrance along with your ID.');
}

function bookAttraction(attractionName) {
    showInfoMessage(`🎫 To book ${attractionName}, please purchase a park ticket first. All attractions are included with admission!`);
}

// Message display functions
function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'danger');
}

function showInfoMessage(message) {
    showMessage(message, 'info');
}

function showMessage(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-5`;
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '350px';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Share functionality
function shareWaterPark() {
    if (navigator.share) {
        navigator.share({
            title: 'MrCream Water Park',
            text: 'Join me at MrCream Water Park - Where Every Drop is a Splash of Joy!',
            url: window.location.href
        });
    } else {
        // Fallback for browsers without Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        showSuccessMessage('📋 Link copied to clipboard! Share with your friends.');
    }
}

// Emergency contact
function showEmergencyContact() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        Emergency Contact
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-3">
                        <i class="bi bi-telephone-fill text-danger" style="font-size: 3rem;"></i>
                        <h4 class="mt-3">Emergency Hotline</h4>
                    </div>
                    
                    <div class="d-grid gap-2">
                        <a href="tel:+2348032354952" class="btn btn-danger btn-lg">
                            <i class="bi bi-telephone me-2"></i>
                            Call Now: +234 803 235 4952
                        </a>
                        <button class="btn btn-outline-danger" onclick="requestFirstAid()">
                            <i class="bi bi-heart-pulse me-2"></i>
                            Request First Aid
                        </button>
                    </div>
                    
                    <div class="mt-3">
                        <small class="text-muted">
                            <strong>Location:</strong> Main entrance security desk<br>
                            <strong>Response Time:</strong> 2-3 minutes<br>
                            <strong>Available:</strong> During operating hours
                        </small>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

function requestFirstAid() {
    showSuccessMessage('🚨 First aid has been notified. Please remain calm and stay where you are. Help is on the way!');
    
    // You could integrate with real emergency systems here
    console.log('🚨 First aid request submitted at:', new Date().toISOString());
}

// Initialize global functions
window.downloadTicket = downloadTicket;
window.bookAttraction = bookAttraction;
window.shareWaterPark = shareWaterPark;
window.showEmergencyContact = showEmergencyContact;
window.requestFirstAid = requestFirstAid;
window.showTicketModal = showTicketModal;
window.showTicketBookingModal = showTicketBookingModal;
window.showEventBookingModal = showEventBookingModal;
window.checkCapacity = checkCapacity;

// Export for other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WaterParkApp: window.WaterParkApp,
        initializeWaterPark,
        updateLiveData
    };
}

console.log('🏊‍♂️ Water Park functionality loaded successfully!');

function createAttractionModal(attractionName) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="bi bi-water me-2"></i>
                        ${attractionName}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h6>Current Status</h6>
                            <div class="d-flex align-items-center mb-3">
                                <div class="status-dot open me-2"></div>
                                <span class="text-success fw-bold">Open & Available</span>
                            </div>
                            
                            <h6>Wait Time</h6>
                            <p class="text-primary fw-bold mb-3">5 minutes</p>
                            
                            <h6>Capacity</h6>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-success" style="width: 60%"></div>
                            </div>
                            <small class="text-muted">Currently 60% full</small>
                        </div>
                        <div class="col-md-6">
                            <h6>Safety Information</h6>
                            <ul class="list-unstyled">
                                <li><i class="bi bi-check-circle text-success me-2"></i>Lifeguard on duty</li>
                                <li><i class="bi bi-check-circle text-success me-2"></i>First aid available</li>
                                <li><i class="bi bi-check-circle text-success me-2"></i>Safety equipment ready</li>
                            </ul>
                            
                            <h6>Age Requirements</h6>
                            <p class="text-muted">All ages welcome. Children under 12 must be supervised.</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary-waterpark" onclick="bookAttraction('${attractionName}')">
                        <i class="bi bi-ticket-perforated me-2"></i>
                        Book Visit
                    </button>
                </div>
            </div>
        </div>
    `;
    return modal;
}

function showCapacityTooltip(element) {
    const tooltip = document.createElement('div');
    tooltip.className = 'capacity-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <strong>Live Capacity</strong>
            <div class="mini-meter">
                <div class="mini-fill" style="width: 60%"></div>
            </div>
            <small>60% Full • 5 min wait</small>
        </div>
    `;
    
    tooltip.style.cssText = `
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.8rem;
        z-index: 1000;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(tooltip);
}

function hideCapacityTooltip() {
    const tooltips = document.querySelectorAll('.capacity-tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
}

// Ticket booking functionality
function initializeTicketBooking() {
    // Event delegation for dynamically loaded buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-book-ticket')) {
            const ticketCard = e.target.closest('.ticket-card');
            if (ticketCard) {
                const ticketName = ticketCard.querySelector('.ticket-name').textContent;
                const ticketPrice = ticketCard.querySelector('.ticket-price').textContent;
                showTicketBookingModal(ticketName, ticketPrice);
            }
        }
    });
}

function showTicketModal() {
    showTicketBookingModal('Day Pass', '₦5,000');
}

function showTicketBookingModal(ticketName, ticketPrice) {
    const modal = createTicketBookingModal(ticketName, ticketPrice);
    document.body.appendChild(modal);
    
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    // Initialize form in modal
    const form = modal.querySelector('#ticketBookingForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleTicketBooking(this, ticketName, ticketPrice);
    });
    
    // Remove modal when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

function createTicketBookingModal(ticketName, ticketPrice) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="bi bi-ticket-perforated me-2"></i>
                        Book ${ticketName}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-info">
                        <i class="bi bi-info-circle me-2"></i>
                        Selected: <strong>${ticketName}</strong> - <strong>${ticketPrice}</strong>
                    </div>
                    
                    <form id="ticketBookingForm">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="bookingName" class="form-label">Full Name *</label>
                                <input type="text" class="form-control" id="bookingName" name="bookingName" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="bookingEmail" class="form-label">Email Address *</label>
                                <input type="email" class="form-control" id="bookingEmail" name="bookingEmail" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="bookingPhone" class="form-label">Phone Number *</label>
                                <input type="tel" class="form-control" id="bookingPhone" name="bookingPhone" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="visitDate" class="form-label">Visit Date *</label>
                                <input type="date" class="form-control" id="visitDate" name="visitDate" required min="${new Date().toISOString().split('T')[0]}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="adultTickets" class="form-label">Adults</label>
                                <select class="form-select" id="adultTickets" name="adultTickets">
                                    <option value="1" selected>1 Adult</option>
                                    <option value="2">2 Adults</option>
                                    <option value="3">3 Adults</option>
                                    <option value="4">4 Adults</option>
                                    <option value="5">5+ Adults</option>
                                </select>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="childTickets" class="form-label">Children (Under 12)</label>
                                <select class="form-select" id="childTickets" name="childTickets">
                                    <option value="0" selected>No Children</option>
                                    <option value="1">1 Child</option>
                                    <option value="2">2 Children</option>
                                    <option value="3">3 Children</option>
                                    <option value="4">4+ Children</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="specialRequests" class="form-label">Special Requests</label>
                            <textarea class="form-control" id="specialRequests" rows="3" 
                                      placeholder="Any special requirements, dietary needs, or accessibility requests..."></textarea>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="agreeTerms" required>
                            <label class="form-check-label" for="agreeTerms">
                                I agree to the terms and conditions and safety guidelines.
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" form="ticketBookingForm" class="btn btn-primary-waterpark">
                        <i class="bi bi-credit-card me-2"></i>
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    `;
    return modal;
}

async function handleTicketBooking(form, ticketName, ticketPrice) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    try {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate booking reference
        const bookingRef = 'WP' + Date.now().toString().slice(-6);
        
        // Success
        showSuccessMessage(`🎉 Booking confirmed! Your reference: ${bookingRef}`);
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(form.closest('.modal'));
        modal.hide();
        
        // Show booking confirmation
        setTimeout(() => {
            showBookingConfirmation(bookingRef, ticketName, formData);
        }, 500);
        
    } catch (error) {
        console.error('Booking error:', error);
        showErrorMessage('Booking failed. Please try again or contact us directly.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

function showBookingConfirmation(bookingRef, ticketName, formData) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">
                        <i class="bi bi-check-circle me-2"></i>
                        Booking Confirmed!
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-4">
                        <i class="bi bi-ticket-perforated text-success" style="font-size: 3rem;"></i>
                        <h4 class="mt-3">Welcome to MrCream Water Park!</h4>
                        <p class="text-muted">Your booking has been successfully confirmed.</p>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <h6>Booking Details</h6>
                            <table class="table table-borderless">
                                <tr>
                                    <td><strong>Reference:</strong></td>
                                    <td>${bookingRef}</td>
                                </tr>
                                <tr>
                                    <td><strong>Ticket:</strong></td>
                                    <td>${ticketName}</td>
                                </tr>
                                <tr>
                                    <td><strong>Name:</strong></td>
                                    <td>${formData.get('bookingName')}</td>
                                </tr>
                                <tr>
                                    <td><strong>Visit Date:</strong></td>
                                    <td>${new Date(formData.get('visitDate')).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>Guests:</strong></td>
                                    <td>${formData.get('adultTickets')} Adults, ${formData.get('childTickets')} Children</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-6">
                            <h6>What's Next?</h6>
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <i class="bi bi-envelope text-primary me-2"></i>
                                    Confirmation email sent to ${formData.get('bookingEmail')}
                                </li>
                                <li class="mb-2">
                                    <i class="bi bi-phone text-primary me-2"></i>
                                    SMS reminder sent to ${formData.get('bookingPhone')}
                                </li>
                                <li class="mb-2">
                                    <i class="bi bi-geo-alt text-primary me-2"></i>
                                    Check-in at main entrance
                                </li>
                                <li class="mb-2">
                                    <i class="bi bi-clock text-primary me-2"></i>
                                    Arrive 30 minutes early
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="alert alert-warning mt-3">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        <strong>Important:</strong> Please bring a valid ID and your booking reference. 
                        Check our safety guidelines before your visit.
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary" onclick="downloadTicket('${bookingRef}')">
                        <i class="bi bi-download me-2"></i>
                        Download Ticket
                    </button>
                    <button type="button" class="btn btn-primary-waterpark" data-bs-dismiss="modal">
                        <i class="bi bi-check me-2"></i>
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}