import { useState } from 'react';
import { motion } from 'framer-motion';

const COLLECTIONS = [
  'Royal Bridal Couture',
  'Nikkah & Ceremony',
  'Evening Gowns',
  'Luxury Formal Wear',
  'Bespoke Creations',
];
const TYPES = ['In-Studio Appointment', 'Virtual Consultation', 'Private Fitting'];

const CONSULT_IMG =
  'images/teapink-gown.JPG';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  collection: '',
  type: '',
};

export default function Consultation() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.phone.trim()) e.phone = 'Please enter a contact number.';
    if (!form.eventDate) e.eventDate = 'Please select an event date.';
    if (!form.collection) e.collection = 'Please choose a collection.';
    if (!form.type) e.type = 'Please choose a consultation type.';
    return e;
  };

  const onChange = (field) => (ev) => {
    setForm((f) => ({ ...f, [field]: ev.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
      setForm(initialForm);
    }
  };

  return (
    <section id="consult" className="consult section-pad">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Private Bridal Consultation</p>
          <h2>
            Begin your <em>commission</em>
          </h2>
          <p>
            Share a few details and the studio will be in touch to arrange a
            private consultation. This is a frontend demo — no real appointment
            will be booked.
          </p>
        </div>

        <div className="consult__grid">
          <div className="consult__media">
            <img src={CONSULT_IMG} alt="Consultation" loading="lazy" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <div className="form-success" role="status">
                <strong>Thank you — your request has been noted.</strong>
                <br />
                This is a demo confirmation. No real appointment has been booked.
                <small>Frontend demo only</small>
              </div>
            ) : (
              <form className="consult__form" onSubmit={onSubmit} noValidate>
                <div className="form-row">
                  <div className={`field ${errors.name ? 'field--error' : ''}`}>
                    <label htmlFor="name">Full Name</label>
                    <input id="name" value={form.name} onChange={onChange('name')} placeholder="Your name" />
                    {errors.name && <span className="field__error">{errors.name}</span>}
                  </div>
                  <div className={`field ${errors.email ? 'field--error' : ''}`}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={form.email} onChange={onChange('email')} placeholder="you@example.com" />
                    {errors.email && <span className="field__error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className={`field ${errors.phone ? 'field--error' : ''}`}>
                    <label htmlFor="phone">Contact Number</label>
                    <input id="phone" value={form.phone} onChange={onChange('phone')} placeholder="+00 000 000 0000" />
                    {errors.phone && <span className="field__error">{errors.phone}</span>}
                  </div>
                  <div className={`field ${errors.eventDate ? 'field--error' : ''}`}>
                    <label htmlFor="eventDate">Event Date</label>
                    <input id="eventDate" type="date" value={form.eventDate} onChange={onChange('eventDate')} />
                    {errors.eventDate && <span className="field__error">{errors.eventDate}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className={`field ${errors.collection ? 'field--error' : ''}`}>
                    <label htmlFor="collection">Preferred Collection</label>
                    <select id="collection" value={form.collection} onChange={onChange('collection')}>
                      <option value="">Select a collection</option>
                      {COLLECTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.collection && <span className="field__error">{errors.collection}</span>}
                  </div>
                  <div className={`field ${errors.type ? 'field--error' : ''}`}>
                    <label htmlFor="type">Consultation Type</label>
                    <select id="type" value={form.type} onChange={onChange('type')}>
                      <option value="">Select a type</option>
                      {TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.type && <span className="field__error">{errors.type}</span>}
                  </div>
                </div>

                <button type="submit" className="btn btn-gold" style={{ marginTop: '0.6rem' }}>
                  Request Appointment
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}