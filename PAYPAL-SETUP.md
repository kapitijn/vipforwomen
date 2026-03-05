# PayPal Setup Guide for Suriname

Complete guide to setting up PayPal payments for your VIP For Women e-commerce site.

## 🌍 Why PayPal for Suriname?

PayPal is the preferred payment method in Suriname and many Caribbean/South American countries:
- ✅ Widely used in Suriname
- ✅ Supports international payments
- ✅ No need for credit card merchant account
- ✅ Buyer and seller protection
- ✅ Works with PayPal balance, credit cards, and debit cards

## 📋 Prerequisites

- PayPal Business account (or Personal account for testing)
- Valid email address
- Business information (if using Business account)

## 🚀 Step-by-Step Setup

### Part 1: Create PayPal Account

1. **Go to PayPal**
   - Visit: https://www.paypal.com/sr/home (Suriname)
   - Or: https://www.paypal.com

2. **Sign Up for Business Account**
   ```
   Click "Sign Up" → "Business Account"
   
   Fill in:
   - Email address
   - Password
   - Business name: "VIP For Women"
   - Business type: E-commerce
   - Products sold: Fashion & Accessories
   ```

3. **Verify Your Account**
   - Verify email address
   - Add bank account (for withdrawals)
   - Complete identity verification if required

### Part 2: Get PayPal API Credentials

#### For Testing (Sandbox)

1. **Go to PayPal Developer Dashboard**
   - Visit: https://developer.paypal.com/dashboard
   - Login with your PayPal account

2. **Access Sandbox**
   ```
   Dashboard → Testing Tools → Sandbox accounts
   - You'll see default test accounts created
   - Note: These are for testing only
   ```

3. **Get Sandbox Credentials**
   ```
   Dashboard → My Apps & Credentials
   - Under "Sandbox", click "Create App"
   - App Name: "VIP For Women Shop"
   - Click "Create App"
   
   Copy these credentials:
   - Client ID: starts with "AXX..."
   - Secret: Long string (click "Show" to reveal)
   ```

4. **Save Credentials**
   ```
   Client ID: AXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXX
   Secret: EXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXX
   Mode: sandbox
   ```

#### For Production (Live Payments)

1. **Switch to Live**
   ```
   Dashboard → My Apps & Credentials
   - Switch to "Live" tab (top of page)
   - Click "Create App"
   - App Name: "VIP For Women Shop Live"
   ```

2. **Get Live Credentials**
   ```
   Copy:
   - Client ID: starts with "AXX..."
   - Secret: Long string (click "Show")
   ```

3. **Important Settings**
   ```
   In your app settings, enable:
   ✅ Accept payments
   ✅ Customer returns
   ✅ Merchant initiated payments
   ```

### Part 3: Configure Your Website

1. **Update .env File**

   Create/edit `.env` in your project:
   ```env
   # PayPal Sandbox (for testing)
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id_here
   PAYPAL_CLIENT_SECRET=your_sandbox_secret_here
   PAYPAL_MODE=sandbox
   
   # When ready for production, replace with:
   # NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_live_client_id_here
   # PAYPAL_CLIENT_SECRET=your_live_secret_here
   # PAYPAL_MODE=live
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Test Locally**
   ```bash
   npm run dev
   ```
   
   Visit: http://localhost:3000/checkout

### Part 4: Testing PayPal Integration

#### Sandbox Testing

1. **Get Test Accounts**
   ```
   PayPal Developer Dashboard → Sandbox → Accounts
   
   You'll see:
   - Personal Account (buyer) - email ending in @personal.example.com
   - Business Account (seller) - email ending in @business.example.com
   ```

2. **Test Purchase**
   ```
   1. Add products to cart on your site
   2. Go to checkout
   3. Fill in billing information
   4. Click PayPal button
   5. Login with SANDBOX personal account
   6. Complete payment
   ```

3. **Sandbox Test Cards** (if not using PayPal balance)
   ```
   Credit Card: 4111 1111 1111 1111
   Expiry: Any future date
   CVV: 123
   Name: Any name
   ```

4. **Verify in Dashboard**
   ```
   Developer Dashboard → Sandbox → Accounts
   - Click on business account
   - View transactions
   - Should see test payment
   ```

### Part 5: Going Live

1. **Complete Account Setup**
   ```
   PayPal Account → Settings
   - Verify email ✅
   - Confirm identity ✅
   - Add bank account ✅
   - Set up withdrawal method ✅
   ```

2. **Update Environment Variables**
   ```env
   # Production settings
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_live_client_id
   PAYPAL_CLIENT_SECRET=your_live_secret
   PAYPAL_MODE=live
   ```

3. **Deploy Updated Environment Variables**
   ```
   Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update all PayPal variables
   - Set to "Production"
   - Redeploy
   ```

4. **Test Real Payment**
   - Make small test purchase ($1-5)
   - Use real PayPal account or credit card
   - Verify funds received in PayPal account

## 💰 PayPal Fees in Suriname

### Standard Rates
- **Domestic transactions**: 3.4% + fixed fee
- **International transactions**: 4.4% + fixed fee
- **Currency conversion**: 3-4% above exchange rate

### Example
```
Sale: $100 USD
Fee: $3.40 + $0.30 = $3.70
You receive: $96.30
```

### Withdrawal to Bank
- **Suriname banks**: Usually free or small fee ($1-2)
- **Processing time**: 3-5 business days

## 🔧 Advanced Configuration

### Custom Currency

If you want to support Surinamese Dollar (SRD):

```typescript
// In checkout page
<PayPalScriptProvider
  options={{
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: 'USD', // Change to 'SRD' if supported
    intent: 'capture',
  }}
