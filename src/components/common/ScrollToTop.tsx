/*
  ScrollToTop — Utility Component
  ==================================
  Scrolls the browser window to the top whenever the URL path changes.
  Without this, navigating between pages would keep the scroll position
  from the previous page, which feels broken.

  This component renders nothing visible — it just runs a side effect.
*/

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // Nothing to render
  return null;
}
