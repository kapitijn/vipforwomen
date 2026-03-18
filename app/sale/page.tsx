import { getProducts } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';

export default async function SalePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1', 10);

  const { products, totalPages } = await getProducts({
    page,
    per_page: 16,
    on_sale: true,
    orderby: 'date',
    order: 'desc',
  });

  return (
    <div className="min-h-screen bg-black">
      <section className="relative h-80 bg-gradient-to-br from-black via-red-950/30 to-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4">
          <p className="text-luxury-silver uppercase tracking-[0.3em] text-xs mb-3">Limited Time</p>
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-4">Sale</h1>
          <p className="text-silver max-w-2xl mx-auto">Discover exclusive discounts on luxury styles curated for you.</p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mt-6" />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-silver text-2xl mb-3">No sale items available right now</p>
              <p className="text-neutral-500 mb-8">New markdowns are added frequently. Please check back soon.</p>
              <a
                href="/shop"
                className="inline-block px-8 py-3 border border-silver text-silver hover:bg-silver hover:text-black transition uppercase tracking-wider text-sm"
              >
                Browse Full Shop
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl md:text-4xl font-playfair text-white">Current Deals</h2>
                <p className="text-silver text-sm uppercase tracking-wider">{products.length} Items</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-14">
                  {page > 1 && (
                    <a
                      href={`/sale?page=${page - 1}`}
                      className="px-4 py-2 border border-silver text-silver hover:bg-silver hover:text-black transition"
                    >
                      Previous
                    </a>
                  )}

                  {Array.from({ length: Math.min(totalPages, 6) }, (_, i) => i + 1).map((pageNum) => (
                    <a
                      key={pageNum}
                      href={`/sale?page=${pageNum}`}
                      className={`px-4 py-2 transition ${
                        pageNum === page
                          ? 'bg-silver text-black font-semibold'
                          : 'border border-neutral-700 text-silver hover:border-silver'
                      }`}
                    >
                      {pageNum}
                    </a>
                  ))}

                  {page < totalPages && (
                    <a
                      href={`/sale?page=${page + 1}`}
                      className="px-4 py-2 border border-silver text-silver hover:bg-silver hover:text-black transition"
                    >
                      Next
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
  title: 'Sale | For VIP Women',
  description: 'Shop discounted luxury fashion and accessories at For VIP Women.',
};
