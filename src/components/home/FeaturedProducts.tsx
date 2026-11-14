/*
  FeaturedProducts — Core Formulations Showcase
  ==============================================
  Displays the 3 confirmed AUREATE products in a clean, balanced 3-column grid:
  1. Magnesium Complex
  2. Omega-3
  3. Daily Wellness Greens

  Reuses the ProductCard component and live useCart() state.
*/

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import PremiumProductCard from '@/components/common/PremiumProductCard';
import { getFeaturedProducts } from '@/data/products';

export default function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="container-site">
        
        {/* Header with Title and "View All" link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <SectionHeading
            title="Core Formulations"
            subtitle="Essential minerals, purified lipids, and whole-plant greens formulated for daily equilibrium."
          />

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-forest hover:text-gold font-medium text-sm transition-colors group shrink-0"
          >
            <span>View All Formulations</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Column Responsive Grid with Generous Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {products.map((product) => (
            <PremiumProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
