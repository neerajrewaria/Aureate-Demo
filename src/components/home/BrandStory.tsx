/*
  BrandStory — Editorial Brand Story Preview
  ==============================================
  Presents the AUREATE mission with authentic brand collection photography.
  Concise, credible copy with zero unverified claims or development notes.
*/

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import collectionImg from '@/assets/brand/05_Product_Family_Collection.jpg';

export default function BrandStory() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="container-site">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* ── Left Column: Editorial Copy ── */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-[11px] uppercase tracking-[0.24em] text-gold font-mono font-medium mb-3 block">
              The Aureate Perspective
            </span>

            <SectionHeading
              title="A Considered Approach to Modern Vitality"
              subtitle="Born from the conviction that daily wellness should be straightforward, grounded in natural botanicals, and thoughtfully presented."
            />

            <div className="space-y-4 text-stone-600 text-sm md:text-base leading-relaxed mb-8 font-light">
              <p>
                In a market filled with synthetic formulations and excessive promises, Aureate returns 
                to clarity. We focus on foundational formulations—essential minerals, purified lipids, and 
                concentrated whole-plant greens—designed to integrate seamlessly into daily routines.
              </p>
              <p>
                Every product is designed with quiet restraint, utilizing quality packaging that honors 
                both the formulation inside and the space it occupies in your everyday environment.
              </p>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2.5 bg-forest hover:bg-forest-dark text-ivory px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-soft hover:-translate-y-0.5 group"
            >
              <span>Our Story &amp; Values</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* ── Right Column: Authentic Product Family Visual ── */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-stone-200/90 bg-[#FAF8F5] p-3 sm:p-4">
              <img
                src={collectionImg}
                alt="AUREATE complete product family collection in editorial presentation"
                className="w-full h-full object-cover object-center rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
