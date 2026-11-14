/*
  Navbar — Primary Site Navigation
  ===================================
  Features:
  - Authentic AUREATE brand logo (01_Aureate_Logo_HD.jpg)
  - Desktop nav links (Home, Shop, Our Story, Contact)
  - Cart indicator with dynamic badge count from useCart()
  - Full-screen mobile navigation drawer
  - Clean backdrop blur on scroll
*/

import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, LayoutDashboard } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import aureateLogo from '@/assets/brand/01_Aureate_Logo_HD.jpg';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Our Story', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle background elevation on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open & close on Escape key
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        role="banner"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A160E]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-b border-[#1A2E20]'
            : 'bg-[#0A160E] border-b border-[#14261A]'
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-18 md:h-22">
            
            {/* ── Brand Logo (matches exact brand icon in Footer) ── */}
            <Link
              to="/"
              className="flex items-center gap-3 group py-1"
              onClick={closeMobileMenu}
              aria-label="AUREATE Home"
            >
              <img
                src={aureateLogo}
                alt="AUREATE Official Emblem"
                className="h-10 md:h-11 w-auto object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-serif text-2xl md:text-3xl font-medium tracking-[0.08em] text-[#F8F5ED] uppercase group-hover:text-gold transition-colors">
                AUREATE
              </span>
            </Link>

            {/* ── Desktop Navigation Links ── */}
            <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) =>
                    `text-xs lg:text-[13px] uppercase tracking-[0.22em] font-medium transition-all py-2 ${
                      isActive
                        ? 'text-gold font-semibold border-b-2 border-gold pb-1 drop-shadow-xs'
                        : 'text-stone-300 hover:text-gold'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* ── Right Actions: Admin Access, Cart & Mobile Hamburger ── */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Subtle Admin Dashboard Access (Desktop) */}
              <Link
                to="/admin"
                className="hidden sm:flex min-w-[40px] min-h-[40px] items-center justify-center text-stone-300 hover:text-gold transition-colors rounded-full hover:bg-white/5"
                title="Admin Operations Dashboard (Demo Preview)"
                aria-label="Admin Operations Dashboard"
              >
                <LayoutDashboard size={20} />
              </Link>

              <Link
                to="/cart"
                className="relative min-w-[44px] min-h-[44px] flex items-center justify-center text-[#F8F5ED] hover:text-gold transition-colors rounded-full hover:bg-white/5"
                aria-label={`Shopping bag with ${totalItems} items`}
              >
                <ShoppingBag size={21} />
                {totalItems > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-gold text-[#0A160E] text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs font-mono">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              <button
                className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[#F8F5ED] hover:text-gold rounded-lg cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile Navigation Drawer ── */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 md:hidden"
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <nav
            aria-label="Mobile Navigation Links"
            className="absolute top-0 right-0 h-full w-80 bg-[#0A160E] border-l border-[#1A2E20] shadow-2xl flex flex-col pt-8 pb-8 px-8 text-ivory"
          >
            <div className="flex items-center justify-between pb-6 border-b border-[#1A2E20] mb-8">
              <div className="flex items-center gap-2.5">
                <img
                  src={aureateLogo}
                  alt="AUREATE Official Emblem"
                  className="h-8 w-auto object-contain rounded-md"
                />
                <span className="font-serif text-2xl font-medium text-[#F8F5ED] tracking-wider uppercase">
                  AUREATE
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-300 hover:text-gold rounded-lg cursor-pointer"
                aria-label="Close navigation"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `font-serif text-2xl transition-colors py-1 ${
                      isActive ? 'text-gold font-semibold' : 'text-stone-300 hover:text-gold'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <NavLink
                to="/cart"
                onClick={closeMobileMenu}
                className="font-serif text-2xl text-stone-300 hover:text-gold transition-colors py-1 flex items-center justify-between"
              >
                <span>Shopping Bag</span>
                {totalItems > 0 && (
                  <span className="text-xs bg-gold text-[#0A160E] px-2.5 py-0.5 rounded-full font-mono font-bold">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            </div>

            <div className="mt-auto pt-6 border-t border-[#1A2E20]">
              <Link
                to="/admin"
                onClick={closeMobileMenu}
                className="text-xs text-stone-400 hover:text-gold transition-colors py-2 flex items-center justify-between font-mono"
              >
                <span className="flex items-center gap-2">
                  <LayoutDashboard size={14} className="text-gold" />
                  <span>Admin Operations</span>
                </span>
                <span>&rarr;</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
