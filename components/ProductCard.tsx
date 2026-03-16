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
      <div className="bg-black border border-neutral-800 overflow-hidden hover:border-luxury-silver transition-all duration-500">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-neutral-900">
          {product.images[0] ? (
            <Image
              src={product.images[0].src}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-600">
              No Image
            </div>
          )}

          {product.on_sale && (
            <span className="absolute top-4 right-4 bg-luxury-silver text-black px-4 py-1 text-xs font-semibold uppercase tracking-widest">
              Sale
            </span>
          )}

          {product.stock_status !== 'instock' && (
            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
              <span className="text-white font-light text-sm uppercase tracking-widest">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5 bg-black">
          <h3 className="font-light text-white mb-3 line-clamp-2 group-hover:text-luxury-silver transition text-sm uppercase tracking-wider">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg font-light text-white">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              {product.on_sale && product.regular_price && (
                <span className="text-sm text-neutral-500 line-through font-light">
                  ${parseFloat(product.regular_price).toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock_status !== 'instock'}
              className="p-2 bg-white text-black hover:bg-luxury-silver transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
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
