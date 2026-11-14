/*
  NewsletterCTA — Community Updates & Insights
  ============================================
  Interactive frontend email subscription simulation with validation.
  Clean AUREATE messaging with high-contrast warm ivory typography.
  Clearly marked as a demonstration interface.
*/

import { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Simple email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Simulate successful subscription
    setStatus('success');
    setErrorMessage('');
  }

  function handleReset() {
    setEmail('');
    setStatus('idle');
  }

  return (
    <section className="py-20 md:py-24 bg-forest text-ivory relative overflow-hidden border-b border-forest-dark">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container-site relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          
          <span className="text-xs font-mono uppercase tracking-widest text-gold mb-3 inline-block font-medium">
            Stay Connected
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-ivory mb-4 leading-tight">
            Considered Wellness in Your Inbox
          </h2>

          <p className="text-ivory/85 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Subscribe for seasonal formulation updates, botanical insights, and reflections on everyday wellness.
          </p>

          {/* Form or Simulated Confirmation */}
          {status === 'success' ? (
            <div className="bg-forest-dark border border-gold/40 p-7 rounded-2xl shadow-soft text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={24} />
              </div>
              <h4 className="font-serif text-xl text-ivory mb-1">Thank You For Connecting</h4>
              <p className="text-stone-300 text-xs sm:text-sm mb-4">
                Simulated confirmation: We have recorded <strong className="text-gold">{email}</strong> for future updates.
              </p>
              <button
                onClick={handleReset}
                className="text-xs text-stone-400 hover:text-gold underline underline-offset-4 transition-colors cursor-pointer"
              >
                Sign up another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                />
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={status === 'error' ? 'true' : 'false'}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className="w-full bg-forest-dark/95 border border-stone-600 rounded-xl pl-11 pr-4 py-3.5 text-sm text-ivory placeholder:text-stone-400 focus:outline-none focus:border-gold transition-colors min-h-[44px]"
                />
              </div>

              <button
                type="submit"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-forest font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors duration-200 shrink-0 shadow-soft cursor-pointer"
              >
                <span>Subscribe</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-rose-400 text-xs mt-3">{errorMessage}</p>
          )}

          <p className="text-stone-400/80 text-[11px] mt-6 tracking-wide">
            [Demo Simulation &bull; No marketing emails or data tracking is active]
          </p>

        </div>
      </div>
    </section>
  );
}
