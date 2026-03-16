'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import CountdownTimer from './CountdownTimer'
import { WooCommerceProduct } from '@/types'

export default function FlashSale() {
  const [products, setProducts] = useState<WooCommerceProduct[]>([])
  const [loading, setLoading] = useState(true)
  
  // Set flash sale end date (e.g., 7 days from now)
  const saleEndDate = new Date()
  saleEndDate.setDate(saleEndDate.getDate() + 7)

  useEffect(() => {
    const fetchFlashSaleProducts = async () => {
      try {
        // Fetch products on sale
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WOOCOMMERCE_URL}/wp-json/wc/v3/products?per_page=8&on_sale=true&orderby=date&order=desc&consumer_key=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`
        )
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching flash sale products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFlashSaleProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-silver"></div>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null // Don't show section if no sale products
  }

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Countdown */}
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold uppercase tracking-widest mb-4 animate-pulse">
            ⚡ Flash Sale
          </div>
          <h2 className="text-5xl md:text-6xl font-playfair text-white mb-6">
            Limited Time Offers
          </h2>
          <p className="text-luxury-silver text-lg mb-8 max-w-2xl mx-auto">
            Exclusive discounts on luxury fashion. Sale ends soon!
          </p>
          
          {/* Countdown Timer */}
          <div className="flex justify-center mb-8">
            <CountdownTimer endDate={saleEndDate} />
          </div>

          <div className="h-px w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              {/* Sale Badge with percentage */}
              {product.regular_price && product.sale_price && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-br from-red-600 to-red-700 text-white px-3 py-2 text-sm font-bold rounded-full shadow-lg">
                    -{Math.round(((parseFloat(product.regular_price) - parseFloat(product.sale_price)) / parseFloat(product.regular_price)) * 100)}%
                  </div>
                </div>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Sales Button */}
        <div className="text-center mt-12">
          <a 
            href="/shop?on_sale=true" 
            className="inline-block px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-300 uppercase tracking-wider text-sm font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Shop All Flash Deals
          </a>
        </div>
      </div>
    </section>
  )
}
