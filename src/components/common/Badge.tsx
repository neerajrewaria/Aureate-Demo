/*
  Badge — Small Label Component
  ================================
  Used for:
  - Product labels: "Bestseller", "New", "Premium", "Classic"
  - Stock status: "In Stock", "Low Stock", "Out of Stock"
  - Admin order status: "Paid", "Pending", "Failed"
  - Admin delivery status: "Processing", "Shipped", "Delivered"

  The 'variant' prop controls colour; 'size' controls padding.
*/

type BadgeVariant =
  | 'gold'      // Product highlights — gold background
  | 'forest'    // Active / in-stock states — green
  | 'sage'      // Secondary / info states
  | 'amber'     // Warning / low-stock states
  | 'rose'      // Error / failed / out-of-stock states
  | 'stone';    // Neutral / cancelled states

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  gold:   'bg-gold/15 text-stone-700 border-gold/30',
  forest: 'bg-forest/10 text-forest border-forest/20',
  sage:   'bg-sage/15 text-sage border-sage/30',
  amber:  'bg-amber-50 text-amber-700 border-amber-200',
  rose:   'bg-rose-50 text-rose-700 border-rose-200',
  stone:  'bg-stone-100 text-stone-500 border-stone-200',
};

export default function Badge({
  children,
  variant = 'gold',
  size = 'sm',
}: BadgeProps) {
  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-xs'
    : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-block font-medium rounded-full border tracking-wide ${sizeClasses} ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </span>
  );
}
