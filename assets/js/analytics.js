// ========================================
// GOOGLE ANALYTICS INTEGRATION
// ========================================
// Handles Google Analytics 4 (GA4) tracking

/**
 * Initialize Google Analytics
 */
function initGoogleAnalytics() {
    const config = window.APP_CONFIG.analytics;

    if (!config.enabled || !config.googleAnalyticsId || config.googleAnalyticsId === 'G-XXXXXXXXXX') {
        console.info('Google Analytics is disabled or not configured');
        return;
    }

    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', config.googleAnalyticsId, {
        'send_page_view': true,
        'anonymize_ip': true // GDPR compliance
    });

    console.log('✓ Google Analytics initialized');
}

/**
 * Track custom events
 * @param {string} eventName - Name of the event
 * @param {Object} eventParams - Event parameters
 */
function trackEvent(eventName, eventParams = {}) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, eventParams);
        console.log(`Tracked event: ${eventName}`, eventParams);
    }
}

/**
 * Track form submissions
 */
function trackFormSubmission(formType, formData) {
    trackEvent('form_submission', {
        'form_type': formType,
        'service_type': formData.service || 'unknown',
        'event_category': 'engagement',
        'event_label': formType
    });
}

/**
 * Track booking attempts
 */
function trackBooking(service, date) {
    trackEvent('booking_initiated', {
        'service_type': service,
        'booking_date': date,
        'event_category': 'conversion',
        'event_label': 'booking_attempt'
    });
}

/**
 * Track service selections
 */
function trackServiceSelection(service) {
    trackEvent('service_selected', {
        'service_type': service,
        'event_category': 'engagement',
        'event_label': 'service_selection'
    });
}

/**
 * Track portfolio image views
 */
function trackPortfolioView(category) {
    trackEvent('portfolio_view', {
        'portfolio_category': category,
        'event_category': 'engagement',
        'event_label': 'portfolio_interaction'
    });
}

/**
 * Track outbound link clicks
 */
function trackOutboundLink(url, linkText) {
    trackEvent('click', {
        'event_category': 'outbound',
        'event_label': url,
        'link_text': linkText,
        'transport_type': 'beacon'
    });
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGoogleAnalytics);
} else {
    initGoogleAnalytics();
}

// Export tracking functions
window.Analytics = {
    track: trackEvent,
    trackFormSubmission,
    trackBooking,
    trackServiceSelection,
    trackPortfolioView,
    trackOutboundLink
};
