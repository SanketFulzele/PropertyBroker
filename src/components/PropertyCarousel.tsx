import { useCallback, useState } from "react";
import type { MouseEvent } from "react";
import { PROPERTIES } from "../data/data";
import PropertyCard from "./PropertyCard";
import { SectionHeader } from "../baseComponents";

export default function PropertyCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
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
      style={{ padding: "100px 0", background: "#f8fafc", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
          }}
        >
          <SectionHeader
            badge="Featured Properties"
            heading="Handpicked Homes"
            accentText="Just for You"
            headingSize="clamp(30px, 4vw, 48px)"
            align="left"
            subtitle=""
            headingStyle={{ margin: 0, lineHeight: 1.2 }}
            badgeStyle={{ marginBottom: 14 }}
          />
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
                visible={true}
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
