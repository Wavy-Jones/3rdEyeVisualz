// ========================================
// VISUAL EFFECTS - INTERACTIVE ENHANCEMENTS
// ========================================

/**
 * Custom Cursor Effect
 */
class CustomCursor {
    constructor() {
        this.enabled = window.innerWidth > 768; // Only on desktop
        if (!this.enabled) return;

        this.init();
    }

    init() {
        // Create cursor elements
        this.dot = document.createElement('div');
        this.dot.className = 'cursor-dot';
        this.outline = document.createElement('div');
        this.outline.className = 'cursor-outline';

        document.body.appendChild(this.dot);
        document.body.appendChild(this.outline);

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.dot.style.left = e.clientX + 'px';
            this.dot.style.top = e.clientY + 'px';

            setTimeout(() => {
                this.outline.style.left = e.clientX + 'px';
                this.outline.style.top = e.clientY + 'px';
            }, 100);
        });

        // Expand cursor on hover over clickable elements
        const clickables = document.querySelectorAll('a, button, .gallery-item, .service-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.outline.style.transform = 'scale(1.5)';
                this.outline.style.borderColor = '#667eea';
            });
            el.addEventListener('mouseleave', () => {
                this.outline.style.transform = 'scale(1)';
                this.outline.style.borderColor = 'rgba(102, 126, 234, 0.5)';
            });
        });
    }
}

/**
 * Stats Counter Animation
 */
class StatsCounter {
    constructor() {
        // Check if stats section already exists to prevent duplicates
        if (document.querySelector('.stats-section')) {
            console.log('Stats section already exists, skipping creation');
            return;
        }

        this.stats = [
            { element: null, target: 500, label: 'Happy Clients', suffix: '+' },
            { element: null, target: 5000, label: 'Photos Taken', suffix: '+' },
            { element: null, target: 10, label: 'Years Experience', suffix: '' },
            { element: null, target: 50, label: 'Events Covered', suffix: '+' }
        ];

        this.createStatsSection();
        this.setupObserver();
    }

    createStatsSection() {
        // Find a good place to insert stats (after services section)
        const servicesSection = document.getElementById('services-container');
        if (!servicesSection) {
            console.log('Services section not found, cannot add stats');
            return;
        }

        // Double-check that stats section doesn't exist
        if (document.querySelector('.stats-section')) {
            console.log('Stats section already exists, aborting creation');
            return;
        }

        const statsSection = document.createElement('div');
        statsSection.className = 'stats-section';
        statsSection.id = 'stats-section'; // Add ID for easier reference
        statsSection.innerHTML = this.stats.map((stat, index) => `
            <div class="stat-item fade-in-element">
                <div class="stat-number" data-target="${stat.target}" data-suffix="${stat.suffix}">0</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');

        servicesSection.parentNode.insertBefore(statsSection, servicesSection.nextSibling);

        // Store references to counter elements
        this.stats.forEach((stat, index) => {
            stat.element = statsSection.querySelectorAll('.stat-number')[index];
        });

        console.log('✓ Stats section created successfully');
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateCounters() {
        this.stats.forEach(stat => {
            if (!stat.element) return;

            const duration = 2000; // 2 seconds
            const start = 0;
            const end = stat.target;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * (end - start) + start);

                stat.element.textContent = current + stat.suffix;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        });
    }
}

/**
 * Image Tilt Effect
 */
class ImageTilt {
    constructor() {
        this.init();
    }

    init() {
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}

/**
 * Parallax Scroll Effect (Disabled to prevent overlap)
 * Can be re-enabled with reduced intensity if desired
 */
class ParallaxScroll {
    constructor() {
        // Parallax disabled to prevent section overlap issues
        // this.init();
    }

    init() {
        // Subtle parallax - disabled for now to prevent overlap
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            // Very subtle parallax for hero only
            const hero = document.querySelector('.hero');
            if (hero) {
                // Much reduced intensity (0.1 instead of 0.5)
                hero.style.transform = `translateY(${scrolled * 0.1}px)`;
            }

            // Portfolio parallax disabled to prevent overlap
            // const portfolio = document.querySelector('.portfolio');
            // if (portfolio) {
            //     const portfolioTop = portfolio.offsetTop;
            //     const portfolioScroll = scrolled - portfolioTop;
            //     if (portfolioScroll > -window.innerHeight && portfolioScroll < window.innerHeight) {
            //         portfolio.style.transform = `translateY(${portfolioScroll * 0.3}px)`;
            //     }
            // }
        });
    }
}

/**
 * Page Loader
 */
class PageLoader {
    constructor() {
        this.createLoader();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        document.body.prepend(loader);

        // Hide loader when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 500);
        });
    }
}

/**
 * Enhanced Scroll Animations
 */
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in-element').forEach(el => {
            observer.observe(el);
        });

        // Add fade-in class to sections if not already present
        const sections = document.querySelectorAll('.service-selection, .portfolio, .services, .about, .testimonials, .contact-form');
        sections.forEach(section => {
            if (!section.classList.contains('fade-in-element')) {
                section.classList.add('fade-in-element');
                observer.observe(section);
            }
        });
    }
}

/**
 * Floating Elements Animation
 */
class FloatingElements {
    constructor() {
        this.init();
    }

    init() {
        // Add floating animation to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });

        // Add floating animation to testimonial cards
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.3}s`;
        });
    }
}

/**
 * Button Ripple Effect
 */
class RippleEffect {
    constructor() {
        this.init();
    }

    init() {
        const buttons = document.querySelectorAll('.hero-book-btn, .cta-button, .submit-button, .book-now-nav');

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple styles
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }

            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            .hero-book-btn,
            .cta-button,
            .submit-button,
            .book-now-nav {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Smooth Scroll with Easing
 */
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    const targetPosition = target.offsetTop - 80;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;

                    const animation = (currentTime) => {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);

                        if (timeElapsed < duration) {
                            requestAnimationFrame(animation);
                        }
                    };

                    const easeInOutCubic = (t, b, c, d) => {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t * t + b;
                        t -= 2;
                        return c / 2 * (t * t * t + 2) + b;
                    };

                    requestAnimationFrame(animation);
                }
            });
        });
    }
}

/**
 * Initialize All Visual Effects
 */
function initVisualEffects() {
    // Check if we should enable effects (can be disabled for performance)
    const enableEffects = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (enableEffects) {
        // Initialize page loader
        new PageLoader();

        // Initialize cursor effect (desktop only)
        if (window.innerWidth > 768) {
            new CustomCursor();
        }

        // Stats counter with duplicate prevention
        new StatsCounter();

        // Initialize image tilt effect
        new ImageTilt();

        // Initialize parallax scroll
        new ParallaxScroll();

        // Initialize enhanced scroll animations
        new ScrollAnimations();

        // Initialize floating elements
        new FloatingElements();

        // Initialize ripple effect
        new RippleEffect();

        // Initialize smooth scroll
        new SmoothScroll();

        console.log('✨ Visual effects initialized');
    } else {
        console.log('⚠️ Visual effects disabled (reduced motion preference)');
    }
}

// Initialize when partials are loaded
document.addEventListener('partialsLoaded', initVisualEffects);

// Also initialize on DOM ready as fallback
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisualEffects);
} else {
    initVisualEffects();
}

// Export for manual initialization if needed
window.VisualEffects = {
    init: initVisualEffects,
    CustomCursor,
    StatsCounter,
    ImageTilt,
    ParallaxScroll,
    ScrollAnimations,
    FloatingElements,
    RippleEffect,
    SmoothScroll
};
