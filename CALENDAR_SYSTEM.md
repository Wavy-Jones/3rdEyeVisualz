# Interactive Calendar & Time Slot Booking System

## Overview

Your booking form now features a professional interactive calendar with visual availability display and time slot selection - similar to Google Calendar!

---

## Features

### 1. Visual Calendar Display
- **Monthly view** with navigation arrows
- **Color-coded dates:**
  - 🟢 Green = Available
  - 🔴 Red = Fully booked
  - ⚪ Gray = Past dates (disabled)
  - 🔵 Blue border = Today
  - 🟣 Purple = Selected date

### 2. Time Slot System
- **10 time slots per day** (8 AM - 7 PM)
- Visual display of available/booked slots
- Click to select preferred time
- Booked slots are disabled and grayed out

### 3. Smart Validation
- ✅ Past dates cannot be clicked
- ✅ Booked dates shown in red
- ✅ Must select both date AND time slot
- ✅ Real-time error handling

---

## How It Works

### For Customers:

1. **Click "Book Now"** button
2. **View the calendar** - see available dates
3. **Click a green date** - selects the date
4. **View time slots** - appear automatically
5. **Click a time slot** - selects the time
6. **Complete booking form**
7. **Submit!**

### Visual Feedback:

```
Customer clicks October 22 (green)
  ↓
Date turns purple (selected)
  ↓
Time slots appear below
  ↓
Available slots: White background
Booked slots: Red background (can't click)
  ↓
Customer clicks "14:00-16:00"
  ↓
Time slot turns purple (selected)
  ↓
Ready to submit!
```

---

## Current Booking Data

### Simulated Booked Dates:
```javascript
// These dates are fully booked (shown in red)
- October 25, 2025
- October 30, 2025
- November 5, 2025
- November 15, 2025
- November 20, 2025
```

### Simulated Booked Time Slots:
```javascript
// Partially booked dates (some time slots unavailable)
October 22, 2025:
  - 09:00-11:00 (booked)
  - 14:00-16:00 (booked)

October 23, 2025:
  - 10:00-12:00 (booked)

November 1, 2025:
  - 08:00-10:00 (booked)
  - 16:00-18:00 (booked)
```

---

## Connecting to Real Database

Currently, the calendar uses **hardcoded sample data** for demonstration. To connect to a real booking system:

### Option 1: Simple JSON File (Quick)

1. Create `bookings.json` file:
```json
{
  "bookedDates": [
    "2025-10-25",
    "2025-10-30"
  ],
  "bookedTimeSlots": {
    "2025-10-22": ["09:00-11:00", "14:00-16:00"],
    "2025-10-23": ["10:00-12:00"]
  }
}
```

2. Update `script.js` (lines 416-429):
```javascript
// Fetch from JSON file
fetch('bookings.json')
  .then(response => response.json())
  .then(data => {
    bookedDates = data.bookedDates;
    bookedTimeSlots = data.bookedTimeSlots;
    renderCalendar();
  });
```

### Option 2: Backend API (Professional)

**With Firebase (Recommended for beginners):**

1. Sign up at firebase.google.com
2. Create Firestore database
3. Store bookings:
```javascript
// Structure:
bookings/
  ├── 2025-10-22/
  │   ├── timeSlots: ["09:00-11:00", "14:00-16:00"]
  │   └── customerInfo: {...}
```

4. Update JavaScript to fetch from Firebase:
```javascript
import { getFirestore, collection, getDocs } from 'firebase/firestore';

async function loadBookings() {
  const db = getFirestore();
  const bookingsRef = collection(db, 'bookings');
  const snapshot = await getDocs(bookingsRef);

  // Process bookings data
  snapshot.forEach(doc => {
    const date = doc.id;
    const slots = doc.data().timeSlots;
    bookedTimeSlots[date] = slots;
  });

  renderCalendar();
}
```

**With Custom Backend:**

Create API endpoints:
```
GET  /api/bookings/dates          - Get all booked dates
GET  /api/bookings/slots/:date    - Get booked slots for specific date
POST /api/bookings                - Create new booking
```

---

## Customization

### Change Time Slots

**File:** `assets/js/script.js` (lines 544-555)

```javascript
const allTimeSlots = [
  '08:00-10:00',
  '09:00-11:00',
  // Add your preferred time slots here
  '10:00-12:00',
  '11:00-13:00',
  // etc...
];
```

**Examples:**
- Wedding photographer: 4-hour slots
  ```javascript
  ['08:00-12:00', '13:00-17:00', '18:00-22:00']
  ```

- Portrait sessions: 1-hour slots
  ```javascript
  ['09:00-10:00', '10:00-11:00', '11:00-12:00', ...]
  ```

### Change Colors

**File:** `assets/css/styles.css`

**Available dates** (currently green):
```css
.calendar-day.available {
    background: #e8f5e9;  /* Light green */
    color: #2e7d32;       /* Dark green text */
}
```

**Booked dates** (currently red):
```css
.calendar-day.booked {
    background: #ffebee;  /* Light red */
    color: #c62828;       /* Dark red text */
}
```

**Selected date** (currently purple):
```css
.calendar-day.selected {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}
```

### Block Specific Days

**Example: Block all Sundays**

