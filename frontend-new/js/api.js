/**
 * MrCream API Client
 * Connects to the .NET Core backend API
 */

// API Configuration
// Automatically detects environment and uses the appropriate API URL
const API_CONFIG = {
    // Auto-detect environment
    baseUrl: (() => {
        const hostname = window.location.hostname;

        // If running on localhost, use development API
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'https://localhost:7001/api';
        }

        // For production, use the same domain with /api path
        // This assumes your API is hosted at yourdomain.com/api
        const protocol = window.location.protocol;
        return `${protocol}//${hostname}/api`;
    })(),

    headers: {
        'Content-Type': 'application/json'
    }
};

/**
 * Generic API request handler with error handling
 */
async function apiRequest(endpoint, options = {}) {
    try {
        const url = `${API_CONFIG.baseUrl}${endpoint}`;
        const config = {
            headers: { ...API_CONFIG.headers },
            ...options
        };

        // Merge custom headers with default headers
        if (options.headers) {
            config.headers = { ...config.headers, ...options.headers };
        }

        const response = await fetch(url, config);

        if (!response.ok) {
            // Log detailed error for debugging (server-side should also log)
            console.error('[API Error]', {
                endpoint,
                status: response.status,
                statusText: response.statusText,
                timestamp: new Date().toISOString()
            });

            // Throw user-friendly error
            const errorMessage = response.status >= 500
                ? 'Server error. Please try again later.'
                : response.status === 404
                ? 'Resource not found.'
                : response.status === 401 || response.status === 403
                ? 'Authentication required.'
                : 'Request failed. Please try again.';

            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        // Don't expose internal error details to user
        if (error.message && !error.message.includes('fetch')) {
            throw error;
        }
        throw new Error('Unable to connect. Please check your internet connection.');
    }
}

// ============================================
// WATER PARK API
// ============================================

/**
 * Get all water park attractions
 */
async function getWaterParkAttractions() {
    return await apiRequest('/waterpark/attractions');
}

/**
 * Get available ticket types and pricing
 */
async function getWaterParkTickets() {
    return await apiRequest('/waterpark/tickets');
}

/**
 * Get water park information and operating hours
 */
async function getWaterParkInfo() {
    return await apiRequest('/waterpark/info');
}

/**
 * Get event packages (birthday, school, corporate)
 */
async function getWaterParkEvents() {
    return await apiRequest('/waterpark/events');
}

/**
 * Get real-time park capacity status
 */
async function getWaterParkCapacity() {
    return await apiRequest('/waterpark/capacity');
}

/**
 * Book water park tickets
 * @param {Object} bookingData - Booking details
 */
async function bookWaterParkTickets(bookingData) {
    return await apiRequest('/waterpark/book', {
        method: 'POST',
        body: JSON.stringify(bookingData)
    });
}

// ============================================
// YOGHURT API
// ============================================

/**
 * Get all yoghurt flavours
 */
async function getYoghurtFlavours() {
    return await apiRequest('/yoghurt/flavours');
}

/**
 * Get specific yoghurt flavour by ID
 * @param {number} id - Flavour ID
 */
async function getYoghurtFlavour(id) {
    return await apiRequest(`/yoghurt/flavours/${id}`);
}

/**
 * Place yoghurt order
 * @param {Object} orderData - Order details
 */
async function orderYoghurt(orderData) {
    return await apiRequest('/yoghurt/order', {
        method: 'POST',
        body: JSON.stringify(orderData)
    });
}

/**
 * Get nutritional information for yoghurt products
 */
async function getYoghurtNutrition() {
    return await apiRequest('/yoghurt/nutrition');
}

/**
 * Get store locations where yoghurt is available
 */
async function getYoghurtStores() {
    return await apiRequest('/yoghurt/stores');
}

// ============================================
// LIQUEUR API (18+ Age Gated)
// ============================================

/**
 * Verify user age (18+)
 * @param {Object} ageData - Age verification data
 * @returns {Object} Response with verification token
 */
async function verifyAge(ageData) {
    return await apiRequest('/liqueur/verify-age', {
        method: 'POST',
        body: JSON.stringify(ageData)
    });
}

/**
 * Get liqueur products (requires age verification token)
 * @param {string} token - Age verification token
 */
async function getLiqueurProducts(token) {
    return await apiRequest('/liqueur/products', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

/**
 * Get cocktail recipes (requires age verification token)
 * @param {string} token - Age verification token
 */
async function getLiqueurCocktails(token) {
    return await apiRequest('/liqueur/cocktails', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

/**
 * Get serving guide for liqueur products
 * @param {string} token - Age verification token
 */
async function getLiqueurServingGuide(token) {
    return await apiRequest('/liqueur/serving-guide', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

/**
 * Place liqueur order
 * @param {Object} orderData - Order details
 * @param {string} token - Age verification token
 */
async function orderLiqueur(orderData, token) {
    // Include VerificationToken in the request body
    const orderWithToken = {
        ...orderData,
        VerificationToken: token
    };

    return await apiRequest('/liqueur/order', {
        method: 'POST',
        body: JSON.stringify(orderWithToken)
    });
}

/**
 * Get responsible drinking information
 * Note: This endpoint does not require age verification
 */
async function getResponsibleDrinking() {
    return await apiRequest('/liqueur/responsible-drinking');
}

// ============================================
// QUOTES API
// ============================================

/**
 * Submit a quote request
 * @param {Object} quoteData - Quote request data
 */
async function submitQuote(quoteData) {
    return await apiRequest('/quotes', {
        method: 'POST',
        body: JSON.stringify(quoteData)
    });
}

/**
 * Get quote status by ID
 * @param {string} quoteId - Quote ID
 */
async function getQuoteStatus(quoteId) {
    return await apiRequest(`/quotes/${quoteId}`);
}

// ============================================
// HEALTH CHECK
// ============================================

/**
 * Check if API is running
 */
async function healthCheck() {
    return await apiRequest('/health');
}

// ============================================
// ANALYTICS (Optional)
// ============================================

/**
 * Send analytics data to backend
 * @param {Object} analyticsData - Analytics data
 */
function sendAnalytics(analyticsData) {
    // Using sendBeacon for analytics (doesn't wait for response)
    const url = `${API_CONFIG.baseUrl}/analytics`;
    const data = JSON.stringify(analyticsData);

    if (navigator.sendBeacon) {
        navigator.sendBeacon(url, data);
    }
}

// ============================================
// EXPORTS
// ============================================

// Make API functions available globally
window.MrCreamAPI = {
    // Configuration
    config: API_CONFIG,

    // Water Park
    waterpark: {
        getAttractions: getWaterParkAttractions,
        getTickets: getWaterParkTickets,
        getInfo: getWaterParkInfo,
        getEvents: getWaterParkEvents,
        getCapacity: getWaterParkCapacity,
        book: bookWaterParkTickets
    },

    // Yoghurt
    yoghurt: {
        getFlavours: getYoghurtFlavours,
        getFlavour: getYoghurtFlavour,
        order: orderYoghurt,
        getNutrition: getYoghurtNutrition,
        getStores: getYoghurtStores
    },

    // Liqueur (18+)
    liqueur: {
        verifyAge: verifyAge,
        getProducts: getLiqueurProducts,
        getCocktails: getLiqueurCocktails,
        getServingGuide: getLiqueurServingGuide,
        order: orderLiqueur,
        getResponsibleDrinking: getResponsibleDrinking
    },

    // Quotes
    quotes: {
        submit: submitQuote,
        getStatus: getQuoteStatus
    },

    // Utilities
    healthCheck: healthCheck,
    sendAnalytics: sendAnalytics
};
