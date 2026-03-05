'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [paypalOrderId, setPaypalOrderId] = useState<string>('');
  const [woocommerceOrderId, setWoocommerceOrderId] = useState<number>(0);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'SR', // Suriname default
  });

  const [formValid, setFormValid] = useState(false);

  // Validate form
  useEffect(() => {
    const isValid =
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.zipCode;
    setFormValid(!!isValid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Billing Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">State/District *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Zip Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                >
                  <option value="SR">Suriname</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="NL">Netherlands</option>
                  <option value="BR">Brazil</option>
                  <option value="GY">Guyana</option>
                </select>
              </div>
            </div>
          </div>

          {/* PayPal Payment */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Payment</h2>

            {!formValid && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800">
                  Please fill in all required fields before proceeding to payment.
                </p>
              </div>
            )}

            {formValid && (
              <PayPalScriptProvider
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                  currency: 'USD',
                  intent: 'capture',
                }}
              >
                <PayPalButtons
                  style={{
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal',
                  }}
                  createOrder={async () => {
                    setLoading(true);
                    try {
                      const response = await fetch('/api/create-payment-intent', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          items,
                          billing: formData,
                        }),
                      });

                      const data = await response.json();

                      if (!response.ok) {
                        throw new Error(data.error || 'Failed to create order');
                      }

                      setPaypalOrderId(data.orderId);
                      setWoocommerceOrderId(data.woocommerceOrderId);
                      return data.orderId;
                    } catch (error: any) {
                      toast.error(error.message || 'Failed to create order');
                      throw error;
                    } finally {
                      setLoading(false);
                    }
                  }}
                  onApprove={async (data) => {
                    setLoading(true);
                    try {
                      const response = await fetch('/api/paypal-webhook', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          orderId: data.orderID,
                          woocommerceOrderId,
                        }),
                      });

                      const result = await response.json();

                      if (!response.ok) {
                        throw new Error(result.error || 'Payment failed');
                      }

                      toast.success('Payment successful!');
                      clearCart();
                      router.push('/order-confirmation');
                    } catch (error: any) {
                      toast.error(error.message || 'Payment processing failed');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  onError={(err) => {
                    console.error('PayPal error:', err);
                    toast.error('Payment failed. Please try again.');
                  }}
                  onCancel={() => {
                    toast.error('Payment cancelled');
                  }}
                />
              </PayPalScriptProvider>
            )}

            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>💳 Safe and secure payment with PayPal</p>
              <p className="mt-1">You can pay with your PayPal account or credit card</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-primary-600">
                  ${getTotalPrice().toFixed(2)} USD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
