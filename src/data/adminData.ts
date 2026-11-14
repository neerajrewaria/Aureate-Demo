/*
  AUREATE — Admin Dashboard Demonstration Data
  ==============================================
  IMPORTANT: All data in this file is fictional sample data
  created solely for the purpose of the demo dashboard preview.
  None of these figures represent real financial records.

  When connecting to a real backend, replace these exports with
  API service calls. The dashboard components import from this
  file, so only this file needs to change — not the UI components.
*/

import type {
  DashboardStats,
  Order,
  InventoryProduct,
  RevenueDataPoint,
  ProductPerformance,
  Customer,
  AdminActivity,
} from '@/types';

// Authentic brand imagery for products
import magnesiumImg from '@/assets/brand/02_Magnesium_Complex_Product.jpg';
import omega3Img from '@/assets/brand/03_Omega3_Product.jpg';
import greensImg from '@/assets/brand/04_Daily_Wellness_Greens_Box.jpg';
import collectionImg from '@/assets/brand/05_Product_Family_Collection.jpg';
import referenceImg from '@/assets/brand/06_Original_Product_Reference.jpg';

export const AVAILABLE_PRODUCT_IMAGES = [
  { label: 'Magnesium Complex Bottle', url: magnesiumImg },
  { label: 'Omega-3 Softgels Bottle', url: omega3Img },
  { label: 'Daily Wellness Greens Box', url: greensImg },
  { label: 'Complete Collection Trio', url: collectionImg },
  { label: 'Studio Showcase Set', url: referenceImg },
];

// ─── Dashboard Overview KPIs ──────────────────────────────────────────────────

export const DASHBOARD_STATS: DashboardStats = {
  totalRevenue: 348250,         // ₹ demonstration figure
  totalOrders: 312,             // demonstration order count
  totalProducts: 3,             // 3 core confirmed formulations
  totalCustomers: 184,          // demonstration active customer base
  lowStockCount: 1,             // 1 item approaching threshold
  revenueChangePercent: 16.8,   // vs last month — sample
  ordersChangePercent: 11.4,    // vs last month — sample
  customersChangePercent: 14.2, // vs last month — sample
};

// ─── Inventory Management & Product Formulations ─────────────────────────────

export const INVENTORY: InventoryProduct[] = [
  {
    id: 'inv-1',
    name: 'Magnesium Complex',
    sku: 'AUR-NUT-001',
    category: 'supplements',
    stockCount: 150,
    stockStatus: 'in-stock',
    price: 899,
    image: magnesiumImg,
    shortDescription: 'Multi-form mineral complex for neuromuscular relaxation and calm evening routines.',
  },
  {
    id: 'inv-2',
    name: 'Omega-3 Triple Strength',
    sku: 'AUR-NUT-002',
    category: 'supplements',
    stockCount: 120,
    stockStatus: 'in-stock',
    price: 1099,
    image: omega3Img,
    shortDescription: 'High-potency EPA & DHA molecularly distilled softgels for cognitive and cardiovascular wellness.',
  },
  {
    id: 'inv-3',
    name: 'Daily Wellness Greens',
    sku: 'AUR-NUT-003',
    category: 'supplements',
    stockCount: 95,
    stockStatus: 'in-stock',
    price: 1299,
    image: greensImg,
    shortDescription: 'Bioavailable whole-food phytonutrient blend with organic spirulina, wheatgrass & digestive enzymes.',
  },
  {
    id: 'inv-4',
    name: 'Daily Wellness Greens (Travel Sachets)',
    sku: 'AUR-NUT-004',
    category: 'supplements',
    stockCount: 14,
    stockStatus: 'low-stock',
    price: 699,
    image: greensImg,
    shortDescription: '15 travel-ready individual daily sachets for consistent cellular alkalizing nutrition on the go.',
  },
  {
    id: 'inv-5',
    name: 'Aureate Botanical Glass Shaker',
    sku: 'AUR-ACC-001',
    category: 'supplements',
    stockCount: 0,
    stockStatus: 'out-of-stock',
    price: 499,
    image: collectionImg,
    shortDescription: 'Limited atelier borosilicate glass preparation vessel with etched volumetric measurement cues.',
  },
];

// ─── Customer Directory ───────────────────────────────────────────────────────

