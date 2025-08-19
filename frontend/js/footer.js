// MrCream Footer JavaScript Functions

// Initialize footer functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeFooter();
});

// Main footer initialization function
function initializeFooter() {
    initializeBackToTop();
    initializeNewsletterForm();
    initializeContactForm();
    initializeCareersForm();
    initializeFooterAnimations();
    initializeModalTriggers();
    
    console.log('✅ Footer initialized successfully!');
}

// Back to top button functionality
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add a little animation
        backToTopBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            backToTopBtn.style.transform = '';
        }, 150);
    });
}

// Newsletter form functionality
function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitBtn = this.querySelector('button[type="submit"]');
        const email = emailInput.value.trim();
        
        // Validate email
        if (!isValidEmail(email)) {
            showErrorMessage('Please enter a valid email address.');
            emailInput.focus();
            return;
        }
        
        // Show loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Subscribing...';
        
        try {
            // Simulate API call to newsletter service
            await simulateNewsletterSubscription(email);
            
            // Success
            showSuccessMessage('🎉 Thank you for subscribing! Welcome to the MrCream family!');
            emailInput.value = '';
            
            // Show welcome message with benefits
            setTimeout(() => {
                showInfoMessage('You\'ll receive exclusive offers, new product updates, and special event invitations!');
            }, 2000);
            
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            showErrorMessage('Subscription failed. Please try again later.');
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // Validate required fields
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (!isValid) {
            showErrorMessage('Please fill in all required fields.');
            return;
        }
        
        // Validate email
        const email = formData.get('email');
        if (!isValidEmail(email)) {
            showErrorMessage('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
        
        try {
            // Simulate API call
            await simulateContactSubmission(formData);
            
            // Success
            showSuccessMessage('✅ Message sent successfully! We\'ll get back to you within 24 hours.');
            
            // Reset form
            this.reset();
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
            if (modal) {
                setTimeout(() => {
                    modal.hide();
                }, 2000);
            }
            
        } catch (error) {
            console.error('Contact form error:', error);
            showErrorMessage('Failed to send message. Please try again or contact us directly.');
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Careers form functionality
function initializeCareersForm() {
    const careersForm = document.getElementById('careersForm');
    
    if (!careersForm) return;
    
    careersForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const resumeFile = this.querySelector('#resume').files[0];
        
        // Validate required fields
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (!isValid) {
            showErrorMessage('Please fill in all required fields.');
            return;
        }
        
        // Validate email
        const email = formData.get('email');
        if (!isValidEmail(email)) {
            showErrorMessage('Please enter a valid email address.');
            return;
        }
        
        // Validate resume file if uploaded
        if (resumeFile) {
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            if (!allowedTypes.includes(resumeFile.type)) {
                showErrorMessage('Please upload a valid resume file (PDF, DOC, or DOCX).');
                return;
            }
            
            if (resumeFile.size > maxSize) {
                showErrorMessage('Resume file size must be less than 5MB.');
                return;
            }
        }
        
        // Show loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';
        
        try {
            // Simulate API call
            await simulateCareersSubmission(formData);
            
            // Success
            showSuccessMessage('🎯 Application submitted successfully! We\'ll review your application and contact you soon.');
            
            // Reset form
            this.reset();
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('careersModal'));
            if (modal) {
                setTimeout(() => {
                    modal.hide();
                }, 3000);
            }
            
            // Show follow-up message
            setTimeout(() => {
                showInfoMessage('💼 Keep an eye on your email for updates on your application status!');
            }, 4000);
            
        } catch (error) {
            console.error('Careers form error:', error);
            showErrorMessage('Failed to submit application. Please try again or email us directly.');
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Footer animations
function initializeFooterAnimations() {
    // Animate footer elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe footer sections
    const footerSections = document.querySelectorAll('.footer-brand, .footer-title, .contact-info');
    footerSections.forEach(section => observer.observe(section));
    
    // Stagger animation for footer links
    const footerLinkGroups = document.querySelectorAll('.footer-links');
    footerLinkGroups.forEach((group, groupIndex) => {
        const links = group.querySelectorAll('li');
        links.forEach((link, linkIndex) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                link.style.transition = 'all 0.4s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, (groupIndex * 200) + (linkIndex * 100));
        });
    });
}

// Initialize modal triggers
function initializeModalTriggers() {
    // Contact modal triggers
    const contactTriggers = document.querySelectorAll('[href="#contact"], [data-contact-trigger]');
    contactTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = new bootstrap.Modal(document.getElementById('contactModal'));
            modal.show();
        });
    });
    
    // Careers modal triggers
    const careersTriggers = document.querySelectorAll('[href="#careers"], [data-careers-trigger]');
    careersTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = new bootstrap.Modal(document.getElementById('careersModal'));
            modal.show();
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate API calls
async function simulateNewsletterSubscription(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate occasional failure for testing
            if (Math.random() > 0.9) {
                reject(new Error('Network error'));
            } else {
                resolve({ success: true, email: email });
            }
        }, 1500);
    });
}

