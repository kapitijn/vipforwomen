'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { WooCommerceProduct } from '@/types';
import { ShoppingCart, Heart, Share2, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';
import ProductCard from './ProductCard';

interface ProductDetailProps {
  product: WooCommerceProduct;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<WooCommerceProduct[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // Fetch related products
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const categoryId = product.categories[0]?.id;
        if (categoryId) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_WOOCOMMERCE_URL}/wp-json/wc/v3/products?category=${categoryId}&per_page=4&exclude=${product.id}&consumer_key=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`
          );
          const data = await response.json();
          setRelatedProducts(data);
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelated();
  }, [product.id, product.categories]);

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

    toast.success(`Added ${quantity} item(s) to cart!`, {
      style: {
        background: '#000',
        color: '#E5E4E2',
        border: '1px solid #E5E4E2',
      },
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.short_description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  // Calculate discount percentage
  const discountPercent = product.on_sale && product.regular_price && product.sale_price
    ? Math.round(((parseFloat(product.regular_price) - parseFloat(product.sale_price)) / parseFloat(product.regular_price)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-silver">
          <a href="/" className="hover:text-white transition">Home</a>
          <span>/</span>
          <a href="/shop" className="hover:text-white transition">Shop</a>
          {product.categories[0] && (
            <>
              <span>/</span>
              <a href={`/shop?category=${product.categories[0].slug}`} className="hover:text-white transition">
                {product.categories[0].name}
              </a>
            </>
          )}
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square bg-neutral-900 rounded-lg overflow-hidden mb-4 group">
              {product.images[selectedImage] ? (
                <Image
                  src={product.images[selectedImage].src}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-silver">
                  <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Sale Badge */}
              {product.on_sale && discountPercent > 0 && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-br from-red-600 to-red-700 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    -{discountPercent}%
                  </div>
                </div>
              )}

              {/* Stock Badge */}
              {product.stock_status !== 'instock' && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold border border-neutral-700">
                    Out of Stock
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-silver scale-105'
                        : 'border-neutral-800 hover:border-neutral-600'
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
            {/* Categories */}
            {product.categories.length > 0 && (
              <div className="flex gap-2 mb-4">
                {product.categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/shop?category=${category.slug}`}
                    className="text-xs text-silver bg-neutral-800 px-3 py-1.5 rounded-full hover:bg-neutral-700 transition uppercase tracking-wider"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl font-bold text-white">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              {product.on_sale && product.regular_price && (
                <span className="text-2xl text-neutral-500 line-through">
                  ${parseFloat(product.regular_price).toFixed(2)}
                </span>
              )}
              {product.on_sale && discountPercent > 0 && (
                <span className="text-green-500 font-semibold">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6 flex items-center gap-2">
              {product.stock_status === 'instock' ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 font-semibold">In Stock</span>
                </>
              ) : (
                <span className="text-red-500 font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Short Description */}
            {product.short_description && (
              <div
                className="text-silver mb-8 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="flex items-center border-2 border-neutral-700 rounded-lg bg-neutral-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 text-silver hover:text-white hover:bg-neutral-800 transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center bg-transparent text-white font-semibold py-3 border-x-2 border-neutral-700"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-3 text-silver hover:text-white hover:bg-neutral-800 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock_status !== 'instock'}
                  className="flex-1 bg-gradient-to-r from-silver to-white-gold text-black py-4 px-8 rounded-lg font-bold hover:from-white-gold hover:to-silver transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg shadow-lg disabled:hover:from-silver disabled:hover:to-white-gold"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={toggleWishlist}
                  className={`flex-1 border-2 py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    isWishlisted 
                      ? 'border-red-500 bg-red-500/10 text-red-500' 
                      : 'border-neutral-700 text-silver hover:border-silver hover:bg-neutral-800'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
                <button 
                  onClick={handleShare}
                  className="border-2 border-neutral-700 py-3 px-6 rounded-lg font-semibold text-silver hover:border-silver hover:bg-neutral-800 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-y border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-silver" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Free Shipping</p>
                  <p className="text-silver text-xs">Orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-silver" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Secure Payment</p>
                  <p className="text-silver text-xs">100% Protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-silver" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Easy Returns</p>
                  <p className="text-silver text-xs">30 Day Guarantee</p>
                </div>
              </div>
            </div>

            {/* Product Meta */}
            <div className="mt-8 space-y-3 text-sm">
              {product.sku && (
                <p className="text-silver">
                  <span className="text-white font-semibold">SKU:</span> {product.sku}
                </p>
              )}
              {product.categories.length > 0 && (
                <p className="text-silver">
                  <span className="text-white font-semibold">Categories:</span>{' '}
                  {product.categories.map((cat) => cat.name).join(', ')}
                </p>
              )}
              {product.tags && product.tags.length > 0 && (
                <p className="text-silver">
                  <span className="text-white font-semibold">Tags:</span>{' '}
                  {product.tags.map((tag) => tag.name).join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description Tabs */}
        <div className="mt-20">
          <div className="border-b border-neutral-800 mb-8">
            <button className="px-8 py-4 text-white font-semibold border-b-2 border-silver">
              Description
            </button>
          </div>
          <div
            className="prose prose-invert max-w-none text-silver"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-neutral-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-luxury-silver uppercase tracking-[0.3em] text-xs mb-2">
                You May Also Like
              </p>
              <h2 className="text-4xl font-playfair text-white mb-4">
                Related Products
              </h2>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
