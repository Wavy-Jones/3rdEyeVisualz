// ========================================
// LIGHTBOX GALLERY FUNCTIONALITY
// ========================================
let currentImageIndex = 0;
let galleryImages = [];

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    // Store all gallery images
    galleryImages = Array.from(galleryItems);

    // Open lightbox when clicking on gallery images
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(img);
        });

        // Keyboard support for gallery items
        img.parentElement.setAttribute('tabindex', '0');
        img.parentElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentImageIndex = index;
                openLightbox(img);
            }
        });
    });

    function openLightbox(img) {
        const fullSizeUrl = img.getAttribute('data-src');
        const caption = img.alt;

        lightboxImg.src = fullSizeUrl;
        lightboxImg.alt = caption;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus on close button for accessibility
        closeBtn.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        openLightbox(galleryImages[currentImageIndex]);
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        openLightbox(galleryImages[currentImageIndex]);
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    });
}

// ========================================
// HAMBURGER MENU FUNCTIONALITY
// ========================================
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Update aria-expanded for accessibility
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// ========================================
// CONTACT FORM VALIDATION
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Reset previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });

        // Security validation (rate limiting, honeypot, reCAPTCHA)
        const securityCheck = await window.SecurityUtils.validateFormSubmission(form, 'contact_form');
        if (!securityCheck.valid) {
            window.showWarning('Submission Blocked', securityCheck.message);
            return;
        }

        let isValid = true;

        // Validate name
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError(name, 'Please enter your full name');
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Please enter your email address');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate phone (optional but format check if provided)
        const phone = document.getElementById('phone');
        if (phone.value.trim()) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone.value)) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }
        }

        // Validate service
        const service = document.getElementById('service');
        if (!service.value) {
            showError(service, 'Please select a service type');
            isValid = false;
        }

        // Validate message
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError(message, 'Please enter your message');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters long');
            isValid = false;
        }

        if (isValid) {
            // Form is valid - send via API
            const formData = {
                name: name.value,
                email: email.value,
                phone: phone.value,
                service: service.options[service.selectedIndex].text,
                message: message.value
            };

            // Get submit button for loading state
            const submitButton = form.querySelector('button[type="submit"]');

            // Send notification via API
            window.NotificationsAPI.handleContactFormSubmission(formData, submitButton)
                .then(() => {
                    // Record submission for rate limiting
                    window.SecurityUtils.recordSubmission('contact_form');
                    // Reset form on success
                    form.reset();
                })
                .catch((error) => {
                    console.error('Failed to submit contact form:', error);
                });
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.textContent = message;
        }
    }

    // Remove error on input
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            formGroup.classList.remove('error');
        });
    });
}

// ========================================
// SERVICE SELECTION FUNCTIONALITY
// ========================================
function handleSelection() {
    const select = document.getElementById('events');
    const selectedValue = select.value;

    if (selectedValue === '') {
        window.showWarning('Selection Required', 'Please select a type of event first!');
        return;
    }

    // Updated messages including Fashion and Real Estate
    const messages = {
        'wedding': 'Perfect! Let\'s capture your special day with romantic and timeless wedding photography. We\'ll be in touch to discuss your dream wedding shoot!',
        'pregnancy': 'Wonderful! Maternity photography is such a beautiful way to celebrate this special time. We\'ll create stunning images of this precious journey!',
        'corporate': 'Excellent choice! Professional corporate photography can elevate your business image. Let\'s discuss your corporate photography needs!',
        'kiddies': 'How exciting! Kids photography is all about capturing their natural joy and personality. We\'ll make it fun for the little ones!',
        'travel': 'Amazing! Travel photography lets us capture the world\'s beauty and your adventures. Let\'s plan your travel photography session!',
        'portrait': 'Great selection! Portrait photography is perfect for capturing personality and creating lasting memories. Let\'s create beautiful portraits!',
        'fashion': 'Fantastic! Fashion photography is all about style, creativity, and making a statement. Let\'s create stunning fashion images!',
        'real-estate': 'Perfect choice! Professional real estate photography can showcase properties in their best light. Let\'s discuss your property photography needs!'
    };

    const serviceTitles = {
        'wedding': 'Wedding Photography',
        'pregnancy': 'Maternity Photography',
        'corporate': 'Corporate Photography',
        'kiddies': 'Kids Photography',
        'travel': 'Travel Photography',
        'portrait': 'Portrait Photography',
        'fashion': 'Fashion Photography',
        'real-estate': 'Real Estate Photography'
    };

    window.showSuccess(
        serviceTitles[selectedValue] || 'Thank You!',
        messages[selectedValue] || 'Thank you for your selection! We\'ll be in touch soon to discuss your photography needs.'
    );

    // Scroll to portfolio section to show relevant work
    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });

    // Highlight the selected service type in the gallery
    highlightSelectedService(selectedValue);
}