>
```

**Note**: Check PayPal dashboard for supported currencies.

### Multiple Currencies

Support both USD and SRD:

```typescript
const [currency, setCurrency] = useState('USD');

<PayPalScriptProvider
  options={{
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: currency,
    intent: 'capture',
  }}
>
```

## 🚨 Common Issues in Suriname

### Issue: "Currency not supported"

**Solution:**
```
PayPal supports limited currencies in Suriname.
Recommended: Keep transactions in USD
Alternative: Use EUR or NLD (Netherlands is common)
```

### Issue: Can't withdraw to Surinamese bank

**Solution:**
```
Options:
1. Link international bank account
2. Use PayPal debit card
3. Transfer to someone with withdrawal access
4. Contact PayPal support for Suriname-specific options
```

### Issue: Customer doesn't have PayPal

**Solution:**
```
PayPal allows "Guest Checkout"
Customers can pay with credit/debit card without PayPal account
Enable this in: PayPal Settings → Payment Preferences → Guest Checkout
```

## 📱 Mobile Money Integration (Future)

Consider adding for Suriname:
- TBL Mobile Banking
- Telesur payment options
- Direct bank transfers

These would require custom integration beyond PayPal.

## 🔐 Security Best Practices

1. **Never expose secret keys**
   ```
   ❌ Don't commit .env to Git
   ✅ Use environment variables
   ✅ Different keys for test/production
   ```

2. **Verify payments server-side**
   ```
   ✅ Already implemented in /api/paypal-webhook
   ✅ Never trust client-side payment status
   ```

3. **Enable fraud protection**
   ```
   PayPal Dashboard → Settings → Security
   - Enable fraud detection
   - Set transaction limits
   - Enable buyer authentication
   ```

## 📊 Monitoring Payments

### Check PayPal Dashboard Daily
```
paypal.com → Activity → Transactions
- View all payments
- Download reports
- Track refunds
- Monitor disputes
```

### WooCommerce Integration
```
WordPress Admin → WooCommerce → Orders
- Automatically synced
- Order status updates
- Customer information
```

## 🆘 Support Resources

### PayPal Support
- **Phone**: Check PayPal.com for Suriname number
- **Email**: Available in dashboard
- **Chat**: 24/7 support
- **Help Center**: https://www.paypal.com/sr/smarthelp/home

### Technical Support
- **PayPal Developer**: https://developer.paypal.com/support
- **Community Forum**: https://www.paypal-community.com

## ✅ Launch Checklist

Before going live:
- [ ] PayPal Business account verified
- [ ] Live API credentials obtained
- [ ] Test transactions completed successfully
- [ ] Environment variables updated in Vercel
- [ ] Guest checkout enabled
- [ ] Fraud protection configured
- [ ] Bank account linked for withdrawals
- [ ] Real payment tested ($1-5)
- [ ] Order appears in WooCommerce
- [ ] Customer receives confirmation email

## 🎯 Next Steps

1. **Today**: Set up sandbox account and test
2. **This Week**: Complete verification for live account
3. **Go Live**: Switch to production credentials

## 💡 Tips for Success in Suriname

1. **Offer multiple payment options**: PayPal + cash on delivery
2. **Clear pricing**: Show USD prominently
3. **Local delivery**: Partner with local courier services
4. **Customer support**: WhatsApp is popular in Suriname
5. **Marketing**: Focus on Instagram and Facebook

---

**Need help?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) or contact PayPal support.

**Ready to test?** Run `npm run dev` and visit http://localhost:3000/checkout
