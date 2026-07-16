import { useState } from "react";
import type { Property } from "../types/types";
import { Badge, Button } from "../baseComponents";

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
        position: "relative",
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
      {/* Stretched Link Overlay for Card Navigation */}
      <a
        href={`/property/${prop.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          borderRadius: 20,
        }}
        aria-label={`View details of ${prop.title}`}
      />
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
        <Badge
          text={prop.badge}
          background={prop.badgeColor}
          color="#fff"
          size={11}
          padding="4px 12px"
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            letterSpacing: 0.5,
          }}
        />
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
            { icon: "📍", val: prop.locality },
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

        {prop.bathrooms > 0 && (
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 12,
              fontSize: 12,
              color: "#64748b",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span>{prop.bathrooms} Bath{prop.bathrooms > 1 ? "s" : ""}</span>
            <span>·</span>
            <span>{prop.floor}</span>
            <span>·</span>
            <span>{prop.facing}</span>
          </div>
        )}

        <div
          style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}
        >
          {prop.amenities.slice(0, 3).map((a) => (
            <Badge
              key={a}
              text={`✓ ${a}`}
              background="#eff6ff"
              color="#3b82f6"
              size={11}
              padding="4px 10px"
              borderRadius={100}
              style={{ fontWeight: 600 }}
            />
          ))}
          {prop.amenities.length > 3 && (
            <Badge
              text={`+${prop.amenities.length - 3} more`}
              background="#f8fafc"
              color="#94a3b8"
              size={11}
              padding="4px 10px"
              borderRadius={100}
              style={{ fontWeight: 600 }}
            />
          )}
        </div>

        <div style={{ display: "flex", gap: 10, position: "relative", zIndex: 2 }}>
          <a
            href={`https://wa.me/919921215145?text=${encodeURIComponent(
              `Hello,\n\nI am interested in getting contact details for the builder of:\n\nProperty: ${prop.title}\nLocation: ${prop.locality}, ${prop.city}\nPrice: ${prop.price}\n\nCan you please assist?\n\nLink: ${window.location.origin}/property/${prop.slug}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flex: 1, textDecoration: "none" }}
          >
            <Button
              variant="outline"
              size="sm"
              style={{ width: "100%", padding: "11px 0", borderRadius: 10, fontSize: 13 }}
            >
              Contact Builder
            </Button>
          </a>
          <a
            href={`/property/${prop.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flex: 1, textDecoration: "none" }}
          >
            <Button
              variant="primary"
              size="sm"
              style={{ width: "100%", padding: "11px 0", borderRadius: 10, fontSize: 13 }}
            >
              View Details
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
