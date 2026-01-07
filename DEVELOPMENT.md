# Development Guide

## Development Server Setup ✅

Your project now has a professional development environment with live-reload!

---

## Quick Start

### Start Development Server
```bash
npm run dev
```

This will:
- ✅ Start a local web server
- ✅ Open your website in the browser automatically
- ✅ Watch for file changes
- ✅ Auto-reload browser when you save changes
- ✅ Serve on `http://localhost:3000`

### Available Commands

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start development server (recommended) |
| `npm start` | Same as `npm run dev` |
| `npm run serve` | Same as `npm run dev` |

---

## How It Works

### Live Reload Feature
When you edit and save any file:
- **HTML** files (`index.html`)
- **CSS** files (`assets/css/styles.css`)
- **JavaScript** files (`assets/js/script.js`)

The browser will **automatically refresh** to show your changes!

### Server Details
- **Port:** 3000
- **Local URL:** http://localhost:3000
- **Network URL:** Also accessible from other devices on your network
- **File Watching:** Monitors all `.html`, `.css`, and `.js` files

---

## Development Workflow

### 1. Start the Server
```bash
npm run dev
```
Website opens at http://localhost:3000

### 2. Make Changes
- Edit any file in your code editor (VS Code, Notepad++, etc.)
- Save the file (Ctrl+S or Cmd+S)

### 3. See Changes Instantly
- Browser automatically refreshes
- No need to manually reload!

### 4. Stop the Server
- Press `Ctrl+C` in the terminal
- Or close the terminal window

---

## Testing Your Changes

### Before Deploying:
1. ✅ Test all navigation links
2. ✅ Test contact form validation
3. ✅ Test lightbox gallery (click images)
4. ✅ Test on mobile size (resize browser or use DevTools)
5. ✅ Test hamburger menu (mobile view)
6. ✅ Check console for JavaScript errors (F12 → Console tab)

### Browser DevTools:
- **Open:** Press `F12` or right-click → "Inspect"
- **Mobile View:** Click device icon or press `Ctrl+Shift+M`
- **Console:** Check for errors (should be clean except for any API warnings)

---

## Project Structure for Development

```
INFT_Media/
│
├── 📦 package.json              ← npm configuration
├── 📦 bs-config.json            ← Server configuration
├── 📦 node_modules/             ← Dependencies (auto-created)
│
├── 📄 index.html                ← Edit this for content
│
├── assets/
│   ├── css/
│   │   └── styles.css           ← Edit this for styling
│   │
│   ├── js/
│   │   └── script.js            ← Edit this for functionality
│   │
│   └── images/
│       ├── gallery/             ← Add portfolio photos here
│       └── testimonials/        ← Add client photos here
│
└── 📚 Documentation files
```

---

## Common Development Tasks

### Add a New Portfolio Image
1. Save image to `assets/images/gallery/`
2. Edit `index.html` (lines 50-82)
3. Save file → Browser auto-refreshes!

### Change a Color
1. Edit `assets/css/styles.css`
2. Find color code (e.g., `#764ba2`)
3. Replace with new color
4. Save → Browser auto-refreshes!

### Update Contact Info
1. Edit `index.html` (lines 226-238)
2. Replace phone, email, or Instagram
3. Save → Browser auto-refreshes!

### Modify JavaScript Behavior
1. Edit `assets/js/script.js`
2. Make your changes
3. Save → Browser auto-refreshes!

---

## Advanced Features

### Access from Phone/Tablet
Your website is accessible on your local network:

1. Start dev server: `npm run dev`
2. Look for the "External" URL in terminal output
3. Open that URL on your phone/tablet (must be on same WiFi)
4. Test mobile features!

**Example:**
```
External: http://192.168.0.23:3000
```

### Server Configuration
Edit `bs-config.json` to customize:

```json
{
  "port": 3000,              // Change server port
  "files": ["**/*.{html,css,js}"],  // Files to watch
  "open": true,              // Auto-open browser (true/false)
  "notify": false            // Show notifications (true/false)
}
```

---

## Troubleshooting

### Server Won't Start
**Error:** `Port 3000 is already in use`
- **Solution:** Stop other server or change port in `bs-config.json`

**Error:** `npm: command not found`
- **Solution:** Install Node.js from nodejs.org
- Verify: Run `node --version` and `npm --version`

**Error:** `Cannot find module`
- **Solution:** Run `npm install` again

### Browser Doesn't Auto-Reload
1. Check terminal for errors
2. Make sure you're editing files in the watched directories
3. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Changes Not Showing
1. Clear browser cache: `Ctrl+Shift+Delete`
2. Hard refresh: `Ctrl+Shift+R`
3. Check if you saved the file
4. Check console for JavaScript errors (F12)

### CSS Not Loading
1. Check browser console for 404 errors
2. Verify file path in `index.html`: `href="assets/css/styles.css"`
3. Make sure file exists in correct location

---

## Before Going Live

### Pre-Deployment Checklist:
- [ ] Replace all Unsplash placeholder images with your own
- [ ] Update all contact information
- [ ] Test contact form
- [ ] Set up contact form email delivery (see README.md)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Optimize images (compress with TinyPNG.com)
- [ ] Add favicon.ico
- [ ] Test with slow internet connection
- [ ] Check for console errors
- [ ] Spell-check all content

### Deployment Options:
1. **GitHub Pages** (Free)
2. **Netlify** (Free tier)
3. **Vercel** (Free tier)
4. **Traditional hosting** (Bluehost, SiteGround, etc.)

**Files to upload:**
- Upload entire `INFT_Media` folder
- **DON'T upload:** `node_modules/` folder (already in .gitignore)

---

## Tips for Efficient Development

### 1. Use Code Editor with Live Preview
- **VS Code:** Install "Live Server" extension (alternative to npm server)
- **Sublime Text:** Install plugins for syntax highlighting
- **Atom:** Built-in live reload features

### 2. Keyboard Shortcuts
- `Ctrl+S` - Save file
- `Ctrl+Shift+R` - Hard refresh browser
- `F12` - Open DevTools
- `Ctrl+Shift+M` - Toggle mobile view in DevTools

### 3. Browser DevTools Features
- **Elements tab:** Inspect and edit HTML/CSS live
- **Console tab:** See JavaScript errors and logs
- **Network tab:** Check if files are loading
- **Application tab:** View localStorage, cookies, etc.

### 4. Version Control (Optional but Recommended)
```bash
# Initialize git repository
git init

# Make first commit
git add .
git commit -m "Initial commit with npm dev setup"

# After making changes
git add .
git commit -m "Description of changes"
```

---

## Need Help?

- **Full Documentation:** See `README.md`
- **Quick Reference:** See `QUICK_START.md`
- **This Guide:** Development-specific help

---

## Server Currently Running! 🚀

Your development server is **already running** at:
- **Local:** http://localhost:3000
- **Network:** Check terminal for external URL

### To stop the server:
Press `Ctrl+C` in the terminal where it's running

### To restart:
```bash
npm run dev
```

---

**Happy coding!** 🎨📸

Last Updated: 2025-10-20
