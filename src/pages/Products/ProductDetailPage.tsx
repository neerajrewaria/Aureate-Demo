/*
  ProductDetailPage — Product Details View
  ==========================================
  A premium, editorial product detail page featuring:
  - Product photo stage with authentic photography
  - Thumbnail gallery (rendered only when multiple genuine images exist)
  - Clear typography & formulation attributes
  - Interactive quantity selector (minimum: 1)
  - Add to Cart with direct tactile feedback (connected to useCart)
  - Serving size & transparent formulation specifications
  - Related complementary formulations section
  - Invalid product URL error state
  - Human-readable intermediate-level React code
*/

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Plus,
  Minus,
  Check,
  Clock,
  Package,
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils';
import ProductCard from '@/components/common/ProductCard';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = slug ? getProductBySlug(slug) : undefined;
  const relatedProducts = product ? getRelatedProducts(product.id) : [];

  // ── Invalid Product Slug State ──
  if (!product) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-16 bg-[#FDFBF7]">
        <div className="container-site max-w-lg text-center bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-soft">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
            <Package size={32} />
          </div>
          <h1 className="font-serif text-3xl text-forest font-medium mb-3">
            Formulation Not Found
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mb-8 leading-relaxed">
            The formulation you are searching for does not exist in our catalog or the link may have changed.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-dark text-ivory px-6 py-3 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-xs"
          >
            <ArrowLeft size={16} />
            <span>Return to All Formulations</span>
          </Link>
        </div>
      </div>
    );
  }

  // ── Quantity Selector Handlers ──
  function handleDecrement() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  function handleIncrement() {
    setQuantity((prev) => prev + 1);
  }

  // ── Add to Cart Action ──
  function handleAddToCart() {
    if (!product) return;
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  }

  return (
    <div className="py-10 md:py-20 bg-[#FAF8F5] min-h-screen">
      <div className="container-site">
        
        {/* ── Breadcrumb Navigation ── */}
        <div className="mb-8 md:mb-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-forest text-xs uppercase tracking-wider font-mono font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to All Formulations</span>
          </Link>
        </div>

        {/* ── Main Product Display Grid with Generous Spacing ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20 md:mb-28">
          
          {/* ── Left Column: Product Photo Stage & Gallery ── */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            
            {/* Primary Image Stage */}
            <div className="relative aspect-square w-full rounded-3xl bg-gradient-to-b from-[#FBF9F5] via-[#F4F0E8] to-[#EAE4D8] p-10 sm:p-14 border border-stone-200/90 shadow-[0_8px_36px_rgba(0,0,0,0.04)] flex items-center justify-center overflow-hidden">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] transition-all duration-300"
              />

              {/* Serving Size badge in corner */}
              {product.servingSize && (
                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-xs text-[11px] font-mono text-stone-600 px-3.5 py-1.5 rounded-full border border-stone-200/90 shadow-xs">
                  {product.servingSize}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery (rendered ONLY when multiple genuine images exist) */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden p-2 bg-[#FAF8F5] border-2 transition-all cursor-pointer ${
                      activeImageIndex === index
                        ? 'border-gold shadow-xs'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Authentic Brand Photograph Note */}
            <p className="text-[11px] text-stone-400 text-center font-mono">
              SKU: {product.sku} &bull; Authentic AUREATE Formulation
            </p>

          </div>

          {/* ── Right Column: Specs, Dosage & Add to Cart ── */}
          <div className="lg:col-span-6 flex flex-col items-start bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-stone-200/80 shadow-soft">
            
            {/* Category / Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold text-[11px] tracking-widest uppercase font-semibold mb-3">
              <Sparkles size={12} />
              <span>Botanical Nutraceutical</span>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest font-medium mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-stone-100 w-full">
              <span className="font-serif text-3xl sm:text-4xl text-forest font-semibold">
                <span className="font-sans text-2xl mr-0.5 font-normal">₹</span>
                {product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-stone-400 uppercase tracking-wide">
                Demonstration Price &bull; Taxes Included
              </span>
            </div>

            {/* Editorial Description */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 font-light">
              {product.description}
            </p>

            {/* Core Formulation Attributes */}
            <div className="w-full bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200/70 mb-6 space-y-2.5">
              <h4 className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold mb-2">
                Formulation Attributes
              </h4>
              {product.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <ShieldCheck size={16} className="text-sage shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Usage Instructions */}
            <div className="w-full mb-6 flex items-start gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200/60 text-xs sm:text-sm text-stone-600">
              <Clock size={16} className="text-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-forest font-medium block">Suggested Usage:</strong>
                <span>{product.usageInstructions}</span>
              </div>
            </div>

            {/* ── Quantity Selector & Add to Bag Controls ── */}
            <div className="w-full pt-4 border-t border-stone-100">
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full mb-4">
                
                {/* Quantity Control Pill */}
                <div className="flex items-center justify-between border border-stone-200 rounded-xl bg-stone-50 px-3 py-2 sm:w-36 shrink-0 min-h-[44px]">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-forest hover:bg-stone-200 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="font-mono text-sm font-semibold text-forest px-2" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    aria-label="Increase quantity"
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-forest hover:bg-stone-200 cursor-pointer transition-colors"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 min-h-[44px] inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer shadow-soft ${
                    isAdded
                      ? 'bg-sage text-ivory'
                      : 'bg-forest hover:bg-forest-dark text-ivory'
                  }`}
                  aria-label={isAdded ? `Added ${quantity} of ${product.name} to shopping bag` : `Add ${quantity} of ${product.name} to shopping bag`}
                >
                  {isAdded ? (
                    <>
                      <Check size={18} className="stroke-[2.5]" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>Add to Bag &bull; {formatPrice(product.price * quantity)}</span>
                    </>
                  )}
                </button>

              </div>

              {/* View Bag Quick Link */}
              <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
                <span>Free delivery on sample orders</span>
                <Link
                  to="/cart"
                  className="text-gold hover:text-gold-dark font-medium underline underline-offset-2 transition-colors"
                >
                  View Shopping Bag &rarr;
                </Link>
              </div>

            </div>

            {/* ── Ingredients Deck ── */}
            <div className="mt-8 pt-6 border-t border-stone-100 w-full">
              <h3 className="font-serif text-lg text-forest mb-2.5 flex items-center gap-2 font-medium">
                <Sparkles size={16} className="text-gold" />
                <span>Transparent Ingredient Selection</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {product.ingredients.map((ingredient, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-stone-100 text-stone-700 text-xs px-3 py-1 rounded-full border border-stone-200/70"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ── Complementary Formulations (Related Products) ── */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-stone-200">
            <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
              <p className="text-[11px] font-mono uppercase tracking-widest text-gold font-semibold mb-1">
                Complete The Ritual
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-forest font-medium">
                Complementary Formulations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto gap-6 sm:gap-8">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-forest hover:text-gold transition-colors"
              >
                <span>Explore Full Portfolio</span>
                <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
