'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useCartStore } from '@/store/cart';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Clear the cart on successful order
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-2xl mx-auto">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for your purchase. Your order has been received and is being processed.
          You will receive an email confirmation shortly.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <p className="text-green-800">
            <strong>What's next?</strong><br />
            We'll send you a shipping confirmation email with tracking information
            once your order is on its way.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/shop"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
