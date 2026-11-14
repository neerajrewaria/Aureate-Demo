/*
  AdminDashboard — Administrative Operations Overview & Real-Time Metrics
  ========================================================================
  Executive command dashboard for AUREATE.

  Features:
  - 5 Comprehensive Key Performance Indicators:
    1. Total Revenue
    2. Total Orders
    3. Total Customers
    4. Formulations Portfolio
    5. Stock Threshold Alerts
  - Monthly revenue trend visual bar chart
  - Top formulation performance revenue contribution
  - Live Recent Operations Activity stream (dispatches, stock adjustments, new clients)
  - Recent dispatches preview table with status badges
  - Real-time reactivity via LocalStorage synchronization
*/

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingCart,
  Package,
  AlertTriangle,
  ArrowRight,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Users,
  Activity,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import {
  DASHBOARD_STATS,
  REVENUE_DATA,
  PRODUCT_PERFORMANCE,
} from '@/data/adminData';
import {
  getStoredInventory,
  getStoredOrders,
  getStoredCustomers,
  getStoredActivities,
  ADMIN_DATA_EVENT,
} from '@/utils/adminStorage';
import { formatPrice } from '@/utils';
import type { InventoryProduct, Order, Customer, AdminActivity } from '@/types';

// Helper for status badge styling
function getStatusBadge(status: string) {
  switch (status) {
    case 'delivered':
      return {
        icon: CheckCircle,
        label: 'Delivered',
        classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
    case 'shipped':
      return {
        icon: Truck,
        label: 'Shipped',
        classes: 'bg-blue-50 text-blue-700 border-blue-200',
      };
    case 'processing':
      return {
        icon: Clock,
        label: 'Processing',
        classes: 'bg-amber-50 text-amber-700 border-amber-200',
      };
    case 'cancelled':
      return {
        icon: XCircle,
        label: 'Cancelled',
        classes: 'bg-rose-50 text-rose-700 border-rose-200',
      };
    default:
      return {
        icon: Clock,
        label: status,
        classes: 'bg-stone-50 text-stone-600 border-stone-200',
      };
  }
}

function getActivityIcon(type: AdminActivity['type']) {
  switch (type) {
    case 'order':
      return <ShoppingBag size={14} className="text-blue-600" />;
    case 'inventory':
      return <Package size={14} className="text-amber-600" />;
    case 'customer':
      return <Users size={14} className="text-emerald-600" />;
    case 'product':
      return <Sparkles size={14} className="text-gold" />;
    default:
      return <Activity size={14} className="text-forest" />;
  }
}

export default function AdminDashboard() {
  const [inventory, setInventory] = useState<InventoryProduct[]>(getStoredInventory());
  const [orders, setOrders] = useState<Order[]>(getStoredOrders());
  const [customers, setCustomers] = useState<Customer[]>(getStoredCustomers());
  const [activities, setActivities] = useState<AdminActivity[]>(getStoredActivities());

  // Synchronize dashboard states whenever storage updates
  useEffect(() => {
    function handleStorageChange() {
      setInventory(getStoredInventory());
      setOrders(getStoredOrders());
      setCustomers(getStoredCustomers());
      setActivities(getStoredActivities());
    }
    window.addEventListener(ADMIN_DATA_EVENT, handleStorageChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, handleStorageChange);
  }, []);

  const lowStockCount = inventory.filter(
    (i) => i.stockStatus === 'low-stock' || i.stockStatus === 'out-of-stock'
  ).length;

  const totalCalculatedRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.totalAmount : 0), 0);
  const displayRevenue = totalCalculatedRevenue > 0 ? DASHBOARD_STATS.totalRevenue : DASHBOARD_STATS.totalRevenue;

  const recentOrders = orders.slice(0, 5);
  const recentActivities = activities.slice(0, 5);

  // Calculate highest monthly revenue for relative chart bar heights
  const maxMonthlyRevenue = Math.max(...REVENUE_DATA.map((d) => d.revenue));

  return (
    <div className="space-y-8">
      
      {/* ── Page Header & Demo Banner ── */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div>
            <h1 className="font-serif text-3xl text-forest font-medium">
              Operations Overview
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              Real-time summary of formulation sales, inventory health, verified clients, and recent dispatches.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              to="/admin/inventory"
              className="inline-flex items-center gap-1.5 bg-forest hover:bg-forest-dark text-ivory text-xs px-3.5 py-2 rounded-xl transition-colors shadow-xs"
            >
              <Package size={14} />
              <span>Manage Stock</span>
            </Link>
          </div>
        </div>

        {/* Demonstration Simulation Warning */}
        <div className="bg-amber-50/80 border border-amber-200 text-amber-800 text-xs px-4 py-2.5 rounded-xl flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-[10px] bg-amber-200/80 px-2 py-0.5 rounded">Demo Environment</span>
            All metrics, financial figures, and orders displayed below are simulated for demonstration.
          </span>
        </div>
      </div>

      {/* ── 1. KPI Cards Grid (5 Responsive Cards) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <p className="font-serif text-2xl font-semibold text-forest">
            {formatPrice(displayRevenue)}
          </p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">
            +{DASHBOARD_STATS.revenueChangePercent}% vs prior month
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Total Dispatches
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingCart size={16} />
            </div>
          </div>
          <p className="font-serif text-2xl font-semibold text-forest">
            {DASHBOARD_STATS.totalOrders}
          </p>
          <p className="text-[11px] text-blue-600 font-medium mt-1">
            +{DASHBOARD_STATS.ordersChangePercent}% order volume
          </p>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Verified Clients
            </span>
            <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <p className="font-serif text-2xl font-semibold text-forest">
            {customers.length}
          </p>
          <p className="text-[11px] text-stone-500 font-medium mt-1">
            +{DASHBOARD_STATS.customersChangePercent || 14.2}% client growth
          </p>
        </div>

        {/* Active Formulations */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Catalog Items
            </span>
            <div className="w-8 h-8 rounded-lg bg-forest/5 text-forest flex items-center justify-center">
              <Package size={16} />
            </div>
          </div>
          <p className="font-serif text-2xl font-semibold text-forest">
            {inventory.length} Formulations
          </p>
          <p className="text-[11px] text-stone-400 mt-1">
            Active formulations
          </p>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Stock Alerts
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${lowStockCount > 0 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <AlertTriangle size={16} />
            </div>
          </div>
          <p className={`font-serif text-2xl font-semibold ${lowStockCount > 0 ? 'text-amber-600' : 'text-forest'}`}>
            {lowStockCount} {lowStockCount === 1 ? 'Item' : 'Items'}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">
            {lowStockCount > 0 ? 'Requires replenishment' : 'All stocks healthy'}
          </p>
        </div>

      </div>

      {/* ── 2. Charts & Performance Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Monthly Revenue Trend Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif text-xl text-forest font-medium">
                Monthly Revenue Performance
              </h3>
              <p className="text-xs text-stone-400">Past 12 months revenue progression (in ₹)</p>
            </div>
            <span className="text-xs font-mono font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-md">
              FY 2026
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-56 flex items-end justify-between gap-2 pt-4 pb-2 px-1">
            {REVENUE_DATA.map((point) => {
              const heightPercent = Math.round((point.revenue / maxMonthlyRevenue) * 100);
              return (
                <div key={point.month} className="flex-1 flex flex-col items-center gap-2 group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-stone-900 text-ivory px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap pointer-events-none mb-1">
                    {formatPrice(point.revenue)}
                  </div>
                  
                  {/* Vertical Bar */}
                  <div className="w-full max-w-[28px] bg-stone-100 rounded-t-md overflow-hidden flex items-end h-40">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-forest group-hover:bg-gold transition-colors duration-200 rounded-t-md"
                    />
                  </div>

                  {/* Month Label */}
                  <span className="text-[11px] font-mono text-stone-500">
                    {point.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Formulations Performance (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-soft space-y-5">
          <div className="pb-3 border-b border-stone-100">
            <h3 className="font-serif text-xl text-forest font-medium">
              Formulation Sales
            </h3>
            <p className="text-xs text-stone-400">Ranked by total sales revenue</p>
          </div>

          <div className="space-y-4">
            {PRODUCT_PERFORMANCE.map((item, index) => {
              const highestRevenue = PRODUCT_PERFORMANCE[0].revenue;
              const percent = Math.round((item.revenue / highestRevenue) * 100);

              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-forest">
                      {index + 1}. {item.name}
                    </span>
                    <span className="font-mono text-stone-500">
                      {formatPrice(item.revenue)}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${percent}%` }}
                      className="h-full bg-gold rounded-full transition-all duration-300"
                    />
                  </div>
                  
                  <span className="text-[10px] text-stone-400 block">
                    {item.sales} units dispatched
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              to="/admin/analytics"
              className="text-xs text-forest hover:text-gold font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View Full Analytics Breakdown</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>

      {/* ── 3. Recent Activity & Dispatches Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Recent Dispatches & Orders Table (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
            <div>
              <h3 className="font-serif text-xl text-forest font-medium">
                Recent Dispatches
              </h3>
              <p className="text-xs text-stone-400">Latest customer orders placed across India</p>
            </div>

            <Link
              to="/admin/orders"
              className="text-xs text-gold hover:text-gold-dark font-medium inline-flex items-center gap-1"
            >
              <span>View All ({orders.length})</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[11px] font-semibold border-y border-stone-200/60">
                <tr>
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Items</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.map((order) => {
                  const statusMeta = getStatusBadge(order.deliveryStatus);
                  const StatusIcon = statusMeta.icon;

                  return (
                    <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-medium text-forest">
                        {order.id}
                      </td>
                      <td className="py-3.5 px-3">
                        <p className="font-medium text-forest">{order.customerName}</p>
                        <p className="text-stone-400 text-xs">{order.customerEmail}</p>
                      </td>
                      <td className="py-3.5 px-3 text-stone-600 text-xs">
                        {order.items.map((it) => `${it.productName} (x${it.quantity})`).join(', ')}
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-forest font-mono">
                        {formatPrice(order.totalAmount)}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] border font-medium ${statusMeta.classes}`}>
                          <StatusIcon size={11} />
                          <span>{statusMeta.label}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-stone-400 font-mono text-xs">
                        {new Date(order.orderDate).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Recent Operations Activity Feed (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-soft space-y-5">
          <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl text-forest font-medium flex items-center gap-2">
                <Activity size={18} className="text-gold" />
                <span>Recent Activity</span>
              </h3>
              <p className="text-xs text-stone-400">Live operational events stream</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live updates active" />
          </div>

          <div className="space-y-4">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className="w-7 h-7 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                  {getActivityIcon(act.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-forest leading-snug">{act.title}</p>
                  <p className="text-stone-500 text-[11px] leading-relaxed line-clamp-2 mt-0.5">
                    {act.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1 font-mono text-[10px] text-stone-400">
                    <span>{act.timestamp}</span>
                    {act.user && <span>• {act.user}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
            <span className="font-mono text-[11px]">Synced via LocalStorage</span>
            <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
              Ready for client demo
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
