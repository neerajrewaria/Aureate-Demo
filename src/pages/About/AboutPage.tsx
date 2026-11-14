/*
  AboutPage — The AUREATE Story & Brand Philosophy
  ==================================================
  An editorial luxury storytelling page presenting the founding vision,
  principles, and botanical craft behind AUREATE.

  Spacing & Hierarchy:
  - Generous section padding (py-20 to py-32) with luxury breathing room
  - Spacious pillar cards (p-7 to p-9) with clear visual hierarchy
  - Formulations showcase with airy p-6/p-7 cards
  - Authentic supplied master collection photography in museum-grade frames
  - Responsive stacking with full touch accessibility
*/

import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Feather, Check } from 'lucide-react';

// Authentic brand photography assets
import familyCollectionImg from '@/assets/brand/05_Product_Family_Collection.jpg';
import originalReferenceImg from '@/assets/brand/06_Original_Product_Reference.jpg';

const BRAND_PILLARS = [
  {
    number: '01',
    icon: Leaf,
    title: 'Botanical Integrity',
    description:
      'We prioritize whole, clean botanical sources and bioavailable mineral forms that work in natural synergy with your daily biological rhythm.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    title: 'Uncompromising Transparency',
    description:
      'Every ingredient is selected with clear purpose and fully disclosed. We believe you deserve complete honesty about what you introduce into your body.',
  },
  {
    number: '03',
    icon: Feather,
    title: 'Elevated Simplicity',
    description:
      'Wellness should never feel complicated or overwhelming. Our portfolio is intentionally restrained to three foundational daily formulations.',
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'Synergistic Formulations',
    description:
      'Rooted in centuries of herbal heritage and guided by modern nutritional science, each formulation provides gentle, dependable daily support.',
  },
];

