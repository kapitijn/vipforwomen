# Frontend Deployment on Vercel

Complete guide to deploying your Next.js frontend on Vercel.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- Your code pushed to GitHub repository
- WooCommerce API credentials from Bluehost setup
- Stripe account with API keys

## 🚀 Step-by-Step Deployment

### Part 1: Prepare Your Repository

1. **Push Code to GitHub**

   ```bash
   # Initialize git if not already done
   git init
   
   # Add all files
   git add .
   
   # Create .gitignore (should already exist)
   # Make sure it includes:
   # .env
   # .env.local
   # node_modules/
   # .next/
   
   # Commit
   git commit -m "Initial commit - VIP For Women e-commerce"
   
   # Add remote (create repo on GitHub first)
   git remote add origin https://github.com/yourusername/vipforwomen.git
   
   # Push
   git push -u origin main
   ```

2. **Verify Repository**
   - Go to your GitHub repository
   - Ensure all code is there
   - Verify `.env` is NOT committed (should be in .gitignore)

### Part 2: Deploy to Vercel

1. **Sign Up / Login to Vercel**
   - Go to https://vercel.com
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"
   - Authorize Vercel to access your GitHub

2. **Import Project**
   ```
   Dashboard → New Project → Import Git Repository
   - Search for "vipforwomen" repository
   - Click "Import"
   ```

3. **Configure Project Settings**

   **Framework Preset:** Next.js (should auto-detect)
   
   **Root Directory:** ./ (leave as default)
   
   **Build Command:** 
   ```bash
   npm run build
   ```
   
   **Output Directory:**
   ```
   .next
   ```

4. **Add Environment Variables** ⚠️ CRITICAL STEP

   Click "Environment Variables" and add:

   ```env
   # WooCommerce Backend
   NEXT_PUBLIC_WOOCOMMERCE_URL=https://your-bluehost-site.com
   WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxx
   WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxx

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxx
   STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxx

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
   NEXT_PUBLIC_SITE_NAME=VIP For Women

   # Security
   API_SECRET_KEY=generate-random-string-here
   ```

   > 💡 **Tip:** For each variable, set environment to "Production, Preview, and Development"

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Part 3: Configure Custom Domain (Optional)

1. **Add Custom Domain**
   ```
   Project Settings → Domains
   - Enter your domain: shop.vipforwomen.com
   - Click "Add"
   ```

2. **Configure DNS**
   
   **If domain is on Bluehost:**
   ```
   Bluehost → Domains → DNS Zone Editor
   - Type: CNAME
   - Name: shop (or www)
   - Value: cname.vercel-dns.com
   - TTL: Automatic
   ```

   **If using Vercel's nameservers:**
   ```
   Update nameservers at your domain registrar:
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com
   ```

3. **Enable SSL**
   - Vercel automatically provisions SSL
   - Wait 5-10 minutes for certificate

4. **Update Environment Variables**
   ```
   NEXT_PUBLIC_SITE_URL → https://shop.vipforwomen.com
   ```
   - Redeploy after changing

### Part 4: Configure Stripe Webhooks

1. **Get Vercel Webhook URL**
   ```
   Your webhook endpoint:
   https://your-domain.vercel.app/api/stripe-webhook
   ```

2. **Add Webhook in Stripe Dashboard**
   ```
   Stripe Dashboard → Developers → Webhooks
   - Click "Add endpoint"
   - Endpoint URL: https://your-domain.vercel.app/api/stripe-webhook
   - Description: Production webhook
   - Version: Latest
   ```

3. **Select Events to Listen**
   ```
   Select events:
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - charge.succeeded
   - charge.failed
   ```

4. **Get Webhook Secret**
   ```
   After creating webhook:
   - Click on the webhook
   - Reveal "Signing secret"
   - Copy: whsec_xxxxxxxxxxxxx
   ```

5. **Update Vercel Environment Variable**
   ```
   Project Settings → Environment Variables
   - Find: STRIPE_WEBHOOK_SECRET
   - Update with new webhook secret
   - Redeploy
   ```

### Part 5: Test Production Deployment

1. **Test Product Listing**
   - Visit your deployed site
   - Check if products load from WooCommerce
   - Verify images display correctly

2. **Test Shopping Cart**
   - Add items to cart
   - Check cart persistence (refresh page)
   - Update quantities
   - Remove items

3. **Test Checkout Flow**
   
   **Use Stripe Test Cards:**
   ```
   Success: 4242 4242 4242 4242
   Decline: 4000 0000 0000 0002
   3D Secure: 4000 0027 6000 3184
   
   Expiry: Any future date
   CVC: Any 3 digits
   ZIP: Any 5 digits
   ```

