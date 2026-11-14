/*
  HeroSection — Premium 3-Slide Campaign Carousel
  =================================================
  A calm, sophisticated editorial campaign carousel for AUREATE.

  Features:
  - 3 Campaign slides in exact order:
    1. Complete AUREATE Collection
    2. Daily Wellness Greens
    3. Lifestyle Campaign
  - Responsive picture sources (Desktop, Laptop, Tablet, Mobile)
  - Curved capsule navigation buttons (left/right)
  - Bottom indicator pills with Play/Pause control
  - Friendly, beginner-readable code structure
*/

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

// ── Authentically mapped responsive campaign imagery ──
import collectionDesktop from '@/assets/hero/responsive/collection_desktop_v2.png';
import collectionLaptop from '@/assets/hero/responsive/collection_laptop_v2.jpg';
import collectionTablet from '@/assets/hero/responsive/collection_tablet_v2.jpg';
import collectionMobile from '@/assets/hero/responsive/collection_mobile.jpg';

import greensDesktop from '@/assets/hero/responsive/greens_desktop.jpg';
import greensLaptop from '@/assets/hero/responsive/greens_laptop.png';
import greensTablet from '@/assets/hero/responsive/greens_tablet.png';
import greensMobile from '@/assets/hero/responsive/greens_mobile.jpg';

import lifestyleDesktop from '@/assets/hero/responsive/lifestyle_desktop.png';
import lifestyleLaptop from '@/assets/hero/responsive/lifestyle_laptop.jpg';
import lifestyleTablet from '@/assets/hero/responsive/lifestyle_tablet.jpg';
import lifestyleMobile from '@/assets/hero/responsive/lifestyle_mobile.jpg';

// ─────────────────────────────────────────────────────────────────
// SLIDER SPEED CONFIGURATION
// You can easily adjust this number to change how long each slide stays:
// e.g. 7 = 7 seconds, 8 = 8 seconds.
// ─────────────────────────────────────────────────────────────────
const SLIDE_DURATION_SECONDS = 12; // Generous, relaxed showcase pace (12 seconds per slide — plenty of time to view & read)

// ── 3 Campaign Slides Data ──
// objectPositionClasses: Tailwind responsive classes for object-position per breakpoint.
// This is more reliable than JS-based isDesktop checks because CSS media queries
// always apply instantly without waiting for JS to run.
const CAMPAIGN_SLIDES = [
  {
    id: 'complete-collection',
    eyebrow: 'THE COMPLETE SYSTEM',
    headline: 'Wellness, Thoughtfully Brought Together.',
    supportingText:
      'Discover the AUREATE collection, thoughtfully curated for your everyday wellness routine.',
    ctaText: 'Explore the Collection',
    ctaPath: '/products',
    images: {
      desktop: collectionDesktop,
      laptop: collectionLaptop,
      tablet: collectionTablet,
      mobile: collectionMobile,
    },
    alt: 'Complete AUREATE collection featuring Magnesium Complex, Omega-3, and Daily Wellness Greens',
    baseBg: '#0C2B27',
    // Mobile: center crop; Tablet, Laptop & Desktop: cleanly right-aligned showcasing full product suite
    objectPositionClasses:
      '[object-position:center_35%] md:[object-position:right_center] lg:[object-position:right_center] xl:[object-position:right_center] 2xl:[object-position:right_center]',
  },
  {
    id: 'daily-wellness-greens',
    eyebrow: 'THE BOTANICAL ATELIER',
    headline: 'Make Every Day a Little Greener.',
    supportingText:
      'Bring a thoughtful greens ritual into your everyday routine with AUREATE Daily Wellness Greens.',
    ctaText: 'Explore Daily Greens',
    ctaPath: '/products/daily-wellness-greens',
    images: {
      desktop: greensDesktop,
      laptop: greensLaptop,
      tablet: greensTablet,
      mobile: greensMobile,
    },
    alt: 'AUREATE Daily Wellness Greens blend box, single-serve sachet, and fresh matcha bowl on rustic stone',
    baseBg: '#08140D',
    objectPositionClasses:
      '[object-position:center_center] md:[object-position:70%_center] lg:[object-position:75%_center] xl:[object-position:right_center] 2xl:[object-position:right_center]',
  },
  {
    id: 'everyday-lifestyle',
    eyebrow: 'LIFESTYLE & RITUAL',
    headline: 'Move Through Life With Intention.',
    supportingText:
      'Make space for the little rituals that help you feel more connected to your everyday wellbeing.',
    ctaText: 'Discover AUREATE',
    ctaPath: '/about',
    images: {
      desktop: lifestyleDesktop,
      laptop: lifestyleLaptop,
      tablet: lifestyleTablet,
      mobile: lifestyleMobile,
    },
    alt: 'Woman jogging mindfully along a tree-lined road in morning light',
    baseBg: '#0A160F',
    objectPositionClasses:
      '[object-position:center_20%] md:[object-position:center_20%] lg:[object-position:center_20%] xl:[object-position:center_20%] 2xl:[object-position:center_20%]',
  },
];

