/*
  AUREATE — Application Router
  ================================
  Defines all routes for the application.

  Route-level code splitting: each page is loaded lazily using React.lazy()
  so the browser only downloads the code for the current page.
  React.Suspense shows a simple loading state during route transitions.

  Route structure:
  - Customer-facing routes use the main SiteLayout (Navbar + Footer)
  - Admin routes use a separate AdminLayout (Sidebar + TopBar)
  - /checkout is intentionally outside the main layout for focus
*/

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import SiteLayout from '@/components/layout/SiteLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import PageLoader from '@/components/common/PageLoader';

// Customer-facing pages — lazily loaded
const HomePage     = lazy(() => import('@/pages/Home/HomePage'));
const ProductsPage = lazy(() => import('@/pages/Products/ProductsPage'));
const ProductDetailPage = lazy(() => import('@/pages/Products/ProductDetailPage'));
const AboutPage    = lazy(() => import('@/pages/About/AboutPage'));
const ContactPage  = lazy(() => import('@/pages/Contact/ContactPage'));
const CartPage     = lazy(() => import('@/pages/Cart/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/Checkout/CheckoutPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFoundPage'));

// Admin pages — lazily loaded
const AdminDashboard  = lazy(() => import('@/pages/Admin/AdminDashboard'));
const AdminInventory  = lazy(() => import('@/pages/Admin/AdminInventory'));
const AdminOrders     = lazy(() => import('@/pages/Admin/AdminOrders'));
const AdminCustomers  = lazy(() => import('@/pages/Admin/AdminCustomers'));
const AdminAnalytics  = lazy(() => import('@/pages/Admin/AdminAnalytics'));

export default function AppRouter() {
  return (
    // Suspense wraps all routes — PageLoader shows while a page chunk loads
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* ── Customer-facing site (Navbar + Footer layout) ── */}
        <Route element={<SiteLayout />}>
          <Route path="/"           element={<HomePage />} />
          <Route path="/products"   element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/about"      element={<AboutPage />} />
          <Route path="/contact"    element={<ContactPage />} />
          <Route path="/cart"       element={<CartPage />} />
        </Route>

        {/* ── Checkout — standalone page, no nav distractions ── */}
        <Route path="/checkout" element={
          <Suspense fallback={<PageLoader />}>
            <CheckoutPage />
          </Suspense>
        } />

        {/* ── Admin dashboard (Sidebar layout) ── */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="orders"    element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        {/* ── 404 catch-all ── */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Suspense>
  );
}
