/*
  ProductCard — Individual Formulation Card (Botanical Atelier Luxury)
  =====================================================================
  A spacious, art-directed editorial product card for AUREATE formulations.

  Spacing & Visual Architecture:
  - Generous photographic stage (p-8 sm:p-10) with subtle warm alabaster lighting
  - Clear editorial hierarchy: Kicker → Title → Description → Ingredients → Price/CTA
  - Generous padding in content body (p-6 sm:p-8) with intentional breathing room
  - Non-cramped bottom price & Add to Bag row with mt-auto separation
  - Authentic supplied product photography with natural studio drop-shadows
  - Accessible touch targets (≥44px) and keyboard navigation
*/

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  }

  // Formulation category kicker
  const categoryKicker =
    product.slug === 'magnesium-complex'
      ? 'Essential Mineral'
      : product.slug === 'omega-3'
      ? 'Essential Lipids'
      : 'Whole Superfood';

  return (
    <article className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(182,154,98,0.14)] hover:border-gold/60 transition-all duration-300">
      
      {/* ── 1. SPACIOUS PHOTOGRAPHIC STAGE ── */}
      <Link
        to={`/products/${product.slug}`}
        className="block relative aspect-square w-full bg-gradient-to-b from-[#FBF9F5] via-[#F4F0E8] to-[#ECE5D8] p-8 sm:p-10 overflow-hidden border-b border-stone-200/60"
        aria-label={`View ${product.name} details`}
      >
        {/* Ambient Warm Studio Spotlight */}
        <div
          className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none"
          aria-hidden="true"
        />

        {/* Authentic Product Photography */}
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={`AUREATE ${product.name}`}
            className="max-w-[85%] max-h-[85%] object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Serving Size Pill in Corner */}
        {product.servingSize && (
          <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs text-[10px] text-stone-600 px-3 py-1 rounded-full border border-stone-200/80 shadow-xs font-mono tracking-wider uppercase">
            {product.servingSize}
          </span>
        )}
      </Link>

      {/* ── 2. CARD CONTENT BODY WITH LUXURY BREATHING ROOM ── */}
      <div className="flex flex-col flex-1 p-7 sm:p-8">
        
        {/* Category Kicker */}
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-gold font-mono font-medium mb-2.5 block">
          {categoryKicker}
        </span>

        {/* Product Title */}
        <h3 className="font-serif text-2xl sm:text-[26px] text-forest font-medium leading-[1.2] mb-3 group-hover:text-gold transition-colors">
          <Link to={`/products/${product.slug}`} className="block">
            {product.name}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-stone-500 text-sm leading-relaxed mb-4 font-light line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Clean Editorial Actives Line */}
        {product.ingredients && product.ingredients.length > 0 && (
          <p className="text-xs text-stone-400 font-mono tracking-tight mb-6 line-clamp-1">
            <span className="text-gold font-semibold uppercase tracking-wider text-[10px] mr-1.5">Actives:</span>
            {product.ingredients.slice(0, 3).join(' · ')}
          </p>
        )}

        {/* ── 3. GROUNDED PRICE & FULL-WIDTH ADD TO BAG CTA ── */}
        <div className="mt-auto pt-5 border-t border-stone-100 flex flex-col space-y-3.5">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-2xl sm:text-[26px] font-medium text-forest">
              <span className="font-sans text-xl mr-0.5 font-normal">₹</span>
              {product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">
              Portfolio Price
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-200 cursor-pointer shadow-soft active:scale-[0.99] ${
              isAdded
                ? 'bg-[#183622] text-gold border border-gold/40'
                : 'bg-forest hover:bg-forest-dark text-ivory hover:shadow-lifted'
            }`}
            aria-label={isAdded ? `Added ${product.name} to bag` : `Add ${product.name} to shopping bag`}
          >
            {isAdded ? (
              <>
                <Check size={16} className="stroke-[2.5]" />
                <span className="tracking-wide">Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag size={15} />
                <span className="tracking-wide">Add to Bag</span>
              </>
            )}
          </button>
        </div>

      </div>
    </article>
  );
}
