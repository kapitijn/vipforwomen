// PayPal integration removed. WooCommerce handles payments.
              name: item.name,
              unitAmount: {
                currencyCode: 'USD',
                value: item.price.toFixed(2),
              },
              quantity: item.quantity.toString(),
            })),
            description: 'VIP For Women - Order',
          },
        ],
        applicationContext: {
          brandName: 'VIP For Women',
          landingPage: 'NO_PREFERENCE',
          userAction: 'PAY_NOW',
          returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation`,
          cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
        },
      },
      prefer: 'return=representation',
    };

    const { body: order } = await ordersController.ordersCreate(collect);

    // Create order in WooCommerce
    const orderData = {
      payment_method: 'paypal',
      payment_method_title: 'PayPal',
      set_paid: false,
      billing: {
        first_name: billing.firstName,
        last_name: billing.lastName,
        address_1: billing.address,
        city: billing.city,
        state: billing.state,
        postcode: billing.zipCode,
        country: billing.country,
        email: billing.email,
        phone: billing.phone,
      },
      shipping: {
        first_name: billing.firstName,
        last_name: billing.lastName,
        address_1: billing.address,
        city: billing.city,
        state: billing.state,
        postcode: billing.zipCode,
        country: billing.country,
      },
      line_items: items.map((item: any) => ({
        product_id: item.productId,
        quantity: item.quantity,
      })),
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Flat Rate',
          total: '0.00',
        },
      ],
      meta_data: [
        {
          key: '_paypal_order_id',
          value: order.id,
        },
      ],
    };

    const wooOrder = await createOrder(orderData);

    return NextResponse.json({
      orderId: order.id,
      woocommerceOrderId: wooOrder.id,
    });
  } catch (error: any) {
    console.error('PayPal order creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}