function highlightSelectedService(serviceType) {
    // Remove any previous highlights
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.border = 'none';
        item.style.transform = '';
    });

    // Updated service map including Fashion and Real Estate
    const serviceMap = {
        'wedding': 'wedding',
        'pregnancy': 'pregnancy',
        'corporate': 'corporate',
        'kiddies': 'kiddies',
        'travel': 'travel',
        'portrait': 'portrait',
        'fashion': 'fashion',
        'real-estate': 'real-estate'
    };

    const targetCategory = serviceMap[serviceType];
    if (targetCategory) {
        const targetItem = document.querySelector(`.gallery-item[data-category="${targetCategory}"]`);
        if (targetItem) {
            targetItem.style.border = '3px solid #667eea';
            targetItem.style.transform = 'scale(1.05)';

            // Scroll the highlighted item into view
            setTimeout(() => {
                targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
    }
}

// ========================================
// SMOOTH SCROLLING & NAVIGATION
// ========================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// IMAGE LAZY LOADING ANIMATION
// ========================================
function initImageLoading() {
    const images = document.querySelectorAll('.gallery-item img, .author-image');

    images.forEach(img => {
        // Set initial opacity for animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        // If image is already cached/loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// ========================================
// SCROLL-TRIGGERED ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.gallery-item, .service-card, .testimonial-card').forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
}

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .fade-in-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ========================================
// SERVICE CARD INTERACTIVITY
// ========================================
function initServiceCards() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.setAttribute('tabindex', '0');

        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            // Scroll to contact form instead of showing alert
            const contactForm = document.getElementById('contact');
            if (contactForm) {
                contactForm.scrollIntoView({ behavior: 'smooth' });
                // Pre-select the service if possible
                setTimeout(() => {
                    const serviceSelect = document.getElementById('service');
                    if (serviceSelect && serviceName.includes('Wedding')) {
                        serviceSelect.value = 'wedding';
                    } else if (serviceName.includes('Event') || serviceName.includes('Corporate')) {
                        serviceSelect.value = 'corporate';
                    } else if (serviceName.includes('Portrait')) {
                        serviceSelect.value = 'portrait';
                    } else if (serviceName.includes('Commercial')) {
                        serviceSelect.value = 'corporate';
                    }
                }, 500);
            }
        });

        // Keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ========================================
// CALENDAR FUNCTIONALITY
// ========================================
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;

/**
 * Generate sample booked dates for demonstration
 * In production, this should fetch from your booking database/API
 */
function generateSampleBookedDates() {
    const bookedDates = [];
    const today = new Date();

    // Generate some random booked dates in the next 60 days
    for (let i = 0; i < 8; i++) {
        const daysAhead = Math.floor(Math.random() * 60) + 1;
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + daysAhead);

        const dateString = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

        if (!bookedDates.includes(dateString)) {
            bookedDates.push(dateString);
        }
    }

    return bookedDates;
}

/**
 * Generate sample booked time slots
 * In production, this should fetch from your booking database/API
 */
function generateSampleBookedTimeSlots() {
    const slots = {};
    const today = new Date();

    // Generate time slots for a few dates
    for (let i = 0; i < 3; i++) {
        const daysAhead = Math.floor(Math.random() * 30) + 1;
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + daysAhead);

        const dateString = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

        // Random time slots
        const possibleSlots = ['09:00-11:00', '10:00-12:00', '14:00-16:00', '15:00-17:00', '16:00-18:00'];
        const numSlots = Math.floor(Math.random() * 2) + 1;
        slots[dateString] = possibleSlots.slice(0, numSlots);
    }

    return slots;
}

// Initialize with sample data (replace with API call in production)
let bookedDates = generateSampleBookedDates();
let bookedTimeSlots = generateSampleBookedTimeSlots();

