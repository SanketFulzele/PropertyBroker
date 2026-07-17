import { useNavigate } from "react-router-dom";
import { openWhatsApp } from "../utils/contact";

export default function GuidesCTA() {
  const navigate = useNavigate();

  return (
    <div className="guides-cta">
      <div className="guides-cta-content">
        <h2 className="guides-cta-title">
          Looking for the Perfect Property Instead?
        </h2>
        <p className="guides-cta-desc">
          Browse verified listings across Nagpur's best localities or talk to our property experts for personalized guidance.
        </p>
        <div className="guides-cta-buttons">
          <button className="guides-cta-btn-primary" onClick={() => navigate("/filter")}>
            Browse Properties
          </button>
          <button className="guides-cta-btn-outline" onClick={() => openWhatsApp({ source: "guides" })}>
            Contact Our Experts
          </button>
        </div>
      </div>
    </div>
  );
}
