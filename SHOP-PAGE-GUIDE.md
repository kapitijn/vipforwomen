# 🛍️ Shop Page Management Guide

## Overview

Your shop now has **5 beautiful sections** that display products automatically from WooCommerce:

1. **Flash Sale** (with countdown timer)
2. **Category Grid** (shop by category)
3. **Best Sellers** (most popular products)
4. **Gift Ideas** (filterable by occasion)
5. **Product Detail Page** (enhanced luxury design)

All sections are **100% managed through WooCommerce** - no code changes needed!

---

## Section Breakdown

### 1. ⚡ Flash Sale Section

**What it shows:** Products currently on sale with a countdown timer

**How to manage in WooCommerce:**
1. Go to **Products** in WordPress admin
2. Edit any product you want in the sale
3. Set **Sale Price** (in the Product Data box)
4. Click **Update**

**The countdown timer:**
- Currently set to 7 days from page load
- To customize: Edit `/components/FlashSale.tsx` line 14:
  ```typescript
  saleEndDate.setDate(saleEndDate.getDate() + 7) // Change 7 to your preferred days
  ```

**Features:**
- Auto-calculates discount percentage badges
- Shows sale products sorted by date (newest first)
- Beautiful red gradient design with animated "Flash Sale" badge
- "View All Flash Deals" button links to `/shop?on_sale=true`

---

### 2. 🗂️ Category Grid

**What it shows:** Visual grid of your product categories

**How to manage in WooCommerce:**
1. Go to **Products → Categories**
2. Create/edit categories
3. Add category images (click on category, scroll to "Thumbnail")
4. Save

**Fallback categories:**
If you haven't set up WooCommerce categories yet, it shows these defaults:
- Dresses
- Bags
- Shoes
- Jewelry
- Outerwear
- Accessories
- Tops
- Bottoms

**Features:**
- Auto-fetches from WooCommerce API
- Shows product count for each category
- Hover effects with animations
- Links to filtered shop page: `/shop?category=dresses`

**To add category images:**
1. Create folder: `/public/images/categories/`
2. Add images: `dresses.jpg`, `bags.jpg`, etc.
3. Or upload through WooCommerce (Products → Categories → Edit → Thumbnail)

---

### 3. ⭐ Best Sellers Section

**What it shows:** Top 8 products by sales/popularity

**How to manage in WooCommerce:**
- Automatic! WooCommerce tracks sales for each product
- Products with most sales appear here
- Shows "#1 Best Seller" badges on top 3