export default function HeroSection() {
  // Current active slide index (0 = Collection, 1 = Greens, 2 = Lifestyle)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Pause / Resume state for the automatic slideshow
  const [isPaused, setIsPaused] = useState(false);

  // Accessibility: user preferred reduced motion
  const shouldReduceMotion = useReducedMotion();

  // Total slides count (3)
  const totalSlides = CAMPAIGN_SLIDES.length;
  const currentSlide = CAMPAIGN_SLIDES[currentIndex];

  // Helper functions to move slides
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // ─────────────────────────────────────────────────────────────────
  // SIMPLE & FRIENDLY AUTOPLAY TIMER:
  // Every time currentIndex changes, this timer starts.
  // After SLIDE_DURATION_SECONDS (7 seconds), it moves to the next slide.
  // If the user clicks Next or Previous, the old timer clears and
  // the 7-second countdown starts fresh for the new slide!
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      nextSlide();
    }, SLIDE_DURATION_SECONDS * 1000);

    // Cleanup timer if slide changes or user pauses
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, nextSlide]);

  // Keyboard navigation (Left / Right arrow keys)
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  }

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      nextSlide(); // Swiped left -> next slide
    } else if (diff < -45) {
      prevSlide(); // Swiped right -> previous slide
    }
    touchStartX.current = null;
  }

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="AUREATE Campaign Carousel"
      aria-live="polite"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ backgroundColor: currentSlide.baseBg }}
      className="relative w-full max-w-full overflow-hidden transition-colors duration-700 outline-none select-none border-b border-[#050C07]"
    >
      {/* ── Stable container to prevent layout shift ── */}
      <div className="relative w-full h-[580px] sm:h-[620px] md:h-[640px] lg:h-[520px] xl:h-[580px] 2xl:h-[640px] flex flex-col justify-end lg:block overflow-hidden">

        {/* Smooth Crossfade between slides */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${currentSlide.eyebrow} — Slide ${currentIndex + 1} of ${totalSlides}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 w-full h-full flex flex-col justify-end lg:block"
          >
            {/* Full-Bleed Campaign Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <picture className="w-full h-full block">
                {/* 1. Desktop & 4K (>=1536px) */}
                <source media="(min-width: 1536px)" srcSet={currentSlide.images.desktop} />
                {/* 2. Laptop (1024px - 1535px) */}
                <source media="(min-width: 1024px)" srcSet={currentSlide.images.laptop} />
                {/* 3. Tablet (768px - 1023px) */}
                <source media="(min-width: 768px)" srcSet={currentSlide.images.tablet} />
                {/* 4. Mobile (<768px) Fallback — object-position applied via Tailwind responsive classes */}
                <img
                  src={currentSlide.images.mobile}
                  alt={currentSlide.alt}
                  className={`w-full h-full object-cover ${currentSlide.objectPositionClasses}`}
                />
              </picture>

              {/* Desktop Left Scrim: gentle gradient protecting text readability */}
              <div
                className="hidden lg:block absolute inset-y-0 left-0 w-[40vw] max-w-lg pointer-events-none"
                style={{
                  background: `linear-gradient(to right, ${currentSlide.baseBg} 25%, ${currentSlide.baseBg}80 55%, transparent 100%)`,
                }}
                aria-hidden="true"
              />

              {/* Mobile / Tablet Bottom Scrim */}
              <div
                className="lg:hidden absolute inset-x-0 bottom-0 h-3/5 pointer-events-none"
                style={{
                  background: `linear-gradient(to top, ${currentSlide.baseBg} 50%, ${currentSlide.baseBg}90 75%, transparent 100%)`,
                }}
                aria-hidden="true"
              />
            </div>

            {/* Editorial Content Column */}
            <div className="relative z-10 flex flex-col justify-center px-6 pb-20 sm:px-10 sm:pb-24 lg:px-12 lg:h-full lg:py-0 max-w-7xl mx-auto w-full">
              <div className="w-full max-w-xs sm:max-w-sm lg:max-w-[340px] xl:max-w-[420px] text-left">

                {/* Eyebrow Label */}
                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="inline-flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3.5 lg:mb-5"
                >
                  <span className="h-px w-4 sm:w-6 bg-gold/70" aria-hidden="true" />
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-gold font-medium">
                    {currentSlide.eyebrow}
                  </span>
                  <span className="h-px w-4 sm:w-6 bg-gold/70" aria-hidden="true" />
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.18 }}
                  className="font-serif text-[24px] sm:text-[32px] md:text-[36px] lg:text-[38px] xl:text-[48px] leading-[1.12] lg:leading-[1.1] text-[#FAF8F5] font-normal tracking-tight mb-2.5 sm:mb-4 lg:mb-5 break-words"
                >
                  {currentSlide.headline}
                </motion.h1>

                {/* Supporting Description */}
                <motion.p
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.26 }}
                  className="text-stone-300 text-xs sm:text-sm md:text-base lg:text-[15px] font-light leading-relaxed mb-4 sm:mb-6 lg:mb-8 max-w-xs lg:max-w-[380px]"
                >
                  {currentSlide.supportingText}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.34 }}
                >
                  <Link
                    to={currentSlide.ctaPath}
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gold hover:bg-[#C5AA70] text-[#0A160E] font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(182,154,98,0.32)] hover:shadow-[0_8px_28px_rgba(182,154,98,0.48)] hover:scale-[1.02] active:scale-[0.99] group cursor-pointer w-full sm:w-auto"
                  >
                    <span>{currentSlide.ctaText}</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>

              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* ── AG1-Inspired Curved Capsule Navigation ── */}
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous campaign slide"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-7 sm:w-9 md:w-11 h-14 sm:h-18 md:h-22 rounded-r-full rounded-l-none bg-[#F8F5ED] hover:bg-gold text-[#0A160E] flex items-center justify-start pl-1 sm:pl-2 md:pl-2.5 transition-all duration-300 ease-out cursor-pointer shadow-[2px_4px_16px_rgba(0,0,0,0.35)] hover:shadow-[3px_6px_24px_rgba(182,154,98,0.5)] group active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <ChevronLeft
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-200 group-hover:-translate-x-0.5 text-[#0A160E]"
            strokeWidth={2.4}
          />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next campaign slide"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-7 sm:w-9 md:w-11 h-14 sm:h-18 md:h-22 rounded-l-full rounded-r-none bg-[#F8F5ED] hover:bg-gold text-[#0A160E] flex items-center justify-end pr-1 sm:pr-2 md:pr-2.5 transition-all duration-300 ease-out cursor-pointer shadow-[-2px_4px_16px_rgba(0,0,0,0.35)] hover:shadow-[-3px_6px_24px_rgba(182,154,98,0.5)] group active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <ChevronRight
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-200 group-hover:translate-x-0.5 text-[#0A160E]"
            strokeWidth={2.4}
          />
        </button>

        {/* ── Bottom Carousel Status Bar (Pagination & Pause/Play) ── */}
        <div className="absolute bottom-3 sm:bottom-5 lg:bottom-8 inset-x-0 z-20 pointer-events-none px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-start">
          <div
            className="flex items-center gap-2 sm:gap-2.5 pointer-events-auto bg-black/45 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 shadow-lg"
            role="tablist"
            aria-label="Carousel pagination"
          >
            {CAMPAIGN_SLIDES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  id={`carousel-indicator-${index}`}
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-400 cursor-pointer rounded-full h-2 sm:h-2.5 ${
                    isActive
                      ? 'w-6 sm:w-9 bg-gold shadow-[0_0_10px_rgba(182,154,98,0.6)]'
                      : 'w-2 sm:w-2.5 bg-white/35 hover:bg-white/65'
                  }`}
                />
              );
            })}

            {/* Pause/Play Toggle Button */}
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
              className="ml-1 text-white/55 hover:text-white transition-colors cursor-pointer p-0.5"
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? <Play size={11} /> : <Pause size={11} />}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
