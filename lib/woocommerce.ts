import axios from 'axios';
import { WooCommerceProduct } from '@/types';

const WOOCOMMERCE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

// Create axios instance with auth
const wooClient = axios.create({
  baseURL: `${WOOCOMMERCE_URL}/wp-json/wc/v3`,
  auth: {
    username: CONSUMER_KEY || '',
    password: CONSUMER_SECRET || '',
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

// Public client (no auth) for frontend
export const publicWooClient = axios.create({
  baseURL: `${WOOCOMMERCE_URL}/wp-json/wc/v3`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get all products with pagination
 */
export async function getProducts(params?: {
  per_page?: number;
  page?: number;
  category?: string;
  tag?: string;
  search?: string;
  on_sale?: boolean;
  featured?: boolean;
  orderby?: string;
  order?: 'asc' | 'desc';
}): Promise<{ products: WooCommerceProduct[]; totalPages: number }> {
  try {
    const response = await publicWooClient.get('/products', {
      params: {
        per_page: params?.per_page || 12,
        page: params?.page || 1,
        category: params?.category,
        tag: params?.tag,
        search: params?.search,
        on_sale: params?.on_sale,
        featured: params?.featured,
        orderby: params?.orderby || 'date',
        order: params?.order || 'desc',
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
      },
    });

    return {
      products: response.data,
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '1'),
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], totalPages: 0 };
  }
}

/**
 * Get single product by slug
 */
export async function getProductBySlug(slug: string): Promise<WooCommerceProduct | null> {
  try {
    const response = await publicWooClient.get('/products', {
      params: {
        slug,
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
      },
    });

    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Get product by ID
 */
export async function getProductById(id: number): Promise<WooCommerceProduct | null> {
  try {
    const response = await publicWooClient.get(`/products/${id}`, {
      params: {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Get product categories
 */
export async function getCategories() {
  try {
    const response = await publicWooClient.get('/products/categories', {
      params: {
        per_page: 100,
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Create order (server-side only)
 */
export async function createOrder(orderData: any) {
  try {
    const response = await wooClient.post('/orders', orderData);
    return response.data;
  } catch (error: any) {
    console.error('Error creating order:', error.response?.data || error);
    throw error;
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(orderId: number, status: string) {
  try {
    const response = await wooClient.put(`/orders/${orderId}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

export default wooClient;
