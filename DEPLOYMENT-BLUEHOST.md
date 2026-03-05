# WordPress + WooCommerce Deployment on Bluehost

Complete guide to setting up your headless WordPress/WooCommerce backend on Bluehost.

## 📋 Prerequisites

- Bluehost hosting account (Shared, VPS, or Dedicated)
- Domain name configured
- SSL certificate (free with Bluehost)

## 🚀 Step-by-Step Setup

### Part 1: Install WordPress

1. **Login to Bluehost cPanel**
   - Go to https://my.bluehost.com
   - Click "Advanced" → "cPanel"

2. **Install WordPress via Marketplace**
   - In cPanel, find "Marketplace" or "Mojo Marketplace"
   - Click "WordPress"
   - Click "Install"
   - Choose your domain
   - Set admin username/password
   - Complete installation (takes 1-2 minutes)

3. **Enable HTTPS**
   - In cPanel, go to "My Sites"
   - Click "Manage Site" next to your domain
   - Turn on "Free SSL"
   - Enable "Force HTTPS Redirect"

### Part 2: Install & Configure WooCommerce

1. **Login to WordPress Admin**
   - Go to `https://yourdomain.com/wp-admin`
   - Login with credentials from installation

2. **Install WooCommerce Plugin**
   ```
   Dashboard → Plugins → Add New
   Search: "WooCommerce"
   Click "Install Now" → "Activate"
   ```

3. **Run WooCommerce Setup Wizard**
   - Store Address: Enter your business address
   - Industry: Select your category (Fashion/Apparel)
   - Product Types: Select "Physical products"
   - Business Details: Fill in your information
   - Theme: Skip (we're using headless)
   - Complete setup

4. **Configure WooCommerce Settings**
   
   **General Settings:**
   ```
   WooCommerce → Settings → General
   - Base Location: Your country/region
   - Currency: USD (or your currency)
   - Save changes
   ```

   **Product Settings:**
   ```
   WooCommerce → Settings → Products → General
   - Shop Page: Select or create "Shop" page
   - Cart behavior: Configure as needed
   - Save changes
   ```

   **Shipping:**
   ```
   WooCommerce → Settings → Shipping
   - Add shipping zone
   - Set up shipping methods (flat rate, free shipping, etc.)
   - Save changes
   ```

   **Payments:**
   ```
   WooCommerce → Settings → Payments
   - Enable payment methods you want to accept
   - Since we're using Stripe on frontend, you can disable all
   - Or keep as backup checkout option
   ```

### Part 3: Generate API Keys

1. **Enable REST API**
   ```
   WooCommerce → Settings → Advanced → REST API
   - Click "Add Key"
   ```

2. **Create API Key**
   ```
   Description: "Frontend App"
   User: Select your admin user
   Permissions: Read/Write
   Click "Generate API Key"
   ```

3. **Save Credentials** ⚠️ IMPORTANT
   ```
   Consumer Key: ck_xxxxxxxxxxxxxxxxxxxxx
   Consumer Secret: cs_xxxxxxxxxxxxxxxxxxxxx
   
   Copy these immediately - you won't see them again!
   Save them in a secure password manager
   ```

### Part 4: Add Sample Products

1. **Create Your First Product**
   ```
   Products → Add New
   
   - Product Name: "Elegant Summer Dress"
   - Description: Add detailed description
   - Short Description: Add brief summary
   - Product Data: Simple product
   - Regular Price: 89.99
   - Sale Price: 69.99 (optional)
   - SKU: DRESS-001
   - Stock: Manage stock (enabled)
   - Stock Quantity: 50
   - Categories: Create "Clothing" → "Dresses"
   - Product Image: Upload main image
   - Gallery: Upload 3-4 images
   - Publish
   ```

2. **Add More Products**
   - Create at least 8-10 products for testing
   - Use different categories (Clothing, Accessories, Shoes)
   - Add high-quality images
   - Set proper inventory levels

### Part 5: Security & Performance

1. **Install Security Plugins**
   ```
   Recommended plugins:
   - Wordfence Security
   - WP Cerber Security
   ```

2. **Install Performance Plugins**
   ```
   Recommended plugins:
   - WP Super Cache or W3 Total Cache
   - Imagify (image optimization)
   ```

3. **Secure Your WordPress**
   ```
   Settings → General
   - Discourage search engines (if you want headless only)
   
   Settings → Permalinks
   - Choose "Post name" structure
   ```

4. **Disable XML-RPC (Optional)**
   Add to `.htaccess`:
   ```apache
   <Files xmlrpc.php>
     Order Deny,Allow
     Deny from all
   </Files>
   ```

### Part 6: Configure CORS for API Access

1. **Install WP CORS Plugin** OR **Add Custom Code**

   **Option A: Using Plugin**
   ```
   Plugins → Add New
   Search: "WP CORS"
   Install and Activate
   Configure allowed origins
   ```

   **Option B: Manual Configuration**
   
   Add to your theme's `functions.php`:
   ```php
   <?php
   // Allow CORS for WooCommerce API
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

### Part 7: Testing Your API

1. **Test API Connection**
   
   Use Postman or curl:
   ```bash
   curl https://yourdomain.com/wp-json/wc/v3/products \
     -u ck_your_key:cs_your_secret
   ```

   Should return JSON with your products.

2. **Test from Browser**
   ```
   https://yourdomain.com/wp-json/wc/v3/products?consumer_key=ck_xxx&consumer_secret=cs_xxx
   ```

### Part 8: Backup Setup

1. **Automatic Backups**
   ```
   Bluehost → Backups
   - Enable daily automatic backups
   - Or use UpdraftPlus plugin
   ```

2. **Database Backups**
   ```
   cPanel → phpMyAdmin
   - Regular exports of your database
   - Or use WP-DB-Backup plugin
   ```

## 🔍 Verification Checklist

- [ ] WordPress installed and accessible
- [ ] WooCommerce installed and configured
- [ ] SSL certificate active (HTTPS working)
- [ ] API keys generated and saved
- [ ] Sample products added with images
- [ ] Categories created
- [ ] API accessible externally
- [ ] CORS configured properly
- [ ] Security plugins installed
- [ ] Backups configured

## ⚙️ Recommended Bluehost Settings

### PHP Version
- Use PHP 8.0 or higher
- Enable OPcache
- Set memory_limit to 256M minimum

### cPanel Optimizations
```
Select PHP Version → Options
- memory_limit: 256M
- max_execution_time: 300
- post_max_size: 64M
- upload_max_filesize: 64M
```

## 🚨 Common Issues & Solutions

### Issue: API Returns 404
**Solution:**
```
Settings → Permalinks → Save Changes
(This flushes rewrite rules)
```

### Issue: CORS Errors
**Solution:**
Add CORS headers (see Part 6 above)

### Issue: API Authentication Failed
**Solution:**
- Regenerate API keys
- Check key permissions (Read/Write)
- Verify key format (no extra spaces)

### Issue: Slow Performance
**Solution:**
- Enable caching plugin
- Optimize images
- Upgrade Bluehost plan if needed

## 📞 Bluehost Support

If you need help:
- Chat: Available 24/7 in cPanel
- Phone: Numbers in your account dashboard
- Tickets: Submit via my.bluehost.com

## 🎯 Next Steps

Once WordPress/WooCommerce is set up:
1. Copy your API credentials
2. Add products and inventory
3. Proceed to [DEPLOYMENT-VERCEL.md](./DEPLOYMENT-VERCEL.md) to deploy the frontend
4. Follow [SETUP-GUIDE.md](./SETUP-GUIDE.md) to connect everything
