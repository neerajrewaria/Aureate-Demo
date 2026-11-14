/*
  Testimonials — Customer Review Preview
  =======================================
  Displays sample customer testimonials.
  
  IMPORTANT NOTICE:
  These are clearly labeled demonstration testimonials using sample mock data
  from src/data/testimonials.ts. Not real customer reviews.
*/

import { Star, MessageSquare } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { TESTIMONIALS } from '@/data/testimonials';

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-ivory border-b border-stone-200">
      <div className="container-site">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-6">
          <SectionHeading
            title="Voices of Balance"
            subtitle="How considered daily rituals with Aureate touch everyday routines."
            centered
          />
        </div>

        {/* Clear Demonstration Notice Badge */}
        <div className="max-w-xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs">
            <MessageSquare size={14} className="text-amber-600" />
            <span>Demonstration Preview &bull; Fictional placeholder reviews for layout demonstration</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map(({ id, name, location, rating, review, productName }) => (
            <div
              key={id}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft flex flex-col justify-between"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-gold mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                {/* Review excerpt */}
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed mb-4 italic">
                  "{review}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <p className="font-semibold text-forest text-sm">{name}</p>
                <p className="text-stone-400 text-xs">{location}</p>
                <p className="text-sage text-xs font-medium mt-1 truncate">
                  Purchased: {productName}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
