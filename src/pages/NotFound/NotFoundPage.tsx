/*
  NotFoundPage — 404 Page
  =========================
  Shown when the user navigates to a URL that doesn't match any route.
  Phase 9 will give this a polished design.
*/
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="text-center px-6">
        <p className="font-serif text-8xl text-gold mb-4">404</p>
        <h1 className="font-serif text-3xl text-forest mb-3">Page Not Found</h1>
        <p className="text-stone-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="min-h-[44px] inline-flex items-center justify-center bg-forest text-ivory px-8 py-3 rounded-xl font-medium hover:bg-forest-dark transition-colors shadow-soft"
        >
          Return to AUREATE Home
        </Link>
      </div>
    </div>
  );
}
