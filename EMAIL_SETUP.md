# Email Notification Setup for Booking System

Your booking system is ready! Now you need to connect it to send email notifications.

---

## Current Status

✅ Booking form is fully functional with validation
✅ Form collects all customer information
❌ Emails are not yet being sent (shows alert only)

---

## Quick Setup Options

### Option 1: FormSpree (Easiest - Recommended for Beginners)

**Time:** 5 minutes | **Cost:** Free for 50 submissions/month

#### Steps:

1. **Create Account:**
   - Go to https://formspree.io/
   - Sign up for free account

2. **Create New Form:**
   - Click "New Form"
   - Name it "INFNT Media Bookings"
   - You'll get a form endpoint like: `https://formspree.io/f/xyzabc123`

3. **Update Your Website:**

   Open `index.html` and find line 248:
   ```html
   <!-- FIND THIS: -->
   <form id="bookingForm" novalidate>

   <!-- REPLACE WITH: -->
   <form id="bookingForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

4. **Update JavaScript:**

   Open `assets/js/script.js` and find line 597:
   ```javascript
   // FIND THIS COMMENT:
   // In a real application, this would send to your email

   // REPLACE THE ALERT (line 600) WITH:
   // Let FormSpree handle the submission
   bookingForm.submit();
   ```

5. **Test:**
   - Fill out the booking form
   - Submit
   - Check your email!

**Pros:**
- ✅ Super easy setup
- ✅ No backend code needed
- ✅ Automatic spam protection
- ✅ Mobile notifications

**Cons:**
- ❌ 50 submissions/month limit (upgrade for more)
- ❌ FormSpree branding on free tier

---

### Option 2: EmailJS (No Backend - Recommended)

**Time:** 10 minutes | **Cost:** Free for 200 emails/month

#### Steps:

1. **Create Account:**
   - Go to https://www.emailjs.com/
   - Sign up for free

2. **Add Email Service:**
   - Connect your Gmail/Outlook/etc.
   - Follow their setup wizard

3. **Create Email Template:**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template:

   ```
   Subject: 📸 New Booking Request from {{name}}

   You have a new photography booking request!

   CLIENT DETAILS:
   Name: {{name}}
   Email: {{email}}
   Phone: {{phone}}

   BOOKING DETAILS:
   Service: {{service}}
   Date: {{date}}
   Time: {{time}}
   Location: {{location}}
   Duration: {{duration}}
   Number of Guests: {{guests}}
   Budget: {{budget}}

   SPECIAL REQUIREMENTS:
   {{message}}

   ---
   Sent from 3rdEye_Visualz Website
   ```

4. **Get Your IDs:**
   - Service ID: e.g., `service_abc123`
   - Template ID: e.g., `template_xyz456`
   - Public Key: e.g., `user_123abc`

5. **Update Your Website:**

   Add EmailJS library to `index.html` (before closing `</body>` tag):
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script>
       (function(){
           emailjs.init("YOUR_PUBLIC_KEY");
       })();
   </script>
   ```

