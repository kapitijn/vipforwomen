# 🚀 Quick Start Guide

Get your VIP For Women e-commerce site running in minutes!

## Prerequisites Installed?

Before starting, make sure you have:
- [ ] Node.js 18+ (`node --version`)
- [ ] Git (`git --version`)
- [ ] Code editor (VS Code recommended)

## Step 1: Install Dependencies (2 minutes)

```bash
npm install
```

Wait for installation to complete. This installs all required packages.

## Step 2: Configure Environment (5 minutes)

```bash
# Copy the example file
cp .env.example .env
```

Now open `.env` in your editor and fill in:

```env
# WordPress/WooCommerce (from Bluehost setup)
NEXT_PUBLIC_WOOCOMMERCE_URL=https://your-wordpress-site.com
WOOCOMMERCE_CONSUMER_KEY=ck_your_key_here
WOOCOMMERCE_CONSUMER_SECRET=cs_your_secret_here

# Stripe (from Stripe dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret

# Site settings
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=VIP For Women

# Generate a random string for this
API_SECRET_KEY=your-random-32-character-string
```

**Don't have API keys yet?** See:
- [DEPLOYMENT-BLUEHOST.md](./DEPLOYMENT-BLUEHOST.md) for WooCommerce setup
- [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) for Stripe keys

## Step 3: Start Development Server (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What You Should See

✅ **Homepage** with:
- Navigation header
- Hero section
- Featured products (from WooCommerce)
- Category cards
- Footer

✅ **Shop Page** (`/shop`) with:
- Product grid
- Product cards with images and prices

✅ **Working Cart**:
- Add products to cart
- Cart icon shows count
- Cart persists after refresh

## Testing the Complete Flow

1. **Browse Products**: Click "Shop" in navigation
2. **Add to Cart**: Click shopping cart icon on any product
3. **View Cart**: Click cart icon in header
4. **Proceed to Checkout**: Fill in billing information
5. **Test Payment**: Use card `4242 4242 4242 4242`
6. **Verify**: Check order in WooCommerce admin

## Common First-Time Issues

### Products Not Loading?

```bash
# Check your API connection
curl "https://your-wordpress-site.com/wp-json/wc/v3/products?consumer_key=YOUR_KEY&consumer_secret=YOUR_SECRET"
```

If this returns JSON with products, your API is working!

### Images Not Showing?

1. Check `next.config.js` has `remotePatterns` configured
2. Verify images in WooCommerce are using HTTPS
3. Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

### Port 3000 Already in Use?

```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

## Next Steps

### For Local Development:
1. Keep customizing the design
2. Add more products in WooCommerce
3. Test all features thoroughly

### Ready to Deploy?
1. Follow [DEPLOYMENT-BLUEHOST.md](./DEPLOYMENT-BLUEHOST.md) for WordPress setup
2. Follow [DEPLOYMENT-VERCEL.md](./DEPLOYMENT-VERCEL.md) for frontend deployment
3. Use [SETUP-GUIDE.md](./SETUP-GUIDE.md) for complete walkthrough

## Project Structure

```
vipforwomen/
├── app/                    # Pages and routes
│   ├── page.tsx           # Homepage
│   ├── shop/              # Shop page
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # API integrations
├── store/                 # State management
└── types/                 # TypeScript types
```

## Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Test production build
npm run start        # Run production build locally

# Debugging
npm run lint         # Check for errors
```

## Need Help?

- **Setup Issues**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Full Guide**: See [SETUP-GUIDE.md](./SETUP-GUIDE.md)
- **Deployment**: See [DEPLOYMENT-VERCEL.md](./DEPLOYMENT-VERCEL.md)

## Quick Reference Links

- [Main README](./README.md)
- [Setup Guide](./SETUP-GUIDE.md)
- [Bluehost Deployment](./DEPLOYMENT-BLUEHOST.md)
- [Vercel Deployment](./DEPLOYMENT-VERCEL.md)
- [Troubleshooting](./TROUBLESHOOTING.md)

---

**Ready to sell?** Start by setting up WordPress on Bluehost, then deploy to Vercel!

Happy coding! 🎉