function initCalendar() {
    renderCalendar();

    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
}

function renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const calendarMonthYear = document.getElementById('calendarMonthYear');

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

    calendarMonthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Clear previous days
    calendarDays.innerHTML = '';

    // Get today's date for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'disabled');
        calendarDays.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;

        const currentDate = new Date(currentYear, currentMonth, day);
        currentDate.setHours(0, 0, 0, 0);
        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // Check if it's today
        if (currentDate.getTime() === today.getTime()) {
            dayElement.classList.add('today');
        }

        // Check if it's in the past
        if (currentDate < today) {
            dayElement.classList.add('past');
        }
        // Check if it's booked
        else if (bookedDates.includes(dateString)) {
            dayElement.classList.add('booked');
        }
        // Available date
        else {
            dayElement.classList.add('available');
            dayElement.addEventListener('click', () => selectDate(currentDate, dateString, dayElement));
        }

        calendarDays.appendChild(dayElement);
    }
}

function selectDate(date, dateString, element) {
    selectedDate = dateString;

    // Remove previous selection
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });

    // Add selection to clicked day
    element.classList.add('selected');

    // Update hidden input
    document.getElementById('booking-date').value = dateString;

    // Update display
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const displayDate = date.toLocaleDateString('en-US', options);
    document.getElementById('selectedDateDisplay').textContent = `Selected: ${displayDate}`;

    // Show available time slots
    showTimeSlots(dateString);

    // Remove error if present
    const formGroup = document.getElementById('booking-date').closest('.form-group');
    formGroup.classList.remove('error');
}

function showTimeSlots(dateString) {
    const timeSlotsContainer = document.getElementById('timeSlotsContainer');

    // Define all available time slots
    const allTimeSlots = [
        '08:00-10:00',
        '09:00-11:00',
        '10:00-12:00',
        '11:00-13:00',
        '12:00-14:00',
        '13:00-15:00',
        '14:00-16:00',
        '15:00-17:00',
        '16:00-18:00',
        '17:00-19:00'
    ];

    // Get booked slots for this date
    const bookedSlots = bookedTimeSlots[dateString] || [];

    // Create time slots grid
    const slotsGrid = document.createElement('div');
    slotsGrid.classList.add('time-slots-grid');

    allTimeSlots.forEach(slot => {
        const slotElement = document.createElement('div');
        slotElement.classList.add('time-slot');
        slotElement.textContent = slot;

        if (bookedSlots.includes(slot)) {
            slotElement.classList.add('booked');
            slotElement.title = 'This time slot is already booked';
        } else {
            slotElement.addEventListener('click', () => selectTimeSlot(slot, slotElement));
        }

        slotsGrid.appendChild(slotElement);
    });

    timeSlotsContainer.innerHTML = '';
    timeSlotsContainer.appendChild(slotsGrid);
}

function selectTimeSlot(slot, element) {
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(el => {
        el.classList.remove('selected');
    });

    // Add selection to clicked slot
    element.classList.add('selected');

    // Update hidden input
    document.getElementById('booking-time').value = slot;

    // Remove error if present
    const formGroup = document.getElementById('booking-time').closest('.form-group');
    formGroup.classList.remove('error');
}

