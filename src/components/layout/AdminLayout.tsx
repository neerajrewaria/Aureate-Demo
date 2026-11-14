/*
  AdminLayout — Admin Dashboard Layout
  =======================================
  Wraps all admin pages with:
  - A fixed sidebar with nav links (desktop)
  - A demo notice banner clearly marking this as a preview
  - A top bar with the page title, reset demo data action, and demo label
  - <Outlet /> renders the current admin page

  On mobile, the sidebar collapses to a drawer.
*/

import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Leaf,
  ArrowLeft,
  Menu,
  X,
  RotateCcw,
} from 'lucide-react';
import { resetAllAdminData } from '@/utils/adminStorage';

const ADMIN_NAV_LINKS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products & Stock', href: '/admin/inventory', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export default function AdminLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  // Close mobile sidebar on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isMobileSidebarOpen) {
        setIsMobileSidebarOpen(false);
      }
    }
    if (isMobileSidebarOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileSidebarOpen]);

  function handleResetDemo() {
    if (window.confirm('Reset all demo dashboard data back to initial sample state? Any added or edited products/orders will be restored.')) {
      resetAllAdminData();
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 2500);
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 flex">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-forest text-ivory fixed inset-y-0 left-0 z-30">
        {/* Logo */}
        <div className="p-6 border-b border-stone-700/80">
          <div className="flex items-center gap-2 mb-1.5">
            <Leaf size={18} className="text-gold" />
            <span className="font-serif text-xl text-ivory uppercase tracking-wider font-medium">AUREATE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-gold/90 font-mono uppercase tracking-wider bg-gold/15 px-2 py-0.5 rounded">
              Management Portal
            </span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-4 space-y-1.5" aria-label="Admin Navigation">
          {ADMIN_NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <NavLink
              key={href}
              to={href}
              end={href === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gold/20 text-gold shadow-xs'
                    : 'text-stone-300 hover:bg-stone-700/50 hover:text-ivory'
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Back to site */}
        <div className="p-4 border-t border-stone-700/80">
          <Link
            to="/"
            className="flex items-center gap-2 text-stone-300 hover:text-gold text-xs transition-colors py-2 px-3 rounded-lg hover:bg-stone-800/50"
          >
            <ArrowLeft size={15} />
            <span>Back to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {isMobileSidebarOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Admin Mobile Navigation"
          className="lg:hidden fixed inset-0 z-40 flex"
        >
          <div
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative w-68 bg-forest text-ivory flex flex-col shadow-2xl">
            <div className="p-6 border-b border-stone-700 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Leaf size={18} className="text-gold" />
                  <span className="font-serif text-xl text-ivory uppercase tracking-wider">AUREATE</span>
                </div>
                <span className="text-xs text-gold/90 font-mono">Management Portal</span>
              </div>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-400 hover:text-ivory cursor-pointer"
                aria-label="Close admin menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1.5" aria-label="Admin Mobile Navigation Links">
              {ADMIN_NAV_LINKS.map(({ label, href, icon: Icon }) => (
                <NavLink
                  key={href}
                  to={href}
                  end={href === '/admin'}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-gold/20 text-gold' : 'text-stone-300 hover:bg-stone-700/50 hover:text-ivory'
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
            <div className="p-4 border-t border-stone-700">
              <Link to="/" className="flex items-center gap-2 text-stone-300 hover:text-gold text-xs py-2">
                <ArrowLeft size={16} />
                <span>Back to Storefront</span>
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main Content Area ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="bg-white border-b border-stone-200 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile menu button */}
            <button
              className="lg:hidden min-w-[40px] min-h-[40px] flex items-center justify-center text-stone-600 rounded-lg cursor-pointer hover:bg-stone-100"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open admin menu"
              aria-expanded={isMobileSidebarOpen}
            >
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg sm:text-xl text-forest font-medium">Aureate Operations</span>
              <span className="hidden md:inline-block text-xs font-mono text-stone-400">/ Internal Portal</span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* 1-Click Reset Demo Data Button */}
            <button
              type="button"
              onClick={handleResetDemo}
              title="Reset all simulated products, stock, and orders back to default demonstration values"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border border-stone-200 text-stone-600 hover:text-forest hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <RotateCcw size={13} className={resetConfirm ? 'animate-spin text-emerald-600' : ''} />
              <span className="hidden sm:inline">{resetConfirm ? 'Reset Successful!' : 'Reset Demo Data'}</span>
              <span className="sm:hidden">Reset</span>
            </button>

            {/* Demo notice badge */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-full font-medium">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span>Demo Preview</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
