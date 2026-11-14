/*
  ContactPage — Aureate Concierge & Inquiries
  ============================================
  A luxury editorial contact experience providing:
  - Form validation with accessible aria attributes & clear error states
  - Interactive FAQ accordion for instant client guidance
  - Copy-to-clipboard email shortcut for the atelier concierge
  - Operational details (dispatch atelier, hours, expectations)
  - Simulated submission state with reset option
  - 100% human-readable intermediate-level React & TypeScript
*/

import { useState } from 'react';
import { Mail, Clock, MapPin, Check, Send, ChevronDown, Copy, CheckCheck } from 'lucide-react';

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

const INQUIRY_TOPICS = [
  'General Formulation Guidance',
  'Order & Delivery Assistance',
  'Ingredient Sourcing & Specifications',
  'Wholesale & Atelier Partnerships',
  'Press & Media Inquiries',
];

const FAQS = [
  {
    question: 'How do I incorporate Aureate formulations into my daily routine?',
    answer:
      'Our formulations are designed to work in gentle synergy: Daily Wellness Greens serves as a morning alkalizing foundation, Omega-3 provides essential midday lipid nourishment with a meal, and Magnesium Complex supports evening relaxation before rest.',
  },
  {
    question: 'What is the estimated delivery timeframe across India?',
    answer:
      'Orders are dispatched from our Bengaluru atelier within 24 to 48 business hours. Delivery typically takes 2 to 4 business days for major metropolitan hubs and 3 to 5 business days for regional locations.',
  },
  {
    question: 'Are Aureate formulations suitable for continuous daily use?',
    answer:
      'Yes. Each formulation is calibrated for gentle, consistent everyday incorporation without cyclical pauses. As always, consult your healthcare physician if you are pregnant, nursing, or managing existing medical conditions.',
  },
  {
    question: 'How do you verify the purity of your raw botanicals?',
    answer:
      'Every batch undergoes multi-stage screening for heavy metals, microbial safety, and active component potency. We publish full transparent ingredient disclosures on all individual formulation pages.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    subject: INQUIRY_TOPICS[0],
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form input change handler
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  // Form validation logic
  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email format.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a message or inquiry.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Handle form submission
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  }

  // Reset form to send another message
  function handleReset() {
    setFormData({
      fullName: '',
      email: '',
      subject: INQUIRY_TOPICS[0],
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  }

  // Copy email to clipboard helper
  function handleCopyEmail() {
    navigator.clipboard.writeText('care@aureatewellness.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  }

  return (
    <div className="bg-[#FAF8F5] text-forest min-h-screen">
      
      {/* ── 1. EDITORIAL CONCIERGE HEADER (EXPANSIVE) ── */}
      <section className="relative overflow-hidden bg-[#0D1C12] text-ivory py-20 sm:py-24 md:py-28 border-b border-[#08120B]">
        {/* Deep Studio Background Gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 1000px 550px at 50% 40%, rgba(26, 49, 34, 0.95) 0%, rgba(13, 28, 18, 0.98) 60%, rgba(6, 14, 9, 1) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Ambient Gold Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-35"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(197, 160, 89, 0.32) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="container-site relative z-10 text-center max-w-2xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-3.5">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold/70" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs text-gold tracking-[0.26em] uppercase font-medium">
              Atelier Client Care
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold/70" aria-hidden="true" />
          </div>

          {/* Master Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-normal leading-tight tracking-tight mb-4 drop-shadow-sm">
            <span style={{ color: '#F8F5ED' }}>Connect With The</span>{' '}
            <span className="italic text-gold">Atelier.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-lg mx-auto">
            Dedicated formulation guidance, order support, and partnership inquiries from our Bengaluru studio.
          </p>
        </div>
      </section>

      {/* ── 2. TWO-COLUMN CONCIERGE MAIN CONTAINER (SPACIOUS 56px-80px PADDING) ── */}
      <div className="container-site py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* ── LEFT COLUMN: CONCIERGE INQUIRY FORM (7 cols) ── */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 lg:p-14 rounded-3xl border border-stone-200/90 shadow-[0_8px_36px_rgba(0,0,0,0.03)]">
            
            {isSubmitted ? (
              /* Success Confirmation Card */
              <div className="py-12 text-center">
                <div className="w-18 h-18 mx-auto mb-6 rounded-2xl bg-forest/5 text-forest border border-forest/15 flex items-center justify-center shadow-xs">
                  <Check size={36} className="stroke-[2.5] text-gold" />
                </div>
                <h3 className="font-serif text-3xl text-forest font-medium mb-3">
                  Message Received With Care
                </h3>
                <p className="text-stone-600 text-base leading-relaxed max-w-md mx-auto mb-3 font-light">
                  Thank you, <strong className="text-forest font-semibold">{formData.fullName}</strong>. Your inquiry regarding &ldquo;{formData.subject}&rdquo; has been directed to our concierge team.
                </p>
                <p className="text-xs text-stone-400 mb-9 font-mono">
                  A response will be delivered to <span className="text-forest font-medium">{formData.email}</span> within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-forest hover:bg-forest-dark text-ivory px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer shadow-soft"
                >
                  <span>Send Another Inquiry</span>
                </button>
              </div>
            ) : (
              /* Active Inquiry Form with Generous Vertical Rhythm */
              <form onSubmit={handleSubmit} noValidate className="space-y-7">
                <div className="mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-gold font-medium block mb-1.5">
                    Direct Inquiry
                  </span>
                  <h2 className="font-serif text-3xl text-forest font-medium">
                    Send a Considered Message
                  </h2>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-2 font-medium"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={errors.fullName ? 'true' : 'false'}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Ananya Sharma"
                      className={`w-full min-h-[50px] px-4 sm:px-5 py-3 rounded-2xl border text-sm text-forest placeholder:text-stone-300 focus:outline-hidden transition-all ${
                        errors.fullName
                          ? 'border-red-400 bg-red-50/20'
                          : 'border-stone-200 bg-[#FAF8F5] focus:border-gold focus:ring-2 focus:ring-gold/20 focus:bg-white'
                      }`}
                    />
                    {errors.fullName && (
                      <span id="fullName-error" className="text-xs text-red-500 mt-1.5 block">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-2 font-medium"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@domain.com"
                      className={`w-full min-h-[50px] px-4 sm:px-5 py-3 rounded-2xl border text-sm text-forest placeholder:text-stone-300 focus:outline-hidden transition-all ${
                        errors.email
                          ? 'border-red-400 bg-red-50/20'
                          : 'border-stone-200 bg-[#FAF8F5] focus:border-gold focus:ring-2 focus:ring-gold/20 focus:bg-white'
                      }`}
                    />
                    {errors.email && (
                      <span id="email-error" className="text-xs text-red-500 mt-1.5 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Topic Dropdown */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-2 font-medium"
                  >
                    Topic of Inquiry
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full min-h-[50px] px-4 sm:px-5 py-3 rounded-2xl border border-stone-200 bg-[#FAF8F5] text-sm text-forest focus:outline-hidden focus:border-gold focus:ring-2 focus:ring-gold/20 focus:bg-white transition-all cursor-pointer font-medium"
                  >
                    {INQUIRY_TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-2 font-medium"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    aria-required="true"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How may our concierge team assist you with our formulations or delivery?"
                    className={`w-full px-4 sm:px-5 py-3.5 rounded-2xl border text-sm text-forest placeholder:text-stone-300 focus:outline-hidden transition-all resize-y ${
                      errors.message
                        ? 'border-red-400 bg-red-50/20'
                        : 'border-stone-200 bg-[#FAF8F5] focus:border-gold focus:ring-2 focus:ring-gold/20 focus:bg-white'
                    }`}
                  />
                  {errors.message && (
                    <span id="message-error" className="text-xs text-red-500 mt-1.5 block">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-h-[50px] inline-flex items-center justify-center gap-2.5 bg-forest hover:bg-forest-dark text-ivory px-9 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-[0_6px_20px_rgba(18,35,24,0.18)] hover:shadow-soft hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
                  >
                    <Send size={15} />
                    <span>{isSubmitting ? 'Transmitting Message...' : 'Submit Inquiry'}</span>
                  </button>

                  <p className="text-[11px] text-stone-400 font-mono pt-3.5">
                    [Demonstration Mode] Submissions are logged safely for portfolio evaluation.
                  </p>
                </div>
              </form>
            )}

          </div>

          {/* ── RIGHT COLUMN: ATELIER DETAILS & FAQ ACCORDION (5 cols) ── */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Atelier Concierge Details Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/90 shadow-[0_6px_30px_rgba(0,0,0,0.03)] space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-gold font-medium block mb-1">
                  Bengaluru Studio
                </span>
                <h3 className="font-serif text-2xl text-forest font-medium">
                  Direct Atelier Care
                </h3>
              </div>

              {/* Direct Email */}
              <div className="flex items-start gap-4 p-2 rounded-2xl hover:bg-[#FAF8F5] transition-colors">
                <div className="w-11 h-11 rounded-2xl bg-forest/5 text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={18} />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 block">
                    Electronic Mail
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href="mailto:care@aureatewellness.com"
                      className="text-sm sm:text-base font-medium text-forest hover:text-gold transition-colors"
                    >
                      care@aureatewellness.com
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy concierge email address"
                      className="text-stone-400 hover:text-forest transition-colors p-1.5 rounded-md cursor-pointer"
                      title="Copy to clipboard"
                    >
                      {copiedEmail ? <CheckCheck size={15} className="text-sage" /> : <Copy size={15} />}
                    </button>
                  </div>
                  <span className="block text-xs text-stone-400 mt-1 font-light">
                    Responses delivered within 24 business hours
                  </span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-2 rounded-2xl hover:bg-[#FAF8F5] transition-colors">
                <div className="w-11 h-11 rounded-2xl bg-forest/5 text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 block">
                    Concierge Hours
                  </span>
                  <span className="text-sm sm:text-base text-forest font-medium block mt-1">
                    Monday &ndash; Friday: 9:00 AM &ndash; 6:00 PM IST
                  </span>
                  <span className="text-xs text-stone-400 block mt-1 font-light">
                    Excluding observed national holidays
                  </span>
                </div>
              </div>

              {/* Formulation Atelier Location */}
              <div className="flex items-start gap-4 p-2 rounded-2xl hover:bg-[#FAF8F5] transition-colors">
                <div className="w-11 h-11 rounded-2xl bg-forest/5 text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 block">
                    Formulation &amp; Dispatch Studio
                  </span>
                  <span className="text-sm sm:text-base text-forest font-medium block mt-1">
                    Indiranagar, Bengaluru, Karnataka, India
                  </span>
                  <span className="text-xs text-stone-400 block mt-1 font-light">
                    All formulations dispatch nationwide across India
                  </span>
                </div>
              </div>

            </div>

            {/* Interactive FAQ Accordion */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/90 shadow-[0_6px_30px_rgba(0,0,0,0.03)]">
              <div className="border-b border-stone-100 pb-4 mb-5">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-gold font-medium block mb-1">
                  Quick Guidance
                </span>
                <h3 className="font-serif text-2xl text-forest font-medium">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3.5">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="border border-stone-200/80 rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FAF8F5] transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="font-serif text-base font-medium text-forest pr-2 leading-snug">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={17}
                          className={`text-gold shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-500 font-light leading-relaxed border-t border-stone-100">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
