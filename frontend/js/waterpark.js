// Fixed MrCream Water Park JavaScript - Compatible Version

// Global water park state
window.WaterParkApp = {
    currentCapacity: 65,
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
        waterSlides: { status: 'open', capacity: 60, waitTime: 12 }
    }
};

// Simple notification system
const SimpleNotificationSystem = {
    showNotification: function(title, message, type = 'info') {
        // Create a simple alert-style notification
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            max-width: 400px;
        `;
        notification.innerHTML = `
            <strong>${title}</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
};

// Initialize water park functionality
function initializeWaterPark() {
    console.log('🏊‍♂️ Initializing Water Park...');
    
    // Initialize capacity display
    updateCapacityDisplay();
    
    // Load dynamic content
    loadAttractions();
    loadTickets();
    loadEvents();
    
    // Start live updates
    setInterval(updateLiveData, 30000);
    
    console.log('✅ Water Park initialized successfully!');
}

// Update capacity display
function updateCapacityDisplay() {
    const capacityFill = document.getElementById('capacity-fill');
    const capacityText = document.getElementById('capacity-text');
    const currentVisitors = document.getElementById('current-visitors');
    
    if (capacityFill) {
        capacityFill.style.width = `${window.WaterParkApp.currentCapacity}%`;
    }
    
    if (capacityText) {
        capacityText.textContent = `${window.WaterParkApp.currentVisitors} / ${window.WaterParkApp.maxCapacity} visitors`;
    }
    
    if (currentVisitors) {
        currentVisitors.textContent = `${window.WaterParkApp.currentVisitors} visitors`;
    }
}

// Load attractions data
function loadAttractions() {
    const attractionsData = [
        {
            id: 'adult-pool',
            name: 'Adult Swimming Pool',
            description: 'Olympic-sized pool with wave generation system',
            icon: '🏊‍♂️',
            features: ['Wave pool sessions', 'Lap swimming lanes', 'Deep diving section']
        },
        {
            id: 'kids-zone',
            name: 'Kids Splash Zone',
            description: 'Safe and fun water playground for children',
            icon: '🎠',
            features: ['Mini slides', 'Water fountains', 'Shallow pools']
        },
        {
            id: 'vip-pool',
            name: 'VIP Pool Experience',
            description: 'Exclusive pool area with premium amenities',
            icon: '👑',
            features: ['Private cabanas', 'Dedicated staff', 'Premium refreshments']
        },
        {
            id: 'water-slides',
            name: 'Thrill Slides',
            description: 'Heart-pumping water slides for adrenaline seekers',
            icon: '🎢',
            features: ['Spiral slides', 'Racing lanes', 'Tube rides']
        }
    ];
    
    const container = document.getElementById('attractions-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    attractionsData.forEach((attraction, index) => {
        const col = document.createElement('div');
        col.className = 'col-lg-6 col-xl-3 mb-4';
        
        col.innerHTML = `
            <div class="attraction-card">
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
                    <div class="attraction-status mt-3">
                        <span class="status-dot open"></span>
                        <small>Open • No wait</small>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Load tickets data
function loadTickets() {
    const ticketsData = [
        {
            id: 'day-pass',
            name: 'Day Pass',
            description: 'Full day access to all standard attractions',
            price: '₦5,000',
            icon: '🎟️',
            includes: ['All pools access', 'Standard slides', 'Changing rooms', 'Parking']
        },
        {
            id: 'family-package',
            name: 'Family Package',
            description: 'Perfect for families of 4 with special discounts',
            price: '₦15,000',
            icon: '👨‍👩‍👧‍👦',
            includes: ['All attractions', 'Family cabana', 'Lunch vouchers', 'Free parking'],
            featured: true
        },
        {
            id: 'vip-experience',
            name: 'VIP Experience',
            description: 'Premium access with exclusive benefits',
            price: '₦20,000',
            icon: '⭐',
            includes: ['VIP pool access', 'Private cabana', 'Complimentary meals', 'Priority service']
        }
    ];
    
    const container = document.getElementById('tickets-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    ticketsData.forEach((ticket, index) => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 mb-4';
        
        col.innerHTML = `
            <div class="ticket-card ${ticket.featured ? 'featured' : ''}">
                <div class="ticket-icon">${ticket.icon}</div>
                <h4 class="ticket-name">${ticket.name}</h4>
                <p class="ticket-description">${ticket.description}</p>
                <div class="ticket-price">${ticket.price}</div>
                <ul class="ticket-includes">
                    ${ticket.includes.map(item => `<li><i class="bi bi-check-circle"></i> ${item}</li>`).join('')}
                </ul>
                <button class="btn btn-book-ticket" onclick="handleTicketBooking('${ticket.name}', '${ticket.price}')">
                    Book Now
                </button>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Load events data
function loadEvents() {
    const eventsData = [
        {
            id: 'birthday-party',
            name: 'Birthday Parties',
            description: 'Make birthdays unforgettable with our special party packages',
            icon: '🎂',
            price: '₦80,000'
        },
        {
            id: 'corporate-events',
            name: 'Corporate Events',
            description: 'Team building and corporate retreats',
            icon: '💼',
            price: '₦500,000'
        },
        {
            id: 'school-excursions',
            name: 'School Excursions',
            description: 'Educational and fun experiences for schools',
            icon: '🎒',
            price: '₦3,000/student'
        }
    ];
    
    const container = document.getElementById('events-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    eventsData.forEach((event, index) => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 mb-4';
        
        col.innerHTML = `
            <div class="event-card">
                <div class="event-icon">${event.icon}</div>
                <h4 class="event-name">${event.name}</h4>
                <p class="event-description">${event.description}</p>
                <div class="event-price">From ${event.price}</div>
                <button class="btn btn-primary-waterpark w-100" onclick="handleEventInquiry('${event.name}')">
                    Get Quote
                </button>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Update live data
function updateLiveData() {
    // Simulate capacity changes
    const change = (Math.random() - 0.5) * 10;
    window.WaterParkApp.currentCapacity = Math.max(20, Math.min(95, 
        window.WaterParkApp.currentCapacity + change));
    
    window.WaterParkApp.currentVisitors = Math.round(
        (window.WaterParkApp.currentCapacity / 100) * window.WaterParkApp.maxCapacity
    );
    
    updateCapacityDisplay();
}

// Show ticket modal
function showTicketModal() {
    const modal = new bootstrap.Modal(document.getElementById('ticketModal'));
    modal.show();
    
    // Populate modal content
    document.getElementById('ticket-booking-content').innerHTML = `
        <div class="row">
            <div class="col-md-8 mx-auto">
                <form id="ticketForm">
                    <div class="mb-3">
                        <label for="guestName" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="guestName" required>
                    </div>
                    <div class="mb-3">
                        <label for="guestEmail" class="form-label">Email</label>
                        <input type="email" class="form-control" id="guestEmail" required>
                    </div>
                    <div class="mb-3">
                        <label for="visitDate" class="form-label">Visit Date</label>
                        <input type="date" class="form-control" id="visitDate" required>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="adults" class="form-label">Adults</label>
                            <select class="form-select" id="adults">
                                <option value="1">1 Adult</option>
                                <option value="2">2 Adults</option>
                                <option value="3">3 Adults</option>
                                <option value="4">4 Adults</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="children" class="form-label">Children</label>
                            <select class="form-select" id="children">
                                <option value="0">No Children</option>
                                <option value="1">1 Child</option>
                                <option value="2">2 Children</option>
                                <option value="3">3 Children</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary-waterpark w-100">Book Tickets</button>
                </form>
            </div>
        </div>
    `;
    
    // Handle form submission
    document.getElementById('ticketForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const bookingRef = 'WP' + Date.now().toString().slice(-6);
        SimpleNotificationSystem.showNotification(
            'Booking Confirmed!', 
            `Your booking reference: ${bookingRef}`, 
            'success'
        );
        modal.hide();
    });
}

// Handle ticket booking
function handleTicketBooking(ticketName, ticketPrice) {
    SimpleNotificationSystem.showNotification(
        'Ticket Selected', 
        `${ticketName} for ${ticketPrice}. Click "Book Tickets Now" to continue.`, 
        'info'
    );
}

// Handle event inquiry
function handleEventInquiry(eventName) {
    SimpleNotificationSystem.showNotification(
        'Event Inquiry', 
        `Thank you for your interest in ${eventName}. Our team will contact you within 24 hours.`, 
        'success'
    );
}

// Check capacity
function checkCapacity() {
    const capacity = window.WaterParkApp.currentCapacity;
    const visitors = window.WaterParkApp.currentVisitors;
    
    let message;
    let type;
    
    if (capacity < 70) {
        message = `Great time to visit! Currently ${visitors} visitors (${Math.round(capacity)}% capacity)`;
        type = 'success';
    } else if (capacity < 85) {
        message = `Moderate crowds. Currently ${visitors} visitors (${Math.round(capacity)}% capacity)`;
        type = 'warning';
    } else {
        message = `Near capacity! Currently ${visitors} visitors (${Math.round(capacity)}% capacity)`;
        type = 'danger';
    }
    
    SimpleNotificationSystem.showNotification('Live Capacity Check', message, type);
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
        // Fallback
        const url = window.location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url);
            SimpleNotificationSystem.showNotification(
                'Link Copied!', 
                'Share link copied to clipboard', 
                'success'
            );
        } else {
            SimpleNotificationSystem.showNotification(
                'Share Link', 
                window.location.href, 
                'info'
            );
        }
    }
}

// Emergency contact
function showEmergencyContact() {
    SimpleNotificationSystem.showNotification(
        'Emergency Contact', 
        'Call: +234 XXX XXX XXXX or visit the main entrance security desk', 
        'danger'
    );
}

// Performance tracking (simplified)
const SimpleTracker = {
    track: function(event, data) {
        console.log(`📊 Event: ${event}`, data);
        // In production, send to analytics service
    }
};

// Simple accessibility helpers
const SimpleAccessibility = {
    increaseFontSize: function() {
        const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const newSize = Math.min(currentSize * 1.1, 24);
        document.documentElement.style.fontSize = newSize + 'px';
        SimpleNotificationSystem.showNotification('Accessibility', 'Font size increased', 'info');
    },
    
    toggleHighContrast: function() {
        document.body.classList.toggle('high-contrast');
        SimpleNotificationSystem.showNotification('Accessibility', 'High contrast toggled', 'info');
    }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌊 MrCream Water Park Loading...');
    
    try {
        // Initialize core functionality
        initializeWaterPark();
        
        // Track page load
        SimpleTracker.track('page_loaded', {
            page: 'waterpark',
            timestamp: new Date().toISOString()
        });
        
        console.log('✅ Water Park loaded successfully!');
        
        // Welcome message
        setTimeout(() => {
            SimpleNotificationSystem.showNotification(
                'Welcome!', 
                'Welcome to MrCream Water Park - Where Every Drop is a Splash of Joy!', 
                'success'
            );
        }, 2000);
        
    } catch (error) {
        console.error('❌ Failed to initialize Water Park:', error);
        SimpleNotificationSystem.showNotification(
            'Loading Error', 
            'Some features may not work properly. Please refresh the page.', 
            'danger'
        );
    }
});

// Export functions for global access
window.showTicketModal = showTicketModal;
window.checkCapacity = checkCapacity;
window.shareWaterPark = shareWaterPark;
window.showEmergencyContact = showEmergencyContact;
window.handleTicketBooking = handleTicketBooking;
window.handleEventInquiry = handleEventInquiry;
window.SimpleAccessibility = SimpleAccessibility;

console.log('🏊‍♂️ Water Park JavaScript loaded successfully!');