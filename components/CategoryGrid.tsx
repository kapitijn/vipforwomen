
'use client'


import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';

const GET_CATEGORIES = gql`
  query GetProductCategories($first: Int = 8) {
    productCategories(first: $first) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
        }
      }
    }
  }
`;


export default function CategoryGrid() {
  type CategoriesQueryResult = { productCategories: { nodes: any[] } };
  const { data, loading, error } = useQuery<CategoriesQueryResult>(GET_CATEGORIES, {
    variables: { first: 8 },
  });


  // Fallback categories with placeholder images if WooCommerce categories aren't set up yet
  const defaultCategories = [
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
      slug: 'outerwear', 
      name: 'Outerwear', 
      image: '/images/categories/outerwear.jpg',
      description: 'Sophisticated Layers'
    },
    { 
      slug: 'accessories', 
      name: 'Accessories', 
      image: '/images/categories/accessories.jpg',
      description: 'Perfect Finishing Touches'
    },
    { 
      slug: 'tops', 
      name: 'Tops', 
      image: '/images/categories/tops.jpg',
      description: 'Chic & Versatile'
    },
    { 
      slug: 'bottoms', 
      name: 'Bottoms', 
      image: '/images/categories/bottoms.jpg',
      description: 'Classic & Modern'
    },
  ];


  if (loading) {
    return (
      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-silver"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error fetching categories:', error);
  }


  // Use GraphQL categories if available, otherwise use defaults
  const nodes = data?.productCategories?.nodes ?? [];
  type DisplayCategory = { slug: string; name: string; image: string; description?: string; count?: number };
  const displayCategories: DisplayCategory[] = nodes.length > 0
    ? nodes.map((cat: any) => ({
        slug: cat.slug,
        name: cat.name,
        image: typeof cat.image?.sourceUrl === 'string' ? cat.image.sourceUrl : '/placeholder.png',
        description: '',
        count: cat.count ?? 0,
      }))
    : defaultCategories;

  return (
    <section className="py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-luxury-silver uppercase tracking-[0.3em] text-xs mb-2">
            Explore Our Collections
          </p>
          <h2 className="text-5xl md:text-6xl font-playfair text-white mb-4">
            Shop by Category
          </h2>
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mt-6" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group relative h-96 overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105"
            >
              {/* Background - Gradient placeholder or image */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent group-hover:via-black/50 transition-all duration-500" />

              {/* Hover effect - shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Decorative line */}
                <div className="h-px w-12 bg-silver mb-4 transition-all duration-300 group-hover:w-24" />
                
                {/* Category name */}
                <h3 className="text-2xl md:text-3xl font-playfair text-white mb-2 transform transition-transform duration-300 group-hover:translate-x-2">
                  {category.name}
                </h3>
                
                {/* Description or count */}
                {'description' in category ? (
                  <p className="text-silver text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>
                ) : (
                  <p className="text-silver text-sm tracking-wider uppercase">
                    {('count' in category ? category.count : 0)} Products
                  </p>
                )}

                {/* Arrow icon */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-6 h-6 text-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Border effect on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-silver/30 rounded-lg transition-all duration-500" />
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <a 
            href="/shop" 
            className="inline-block px-8 py-3 border-2 border-silver text-silver hover:bg-silver hover:text-black transition-all duration-300 uppercase tracking-wider text-sm font-semibold"
          >
            Browse All Products
          </a>
        </div>
      </div>
    </section>
  )
}
