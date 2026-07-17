import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "../hooks/hooks";
import { NAGPUR_LOCALITIES } from "../data/data";
import type { Locality } from "../types/types";
import "../styles/areaSection.css";

function LocalityCard({
  locality,
  visible,
  index,
}: {
  locality: Locality;
  visible: boolean;
  index: number;
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="locality-card"
      onClick={() => navigate(`/property-list?locality=${encodeURIComponent(locality.name)}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 0.08}s`,
      }}
    >
      <img
        src={locality.image}
        alt={locality.name}
        className="locality-card-image"
        loading="lazy"
      />
      <div className="locality-card-overlay" />

      <div className="locality-card-content">
        <h3 className="locality-card-name">{locality.name}</h3>
        <p className="locality-card-desc">{locality.description}</p>

        <div className="locality-card-meta">
          <div className="locality-card-stat">
            <span className="locality-card-stat-value">
              {locality.propertyCount}
            </span>
            <span className="locality-card-stat-label">Properties</span>
          </div>

          <div className="locality-card-divider" />

          <div className="locality-card-stat">
            <span className="locality-card-stat-value">
              {locality.startingPrice}
            </span>
            <span className="locality-card-stat-label">Starting</span>
          </div>
        </div>

        <button
          className="locality-card-cta"
        >
          Explore
          <span
            className="locality-card-cta-arrow"
            style={{
              display: "inline-block",
              transition: "transform 0.3s ease",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
            }}
          >
            →
          </span>
        </button>
      </div>
    </div>
  );
}

export default function AreaSection() {
  const { ref, visible } = useIntersectionObserver(0.1);

  return (
    <section ref={ref} className="localities-section">
      <div className="localities-container">
        <div
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transition: "all 0.7s ease",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: "rgba(96, 165, 250, 0.15)",
              color: "#60a5fa",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              padding: "6px 14px",
              borderRadius: 100,
              marginBottom: 14,
              fontFamily: "'DM Sans', sans-serif",
              textTransform: "uppercase",
            }}
          >
            Nagpur Real Estate
          </span>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}
          >
            Popular <span style={{ color: "#60a5fa" }}>Localities</span>
          </h2>

          <p
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: 17,
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Discover Nagpur's most sought-after residential neighborhoods
          </p>
        </div>

        <div className="localities-grid">
          {NAGPUR_LOCALITIES.map((locality, i) => (
            <LocalityCard
              key={locality.id}
              locality={locality}
              visible={visible}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
