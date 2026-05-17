import { useCallback, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useIntersectionObserver } from "../hooks/hooks";
import { PROPERTIES } from "../data/data";
import type { Property } from "../types/types";

export default function PropertyCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const { ref, visible } = useIntersectionObserver(0.1);
  const trackRef = useRef<HTMLDivElement>(null);
  const CARD_W = 380;
  const GAP = 24;

  const next = useCallback(
    () => setActiveIdx((i) => Math.min(i + 1, PROPERTIES.length - 1)),
    []
  );
  const prev = useCallback(
    () => setActiveIdx((i) => Math.max(i - 1, 0)),
    []
  );

  const handleMouseDown = (e: MouseEvent) => {
    setDragging(true);
    setStartX(e.clientX);
    setTranslateX(0);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setTranslateX(e.clientX - startX);
  };

  const handleMouseUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (translateX < -60) next();
    else if (translateX > 60) prev();
    setTranslateX(0);
  };

  const offset = -(activeIdx * (CARD_W + GAP)) + translateX;

  return (
    <section
      id="buy"
      ref={ref}
      style={{ padding: "100px 0", background: "#f8fafc", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                background: "#eff6ff",
                color: "#2563eb",
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
              Featured Properties
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(30px, 4vw, 48px)",
                fontWeight: 800,
                color: "#1a3c5e",
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Handpicked Homes
              <br />
              <span style={{ color: "#2563eb" }}>Just for You</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 12, paddingBottom: 4 }}>
            {[prev, next].map((fn, i) => (
              <button
                key={i}
                onClick={fn}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  border: "1.5px solid #e2e8f0",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  opacity:
                    i === 0
                      ? activeIdx === 0
                        ? 0.35
                        : 1
                      : activeIdx === PROPERTIES.length - 1
                      ? 0.35
                      : 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#2563eb";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "#000";
                }}
              >
                {i === 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            overflow: "hidden",
            margin: "0 -40px",
            padding: "0 40px",
            cursor: dragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: GAP,
              transform: `translateX(${offset}px)`,
              transition: dragging
                ? "none"
                : "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
              userSelect: "none",
            }}
          >
            {PROPERTIES.map((prop, i) => (
              <PropertyCard
                key={prop.id}
                prop={prop}
                delay={i * 0.05}
                visible={visible}
                width={CARD_W}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginTop: 36,
          }}
        >
          {PROPERTIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                width: i === activeIdx ? 28 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                background: i === activeIdx ? "#2563eb" : "#cbd5e1",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyCard({
  prop,
  delay,
  visible,
  width,
}: {
  prop: Property;
  delay: number;
  visible: boolean;
  width: number;
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