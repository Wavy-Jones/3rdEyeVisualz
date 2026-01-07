# 3rdEye_Visualz - Photography Website

A professional, modern photography portfolio website showcasing services and work by 3rdEye_Visualz.

**Company:** 3rdEye_Visualz
**Tagline:** "We see the invincible."
**Established:** 2019
**Location:** Johannesburg, South Africa

---

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [File Locations](#file-locations)
- [Contact Information](#contact-information)

---

## Project Structure

```
INFT_Media/
│
├── index.html                          # Main HTML file (website homepage)
│
├── assets/                             # All website assets organized here
│   ├── css/
│   │   └── styles.css                  # All website styling
│   │
│   ├── js/
│   │   └── script.js                   # All JavaScript functionality
│   │
│   └── images/                         # For your own photography
│       ├── gallery/                    # Portfolio/gallery images go here
│       └── testimonials/               # Client testimonial photos go here
│
├── styles.css                          # (Legacy - can be deleted)
├── script.js                           # (Legacy - can be deleted)
│
└── README.md                           # This documentation file
```

---

## Features

### 1. Professional Lightbox Gallery
- **Location:** Portfolio section
- Click any portfolio image to view full-screen
- Navigate with arrow buttons or keyboard (← →)
- Press ESC to close
- Smooth zoom animations

### 2. Responsive Navigation
- Desktop: Full horizontal menu
- Mobile: Hamburger menu with slide-in navigation
- Smooth scroll to sections

### 3. Service Selection System
- Interactive dropdown with 8 photography services
- Highlights corresponding portfolio item
- Personalized messages for each service type

### 4. Contact Form with Validation
- Required fields: Name, Email, Service Type, Message
- Real-time validation with error messages
- Email format validation
- Phone number format checking
- Minimum message length (10 characters)

### 5. Client Testimonials
- 3 featured testimonials with ratings
- Client photos and information
- Responsive card layout

### 6. Photography Services
- Wedding Photography
- Maternity Photography
- Corporate Photography
- Kids Photography
- Travel Photography
- Portrait Photography
- Fashion Photography
- Real Estate Photography

### 7. Accessibility Features
- Keyboard navigation support
- ARIA labels on interactive elements
- Descriptive alt text for images
- Focus management
- Semantic HTML structure

### 8. Performance Optimizations
- Image lazy loading
- Scroll-triggered animations
- Optimized image sizes
- Efficient CSS and JavaScript

---

## Getting Started

### Option 1: Open Locally
1. Double-click `index.html` to open in your default browser
2. That's it! The website will run locally

### Option 2: Use Live Server (Recommended for Development)
1. Install a local server (e.g., Live Server extension in VS Code)
2. Right-click `index.html` → "Open with Live Server"
3. Website will auto-refresh when you make changes

### Option 3: Deploy Online
Upload these files to any web hosting service:
- **Free options:** GitHub Pages, Netlify, Vercel
- **Paid options:** Bluehost, SiteGround, HostGator
- Upload the entire `INFT_Media` folder

---

## Customization Guide

### Replacing Portfolio Images

**Current Status:** Using Unsplash placeholder images

**To add your own photos:**

1. **Add your images** to `assets/images/gallery/`
   ```
   assets/images/gallery/
   ├── wedding-1.jpg
   ├── maternity-1.jpg
   ├── corporate-1.jpg
   └── ...
   ```

2. **Update `index.html`** (lines 50-82)
   Replace the image URLs:
   ```html
   <!-- OLD -->
   <img src="https://images.unsplash.com/photo-..." alt="...">

   <!-- NEW -->
   <img data-src="assets/images/gallery/wedding-1.jpg"
        src="assets/images/gallery/wedding-1-thumb.jpg"
        alt="Elegant bride and groom..."
        loading="lazy">
   ```

3. **Best practices:**
   - Use high-resolution images (1920x1080 or higher)
   - Create thumbnails for faster loading (400x250px)
   - Name files descriptively: `wedding-ceremony-sunset.jpg`
   - Optimize images before uploading (use TinyPNG.com)

### Updating Contact Information

**Edit these sections in `index.html`:**

- **Phone:** Line 226 (Footer section)
- **Email:** Line 230 (Footer section)
- **Instagram:** Line 238 (Footer section)
- **Location:** Line 234 (Footer section)

### Changing Colors

**Edit `assets/css/styles.css`:**

- **Primary gradient:** Lines 11, 129, 220, 525
  ```css
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  ```

- **Accent colors:** Search for `#764ba2` and `#667eea`

### Adding More Gallery Items

1. **Add HTML** in `index.html` (after line 81):
   ```html
   <div class="gallery-item" data-category="your-category">
       <img data-src="path/to/full-size.jpg"
            src="path/to/thumbnail.jpg"
            alt="Descriptive alt text"
            loading="lazy">
       <h3>Category Name</h3>
   </div>
   ```

2. **Update JavaScript** in `assets/js/script.js` (line 263-272):
   Add your category to the serviceMap

### Customizing Testimonials

**Edit `index.html` (lines 129-166):**

Replace:
- Client photos (`src="..."`)
- Client names (`<h4>`)
- Testimonial text (`<p class="testimonial-text">`)
- Client type (`<p>` in author-info)

### Connecting Contact Form to Email

**Current status:** Form shows success alert but doesn't send emails

**To enable email sending:**

**Option 1: Use FormSpree (Easiest)**
1. Go to formspree.io
2. Create free account
3. Get your form endpoint
4. Update `index.html` line 170:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```

**Option 2: Use EmailJS (No backend needed)**
1. Sign up at emailjs.com
2. Follow their integration guide
3. Update `assets/js/script.js` (line 178-193)

**Option 3: Build Backend (Advanced)**
- Create PHP/Node.js backend
- Connect to your email server
- See tutorial: [Link to your preferred backend tutorial]

---

## File Locations

### HTML Structure
**File:** `index.html`
- Lines 10-27: Header & Navigation
- Lines 30-32: Hero Section
- Lines 34-45: Service Selection
- Lines 47-94: Portfolio Gallery & Lightbox
- Lines 96-122: Services Section
- Lines 124-127: About Section
- Lines 129-166: Testimonials Section
- Lines 168-208: Contact Form
- Lines 211-237: Footer

### CSS Styling
**File:** `assets/css/styles.css`
- Lines 1-13: Global Styles
- Lines 15-61: Header & Navigation
- Lines 63-147: Hero & Service Selection
- Lines 149-195: Portfolio Gallery
- Lines 197-240: Services Section
- Lines 242-265: About Section
- Lines 267-301: Footer
- Lines 303-420: Lightbox
- Lines 422-452: Hamburger Menu
- Lines 454-547: Contact Form
- Lines 549-630: Testimonials
- Lines 632-697: Responsive Design

### JavaScript Functionality
**File:** `assets/js/script.js`
- Lines 1-86: Lightbox Gallery
- Lines 88-113: Hamburger Menu
- Lines 115-220: Contact Form Validation
- Lines 222-287: Service Selection
- Lines 289-305: Smooth Scrolling
- Lines 307-327: Image Lazy Loading
- Lines 329-367: Scroll Animations
- Lines 369-406: Service Card Interactivity
- Lines 408-421: Initialization

---

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling (Flexbox, Grid, Animations)
- **Vanilla JavaScript** - No frameworks/libraries
- **Unsplash API** - Placeholder images (temporary)

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Contact Information

**Business Details:**
- **Company:** 3rdEye_Visualz
- **Phone:** +27 72 148 0697
- **Email:** infntmediasolutions@gmail.com
- **Instagram:** @infnt_mediasolutions
- **Location:** Johannesburg, South Africa
- **Established:** 2019

**For Website Support:**
Refer to this README or contact your web developer.

---

## Future Enhancements

Consider adding:
- [ ] Backend for contact form email delivery
- [ ] Blog section for photography tips
- [ ] Pricing packages page
- [ ] Online booking system
- [ ] Image filters/categories in gallery
- [ ] Video portfolio
- [ ] Client login portal
- [ ] Multi-language support
- [ ] SEO optimization
- [ ] Analytics integration (Google Analytics)
- [ ] Social media feed integration

---

## License

© 2019 3rdEye_Visualz. All rights reserved.

---

## Version History

**v2.0** - Current Version
- Professional folder structure
- Lightbox gallery functionality
- Mobile hamburger menu
- Contact form with validation
- Client testimonials section
- 8 photography service categories
- Full accessibility support
- Performance optimizations

**v1.0** - Initial Version
- Basic single-page design
- 6 gallery items
- Service selection dropdown
- Static contact information

---

**Last Updated:** 2025-10-20
