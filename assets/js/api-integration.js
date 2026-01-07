// ========================================
// API INTEGRATION FOR NOTIFICATIONS
// ========================================
// Uses configuration from config.js for security
// Uses toast notifications instead of alerts for better UX

/**
 * Send notification via Notifications API
 * @param {Object} data - Notification payload
 * @returns {Promise} API response
 */
async function sendNotification(data) {
    try {
        const config = window.APP_CONFIG.api;

        const response = await fetch(`${config.baseUrl}${config.endpoints.sendNotification}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': config.apiKey
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
            throw new Error(errorData.detail || 'Failed to send notification');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Notification API Error:', error);

        // If API is not available (development mode), log and continue
        if (window.APP_CONFIG.isDevelopment && error.message.includes('fetch')) {
            console.warn('API not available - running in development mode');
            return { success: true, message: 'Development mode - no email sent' };
        }

        throw error;
    }
}

/**
 * Handle Contact Form Submission
 * @param {Object} formData - Contact form data
 * @param {HTMLButtonElement} submitButton - Submit button element for loading state
 * @returns {Promise} Submission result
 */
async function handleContactFormSubmission(formData, submitButton = null) {
    try {
        const businessEmail = window.APP_CONFIG.business.email;
        const businessName = window.APP_CONFIG.business.name;

        // Show loading state
        if (submitButton) {
            submitButton.classList.add('btn-loading');
            submitButton.disabled = true;
        }

        // Prepare notification payload
        const notificationPayload = {
            channels: ["email"],
            recipients: [
                {
                    email: businessEmail,
                    name: businessName
                }
            ],
            subject: `New Contact Form Submission - ${formData.service}`,
            body: `
New contact form submission received:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Service: ${formData.service}

Message:
${formData.message}

---
Sent from ${businessName} Website Contact Form
            `,
            priority: "normal",
            metadata: {
                source: "contact_form",
                service_type: formData.service,
                customer_name: formData.name,
                customer_email: formData.email
            }
        };

        // Send notification
        const result = await sendNotification(notificationPayload);

        // Track form submission in analytics
        if (window.Analytics) {
            window.Analytics.trackFormSubmission('contact_form', formData);
        }

        // Show success toast
        window.showSuccess(
            'Message Sent Successfully!',
            `Thank you, ${formData.name}! We'll get back to you soon at ${formData.email}.`
        );

        return result;
    } catch (error) {
        console.error('Error sending contact form:', error);

        // Show error toast
        window.showError(
            'Submission Failed',
            'There was an error submitting your message. Please try again or contact us directly.'
        );

        throw error;
    } finally {
        // Remove loading state
        if (submitButton) {
            submitButton.classList.remove('btn-loading');
            submitButton.disabled = false;
        }
    }
}

/**
 * Handle Booking Form Submission
 * @param {Object} formData - Booking form data
 * @param {HTMLButtonElement} submitButton - Submit button element for loading state
 * @returns {Promise} Submission result
 */
async function handleBookingFormSubmission(formData, submitButton = null) {
    try {
        const businessEmail = window.APP_CONFIG.business.email;
        const businessName = window.APP_CONFIG.business.name;
        const businessPhone = window.APP_CONFIG.business.phone;

        // Show loading state
        if (submitButton) {
            submitButton.classList.add('btn-loading');
            submitButton.disabled = true;
        }

        // Format the date nicely
        const bookingDate = new Date(formData.date);
        const formattedDate = bookingDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Notification to business owner
        const businessNotification = {
            channels: ["email"],
            recipients: [
                {
                    email: businessEmail,
                    name: businessName
                }
            ],
            subject: `🎉 NEW BOOKING REQUEST - ${formData.service}`,
            body: `
📸 NEW PHOTOGRAPHY BOOKING REQUEST

Client Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Booking Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Service: ${formData.service}
Date: ${formattedDate}
Time: ${formData.time}
Location: ${formData.location}
Duration: ${formData.duration}
Budget Range: ${formData.budget}
Number of Guests: ${formData.guests || 'Not specified'}

Special Requirements:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ ACTION REQUIRED: Contact client within 24 hours
📧 Reply to: ${formData.email}
📱 Call: ${formData.phone}
            `,
            priority: "high",
            metadata: {
                source: "booking_form",
                service_type: formData.service,
                booking_date: formData.date,
                customer_name: formData.name,
                customer_email: formData.email,
                customer_phone: formData.phone
            }
        };

        // Notification to customer (confirmation)
        const customerNotification = {
            channels: ["email"],
            recipients: [
                {
                    email: formData.email,
                    name: formData.name
                }
            ],
            subject: "✅ Booking Request Received - 3rdEye Visualz",
            body: `
Dear ${formData.name},

Thank you for choosing 3rdEye Visualz for your photography needs!

We've received your booking request with the following details:

Booking Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Service: ${formData.service}
Date: ${formattedDate}
Time: ${formData.time}
Location: ${formData.location}
Duration: ${formData.duration}

What Happens Next?
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Our team will review your request
✓ We'll contact you within 24 hours via email or phone
✓ We'll discuss your vision and finalize the details
✓ Once confirmed, you'll receive a booking confirmation

Have Questions?
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: ${businessEmail}
Phone: ${businessPhone}

We're excited to capture your special moments!

Best regards,
${businessName} Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated confirmation. Please do not reply to this email.
            `,
            priority: "normal",
            metadata: {
                source: "booking_confirmation",
                service_type: formData.service,
                booking_date: formData.date,
                customer_name: formData.name
            }
        };

        // Send both notifications
        const [businessResult, customerResult] = await Promise.all([
            sendNotification(businessNotification),
            sendNotification(customerNotification)
        ]);

        // Track booking in analytics
        if (window.Analytics) {
            window.Analytics.trackFormSubmission('booking_form', formData);
            window.Analytics.trackBooking(formData.service, formData.date);
        }

        // Show success toast
        window.showSuccess(
            'Booking Request Received!',
            `Thank you, ${formData.name}!\n\nYour ${formData.service} session for ${formattedDate} has been received.\n\nWe'll contact you within 24 hours to confirm.\n\n📧 Check your email for details.`
        );

        return { businessResult, customerResult };
    } catch (error) {
        console.error('Error sending booking:', error);

        // Show error toast
        window.showError(
            'Booking Submission Failed',
            `There was an error submitting your booking. Please try again or contact us directly at ${window.APP_CONFIG.business.email}`
        );

        throw error;
    } finally {
        // Remove loading state
        if (submitButton) {
            submitButton.classList.remove('btn-loading');
            submitButton.disabled = false;
        }
    }
}

// Export functions for use in other scripts
window.NotificationsAPI = {
    handleContactFormSubmission,
    handleBookingFormSubmission
};