export const CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98201 44521',
    city: 'Mumbai',
    state: 'Maharashtra',
    totalOrders: 6,
    totalSpent: 14880,
    joinedDate: '2026-03-14',
    status: 'active',
    lastOrderDate: '2026-11-01',
    preferredProduct: 'Daily Wellness Greens',
  },
  {
    id: 'CUST-002',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@example.com',
    phone: '+91 99002 88419',
    city: 'Bengaluru',
    state: 'Karnataka',
    totalOrders: 4,
    totalSpent: 9892,
    joinedDate: '2026-05-20',
    status: 'active',
    lastOrderDate: '2026-11-02',
    preferredProduct: 'Omega-3 Triple Strength',
  },
  {
    id: 'CUST-003',
    name: 'Deepika Nair',
    email: 'deepika.nair@example.com',
    phone: '+91 94440 12890',
    city: 'Chennai',
    state: 'Tamil Nadu',
    totalOrders: 5,
    totalSpent: 12485,
    joinedDate: '2026-04-11',
    status: 'active',
    lastOrderDate: '2026-11-03',
    preferredProduct: 'Magnesium Complex',
  },
  {
    id: 'CUST-004',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '+91 98111 77334',
    city: 'New Delhi',
    state: 'Delhi NCR',
    totalOrders: 2,
    totalSpent: 3298,
    joinedDate: '2026-08-02',
    status: 'active',
    lastOrderDate: '2026-11-04',
    preferredProduct: 'Omega-3 Triple Strength',
  },
  {
    id: 'CUST-005',
    name: 'Ananya Krishnan',
    email: 'ananya.k@example.com',
    phone: '+91 98490 66120',
    city: 'Hyderabad',
    state: 'Telangana',
    totalOrders: 7,
    totalSpent: 18940,
    joinedDate: '2026-02-18',
    status: 'active',
    lastOrderDate: '2026-11-05',
    preferredProduct: 'Daily Wellness Greens',
  },
  {
    id: 'CUST-006',
    name: 'Vikram Patel',
    email: 'vikram.p@example.com',
    phone: '+91 98250 33910',
    city: 'Ahmedabad',
    state: 'Gujarat',
    totalOrders: 1,
    totalSpent: 899,
    joinedDate: '2026-10-15',
    status: 'inactive',
    lastOrderDate: '2026-11-05',
    preferredProduct: 'Magnesium Complex',
  },
  {
    id: 'CUST-007',
    name: 'Sunita Rao',
    email: 'sunita.rao@example.com',
    phone: '+91 97690 55182',
    city: 'Pune',
    state: 'Maharashtra',
    totalOrders: 3,
    totalSpent: 6594,
    joinedDate: '2026-06-09',
    status: 'active',
    lastOrderDate: '2026-10-28',
    preferredProduct: 'Daily Wellness Greens',
  },
  {
    id: 'CUST-008',
    name: 'Kabir Joshi',
    email: 'kabir.joshi@example.com',
    phone: '+91 98722 41103',
    city: 'Chandigarh',
    state: 'Punjab',
    totalOrders: 2,
    totalSpent: 4396,
    joinedDate: '2026-07-25',
    status: 'active',
    lastOrderDate: '2026-10-19',
    preferredProduct: 'Magnesium Complex',
  },
];

// ─── Recent Orders ────────────────────────────────────────────────────────────

