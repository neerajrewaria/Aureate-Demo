/*
  AUREATE — Utility Functions
  ==============================
  Small, focused helper functions used across the application.
*/

/**
 * Formats a number as Indian Rupees.
 * Example: formatPrice(1299) → "₹1,299"
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Joins class names, filtering out falsy values.
 * This is a simple alternative to the full 'clsx' package for basic usage.
 * We import clsx directly for more complex conditional class building.
 *
 * Example: cn('base-class', isActive && 'active-class') → "base-class active-class"
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Truncates a string to a maximum length and adds an ellipsis.
 * Example: truncate("Hello World", 8) → "Hello Wo..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Calculates the discount percentage between original and sale price.
 * Example: getDiscountPercent(849, 649) → 24
 */
export function getDiscountPercent(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}
