/**
 * DISABLE SCROLL ANIMATIONS
 * Prevents blank sections when scrolling
 */

(function() {
    'use strict';

    // Disable all scroll-triggered animations
    function disableScrollAnimations() {
        // Make all elements visible immediately
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.transform = 'none';
        });

        // Disable Intersection Observer if it exists
        if (window.IntersectionObserver) {
            const OriginalIntersectionObserver = window.IntersectionObserver;
            window.IntersectionObserver = function(callback, options) {
                // Call the callback immediately for all elements
                return new OriginalIntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        // Make the element always appear as intersecting
                        entry.isIntersecting = true;
                        entry.intersectionRatio = 1;
                    });
                    callback(entries, observer);
                }, options);
            };
        }

        // Disable AOS (Animate On Scroll) library if present
        if (window.AOS) {
            window.AOS.init = function() {};
            window.AOS.refresh = function() {};
        }

        // Disable ScrollReveal if present
        if (window.ScrollReveal) {
            window.ScrollReveal = function() {
                return {
                    reveal: function() {},
                    sync: function() {}
                };
            };
        }

        // Remove animation classes
        const animatedElements = document.querySelectorAll(
            '.fade-in, .slide-in, .zoom-in, [class*="animate-"], [data-aos], .reveal'
        );
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.transform = 'none';
            el.style.animation = 'none';
        });
    }

    // Run immediately
    disableScrollAnimations();

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', disableScrollAnimations);
    }

    // Run after page load
    window.addEventListener('load', disableScrollAnimations);

    // Monitor for dynamically added elements
    const observer = new MutationObserver(() => {
        disableScrollAnimations();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('✅ Scroll animations disabled - all content visible');
})();
