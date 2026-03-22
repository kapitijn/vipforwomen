
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import BrandCarousel from '@/components/BrandCarousel';
import ParallaxHero from '@/components/ParallaxHero';
import ProductBanner from '@/components/ProductBanner';
import HorizontalScrollGallery from '@/components/HorizontalScrollGallery';
import NewInStore from '@/components/NewInStore';
import client from '@/lib/apollo-client';
import { GET_PRODUCTS } from '@/lib/queries';


export default async function Home() {
  type ProductsQueryResult = { products: { nodes: any[] } };
  const { data } = await client.query<{ products: { nodes: any[] } }>({
    query: GET_PRODUCTS,
    variables: { first: 16 },
    fetchPolicy: 'no-cache',
  });
  const products = (data as ProductsQueryResult)?.products?.nodes || [];

  return (
    <>
      {/* Brand Carousel */}
      <BrandCarousel />

      {/* Parallax Hero */}
      <ParallaxHero />

      {/* New in Store Section */}
      <NewInStore products={products} />

      <div className="container mx-auto px-4 py-16">
        {/* Featured Products */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="text-luxury-silver uppercase tracking-[0.3em] text-xs mb-2">Featured</p>
              <h2 className="text-4xl font-serif font-bold text-white">Signature Pieces</h2>
            </div>
            <Link
              href="/shop"
              className="text-white hover:text-luxury-silver transition uppercase tracking-widest text-sm border-b border-white hover:border-luxury-silver pb-1"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>

      {/* Product Banner */}
      <ProductBanner />

      <div className="container mx-auto px-4 py-16">
        {/* Categories */}
        <section className="grid md:grid-cols-3 gap-6">
          <Link
            href="/shop?category=clothing"
            className="group relative h-80 overflow-hidden border border-neutral-800 hover:border-luxury-silver transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black">
              <div className="absolute inset-0 bg-luxury-silver opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-[1px] bg-luxury-silver mb-6"></div>
              <h3 className="text-white text-3xl font-serif font-light tracking-wider mb-2">Clothing</h3>
              <p className="text-neutral-400 text-sm uppercase tracking-widest">Haute Couture</p>
            </div>
          </Link>

          <Link
            href="/shop?category=accessories"
            className="group relative h-80 overflow-hidden border border-neutral-800 hover:border-luxury-silver transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black">
              <div className="absolute inset-0 bg-luxury-silver opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-[1px] bg-luxury-silver mb-6"></div>
              <h3 className="text-white text-3xl font-serif font-light tracking-wider mb-2">Accessories</h3>
              <p className="text-neutral-400 text-sm uppercase tracking-widest">Refined Details</p>
            </div>
          </Link>

          <Link
            href="/shop?category=shoes"
            className="group relative h-80 overflow-hidden border border-neutral-800 hover:border-luxury-silver transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black">
              <div className="absolute inset-0 bg-luxury-silver opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-[1px] bg-luxury-silver mb-6"></div>
              <h3 className="text-white text-3xl font-serif font-light tracking-wider mb-2">Shoes</h3>
              <p className="text-neutral-400 text-sm uppercase tracking-widest">Crafted Excellence</p>
            </div>
          </Link>
        </section>
      </div>

      {/* Horizontal Scroll Gallery */}
      <HorizontalScrollGallery />
    </>
  );
}
