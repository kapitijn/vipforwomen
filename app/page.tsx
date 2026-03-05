import Link from 'next/link';
import { getProducts } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  const { products } = await getProducts({ per_page: 8, featured: true });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-2xl p-12 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to VIP For Women
          </h1>
          <p className="text-xl mb-6 opacity-90">
            Discover exclusive fashion, accessories, and lifestyle products curated just for you.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link
            href="/shop"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="grid md:grid-cols-3 gap-6">
        <Link
          href="/shop?category=clothing"
          className="group relative h-64 rounded-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 opacity-80 group-hover:opacity-90 transition" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-3xl font-bold">Clothing</h3>
          </div>
        </Link>

        <Link
          href="/shop?category=accessories"
          className="group relative h-64 rounded-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 opacity-80 group-hover:opacity-90 transition" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-3xl font-bold">Accessories</h3>
          </div>
        </Link>

        <Link
          href="/shop?category=shoes"
          className="group relative h-64 rounded-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-600 opacity-80 group-hover:opacity-90 transition" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-3xl font-bold">Shoes</h3>
          </div>
        </Link>
      </section>
    </div>
  );
}
