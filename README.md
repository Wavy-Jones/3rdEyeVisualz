# 3rdEye Visualz - Professional Photography Website

A modern, secure, and SEO-optimized photography portfolio website with advanced booking system, analytics, and spam protection.

**Company:** 3rdEye Visualz
**Tagline:** "We see the invincible."
**Established:** 2019
**Location:** Johannesburg, South Africa
**Version:** 3.0.0

---

## 🚀 What's New in v3.0

### Security & Spam Prevention
- ✅ **Environment-based configuration** - API keys and sensitive data no longer exposed
- ✅ **Rate limiting** - Prevents spam with configurable submission limits
- ✅ **Google reCAPTCHA v3** integration (optional)
- ✅ **Honeypot fields** for bot detection
- ✅ **Secure API integration** with proper error handling

### User Experience
- ✅ **Modern toast notifications** - Beautiful slide-in notifications instead of alerts
- ✅ **Loading states & spinners** - Visual feedback during form submissions
- ✅ **Dynamic calendar** - No hardcoded dates, generates availability automatically
- ✅ **Better error handling** - User-friendly error messages

### SEO & Analytics
- ✅ **Comprehensive meta tags** - Open Graph, Twitter Cards, geo tags
- ✅ **Structured data (JSON-LD)** - Rich snippets for Google
- ✅ **Google Analytics 4** integration with custom event tracking
- ✅ **Sitemap.xml & robots.txt** for better crawling
- ✅ **Canonical URLs** and proper SEO structure

### Developer Experience
- ✅ **Modular architecture** - Clean, maintainable code structure
- ✅ **Environment configuration** - Easy setup with .env files
- ✅ **Build scripts** - Production deployment checklist
- ✅ **Improved documentation** - Detailed setup instructions

---

## 📁 Project Structure

```
3rdEyeVisualz/
│
├── index.html                     # Main HTML file with SEO meta tags
├── sitemap.xml                    # Search engine sitemap
├── robots.txt                     # Crawler instructions
├── .env.example                   # Environment configuration template
├── build.js                       # Build script for production
├── package.json                   # NPM configuration
│
├── assets/
│   ├── css/
│   │   └── styles.css             # Main stylesheet with loading states
│   │
│   ├── js/
│   │   ├── config.js              # 🆕 Environment configuration
│   │   ├── security.js            # 🆕 Rate limiting & reCAPTCHA
│   │   ├── analytics.js           # 🆕 Google Analytics integration
│   │   ├── toast.js               # 🆕 Toast notification system
│   │   ├── api-integration.js     # 🆕 Improved API integration
│   │   ├── script.js              # Main JavaScript (updated)
│   │   └── load-partials.js       # Partial loader
│   │
│   └── images/                    # Your photography portfolio
│       ├── gallery/               # Portfolio images
│       ├── testimonials/          # Client photos
│       ├── og-image.jpg           # Social media preview (1200x630)
│       └── favicon.ico            # Site favicon
│
└── partials/                      # HTML components
    ├── header.html
    ├── hero.html
    ├── portfolio.html
    ├── services.html
    ├── about.html
    ├── testimonials.html
    ├── contact-form.html
    ├── booking-modal.html
    └── footer.html
```

---

## 🔧 Setup Instructions

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/3rdEyeVisualz.git
cd 3rdEyeVisualz

# Install dependencies
npm install
```

### 2. Environment Configuration

```bash
# Copy environment template
copy .env.example .env

# Edit .env and add your configuration:
# - ENV_API_URL: Your backend API URL
# - ENV_API_KEY: Your API authentication key
# - ENV_GA_ID: Your Google Analytics 4 Measurement ID
# - ENV_RECAPTCHA_SITE_KEY: Your reCAPTCHA v3 site key
```

**IMPORTANT:** Never commit `.env` to version control! It's already in `.gitignore`.

### 3. Configure Your Backend API

The website integrates with a backend API for email notifications. You have two options:

#### Option A: Use Your Own API
Update `assets/js/config.js` with your API URL and ensure it accepts POST requests to `/notifications/send`.

#### Option B: Use a Third-Party Service
Replace the API integration with services like:
- **FormSpree** (https://formspree.io) - Easiest option
- **EmailJS** (https://www.emailjs.com) - No backend needed
- **Netlify Forms** (if deploying on Netlify)

### 4. Set Up Google Analytics

```bash
# 1. Create a GA4 property at https://analytics.google.com/
# 2. Copy your Measurement ID (starts with G-)
# 3. Add it to .env:
ENV_GA_ID=G-XXXXXXXXXX
```

The analytics will automatically track:
- Page views
- Form submissions
- Service selections
- Portfolio views
- Booking attempts

### 5. Set Up reCAPTCHA (Optional)

```bash
# 1. Get reCAPTCHA v3 keys at https://www.google.com/recaptcha/admin
# 2. Add site key to .env:
ENV_RECAPTCHA_SITE_KEY=your-site-key-here

