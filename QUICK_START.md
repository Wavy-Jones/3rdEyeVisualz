# Quick Start Guide

Welcome to your 3rdEye_Visualz website!

## Open Your Website

**Easy Method:**
1. Find the `index.html` file
2. Double-click it
3. Your website opens in your browser!

## Where Everything Is

```
Your Main Files:
├── index.html          ← The website (double-click to open)
├── README.md           ← Full documentation
└── assets/
    ├── css/
    │   └── styles.css  ← Change colors and design here
    ├── js/
    │   └── script.js   ← Website functionality
    └── images/
        ├── gallery/    ← Add your portfolio photos here
        └── testimonials/ ← Add client photos here
```

## Most Common Tasks

### 1. Add Your Own Photos
1. Open folder: `assets/images/gallery/`
2. Copy your photos into this folder
3. Open `index.html` in a text editor (Notepad, VS Code, etc.)
4. Find line 50-82 (the gallery section)
5. Replace the Unsplash URLs with your photo filenames:
   ```html
   Before: src="https://images.unsplash.com/photo-..."
   After:  src="assets/images/gallery/your-photo.jpg"
   ```

### 2. Change Your Contact Info
1. Open `index.html` in a text editor
2. Search for (Ctrl+F):
   - `+27 72 148 0697` to change phone
   - `infntmediasolutions@gmail.com` to change email
   - `@infnt_mediasolutions` to change Instagram
3. Replace with your information
4. Save and refresh your browser

### 3. Customize Colors
1. Open `assets/css/styles.css` in a text editor
2. Search for `#764ba2` (current purple color)
3. Replace with your brand color
4. Also search for `#667eea` (current blue color)
5. Save and refresh your browser

### 4. Update Testimonials
1. Open `index.html` in a text editor
2. Find lines 129-166 (testimonials section)
3. Change:
   - Client names in `<h4>` tags
   - Testimonial text in `<p class="testimonial-text">` tags
   - Client photos in `src="..."` attributes

### 5. Test Contact Form
1. Open your website
2. Scroll to "Get In Touch" section
3. Try submitting empty form → should show errors
4. Fill everything correctly → should show success message
5. **Note:** Email doesn't send yet (see README.md for email setup)

## Need Help?

- **Full Guide:** Open `README.md`
- **Forgot file locations?** Check the folder structure above
- **Something broken?** Make sure you didn't delete any folders

## Tips

- Always make a backup copy before editing
- Test in your browser after every change
- Use a code editor like VS Code for easier editing
- Press Ctrl+F (or Cmd+F on Mac) to find text quickly

## Ready to Go Live?

1. **Free hosting options:**
   - GitHub Pages (free forever)
   - Netlify (free tier)
   - Vercel (free tier)

2. **Upload these files:**
   - Everything in the `INFT_Media` folder
   - Keep the folder structure intact

3. **Your website is online!**

---

**Questions?** Check README.md for detailed documentation.

Good luck with your photography business! 📸
