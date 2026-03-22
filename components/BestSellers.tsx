'use client'


import ProductCard from './ProductCard';
import { useQuery } from '@apollo/client/react';
import { GET_PRODUCTS } from '@/lib/queries';


export default function BestSellers() {
  type ProductsQueryResult = { products: { nodes: any[] } };
  const { data, loading, error } = useQuery<ProductsQueryResult>(GET_PRODUCTS, {
    variables: { first: 8 },
  });
  const products = data?.products?.nodes || [];

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-silver"></div>
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">Error loading best sellers.</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <p className="text-luxury-silver uppercase tracking-[0.3em] text-xs mb-2">
              Customer Favorites
            </p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white">
              Best Sellers
            </h2>
          </div>
          <div className="h-px flex-1 md:ml-12 bg-gradient-to-r from-silver to-transparent max-w-md" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              {/* Best Seller Badge */}
              {index < 3 && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg rounded">
                    #{index + 1} Best Seller
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a 
            href="/shop?orderby=popularity" 
            className="inline-block px-8 py-3 border-2 border-silver text-silver hover:bg-silver hover:text-black transition-all duration-300 uppercase tracking-wider text-sm font-semibold"
          >
            View All Best Sellers
          </a>
        </div>
      </div>
    </section>
  );
}
