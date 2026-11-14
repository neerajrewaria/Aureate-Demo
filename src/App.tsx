/*
  AUREATE — Root Application Component
  ========================================
  App.tsx is intentionally simple. Its only job is to:
  1. Set up React Router's BrowserRouter (done in main.tsx actually,
     but we keep App clean and focused on rendering the router).
  2. Render ScrollToTop so navigation always starts at the top of the page.
  3. Render the AppRouter which handles all page routing.

  Any truly global providers (CartProvider, etc.) live in main.tsx
  so this component stays clean and easy to read.
*/

import AppRouter from '@/routes/AppRouter';
import ScrollToTop from '@/components/common/ScrollToTop';

export default function App() {
  return (
    <>
      {/* Scrolls to top of page on every route change */}
      <ScrollToTop />

      {/* All pages and layouts are rendered here */}
      <AppRouter />
    </>
  );
}
