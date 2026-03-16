'use client';

import { WooCommerceProduct } from '@/types';
import ProductCard from './ProductCard';
import Link from 'next/link';

interface NewInStoreProps {
  products: WooCommerceProduct[];
}

export default function NewInStore({ products }: NewInStoreProps) {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-[1px] bg-luxury-silver"></div>
            <span className="mx-4 text-luxury-silver text-xs tracking-[0.3em] uppercase">Just Arrived</span>
            <div className="w-16 h-[1px] bg-luxury-silver"></div>
          </div>
          <h2 className="text-5xl font-serif font-bold text-white mb-4">New in Store</h2>
          <p className="text-neutral-400 font-light max-w-2xl mx-auto">
            Explore our latest arrivals featuring exclusive designs and premium quality pieces.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/shop?filter=new"
            className="inline-block border-2 border-luxury-silver text-luxury-silver px-10 py-3 uppercase tracking-widest text-sm font-light hover:bg-luxury-silver hover:text-black transition-all duration-300"
          >
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
