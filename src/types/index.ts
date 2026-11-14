/*
  AUREATE — Shared TypeScript Types
  ====================================
  All interfaces and types shared across the application live here.
  Keeping them centralized means future developers only need to look
  in one place when they want to understand the data shape.

  When connecting to a backend, these types should match the API response
  shapes as closely as possible to minimize refactoring.
*/

// ─── Product ─────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  slug: string;             // URL-friendly identifier, e.g. "ashwagandha-capsules"
  category: ProductCategory;
  price: number;            // In Indian Rupees (₹)
  originalPrice?: number;   // If on sale, the original price is shown struck through
  shortDescription: string; // 1–2 sentence summary shown on product cards
  description: string;      // Full description shown on product detail page
  ingredients: string[];    // List of key ingredients
  benefits: string[];       // List of wellness benefits
  usageInstructions: string;
  precautions?: string;
  images: string[];         // Array of image URLs; first image is the primary
  badge?: string;           // Optional label like "Bestseller" or "New"
  inStock: boolean;
  stockCount: number;
  sku: string;
  tags: string[];
  servingSize?: string;     // e.g. "60 Capsules" or "200g Powder"
}

export type ProductCategory =
  | 'all'
  | 'supplements'
  | 'oils'
  | 'teas'
  | 'skincare'
  | 'hair-care';

// ─── Cart ────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

// The full cart state, managed by CartContext
export interface CartState {
  items: CartItem[];
  totalItems: number;       // Sum of all quantities
  totalPrice: number;       // Sum of (price × quantity) for all items
}

// ─── Testimonial ─────────────────────────────────────────────────────────────

// NOTE: These are sample placeholder testimonials — not real customer reviews.
export interface Testimonial {
  id: string;
  name: string;             // Placeholder name
  location: string;         // Placeholder location
  rating: number;           // 1–5
  review: string;           // Placeholder review text
  productName: string;      // Which product this review is for
}

// ─── Admin / Dashboard ───────────────────────────────────────────────────────

// All admin data is fictional sample data for demonstration purposes only.

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  lowStockCount: number;
  revenueChangePercent: number;   // vs last month (sample)
  ordersChangePercent: number;    // vs last month (sample)
  customersChangePercent?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  status: 'active' | 'inactive';
  lastOrderDate: string;
  preferredProduct?: string;
}

export interface AdminActivity {
  id: string;
  type: 'order' | 'inventory' | 'customer' | 'product';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  deliveryStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;        // ISO date string
  shippingAddress: string;
}

export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

export interface InventoryProduct {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  stockCount: number;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  price: number;
  image?: string;
  shortDescription?: string;
}

export interface RevenueDataPoint {
  month: string;            // e.g. "Jan", "Feb"
  revenue: number;
  orders: number;
}

export interface ProductPerformance {
  name: string;
  sales: number;
  revenue: number;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}