const ATELIER_FORMULATIONS = [
  {
    kicker: 'Morning Foundation',
    title: 'Daily Wellness Greens',
    detail: 'Alkalizing cereal grasses, spirulina, and chlorella harvested at peak nutrient density for vital morning nourishment and cellular energy.',
  },
  {
    kicker: 'Midday Vitality',
    title: 'Purified Marine Omega-3',
    detail: 'Balanced EPA and DHA fatty acids in concentrated softgels to nourish cognitive focus, joint comfort, and cardiovascular health.',
  },
  {
    kicker: 'Evening Calm',
    title: 'Bioavailable Magnesium Complex',
    detail: 'Chelated glycinate and malate forms chosen specifically for digestive tolerance and calm, restorative evening neuromuscular relaxation.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] text-forest min-h-screen">
      
      {/* ── 1. EDITORIAL ATELIER HERO (SPACIOUS & EXPANSIVE) ── */}
      <section className="relative overflow-hidden bg-[#0D1C12] text-ivory py-24 sm:py-28 md:py-32 border-b border-[#08120B]">
        {/* Deep Studio Background Gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 1100px 600px at 50% 40%, rgba(26, 49, 34, 0.95) 0%, rgba(13, 28, 18, 0.98) 60%, rgba(6, 14, 9, 1) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Champagne Gold Ambient Spotlight */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] rounded-full blur-[140px] pointer-events-none opacity-35"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(197, 160, 89, 0.32) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="container-site relative z-10 text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold/70" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs text-gold tracking-[0.26em] uppercase font-medium">
              Origins &amp; Philosophy
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold/70" aria-hidden="true" />
          </div>

          {/* Master Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-normal leading-[1.08] tracking-tight mb-5 drop-shadow-sm">
            <span style={{ color: '#F8F5ED' }}>Nature, Thoughtfully</span>
            <br />
            <span className="italic text-gold">Formulated.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-xl mx-auto">
            AUREATE was founded on a simple conviction: that daily wellness should be purposeful, honest, and in quiet harmony with the natural world.
          </p>
        </div>
      </section>

      {/* ── 2. THE NARRATIVE (SPACIOUS 2-COLUMN STORY & PHOTOGRAPHY) ── */}
      <section className="py-20 sm:py-24 md:py-32">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
            
            {/* Left Story Text (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-7">
              
              <div>
                <span className="text-[11px] uppercase tracking-[0.24em] text-gold font-mono font-medium block mb-2.5">
                  The Aureate Vision
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-forest font-medium leading-[1.15]">
                  A Quieter, More Considered Approach to Modern Vitality
                </h2>
              </div>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
                In an era filled with cluttered supplement shelves, endless proprietary blends, and aggressive marketing claims, we observed an essential human need for simplicity. Most wellness routines either felt cold and medicinal, or overly intricate and difficult to maintain.
              </p>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
                AUREATE brings together traditional botanical wisdom and contemporary nutritional understanding. We curate essential minerals, concentrated marine lipids, and dense superfood greens that form the grounded foundation of everyday well-being.
              </p>

              {/* Spacious Editorial Blockquote Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border-l-4 border-gold border border-stone-200/80 shadow-xs my-2">
                <blockquote className="italic text-forest/90 text-base sm:text-lg font-serif leading-relaxed">
                  &ldquo;We do not seek to invent complexity. We seek to present nature with reverence, restraint, and uncompromising quality.&rdquo;
                </blockquote>
                <span className="block text-[11px] font-mono text-gold uppercase tracking-widest mt-2">
                  &mdash; The Aureate Atelier Creed
                </span>
              </div>

            </div>

            {/* Right Master Photographic Stage (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-white p-4 sm:p-5 border border-stone-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                <img
                  src={familyCollectionImg}
                  alt="AUREATE botanical product family collection in studio exhibition"
                  className="w-full h-auto rounded-2xl object-cover"
                />
                <div className="text-center pt-4 pb-1">
                  <span className="text-[11px] text-stone-400 font-mono tracking-wider uppercase block">
                    The Aureate Collection &bull; Studio Exhibition
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. FOUR FOUNDATIONAL PILLARS (P-8 TO P-10 CARDS) ── */}
      <section className="py-20 sm:py-24 md:py-32 bg-white border-y border-stone-200/80">
        <div className="container-site">
          
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
            <span className="text-[11px] uppercase tracking-[0.24em] text-gold font-mono font-medium block mb-2.5">
              Our Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-forest font-medium">
              Standards That Guide Every Formulation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8">
            {BRAND_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="bg-[#FAF8F5] p-7 sm:p-8 rounded-3xl border border-stone-200/80 flex flex-col items-start hover:border-gold/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-soft"
                >
                  {/* Top Row: Number & Icon */}
                  <div className="w-full flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-forest/5 text-forest flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-xs text-gold font-semibold tracking-widest">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-[22px] text-forest font-medium mb-3 leading-snug">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light flex-1">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 4. THE FORMULATION ATELIER & SOURCING ── */}
      <section className="py-20 sm:py-24 md:py-32">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
            
            {/* Left Photographic Window (5 cols) */}
            <div className="lg:col-span-5 order-last lg:order-first">
              <div className="relative rounded-3xl overflow-hidden bg-white p-4 sm:p-5 border border-stone-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                <img
                  src={originalReferenceImg}
                  alt="AUREATE botanical formulation ingredients reference"
                  className="w-full h-auto rounded-2xl object-cover"
                />
                <div className="text-center pt-4 pb-1">
                  <span className="text-[11px] text-stone-400 font-mono tracking-wider uppercase block">
                    Authentic Formulation Reference
                  </span>
                </div>
              </div>
            </div>

            {/* Right Atelier Details (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-7">
              
              <div>
                <span className="text-[11px] uppercase tracking-[0.24em] text-gold font-mono font-medium block mb-2.5">
                  The Atelier Standard
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-forest font-medium leading-[1.15]">
                  Formulated Without Compromise or Distraction
                </h2>
              </div>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
                Each product begins with an intentional nutritional purpose. We eliminate artificial binders, synthetic food coloring, and unnecessary additives. What remains is honest, bioavailable nutrition crafted for daily equilibrium.
              </p>

              {/* Formulation Triad Cards with generous padding */}
              <div className="space-y-4 pt-1">
                {ATELIER_FORMULATIONS.map((formulation, i) => (
                  <div
                    key={i}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex items-start gap-4 hover:border-gold/50 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-forest/5 text-gold flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} className="stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gold font-medium block mb-0.5">
                        {formulation.kicker}
                      </span>
                      <h4 className="font-serif text-lg font-medium text-forest mb-1">
                        {formulation.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
                        {formulation.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── 5. CINEMATIC CLOSING INVITATION CTA ── */}
      <section className="relative overflow-hidden bg-[#0D1C12] text-ivory py-20 sm:py-24 md:py-28 border-t border-[#08120B]">
        {/* Central Ambient Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[130px] pointer-events-none opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(197, 160, 89, 0.3) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="container-site relative z-10 text-center max-w-2xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-3.5">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-gold/70" aria-hidden="true" />
            <span className="font-mono text-[11px] text-gold tracking-[0.24em] uppercase font-medium">
              The Journey Begins
            </span>
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-gold/70" aria-hidden="true" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-medium mb-4" style={{ color: '#F8F5ED' }}>
            Experience The Aureate Formulations
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light mb-9 max-w-lg mx-auto">
            Discover our initial portfolio of essential botanical nutraceuticals designed to accompany your everyday routine.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 bg-gold hover:bg-gold-light text-[#0A140D] px-9 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-[0_6px_22px_rgba(197,160,89,0.32)] hover:shadow-[0_10px_30px_rgba(197,160,89,0.45)] hover:-translate-y-0.5 cursor-pointer group"
          >
            <span>Explore The Formulations</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  );
}