export const ORDERS: Order[] = [
  {
    id: 'AUR-2026-001',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@example.com',
    items: [
      { productName: 'Magnesium Complex', quantity: 2, price: 899 },
      { productName: 'Daily Wellness Greens', quantity: 1, price: 1299 },
    ],
    totalAmount: 3097,
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    orderDate: '2026-11-01T09:30:00Z',
    shippingAddress: 'Bandra West, Mumbai, Maharashtra - 400050',
  },
  {
    id: 'AUR-2026-002',
    customerName: 'Arjun Mehta',
    customerEmail: 'arjun.mehta@example.com',
    items: [
      { productName: 'Omega-3 Triple Strength', quantity: 2, price: 1099 },
    ],
    totalAmount: 2198,
    paymentStatus: 'paid',
    deliveryStatus: 'shipped',
    orderDate: '2026-11-02T14:15:00Z',
    shippingAddress: 'Indiranagar, Bengaluru, Karnataka - 560038',
  },
  {
    id: 'AUR-2026-003',
    customerName: 'Deepika Nair',
    customerEmail: 'deepika.nair@example.com',
    items: [
      { productName: 'Daily Wellness Greens', quantity: 1, price: 1299 },
      { productName: 'Magnesium Complex', quantity: 1, price: 899 },
    ],
    totalAmount: 2198,
    paymentStatus: 'paid',
    deliveryStatus: 'processing',
    orderDate: '2026-11-03T11:00:00Z',
    shippingAddress: 'Adyar, Chennai, Tamil Nadu - 600020',
  },
  {
    id: 'AUR-2026-004',
    customerName: 'Rahul Verma',
    customerEmail: 'rahul.verma@example.com',
    items: [
      { productName: 'Omega-3 Triple Strength', quantity: 1, price: 1099 },
    ],
    totalAmount: 1099,
    paymentStatus: 'pending',
    deliveryStatus: 'processing',
    orderDate: '2026-11-04T16:45:00Z',
    shippingAddress: 'Vasant Vihar, New Delhi - 110057',
  },
  {
    id: 'AUR-2026-005',
    customerName: 'Ananya Krishnan',
    customerEmail: 'ananya.k@example.com',
    items: [
      { productName: 'Daily Wellness Greens', quantity: 2, price: 1299 },
      { productName: 'Omega-3 Triple Strength', quantity: 1, price: 1099 },
    ],
    totalAmount: 3697,
    paymentStatus: 'paid',
    deliveryStatus: 'shipped',
    orderDate: '2026-11-05T10:20:00Z',
    shippingAddress: 'Jubilee Hills, Hyderabad, Telangana - 500033',
  },
  {
    id: 'AUR-2026-006',
    customerName: 'Vikram Patel',
    customerEmail: 'vikram.p@example.com',
    items: [
      { productName: 'Magnesium Complex', quantity: 1, price: 899 },
    ],
    totalAmount: 899,
    paymentStatus: 'failed',
    deliveryStatus: 'cancelled',
    orderDate: '2026-11-05T18:30:00Z',
    shippingAddress: 'Bodakdev, Ahmedabad, Gujarat - 380054',
  },
];

// ─── Recent Activity Log ──────────────────────────────────────────────────────

export const INITIAL_ACTIVITIES: AdminActivity[] = [
  {
    id: 'act-1',
    type: 'order',
    title: 'Order AUR-2026-005 dispatched',
    description: 'Bluedart tracking generated for shipment to Jubilee Hills, Hyderabad.',
    timestamp: '18 minutes ago',
    user: 'Fulfillment Team',
  },
  {
    id: 'act-2',
    type: 'inventory',
    title: 'Low stock threshold reached',
    description: 'Daily Wellness Greens (Travel Sachets) dropped to 14 units.',
    timestamp: '1 hour ago',
    user: 'Warehouse Bot',
  },
  {
    id: 'act-3',
    type: 'order',
    title: 'New customer order placed',
    description: 'Ananya Krishnan purchased 2x Daily Greens + 1x Omega-3 (₹3,697).',
    timestamp: '3 hours ago',
    user: 'Storefront',
  },
  {
    id: 'act-4',
    type: 'customer',
    title: 'New subscriber onboarding',
    description: 'Priya Sharma upgraded to monthly replenishment subscription.',
    timestamp: '5 hours ago',
    user: 'Membership Portal',
  },
  {
    id: 'act-5',
    type: 'inventory',
    title: 'Warehouse batch verification',
    description: 'Batch #AUR-2026-11 cleared purity assay and entered active inventory.',
    timestamp: 'Yesterday at 17:30',
    user: 'Quality Assurance',
  },
];

// ─── Monthly Revenue & Orders Trend (Past 12 Months) ──────────────────────────

export const REVENUE_DATA: RevenueDataPoint[] = [
  { month: 'Dec', revenue: 48000, orders: 45 },
  { month: 'Jan', revenue: 42500, orders: 39 },
  { month: 'Feb', revenue: 52000, orders: 48 },
  { month: 'Mar', revenue: 59000, orders: 54 },
  { month: 'Apr', revenue: 56400, orders: 51 },
  { month: 'May', revenue: 64200, orders: 58 },
  { month: 'Jun', revenue: 69800, orders: 63 },
  { month: 'Jul', revenue: 67100, orders: 60 },
  { month: 'Aug', revenue: 76500, orders: 69 },
  { month: 'Sep', revenue: 82000, orders: 74 },
  { month: 'Oct', revenue: 89400, orders: 81 },
  { month: 'Nov', revenue: 98250, orders: 89 },
];

// ─── Product Performance by Revenue & Units ───────────────────────────────────

export const PRODUCT_PERFORMANCE: ProductPerformance[] = [
  { name: 'Daily Wellness Greens', sales: 138, revenue: 179262 },
  { name: 'Magnesium Complex', sales: 114, revenue: 102486 },
  { name: 'Omega-3 Triple Strength', sales: 60, revenue: 65940 },
];
