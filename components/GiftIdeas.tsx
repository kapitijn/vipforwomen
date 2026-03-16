'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { WooCommerceProduct } from '@/types'

export default function GiftIdeas() {
  const [products, setProducts] = useState<WooCommerceProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOccasion, setSelectedOccasion] = useState('all')

  const occasions = [
    { id: 'all', label: 'All Gifts', tag: '' },
    { id: 'birthday', label: 'Birthday', tag: 'birthday-gift' },
    { id: 'anniversary', label: 'Anniversary', tag: 'anniversary' },
    { id: 'wedding', label: 'Wedding', tag: 'wedding-gift' },
    { id: 'valentines', label: "Valentine's", tag: 'valentines' },
    { id: 'christmas', label: 'Christmas', tag: 'christmas' },
  ]

  useEffect(() => {
    const fetchGiftProducts = async () => {
      setLoading(true)
      try {
        // Fetch featured or tagged products
        const tag = occasions.find(o => o.id === selectedOccasion)?.tag || ''
        const url = tag 
          ? `${process.env.NEXT_PUBLIC_WOOCOMMERCE_URL}/wp-json/wc/v3/products?per_page=8&tag=${tag}&consumer_key=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`
          : `${process.env.NEXT_PUBLIC_WOOCOMMERCE_URL}/wp-json/wc/v3/products?per_page=8&featured=true&consumer_key=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`
        
        const response = await fetch(url)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching gift products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGiftProducts()
  }, [selectedOccasion])

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-luxury-silver uppercase tracking-[0.3em] text-xs mb-2">
            Perfect for Any Occasion
          </p>
          <h2 className="text-5xl md:text-6xl font-playfair text-white mb-6">
            Gift Ideas
          </h2>
          <p className="text-silver text-lg max-w-2xl mx-auto mb-8">
            Thoughtfully curated gifts that make every moment special
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto" />
        </div>

        {/* Occasion Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {occasions.map((occasion) => (
            <button
              key={occasion.id}
              onClick={() => setSelectedOccasion(occasion.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedOccasion === occasion.id
                  ? 'bg-gradient-to-r from-silver to-white-gold text-black shadow-lg transform scale-105'
                  : 'bg-neutral-800 text-silver border border-neutral-700 hover:border-silver hover:bg-neutral-700'
              }`}
            >
              {occasion.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-silver"></div>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="relative group">
                    {/* Gift badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                        Gift Idea
                      </div>
                    </div>
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-silver text-lg">
                    No products found for this occasion. Check back soon!
                  </p>
                </div>
              )}
            </div>

            {/* View All Button */}
            {products.length > 0 && (
              <div className="text-center mt-12">
                <a 
                  href="/shop?featured=true" 
                  className="inline-block px-8 py-3 border-2 border-silver text-silver hover:bg-silver hover:text-black transition-all duration-300 uppercase tracking-wider text-sm font-semibold"
                >
                  Explore All Gifts
                </a>
              </div>
            )}
          </>
        )}

        {/* Gift Guide CTA */}
        <div className="mt-16 bg-gradient-to-r from-neutral-800 to-neutral-900 border border-silver/20 rounded-lg p-8 md:p-12 text-center">
          <h3 className="text-3xl font-playfair text-white mb-4">
            Need Help Finding the Perfect Gift?
          </h3>
          <p className="text-silver mb-6 max-w-2xl mx-auto">
            Our luxury gift guide helps you discover the ideal present for every special person and occasion
          </p>
          <a 
            href="/gift-guide"
            className="inline-block px-8 py-3 bg-gradient-to-r from-silver to-white-gold text-black hover:from-white-gold hover:to-silver transition-all duration-300 uppercase tracking-wider text-sm font-bold shadow-lg"
          >
            View Gift Guide
          </a>
        </div>
      </div>
    </section>
  )
}
