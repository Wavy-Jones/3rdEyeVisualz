// ==========================================
// PARTIAL LOADER
// ==========================================
// This script dynamically loads HTML partials into the main index.html file
// Making it easier to manage and edit individual sections

(function() {
    'use strict';

    // Map of container IDs to their corresponding partial files
    const partials = {
        'header-container': 'partials/header.html',
        'hero-container': 'partials/hero.html',
        'service-selection-container': 'partials/service-selection.html',
        'portfolio-container': 'partials/portfolio.html',
        'lightbox-container': 'partials/lightbox.html',
        'services-container': 'partials/services.html',
        'about-container': 'partials/about.html',
        'testimonials-container': 'partials/testimonials.html',
        'contact-form-container': 'partials/contact-form.html',
        'footer-container': 'partials/footer.html',
        'booking-modal-container': 'partials/booking-modal.html'
    };

    // Counter to track loaded partials
    let loadedCount = 0;
    const totalPartials = Object.keys(partials).length;

    // Function to load a single partial
    function loadPartial(containerId, partialPath) {
        const container = document.getElementById(containerId);

        if (!container) {
            console.warn(`Container not found: ${containerId}`);
            checkAllLoaded();
            return;
        }

        fetch(partialPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${partialPath}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                loadedCount++;
                checkAllLoaded();
            })
            .catch(error => {
                console.error(`Error loading ${partialPath}:`, error);
                loadedCount++;
                checkAllLoaded();
            });
    }

    // Function to check if all partials are loaded
    function checkAllLoaded() {
        if (loadedCount === totalPartials) {
            // Dispatch custom event when all partials are loaded
            const event = new CustomEvent('partialsLoaded');
            document.dispatchEvent(event);
            console.log('✅ All partials loaded successfully!');
        }
    }

    // Load all partials when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            Object.keys(partials).forEach(containerId => {
                loadPartial(containerId, partials[containerId]);
            });
        });
    } else {
        // DOM already loaded
        Object.keys(partials).forEach(containerId => {
            loadPartial(containerId, partials[containerId]);
        });
    }
})();
