import { getProducts } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; search?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const { products, totalPages } = await getProducts({
    page,
    per_page: 12,
    category: searchParams.category,
    search: searchParams.search,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shop</h1>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <a
                  key={pageNum}
                  href={`/shop?page=${pageNum}${searchParams.category ? `&category=${searchParams.category}` : ''}`}
                  className={`px-4 py-2 rounded ${
                    pageNum === page
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {pageNum}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