In `renderCalendar()` function, add:
```javascript
const dayOfWeek = currentDate.getDay();
if (dayOfWeek === 0) { // 0 = Sunday
    dayElement.classList.add('booked');
    continue;
}
```

**Example: Block holidays**

```javascript
const holidays = ['2025-12-25', '2025-01-01'];
if (holidays.includes(dateString)) {
    dayElement.classList.add('booked');
    continue;
}
```

---

## Advanced Features

### Add Pricing Per Time Slot

1. Create pricing data:
```javascript
const pricing = {
    '08:00-10:00': 5000,  // R5,000
    '10:00-12:00': 5000,
    '14:00-16:00': 7500,  // Evening premium
    '17:00-19:00': 10000  // Golden hour premium
};
```

2. Display price on slot:
```javascript
slotElement.textContent = `${slot} - R${pricing[slot]}`;
```

### Add Capacity Limits

```javascript
const capacityLimits = {
    '2025-10-22': {
        '09:00-11:00': { booked: 2, max: 3 }, // 2/3 booked
        '14:00-16:00': { booked: 3, max: 3 }  // Fully booked
    }
};

// Show "Almost Full" warning
if (booked === max - 1) {
    slotElement.classList.add('almost-full');
    slotElement.innerHTML += ' <span>Almost Full!</span>';
}
```

### Add Buffer Times

```javascript
// Don't allow back-to-back bookings
function hasBuffer(date, slot) {
    const slotIndex = allTimeSlots.indexOf(slot);
    const prevSlot = allTimeSlots[slotIndex - 1];
    const nextSlot = allTimeSlots[slotIndex + 1];

    const bookedSlots = bookedTimeSlots[date] || [];

    // Block if previous or next slot is booked
    return !bookedSlots.includes(prevSlot) &&
           !bookedSlots.includes(nextSlot);
}
```

---

## Testing the Calendar

### Test Scenarios:

1. **Past Dates:**
   - Navigate to previous months
   - Try clicking past dates
   - ✅ Should not be clickable (gray)

2. **Booked Dates:**
   - Click October 25, 2025
   - ✅ Should show as red/booked
   - ✅ Should not be clickable

3. **Available Dates:**
   - Click October 22, 2025
   - ✅ Should turn purple when selected
   - ✅ Should show time slots below

4. **Booked Time Slots:**
   - Select October 22, 2025
   - Look at time slots
   - ✅ 09:00-11:00 should be grayed out (booked)
   - ✅ Other slots should be clickable

5. **Month Navigation:**
   - Click left/right arrows
   - ✅ Should change months
   - ✅ Should maintain proper date highlighting

---

## File Locations

### HTML Structure
**File:** `index.html` (lines 285-331)
- Calendar container
- Time slots container
- Legend for color coding

### CSS Styling
**File:** `assets/css/styles.css` (lines 816-1039)
- Calendar layout
- Color schemes
- Time slot styling
- Responsive design

### JavaScript Logic
**File:** `assets/js/script.js` (lines 408-598)
- `initCalendar()` - Initialize calendar
- `renderCalendar()` - Draw calendar days
- `selectDate()` - Handle date selection
- `showTimeSlots()` - Display time slots
- `selectTimeSlot()` - Handle time selection

### Sample Data
**File:** `assets/js/script.js` (lines 416-429)
- Booked dates array
- Booked time slots object

---

## Troubleshooting

### Calendar Not Showing

**Check:**
1. Browser console for errors (F12)
2. Modal is open (click "Book Now")
3. JavaScript loaded correctly

**Fix:**
```bash
# Refresh page
Ctrl + Shift + R (hard refresh)

# Check console
F12 → Console tab → Look for errors
```

### Dates Not Clickable

**Possible causes:**
1. Date is in the past
2. Date is in bookedDates array
3. JavaScript error

**Check:**
```javascript
// Open console and check
console.log(bookedDates);
console.log(currentMonth, currentYear);
```

### Time Slots Not Appearing

**Check:**
1. Date is selected (should be purple)
2. `selectedDate` variable is set
3. No console errors

**Debug:**
```javascript
// Add to selectDate() function
console.log('Selected date:', dateString);
console.log('Showing slots for:', dateString);
```

---

## Future Enhancements

**Consider adding:**

1. **Multi-date booking** - Select multiple dates for events
2. **Recurring bookings** - Weekly/monthly sessions
3. **Waitlist system** - For fully booked dates
4. **Deposit payments** - Secure booking with payment
5. **Email reminders** - Automatic booking confirmations
6. **SMS notifications** - Real-time updates
7. **Calendar sync** - Export to Google Calendar
8. **Admin dashboard** - Manage all bookings
9. **Client portal** - View/manage their bookings
10. **Analytics** - Popular dates, revenue tracking

---

## Summary

Your photography website now has a **professional booking calendar** that:

- ✅ Shows available dates visually
- ✅ Prevents bookings on past dates
- ✅ Displays booked dates clearly
- ✅ Offers time slot selection
- ✅ Works on mobile and desktop
- ✅ Provides excellent user experience
- ✅ Ready to connect to real database

**To see it in action:**
1. Run `npm run dev`
2. Click "Book Now"
3. Try selecting different dates
4. See the time slots appear!

---

**Last Updated:** 2025-10-20
