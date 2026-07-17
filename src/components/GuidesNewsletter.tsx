import { useState } from "react";

export default function GuidesNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="guides-newsletter">
      <div className="guides-newsletter-content">
        <h2 className="guides-newsletter-title">Stay Updated with Property Insights</h2>
        <p className="guides-newsletter-desc">
          Get the latest guides, market trends, and expert advice delivered to your inbox every week.
        </p>
        <form className="guides-newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="guides-newsletter-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="guides-newsletter-btn">
            {subscribed ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}