4. **Verify Order in WooCommerce**
   - Login to WordPress admin
   - Go to WooCommerce → Orders
   - Check if order was created
   - Verify order status updates via webhook

### Part 6: Performance Optimization

1. **Enable Vercel Analytics**
   ```
   Project Settings → Analytics
   - Enable Web Analytics
   - Enable Speed Insights
   ```

2. **Configure Caching**
   ```
   Vercel automatically caches:
   - Static pages (/)
   - API routes with cache headers
   - Images via Next.js Image Optimization
   ```

3. **Optimize Images**
   - Vercel automatically optimizes images
   - Uses WebP format when supported
   - Lazy loads images

### Part 7: Monitoring & Logs

1. **View Deployment Logs**
   ```
   Deployments → Select deployment → View Function Logs
   ```

2. **Monitor API Routes**
   ```
   Analytics → Functions
   - View API route performance
   - Check error rates
   - Monitor response times
   ```

3. **Set Up Alerts** (Optional)
   ```
   Project Settings → Integrations
   - Add Slack/Discord for notifications
   - Get alerts for failed deployments
   ```

## 🔍 Verification Checklist

- [ ] Site deployed successfully
- [ ] Environment variables configured
- [ ] Products loading from WooCommerce
- [ ] Images displaying correctly
- [ ] Shopping cart working
- [ ] Checkout flow functional
- [ ] Stripe test payment successful
- [ ] Order created in WooCommerce
- [ ] Webhooks configured and working
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)

## ⚙️ Vercel Pro Tips

### Automatic Deployments
```
Every git push to main branch:
- Automatically triggers new deployment
- Runs build process
- Goes live if successful
```

### Preview Deployments
```
Every pull request:
- Gets unique preview URL
- Test changes before merging
- Share with team for review
```

### Environment Variables by Environment
```
Production: Live site variables
Preview: Staging/test variables
Development: Local development
```

## 🚨 Common Issues & Solutions

### Issue: Products Not Loading
**Solution:**
```
1. Check environment variables:
   - NEXT_PUBLIC_WOOCOMMERCE_URL (must include https://)
   - API keys are correct
   - No extra spaces in values

2. Verify CORS on WordPress:
   - See DEPLOYMENT-BLUEHOST.md Part 6
   
3. Test API directly:
   curl https://your-wp-site.com/wp-json/wc/v3/products?consumer_key=xxx&consumer_secret=xxx
```

### Issue: Images Not Displaying
**Solution:**
```
1. Check next.config.js has remotePatterns configured
2. Verify image URLs in WooCommerce are HTTPS
3. Check browser console for errors
```

### Issue: Stripe Payments Failing
**Solution:**
```
1. Verify Stripe keys (live vs test)
2. Check webhook is receiving events
3. View function logs in Vercel
4. Ensure STRIPE_WEBHOOK_SECRET is correct
```

### Issue: Build Failing
**Solution:**
```
1. Check deployment logs
2. Verify all dependencies in package.json
3. Test build locally: npm run build
4. Check TypeScript errors
```

### Issue: Environment Variables Not Working
**Solution:**
```
1. Ensure variables start with NEXT_PUBLIC_ for client-side
2. Redeploy after adding/changing variables
3. Check variable names match exactly
```

## 🔄 Redeployment

To redeploy after changes:

```bash
# Make changes to code
git add .
git commit -m "Update feature X"
git push

# Vercel automatically redeploys
# Or manually trigger: Deployments → Redeploy
```

## 📊 Post-Deployment Monitoring

**Daily Checks:**
- Monitor error rates in Vercel dashboard
- Check WooCommerce order creation
- Verify webhook delivery in Stripe

**Weekly Checks:**
- Review analytics
- Check performance metrics
- Update dependencies if needed

## 🎯 Next Steps

1. **Test thoroughly** with real products and test cards
2. **Switch to live Stripe keys** when ready for production
3. **Configure email notifications** in WooCommerce
4. **Set up backup systems**
5. **Monitor performance** and optimize

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **Community:** https://github.com/vercel/next.js/discussions

## 🔐 Security Reminders

- ✅ Never commit `.env` files
- ✅ Use environment variables for all secrets
- ✅ Enable webhook signature verification
- ✅ Use HTTPS everywhere
- ✅ Keep dependencies updated
- ✅ Monitor for security alerts

---

✨ **Congratulations!** Your e-commerce site is now live!

For the complete setup process, see [SETUP-GUIDE.md](./SETUP-GUIDE.md)
