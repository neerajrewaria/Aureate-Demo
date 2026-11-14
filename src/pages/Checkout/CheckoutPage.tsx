/*
  CheckoutPage — Focused Order & Checkout Experience
  ====================================================
  A distraction-free, elegant checkout preview flow for AUREATE.

  Features:
  - Focused header with brand logo & secure lock indicator
  - Contact information and shipping address collection
  - Simulated payment method selection (UPI, Cards, Net Banking, COD)
  - Live order summary with thumbnails and totals calculation
  - Order completion state with generated Order ID and confirmation summary
  - Cart clearing upon successful checkout
  - Empty cart guard
  - Human-readable intermediate-level React code
*/

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Building2,
  Banknote,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils';
import logoImg from '@/assets/brand/01_Aureate_Logo_HD.jpg';
import type { CartItem } from '@/types';

// Payment method options
type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

interface ShippingForm {
  email: string;
  phone: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface CompletedOrder {
  orderId: string;
  customerName: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  totalAmount: number;
  orderDate: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();

  // Form inputs state
  const [formData, setFormData] = useState<ShippingForm>({
    email: '',
    phone: '',
    fullName: '',
    address: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  // Financial calculations
  const shippingFee = totalPrice >= 999 || items.length === 0 ? 0 : 99;
  const grandTotal = totalPrice + shippingFee;

  // Handle form field change
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  // Validate form fields
  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required.';
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = 'Enter a valid 10-digit number.';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full recipient name is required.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN Code is required.';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Enter a valid 6-digit PIN code.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Handle complete order submission
  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate 1.2s order processing
    setTimeout(() => {
      const orderNumber = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;

      // Save order details to local state before clearing cart
      setCompletedOrder({
        orderId: orderNumber,
        customerName: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        paymentMethod,
        items: [...items],
        totalAmount: grandTotal,
        orderDate: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });

      // Clear the cart
      clearCart();
      setIsProcessing(false);
    }, 1200);
  }

  // ── 1. ORDER CONFIRMATION VIEW (Post-Checkout) ──
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-soft">
          
          {/* Success Icon & Header */}
          <div className="text-center pb-8 border-b border-stone-100">
            <div className="w-16 h-16 rounded-full bg-sage/15 text-sage flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} className="stroke-[2.5]" />
            </div>
            <p className="text-xs uppercase tracking-widest text-gold font-mono font-semibold mb-1">
              Order Placed Successfully
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-forest font-medium mb-2">
              Thank You for Your Order
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              An order confirmation has been logged for{' '}
              <strong className="text-forest">{completedOrder.email}</strong>
            </p>
          </div>

          {/* Order Meta details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-stone-100 text-xs">
            <div>
              <span className="text-stone-400 block mb-0.5">Order ID</span>
              <span className="font-mono font-semibold text-forest">
                {completedOrder.orderId}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Date</span>
              <span className="font-medium text-forest">{completedOrder.orderDate}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Payment Method</span>
              <span className="font-medium uppercase text-forest">
                {completedOrder.paymentMethod}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Total Paid</span>
              <span className="font-semibold text-forest">
                {formatPrice(completedOrder.totalAmount)}
              </span>
            </div>
          </div>

          {/* Ordered Items List */}
          <div className="py-6 border-b border-stone-100">
            <h3 className="font-serif text-lg text-forest font-medium mb-4">
              Formulations Ordered
            </h3>
            <div className="space-y-3">
              {completedOrder.items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-stone-50 p-1 border border-stone-200/60 flex items-center justify-center shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-forest">{product.name}</p>
                      <p className="text-stone-400 text-xs">Qty: {quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-forest">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address Summary */}
          <div className="py-6 border-b border-stone-100 text-xs sm:text-sm">
            <h3 className="font-serif text-lg text-forest font-medium mb-2">
              Dispatch Destination
            </h3>
            <p className="text-stone-600 leading-relaxed">
              <strong className="text-forest">{completedOrder.customerName}</strong>
              <br />
              {completedOrder.address}
              <br />
              {completedOrder.city}, PIN: {completedOrder.pincode}
            </p>
            <p className="text-xs text-stone-400 mt-2">
              Estimated delivery: 3 to 5 business days across India.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-6 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-forest hover:bg-forest-dark text-ivory px-8 py-3.5 rounded-xl text-sm font-medium transition-colors shadow-soft"
            >
              <ArrowLeft size={16} />
              <span>Explore More Formulations</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // ── 2. EMPTY BAG GUARD ──
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-16 px-4">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-soft max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-forest/5 text-forest flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={28} />
          </div>
          <h2 className="font-serif text-2xl text-forest font-medium mb-2">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mb-6 leading-relaxed">
            Please add formulations to your shopping bag before proceeding to checkout.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-dark text-ivory px-6 py-3 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-xs"
          >
            <span>Explore Formulations</span>
          </Link>
        </div>
      </div>
    );
  }

  // ── 3. STANDARD CHECKOUT VIEW ──
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-forest">
      
      {/* ── Focused Top Bar ── */}
      <header className="bg-white border-b border-stone-200/80 py-4 px-4 sm:px-8 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="AUREATE Logo"
              className="h-9 w-9 rounded-full object-cover border border-gold/40 shadow-xs"
            />
            <span className="font-serif text-xl sm:text-2xl tracking-widest text-forest font-medium">
              AUREATE
            </span>
          </Link>

          {/* Secure Checkout Badge */}
          <div className="flex items-center gap-2 text-stone-500 text-xs font-medium bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-full">
            <Lock size={13} className="text-sage" />
            <span>256-Bit SSL Demo Checkout</span>
          </div>

        </div>
      </header>

      {/* ── Main Checkout Container ── */}
      <main className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        
        {/* Back to Cart link */}
        <div className="mb-6">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-forest text-xs uppercase tracking-wider font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Shopping Bag</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ── Left Column: Checkout Form (7 cols) ── */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-soft">
            <form onSubmit={handlePlaceOrder} noValidate className="space-y-8">
              
              {/* Step 1: Contact Information */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-100">
                  <span className="w-6 h-6 rounded-full bg-forest text-ivory text-xs flex items-center justify-center font-semibold">
                    1
                  </span>
                  <h2 className="font-serif text-xl text-forest font-medium">
                    Contact Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
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
                      placeholder="name@example.com"
                      className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border text-sm text-forest placeholder:text-stone-300 focus:outline-hidden transition-colors ${
                        errors.email
                          ? 'border-red-400 bg-red-50/30'
                          : 'border-stone-200 bg-stone-50 focus:border-gold focus:bg-white'
                      }`}
                    />
                    {errors.email && (
                      <span id="email-error" className="text-[11px] text-red-500 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      aria-required="true"
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border text-sm text-forest placeholder:text-stone-300 focus:outline-hidden transition-colors ${
                        errors.phone
                          ? 'border-red-400 bg-red-50/30'
                          : 'border-stone-200 bg-stone-50 focus:border-gold focus:bg-white'
                      }`}
                    />
                    {errors.phone && (
                      <span id="phone-error" className="text-[11px] text-red-500 mt-1 block">{errors.phone}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-100">
                  <span className="w-6 h-6 rounded-full bg-forest text-ivory text-xs flex items-center justify-center font-semibold">
                    2
                  </span>
                  <h2 className="font-serif text-xl text-forest font-medium">
                    Delivery Address
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Recipient Full Name *
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
                      className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border text-sm text-forest placeholder:text-stone-300 focus:outline-hidden transition-colors ${
                        errors.fullName
                          ? 'border-red-400 bg-red-50/30'
                          : 'border-stone-200 bg-stone-50 focus:border-gold focus:bg-white'
                      }`}
                    />
                    {errors.fullName && (
                      <span id="fullName-error" className="text-[11px] text-red-500 mt-1 block">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Street Address */}
                  <div>
                    <label htmlFor="address" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Street Address & Apartment *
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={errors.address ? 'true' : 'false'}
                      aria-describedby={errors.address ? 'address-error' : undefined}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Apartment, suite, building, street address"
                      className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border text-sm text-forest placeholder:text-stone-300 focus:outline-hidden transition-colors ${
                        errors.address
                          ? 'border-red-400 bg-red-50/30'
                          : 'border-stone-200 bg-stone-50 focus:border-gold focus:bg-white'
                      }`}
                    />
                    {errors.address && (
                      <span id="address-error" className="text-[11px] text-red-500 mt-1 block">{errors.address}</span>
                    )}
                  </div>

                  {/* City, State & PIN */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* City */}
                    <div>
                      <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                        City *
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={errors.city ? 'true' : 'false'}
                        aria-describedby={errors.city ? 'city-error' : undefined}
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Bengaluru"
                        className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border text-sm text-forest placeholder:text-stone-300 focus:outline-hidden transition-colors ${
                          errors.city
                            ? 'border-red-400 bg-red-50/30'
                            : 'border-stone-200 bg-stone-50 focus:border-gold focus:bg-white'
                        }`}
                      />
                      {errors.city && (
                        <span id="city-error" className="text-[11px] text-red-500 mt-1 block">{errors.city}</span>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <label htmlFor="state" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                        State
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full min-h-[44px] px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-forest focus:outline-hidden focus:border-gold focus:bg-white cursor-pointer"
                      >
                        <option value="Karnataka">Karnataka</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi NCR</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Other">Other State</option>
                      </select>
                    </div>

                    {/* PIN Code */}
                    <div>
                      <label htmlFor="pincode" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        id="pincode"
                        name="pincode"
                        type="text"
                        maxLength={6}
                        required
                        aria-required="true"
                        aria-invalid={errors.pincode ? 'true' : 'false'}
                        aria-describedby={errors.pincode ? 'pincode-error' : undefined}
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="560001"
                        className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border text-sm text-forest placeholder:text-stone-300 focus:outline-hidden transition-colors ${
                          errors.pincode
                            ? 'border-red-400 bg-red-50/30'
                            : 'border-stone-200 bg-stone-50 focus:border-gold focus:bg-white'
                        }`}
                      />
                      {errors.pincode && (
                        <span id="pincode-error" className="text-[11px] text-red-500 mt-1 block">{errors.pincode}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-100">
                  <span className="w-6 h-6 rounded-full bg-forest text-ivory text-xs flex items-center justify-center font-semibold">
                    3
                  </span>
                  <h2 className="font-serif text-xl text-forest font-medium">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-2.5">
                  {/* UPI */}
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-gold bg-gold/5 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="text-forest focus:ring-gold"
                      />
                      <Smartphone size={18} className="text-forest" />
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-forest block">
                          UPI / QR Code
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Google Pay, PhonePe, Paytm, BHIM UPI
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                      Instant
                    </span>
                  </label>

                  {/* Cards */}
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-gold bg-gold/5 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-forest focus:ring-gold"
                      />
                      <CreditCard size={18} className="text-forest" />
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-forest block">
                          Credit or Debit Card
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Visa, Mastercard, RuPay, American Express
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                      Card
                    </span>
                  </label>

                  {/* Net Banking */}
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'border-gold bg-gold/5 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => setPaymentMethod('netbanking')}
                        className="text-forest focus:ring-gold"
                      />
                      <Building2 size={18} className="text-forest" />
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-forest block">
                          Net Banking
                        </span>
                        <span className="text-[11px] text-stone-500">
                          HDFC, ICICI, SBI, Axis & all major Indian banks
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                      Bank
                    </span>
                  </label>

                  {/* COD */}
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-gold bg-gold/5 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-forest focus:ring-gold"
                      />
                      <Banknote size={18} className="text-forest" />
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-forest block">
                          Cash on Delivery
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Pay upon delivery at your doorstep
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                      COD
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-dark text-ivory py-4 px-8 rounded-xl font-medium tracking-wide transition-all shadow-soft cursor-pointer disabled:opacity-60 text-sm sm:text-base"
                >
                  <Lock size={16} />
                  <span>
                    {isProcessing
                      ? 'Processing Order...'
                      : `Complete Order \u2022 ${formatPrice(grandTotal)}`}
                  </span>
                </button>

                <p className="text-center text-[11px] text-stone-400 mt-3 font-mono">
                  [Demo Environment] This is a portfolio preview. No real funds will be charged.
                </p>
              </div>

            </form>
          </div>

          {/* ── Right Column: Order Summary (5 cols) ── */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-soft sticky top-24 space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif text-xl text-forest font-medium">
                Order Summary
              </h3>
              <span className="text-xs text-stone-400 font-mono">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Item Thumbnails & Quantities */}
            <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-stone-50 p-1 border border-stone-200/70 flex items-center justify-center shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-forest line-clamp-1">{product.name}</p>
                      <p className="text-stone-400 text-xs">Qty: {quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-forest shrink-0">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 pt-4 border-t border-stone-100 text-xs sm:text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-medium text-forest">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery</span>
                <span className="font-medium text-forest">
                  {shippingFee === 0 ? (
                    <span className="text-sage font-semibold uppercase text-xs">Complimentary</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Taxes</span>
                <span className="text-stone-400 text-xs">Included in price</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-baseline justify-between pt-4 border-t border-stone-100">
              <span className="font-serif text-lg text-forest font-semibold">Total Amount</span>
              <span className="font-serif text-2xl text-forest font-bold">
                {formatPrice(grandTotal)}
              </span>
            </div>

            {/* Trust Assurance Card */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/70 space-y-2 text-xs text-stone-500">
              <div className="flex items-center gap-2 text-forest font-medium">
                <ShieldCheck size={16} className="text-sage" />
                <span>The Aureate Dispatch Guarantee</span>
              </div>
              <p className="leading-relaxed">
                Orders are packed in protective eco-friendly packaging and dispatched within 24 to 48 business hours.
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