6. **Update JavaScript:**

   Open `assets/js/script.js` and replace lines 597-604 with:

   ```javascript
   // Send email via EmailJS
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
       .then(function(response) {
           alert(`Thank you, ${formData.name}!\n\nYour booking request has been received.\n\nWe'll contact you within 24 hours.\n\n📧 Check your email for confirmation.`);
           bookingForm.reset();
           closeBookingModal();
       }, function(error) {
           alert('Sorry, there was an error sending your booking. Please call us directly at +27 72 148 0697');
           console.error('EmailJS Error:', error);
       });
   ```

**Pros:**
- ✅ More customization
- ✅ 200 emails/month free
- ✅ Multiple email templates
- ✅ Delivery tracking

**Cons:**
- ❌ Slightly more complex setup
- ❌ Requires API keys management

---

### Option 3: Getform (Alternative to FormSpree)

**Time:** 5 minutes | **Cost:** Free for 50 submissions/month

#### Steps:

1. Go to https://getform.io/
2. Create free account
3. Create new form
4. Get your form endpoint
5. Add `action` attribute to your form (same as FormSpree method)

---

### Option 4: Custom Backend (Advanced)

If you want full control, create a backend server:

**Technologies:**
- Node.js + Express + Nodemailer
- PHP + PHPMailer
- Python + Flask + SMTP

**Time:** 1-2 hours | **Cost:** Hosting required

This requires programming knowledge. See `BACKEND_SETUP.md` for detailed instructions (create this file if needed).

---

## Recommended Setup for You

**For 3rdEye_Visualz, I recommend:**

### EmailJS (Option 2)

**Why?**
- ✅ 200 free emails/month (enough for starting)
- ✅ Professional - no branding
- ✅ You maintain full control
- ✅ Easy to customize email template
- ✅ Can track email delivery

---

## Testing Your Email Setup

After setup, test the booking form:

1. **Fill out form with test data:**
   - Name: Test Booking
   - Email: Your email
   - Service: Wedding Photography
   - Date: Tomorrow
   - Fill all other fields

2. **Submit and check:**
   - ✅ Form submits without errors
   - ✅ You receive email notification
   - ✅ Email contains all booking details
   - ✅ Email is formatted correctly

3. **Test error cases:**
   - Try submitting empty form (should show errors)
   - Try invalid email (should show error)
   - Try past date (should show error)

---

## Email Template Customization

Your booking emails should include:

**To YOU (Business Owner):**
```
Subject: 📸 New Booking Request

You have a new booking!

[All customer details and booking info]

Click to respond: [Customer email]
```

**To CUSTOMER (Auto-reply):**
```
Subject: Booking Confirmation - 3rdEye_Visualz

Hi [Customer Name],

Thank you for your booking request!

We received your request for:
- Service: [Service]
- Date: [Date]
- Location: [Location]

We'll contact you within 24 hours at [Phone] or [Email] to confirm and discuss details.

Best regards,
3rdEye_Visualz
+27 72 148 0697
infntmediasolutions@gmail.com
```

---

## Troubleshooting

### Emails Not Sending

1. **Check browser console:**
   - Press F12
   - Go to "Console" tab
   - Look for errors

2. **Verify API keys:**
   - Make sure you copied them correctly
   - No extra spaces
   - Correct capitalization

3. **Check spam folder:**
   - Booking emails might go to spam initially
   - Mark as "Not Spam"

### Form Submits But No Email

1. **Check service status:**
   - FormSpree: Check your dashboard
   - EmailJS: Check sent emails count

2. **Verify email address:**
   - Make sure your business email is verified
   - Check email service settings

### Validation Errors

1. **Check required fields:**
   - All fields marked with * must be filled

2. **Date issues:**
   - Can't select past dates
   - Date must be in future

---

## Security Best Practices

1. **Never expose private keys:**
   - Only use public keys in frontend
   - Keep service IDs safe

2. **Enable spam protection:**
   - Both FormSpree and EmailJS have built-in protection
   - Consider adding reCAPTCHA for extra security

3. **Validate on backend:**
   - If using custom backend, validate all inputs
   - Prevent injection attacks

---

## Cost Comparison

| Service | Free Tier | Paid Plans | Best For |
|---------|-----------|------------|----------|
| **FormSpree** | 50/month | $10/month for 1000 | Quick setup |
| **EmailJS** | 200/month | $15/month for 1000 | Best value |
| **Getform** | 50/month | $9/month for 500 | Alternative |
| **Custom Backend** | Depends on hosting | $5-20/month | Full control |

---

## Next Steps

1. **Choose your email service** (I recommend EmailJS)
2. **Follow the setup steps** above
3. **Test thoroughly** with real bookings
4. **Monitor your inbox** for new bookings!

---

## Support

If you need help setting up email notifications:

1. **FormSpree Docs:** https://help.formspree.io/
2. **EmailJS Docs:** https://www.emailjs.com/docs/
3. **Your Developer:** Contact whoever set up this website

---

## Current Form Data

Your booking form collects:

- ✅ Customer name
- ✅ Email address
- ✅ Phone number
- ✅ Photography service type
- ✅ Preferred date
- ✅ Preferred time
- ✅ Event location
- ✅ Duration needed
- ✅ Number of guests
- ✅ Budget range
- ✅ Special requirements

All this information will be included in the email notification!

---

**Ready to receive bookings? Set up your email service now!** 📧

Last Updated: 2025-10-20
