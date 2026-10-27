import { useState, useMemo } from 'react';
import {
  X, ArrowLeft, ArrowRight, Check, Package, Truck, CreditCard,
  Copy, MessageCircle, Download,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';

const STEPS = [
  { id: 1, label: 'Details', icon: Package },
  { id: 2, label: 'Review', icon: Truck },
  { id: 3, label: 'Confirm', icon: CreditCard },
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
  notes: '',
};

// Studio WhatsApp number (placeholder — replace with real one)
const STUDIO_WHATSAPP = '000000000000'; // e.g. '923001234567'

// ---------- Helpers ----------
function generateOrderId() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `ABS-${y}${m}${day}-${rnd}`;
}

function formatDateTime(d) {
  const date = d.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
  const time = d.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
  return `${date}, ${time}`;
}

const COUNTRY_NAMES = {
  PK: 'Pakistan',
  AE: 'United Arab Emirates',
  SA: 'Saudi Arabia',
  QA: 'Qatar',
  KW: 'Kuwait',
  BH: 'Bahrain',
  OM: 'Oman',
  GB: 'United Kingdom',
  US: 'United States',
  OTHER: 'Other',
};

function buildOrderMessage({ orderId, date, form, items }) {
  const lines = [];
  lines.push('ARABIAN BRIDAL STUDIO');
  lines.push('Order Request Confirmation');
  lines.push('');
  lines.push(`Reference: ${orderId}`);
  lines.push(`Date: ${date}`);
  lines.push('');
  lines.push('CUSTOMER');
  lines.push(`Name: ${form.name}`);
  lines.push(`Email: ${form.email}`);
  lines.push(`Phone: ${form.phone}`);
  lines.push('');
  lines.push('SHIPPING');
  lines.push(`Address: ${form.address}`);
  lines.push(`City: ${form.city}`);
  lines.push(`Country: ${COUNTRY_NAMES[form.country] || form.country}`);
  lines.push('');
  lines.push('ITEMS');
  items.forEach((item, i) => {
    lines.push(`${i + 1}. ${item.product.name}`);
    lines.push(`   Category: ${item.product.category}`);
    lines.push(`   Quantity: ${item.qty}`);
    lines.push(`   Price: On Request`);
  });
  lines.push('');
  lines.push('Total: Price on Request');
  lines.push('');
  if (form.notes && form.notes.trim()) {
    lines.push('NOTES');
    lines.push(form.notes.trim());
    lines.push('');
  }
  lines.push('---');
  lines.push('This is a demo request. No real payment has been processed.');
  return lines.join('\n');
}

