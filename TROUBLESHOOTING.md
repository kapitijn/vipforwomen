# Troubleshooting Guide

Common issues and their solutions for the VIP For Women e-commerce platform.

## Table of Contents
- [Installation Issues](#installation-issues)
- [API Connection Issues](#api-connection-issues)
- [Product Display Issues](#product-display-issues)
- [Cart Issues](#cart-issues)
- [Checkout Issues](#checkout-issues)
- [Payment Issues](#payment-issues)
- [Deployment Issues](#deployment-issues)
- [Performance Issues](#performance-issues)

---

## Installation Issues

### Error: "npm install" fails

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**
1. Update Node.js to version 18 or higher
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and `package-lock.json`
4. Run `npm install` again
5. If still failing, try: `npm install --legacy-peer-deps`

### Error: Module not found

**Symptoms:**
```
Module not found: Can't resolve '@/components/Header'
```

**Solutions:**
1. Check `tsconfig.json` has proper path mapping
2. Restart dev server: `npm run dev`
3. Delete `.next` folder and rebuild: `rm -rf .next && npm run dev`

---

## API Connection Issues

### Products not loading from WooCommerce

**Symptoms:**
- Empty product grid
- Console error: "Failed to fetch products"
- 401 Unauthorized errors

**Solutions:**

1. **Verify API Keys:**
   ```env
   # Check .env file
   NEXT_PUBLIC_WOOCOMMERCE_URL=https://yourdomain.com  # No trailing slash!
   WOOCOMMERCE_CONSUMER_KEY=ck_...  # Should start with ck_
   WOOCOMMERCE_CONSUMER_SECRET=cs_...  # Should start with cs_
   ```

2. **Test API directly:**
   ```bash
   curl "https://yourdomain.com/wp-json/wc/v3/products?consumer_key=YOUR_KEY&consumer_secret=YOUR_SECRET"
   ```

3. **Check WordPress permalink settings:**
   - Login to WordPress
   - Settings → Permalinks
   - Click "Save Changes" (flushes rewrite rules)

4. **Verify CORS is enabled:**
   - See DEPLOYMENT-BLUEHOST.md Part 6
   - Check browser console for CORS errors

5. **Check API permissions:**
   - WooCommerce → Settings → Advanced → REST API
   - Verify key has "Read/Write" permissions

### CORS Errors

**Symptoms:**
```
Access to fetch at 'https://your-site.com/wp-json/wc/v3/products' 
from origin 'https://your-frontend.vercel.app' has been blocked by CORS policy
```

**Solutions:**

1. **Add CORS headers to WordPress:**

   In `functions.php`:
   ```php
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

2. **Or install WP CORS plugin:**
   - Plugins → Add New
   - Search "WP CORS"
   - Install and configure

3. **For specific origin only:**
   ```php
   header('Access-Control-Allow-Origin: https://your-frontend.vercel.app');
   ```

---

## Product Display Issues

### Images not displaying

**Symptoms:**
- Gray placeholder boxes instead of images
- Browser console: 403 or 404 errors for images

**Solutions:**

1. **Check next.config.js:**
   ```javascript
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: '**',  // Or specify your WordPress domain
       },
     ],
   }
   ```

2. **Verify image URLs in WooCommerce:**
   - Images should use HTTPS
   - Images should be publicly accessible

3. **Test image URL directly:**
   - Copy image URL from console error
   - Try opening in new browser tab
   - If fails, issue is with WordPress hosting/permissions

4. **Check Bluehost hotlink protection:**
   - cPanel → Security → Hotlink Protection
   - Disable or allow your Vercel domain

### Product prices showing as $0.00

**Symptoms:**
- All products show $0.00 price

**Solutions:**

1. **Check products in WooCommerce:**
   - Products → All Products
   - Verify "Regular Price" is set

2. **Check API response:**
   ```bash
   # Should show "price": "89.99"
   curl "https://your-site.com/wp-json/wc/v3/products?consumer_key=xxx&consumer_secret=xxx"
   ```

3. **Verify currency settings:**
   - WooCommerce → Settings → General
   - Check currency is set

---

## Cart Issues

### Cart not persisting after refresh

**Symptoms:**
- Items disappear when page refreshed

**Solutions:**

1. **Check localStorage:**
   - Browser DevTools → Application → Local Storage
   - Should see "cart-storage" key

2. **Check Zustand persist middleware:**
   - Verify `store/cart.ts` uses `persist()`

3. **Browser privacy settings:**
   - Safari: Disable "Prevent cross-site tracking"
   - Private/Incognito mode: localStorage may not persist

### Cart quantity not updating

**Symptoms:**
- Clicking +/- doesn't change quantity

**Solutions:**

1. **Check browser console for errors**

2. **Clear cart storage:**
   ```javascript
   // In browser console:
   localStorage.removeItem('cart-storage');
   ```

3. **Restart dev server**

---

## Checkout Issues

### Checkout page redirects to cart

**Symptoms:**
- Clicking "Proceed to Checkout" goes to cart page

**Solutions:**

1. **Check cart has items:**
   - Checkout requires items in cart

2. **Check routing:**
   - Verify `app/checkout/page.tsx` exists

3. **Check for redirect logic:**
   - Look for `router.push('/cart')` in checkout page

### Form validation errors

**Symptoms:**
- Can't submit checkout form
- No error messages shown

**Solutions:**

1. **Check required fields:**
   - All fields marked with * must be filled

2. **Check email format:**
   - Must be valid email address

3. **Browser console:**
   - Check for JavaScript errors

---

## Payment Issues

### Stripe payment fails

**Symptoms:**
- "Payment failed" message
- Order created but payment not processed

**Solutions:**

1. **Check Stripe API keys:**
   ```env
   # Test keys start with:
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   
   # Live keys start with:
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   ```

2. **Check API key match:**
   - Test keys only work with test cards
   - Live keys only work with real cards
   - Don't mix test and live keys!

3. **Test with valid test card:**
   ```
   Card: 4242 4242 4242 4242
   Expiry: Any future date
   CVC: Any 3 digits
   ```

4. **Check Stripe Dashboard:**
   - Stripe Dashboard → Payments
   - Look for error messages

5. **Check browser console:**
   - Look for Stripe.js errors

### Webhook not working

**Symptoms:**
- Payment succeeds but order stays "Pending"
- Order not marked as "Processing"

**Solutions:**

1. **Verify webhook URL:**
   ```
   Correct: https://your-site.vercel.app/api/stripe-webhook
   Wrong: http://your-site.vercel.app/api/stripe-webhook (no https)
   Wrong: https://your-site.vercel.app/stripe-webhook (missing /api)
   ```

2. **Check webhook secret:**
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...  # Must start with whsec_
   ```

3. **Test webhook:**
   - Stripe Dashboard → Webhooks → Your webhook
   - Click "Send test webhook"
   - Check response

4. **Check Vercel logs:**
   ```
   Vercel Dashboard → Your Project → Logs
   - Look for /api/stripe-webhook requests
   - Check for errors
   ```

5. **Verify webhook events:**
   - Should listen to:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`

### Order not created in WooCommerce

**Symptoms:**
- Payment succeeds but no order in WooCommerce

**Solutions:**

1. **Check API credentials have write permissions:**
   - WooCommerce → Settings → Advanced → REST API
   - Permissions: Read/Write

2. **Check Vercel function logs:**
   ```
   Logs → Filter: create-payment-intent
   - Look for error messages
   ```

3. **Test WooCommerce order creation:**
   ```bash
   curl -X POST "https://your-wp-site.com/wp-json/wc/v3/orders" \
     -u "ck_xxx:cs_xxx" \
     -H "Content-Type: application/json" \
     -d '{
       "payment_method": "stripe",
       "line_items": [{"product_id": 123, "quantity": 1}]
     }'
   ```

---

## Deployment Issues

### Vercel build fails

**Symptoms:**
```
Error: Command "npm run build" exited with 1
```

**Solutions:**

1. **Check build locally:**
   ```bash
   npm run build
   ```
   Fix any errors locally first

2. **Check TypeScript errors:**
   ```bash
   npm run lint
   ```

3. **Check environment variables:**
   - All required variables set in Vercel
   - No typos in variable names

4. **Check Node.js version:**
   - Vercel → Project Settings → General
   - Set Node.js version to 18.x or higher

5. **Clear build cache:**
   - Vercel → Deployments → Latest → "..." → Redeploy

### Environment variables not working in production

**Symptoms:**
- Works locally but not on Vercel
- API keys not found

**Solutions:**

1. **Check variable names:**
   - Client-side variables MUST start with `NEXT_PUBLIC_`
   - Server-side variables should NOT have `NEXT_PUBLIC_`

2. **Redeploy after adding variables:**
   - Adding/changing env vars requires redeploy

3. **Check variable scope:**
   - Set to: Production, Preview, and Development

4. **No quotes in Vercel env vars:**
   ```
   Wrong: "pk_test_123"
   Right: pk_test_123
   ```

---

## Performance Issues

### Slow page loads

**Solutions:**

1. **Enable Next.js caching:**
   - Already configured for static pages

2. **Optimize images:**
   - Use Next.js Image component (already used)
   - Compress images in WooCommerce

3. **Check API response times:**
   - WooCommerce API might be slow
   - Add caching to WordPress
   - Consider Bluehost plan upgrade

4. **Enable CDN:**
   - Vercel has built-in CDN (automatic)

### High bandwidth usage

**Solutions:**

1. **Optimize product images:**
   - Resize to max 1200x1200px
   - Use image compression
   - Install Imagify/ShortPixel in WordPress

2. **Limit products per page:**
   - Currently set to 12 per page
   - Adjust in `lib/woocommerce.ts`

---

## Getting Help

If you're still stuck after trying these solutions:

1. **Check the logs:**
   - Browser Console (F12)
   - Vercel Function Logs
   - WordPress Error Logs (ask Bluehost support)

2. **Gather information:**
   - What were you doing when error occurred?
   - What error message(s) did you see?
   - Can you reproduce the issue?

3. **Search existing issues:**
   - Check GitHub Issues
   - Search Stack Overflow

4. **Contact support:**
   - Bluehost: For WordPress/hosting issues
   - Vercel: For deployment issues
   - Stripe: For payment issues

---

## Quick Debugging Checklist

When something isn't working:

- [ ] Check browser console for errors
- [ ] Check network tab for failed requests
- [ ] Verify environment variables are set correctly
- [ ] Test API endpoints directly (curl/Postman)
- [ ] Check Vercel function logs
- [ ] Verify SSL certificates are valid
- [ ] Clear browser cache and cookies
- [ ] Try in incognito/private window
- [ ] Test on different browser
- [ ] Restart development server
- [ ] Clear Next.js build cache (delete .next folder)

---

## Useful Debug Commands

```bash
# Test WooCommerce API
curl "https://your-wp.com/wp-json/wc/v3/products?consumer_key=xxx&consumer_secret=xxx"

# Test single product
curl "https://your-wp.com/wp-json/wc/v3/products/123?consumer_key=xxx&consumer_secret=xxx"

# Check Node version
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json && npm install

# Clear Next.js cache
rm -rf .next

# Build locally
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

---

## Still Need Help?

Document the following and reach out:
1. What you were trying to do
2. What you expected to happen
3. What actually happened
4. Error messages (full text)
5. Screenshots (if helpful)
6. Browser/device information
7. What you've already tried

Good luck! 🚀
