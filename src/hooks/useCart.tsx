/*
  AUREATE — Cart Context & useCart Hook
  ========================================
  This file manages the shopping cart state for the entire application.

  HOW IT WORKS:
  - CartContext holds the cart state (items, totals).
  - CartProvider wraps the app in main.tsx so every component can access the cart.
  - useCart() is the hook components call to read state and dispatch actions.
  - Cart data is saved to localStorage so it survives page refreshes.

  USAGE IN COMPONENTS:
    const { items, totalItems, addItem, removeItem } = useCart();

  WHY CONTEXT (not Zustand/Redux):
  The cart is the only truly global state in this app. React Context is
  perfectly suited for this — no extra libraries needed, easy to follow.
*/

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import type { CartItem, CartState, Product } from '@/types';

// ─── State Shape ─────────────────────────────────────────────────────────────

// What the context provides to components
interface CartContextValue extends CartState {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// ─── Reducer Actions ──────────────────────────────────────────────────────────

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_FROM_STORAGE'; items: CartItem[] };

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calculateTotals(items: CartItem[]): { totalItems: number; totalPrice: number } {
  return items.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      totalPrice: acc.totalPrice + item.product.price * item.quantity,
    }),
    { totalItems: 0, totalPrice: 0 }
  );
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  let updatedItems: CartItem[];

  switch (action.type) {
    case 'ADD_ITEM': {
      const addQty = action.quantity && action.quantity > 0 ? action.quantity : 1;
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id
      );

      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + addQty }
            : item
        );
      } else {
        // Otherwise, add it as a new cart item with specified quantity
        updatedItems = [...state.items, { product: action.product, quantity: addQty }];
      }
      break;
    }

    case 'REMOVE_ITEM': {
      updatedItems = state.items.filter(
        (item) => item.product.id !== action.productId
      );
      break;
    }

    case 'UPDATE_QUANTITY': {
      // If new quantity is 0 or less, remove the item entirely
      if (action.quantity <= 0) {
        updatedItems = state.items.filter(
          (item) => item.product.id !== action.productId
        );
      } else {
        updatedItems = state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        );
      }
      break;
    }

    case 'CLEAR_CART': {
      updatedItems = [];
      break;
    }

    case 'LOAD_FROM_STORAGE': {
      updatedItems = action.items;
      break;
    }

    default:
      return state;
  }

  return {
    items: updatedItems,
    ...calculateTotals(updatedItems),
  };
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'aureate_cart';

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// ─── Provider ────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // On first render, load any previously saved cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('ayurlate_cart');
    if (saved) {
      try {
        const savedItems = JSON.parse(saved) as CartItem[];
        dispatch({ type: 'LOAD_FROM_STORAGE', items: savedItems });
      } catch {
        // If localStorage data is corrupted, start with an empty cart
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Whenever the cart changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product, quantity = 1) =>
    dispatch({ type: 'ADD_ITEM', product, quantity });
  const removeItem = (productId: string) => dispatch({ type: 'REMOVE_ITEM', productId });
  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * useCart — access cart state and actions from any component.
 *
 * Must be used inside <CartProvider>. If called outside, throws a clear error
 * so the developer immediately knows what went wrong.
 */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>. Check that CartProvider wraps your app in main.tsx.');
  }
  return context;
}
