/*
  AdminInventory — Formulation Stock & Product Catalog Management
  ==============================================================
  Full product lifecycle management for AUREATE.

  Features:
  - Product listing with authentic photography thumbnails
  - Real-time search by formulation name or SKU
  - Filter tabs by stock health (All, In Stock, Low Stock, Out of Stock)
  - Add Formulation modal with brand photography selector
  - Edit Formulation modal to update pricing, stock, category & SKU
  - Delete Formulation with safety confirmation
  - Quick ±10 unit stock adjustments
  - LocalStorage persistence with 1-click reset option
*/

import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  Edit2,
  Trash2,
  X,
  Package,
} from 'lucide-react';
import {
  getStoredInventory,
  saveStoredInventory,
  addStoredActivity,
  ADMIN_DATA_EVENT,
} from '@/utils/adminStorage';
import { AVAILABLE_PRODUCT_IMAGES } from '@/data/adminData';
import { formatPrice } from '@/utils';
import type { InventoryProduct, ProductCategory } from '@/types';

type StockFilter = 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';

export default function AdminInventory() {
  const [inventoryList, setInventoryList] = useState<InventoryProduct[]>(getStoredInventory());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StockFilter>('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<InventoryProduct | null>(null);

  // New product form state
  const [newForm, setNewForm] = useState({
    name: '',
    sku: '',
    category: 'supplements' as ProductCategory,
    price: 999,
    stockCount: 100,
    image: AVAILABLE_PRODUCT_IMAGES[0].url,
    shortDescription: '',
  });

  // Sync with global storage changes
  useEffect(() => {
    function handleStorageChange() {
      setInventoryList(getStoredInventory());
    }
    window.addEventListener(ADMIN_DATA_EVENT, handleStorageChange);
    return () => window.removeEventListener(ADMIN_DATA_EVENT, handleStorageChange);
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsAddModalOpen(false);
        setEditingProduct(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Simulated stock count quick adjustment (+ / - 10)
  function handleAdjustStock(id: string, delta: number) {
    const updated = inventoryList.map((item) => {
      if (item.id !== id) return item;

      const newCount = Math.max(0, item.stockCount + delta);
      let newStatus: 'in-stock' | 'low-stock' | 'out-of-stock' = 'in-stock';

      if (newCount === 0) {
        newStatus = 'out-of-stock';
      } else if (newCount < 20) {
        newStatus = 'low-stock';
      }

      return {
        ...item,
        stockCount: newCount,
        stockStatus: newStatus,
      };
    });

    setInventoryList(updated);
    saveStoredInventory(updated);

    const changed = inventoryList.find((i) => i.id === id);
    if (changed) {
      addStoredActivity({
        type: 'inventory',
        title: `Stock count adjusted: ${changed.name}`,
        description: `Updated quantity to ${Math.max(0, changed.stockCount + delta)} units (${delta > 0 ? '+' : ''}${delta}).`,
        user: 'Inventory Manager',
      });
    }
  }

  // Handle Add Product
  function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!newForm.name || !newForm.sku) return;

    let stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock' = 'in-stock';
    if (newForm.stockCount === 0) stockStatus = 'out-of-stock';
    else if (newForm.stockCount < 20) stockStatus = 'low-stock';

    const item: InventoryProduct = {
      id: `inv-${Date.now()}`,
      name: newForm.name.trim(),
      sku: newForm.sku.trim().toUpperCase(),
      category: newForm.category,
      price: Number(newForm.price) || 899,
      stockCount: Number(newForm.stockCount) || 0,
      stockStatus,
      image: newForm.image,
      shortDescription: newForm.shortDescription.trim() || undefined,
    };

    const updated = [item, ...inventoryList];
    setInventoryList(updated);
    saveStoredInventory(updated);

    addStoredActivity({
      type: 'product',
      title: `New formulation added: ${item.name}`,
      description: `Catalog SKU ${item.sku} registered with initial reserve of ${item.stockCount} units.`,
      user: 'Product Specialist',
    });

    setIsAddModalOpen(false);
    setNewForm({
      name: '',
      sku: '',
      category: 'supplements',
      price: 999,
      stockCount: 100,
      image: AVAILABLE_PRODUCT_IMAGES[0].url,
      shortDescription: '',
    });
  }

  // Handle Edit Product Save
  function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProduct) return;

    let stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock' = 'in-stock';
    if (editingProduct.stockCount === 0) stockStatus = 'out-of-stock';
    else if (editingProduct.stockCount < 20) stockStatus = 'low-stock';

    const updated = inventoryList.map((item) =>
      item.id === editingProduct.id
        ? { ...editingProduct, stockStatus }
        : item
    );

    setInventoryList(updated);
    saveStoredInventory(updated);

    addStoredActivity({
      type: 'product',
      title: `Formulation updated: ${editingProduct.name}`,
      description: `Specifications and price adjusted to ${formatPrice(editingProduct.price)}.`,
      user: 'Product Specialist',
    });

    setEditingProduct(null);
  }

  // Handle Delete Product
  function handleDeleteProduct(item: InventoryProduct) {
    if (window.confirm(`Are you sure you want to remove "${item.name}" from active formulations?`)) {
      const updated = inventoryList.filter((i) => i.id !== item.id);
      setInventoryList(updated);
      saveStoredInventory(updated);

      addStoredActivity({
        type: 'product',
        title: `Formulation removed: ${item.name}`,
        description: `SKU ${item.sku} unlisted from active store catalog.`,
        user: 'Operations Admin',
      });
    }
  }

  // Filtered list based on search and tab filter
  const filteredInventory = useMemo(() => {
    return inventoryList.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || item.stockStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [inventoryList, searchQuery, statusFilter]);

  // Count items below threshold for warning banner
  const lowStockCount = inventoryList.filter(
    (item) => item.stockStatus === 'low-stock' || item.stockStatus === 'out-of-stock'
  ).length;

  return (
    <div className="space-y-6">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-forest font-medium">
            Formulations & Inventory
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Manage product catalog, authentic formulation photography, and warehouse batch thresholds.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-forest hover:bg-forest-dark text-ivory text-xs px-4 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer font-medium"
          >
            <Plus size={15} />
            <span>Add Formulation</span>
          </button>
        </div>
      </div>

      {/* ── Low Stock Alert Banner (conditional) ── */}
      {lowStockCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start sm:items-center gap-3 text-xs text-amber-800">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1">
            <span className="font-semibold block sm:inline mr-1">
              Stock Replenishment Advisory:
            </span>
            <span>
              {lowStockCount} formulation {lowStockCount === 1 ? 'item is' : 'items are'} currently below the minimum reserve threshold of 20 units.
            </span>
          </div>
        </div>
      )}

      {/* ── Search & Filter Controls ── */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by formulation name, SKU..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm text-forest placeholder:text-stone-400 focus:outline-hidden focus:border-gold focus:bg-white transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'in-stock', 'low-stock', 'out-of-stock'] as StockFilter[]).map((tab) => {
            const tabLabels: Record<StockFilter, string> = {
              all: `All (${inventoryList.length})`,
              'in-stock': 'In Stock',
              'low-stock': 'Low Stock',
              'out-of-stock': 'Out of Stock',
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
                {tabLabels[tab]}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Inventory & Products Table ── */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[11px] font-semibold border-b border-stone-200/60">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Formulation & Imagery</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Unit Price</th>
                <th className="py-3.5 px-4 text-center">In Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Quick Adjust</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredInventory.map((item) => {
                return (
                  <tr key={item.id} className="hover:bg-stone-50/60 transition-colors">
                    
                    {/* Formulation Name & Thumbnail */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200/80 overflow-hidden flex items-center justify-center shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package size={20} className="text-stone-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-forest text-sm">{item.name}</p>
                          {item.shortDescription && (
                            <p className="text-[11px] text-stone-400 line-clamp-1 max-w-xs">
                              {item.shortDescription}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="py-3.5 px-4 font-mono text-stone-500 text-xs">
                      {item.sku}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 capitalize text-stone-600">
                      {item.category}
                    </td>

                    {/* Unit Price */}
                    <td className="py-3.5 px-4 font-semibold text-forest font-mono">
                      {formatPrice(item.price)}
                    </td>

                    {/* Stock Count */}
                    <td className="py-3.5 px-4 text-center font-mono font-semibold text-forest">
                      {item.stockCount}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {item.stockStatus === 'in-stock' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle size={12} />
                          <span>In Stock</span>
                        </span>
                      )}
                      {item.stockStatus === 'low-stock' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <AlertTriangle size={12} />
                          <span>Low Stock</span>
                        </span>
                      )}
                      {item.stockStatus === 'out-of-stock' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle size={12} />
                          <span>Out of Stock</span>
                        </span>
                      )}
                    </td>

                    {/* Quick Adjust Buttons */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-stone-50 p-1 rounded-xl border border-stone-200">
                        <button
                          type="button"
                          onClick={() => handleAdjustStock(item.id, -10)}
                          title={`Reduce stock by 10 for ${item.name}`}
                          aria-label={`Reduce stock by 10 for ${item.name}`}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-600 hover:bg-stone-200 hover:text-forest transition-colors cursor-pointer"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="text-[10px] text-stone-500 font-mono px-1">
                          &plusmn;10
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAdjustStock(item.id, 10)}
                          title={`Increase stock by 10 for ${item.name}`}
                          aria-label={`Increase stock by 10 for ${item.name}`}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-600 hover:bg-stone-200 hover:text-forest transition-colors cursor-pointer"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </td>

                    {/* Edit & Delete Action Buttons */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setEditingProduct(item)}
                          title={`Edit ${item.name}`}
                          className="p-1.5 text-stone-400 hover:text-forest hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(item)}
                          title={`Delete ${item.name}`}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}

              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-stone-400 text-xs">
                    No formulations found matching the selected search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add Formulation Modal ── */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-product-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs"
        >
          <div
            className="fixed inset-0"
            onClick={() => setIsAddModalOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <div>
                <span className="text-[11px] font-mono text-gold uppercase tracking-wider block">
                  Catalog Expansion
                </span>
                <h3 id="add-product-title" className="font-serif text-2xl text-forest font-medium">
                  Add New Formulation
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

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-medium text-forest mb-1">Formulation Name</label>
                <input
                  type="text"
                  required
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                  placeholder="e.g. Ashwagandha Organic Elixir"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-forest mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={newForm.sku}
                    onChange={(e) => setNewForm({ ...newForm, sku: e.target.value })}
                    placeholder="AUR-NUT-005"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-forest mb-1">Category</label>
                  <select
                    value={newForm.category}
                    onChange={(e) => setNewForm({ ...newForm, category: e.target.value as ProductCategory })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold bg-white"
                  >
                    <option value="supplements">Supplements & Minerals</option>
                    <option value="teas">Botanical Teas</option>
                    <option value="oils">Essential Oils</option>
                    <option value="skincare">Holistic Skincare</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-forest mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newForm.price}
                    onChange={(e) => setNewForm({ ...newForm, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-forest mb-1">Initial Reserve Stock</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newForm.stockCount}
                    onChange={(e) => setNewForm({ ...newForm, stockCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold font-mono"
                  />
                </div>
              </div>

              {/* Product Photography Selector */}
              <div>
                <label className="block font-medium text-forest mb-1.5 flex items-center justify-between">
                  <span>Authentic Brand Photography</span>
                  <span className="text-stone-400 text-xs font-normal">Select image asset</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {AVAILABLE_PRODUCT_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewForm({ ...newForm, image: img.url })}
                      className={`relative aspect-square rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${
                        newForm.image === img.url
                          ? 'border-gold shadow-md scale-102 ring-2 ring-gold/20'
                          : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-forest mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={newForm.shortDescription}
                  onChange={(e) => setNewForm({ ...newForm, shortDescription: e.target.value })}
                  placeholder="Key therapeutic benefits, herbal ingredients or preparation format..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold"
                />
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
                  Register Formulation
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ── Edit Formulation Modal ── */}
      {editingProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-product-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs"
        >
          <div
            className="fixed inset-0"
            onClick={() => setEditingProduct(null)}
            aria-hidden="true"
          />
          <div className="relative bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <div>
                <span className="text-[11px] font-mono text-gold uppercase tracking-wider block">
                  Catalog Revision
                </span>
                <h3 id="edit-product-title" className="font-serif text-2xl text-forest font-medium">
                  Edit {editingProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-forest transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-medium text-forest mb-1">Formulation Name</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-forest mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-forest mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold bg-white"
                  >
                    <option value="supplements">Supplements & Minerals</option>
                    <option value="teas">Botanical Teas</option>
                    <option value="oils">Essential Oils</option>
                    <option value="skincare">Holistic Skincare</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-forest mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-forest mb-1">In Stock Quantity</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={editingProduct.stockCount}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold font-mono"
                  />
                </div>
              </div>

              {/* Product Photography Selector */}
              <div>
                <label className="block font-medium text-forest mb-1.5 flex items-center justify-between">
                  <span>Formulation Photography</span>
                  <span className="text-stone-400 text-xs font-normal">Select image asset</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {AVAILABLE_PRODUCT_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setEditingProduct({ ...editingProduct, image: img.url })}
                      className={`relative aspect-square rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${
                        editingProduct.image === img.url
                          ? 'border-gold shadow-md scale-102 ring-2 ring-gold/20'
                          : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-forest mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.shortDescription || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-forest focus:outline-hidden focus:border-gold"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest hover:bg-forest-dark text-ivory font-medium transition-colors cursor-pointer shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
