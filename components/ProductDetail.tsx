'use client';

import Image from 'next/image';
import { useState } from 'react';
import { WooCommerceProduct } from '@/types';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

interface ProductDetailProps {
  product: WooCommerceProduct;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!product.purchasable || product.stock_status !== 'instock') {
      toast.error('Product is out of stock');
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity,
      image: product.images[0]?.src || '/placeholder.png',
      slug: product.slug,
    });

    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Product Images */}
      <div>
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          {product.images[selectedImage] ? (
            <Image
              src={product.images[selectedImage].src}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          {product.on_sale && (
            <span className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
              Sale
            </span>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? 'border-primary-600'
                    : 'border-transparent'
                }`}
              >
                <Image
                  src={image.src}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

        {/* Categories */}
        {product.categories.length > 0 && (
          <div className="flex gap-2 mb-4">
            {product.categories.map((category) => (
              <span
                key={category.id}
                className="text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl font-bold text-primary-600">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          {product.on_sale && product.regular_price && (
            <span className="text-2xl text-gray-400 line-through">
              ${parseFloat(product.regular_price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-6">
          {product.stock_status === 'instock' ? (
            <span className="text-green-600 font-semibold">In Stock</span>
          ) : (
            <span className="text-red-600 font-semibold">Out of Stock</span>
          )}
        </div>

        {/* Description */}
        <div
          className="prose mb-8"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />

        {/* Quantity & Add to Cart */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-gray-100"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border-x py-2"
              min="1"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock_status !== 'instock'}
            className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="flex-1 border border-gray-300 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" />
            Add to Wishlist
          </button>
          <button className="border border-gray-300 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Product Meta */}
        <div className="mt-8 pt-8 border-t space-y-2 text-sm text-gray-600">
          {product.sku && (
            <p>
              <span className="font-semibold">SKU:</span> {product.sku}
            </p>
          )}
          {product.categories.length > 0 && (
            <p>
              <span className="font-semibold">Categories:</span>{' '}
              {product.categories.map((cat) => cat.name).join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
