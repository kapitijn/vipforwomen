# VIP For Women - E-commerce Platform

A modern, headless e-commerce platform built with Next.js, WooCommerce, and Stripe.

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS
- **Backend CMS**: WordPress + WooCommerce (Headless)
- **Payments**: PayPal (perfect for Suriname!)
- **State Management**: Zustand
- **Hosting**: Bluehost (WordPress) + Vercel (Frontend)

## 🚀 Features

- ✅ Product catalog with categories and search
- ✅ Shopping cart with persistent storage
- ✅ Secure checkout with PayPal
- ✅ Real-time inventory sync with WooCommerce
- ✅ Responsive design for all devices
- ✅ Server-side rendering for SEO
- ✅ Automatic order creation in WooCommerce
- ✅ Payment webhooks for order status updates

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- WordPress site with WooCommerce installed
- PayPal account (Business or Personal)
- Bluehost hosting account
- Vercel account (free tier works)

## 🛠️ Local Development Setup

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/yourusername/vipforwomen.git
cd vipforwomen
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# WordPress/WooCommerce Backend
NEXT_PUBLIC_WOOCOMMERCE_URL=https://your-wordpress-site.com
WOOCOMMERCE_CONSUMER_KEY=ck_your_consumer_key_here
WOOCOMMERCE_CONSUMER_SECRET=cs_your_consumer_secret_here

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
PAYPAL_MODE=sandbox

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=VIP For Women

# Security
API_SECRET_KEY=generate-a-random-secret-key-here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment Guide

See detailed deployment instructions in:
- [START-HERE.md](./START-HERE.md) - **Read this first!** Quick setup for PayPal
- [PAYPAL-SETUP.md](./PAYPAL-SETUP.md) - Complete PayPal configuration guide
- [DEPLOYMENT-BLUEHOST.md](./DEPLOYMENT-BLUEHOST.md) - WordPress/WooCommerce setup on Bluehost
- [DEPLOYMENT-VERCEL.md](./DEPLOYMENT-VERCEL.md) - Frontend deployment on Vercel
- [SETUP-GUIDE.md](./SETUP-GUIDE.md) - Complete step-by-step setup guide

## 🔑 Getting API Keys

### WooCommerce API Keys

1. Login to WordPress Admin
2. Go to WooCommerce → Settings → Advanced → REST API
3. Click "Add Key"
4. Set permissions to "Read/Write"
5. Copy Consumer Key and Secret

### PayPal API Keys

1. Login to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard)
2. Go to My Apps & Credentials
3. Create an App
4. Copy Client ID and Secret
5. See [PAYPAL-SETUP.md](./PAYPAL-SETUP.md) for detailed instructions

## 📁 Project Structure

```
vipforwomen/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── create-payment-intent/
│   │   └── stripe-webhook/
│   ├── cart/                # Cart page
│   ├── checkout/            # Checkout page
│   ├── product/[slug]/      # Product detail pages
│   ├── shop/                # Shop page
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ProductDetail.tsx
├── lib/                     # Utility functions
│   ├── woocommerce.ts      # WooCommerce API
│   └── stripe.ts           # Stripe API
├── store/                   # State management
│   └── cart.ts             # Cart store
├── types/                   # TypeScript types
│   └── index.ts
└── public/                  # Static assets
```

## 🧪 Testing

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔒 Security Best Practices

1. Never commit `.env` file to Git
2. Use environment variables for all API keys
3. Enable Stripe webhook signature verification
4. Validate all payments server-side
5. Use HTTPS in production
6. Keep WordPress and WooCommerce updated

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Support

For issues or questions:
- Check the [Setup Guide](./SETUP-GUIDE.md)
- Contact support

## 📄 License

MIT License - see LICENSE file for details
tets foe vipfor women
