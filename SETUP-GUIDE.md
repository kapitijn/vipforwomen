# Complete Setup Guide - VIP For Women E-commerce

This guide walks you through the entire process of setting up your headless e-commerce platform from scratch.

## 📖 Table of Contents

1. [Overview](#overview)
2. [Timeline & Costs](#timeline--costs)
3. [Prerequisites](#prerequisites)
4. [Phase 1: WordPress/WooCommerce Setup](#phase-1-wordpresswoocommerce-setup)
5. [Phase 2: Stripe Configuration](#phase-2-stripe-configuration)
6. [Phase 3: Frontend Setup](#phase-3-frontend-setup)
7. [Phase 4: Deployment](#phase-4-deployment)
8. [Phase 5: Testing](#phase-5-testing)
9. [Phase 6: Go Live](#phase-6-go-live)
10. [Maintenance](#maintenance)

---

## Overview

### Architecture Diagram

```
┌─────────────────┐
│   Customer      │
│   Browser       │
└────────┬────────┘
         │
         ├─────────── Next.js Frontend (Vercel)
         │            ├─ Product pages
         │            ├─ Shopping cart
         │            └─ Checkout UI
         │
         ├─────────── WooCommerce API (Bluehost)
         │            ├─ Products
         │            ├─ Inventory
         │            └─ Orders
         │
         └─────────── Stripe API
                      ├─ Payment processing
                      └─ Webhooks
```

### How It Works

1. **Customer browses** → Next.js frontend fetches products from WooCommerce API
2. **Customer adds to cart** → Stored locally in browser (Zustand state)
3. **Customer checks out** → Frontend sends order to API route
4. **API validates** → Creates Stripe payment intent + WooCommerce order
5. **Customer pays** → Stripe processes payment
6. **Webhook fires** → Updates order status in WooCommerce
7. **Customer receives confirmation** → Email sent via WooCommerce

---

## Timeline & Costs

### Estimated Timeline
- **WordPress/WooCommerce Setup:** 2-3 hours
- **Product Upload:** 1-4 hours (depending on catalog size)
- **Frontend Deployment:** 1-2 hours
- **Stripe Configuration:** 30 minutes
- **Testing:** 2-3 hours
- **Total:** 1-2 days

### Estimated Costs
- **Bluehost Hosting:** $2.95-$13.95/month
- **Domain Name:** $12-$15/year (often free first year)
- **Vercel Hosting:** $0 (free tier) or $20/month (Pro)
- **Stripe Fees:** 2.9% + $0.30 per transaction
- **Total Monthly:** ~$3-$34 depending on scale

---

## Prerequisites

### Accounts Needed
- [ ] Bluehost account (or similar WordPress hosting)
- [ ] Domain name registered
- [ ] GitHub account
- [ ] Vercel account
- [ ] Stripe account

### Software Required
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command prompt access

### Skills Needed
- Basic familiarity with WordPress
- Basic command line usage
- Understanding of Git (push/pull/commit)

---

## Phase 1: WordPress/WooCommerce Setup

### Step 1.1: Install WordPress on Bluehost

**Time:** 15 minutes

1. Login to Bluehost → Go to cPanel
2. Find "Marketplace" or "Mojo Marketplace"
3. Click WordPress → Install
4. Choose your domain
5. Create admin username/password (save these!)
6. Wait for installation complete email

**Verification:** Visit `https://yourdomain.com` - should see default WordPress site

### Step 1.2: Enable SSL

**Time:** 5 minutes

1. Bluehost cPanel → "My Sites"
2. Click "Manage Site" next to your domain
3. Turn on "Free SSL"
4. Enable "Force HTTPS Redirect"
5. Wait 10-15 minutes for certificate provisioning

**Verification:** Visit `https://yourdomain.com` - should show secure padlock

### Step 1.3: Install WooCommerce

**Time:** 20 minutes

1. Login to WordPress Admin: `https://yourdomain.com/wp-admin`
2. Go to Plugins → Add New
3. Search "WooCommerce"
4. Click "Install Now" → "Activate"
5. Complete setup wizard:
   - Store address: Your business address
   - Industry: Fashion/Apparel
   - Product types: Physical products
   - Business details: Fill in
   - Theme: Skip (we're headless)
   - Click "Continue" through remaining steps

### Step 1.4: Configure WooCommerce Settings

**Time:** 30 minutes

**General Settings:**
```
WooCommerce → Settings → General
- Currency: USD
- Currency Position: Left ($)
- Save Changes
```

**Shipping:**
```
WooCommerce → Settings → Shipping
- Add Shipping Zone: "United States"
- Add Shipping Method: "Flat Rate" ($10)
- Add Shipping Method: "Free Shipping" (over $100)
- Save Changes
```

**Tax (Optional):**
```
WooCommerce → Settings → Tax
- Enable tax rates: Yes
- Add rates for your state/country
```

### Step 1.5: Generate API Keys

**Time:** 5 minutes

1. Go to: `WooCommerce → Settings → Advanced → REST API`
2. Click "Add Key"
3. Fill in:
   - Description: "Frontend App"
   - User: Your admin user
   - Permissions: **Read/Write**
4. Click "Generate API Key"
5. **IMMEDIATELY COPY AND SAVE:**
   ```
   Consumer Key: ck_xxxxxxxxxxxxxxxxxxxxx
   Consumer Secret: cs_xxxxxxxxxxxxxxxxxxxxx
   ```

⚠️ **CRITICAL:** You won't see these again! Save in password manager.

### Step 1.6: Add Sample Products

**Time:** 1-2 hours

**Create First Product:**

1. Products → Add New
2. Fill in:
   ```
   Name: Elegant Summer Dress
   Description: Beautiful floral summer dress perfect for any occasion...
   Short Description: Lightweight and comfortable summer dress
   
   Product Data:
   - Regular Price: $89.99
   - Sale Price: $69.99
   - SKU: DRESS-001
   - Manage Stock: ✓ Yes
   - Stock Quantity: 50
   - Stock Status: In stock
   
   Categories: Create "Clothing" → Create "Dresses"
   Tags: summer, dress, floral
   
   Product Image: Upload main product image
   Product Gallery: Upload 3-4 additional images
   ```

3. Click "Publish"

**Add More Products:**
- Create at least 8-10 products for testing
- Use diverse categories
- Add quality images (minimum 800x800px)
- Set realistic inventory

**Product Ideas:**
- Dresses (3-4 items)
- Tops (2-3 items)
- Accessories (2-3 items)
- Shoes (2-3 items)

### Step 1.7: Configure CORS

**Time:** 10 minutes

Add to your theme's `functions.php`:

1. Appearance → Theme File Editor
2. Find `functions.php` on the right
3. Add at the bottom:

```php
// Enable CORS for WooCommerce API
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        return $value;
    });
}, 15);
```

4. Click "Update File"

### Step 1.8: Test API

**Time:** 5 minutes

Open in browser (replace with your credentials):
```
https://yourdomain.com/wp-json/wc/v3/products?consumer_key=ck_xxx&consumer_secret=cs_xxx
```

✅ **Success:** Should see JSON with your products
❌ **Failed:** Check API keys, CORS setup, permalink settings

---

## Phase 2: Stripe Configuration

### Step 2.1: Create Stripe Account

**Time:** 10 minutes

1. Go to https://stripe.com
2. Click "Sign Up"
3. Fill in business information
4. Verify email
5. Complete business profile

### Step 2.2: Get API Keys

**Time:** 5 minutes

1. Login to Stripe Dashboard
2. Click "Developers" in top menu
3. Click "API Keys"
4. Copy and save:
   ```
   Publishable Key: pk_test_xxxxxxxxxxxxx
   Secret Key: sk_test_xxxxxxxxxxxxx
   ```

⚠️ **Note:** These are TEST keys. You'll get LIVE keys after activating your account.

### Step 2.3: Configure Stripe Account

**Time:** 30 minutes

1. **Business Details:**
   ```
   Settings → Business Settings
   - Legal business name
   - Business address
   - Phone number
   - Industry: E-commerce
   - Website: Your domain
   ```

2. **Branding:**
   ```
   Settings → Branding
   - Upload logo
   - Choose brand colors
   - Set icon/accent color
   ```

3. **Customer Emails:**
   ```
   Settings → Customer Emails
   - Enable receipt emails: ✓
   - Customize email templates
   ```

---

## Phase 3: Frontend Setup

### Step 3.1: Clone Repository

**Time:** 5 minutes

```bash
# Open terminal/command prompt
cd ~/Desktop  # or your preferred location

# Clone the repository
git clone https://github.com/yourusername/vipforwomen.git

# Navigate into project
cd vipforwomen

# Install dependencies
npm install
```

### Step 3.2: Configure Environment Variables

**Time:** 10 minutes

1. Copy example file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` in your code editor

3. Fill in all values:
   ```env
   # From WordPress/WooCommerce
   NEXT_PUBLIC_WOOCOMMERCE_URL=https://yourdomain.com
   WOOCOMMERCE_CONSUMER_KEY=ck_your_actual_key_here
   WOOCOMMERCE_CONSUMER_SECRET=cs_your_actual_secret_here

   # From Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   STRIPE_SECRET_KEY=sk_test_your_secret_here
   STRIPE_WEBHOOK_SECRET=whsec_leave_empty_for_now

   # Site Config
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME=VIP For Women

   # Generate random string for API_SECRET_KEY
   API_SECRET_KEY=use_random_password_generator_32chars
   ```

4. Save the file

### Step 3.3: Test Locally

**Time:** 10 minutes

```bash
# Start development server
npm run dev
```

Open browser: http://localhost:3000

**Check:**
- [ ] Site loads without errors
- [ ] Products display from WooCommerce
- [ ] Product images show correctly
- [ ] Can add items to cart
- [ ] Cart persists after refresh

**Troubleshooting:**
- If products don't load, check WOOCOMMERCE API keys
- If images don't show, check next.config.js
- Check browser console for errors

---

## Phase 4: Deployment

### Step 4.1: Push to GitHub

**Time:** 10 minutes

```bash
# Create new repository on GitHub first
# Then run these commands:

git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/vipforwomen.git
git push -u origin main
```

**Verify:** Check GitHub - all code should be there (except .env)

### Step 4.2: Deploy to Vercel

**Time:** 15 minutes

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your `vipforwomen` repository
5. Configure:
   - Framework: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build`

6. **Add Environment Variables:**
   Click "Environment Variables" and add ALL from your `.env` file
   - Set each to: Production, Preview, Development

7. Click "Deploy"
8. Wait 2-3 minutes

**Your site is live!** at `https://project-name.vercel.app`

### Step 4.3: Test Production Site

**Time:** 15 minutes

Visit your Vercel URL and test:
- [ ] Products load
- [ ] Images display
- [ ] Can add to cart
- [ ] Checkout form appears

### Step 4.4: Configure Stripe Webhooks

**Time:** 10 minutes

1. **Get webhook URL:**
   ```
   https://your-vercel-url.vercel.app/api/stripe-webhook
   ```

2. **Add in Stripe:**
   ```
   Stripe Dashboard → Developers → Webhooks
   - Click "Add endpoint"
   - URL: Your webhook URL
   - Events: payment_intent.succeeded, payment_intent.payment_failed
   - Add endpoint
   ```

3. **Get signing secret:**
   - Click on new webhook
   - Reveal "Signing secret"
   - Copy: `whsec_xxxxxxxxxxxxx`

4. **Update Vercel:**
   ```
   Vercel Dashboard → Your Project → Settings → Environment Variables
   - Find: STRIPE_WEBHOOK_SECRET
   - Add value: whsec_xxxxxxxxxxxxx
   - Save
   ```

5. **Redeploy:**
   ```
   Deployments → Click "..." on latest → Redeploy
   ```

---

## Phase 5: Testing

### Step 5.1: End-to-End Test Purchase

**Time:** 20 minutes

1. **Browse Products:**
   - Visit your live site
   - Browse products
   - Check categories work

2. **Add to Cart:**
   - Add multiple items
   - Update quantities
   - Remove an item

3. **Checkout:**
   - Click "Proceed to Checkout"
   - Fill in billing info (use real format)
   - Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - Complete purchase

4. **Verify Order in WooCommerce:**
   - Login to WordPress admin
   - WooCommerce → Orders
   - Should see new order
   - Status should be "Processing"

5. **Check Email:**
   - Should receive order confirmation

### Step 5.2: Test Payment Failures

**Time:** 10 minutes

Test with declined card:
```
Card: 4000 0000 0000 0002
Result: Should show payment failed message
Order: Should be created but marked as "Failed" in WooCommerce
```

### Step 5.3: Mobile Testing

**Time:** 15 minutes

Test on actual mobile device:
- [ ] Layout responsive
- [ ] Images load properly
- [ ] Forms work correctly
- [ ] Checkout flow smooth
- [ ] Payment form responsive

---

## Phase 6: Go Live

### Step 6.1: Switch to Live Stripe Keys

**Time:** 15 minutes

1. **Activate Stripe Account:**
   ```
   Stripe Dashboard → Activate your account
   - Complete business verification
   - Add bank account
   - Verify identity
   ```

2. **Get Live Keys:**
   ```
   Developers → API Keys → Switch to "Live"
   - Copy Publishable Key: pk_live_xxxxx
   - Copy Secret Key: sk_live_xxxxx
   ```

3. **Create Live Webhook:**
   ```
   Developers → Webhooks → Switch to "Live"
   - Add endpoint with your production URL
   - Copy webhook secret: whsec_xxxxx
   ```

4. **Update Vercel Variables:**
   ```
   Settings → Environment Variables
   - Update NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY → pk_live_xxx
   - Update STRIPE_SECRET_KEY → sk_live_xxx
   - Update STRIPE_WEBHOOK_SECRET → whsec_xxx (new live secret)
   - Select "Production" only for these
   ```

5. **Redeploy**

### Step 6.2: Add Custom Domain (Optional)

**Time:** 20 minutes

1. **Add Domain in Vercel:**
   ```
   Project Settings → Domains
   - Enter: shop.yourdomain.com
   - Click "Add"
   ```

2. **Configure DNS:**
   ```
   Bluehost → Domains → DNS Zone Editor
   - Add CNAME Record:
     - Type: CNAME
     - Host: shop
     - Points to: cname.vercel-dns.com
     - TTL: Automatic
   ```

3. **Wait for DNS propagation:** 5-30 minutes

4. **Verify SSL:** Should automatically provision

### Step 6.3: Final Checks

**Time:** 30 minutes

- [ ] Make real test purchase (small amount)
- [ ] Verify money appears in Stripe
- [ ] Check order in WooCommerce
- [ ] Test email notifications
- [ ] Check all pages load
- [ ] Test on multiple devices
- [ ] Check analytics working

### Step 6.4: Launch!

**Time:** 5 minutes

1. Announce on social media
2. Send to email list
3. Update Google Business profile
4. Monitor first orders carefully

---

## Maintenance

### Daily
- [ ] Check for new orders
- [ ] Respond to customer inquiries
- [ ] Monitor Stripe dashboard
- [ ] Check website loads correctly

### Weekly
- [ ] Update product inventory
- [ ] Process refunds/returns
- [ ] Review analytics
- [ ] Check for WordPress updates

### Monthly
- [ ] Update WordPress plugins
- [ ] Review Stripe fees
- [ ] Check website performance
- [ ] Backup website

### Quarterly
- [ ] Update npm dependencies
- [ ] Review and optimize slow pages
- [ ] Update product photos
- [ ] Review pricing strategy

---

## Support & Resources

### Documentation
- [Bluehost Deployment Guide](./DEPLOYMENT-BLUEHOST.md)
- [Vercel Deployment Guide](./DEPLOYMENT-VERCEL.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)

### Official Docs
- [Next.js Documentation](https://nextjs.org/docs)
- [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [Stripe API Documentation](https://stripe.com/docs/api)

### Community
- [WooCommerce Support](https://woocommerce.com/support/)
- [Stripe Support](https://support.stripe.com/)
- [Vercel Community](https://github.com/vercel/next.js/discussions)

---

## Success Checklist

Before considering setup complete:

### Technical
- [ ] WordPress/WooCommerce installed and configured
- [ ] API keys generated and working
- [ ] Products added with images and inventory
- [ ] Frontend deployed to Vercel
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificates active
- [ ] Stripe configured with live keys
- [ ] Webhooks working correctly
- [ ] Test purchase completed successfully

### Business
- [ ] Product catalog complete
- [ ] Shipping rates configured
- [ ] Return policy published
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Contact information visible
- [ ] Social media links added
- [ ] Analytics configured

### Legal & Compliance
- [ ] Business registered
- [ ] Sales tax configured (if required)
- [ ] Payment processor agreement signed
- [ ] GDPR compliance (if EU customers)
- [ ] PCI compliance (handled by Stripe)

---

🎉 **Congratulations!** Your e-commerce platform is fully operational!

**Questions?** Refer to the troubleshooting guide or reach out for support.