// ========================================
// BOOKING MODAL FUNCTIONALITY
// ========================================
function initBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    const bookNowHeroBtn = document.getElementById('bookNowHeroBtn');
    const bookNowNavBtn = document.getElementById('bookNowNavBtn');
    const closeBtn = document.querySelector('.booking-modal-close');
    const bookingForm = document.getElementById('bookingForm');

    // Open modal functions
    function openBookingModal(e) {
        e.preventDefault();
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Initialize calendar when modal opens
        initCalendar();

        // Focus on first input for accessibility
        setTimeout(() => {
            document.getElementById('booking-name').focus();
        }, 100);
    }

    function closeBookingModal() {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Event listeners for opening modal
    if (bookNowHeroBtn) {
        bookNowHeroBtn.addEventListener('click', openBookingModal);
    }

    if (bookNowNavBtn) {
        bookNowNavBtn.addEventListener('click', openBookingModal);
    }

    // Event listeners for closing modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeBookingModal);
    }

    // Close on background click
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
            closeBookingModal();
        }
    });

    // Form submission handling
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Reset previous errors
            document.querySelectorAll('#bookingForm .form-group').forEach(group => {
                group.classList.remove('error');
            });

            // Security validation (rate limiting, honeypot, reCAPTCHA)
            const securityCheck = await window.SecurityUtils.validateFormSubmission(bookingForm, 'booking_form');
            if (!securityCheck.valid) {
                window.showWarning('Submission Blocked', securityCheck.message);
                return;
            }

            let isValid = true;

            // Validate name
            const name = document.getElementById('booking-name');
            if (!name.value.trim()) {
                showBookingError(name, 'Please enter your full name');
                isValid = false;
            }

            // Validate email
            const email = document.getElementById('booking-email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showBookingError(email, 'Please enter your email address');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showBookingError(email, 'Please enter a valid email address');
                isValid = false;
            }

            // Validate phone
            const phone = document.getElementById('booking-phone');
            if (!phone.value.trim()) {
                showBookingError(phone, 'Please enter your phone number');
                isValid = false;
            }

            // Validate service
            const service = document.getElementById('booking-service');
            if (!service.value) {
                showBookingError(service, 'Please select a service');
                isValid = false;
            }

            // Validate date
            const date = document.getElementById('booking-date');
            if (!date.value) {
                showBookingError(date, 'Please select a date');
                isValid = false;
            } else {
                // Check if date is in the past
                const selectedDate = new Date(date.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (selectedDate < today) {
                    showBookingError(date, 'Please select a future date');
                    isValid = false;
                }
            }

            // Validate time
            const time = document.getElementById('booking-time');
            if (!time.value) {
                showBookingError(time, 'Please select a time');
                isValid = false;
            }

            // Validate location
            const location = document.getElementById('booking-location');
            if (!location.value.trim()) {
                showBookingError(location, 'Please enter the location');
                isValid = false;
            }

            // Validate duration
            const duration = document.getElementById('booking-duration');
            if (!duration.value) {
                showBookingError(duration, 'Please select duration');
                isValid = false;
            }

            // Validate budget
            const budget = document.getElementById('booking-budget');
            if (!budget.value) {
                showBookingError(budget, 'Please select your budget range');
                isValid = false;
            }

            // Validate message
            const message = document.getElementById('booking-message');
            if (!message.value.trim()) {
                showBookingError(message, 'Please provide some details about your requirements');
                isValid = false;
            } else if (message.value.trim().length < 20) {
                showBookingError(message, 'Please provide at least 20 characters');
                isValid = false;
            }

            if (isValid) {
                // Collect all form data
                const formData = {
                    name: name.value,
                    email: email.value,
                    phone: phone.value,
                    service: service.options[service.selectedIndex].text,
                    date: date.value,
                    time: time.value,
                    location: location.value,
                    duration: duration.options[duration.selectedIndex].text,
                    guests: document.getElementById('booking-guests').value || 'Not specified',
                    budget: budget.options[budget.selectedIndex].text,
                    message: message.value
                };

                // Get submit button for loading state
                const submitButton = bookingForm.querySelector('button[type="submit"]');

                // Send notification via API
                window.NotificationsAPI.handleBookingFormSubmission(formData, submitButton)
                    .then(() => {
                        // Record submission for rate limiting
                        window.SecurityUtils.recordSubmission('booking_form');
                        // Reset form and close modal on success
                        bookingForm.reset();
                        closeBookingModal();
                    })
                    .catch((error) => {
                        console.error('Failed to submit booking:', error);
                    });
            } else {
                // Scroll to first error
                const firstError = document.querySelector('#bookingForm .form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        // Remove error on input
        const inputs = bookingForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const formGroup = this.closest('.form-group');
                formGroup.classList.remove('error');
            });
        });
    }

    function showBookingError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.textContent = message;
        }
    }

    // Set minimum date to today
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// ========================================
// INITIALIZE ALL FUNCTIONALITY
// ========================================
// Wait for partials to load before initializing
document.addEventListener('partialsLoaded', function() {
    initLightbox();
    initHamburgerMenu();
    initContactForm();
    initSmoothScrolling();
    initImageLoading();
    initScrollAnimations();
    initServiceCards();
    initBookingModal();

    console.log('✅ 3rdEye_Visualz website loaded successfully!');
});
