/*
  AUREATE — Admin LocalStorage Demonstration Persistence
  ======================================================
  Ensures that simulated changes in the admin dashboard (e.g., adding/editing/deleting
  products, advancing order statuses, adding customers) persist across page reloads
  and route transitions for client presentations, with a clean 1-click reset option.
*/

import type { InventoryProduct, Order, Customer, AdminActivity } from '@/types';
import { INVENTORY, ORDERS, CUSTOMERS, INITIAL_ACTIVITIES } from '@/data/adminData';

const STORAGE_KEYS = {
  INVENTORY: 'aureate_admin_inventory_v1',
  ORDERS: 'aureate_admin_orders_v1',
  CUSTOMERS: 'aureate_admin_customers_v1',
  ACTIVITIES: 'aureate_admin_activities_v1',
};

// Custom event to synchronize sibling components without full page reloads
export const ADMIN_DATA_EVENT = 'aureate_admin_data_changed';

function dispatchUpdateEvent(detail: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(ADMIN_DATA_EVENT, { detail }));
  }
}

// ─── Inventory Persistence ───────────────────────────────────────────────────

export function getStoredInventory(): InventoryProduct[] {
  if (typeof window === 'undefined') return INVENTORY;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    if (!raw) return INVENTORY;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INVENTORY;
  } catch (err) {
    console.warn('Could not read admin inventory from localStorage:', err);
    return INVENTORY;
  }
}

export function saveStoredInventory(items: InventoryProduct[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(items));
    dispatchUpdateEvent('inventory');
  } catch (err) {
    console.error('Failed to save inventory to localStorage:', err);
  }
}

// ─── Orders Persistence ──────────────────────────────────────────────────────

export function getStoredOrders(): Order[] {
  if (typeof window === 'undefined') return ORDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) return ORDERS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ORDERS;
  } catch (err) {
    console.warn('Could not read admin orders from localStorage:', err);
    return ORDERS;
  }
}

export function saveStoredOrders(orders: Order[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    dispatchUpdateEvent('orders');
  } catch (err) {
    console.error('Failed to save orders to localStorage:', err);
  }
}

// ─── Customers Persistence ───────────────────────────────────────────────────

export function getStoredCustomers(): Customer[] {
  if (typeof window === 'undefined') return CUSTOMERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (!raw) return CUSTOMERS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : CUSTOMERS;
  } catch (err) {
    console.warn('Could not read admin customers from localStorage:', err);
    return CUSTOMERS;
  }
}

export function saveStoredCustomers(customers: Customer[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    dispatchUpdateEvent('customers');
  } catch (err) {
    console.error('Failed to save customers to localStorage:', err);
  }
}

// ─── Activities Persistence ───────────────────────────────────────────────────

export function getStoredActivities(): AdminActivity[] {
  if (typeof window === 'undefined') return INITIAL_ACTIVITIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    if (!raw) return INITIAL_ACTIVITIES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ACTIVITIES;
  } catch (err) {
    console.warn('Could not read admin activities from localStorage:', err);
    return INITIAL_ACTIVITIES;
  }
}

export function addStoredActivity(activity: Omit<AdminActivity, 'id' | 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getStoredActivities();
    const newEntry: AdminActivity = {
      ...activity,
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
    };
    const updated = [newEntry, ...list.slice(0, 19)]; // keep latest 20
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updated));
    dispatchUpdateEvent('activities');
  } catch (err) {
    console.error('Failed to append activity to localStorage:', err);
  }
}

// ─── Complete Reset Demo Data ────────────────────────────────────────────────

export function resetAllAdminData(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.INVENTORY);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    dispatchUpdateEvent('reset');
  } catch (err) {
    console.error('Failed to reset admin data:', err);
  }
}
