/*
  PageLoader — Full-Screen Loading State
  ==========================================
  Shown by React Suspense while a lazy-loaded page chunk is downloading.
  Keeps a consistent brand feel even during code-splitting transitions.
*/

export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-ivory z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Animated brand logo mark */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-gold opacity-30 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-forest animate-spin" style={{ borderTopColor: 'transparent' }} />
          <div className="absolute inset-4 rounded-full bg-gold opacity-60" />
        </div>

        <p className="font-serif text-forest text-lg tracking-widest uppercase">
          Aureate
        </p>
      </div>
    </div>
  );
}