# 3. Enable in config.js:
# Set recaptcha.enabled: true
```

### 6. Add Your Content

#### Portfolio Images
```bash
# Add your photography to:
assets/images/gallery/
  ├── wedding-1.jpg
  ├── maternity-1.jpg
  ├── corporate-1.jpg
  └── ...

# Update image URLs in partials/portfolio.html
```

#### Social Media Images
Create these images for better social sharing:
- `assets/images/og-image.jpg` (1200x630px) - Facebook/LinkedIn preview
- `assets/images/twitter-card.jpg` (1200x600px) - Twitter preview
- `assets/images/favicon.ico` - Browser favicon

#### Testimonials
Update `partials/testimonials.html` with real client reviews and photos.

### 7. Update Site Information

Edit `assets/js/config.js` to update:
- Business name
- Contact email
- Phone number
- Instagram handle
- Location

Update `index.html` to modify:
- Page title and meta descriptions
- Canonical URLs (replace https://3rdeyevisualz.com with your domain)
- Open Graph image URLs

---

## 🚀 Development

### Local Development Server

```bash
# Start development server (with live reload)
npm start

# Or
npm run dev

# Website will open at http://localhost:3000
```

### Testing Forms

The website includes built-in spam protection:
- **Rate limiting**: Max 3 submissions per hour
- **Cooldown period**: 5 minutes between submissions
- **Honeypot field**: Hidden field to catch bots

To test without limits, open browser console:
```javascript
// Clear rate limits for testing
window.RateLimiter.clearLimit('contact_form');
window.RateLimiter.clearLimit('booking_form');
```

---

## 📦 Production Deployment

### Pre-Deployment Checklist

Run the build script to generate a checklist:

```bash
npm run build
```

This creates `DEPLOYMENT_CHECKLIST.txt` with all deployment steps.

### Key Steps:

1. **Environment Variables**
   - Set up `.env` with production values
   - Use secure, production API keys
   - Enable all production features

2. **Content**
   - Add all real portfolio images
   - Update testimonials
   - Review all text content

3. **SEO**
   - Update all URLs to production domain
   - Add real Open Graph images
   - Verify sitemap.xml is correct

4. **Security**
   - Enable reCAPTCHA
   - Test rate limiting
   - Verify API key security

5. **Performance**
   - Minify CSS and JavaScript
   - Compress all images
   - Enable gzip on server

### Deployment Platforms

#### Netlify (Recommended)
```bash
# 1. Connect GitHub repo to Netlify
# 2. Set build command: (none needed)
# 3. Set publish directory: /
# 4. Add environment variables in Netlify dashboard
# 5. Deploy!
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Traditional Hosting
Upload all files except:
- `node_modules/`
- `.env`
- `.git/`
- `README.md`

---

## 🔒 Security Best Practices

### API Key Security

**❌ NEVER** hardcode API keys in your code
**✅ DO** use environment variables

The site now uses a configuration system that:
- Loads API keys from window.ENV_API_KEY (set server-side)
- Falls back to placeholder values in development
- Warns when using test keys

### Production Checklist

- [ ] API keys are set via environment variables
- [ ] `.env` file is not in version control
- [ ] reCAPTCHA is enabled with production keys
- [ ] Rate limiting is active
- [ ] Forms use HTTPS (not HTTP)
- [ ] API endpoints use HTTPS
- [ ] No sensitive data in browser console

---

## 📊 Analytics Events

The site tracks these custom events in Google Analytics:

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `form_submission` | When a form is submitted | form_type, service_type |
| `booking_initiated` | When booking form is submitted | service_type, booking_date |
| `service_selected` | When user selects a service | service_type |
| `portfolio_view` | When portfolio image is clicked | portfolio_category |

View these in GA4: Reports > Engagement > Events

---

