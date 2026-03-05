import { NextRequest, NextResponse } from 'next/server';
import paypalClient from '@/lib/paypal';
import { updateOrderStatus } from '@/lib/woocommerce';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, woocommerceOrderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Missing order ID' },
        { status: 400 }
      );
    }

    // Capture the PayPal order using new SDK
    const { ordersController } = paypalClient;
    const collect = {
      id: orderId,
      prefer: 'return=representation',
    };

    const { body: capture } = await ordersController.ordersCapture(collect);

    if (capture.status === 'COMPLETED') {
      // Update WooCommerce order status
      if (woocommerceOrderId) {
        try {
          await updateOrderStatus(parseInt(woocommerceOrderId), 'processing');
          console.log(`Order ${woocommerceOrderId} marked as processing`);
        } catch (error) {
          console.error('Failed to update WooCommerce order:', error);
        }
      }

      return NextResponse.json({
        success: true,
        captureId: capture.id,
      });
    } else {
      // Payment failed
      if (woocommerceOrderId) {
        try {
          await updateOrderStatus(parseInt(woocommerceOrderId), 'failed');
        } catch (error) {
          console.error('Failed to update order:', error);
        }
      }

      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('PayPal capture error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment capture failed' },
      { status: 500 }
    );
  }
}

// Also handle PayPal webhooks if configured
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'PayPal webhook endpoint' });
}
