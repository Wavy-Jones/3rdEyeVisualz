// ========================================
// ENVIRONMENT CONFIGURATION
// ========================================
// This file manages environment-specific settings
// DO NOT commit sensitive values to version control

const ENV_CONFIG = {
    // Determine environment (defaults to development)
    isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',

    // API Configuration
    // In production, these should be set via server environment variables
    api: {
        // Development: local API server
        // Production: replace with your deployed API URL
        baseUrl: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
            ? 'http://localhost:8000'
            : (window.ENV_API_URL || 'https://api.3rdeyevisualz.com'), // Replace with your actual API URL

        // API Key should be injected server-side in production
        // For now, we'll use a placeholder that can be replaced
        apiKey: window.ENV_API_KEY || 'YOUR_API_KEY_HERE',

        endpoints: {
            sendNotification: '/notifications/send'
        }
    },

    // Business Contact Information
    business: {
        name: '3rdEye Visualz',
        email: 'infntmediasolutions@gmail.com', // Primary business email
        phone: '+27721480697',
        location: 'Johannesburg, South Africa',
        instagram: '@infnt_mediasolutions',
        instagramUrl: 'https://www.instagram.com/infnt_mediasolutions',
        established: '2019',
        tagline: 'We see the invincible.'
    },

    // Analytics Configuration
    analytics: {
        // Google Analytics Measurement ID (Replace with yours)
        googleAnalyticsId: window.ENV_GA_ID || 'G-XXXXXXXXXX',
        enabled: true
    },

    // ReCAPTCHA Configuration
    recaptcha: {
        siteKey: window.ENV_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // Test key
        enabled: false // Set to true when you have a valid key
    },

    // Form Configuration
    forms: {
        maxSubmissionsPerHour: 3, // Rate limiting
        cooldownMinutes: 5 // Cooldown after submission
    },

    // Feature Flags
    features: {
        enableBookingCalendar: true,
        enableContactForm: true,
        enableAnalytics: true,
        enableRecaptcha: false, // Enable when you set up reCAPTCHA
        useToastNotifications: true
    }
};

// Freeze configuration to prevent modifications
Object.freeze(ENV_CONFIG);

// Export for use in other modules
window.APP_CONFIG = ENV_CONFIG;
