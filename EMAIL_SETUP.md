# Email Setup Instructions

To enable automatic email sending, you need to set up EmailJS (free service).

## Quick Setup:

1. **Sign up at [EmailJS.com](https://www.emailjs.com/)** (free account)

2. **Create an Email Service:**
   - Go to Email Services → Add New Service
   - Choose your email provider (Gmail recommended)
   - Connect your email account
   - Copy the **Service ID**

3. **Create an Email Template:**
   - Go to Email Templates → Create New Template
   - Set "To Email" to: `damian@asoldi.com`
   - Set "Subject" to: `{{subject}}`
   - Set "Content" to:
     ```
     {{message}}
     
     From: {{from_name}} ({{from_email}})
     ```
   - Copy the **Template ID**

4. **Get your Public Key:**
   - Go to Account → API Keys
   - Copy your **Public Key**

5. **Update the code:**
   - Open `src/components/ReferralForm.tsx`
   - Replace `YOUR_SERVICE_ID` with your Service ID
   - Replace `YOUR_TEMPLATE_ID` with your Template ID
   - Replace `YOUR_PUBLIC_KEY` with your Public Key

6. **Install dependencies:**
   ```bash
   npm install
   ```

That's it! The form will now automatically send emails to damian@asoldi.com when submitted.
