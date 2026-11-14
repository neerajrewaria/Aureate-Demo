/*
  BenefitsSection — Four Brand Principles
  =========================================
  Highlights AUREATE's core brand principles on a rich evergreen backdrop.
  High-contrast typography, balanced card heights, and neutral descriptive copy.
*/

import { CheckCircle2, FileText, Package, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

const PRINCIPLES = [
  {
    title: 'Thoughtful Product Selection',
    description:
      'We focus on foundational formulations that address genuine everyday needs, rather than chasing fleeting wellness trends.',
    icon: Sparkles,
  },
  {
    title: 'Clear Product Information',
    description:
      'Ingredient decks and product attributes are presented with complete transparency, without confusing jargon or exaggerated claims.',
    icon: FileText,
  },
  {
    title: 'Considered Product Presentation',
    description:
      'Every product is packaged to maintain freshness, protect against light degradation, and offer an elevated presence in your home.',
    icon: Package,
  },
  {
    title: 'Everyday Wellness',
    description:
      'Designed to fit seamlessly into real daily lives, supporting sustained personal vitality and balanced morning and evening rituals.',
    icon: CheckCircle2,
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#122216] text-ivory border-b border-[#08120B]">
      <div className="container-site">
        
        {/* Section Header with High Contrast */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <SectionHeading
            title="Principles That Guide Us"
            subtitle="A transparent commitment to straightforward formulations, honest presentation, and considered daily living."
            centered
            light
          />
        </div>

        {/* 4 Cards Grid with Spacious Padding and Gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PRINCIPLES.map(({ title, description, icon: Icon }, index) => (
            <div
              key={title}
              className="bg-[#0E1A11]/90 border border-stone-600/60 p-7 sm:p-8 rounded-3xl flex flex-col justify-between hover:border-gold/60 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            >
              <div>
                {/* Icon & Index Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <span className="text-xs font-mono text-gold/80 tracking-widest uppercase">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-ivory mb-3 leading-snug">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
