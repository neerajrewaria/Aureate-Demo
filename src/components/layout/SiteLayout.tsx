/*
  SiteLayout — Customer-Facing Layout
  ======================================
  Wraps all customer-facing pages with the shared Navbar and Footer.

  React Router's <Outlet /> is where the current page renders.
  So the structure is: Navbar → page content → Footer.
*/

import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';

export default function SiteLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Accessible skip to main content link for keyboard and screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-forest focus:text-ivory focus:rounded-xl focus:shadow-lifted focus:outline-gold focus:font-medium focus:text-sm"
      >
        Skip to main content
      </a>

      {/* Top announcement strip */}
      <AnnouncementBar />

      {/* Primary navigation */}
      <Navbar />

      {/* Page content fills remaining height */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
