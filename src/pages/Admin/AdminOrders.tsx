/*
  AdminOrders — Orders Management & Fulfillment
  ==============================================
  Interactive orders tracking and fulfillment view for AUREATE.

  Features:
  - Search by Order ID, Customer Name, or Email
  - Filter by Delivery Status and Payment Status
  - Interactive Order Detail modal/drawer
  - Order status advancement simulation (Processing -> Shipped -> Delivered)
  - Clear, human-readable intermediate React code
*/

import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  SlidersHorizontal,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  X,
  CreditCard,
  MapPin,
  Package,
} from 'lucide-react';
import {
  getStoredOrders,
  saveStoredOrders,
  addStoredActivity,
  ADMIN_DATA_EVENT,
} from '@/utils/adminStorage';
import { formatPrice } from '@/utils';
import type { Order } from '@/types';

type DeliveryFilter = 'all' | 'delivered' | 'shipped' | 'processing' | 'cancelled';

export default function AdminOrders() {
  const [ordersList, setOrdersList] = useState<Order[]>(getStoredOrders());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DeliveryFilter>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Sync with global storage changes
  useEffect(() => {
    function handleStorageChange() {
      setOrdersList(getStoredOrders());
    }
    window.addEventListener(ADMIN_DATA_EVENT, handleStorageChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, handleStorageChange);
  }, []);

  // Close inspection modal on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && selectedOrder) {
        setSelectedOrder(null);
      }
    }
    if (selectedOrder) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOrder]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return ordersList.filter((order) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        order.id.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.customerEmail.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'all' || order.deliveryStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [ordersList, searchQuery, statusFilter]);

  // Handle simulating updating order status
  function handleUpdateStatus(orderId: string, newStatus: Order['deliveryStatus']) {
    const updated = ordersList.map((o) =>
      o.id === orderId ? { ...o, deliveryStatus: newStatus } : o
    );
    setOrdersList(updated);
    saveStoredOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, deliveryStatus: newStatus } : null));
    }

    addStoredActivity({
      type: 'order',
      title: `Order ${orderId} status updated: ${newStatus}`,
      description: `Fulfillment stage advanced to "${newStatus}".`,
      user: 'Fulfillment Operations',
    });
  }

  return (
    <div className="space-y-6">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-forest font-medium">
            Dispatches & Orders
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Track customer orders, manage fulfillment stages, and review shipment addresses.
          </p>
        </div>

        <div className="text-xs font-mono text-stone-400 bg-white border border-stone-200 px-3.5 py-1.5 rounded-xl self-start sm:self-auto shadow-xs">
          Total Dispatches: <strong className="text-forest">{ordersList.length}</strong>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, name, email..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm text-forest placeholder:text-stone-400 focus:outline-hidden focus:border-gold focus:bg-white transition-colors"
          />
        </div>

        {/* Delivery Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <SlidersHorizontal size={15} className="text-stone-400 hidden sm:inline mr-1" />
          {(['all', 'processing', 'shipped', 'delivered', 'cancelled'] as DeliveryFilter[]).map(
            (tab) => {
              const tabLabels: Record<DeliveryFilter, string> = {
                all: 'All',
                processing: 'Processing',
                shipped: 'Shipped',
                delivered: 'Delivered',
                cancelled: 'Cancelled',
              };

              return (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                    statusFilter === tab
                      ? 'bg-forest text-ivory shadow-xs'
                      : 'bg-stone-50 text-stone-600 border border-stone-200 hover:border-gold'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              );
            }
          )}
        </div>

      </div>

      {/* ── Orders Table ── */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[11px] font-semibold border-b border-stone-200/80">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Formulations</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Fulfillment</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.map((order) => {
                return (
                  <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                    {/* ID */}
                    <td className="py-4 px-4 sm:px-6 font-mono font-medium text-forest">
                      {order.id}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4">
                      <p className="font-medium text-forest">{order.customerName}</p>
                      <p className="text-stone-400 text-xs">{order.customerEmail}</p>
                    </td>

                    {/* Items */}
                    <td className="py-4 px-4 text-stone-600">
                      {order.items.map((item) => (
                        <span key={item.productName} className="block text-xs">
                          {item.productName} &times; {item.quantity}
                        </span>
                      ))}
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-4 font-semibold text-forest">
                      {formatPrice(order.totalAmount)}
                    </td>

                    {/* Payment Status */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase font-mono border ${
                          order.paymentStatus === 'paid'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : order.paymentStatus === 'pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Fulfillment Status */}
                    <td className="py-4 px-4">
                      {order.deliveryStatus === 'delivered' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle size={12} />
                          <span>Delivered</span>
                        </span>
                      )}
                      {order.deliveryStatus === 'shipped' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          <Truck size={12} />
                          <span>Shipped</span>
                        </span>
                      )}
                      {order.deliveryStatus === 'processing' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock size={12} />
                          <span>Processing</span>
                        </span>
                      )}
                      {order.deliveryStatus === 'cancelled' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle size={12} />
                          <span>Cancelled</span>
                        </span>
                      )}
                    </td>

                    {/* Details Action */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-xs text-forest hover:text-gold font-medium underline underline-offset-2 cursor-pointer transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-stone-400 text-xs">
                    No orders match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Order Detail Modal / Slide-over ── */}
      {selectedOrder && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs"
        >
          <div
            className="absolute inset-0"
            onClick={() => setSelectedOrder(null)}
            aria-hidden="true"
          />
          <div className="relative bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <div>
                <span className="text-[11px] font-mono text-gold uppercase tracking-wider block">
                  Order Inspection
                </span>
                <h3 id="order-modal-title" className="font-serif text-2xl text-forest font-medium">
                  {selectedOrder.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-forest transition-colors cursor-pointer"
                aria-label="Close order details modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Customer & Address Details */}
            <div className="space-y-4 mb-6 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
                <div className="flex items-center gap-2 text-forest font-semibold">
                  <MapPin size={15} className="text-sage" />
                  <span>Dispatch Address</span>
                </div>
                <p className="text-stone-600 pl-6 leading-relaxed">
                  <strong className="text-forest">{selectedOrder.customerName}</strong> ({selectedOrder.customerEmail})
                  <br />
                  {selectedOrder.shippingAddress}
                </p>
              </div>

              {/* Items Breakdown */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2.5">
                <div className="flex items-center gap-2 text-forest font-semibold">
                  <Package size={15} className="text-sage" />
                  <span>Purchased Formulations</span>
                </div>
                <div className="divide-y divide-stone-200/60 pl-6">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex justify-between text-stone-600">
                      <span>{item.productName} &times; {item.quantity}</span>
                      <span className="font-semibold text-forest">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 font-semibold text-forest pl-6">
                  <span>Grand Total</span>
                  <span className="font-serif text-base">{formatPrice(selectedOrder.totalAmount)}</span>
                </div>
              </div>

              {/* Payment Meta */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
                <div className="flex items-center gap-2">
                  <CreditCard size={15} className="text-sage" />
                  <span className="font-semibold text-forest">Payment Status</span>
                </div>
                <span className="uppercase font-mono text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded">
                  {selectedOrder.paymentStatus}
                </span>
              </div>
            </div>

            {/* Update Fulfillment Stage Action */}
            <div className="pt-4 border-t border-stone-100">
              <span className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
                Advance Fulfillment Status:
              </span>
              <div className="flex flex-wrap gap-2">
                {(['processing', 'shipped', 'delivered', 'cancelled'] as Order['deliveryStatus'][]).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedOrder.id, st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize cursor-pointer transition-colors ${
                        selectedOrder.deliveryStatus === st
                          ? 'bg-forest text-ivory'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
