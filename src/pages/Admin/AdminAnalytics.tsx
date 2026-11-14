/*
  AdminAnalytics — Business Performance & Insights
  ==================================================
  Detailed analytical charts and commercial insights for AUREATE.

  Features:
  - 4 Key Unit Economics Metrics (AOV, Conversion Rate, Repeat Rate, Margin)
  - Visual monthly revenue & order volume trend comparisons
  - Formulation portfolio revenue contribution
  - Regional dispatch distribution
  - Human-readable intermediate-level React code
*/

import {
  TrendingUp,
  Percent,
  Repeat,
  DollarSign,
  MapPin,
  Sparkles,
} from 'lucide-react';
import {
  REVENUE_DATA,
  PRODUCT_PERFORMANCE,
} from '@/data/adminData';
import { formatPrice } from '@/utils';

const REGIONAL_DISTRIBUTION = [
  { region: 'Bengaluru (Karnataka)', percentage: 34, orders: 106 },
  { region: 'Mumbai (Maharashtra)', percentage: 26, orders: 81 },
  { region: 'Delhi NCR', percentage: 18, orders: 56 },
  { region: 'Hyderabad (Telangana)', percentage: 12, orders: 37 },
  { region: 'Other Indian Metros', percentage: 10, orders: 32 },
];

export default function AdminAnalytics() {
  const maxRevenue = Math.max(...REVENUE_DATA.map((d) => d.revenue));
  const maxOrders = Math.max(...REVENUE_DATA.map((d) => d.orders));

  const totalPortfolioRevenue = PRODUCT_PERFORMANCE.reduce(
    (acc, curr) => acc + curr.revenue,
    0
  );

  return (
    <div className="space-y-8">
      
      {/* ── Page Header ── */}
      <div>
        <h1 className="font-serif text-3xl text-forest font-medium mb-1">
          Performance Analytics & Insights
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Commercial indicators, customer repeat retention, and dispatch geographic spread.
        </p>
      </div>

      {/* ── 1. Unit Economics KPI Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Average Order Value (AOV) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Average Order Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-semibold text-forest">
            {formatPrice(1116)}
          </p>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            +8.2% vs previous quarter
          </p>
        </div>

        {/* Storefront Conversion Rate */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Conversion Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Percent size={16} />
            </div>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-semibold text-forest">
            3.8%
          </p>
          <p className="text-xs text-blue-600 font-medium mt-1">
            Top decile for wellness brands
          </p>
        </div>

        {/* Customer Repeat Rate */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Repeat Purchase Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center">
              <Repeat size={16} />
            </div>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-semibold text-forest">
            24.6%
          </p>
          <p className="text-xs text-stone-400 mt-1">
            Subscribed or recurring clients
          </p>
        </div>

        {/* Gross Margin */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Gross Formulation Margin
            </span>
            <div className="w-8 h-8 rounded-lg bg-forest/5 text-forest flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-semibold text-forest">
            68.2%
          </p>
          <p className="text-xs text-stone-400 mt-1">
            Standard direct-to-consumer model
          </p>
        </div>

      </div>

      {/* ── 2. Detailed Revenue & Orders Trend Chart ── */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100 mb-6">
          <div>
            <h3 className="font-serif text-xl text-forest font-medium">
              Revenue & Order Progression
            </h3>
            <p className="text-xs text-stone-400">Monthly gross billing and dispatch count for FY 2026</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 text-stone-600">
              <span className="w-3 h-3 bg-forest rounded-sm" />
              Revenue (₹)
            </span>
            <span className="inline-flex items-center gap-1.5 text-stone-600">
              <span className="w-3 h-3 bg-gold rounded-sm" />
              Orders Dispatched
            </span>
          </div>
        </div>

        {/* Dual Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2">
          {REVENUE_DATA.map((d) => {
            const revHeight = Math.round((d.revenue / maxRevenue) * 100);
            const ordHeight = Math.round((d.orders / maxOrders) * 100);

            return (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-stone-900 text-ivory px-2 py-1 rounded shadow-xs whitespace-nowrap pointer-events-none mb-1 text-center">
                  <span className="block font-semibold">{formatPrice(d.revenue)}</span>
                  <span className="text-stone-300">{d.orders} orders</span>
                </div>

                {/* Double Bar Container */}
                <div className="w-full flex items-end justify-center gap-1 h-44">
                  {/* Revenue Bar */}
                  <div
                    style={{ height: `${revHeight}%` }}
                    className="w-full max-w-[14px] bg-forest rounded-t-sm group-hover:bg-forest-dark transition-all duration-200"
                  />
                  {/* Orders Bar */}
                  <div
                    style={{ height: `${ordHeight}%` }}
                    className="w-full max-w-[14px] bg-gold rounded-t-sm group-hover:bg-gold-light transition-all duration-200"
                  />
                </div>

                {/* Month label */}
                <span className="text-[11px] font-mono text-stone-500">
                  {d.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. Portfolio Contribution & Regional Distribution ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Formulation Contribution (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-soft space-y-6">
          <div className="pb-3 border-b border-stone-100">
            <h3 className="font-serif text-xl text-forest font-medium flex items-center gap-2">
              <Sparkles size={16} className="text-gold" />
              <span>Formulation Revenue Contribution</span>
            </h3>
            <p className="text-xs text-stone-400">Share of total portfolio sales</p>
          </div>

          <div className="space-y-4">
            {PRODUCT_PERFORMANCE.map((item) => {
              const share = Math.round((item.revenue / totalPortfolioRevenue) * 100);

              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-forest">{item.name}</span>
                    <span className="font-mono text-stone-600">
                      {formatPrice(item.revenue)}{' '}
                      <strong className="text-forest">({share}%)</strong>
                    </span>
                  </div>

                  <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${share}%` }}
                      className="h-full bg-forest rounded-full transition-all duration-300"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Regional Dispatch Spread (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-soft space-y-6">
          <div className="pb-3 border-b border-stone-100">
            <h3 className="font-serif text-xl text-forest font-medium flex items-center gap-2">
              <MapPin size={16} className="text-sage" />
              <span>Geographical Dispatch Distribution</span>
            </h3>
            <p className="text-xs text-stone-400">Top delivery regions across India</p>
          </div>

          <div className="space-y-4">
            {REGIONAL_DISTRIBUTION.map((item) => (
              <div key={item.region} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-forest">{item.region}</span>
                  <span className="font-mono text-stone-600">
                    {item.orders} orders{' '}
                    <strong className="text-forest">({item.percentage}%)</strong>
                  </span>
                </div>

                <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className="h-full bg-gold rounded-full transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
