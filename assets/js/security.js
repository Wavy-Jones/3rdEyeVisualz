// ========================================
// SECURITY UTILITIES
// ========================================
// Rate limiting, reCAPTCHA, and spam prevention

/**
 * Rate Limiter Class
 * Prevents users from submitting forms too frequently
 */
class RateLimiter {
    constructor() {
        this.storage = window.localStorage;
        this.prefix = '3rdEyeVisualz_ratelimit_';
    }

    /**
     * Check if action is rate limited
     * @param {string} actionName - Name of the action (e.g., 'contact_form')
     * @returns {Object} { allowed: boolean, remainingTime: number }
     */
    checkLimit(actionName) {
        const config = window.APP_CONFIG.forms;
        const key = this.prefix + actionName;
        const now = Date.now();

        // Get submission history
        const historyData = this.storage.getItem(key);
        const history = historyData ? JSON.parse(historyData) : [];

        // Clean up old entries (older than 1 hour)
        const oneHourAgo = now - (60 * 60 * 1000);
        const recentSubmissions = history.filter(timestamp => timestamp > oneHourAgo);

        // Check if exceeded max submissions per hour
        if (recentSubmissions.length >= config.maxSubmissionsPerHour) {
            const oldestSubmission = Math.min(...recentSubmissions);
            const remainingTime = Math.ceil((oldestSubmission + (60 * 60 * 1000) - now) / 1000 / 60);

            return {
                allowed: false,
                remainingTime: remainingTime,
                message: `Too many submissions. Please wait ${remainingTime} minute(s) before trying again.`
            };
        }

        // Check cooldown period (time since last submission)
        if (recentSubmissions.length > 0) {
            const lastSubmission = Math.max(...recentSubmissions);
            const timeSinceLastSubmission = now - lastSubmission;
            const cooldownMs = config.cooldownMinutes * 60 * 1000;

            if (timeSinceLastSubmission < cooldownMs) {
                const remainingTime = Math.ceil((cooldownMs - timeSinceLastSubmission) / 1000 / 60);

                return {
                    allowed: false,
                    remainingTime: remainingTime,
                    message: `Please wait ${remainingTime} minute(s) before submitting again.`
                };
            }
        }

        return { allowed: true };
    }

    /**
     * Record a submission
     * @param {string} actionName - Name of the action
     */
    recordSubmission(actionName) {
        const key = this.prefix + actionName;
        const now = Date.now();

        // Get existing history
        const historyData = this.storage.getItem(key);
        const history = historyData ? JSON.parse(historyData) : [];

        // Add current submission
        history.push(now);

        // Clean up old entries
        const oneHourAgo = now - (60 * 60 * 1000);
        const recentSubmissions = history.filter(timestamp => timestamp > oneHourAgo);

        // Save back to storage
        this.storage.setItem(key, JSON.stringify(recentSubmissions));
    }

    /**
     * Clear rate limit for testing
     * @param {string} actionName - Name of the action
     */
    clearLimit(actionName) {
        const key = this.prefix + actionName;
        this.storage.removeItem(key);
    }
}

/**
 * reCAPTCHA Integration
 */
class ReCaptcha {
    constructor() {
        this.loaded = false;
        this.siteKey = window.APP_CONFIG.recaptcha.siteKey;
        this.enabled = window.APP_CONFIG.recaptcha.enabled;
    }

    /**
     * Load reCAPTCHA script
     */
    loadScript() {
        if (this.loaded || !this.enabled) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
            script.async = true;
            script.defer = true;

            script.onload = () => {
                this.loaded = true;
                resolve();
            };

            script.onerror = () => {
                reject(new Error('Failed to load reCAPTCHA'));
            };

            document.head.appendChild(script);
        });
    }

    /**
     * Execute reCAPTCHA
     * @param {string} action - Action name (e.g., 'contact_form')
     * @returns {Promise<string>} reCAPTCHA token
     */
    async execute(action) {
        if (!this.enabled) {
            console.info('reCAPTCHA is disabled');
            return null;
        }

        try {
            await this.loadScript();

            return new Promise((resolve, reject) => {
                grecaptcha.ready(() => {
                    grecaptcha.execute(this.siteKey, { action })
                        .then(token => resolve(token))
                        .catch(error => reject(error));
                });
            });
        } catch (error) {
            console.error('reCAPTCHA execution failed:', error);
            return null;
        }
    }
}

/**
 * Simple honeypot field checker
 * Invisible field that bots will fill but humans won't
 */
function checkHoneypot(formElement) {
    const honeypotField = formElement.querySelector('input[name="website"]');

    if (!honeypotField) {
        // Create honeypot field if it doesn't exist
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.style.position = 'absolute';
        honeypot.style.left = '-9999px';
        honeypot.style.width = '1px';
        honeypot.style.height = '1px';
        honeypot.setAttribute('tabindex', '-1');
        honeypot.setAttribute('autocomplete', 'off');
        honeypot.setAttribute('aria-hidden', 'true');
        formElement.appendChild(honeypot);
        return true;
    }

    // If honeypot is filled, it's likely a bot
    return honeypotField.value === '';
}

/**
 * Validate form submission security
 * @param {HTMLFormElement} formElement - Form element
 * @param {string} actionName - Action name for rate limiting
 * @returns {Promise<Object>} Validation result
 */
async function validateFormSubmission(formElement, actionName) {
    // Check honeypot
    if (!checkHoneypot(formElement)) {
        return {
            valid: false,
            reason: 'security',
            message: 'Security check failed. Please try again.'
        };
    }

    // Check rate limiting
    const rateLimitCheck = window.RateLimiter.checkLimit(actionName);
    if (!rateLimitCheck.allowed) {
        return {
            valid: false,
            reason: 'rate_limit',
            message: rateLimitCheck.message
        };
    }

    // Execute reCAPTCHA (if enabled)
    let recaptchaToken = null;
    if (window.APP_CONFIG.recaptcha.enabled) {
        try {
            recaptchaToken = await window.ReCaptchaService.execute(actionName);
        } catch (error) {
            console.error('reCAPTCHA failed:', error);
            // Don't block submission if reCAPTCHA fails
        }
    }

    return {
        valid: true,
        recaptchaToken: recaptchaToken
    };
}

// Initialize global instances
window.RateLimiter = new RateLimiter();
window.ReCaptchaService = new ReCaptcha();
window.SecurityUtils = {
    validateFormSubmission,
    checkHoneypot,
    recordSubmission: (actionName) => window.RateLimiter.recordSubmission(actionName)
};

console.log('✓ Security utilities initialized');