## 🎨 Customization

### Colors & Branding

Edit `assets/css/styles.css`:

```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to your brand colors */
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

### Photography Services

To add/remove services, update:
1. `partials/portfolio.html` - Add gallery items
2. `partials/services.html` - Add service cards
3. `partials/service-selection.html` - Add dropdown options
4. `assets/js/script.js` - Update service maps

### Calendar & Booking

Edit booking settings in `assets/js/config.js`:

```javascript
forms: {
    maxSubmissionsPerHour: 3,    // Max form submissions per hour
    cooldownMinutes: 5           // Minutes between submissions
}
```

### Toast Notifications

Customize toast styles in `assets/js/toast.js` or use the API:

```javascript
// Success message
window.showSuccess('Title', 'Message');

// Error message
window.showError('Title', 'Message');

// Warning
window.showWarning('Title', 'Message');

// Info
window.showInfo('Title', 'Message');

// Custom options
window.Toast.show({
    type: 'success',
    title: 'Custom Title',
    message: 'Custom message',
    duration: 5000,    // milliseconds
    closable: true
});
```

---

## 📱 Features

### For Visitors
- 📸 Interactive portfolio gallery with lightbox
- 📅 Visual booking calendar with availability
- ⏰ Time slot selection
- 📝 Contact and booking forms with validation
- 💬 Client testimonials
- 📞 Direct contact options (phone, email, social)

### For You (Business Owner)
- 📧 Email notifications for all inquiries
- 🔔 Separate notifications for contact vs. bookings
- 📊 Analytics tracking of user behavior
- 🛡️ Spam protection (rate limiting + reCAPTCHA)
- 📱 Mobile-responsive design
- 🔍 SEO optimization for local search

### Technical Features
- ⚡ Fast loading with lazy images
- 🎨 Smooth animations and transitions
- ♿ Accessibility (ARIA labels, keyboard navigation)
- 📱 Progressive Web App ready
- 🔐 Secure form handling
- 📈 Performance optimized

---

## 🐛 Troubleshooting

### Forms not submitting

1. **Check API configuration**
   ```javascript
   // Open browser console and check:
   console.log(window.APP_CONFIG.api);
   ```

2. **Check rate limiting**
   ```javascript
   // Clear rate limits:
   window.RateLimiter.clearLimit('contact_form');
   ```

3. **Check browser console for errors**
   - Open DevTools (F12)
   - Look for red error messages
   - Check Network tab for failed requests

### Calendar not showing dates

- Clear browser cache
- Check if `generateSampleBookedDates()` is running
- Verify JavaScript is loading correctly

### Analytics not tracking

1. Check GA4 Measurement ID is correct
2. Verify analytics is enabled in config
3. Check DebugView in GA4 for real-time events
4. Disable ad blockers for testing

### Images not loading

- Verify image paths are correct
- Check file extensions (.jpg vs .jpeg)
- Ensure images are in `assets/images/` folder
- Check browser console for 404 errors

---

## 📞 Support

### Documentation
- This README
- `DEPLOYMENT_CHECKLIST.txt` (generated by `npm run build`)
- Code comments in each file

### External Resources
- [Google Analytics 4 Help](https://support.google.com/analytics/)
- [reCAPTCHA Documentation](https://developers.google.com/recaptcha)
- [SEO Best Practices](https://developers.google.com/search/docs)

---

## 📄 License

© 2019-2025 3rdEye Visualz. All rights reserved.

---

## 🔄 Version History

### v3.0.0 (2025-11-28) - Major Security & UX Update
- Added environment configuration system
- Implemented toast notifications
- Added rate limiting and spam protection
- Integrated Google Analytics 4
- Added comprehensive SEO optimization
- Improved form handling with loading states
- Added reCAPTCHA integration
- Created structured data for search engines
- Generated sitemap.xml and robots.txt
- Fixed all security vulnerabilities
- Improved developer documentation

### v2.0.0 - Professional Features
- Professional folder structure
- Lightbox gallery functionality
- Mobile hamburger menu
- Contact form with validation
- Client testimonials section
- 8 photography service categories
- Full accessibility support
- Performance optimizations

### v1.0.0 - Initial Version
- Basic single-page design
- 6 gallery items
- Service selection dropdown
- Static contact information

---

**Last Updated:** November 28, 2025
**Maintained by:** 3rdEye Visualz Development Team
