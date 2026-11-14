/*
  CartPage — Aureate Shopping Bag
  =================================
  Full functional frontend shopping bag with:
  - Item listing with thumbnail, name, unit price, quantity increment/decrement
  - Subtotal & total calculations
  - Removal of items
  - Direct checkout navigation
  - Automatic localStorage persistence through useCart()
*/

import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils';

export default function CartPage() {
  const { items, totalPrice, totalItems, updateQuantity, removeItem } = useCart();

  const shippingFee = totalPrice >= 999 || items.length === 0 ? 0 : 99;
  const grandTotal = totalPrice + shippingFee;

  return (
    <div className="py-12 md:py-20 bg-ivory min-h-[70vh]">
      <div className="container-site">
        
        <h1 className="font-serif text-3xl md:text-5xl text-forest font-medium mb-8">
          Shopping Bag {totalItems > 0 && <span className="text-stone-400 text-2xl font-sans font-normal">({totalItems})</span>}
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-soft max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-forest/5 text-forest flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={28} />
            </div>
            <h2 className="font-serif text-2xl text-forest mb-2">Your Bag is Empty</h2>
            <p className="text-stone-500 text-sm mb-6">
              Explore our considered botanical nutraceuticals and essential formulations.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-forest text-ivory px-6 py-3 rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors shadow-soft"
            >
              <span>Explore Formulations</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* ── Left Column: Items List ── */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-soft">
              <div className="divide-y divide-stone-100">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="py-6 first:pt-0 last:pb-0 flex gap-4 md:gap-6 items-center">
                    
                    {/* Thumbnail */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-stone-50 p-2 shrink-0 border border-stone-200/70 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${product.slug}`}
                        className="font-serif text-lg md:text-xl text-forest hover:text-sage font-medium transition-colors truncate block"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-stone-400 capitalize mt-0.5">
                        {product.category}
                      </p>
                      <p className="text-sm font-semibold text-forest mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1.5 border border-stone-200 rounded-xl p-1 bg-stone-50">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-200 cursor-pointer transition-colors"
                        aria-label={`Decrease quantity of ${product.name}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-forest font-mono">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-200 cursor-pointer transition-colors"
                        aria-label={`Increase quantity of ${product.name}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Item Total & Remove */}
                    <div className="text-right shrink-0 flex flex-col items-end">
                      <p className="text-base font-semibold text-forest mb-1 font-mono">
                        {formatPrice(product.price * quantity)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="min-w-[40px] min-h-[40px] flex items-center justify-center text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                        aria-label={`Remove ${product.name} from shopping bag`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* ── Right Column: Order Summary ── */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-soft sticky top-28">
              <h3 className="font-serif text-xl text-forest font-medium mb-6">
                Order Summary
              </h3>

              <div className="space-y-3.5 text-sm pb-6 border-b border-stone-200">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-forest">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-forest">
                    {shippingFee === 0 ? (
                      <span className="text-sage font-semibold uppercase text-xs">Complimentary</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-6 text-base font-semibold text-forest">
                <span>Estimated Total</span>
                <span className="font-serif text-2xl">{formatPrice(grandTotal)}</span>
              </div>

              <Link
                to="/checkout"
                className="w-full inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-dark text-ivory py-4 px-6 rounded-xl font-medium tracking-wide transition-colors shadow-soft"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={17} />
              </Link>

              <p className="text-center text-xs text-stone-400 mt-4">
                Complimentary delivery on all orders above &#8377;999.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
