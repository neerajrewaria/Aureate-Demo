/*
  PhilosophySection — The AUREATE Philosophy
  ==========================================
  Editorial brand introduction presenting AUREATE's approach to everyday wellness.
  
  Features:
  - Clean, uncrowded editorial layout
  - Authentic product collection photography
  - Concise copy focused on thoughtful formulation and transparency
  - Zero unverified medical or historical claims
*/

import SectionHeading from '@/components/common/SectionHeading';
import referenceImg from '@/assets/brand/06_Original_Product_Reference.jpg';

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-16 md:py-24 bg-ivory border-b border-stone-200">
      <div className="container-site">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Left Column: Clean Editorial Photo ── */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-card border-4 border-white bg-stone-100">
              <img
                src={referenceImg}
                alt="AUREATE product collection displayed on natural stone plinth"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          {/* ── Right Column: The Aureate Philosophy ── */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            
            <span className="text-xs font-mono uppercase tracking-widest text-stone-600 font-semibold mb-3 block">
              The AUREATE Philosophy
            </span>

            <SectionHeading
              title="Wellness, Made Thoughtful."
              subtitle="We believe daily wellness should be clear, grounded in natural botanicals, and created with quiet consideration."
            />

            <div className="space-y-4 text-stone-600 text-sm md:text-base leading-relaxed mb-8">
              <p>
                In a wellness landscape filled with confusing ingredient lists and exaggerated promises, 
                Aureate offers a more measured path. We formulate essentials that are straightforward to 
                understand and effortless to integrate into your daily routine.
              </p>
              <p>
                From whole-plant superfood greens to bio-compatible minerals and concentrated lipids, each 
                product is selected for its proven role in everyday equilibrium.
              </p>
            </div>

            {/* Three Clean Core Tenets with Spacious Padding */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 border-t border-stone-200/80">
              <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs">
                <p className="font-serif text-forest text-lg font-medium mb-1.5">Clarity</p>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
                  Transparent ingredients without unnecessary additives or proprietary shields.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs">
                <p className="font-serif text-forest text-lg font-medium mb-1.5">Simplicity</p>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
                  Considered essentials for sustainable daily morning and evening habits.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs">
                <p className="font-serif text-forest text-lg font-medium mb-1.5">Respect</p>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
                  Carefully sourced botanicals housed in protective recyclable packaging.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