async function simulateContactSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate occasional failure for testing
            if (Math.random() > 0.95) {
                reject(new Error('Server error'));
            } else {
                resolve({ 
                    success: true, 
                    ticketId: 'MC' + Date.now(),
                    name: formData.get('name')
                });
            }
        }, 2000);
    });
}

async function simulateCareersSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate occasional failure for testing
            if (Math.random() > 0.95) {
                reject(new Error('Upload error'));
            } else {
                resolve({ 
                    success: true, 
                    applicationId: 'APP' + Date.now(),
                    position: formData.get('position')
                });
            }
        }, 2500);
    });
}

// Social media tracking (optional analytics)
function trackSocialClick(platform) {
    console.log(`Social media click: ${platform}`);
    
    // You can integrate with analytics services here
    // Example: gtag('event', 'social_click', { platform: platform });
}

// Add click tracking to social links
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('title') || 'unknown';
            trackSocialClick(platform.toLowerCase());
        });
    });
});

// Newsletter popup (optional feature)
function showNewsletterPopup() {
    // Only show if user hasn't subscribed and hasn't dismissed
    const hasSubscribed = localStorage.getItem('mrcream_newsletter_subscribed');
    const hasDismissed = sessionStorage.getItem('mrcream_newsletter_dismissed');
    
    if (!hasSubscribed && !hasDismissed) {
        setTimeout(() => {
            const popup = document.createElement('div');
            popup.className = 'newsletter-popup';
            popup.innerHTML = `
                <div class="newsletter-popup-content">
                    <button class="newsletter-popup-close" onclick="dismissNewsletterPopup()">&times;</button>
                    <h4>🎉 Join the MrCream Family!</h4>
                    <p>Get exclusive offers and updates delivered to your inbox.</p>
                    <form id="popupNewsletterForm">
                        <input type="email" placeholder="Enter your email" required>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            `;
            
            popup.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                padding: 1.5rem;
                max-width: 300px;
                animation: slideInRight 0.3s ease;
            `;
            
            document.body.appendChild(popup);
            
            // Handle popup form submission
            const popupForm = popup.querySelector('#popupNewsletterForm');
            popupForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const email = this.querySelector('input').value;
                
                if (isValidEmail(email)) {
                    try {
                        await simulateNewsletterSubscription(email);
                        showSuccessMessage('🎉 Subscribed successfully!');
                        localStorage.setItem('mrcream_newsletter_subscribed', 'true');
                        popup.remove();
                    } catch (error) {
                        showErrorMessage('Subscription failed. Please try again.');
                    }
                }
            });
            
        }, 30000); // Show after 30 seconds
    }
}

function dismissNewsletterPopup() {
    sessionStorage.setItem('mrcream_newsletter_dismissed', 'true');
    const popup = document.querySelector('.newsletter-popup');
    if (popup) {
        popup.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
}

// Initialize newsletter popup (uncomment to enable)
// setTimeout(showNewsletterPopup, 5000);

// Export functions for global use
window.MrCreamFooter = {
    showNewsletterPopup,
    dismissNewsletterPopup,
    trackSocialClick
};

console.log('📧 Footer functionality loaded successfully!');