/*
  Footer — Site Footer
  ======================
  Clean, high-contrast footer for AUREATE.
  
  Refinements:
  - High-contrast typography in warm ivory and stone
  - Authentic AUREATE logo
  - Direct navigation links to formulations and brand pages
  - Removed duplicated newsletter form (handled by NewsletterCTA)
  - Removed unverified contact info, fake phone numbers, and public admin link
  - Packaging mismatch note retained only in internal code comments
*/

import { Link } from 'react-router-dom';
import aureateLogo from '@/assets/brand/01_Aureate_Logo_HD.jpg';

const FORMULATION_LINKS = [
  { label: 'All Formulations', href: '/products' },
  { label: 'Magnesium Complex', href: '/products/magnesium-complex' },
  { label: 'Omega-3', href: '/products/omega-3' },
  { label: 'Daily Wellness Greens', href: '/products/daily-wellness-greens' },
];

const COMPANY_LINKS = [
  { label: 'Our Story', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-ivory border-t border-stone-800">
      
      {/* Main footer content */}
      <div className="container-site py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">

          {/* ── Brand Column (6 cols on md) ── */}
          <div className="md:col-span-6 lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-4 group" aria-label="AUREATE Home">
              <img
                src={aureateLogo}
                alt="AUREATE Official Emblem"
                className="h-10 w-auto object-contain rounded-md"
              />
              <span className="font-serif text-2xl font-medium text-ivory tracking-wider uppercase">
                AUREATE
              </span>
            </Link>

            <p className="text-stone-300 text-sm leading-relaxed max-w-sm mb-4">
              Nature, Thoughtfully Formulated. Essential minerals, purified lipids, and whole-plant
              superfood greens designed for everyday vitality.
            </p>

            <p className="text-stone-300 text-xs">
              Conscious formulation &bull; Transparent ingredients &bull; Recyclable materials
            </p>
          </div>

          {/* ── Formulations Column (3 cols on md) ── */}
          <nav aria-label="Footer Formulations navigation" className="md:col-span-3 lg:col-span-3 lg:pl-6">
            <h3 className="font-serif text-sm text-gold uppercase tracking-wider mb-4 font-semibold">
              Formulations
            </h3>
            <ul className="space-y-2.5">
              {FORMULATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-stone-300 text-sm hover:text-gold transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Company Column (3 cols on md) ── */}
          <nav aria-label="Footer Company navigation" className="md:col-span-3 lg:col-span-4">
            <h3 className="font-serif text-sm text-gold uppercase tracking-wider mb-4 font-semibold">
              Company
            </h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-stone-300 text-sm hover:text-gold transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-stone-800">
              <p className="text-xs text-stone-300 leading-relaxed">
                Formulated and crafted with care. Inquiries: concierge@aureate.com
              </p>
            </div>
          </nav>

        </div>
      </div>

      {/* Bottom bar — Clean, minimal, without public admin demo links */}
      <div className="border-t border-stone-800/80">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-300">
          <p>
            AUREATE &bull; Nature, Thoughtfully Formulated. All rights reserved.
          </p>
          <p className="text-stone-400">
            Frontend Demonstration Experience
          </p>
        </div>
      </div>

    </footer>
  );
}