**Sorting logic:**
- Fetches products ordered by `popularity` (WooCommerce's internal sales count)
- Updates automatically as sales happen

**Features:**
- Gold badges on top 3 best sellers
- Gradient background (black to neutral-900)
- "View All Best Sellers" links to `/shop?orderby=popularity`

---

### 4. 🎁 Gift Ideas Section

**What it shows:** Curated gift products filterable by occasion

**How to manage in WooCommerce:**
1. Go to **Products → Tags**
2. Create these tags:
   - `birthday-gift`
   - `anniversary`
   - `wedding-gift`
   - `valentines`
   - `christmas`
3. Edit products and add relevant tags
4. Products with these tags will appear when users click the occasion filter

**Filter buttons:**
- All Gifts (shows featured products)
- Birthday
- Anniversary
- Wedding
- Valentine's
- Christmas

**Fallback:**
If no tags exist, shows **featured products** instead.

**To feature a product:**
1. Edit product in WooCommerce
2. Check "Featured" in Product Data box
3. Update

**Features:**
- Pink/purple gift badges
- Occasion filter bar with active state styling
- Gift guide CTA at bottom
- Links to `/shop?featured=true`

---

### 5. 📦 Product Detail Page

**What it shows:** Full product information when clicking a product

**Features:**
- **Image Gallery:** Main image + thumbnail selector (up to 4 images)
- **Pricing:** Shows regular price, sale price, discount percentage
- **Stock Status:** Green checkmark for in stock
- **Quantity Selector:** +/- buttons
- **Add to Cart:** Luxury silver/gold gradient button
- **Wishlist:** Heart button with toggle state
- **Share:** Native share or copy link
- **Benefits Bar:**
  - Free Shipping (orders $100+)
  - Secure Payment (100% protected)
  - Easy Returns (30 day guarantee)
- **Product Meta:** SKU, categories, tags
- **Related Products:** Auto-fetches 4 products from same category
- **Breadcrumb Navigation:** Home > Shop > Category > Product

**How to manage:**
All content comes from WooCommerce product data:
- Name, price, description → Product fields
- Images → Product gallery
- SKU, stock → Product data
- Categories/tags → Taxonomies

---

## Shop Page Structure

### Main Shop Page ( `/shop` )

**Shows:**
1. Hero section (luxury gradient with decorative elements)
2. Flash Sale section
3. Category Grid
4. Best Sellers section
5. Gift Ideas section
6. All Products grid (12 per page)
7. Pagination

### Filtered Shop Pages

When users click filters, featured sections are hidden and only products show:

- `/shop?category=dresses` - Dresses only
- `/shop?on_sale=true` - Sale items only
- `/shop?orderby=popularity` - Best sellers only
- `/shop?featured=true` - Gift ideas only
- `/shop?search=dress` - Search results

---

## Managing Products in WooCommerce

### To add a product to Flash Sale:
1. Edit product
2. Set **Sale Price** lower than Regular Price
3. Update

### To make a product a Best Seller:
- Automatic! Just make sales. WooCommerce tracks it.

### To add products to Gift Ideas:
1. Edit product
2. Scroll to **Tags**
3. Add: `birthday-gift`, `anniversary`, etc.
4. Update

### To feature a product (shows in "All Gifts"):
1. Edit product
2. Check **Featured** checkbox
3. Update

### To assign category:
1. Edit product
2. Check category boxes on the right
3. Update

---

## Customization Options

### Change Flash Sale Duration
**File:** `/components/FlashSale.tsx`
```typescript
// Line 14
const saleEndDate = new Date()
saleEndDate.setDate(saleEndDate.getDate() + 7) // Change 7 to any number of days
```

### Change Number of Products Displayed

**Best Sellers (default: 8):**
```typescript
// components/BestSellers.tsx, line 12
per_page=8 // Change to 4, 12, 16, etc.
```

**Flash Sale (default: 8):**
```typescript
// components/FlashSale.tsx, line 28
per_page=8 // Change as needed
```

**Gift Ideas (default: 8):**
```typescript
// components/GiftIdeas.tsx, line 37
per_page=8 // Change as needed
```

**Related Products (default: 4):**
```typescript
// components/ProductDetail.tsx, line 26
per_page=4 // Change as needed
```

### Add More Occasion Filters

**File:** `/components/GiftIdeas.tsx`
```typescript
// Line 14
const occasions = [
  { id: 'all', label: 'All Gifts', tag: '' },
  { id: 'birthday', label: 'Birthday', tag: 'birthday-gift' },
  // Add more:
  { id: 'mothers-day', label: "Mother's Day", tag: 'mothers-day' },
  { id: 'graduation', label: 'Graduation', tag: 'graduation' },
]
```

Then create matching tags in WooCommerce: `mothers-day`, `graduation`, etc.

### Hide Specific Sections

Edit `/app/shop/page.tsx`:

```typescript
// To hide Flash Sale, comment out:
// <FlashSale />

// To hide Category Grid:
// <CategoryGrid />

// To hide Best Sellers:
// <BestSellers />

// To hide Gift Ideas:
// <GiftIdeas />
```

---

## New Files Created

```
components/
├── CountdownTimer.tsx          ← Reusable countdown component
├── BestSellers.tsx            ← Best sellers section
├── FlashSale.tsx              ← Flash sale with timer
├── CategoryGrid.tsx           ← Category grid with images
├── GiftIdeas.tsx              ← Gift ideas with filters
└── ProductDetail.tsx          ← Enhanced (updated)

app/
├── shop/page.tsx              ← Updated with all sections
└── product/[slug]/page.tsx    ← Updated with metadata
```

---

## Testing Checklist

### In WooCommerce Admin:
- [ ] Create at least 3 product categories
- [ ] Add thumbnail images to categories
- [ ] Create some products
- [ ] Set sale prices on some products
- [ ] Mark some products as Featured
- [ ] Add tags: `birthday-gift`, `anniversary`, etc.

### On Your Site:
- [ ] Visit `/shop` - see all sections
- [ ] Click category - see filtered products
- [ ] Click product - see detail page
- [ ] Test countdown timer (counts down every second)
- [ ] Test quantity +/- buttons
- [ ] Test Add to Cart
- [ ] Test Wishlist heart button
- [ ] Test Share button
- [ ] View related products at bottom
- [ ] Test occasion filters in Gift Ideas

---

## SEO & Performance

✅ **Metadata:** All pages have proper titles and descriptions
✅ **Images:** Next.js Image optimization with proper sizes
✅ **Loading States:** Spinners while fetching data
✅ **Error Handling:** Graceful fallbacks if WooCommerce unavailable
✅ **Empty States:** Friendly messages when no products found
✅ **Mobile Responsive:** All sections work on mobile

---

## Common Questions

### Q: Why don't I see any products in Flash Sale?
**A:** You need to set sale prices on products in WooCommerce. Go to Products → Edit → Set "Sale Price" lower than "Regular Price".

### Q: How do I change what shows in Gift Ideas?
**A:** Add tags to products in WooCommerce. Use these exact tag slugs: `birthday-gift`, `anniversary`, `wedding-gift`, `valentines`, `christmas`.

### Q: Can I add more occasion filters?
**A:** Yes! Edit `/components/GiftIdeas.tsx` and add to the `occasions` array. Then create matching tags in WooCommerce.

### Q: How do categories get images?
**A:** Either upload through WooCommerce (Products → Categories → Edit → Thumbnail) OR add images to `/public/images/categories/` with names matching category slugs (e.g., `dresses.jpg`).

### Q: The countdown timer shows the same time for everyone?
**A:** Yes, currently it counts down from "now + 7 days" when the page loads. For a fixed end date, edit `/components/FlashSale.tsx`:
```typescript
const saleEndDate = new Date('2026-12-31T23:59:59')
```

### Q: Can I reorder the sections?
**A:** Yes! Edit `/app/shop/page.tsx` and reorder the components:
```typescript
<FlashSale />
<CategoryGrid />
<BestSellers />
<GiftIdeas />
```

---

## Next Steps

1. **Add Products:** Create products in WooCommerce
2. **Set Up Categories:** Create categories with images
3. **Create Sales:** Set sale prices to populate Flash Sale
4. **Tag Products:** Add gift-related tags
5. **Upload Images:** Add high-quality product and category images
6. **Test Everything:** Browse shop, click products, test filters
7. **Customize:** Adjust colors, durations, product counts as needed

---

## Support

All sections fetch live data from WooCommerce. If something doesn't show:
1. Check WooCommerce has products
2. Verify `.env` has correct WooCommerce URL and keys
3. Check browser console for API errors
4. Ensure WooCommerce REST API is enabled

**Need more customization?** Just let me know what section you want to change!
