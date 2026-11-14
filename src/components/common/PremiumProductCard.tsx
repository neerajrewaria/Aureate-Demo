/*
  PremiumProductCard — AG1-Inspired Luxury Editorial Product Card
  ================================================================
  A premium, visually rich product card with a large lifestyle product
  background image on top and a structured ivory content section below.

  Layout Architecture:
    A. Product Image Section (340–400px)
       - Full-width lifestyle background image
       - object-fit: cover with per-product object-position
       - Rounded top corners, gold badge preserved in image

    B. Product Information Section (ivory)
       - Product name (Cormorant Garamond serif)
       - Short description (Inter sans)
       - Price (bold serif)
       - Shop Now CTA (forest-green pill button)
       - Speciality line (italic with botanical icon)
       - Feature check-points from product.benefits

    C. Bottom Footer
       - Thin divider
       - "Product Details ↗" link

  Uses existing cart functionality via useCart() hook.
  Uses verified product data from src/data/products.ts.
*/

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check, Leaf, ArrowUpRight, CircleCheck } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/hooks/useCart';

// Lifestyle product card background images
import magnesiumBg from '@/assets/products/magnesium_card_bg.jpg';
import omega3Bg from '@/assets/products/omega3_card_bg.jpg';
import greensBg from '@/assets/products/greens_card_bg.jpg';

// Map product slugs to their background images and object-position
const CARD_BACKGROUNDS: Record<string, { src: string; position: string }> = {
  'magnesium-complex': { src: magnesiumBg, position: '45% center' },
  'omega-3': { src: omega3Bg, position: 'center center' },
  'daily-wellness-greens': { src: greensBg, position: '45% center' },
};

// Speciality taglines per product (verified, no invented claims)
const SPECIALITY_LINES: Record<string, string> = {
  'magnesium-complex': 'Multi-form mineral complex for calm and recovery',
  'omega-3': 'Concentrated marine fatty acids for daily vitality',
  'daily-wellness-greens': 'Whole-plant botanical superfood blend',
};

interface PremiumProductCardProps {
  product: Product;
}

export default function PremiumProductCard({ product }: PremiumProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const bgConfig = CARD_BACKGROUNDS[product.slug] || {
    src: product.images[0],
    position: 'center',
  };

  const speciality = SPECIALITY_LINES[product.slug] || product.shortDescription;

  function handleShopNow(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  }

  return (
    <article className="group flex flex-col bg-[#F8F5ED] rounded-2xl overflow-hidden border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(38,59,45,0.12)] transition-all duration-400">

      {/* ─── A. PRODUCT IMAGE SECTION ─── */}
      <Link
        to={`/products/${product.slug}`}
        className="block relative w-full overflow-hidden aspect-[16/10] bg-[#EAE4D7]"
        aria-label={`View ${product.name}`}
      >
        <img
          src={bgConfig.src}
          alt={`AUREATE ${product.name} — product composition`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ objectPosition: bgConfig.position }}
          loading="lazy"
        />

        {/* Subtle bottom fade into ivory content section */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #F8F5ED 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </Link>

      {/* ─── B. PRODUCT INFORMATION SECTION ─── */}
      <div className="flex flex-col flex-1 px-7 pt-5 pb-6 sm:px-8">

        {/* Product Name */}
        <h3 className="font-serif text-[22px] sm:text-2xl text-forest font-medium leading-tight mb-2.5 group-hover:text-[#3A5A42] transition-colors">
          <Link to={`/products/${product.slug}`} className="block">
            {product.name}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-stone-500 text-[13px] sm:text-sm leading-relaxed mb-4 font-light line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Price Row */}
        <div className="flex items-baseline gap-3 mb-5">
          <span className="font-serif text-[26px] sm:text-3xl font-semibold text-forest leading-none">
            <span className="font-sans text-lg mr-0.5 font-normal">₹</span>
            {product.price.toLocaleString('en-IN')}
          </span>
          {product.servingSize && (
            <span className="text-[11px] text-stone-400 font-mono tracking-wide">
              {product.servingSize}
            </span>
          )}
        </div>

        {/* Shop Now CTA */}
        <button
          type="button"
          onClick={handleShopNow}
          className={`w-full min-h-[50px] inline-flex items-center justify-center gap-2.5 text-sm font-semibold px-6 py-3.5 rounded-xl transition-all duration-250 cursor-pointer active:scale-[0.99] mb-5 ${
            isAdded
              ? 'bg-[#1A3024] text-gold border border-gold/40 shadow-inner'
              : 'bg-forest hover:bg-[#1E3A28] text-[#F8F5ED] shadow-[0_4px_16px_rgba(38,59,45,0.25)] hover:shadow-[0_8px_24px_rgba(38,59,45,0.35)]'
          }`}
          aria-label={isAdded ? `Added ${product.name}` : `Shop ${product.name}`}
        >
          {isAdded ? (
            <>
              <Check size={17} className="stroke-[2.5]" />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              <span>Shop Now</span>
            </>
          )}
        </button>

        {/* Speciality Line */}
        <div className="flex items-center gap-2 mb-4">
          <Leaf size={14} className="text-gold shrink-0" />
          <span className="text-[12px] sm:text-[13px] text-stone-500 italic font-serif leading-snug">
            {speciality}
          </span>
        </div>

        {/* Feature Check-Points */}
        {product.benefits && product.benefits.length > 0 && (
          <ul className="space-y-2.5 mb-5">
            {product.benefits.slice(0, 4).map((benefit, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CircleCheck
                  size={15}
                  className="text-[#78866B] shrink-0 mt-[2px] stroke-[2]"
                />
                <span className="text-[12px] sm:text-[13px] text-stone-600 leading-snug font-light">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* ─── C. BOTTOM FOOTER ─── */}
        <div className="mt-auto pt-4 border-t border-stone-200/70">
          <Link
            to={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-[13px] text-forest font-medium underline underline-offset-[3px] decoration-stone-300 hover:decoration-gold hover:text-gold transition-colors w-full justify-center py-1.5"
          >
            <span>Product Details</span>
            <ArrowUpRight size={14} className="shrink-0" />
          </Link>
        </div>

      </div>
    </article>
  );
}
