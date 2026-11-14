/*
  AdminCustomers — Customer Directory & Lifetime Accounts
  ========================================================
  Comprehensive customer relationship and account history view for AUREATE.

  Features:
  - Real-time search by customer name, email, phone, or city
  - Filter tabs: All, Active Clients, High-Value (>₹10,000 LTV)
  - Summary KPI cards: Total Customers, Portfolio Spend, Avg LTV, Top Metro
  - Add Customer modal to register simulated clients
  - Detailed Customer Inspection Drawer/Modal with order history breakdown
  - LocalStorage persistence with sample fallback
*/

import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Users,
  CreditCard,
  MapPin,
  Mail,
  ChevronRight,
  Plus,
  X,
  Sparkles,
  ShoppingBag,
  CheckCircle,
} from 'lucide-react';
import {
  getStoredCustomers,
  saveStoredCustomers,
  getStoredOrders,
  addStoredActivity,
  ADMIN_DATA_EVENT,
} from '@/utils/adminStorage';
import { formatPrice } from '@/utils';
import type { Customer, Order } from '@/types';

type CustomerFilter = 'all' | 'active' | 'high-value';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(getStoredCustomers());
  const [orders, setOrders] = useState<Order[]>(getStoredOrders());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CustomerFilter>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New customer form state
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    preferredProduct: 'Daily Wellness Greens',
  });

  // Sync with global storage changes
  useEffect(() => {
    function handleStorageChange() {
      setCustomers(getStoredCustomers());
      setOrders(getStoredOrders());
    }
    window.addEventListener(ADMIN_DATA_EVENT, handleStorageChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, handleStorageChange);
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSelectedCustomer(null);
        setIsAddModalOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.phone.includes(q);

      let matchesFilter = true;
      if (statusFilter === 'active') {
        matchesFilter = c.status === 'active';
      } else if (statusFilter === 'high-value') {
        matchesFilter = c.totalSpent >= 10000;
      }

      return matchesSearch && matchesFilter;
    });
  }, [customers, searchQuery, statusFilter]);

  // Aggregate Metrics
  const totalSpendAll = useMemo(
    () => customers.reduce((acc, curr) => acc + curr.totalSpent, 0),
    [customers]
  );
  const avgLtv = customers.length > 0 ? Math.round(totalSpendAll / customers.length) : 0;
  const activeCount = customers.filter((c) => c.status === 'active').length;

  // Get orders associated with a customer
  const customerOrders = useMemo(() => {
    if (!selectedCustomer) return [];
    return orders.filter(
      (o) =>
        o.customerEmail.toLowerCase() === selectedCustomer.email.toLowerCase() ||
        o.customerName.toLowerCase() === selectedCustomer.name.toLowerCase()
    );
  }, [selectedCustomer, orders]);

  function handleCreateCustomer(e: React.FormEvent) {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email) return;

    const entry: Customer = {
      id: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
      name: newCustomer.name.trim(),
      email: newCustomer.email.trim(),
      phone: newCustomer.phone.trim() || '+91 98000 00000',
      city: newCustomer.city.trim() || 'Mumbai',
      state: newCustomer.state.trim() || 'Maharashtra',
      totalOrders: 0,
      totalSpent: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      lastOrderDate: new Date().toISOString().split('T')[0],
      preferredProduct: newCustomer.preferredProduct,
    };

    const updated = [entry, ...customers];
    setCustomers(updated);
    saveStoredCustomers(updated);

    addStoredActivity({
      type: 'customer',
      title: 'New client registered',
      description: `${entry.name} (${entry.city}) created in customer directory.`,
      user: 'Operations Admin',
    });

    setIsAddModalOpen(false);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      preferredProduct: 'Daily Wellness Greens',
    });
  }

  return (
    <div className="space-y-8">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-forest font-medium">
            Customer Directory & Accounts
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Verified client profiles, repeat order frequencies, and lifetime value analytics.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-forest hover:bg-forest-dark text-ivory text-xs px-4 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer font-medium"
          >
            <Plus size={15} />
            <span>Add New Client</span>
          </button>
        </div>
      </div>

      {/* ── 1. KPI Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Customers */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Total Clients
            </span>
            <div className="w-8 h-8 rounded-lg bg-forest/5 text-forest flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-semibold text-forest">
            {customers.length}
          </p>
          <p className="text-xs text-stone-400 mt-1">
            {activeCount} active purchasers
          </p>
        </div>

        {/* Total Portfolio Spend */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Cumulative Spend
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard size={16} />
            </div>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-semibold text-forest">
            {formatPrice(totalSpendAll)}
          </p>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            Across registered accounts
          </p>
        </div>

        {/* Average Lifetime Value */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Average LTV
            </span>
            <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center">
              <Sparkles size={16} />
            </div>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-semibold text-forest">
            {formatPrice(avgLtv)}
          </p>
          <p className="text-xs text-stone-400 mt-1">
            High repeat affinity
          </p>
        </div>

        {/* Top Delivery Region */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Primary Metro Base
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <MapPin size={16} />
            </div>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-semibold text-forest">
            Bengaluru / Mumbai
          </p>
          <p className="text-xs text-blue-600 font-medium mt-1">
            60% client concentration
          </p>
        </div>

      </div>

      {/* ── 2. Search & Filter Bar ── */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, email, city..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm text-forest placeholder:text-stone-400 focus:outline-hidden focus:border-gold focus:bg-white transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'active', 'high-value'] as CustomerFilter[]).map((tab) => {
            const labels: Record<CustomerFilter, string> = {
              all: `All Clients (${customers.length})`,
              active: 'Active',
              'high-value': 'High Value (≥₹10K)',
            };
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all whitespace-nowrap ${
                  statusFilter === tab
                    ? 'bg-forest text-ivory shadow-xs'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-forest'
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. Customers Table ── */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[11px] font-semibold border-b border-stone-200/60">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Customer Profile</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4 text-center">Orders</th>
                <th className="py-3.5 px-4 font-mono">Total Spend</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredCustomers.map((cust) => {
                const initials = cust.name
                  .split(' ')
                  .map((p) => p[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <tr key={cust.id} className="hover:bg-stone-50/60 transition-colors">
                    
                    {/* Customer Profile & Avatar */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-forest text-gold font-serif font-bold text-xs flex items-center justify-center shrink-0 border border-gold/30">
                          {initials}
                        </div>
                        <div>
                          <p className="font-medium text-forest">{cust.name}</p>
                          <span className="text-[11px] text-stone-400 font-mono">ID: {cust.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-4 text-stone-600">
                      <p className="text-xs text-forest">{cust.email}</p>
                      <p className="text-[11px] text-stone-400 font-mono mt-0.5">{cust.phone}</p>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4 text-stone-600">
                      <p className="font-medium text-forest text-xs">{cust.city}</p>
                      <p className="text-[11px] text-stone-400">{cust.state}</p>
                    </td>

                    {/* Total Orders */}
                    <td className="py-4 px-4 text-center font-mono font-semibold text-forest">
                      {cust.totalOrders}
                    </td>

                    {/* Total Spend */}
                    <td className="py-4 px-4 font-semibold text-forest font-mono">
                      {formatPrice(cust.totalSpent)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      {cust.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle size={11} />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-600 border border-stone-200">
                          <span>Inactive</span>
                        </span>
                      )}
                    </td>

                    {/* Inspect Profile Action */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedCustomer(cust)}
                        className="inline-flex items-center gap-1 text-xs text-forest hover:text-gold font-medium transition-colors cursor-pointer"
                      >
                        <span>History</span>
                        <ChevronRight size={14} />
                      </button>
                    </td>

                  </tr>
                );
              })}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-stone-400 text-xs">
                    No customers found matching the search or filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Customer Details & Order History Drawer/Modal ── */}
      {selectedCustomer && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="customer-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs"
        >
          <div
            className="fixed inset-0"
            onClick={() => setSelectedCustomer(null)}
            aria-hidden="true"
          />
          <div className="relative bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-forest text-gold font-serif font-bold text-base flex items-center justify-center shrink-0 border border-gold/30">
                  {selectedCustomer.name
                    .split(' ')
                    .map((p) => p[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 id="customer-modal-title" className="font-serif text-2xl text-forest font-medium">
                    {selectedCustomer.name}
                  </h3>
                  <span className="text-xs text-stone-400 font-mono">
                    Member since {selectedCustomer.joinedDate} • {selectedCustomer.city}, {selectedCustomer.state}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-forest transition-colors cursor-pointer"
                aria-label="Close customer modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6 text-center">
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/70">
                <span className="text-[10px] uppercase font-semibold text-stone-400 block mb-0.5">Total Orders</span>
                <span className="font-mono text-lg font-bold text-forest">{selectedCustomer.totalOrders}</span>
              </div>
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/70">
                <span className="text-[10px] uppercase font-semibold text-stone-400 block mb-0.5">Lifetime Spend</span>
                <span className="font-mono text-lg font-bold text-emerald-700">{formatPrice(selectedCustomer.totalSpent)}</span>
              </div>
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/70">
                <span className="text-[10px] uppercase font-semibold text-stone-400 block mb-0.5">Status</span>
                <span className="font-mono text-xs uppercase font-semibold text-gold bg-gold/15 px-2 py-0.5 rounded inline-block mt-1">
                  {selectedCustomer.status}
                </span>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2 mb-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-forest font-semibold">
                <Mail size={15} className="text-sage" />
                <span>Contact & Communication</span>
              </div>
              <div className="pl-6 space-y-1 text-stone-600">
                <p>Email: <strong className="text-forest">{selectedCustomer.email}</strong></p>
                <p>Phone: <strong className="text-forest font-mono">{selectedCustomer.phone}</strong></p>
                {selectedCustomer.preferredProduct && (
                  <p>Preferred Formulation: <strong className="text-forest">{selectedCustomer.preferredProduct}</strong></p>
                )}
              </div>
            </div>

            {/* Customer Orders History */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-serif text-lg text-forest font-medium flex items-center gap-2">
                  <ShoppingBag size={16} className="text-gold" />
                  <span>Order History</span>
                </h4>
                <span className="text-xs text-stone-400 font-mono">
                  {customerOrders.length} matching order{customerOrders.length === 1 ? '' : 's'}
                </span>
              </div>

              {customerOrders.length > 0 ? (
                <div className="space-y-3">
                  {customerOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl bg-white border border-stone-200 text-xs space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-semibold text-forest">{ord.id}</span>
                        <span className="font-mono text-stone-400">
                          {new Date(ord.orderDate).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="text-stone-600">
                        {ord.items.map((it) => `${it.productName} (x${it.quantity})`).join(', ')}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                        <span className="font-bold text-forest">{formatPrice(ord.totalAmount)}</span>
                        <span className="capitalize font-mono text-[11px] px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                          {ord.deliveryStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-stone-50 rounded-2xl border border-dashed border-stone-200 text-xs text-stone-400">
                  No linked dispatch records found for this client account.
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ── Add New Customer Modal ── */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-customer-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs"
        >
          <div
            className="fixed inset-0"
            onClick={() => setIsAddModalOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <div>
                <span className="text-[11px] font-mono text-gold uppercase tracking-wider block">
                  Simulated Record
                </span>
                <h3 id="add-customer-modal-title" className="font-serif text-2xl text-forest font-medium">
                  Add New Client
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-forest transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-medium text-forest mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="e.g. Maya Deshmukh"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold"
                />
              </div>

              <div>
                <label className="block font-medium text-forest mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  placeholder="e.g. maya.d@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-forest mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    placeholder="+91 98..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block font-medium text-forest mb-1">City</label>
                  <input
                    type="text"
                    value={newCustomer.city}
                    onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
                    placeholder="e.g. Bengaluru"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-forest mb-1">State</label>
                <input
                  type="text"
                  value={newCustomer.state}
                  onChange={(e) => setNewCustomer({ ...newCustomer, state: e.target.value })}
                  placeholder="e.g. Karnataka"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold"
                />
              </div>

              <div>
                <label className="block font-medium text-forest mb-1">Preferred Formulation</label>
                <select
                  value={newCustomer.preferredProduct}
                  onChange={(e) => setNewCustomer({ ...newCustomer, preferredProduct: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold bg-white"
                >
                  <option value="Daily Wellness Greens">Daily Wellness Greens</option>
                  <option value="Magnesium Complex">Magnesium Complex</option>
                  <option value="Omega-3 Triple Strength">Omega-3 Triple Strength</option>
                  <option value="Botanical Glass Shaker">Botanical Glass Shaker</option>
                </select>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest hover:bg-forest-dark text-ivory font-medium transition-colors cursor-pointer shadow-xs"
                >
                  Save Client
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
