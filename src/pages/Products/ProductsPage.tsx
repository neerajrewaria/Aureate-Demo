/*
  ProductsPage — The Aureate Formulations Catalogue
  =================================================
  A luxury editorial product catalogue featuring:
  - Spacious Atelier header with gold rules and serif typography
  - Structured search & category filter bar with generous touch areas
  - Airy 3-column product grid with 32px-40px gaps
  - Atelier standards guarantee section with spacious feature cards (p-6 to p-7)
  - 100% human-readable intermediate-level React & TypeScript
*/

import { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, PackageSearch, Leaf, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import PremiumProductCard from '@/components/common/PremiumProductCard';
import { PRODUCTS } from '@/data/products';
import type { Product } from '@/types';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
type FilterTag = 'all' | 'minerals' | 'lipids' | 'greens';

const FILTER_TAGS: { value: FilterTag; label: string }[] = [
  { value: 'all', label: 'All Formulations' },
  { value: 'minerals', label: 'Essential Minerals' },
  { value: 'lipids', label: 'Purified Lipids' },
  { value: 'greens', label: 'Whole Superfoods' },
];

export default function ProductsPage() {
  const [selectedTag, setSelectedTag] = useState<FilterTag>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Filter and sort formulations
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Tag filter logic
      let matchesTag = true;
      if (selectedTag === 'minerals') {
        matchesTag = product.slug === 'magnesium-complex';
      } else if (selectedTag === 'lipids') {
        matchesTag = product.slug === 'omega-3';
      } else if (selectedTag === 'greens') {
        matchesTag = product.slug === 'daily-wellness-greens';
      }

      // 2. Search query matching name, description, or ingredients
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.ingredients.some((ing) => ing.toLowerCase().includes(query));

      return matchesTag && matchesSearch;
    }).sort((a: Product, b: Product) => {
      // 3. Sorting logic
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0; // 'featured' retains natural data order
    });
  }, [selectedTag, searchQuery, sortBy]);

  // Reset all filters to default
  function handleClearFilters() {
    setSearchQuery('');
    setSelectedTag('all');
    setSortBy('featured');
  }

  const hasActiveFilters = searchQuery !== '' || selectedTag !== 'all' || sortBy !== 'featured';

  return (
    <div className="bg-[#FAF8F5] text-forest min-h-screen">
      
      {/* ── 1. EDITORIAL ATELIER HEADER (SPACIOUS & ELEVATED) ── */}
      <section className="relative overflow-hidden bg-[#0D1C12] text-ivory py-20 sm:py-24 md:py-28 border-b border-[#08120B]">
        {/* Ambient Studio Lighting */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 1000px 550px at 50% 40%, rgba(26, 49, 34, 0.95) 0%, rgba(13, 28, 18, 0.98) 60%, rgba(6, 14, 9, 1) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Central Champagne Gold Spotlight */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-35"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(197, 160, 89, 0.32) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="container-site relative z-10 text-center max-w-2xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-3.5">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold/70" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs text-gold tracking-[0.26em] uppercase font-medium">
              The Botanical Catalogue
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold/70" aria-hidden="true" />
          </div>

          {/* Master Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-normal leading-[1.08] tracking-tight mb-4 drop-shadow-sm">
            <span style={{ color: '#F8F5ED' }}>The Aureate</span>{' '}
            <span className="italic text-gold">Formulations.</span>
          </h1>

          {/* Subtitle Statement */}
          <p className="text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-lg mx-auto">
            A considered portfolio of essential minerals, purified marine lipids, and whole-plant superfoods crafted for daily equilibrium.
          </p>
        </div>
      </section>

      {/* ── 2. CATALOGUE MAIN CONTAINER ── */}
      <div className="container-site py-12 sm:py-16 md:py-20">
        
        {/* ── Search, Filter & Sort Controls Bar (Spacious 2-Tier Luxury Layout) ── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-stone-200/90 shadow-[0_6px_30px_rgba(0,0,0,0.03)] mb-12 sm:mb-16">
          
          {/* Tier 1: Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3.5 pb-6 border-b border-stone-100" role="toolbar" aria-label="Formulation categories">
            {FILTER_TAGS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setSelectedTag(value)}
                className={`min-h-[46px] px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  selectedTag === value
                    ? 'bg-forest text-ivory shadow-soft font-semibold ring-1 ring-gold/40'
                    : 'bg-[#FAF8F5] text-stone-600 border border-stone-200 hover:border-gold hover:text-forest'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tier 2: Search Input & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="catalogue-search" className="sr-only">
                Search formulations or ingredients
              </label>
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              />
              <input
                id="catalogue-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulations or ingredients..."
                className="w-full min-h-[48px] pl-12 pr-10 py-3 bg-[#FAF8F5] border border-stone-200 rounded-2xl text-sm text-forest placeholder:text-stone-400 focus:outline-hidden focus:border-gold focus:ring-2 focus:ring-gold/20 focus:bg-white transition-all font-light"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-forest cursor-pointer p-1 rounded-md"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 shrink-0 justify-end">
              <SlidersHorizontal size={15} className="text-stone-400" />
              <label htmlFor="sort-select" className="text-xs text-stone-500 font-mono uppercase tracking-wider">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="min-h-[48px] bg-[#FAF8F5] border border-stone-200 text-forest text-xs sm:text-sm rounded-2xl px-4 py-2.5 cursor-pointer focus:outline-hidden focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all font-medium"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>

          </div>

          {/* Results Summary & Clear Button */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-stone-100 text-xs sm:text-sm text-stone-500 font-light">
            <span>
              Showing <strong className="text-forest font-semibold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'formulation' : 'formulations'}
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gold hover:text-gold-dark font-medium cursor-pointer transition-colors"
              >
                <RefreshCw size={13} />
                <span>Reset Filters &amp; Search</span>
              </button>
            )}
          </div>
        </div>

        {/* ── 3. FORMULATIONS GRID (AIRY 32px-40px GAPS) ── */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-20 md:mb-24">
            {filteredProducts.map((product) => (
              <PremiumProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-20 px-6 bg-white rounded-3xl border border-stone-200/90 shadow-soft max-w-lg mx-auto mb-20">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-forest/5 text-forest flex items-center justify-center">
              <PackageSearch size={32} />
            </div>
            <h3 className="font-serif text-3xl text-forest font-medium mb-3">
              No Formulations Found
            </h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto mb-8 leading-relaxed font-light">
              We couldn&apos;t find any formulations matching &ldquo;{searchQuery}&rdquo;. Try checking for magnesium, omega-3, or greens.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 bg-forest hover:bg-forest-dark text-ivory px-7 py-3 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-soft"
            >
              Clear Filters &amp; Search
            </button>
          </div>
        )}

        {/* ── 4. ATELIER CRAFTSMANSHIP STANDARDS (SPACIOUS P-8/P-10 CARDS) ── */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 border border-stone-200/90 shadow-[0_6px_30px_rgba(0,0,0,0.03)]">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-gold font-medium block mb-2">
              The Aureate Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest font-medium">
              Crafted With Uncompromising Integrity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-start p-7 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-gold/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-forest/5 text-forest flex items-center justify-center mb-5">
                <Leaf size={20} />
              </div>
              <h3 className="font-serif text-xl text-forest font-medium mb-2">
                Botanical Synergy
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
                Whole-plant greens, gentle mineral chelates, and purified lipids with zero synthetic fillers or dyes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start p-7 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-gold/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-forest/5 text-forest flex items-center justify-center mb-5">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-serif text-xl text-forest font-medium mb-2">
                Rigorous Screening
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
                Batch-level verification for heavy metals, microbial safety, and genuine active potency.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start p-7 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-gold/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-forest/5 text-forest flex items-center justify-center mb-5">
                <Truck size={20} />
              </div>
              <h3 className="font-serif text-xl text-forest font-medium mb-2">
                Careful Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
                Protected, climate-conscious dispatch within 24–48 hours across major Indian metro centers.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-start p-7 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-gold/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-forest/5 text-forest flex items-center justify-center mb-5">
                <RefreshCw size={20} />
              </div>
              <h3 className="font-serif text-xl text-forest font-medium mb-2">
                Daily Equilibrium
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
                An honest, gentle wellness companion designed to support consistent everyday balance.
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
