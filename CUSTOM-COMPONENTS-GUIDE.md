# 🛠️ Creating Custom Shop Components

## Your Current Setup

You have a **headless e-commerce** architecture:
- **Frontend (What You See)**: Next.js with custom React components
- **Backend (Product Data)**: WooCommerce API
- **Styling**: Tailwind CSS with luxury black/silver theme

---

## How to Add Custom Sections

### Example 1: Create a "Flash Sales" Section

```typescript
// components/FlashSales.tsx
'use client'

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { WooCommerceProduct } from '@/types'

export default function FlashSales() {
  const [saleProducts, setSaleProducts] = useState<WooCommerceProduct[]>([])

  useEffect(() => {
    // Fetch products on sale
    fetch(`${process.env.NEXT_PUBLIC_WOOCOMMERCE_URL}/wp-json/wc/v3/products?on_sale=true&per_page=8&consumer_key=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`)
      .then(res => res.json())
      .then(data => setSaleProducts(data))
  }, [])

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-luxury-silver text-xs tracking-[0.3em] uppercase">Limited Time</span>
          <h2 className="text-5xl font-playfair text-white mt-2 mb-4">Flash Sales</h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {saleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a 
            href="/sale" 
            className="inline-block px-8 py-3 border border-silver text-silver hover:bg-silver hover:text-black transition uppercase tracking-wider text-sm"
          >
            View All Sales
          </a>
        </div>
      </section>
    </section>
  )
}
```

**Add to homepage:**
```typescript
// app/page.tsx
import FlashSales from '@/components/FlashSales'

export default function Home() {
  return (
    <>
      {/* ... existing sections ... */}
      <FlashSales />
    </>
  )
}
```

---

### Example 2: Create a "Best Sellers" Section

```typescript
// components/BestSellers.tsx
'use client'

import { getProducts } from '@/lib/woocommerce'
import ProductCard from './ProductCard'

export default async function BestSellers() {
  // Get top-rated or most popular products
  const { products } = await getProducts({ 
    per_page: 4, 
    orderby: 'popularity', // or 'rating'
    order: 'desc' 
  })

  return (
    <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-luxury-silver uppercase tracking-[0.3em] text-xs mb-2">
              Customer Favorites
            </p>
            <h2 className="text-4xl font-playfair font-bold text-white">
              Best Sellers
            </h2>
          </div>
          <div className="h-px flex-1 ml-12 bg-gradient-to-r from-silver to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              {/* Add "Best Seller" badge */}
              <div className="absolute top-4 left-4 bg-white-gold text-black px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Best Seller
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### Example 3: Create a "Shop by Category" Grid

```typescript
// components/CategoryGrid.tsx
import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { 
    slug: 'dresses', 
    name: 'Dresses', 
    image: '/images/categories/dresses.jpg',
    description: 'Elegant & Timeless'
  },
  { 
    slug: 'bags', 
    name: 'Bags', 
    image: '/images/categories/bags.jpg',
    description: 'Luxury Accessories'
  },
  { 
    slug: 'shoes', 
    name: 'Shoes', 
    image: '/images/categories/shoes.jpg',
    description: 'Step in Style'
  },
  { 
    slug: 'jewelry', 
    name: 'Jewelry', 
    image: '/images/categories/jewelry.jpg',
    description: 'Refined Details'
  },
]

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-playfair text-center text-white mb-16">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group relative h-96 overflow-hidden rounded-lg"
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-neutral-900">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="h-px w-12 bg-silver mb-4 transition-all duration-300 group-hover:w-24" />
                <h3 className="text-2xl font-playfair text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-silver text-sm tracking-wider uppercase">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Pre-Built Sections You Can Create

### 1. **Product Sections**
- ✨ New Arrivals (already have!)
- 🔥 Flash Sales / Hot Deals
- ⭐ Best Sellers / Top Rated
- 💎 Featured Collections
- 🎁 Gift Ideas
- 👗 Trending Now
- 📦 Recently Viewed

### 2. **Category Sections**
- 🗂️ Shop by Category Grid
- 🎨 Style Collections
- 👠 Shop by Occasion
- 💰 Shop by Price Range

