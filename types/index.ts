// Product types from WooCommerce
export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: 'simple' | 'variable' | 'grouped' | 'external';
  status: 'draft' | 'pending' | 'private' | 'publish';
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  stock_quantity: number | null;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  images: WooCommerceImage[];
  categories: WooCommerceCategory[];
  tags: WooCommerceTag[];
  attributes: WooCommerceAttribute[];
  variations: number[];
}

export interface WooCommerceImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WooCommerceTag {
  id: number;
  name: string;
  slug: string;
}

export interface WooCommerceAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

// Cart Item (frontend)
export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

// Order
export interface OrderData {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: BillingAddress;
  shipping: ShippingAddress;
  line_items: LineItem[];
  shipping_lines: ShippingLine[];
}

export interface BillingAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface LineItem {
  product_id: number;
  quantity: number;
}

export interface ShippingLine {
  method_id: string;
  method_title: string;
  total: string;
}
