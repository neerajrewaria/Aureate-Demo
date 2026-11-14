/*
  WhyChooseUs — Three Core Value Propositions
  ===========================================
  Clearly articulates the AUREATE proposition without unverified claims.
  
  Three Pillars:
  1. Thoughtful Product Selection
  2. Clear Product Information
  3. A Considered Wellness Experience
*/

import { CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

const PILLARS = [
  {
    title: 'Thoughtful Product Selection',
    description:
      'We curate only what adds genuine value to your day—essential minerals, purified fatty acids, and nutrient-dense greens.',
    icon: ShieldCheck,
    tag: 'Considered',
  },
  {
    title: 'Clear Product Information',
    description:
      'We believe you should know exactly what you are consuming. No hidden proprietary blends, no inflated claims, and no confusion.',
    icon: CheckCircle2,
    tag: 'Transparent',
  },
  {
    title: 'A Considered Wellness Experience',
    description:
      'From packaging that protects product integrity to seamless digital discovery, every touchpoint is designed with quiet care.',
    icon: HeartHandshake,
    tag: 'Elevated',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-ivory border-b border-stone-200">
      <div className="container-site">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <SectionHeading
            title="Why Choose Aureate"
            subtitle="Straightforward formulations, transparent ingredient details, and a quiet dedication to quality."
            centered
          />
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map(({ title, description, icon: Icon, tag }) => (
            <div
              key={title}
              className="group bg-white p-8 rounded-2xl border border-stone-200/80 shadow-soft hover:shadow-card hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-forest/5 text-forest group-hover:bg-forest group-hover:text-gold transition-colors duration-300 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-medium text-stone-600 uppercase tracking-wider bg-stone-100 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-forest font-medium mb-3 group-hover:text-forest-dark transition-colors">
                  {title}
                </h3>

                <p className="text-stone-500 text-sm leading-relaxed">
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
