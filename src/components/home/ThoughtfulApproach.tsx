/*
  ThoughtfulApproach — Editorial Brand Pillar Section
  ===================================================
  Replaces testimonials with an authentic, verified brand statement
  and three visual principles. Completely free of fictional reviews.
*/

import SectionHeading from '@/components/common/SectionHeading';
import { Compass, Feather, Leaf } from 'lucide-react';

const PRINCIPLES = [
  {
    title: 'Purposeful Ingredients',
    description:
      'Every mineral, lipid, and whole botanical in our catalogue serves a clear, defined role in supporting your everyday vitality.',
    icon: Leaf,
  },
  {
    title: 'Natural Harmony',
    description:
      'Formulations composed to respect and complement your body’s natural daily rhythms, morning and evening.',
    icon: Compass,
  },
  {
    title: 'Elevated Simplicity',
    description:
      'Eliminating unnecessary complexity, exaggerated claims, and artificial additives in favor of quiet, consistent quality.',
    icon: Feather,
  },
];

export default function ThoughtfulApproach() {
  return (
    <section className="py-16 md:py-24 bg-ivory border-b border-stone-200">
      <div className="container-site">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <SectionHeading
            title="A More Thoughtful Approach to Wellness"
            subtitle="True vitality comes from consistency, not complexity. We create foundational formulations that fit naturally into your everyday rhythms."
            centered
          />
        </div>

        {/* 3 Visual Principle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRINCIPLES.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-soft text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-forest/5 text-forest flex items-center justify-center mb-5">
                <Icon size={22} className="text-forest" />
              </div>

              <h3 className="font-serif text-2xl text-forest font-medium mb-3">
                {title}
              </h3>

              <p className="text-stone-500 text-sm leading-relaxed max-w-sm">
                {description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
