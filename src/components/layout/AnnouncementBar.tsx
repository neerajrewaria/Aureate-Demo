/*
  AnnouncementBar — Rotating Brand Notification Strip
  ===================================================
  Cycles through 3 key brand commitments with smooth transitions:
  1. Free Shipping over ₹999 (Crimson Red)
  2. Pan-India Delivery across 19,000+ PIN codes (Deep Forest Green)
  3. 100% Third-Party Lab Tested & Purity Guaranteed (Warm Amber Gold)
  
  Warm ivory background (#F8F5ED) with bold typography and zero layout shift.
*/

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ANNOUNCEMENTS = [
  {
    id: 'shipping',
    shortText: 'Complimentary shipping over ₹999',
    fullText: 'Complimentary shipping on orders over ₹999',
    subText: 'Thoughtfully packaged in recyclable materials',
    color: '#C92A2A', // Bold Crimson Red
    bulletColor: '#E03131',
  },
  {
    id: 'pan-india',
    shortText: 'Express delivery across India • All 19,000+ PIN codes',
    fullText: 'Express delivery across India',
    subText: 'Delivering to 19,000+ PIN codes with live tracking',
    color: '#166534', // Deep Forest Green
    bulletColor: '#22C55E',
  },
  {
    id: 'lab-tested',
    shortText: '100% lab tested • Certified purity & zero fillers',
    fullText: '100% third-party lab tested',
    subText: 'GMP certified purity with zero artificial fillers',
    color: '#9A6B1F', // Warm Burnished Gold
    bulletColor: '#CA8A04',
  },
];

const ROTATION_INTERVAL_MS = 4000; // 4 seconds per announcement

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <aside
      role="region"
      aria-label="Store announcement"
      className="w-full bg-[#F8F5ED] text-center h-8 sm:h-9 flex items-center justify-center px-3 sm:px-4 m-0 border-b border-[#E8E2D5] overflow-hidden select-none relative"
    >
      <AnimatePresence initial={false}>
        <motion.p
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ color: current.color }}
          className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs tracking-[0.16em] uppercase font-mono font-bold px-4"
        >
          {/* Mobile Text */}
          <span className="sm:hidden">{current.shortText}</span>

          {/* Desktop & Tablet Text */}
          <span className="hidden sm:inline">
            <span>{current.fullText}</span>
            <span style={{ color: current.bulletColor }} className="mx-2 sm:mx-2.5 font-bold">
              &bull;
            </span>
            <span className="font-bold">{current.subText}</span>
          </span>
        </motion.p>
      </AnimatePresence>
    </aside>
  );
}
