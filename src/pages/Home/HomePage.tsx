/*
  HomePage — AUREATE Main Storefront Experience
  ==============================================
  Assembles all modular sections in the approved sequence:
  1. HeroSection (The Botanical Atelier cinematic canvas)
  2. FeaturedProducts (Core Formulations: Magnesium, Omega-3, Greens)
  3. PhilosophySection ("Wellness, Made Thoughtful.")
  4. BenefitsSection (Four Guided Brand Principles)
  5. WhyChooseUs (Three Core Value Propositions)
  6. BrandStory (Considered Modern Vitality & Collection Photo)
  7. ThoughtfulApproach ("A More Thoughtful Approach to Wellness" - authentic pillars)
  8. NewsletterCTA (Clean subscription simulation with high-contrast text)

  AnnouncementBar, Navbar, and Footer are automatically provided
  by the parent SiteLayout shell.
*/

import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PhilosophySection from '@/components/home/PhilosophySection';
import BenefitsSection from '@/components/home/BenefitsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import BrandStory from '@/components/home/BrandStory';
import ThoughtfulApproach from '@/components/home/ThoughtfulApproach';
import NewsletterCTA from '@/components/home/NewsletterCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Cinematic Hero — The Botanical Atelier */}
      <HeroSection />

      {/* 2. Featured Core Formulations */}
      <FeaturedProducts />

      {/* 3. The Aureate Philosophy */}
      <PhilosophySection />

      {/* 4. Guiding Principles */}
      <BenefitsSection />

      {/* 5. Why Choose Aureate */}
      <WhyChooseUs />

      {/* 6. Editorial Story Preview */}
      <BrandStory />

      {/* 7. Thoughtful Approach (Replaces Testimonials) */}
      <ThoughtfulApproach />

      {/* 8. Newsletter Signup */}
      <NewsletterCTA />
    </div>
  );
}
