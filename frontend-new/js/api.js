/**
 * MrCream API Client
 * Connects to the .NET Core backend API
 */

// API Configuration
const API_CONFIG = {
    // Development URL - change this to your production URL when deploying to SolidCP
    baseUrl: 'https://localhost:7001/api',

    // Production URL (uncomment when deploying)
    // baseUrl: 'https://yourdomain.com/api',

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
            headers: API_CONFIG.headers,
            ...options
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Request Failed:', error);
        throw error;
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
            ...API_CONFIG.headers,
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
            ...API_CONFIG.headers,
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
            ...API_CONFIG.headers,
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
    return await apiRequest('/liqueur/order', {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
            ...API_CONFIG.headers,
            'Authorization': `Bearer ${token}`
        }
    });
}

/**
 * Get responsible drinking information
 * @param {string} token - Age verification token
 */
async function getResponsibleDrinking(token) {
    return await apiRequest('/liqueur/responsible-drinking', {
        headers: {
            ...API_CONFIG.headers,
            'Authorization': `Bearer ${token}`
        }
    });
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

    // Utilities
    healthCheck: healthCheck,
    sendAnalytics: sendAnalytics
};
