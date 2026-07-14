import { useState } from "react";
import type { Property } from "../types/types";

export default function PropertyCard({
  prop,
  delay,
  visible,
  width = 380,
}: {
  prop: Property;
  delay: number;
  visible: boolean;
  width?: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: width,
        borderRadius: 20,
        overflow: "hidden",
        background: "#fff",
        boxShadow: hovered
          ? "0 20px 60px rgba(37,99,235,0.18), 0 2px 12px rgba(0,0,0,0.06)"
          : "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}s`,
        cursor: "pointer",
        border: "1px solid #f1f5f9",
      }}
    >
      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
        <img
          src={prop.image}
          alt={prop.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(15,23,42,0.7) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            background: prop.badgeColor,
            color: "#fff",
            padding: "4px 12px",
            borderRadius: 100,
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: 0.5,
          }}
        >
          {prop.badge}
        </div>
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "rgba(255,255,255,0.95)",
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: 11,
            fontWeight: 600,
            color: "#64748b",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          🏢 {prop.type}
        </div>
        <div style={{ position: "absolute", bottom: 14, left: 14 }}>
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {prop.price}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 12,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {prop.pricePerSqft}
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 22px" }}>
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 20,
            fontWeight: 700,
            color: "#1a3c5e",
            margin: "0 0 4px",
          }}
        >
          {prop.title}
        </h3>
        <p
          style={{
            color: "#64748b",
            fontSize: 13,
            margin: "0 0 16px",
            fontFamily: "'DM Sans', sans-serif",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          📍 {prop.location}
        </p>

        <div
          style={{
            display: "flex",
            gap: 0,
            marginBottom: 16,
            border: "1px solid #f1f5f9",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {[
            { icon: "🛏", val: prop.bhk },
            { icon: "📐", val: prop.area },
            { icon: "🏙", val: prop.city },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "10px 8px",
                textAlign: "center",
                borderRight: i < 2 ? "1px solid #f1f5f9" : "none",
                background: "#fafafa",
              }}
            >
              <div style={{ fontSize: 15 }}>{item.icon}</div>
              <div
                style={{
                  fontSize: 11,
                  color: "#475569",
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  marginTop: 2,
                }}
              >
                {item.val}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}
        >
          {prop.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              style={{
                padding: "4px 10px",
                borderRadius: 100,
                background: "#eff6ff",
                color: "#3b82f6",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ✓ {a}
            </span>
          ))}
          {prop.amenities.length > 3 && (
            <span
              style={{
                padding: "4px 10px",
                borderRadius: 100,
                background: "#f8fafc",
                color: "#94a3b8",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              +{prop.amenities.length - 3} more
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            style={{
              flex: 1,
              padding: "11px 0",
              borderRadius: 10,
              border: "1.5px solid #2563eb",
              background: "transparent",
              color: "#2563eb",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#eff6ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Contact Builder
          </button>
          <button
            style={{
              flex: 1,
              padding: "11px 0",
              borderRadius: 10,
              border: "none",
              background:
                "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