### 3. **Promotional Sections**
- 🏷️ Seasonal Sales Banner
- ⏰ Countdown Timer for Sales
- 📧 Newsletter Signup
- 🎉 Special Offers Grid

### 4. **Interactive Sections**
- 🔍 Product Quick View
- 💗 Wishlist Section
- 📱 Instagram Feed
- ⭐ Customer Reviews Showcase

---

## How to Fetch Different Product Types

### Get Products on Sale
```typescript
const { products } = await getProducts({ 
  on_sale: true,
  per_page: 8 
})
```

### Get New Arrivals
```typescript
const { products } = await getProducts({ 
  orderby: 'date',
  order: 'desc',
  per_page: 8 
})
```

### Get Best Sellers
```typescript
const { products } = await getProducts({ 
  orderby: 'popularity',
  order: 'desc',
  per_page: 4 
})
```

### Get by Category
```typescript
const { products } = await getProducts({ 
  category: 'dresses',
  per_page: 12 
})
```

### Get Featured Products
```typescript
const { products } = await getProducts({ 
  featured: true,
  per_page: 8 
})
```

---

## Styling Guidelines (Match Your Theme)

### Colors
```css
Black: #000000
Silver: #E5E4E2
White Gold: #F4F1E8
Neutral: #171717, #262626, #404040
```

### Fonts
```css
Headings: font-playfair (Playfair Display)
Body: font-sans (Inter)
```

### Common Patterns
```tsx
{/* Section Header */}
<div className="text-center mb-12">
  <p className="text-luxury-silver uppercase tracking-[0.3em] text-xs mb-2">
    Subtitle
  </p>
  <h2 className="text-4xl font-playfair font-bold text-white">
    Main Title
  </h2>
  <div className="h-px w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mt-6" />
</div>

{/* Luxury Button */}
<button className="px-8 py-3 border border-silver text-silver hover:bg-silver hover:text-black transition uppercase tracking-wider text-sm">
  Button Text
</button>

{/* Card Hover Effect */}
<div className="group relative overflow-hidden border border-neutral-800 hover:border-silver transition-all duration-500">
  {/* Content */}
</div>
```

---

## Directory Structure

```
components/
├── ProductCard.tsx          ← Reuse this
├── FlashSales.tsx          ← New custom section
├── BestSellers.tsx         ← New custom section
├── CategoryGrid.tsx        ← New custom section
├── NewsletterSignup.tsx    ← New custom section
└── CountdownTimer.tsx      ← New custom section

app/
├── page.tsx                ← Homepage (add sections here)
├── shop/page.tsx           ← Shop page
├── sale/page.tsx           ← Sales page (create this)
└── new-arrivals/page.tsx   ← New arrivals page (create this)
```

---

## Creating New Pages

### Example: Sales Page

```typescript
// app/sale/page.tsx
import { getProducts } from '@/lib/woocommerce'
import ProductCard from '@/components/ProductCard'

export default async function SalePage() {
  const { products, totalPages } = await getProducts({ 
    on_sale: true,
    per_page: 24 
  })

  return (
    <div className="min-h-screen bg-black py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-playfair text-white mb-4">
            Flash Sale
          </h1>
          <p className="text-silver text-lg">
            Exclusive discounts on luxury fashion
          </p>
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mt-8" />
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-silver text-lg">
              No sales available at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Flash Sale | VIP For Women',
  description: 'Exclusive discounts on luxury fashion and accessories'
}
```

---

## Tips for Success

1. **Reuse Components**: Use your existing `ProductCard`, `Header`, `Footer`
2. **Consistent Styling**: Follow your black/silver luxury theme
3. **Mobile First**: Test on mobile devices
4. **Performance**: Use Next.js Image optimization
5. **SEO**: Add metadata to all pages
6. **Loading States**: Show loading spinners for data fetching

---

## Need Help?

**Want to add a specific section?** Let me know:
- What type of products to show
- Where on the site it should go
- Any special styling or animations

I can create the exact component code for you!
