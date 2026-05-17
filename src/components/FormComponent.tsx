import { useState } from "react";
import "../styles/form.css";
import emailjs from "@emailjs/browser";

export default function FormComponent() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    propertyType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation (added)
    if (!formData.name || !formData.phone || !formData.propertyType) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          phone: formData.phone,
          propertyType: formData.propertyType,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent:", response);

      // success UI (your existing logic)
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setLoading(false);
        setFormData({
          name: "",
          phone: "",
          propertyType: "",
          message: "",
        });
      }, 3500);
    } catch (error) {
      console.error("Email failed:", JSON.stringify(error));
      setLoading(false);
    }
  };

  const isFloating = (field: string) =>
    focused === field || formData[field as keyof typeof formData] !== "";

  return (
    <section className="form-section">
      {/* Decorative blobs */}
      <div className="form-blob form-blob--1" />
      <div className="form-blob form-blob--2" />

      <div className="form-card">
        {/* Left panel */}
        <div className="form-panel form-panel--left">
          <div className="form-panel-badge">✦ Free Consultation</div>
          <h2 className="form-panel-heading">
            Find Your <br />
            <span className="form-panel-heading--accent">Dream Home</span>
          </h2>
          <p className="form-panel-sub">
            Share your requirements and our property experts will reach out
            within 24 hours.
          </p>

          <ul className="form-features">
            {[
              { icon: "🏙️", text: "Pan-India listings — 50+ cities" },
              { icon: "✅", text: "100% RERA-verified projects" },
              { icon: "🤝", text: "Zero brokerage on select properties" },
            ].map(({ icon, text }) => (
              <li key={text} className="form-feature-item">
                <span className="form-feature-icon">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="form-trust">
            <div className="form-trust-avatars">
              {["A", "B", "C", "D"].map((l) => (
                <div key={l} className="form-trust-avatar">
                  {l}
                </div>
              ))}
            </div>
            <p className="form-trust-label">
              Trusted by <strong>12,000+</strong> happy families
            </p>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="form-panel form-panel--right">
          {submitted ? (
            <div className="form-success">
              <div className="form-success-icon">✓</div>
              <h3>We've got your request!</h3>
              <p>Our team will call you back within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form" noValidate>
              <h3 className="form-right-heading">Get in Touch</h3>

              {/* Name */}
              <div
                className={`form-field ${isFloating("name") ? "form-field--active" : ""}`}
              >
                <label className="form-label" htmlFor="name">
                  Full Name
                </label>
                <div className="form-input-wrap">
                  <svg className="form-input-icon" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Rahul Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Phone */}
              <div
                className={`form-field ${isFloating("phone") ? "form-field--active" : ""}`}
              >
                <label className="form-label" htmlFor="phone">
                  Phone Number
                </label>
                <div className="form-input-wrap">
                  <svg className="form-input-icon" viewBox="0 0 20 20" fill="none">
                    <path d="M4 2h3l1.5 4L7 7.5a11 11 0 005.5 5.5L14 11.5l4 1.5v3A2 2 0 0116 18C8.268 18 2 11.732 2 4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                    required
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div
                className={`form-field ${isFloating("propertyType") ? "form-field--active" : ""}`}
              >
                <label className="form-label" htmlFor="propertyType">
                  I'm looking to
                </label>
                <div className="form-input-wrap">
                  <svg className="form-input-icon" viewBox="0 0 20 20" fill="none">
                    <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 18V12h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    onFocus={() => setFocused("propertyType")}
                    onBlur={() => setFocused(null)}
                    required
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="buy">Buy a Property</option>
                    <option value="sell">Sell my Property</option>
                    <option value="rent">Rent / Lease</option>
                    <option value="invest">Investment Query</option>
                  </select>
                  <svg className="form-select-arrow" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Message */}
              <div
                className={`form-field ${isFloating("message") ? "form-field--active" : ""}`}
              >
                <label className="form-label" htmlFor="message">
                  Message <span className="form-label-optional">(optional)</span>
                </label>
                <div className="form-input-wrap form-input-wrap--textarea">
                  <svg className="form-input-icon form-input-icon--top" viewBox="0 0 20 20" fill="none">
                    <path d="M17 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3l4 4 4-4h3a1 1 0 001-1V3a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us your budget, preferred location, or any specific requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    rows={3}
                  />
                </div>
              </div>

              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span>Sending...</span>
                    <svg className="form-submit-spinner" viewBox="0 0 50 50" fill="none">
                      <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 94.2" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Request a Callback</span>
                    <svg viewBox="0 0 20 20" fill="none">
                      <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              <p className="form-disclaimer">
                🔒 Your information is 100% private and never shared.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}