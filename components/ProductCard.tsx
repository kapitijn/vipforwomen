'use client';

import Image from 'next/image';
import Link from 'next/link';
import { WooCommerceProduct } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: WooCommerceProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!product.purchasable || product.stock_status !== 'instock') {
      toast.error('Product is out of stock');
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      image: product.images[0]?.src || '/placeholder.png',
      slug: product.slug,
    });

    toast.success('Added to cart!');
  };

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {product.images[0] ? (
            <Image
              src={product.images[0].src}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          {product.on_sale && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Sale
            </span>
          )}

          {product.stock_status !== 'instock' && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary-600">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              {product.on_sale && product.regular_price && (
                <span className="text-sm text-gray-400 line-through">
                  ${parseFloat(product.regular_price).toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock_status !== 'instock'}
              className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
