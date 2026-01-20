# Asoldi Referral Form

A referral form component for Asoldi that can be integrated into your website via iframe.

## Features

- Referral form with email submission
- Post-submission options (Gmail, message, IRL)
- Referral payout tiers visualization
- Step-by-step process indicator with glow effects
- Responsive design
- Iframe-ready

## Installation

```bash
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

Or use:

```bash
npm run
```

The app will be available at `http://localhost:5173`

## Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment to Vercel

### Quick Deploy

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
   Then create a new repo on GitHub and push:
   ```bash
   git remote add origin https://github.com/yourusername/asoldi-referral-form.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Using Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Integration

To integrate this component into your website via iframe:

1. Deploy to Vercel (see above) or build and host the `dist` folder
2. Add the iframe to your WordPress/Elementor page:

```html
<iframe 
  src="https://your-project.vercel.app" 
  width="100%" 
  height="auto"
  frameborder="0"
  scrolling="no"
  style="border: none; min-height: 1000px; display: block;"
></iframe>
```

## Form Submission

The form sends an email to `damian@asoldi.com` using a mailto link. The email includes:
- Your name
- Your email
- Business owner's name
- Company name

## Terms of Service

The terms of service link points to: `https://asoldi.com/vilkar-betingelser`
