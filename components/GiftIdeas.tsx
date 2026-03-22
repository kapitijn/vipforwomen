
'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_PRODUCTS } from '@/lib/queries';
import ProductCard from './ProductCard';

const occasions = [
  { id: 'all', label: 'All Gifts', tag: '' },
  { id: 'birthday', label: 'Birthday', tag: 'birthday-gift' },
  { id: 'anniversary', label: 'Anniversary', tag: 'anniversary' },
  { id: 'wedding', label: 'Wedding', tag: 'wedding-gift' },
  { id: 'valentines', label: "Valentine's", tag: 'valentines' },
  { id: 'christmas', label: 'Christmas', tag: 'christmas' },
];

export default function GiftIdeas() {
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const selectedTag = occasions.find((o) => o.id === selectedOccasion)?.tag || '';

  // Build variables for GraphQL query
  const variables = selectedTag
    ? { first: 8, tag: selectedTag }
    : { first: 8, featured: true };

  // Use Apollo Client to fetch products
  type ProductsQueryResult = { products: { nodes: any[] } };
  const { data, loading, error } = useQuery<ProductsQueryResult>(GET_PRODUCTS, {
    variables: { first: 8 },
  });

  // Filter by tag if needed (GraphQL query can be extended for tag filtering)
  let products = data?.products?.nodes || [];
  if (selectedTag) {
    products = products.filter((product: any) =>
      product.productCategories?.nodes?.some((cat: any) =>
        cat.slug === selectedTag
      )
    );
  }

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

        {/* Occasion Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {occasions.map((occasion) => (
            <button
              key={occasion.id}
              className={`px-6 py-2 rounded-full border-2 text-sm font-semibold uppercase tracking-widest transition-all duration-200 ${
                selectedOccasion === occasion.id
                  ? 'bg-luxury-silver text-black border-luxury-silver'
                  : 'bg-transparent text-silver border-neutral-700 hover:border-silver'
              }`}
              onClick={() => setSelectedOccasion(occasion.id)}
            >
              {occasion.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-silver"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">Failed to load products.</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-silver text-lg">
              No products found for this occasion. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
