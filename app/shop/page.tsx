import { getProducts } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';
import FlashSale from '@/components/FlashSale';
import CategoryGrid from '@/components/CategoryGrid';
import BestSellers from '@/components/BestSellers';
import GiftIdeas from '@/components/GiftIdeas';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; search?: string; orderby?: string; on_sale?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const { products, totalPages } = await getProducts({
    page,
    per_page: 12,
    category: searchParams.category,
    search: searchParams.search,
    orderby: searchParams.orderby as any,
    on_sale: searchParams.on_sale === 'true',
  });

  // Show featured sections only on main shop page (no filters)
  const showFeaturedSections = !searchParams.category && !searchParams.search && !searchParams.orderby && !searchParams.on_sale && page === 1;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-br from-black via-neutral-900 to-black flex items-center justify-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-silver rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white-gold rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <p className="text-luxury-silver uppercase tracking-[0.3em] text-xs mb-4">
            Luxury Fashion
          </p>
          <h1 className="text-6xl md:text-7xl font-playfair font-bold text-white mb-4">
            Shop
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto" />
        </div>
      </div>

      {/* Featured Sections - Show only on main shop page */}
      {showFeaturedSections && (
        <>
          <FlashSale />
          <CategoryGrid />
          <BestSellers />
          <GiftIdeas />
        </>
      )}

      {/* Products Grid Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          {(searchParams.category || searchParams.search || searchParams.orderby || searchParams.on_sale) && (
            <div className="mb-12">
              <h2 className="text-4xl font-playfair text-white mb-4">
                {searchParams.search && `Search Results for "${searchParams.search}"`}
                {searchParams.category && `Category: ${searchParams.category}`}
                {searchParams.on_sale === 'true' && 'Sale Items'}
                {searchParams.orderby === 'popularity' && 'Popular Products'}
                {!searchParams.search && !searchParams.category && !searchParams.on_sale && !searchParams.orderby && 'All Products'}
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-silver to-transparent" />
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-24 h-24 mx-auto text-neutral-700 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-silver text-xl mb-2">No products found</p>
              <p className="text-neutral-500">Try adjusting your filters or search terms</p>
              <a 
                href="/shop"
                className="inline-block mt-6 px-6 py-3 border border-silver text-silver hover:bg-silver hover:text-black transition uppercase tracking-wider text-sm"
              >
                View All Products
              </a>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-16">
                  {/* Previous Button */}
                  {page > 1 && (
                    <a
                      href={`/shop?page=${page - 1}${searchParams.category ? `&category=${searchParams.category}` : ''}${searchParams.search ? `&search=${searchParams.search}` : ''}`}
                      className="px-4 py-2 border border-silver text-silver hover:bg-silver hover:text-black transition"
                    >
                      ← Previous
                    </a>
                  )}

                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <a
                        key={pageNum}
                        href={`/shop?page=${pageNum}${searchParams.category ? `&category=${searchParams.category}` : ''}${searchParams.search ? `&search=${searchParams.search}` : ''}`}
                        className={`px-4 py-2 transition ${
                          pageNum === page
                            ? 'bg-silver text-black font-bold'
                            : 'border border-neutral-700 text-silver hover:border-silver'
                        }`}
                      >
                        {pageNum}
                      </a>
                    );
                  })}

                  {/* Next Button */}
                  {page < totalPages && (
                    <a
                      href={`/shop?page=${page + 1}${searchParams.category ? `&category=${searchParams.category}` : ''}${searchParams.search ? `&search=${searchParams.search}` : ''}`}
                      className="px-4 py-2 border border-silver text-silver hover:bg-silver hover:text-black transition"
                    >
                      Next →
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: 'Shop | VIP For Women',
  description: 'Discover luxury fashion, accessories, and more at VIP For Women',
};
