/**
 * MrCream Quote Request Modal
 * Beautiful popup modal for quote requests
 */

// Create and inject modal HTML
function createQuoteModal() {
    const modalHTML = `
        <div id="quote-modal" class="modal-overlay">
            <div class="modal-container">
                <div class="modal-header">
                    <h2><i class="bi bi-clipboard-check"></i> Request a Quote</h2>
                    <p>Partner with MrCream for bulk orders & distribution</p>
                    <button class="modal-close" onclick="closeQuoteModal()" aria-label="Close">
                        <i class="bi bi-x"></i>
                    </button>
                </div>

                <div class="modal-body">
                    <form id="quote-modal-form">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md);">
                            <div class="form-group">
                                <label class="form-label">First Name *</label>
                                <input type="text" name="firstName" class="form-input" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Last Name *</label>
                                <input type="text" name="lastName" class="form-input" required>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md);">
                            <div class="form-group">
                                <label class="form-label">Email *</label>
                                <input type="email" name="email" class="form-input" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Phone *</label>
                                <input type="tel" name="phone" class="form-input" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Company/Organization</label>
                            <input type="text" name="company" class="form-input" placeholder="Your business name">
                        </div>

                        <div class="form-group">
                            <label class="form-label">Business Type *</label>
                            <select name="businessType" class="form-select" required>
                                <option value="">Select business type</option>
                                <option value="distributor">Distributor</option>
                                <option value="wholesaler">Wholesaler</option>
                                <option value="retailer">Retail Store</option>
                                <option value="supermarket">Supermarket Chain</option>
                                <option value="restaurant">Restaurant/Hotel</option>
                                <option value="event">Event Organizer</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Product Interest *</label>
                            <select name="productInterest" class="form-select" required>
                                <option value="">Select product</option>
                                <option value="yoghurt">Yoghurt Products</option>
                                <option value="liqueur">Liqueur Products</option>
                                <option value="waterpark">Water Park Partnership</option>
                                <option value="all">All Products</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Estimated Monthly Volume</label>
                            <select name="volume" class="form-select">
                                <option value="">Select volume range</option>
                                <option value="under-100">Under 100 units</option>
                                <option value="100-500">100 - 500 units</option>
                                <option value="500-1000">500 - 1,000 units</option>
                                <option value="1000-5000">1,000 - 5,000 units</option>
                                <option value="over-5000">Over 5,000 units</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Message *</label>
                            <textarea name="message" class="form-textarea" rows="4" required
                                      placeholder="Tell us about your business and requirements..."></textarea>
                        </div>

                        <div class="form-group">
                            <label style="display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer;">
                                <input type="checkbox" name="newsletter" style="width: auto;">
                                <span>Keep me updated on new products and opportunities</span>
                            </label>
                        </div>

                        <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
                            <i class="bi bi-send"></i> Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Inject modal into body if it doesn't exist
    if (!document.getElementById('quote-modal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        attachModalEventListeners();
    }
}

// Attach event listeners to modal
function attachModalEventListeners() {
    const modal = document.getElementById('quote-modal');
    const form = document.getElementById('quote-modal-form');

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeQuoteModal();
        }
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const quoteData = Object.fromEntries(formData.entries());

        // Validate email
        if (!isValidEmail(quoteData.email)) {
            showError('Please enter a valid email address.');
            return;
        }

        // Validate phone
        if (!isValidPhone(quoteData.phone)) {
            showError('Please enter a valid phone number.');
            return;
        }

        try {
            showLoading();

            // Send to analytics/backend
            window.MrCreamAPI?.sendAnalytics({
                type: 'quote_request',
                data: quoteData,
                timestamp: new Date().toISOString()
            });

            // In production, send to your backend endpoint
            // await fetch(`${window.MrCreamAPI.config.baseUrl}/contact/quote`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(quoteData)
            // });

            hideLoading();
            showSuccess('Thank you! Your quote request has been submitted. We\'ll contact you within 24 hours.');

            // Reset form and close modal
            form.reset();
            setTimeout(() => closeQuoteModal(), 2000);

        } catch (error) {
            hideLoading();
            showError('Something went wrong. Please try again or contact us directly.');
            console.error('Quote submission error:', error);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeQuoteModal();
        }
    });
}

// Open quote modal
function openQuoteModal(productType = '') {
    // Create modal if it doesn't exist
    if (!document.getElementById('quote-modal')) {
        createQuoteModal();
    }

    const modal = document.getElementById('quote-modal');
    const form = document.getElementById('quote-modal-form');

    // Pre-fill product interest if specified
    if (productType) {
        const productSelect = form.querySelector('select[name="productInterest"]');
        if (productSelect) {
            productSelect.value = productType;
        }
    }

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Focus on first input
    setTimeout(() => {
        form.querySelector('input[name="firstName"]')?.focus();
    }, 300);
}

// Close quote modal
function closeQuoteModal() {
    const modal = document.getElementById('quote-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Make functions available globally
window.openQuoteModal = openQuoteModal;
window.closeQuoteModal = closeQuoteModal;

// Initialize modal when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createQuoteModal);
} else {
    createQuoteModal();
}