// ---------- Component ----------
export default function CheckoutModal({ open, onClose }) {
  const { bag, clearBag } = useStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [copied, setCopied] = useState(false);

  const bagItems = useMemo(
    () =>
      bag
        .map((item) => ({
          ...item,
          product: products.find((p) => p.id === item.id),
        }))
        .filter((i) => i.product),
    [bag]
  );

  const onChange = (field) => (ev) => {
    setForm((f) => ({ ...f, [field]: ev.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your full name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.phone.trim()) e.phone = 'Please enter a contact number.';
    if (!form.address.trim()) e.address = 'Please enter your shipping address.';
    if (!form.city.trim()) e.city = 'Please enter your city.';
    if (!form.country.trim()) e.country = 'Please select a country.';
    return e;
  };

  const nextStep = () => {
    if (step === 1) {
      const e = validateStep1();
      setErrors(e);
      if (Object.keys(e).length > 0) return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleConfirm = () => {
    const now = new Date();
    const orderId = generateOrderId();
    const dateStr = formatDateTime(now);
    const message = buildOrderMessage({
      orderId,
      date: dateStr,
      form,
      items: bagItems,
    });
    setOrderData({ orderId, date: dateStr, message });
    setConfirmed(true);
    clearBag();
  };

  const handleCopy = async () => {
    if (!orderData) return;
    try {
      await navigator.clipboard.writeText(orderData.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = orderData.message;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleWhatsApp = () => {
    if (!orderData) return;
    const url = `https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(orderData.message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setForm(initialForm);
      setErrors({});
      setConfirmed(false);
      setOrderData(null);
      setCopied(false);
    }, 350);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="checkout-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Checkout"
        >
          <motion.div
            className="checkout"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="checkout__close" onClick={handleClose} aria-label="Close checkout">
              <X size={20} />
            </button>

            {confirmed && orderData ? (
              /* ---------- CONFIRMATION + WHATSAPP SLIP ---------- */
              <div className="checkout__done">
                <motion.div
                  className="checkout__done-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                >
                  <Check size={34} />
                </motion.div>
                <p className="eyebrow">Order Request Received</p>
                <h2>Thank you, {form.name.split(' ')[0] || 'guest'}.</h2>
                <p className="checkout__done-text">
                  Your order request has been recorded under reference{' '}
                  <strong style={{ color: 'var(--gold-soft)' }}>{orderData.orderId}</strong>.
                  To confirm with the studio, copy the slip below and send it via
                  WhatsApp — or use the direct button.
                </p>

                {/* Slip preview */}
                <pre className="checkout__slip" aria-label="Order slip">
{orderData.message}
                </pre>

                {/* Actions */}
                <div className="checkout__done-actions">
                  <button
                    className={`btn ${copied ? 'btn-gold' : 'btn-outline'}`}
                    onClick={handleCopy}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy Slip'}
                  </button>
                  <button className="btn btn-gold" onClick={handleWhatsApp}>
                    <MessageCircle size={14} />
                    Send via WhatsApp
                  </button>
                </div>

                <div className="checkout__done-note">
                  <strong>Demo confirmation only.</strong> No real order has been placed,
                  no payment has been processed, and no personal data has been stored.
                </div>

                <button
                  className="btn btn-ghost"
                  onClick={handleClose}
                  style={{ marginTop: '1.2rem' }}
                >
                  Return to Studio
                </button>
              </div>
            ) : (
              <>
                {/* ---------- HEADER ---------- */}
                <div className="checkout__head">
                  <div>
                    <p className="eyebrow">Checkout</p>
                    <h2>Request Your Order</h2>
                  </div>
                  <div className="checkout__steps">
                    {STEPS.map((s) => {
                      const Icon = s.icon;
                      const isActive = step === s.id;
                      const isDone = step > s.id;
                      return (
                        <div
                          key={s.id}
                          className={`checkout__step ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                        >
                          <span className="checkout__step-dot">
                            {isDone ? <Check size={12} /> : <Icon size={12} />}
                          </span>
                          <span className="checkout__step-label">{s.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="checkout__body">
                  <div className="checkout__main">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="checkout__section-title">Contact & Shipping</h3>
                        <div className="checkout__form">
                          <div className={`field ${errors.name ? 'field--error' : ''}`}>
                            <label htmlFor="ck-name">Full Name</label>
                            <input id="ck-name" value={form.name} onChange={onChange('name')} placeholder="Your full name" />
                            {errors.name && <span className="field__error">{errors.name}</span>}
                          </div>
                          <div className="form-row">
                            <div className={`field ${errors.email ? 'field--error' : ''}`}>
                              <label htmlFor="ck-email">Email</label>
                              <input id="ck-email" type="email" value={form.email} onChange={onChange('email')} placeholder="you@example.com" />
                              {errors.email && <span className="field__error">{errors.email}</span>}
                            </div>
                            <div className={`field ${errors.phone ? 'field--error' : ''}`}>
                              <label htmlFor="ck-phone">Contact Number</label>
                              <input id="ck-phone" value={form.phone} onChange={onChange('phone')} placeholder="+00 000 000 0000" />
                              {errors.phone && <span className="field__error">{errors.phone}</span>}
                            </div>
                          </div>
                          <div className={`field ${errors.address ? 'field--error' : ''}`}>
                            <label htmlFor="ck-address">Shipping Address</label>
                            <input id="ck-address" value={form.address} onChange={onChange('address')} placeholder="Street, building, area" />
                            {errors.address && <span className="field__error">{errors.address}</span>}
                          </div>
                          <div className="form-row">
                            <div className={`field ${errors.city ? 'field--error' : ''}`}>
                              <label htmlFor="ck-city">City</label>
                              <input id="ck-city" value={form.city} onChange={onChange('city')} placeholder="City" />
                              {errors.city && <span className="field__error">{errors.city}</span>}
                            </div>
                            <div className={`field ${errors.country ? 'field--error' : ''}`}>
                              <label htmlFor="ck-country">Country</label>
                              <select id="ck-country" value={form.country} onChange={onChange('country')}>
                                <option value="">Select country</option>
                                <option value="PK">Pakistan</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="QA">Qatar</option>
                                <option value="KW">Kuwait</option>
                                <option value="BH">Bahrain</option>
                                <option value="OM">Oman</option>
                                <option value="GB">United Kingdom</option>
                                <option value="US">United States</option>
                                <option value="OTHER">Other</option>
                              </select>
                              {errors.country && <span className="field__error">{errors.country}</span>}
                            </div>
                          </div>
                          <div className="field">
                            <label htmlFor="ck-notes">Notes (Optional)</label>
                            <textarea
                              id="ck-notes"
                              rows={3}
                              value={form.notes}
                              onChange={onChange('notes')}
                              placeholder="Any fitting preferences, event date, or special requests..."
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="checkout__section-title">Order Review</h3>
                        <div className="checkout__review-list">
                          {bagItems.map(({ id, qty, product }) => (
                            <div className="checkout__review-item" key={id}>
                              <img src={product.image} alt={product.name} />
                              <div className="checkout__review-body">
                                <span className="checkout__review-cat">{product.category}</span>
                                <span className="checkout__review-name">{product.name}</span>
                                <span className="checkout__review-qty">Quantity: {qty}</span>
                              </div>
                              <span className="checkout__review-price">{product.priceLabel}</span>
                            </div>
                          ))}
                        </div>

                        <div className="checkout__address">
                          <p className="eyebrow">Shipping To</p>
                          <p className="checkout__address-name">{form.name}</p>
                          <p className="checkout__address-line">{form.address}</p>
                          <p className="checkout__address-line">{form.city}, {COUNTRY_NAMES[form.country] || form.country}</p>
                          <p className="checkout__address-line">{form.email} · {form.phone}</p>
                        </div>

                        {form.notes && (
                          <div className="checkout__notes">
                            <p className="eyebrow">Notes</p>
                            <p className="checkout__notes-text">{form.notes}</p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="checkout__section-title">Confirm & Request</h3>
                        <div className="checkout__payment">
                          <div className="checkout__payment-note">
                            <p className="eyebrow">Payment on Request</p>
                            <p>
                              As each piece is made-to-measure, pricing and payment are
                              arranged privately with the studio. Submitting this request
                              does not commit you to a purchase.
                            </p>
                          </div>
                          <div className="checkout__summary">
                            <div className="checkout__summary-row">
                              <span>Items</span>
                              <span>{bagItems.reduce((s, i) => s + i.qty, 0)}</span>
                            </div>
                            <div className="checkout__summary-row">
                              <span>Shipping</span>
                              <span>To be arranged</span>
                            </div>
                            <div className="checkout__summary-row checkout__summary-row--total">
                              <span>Total</span>
                              <span>Price on Request</span>
                            </div>
                          </div>
                        </div>
                        <div className="checkout__demo-warning">
                          <strong>Demo only.</strong> No real payment will be processed and
                          no personal information is stored or sent anywhere.
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <aside className="checkout__aside">
                    <div className="checkout__aside-head">
                      <p className="eyebrow">Your Order</p>
                      <span className="checkout__aside-count">
                        {bagItems.reduce((s, i) => s + i.qty, 0)} item
                        {bagItems.reduce((s, i) => s + i.qty, 0) !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="checkout__aside-list">
                      {bagItems.map(({ id, qty, product }) => (
                        <div className="checkout__aside-item" key={id}>
                          <img src={product.image} alt={product.name} />
                          <div className="checkout__aside-body">
                            <span className="checkout__aside-name">{product.name}</span>
                            <span className="checkout__aside-qty">×{qty}</span>
                          </div>
                          <span className="checkout__aside-price">On Request</span>
                        </div>
                      ))}
                    </div>
                    <div className="checkout__aside-total">
                      <span>Total</span>
                      <strong>Price on Request</strong>
                    </div>
                  </aside>
                </div>

                <div className="checkout__foot">
                  <button
                    className="btn btn-outline"
                    onClick={step === 1 ? handleClose : prevStep}
                  >
                    <ArrowLeft size={14} /> {step === 1 ? 'Cancel' : 'Back'}
                  </button>
                  {step < 3 ? (
                    <button className="btn btn-gold" onClick={nextStep}>
                      Continue <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button className="btn btn-gold" onClick={handleConfirm}>
                      Submit Request <Check size={14} />
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}