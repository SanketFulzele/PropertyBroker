import { useState } from "react";
import { CITIES } from "../data/data";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"Buy" | "Rent" | "Sell">("Buy");
  const [searchCity, setSearchCity] = useState("Mumbai");

  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "flex-start", // changed from center
        justifyContent: "center",
        paddingTop: "120px", // pushes content below navbar
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.35)",
        }}
      />

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,58,138,0.5) 50%, rgba(15,23,42,0.8) 100%)",
        }}
      />

      {/* Mesh grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.07,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 900,
          width: "100%",
          animation: "fadeUp 1s ease both",
        }}
      >


        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 999,
              padding: "6px 18px",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 8px #10b981",
              }}
            />
            <span
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "0.3px",
              }}
            >
              Nagpur's most trusted property platform
            </span>
          </div>
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(42px, 7vw, 80px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: 20,
            letterSpacing: "-1px",
          }}
        >
          Find Your
          <br />
          <span style={{ color: "#60a5fa" }}>Perfect Home</span>
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "clamp(16px, 2vw, 20px)",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.6,
            marginBottom: 44,
          }}
        >
          Discover 2.5 lakh+ verified properties across 50+ Indian cities.
          <br />Your dream home is one search away.
        </p>

        {/* Search Card */}
       {/* Search Card */}
<div
  style={{
    background: "rgba(255,255,255,0.97)",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
    backdropFilter: "blur(20px)",
    maxWidth: 780,
    margin: "20px auto 80px", // 🔥 KEY FIX (top + bottom spacing)
  }}
>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #f1f5f9" }}>
            {(["Buy", "Rent", "Sell"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "16px 0",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 15,
                  fontFamily: "'DM Sans', sans-serif",
                  background: activeTab === tab ? "#fff" : "#f8fafc",
                  color: activeTab === tab ? "#2563eb" : "#94a3b8",
                  borderBottom:
                    activeTab === tab
                      ? "2px solid #2563eb"
                      : "2px solid transparent",
                  transition: "all 0.25s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Row */}
          <div
            style={{
              display: "flex",
              gap: 0,
              padding: "20px 20px",
              alignItems: "center",
            }}
          >
            <select
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              style={{
                padding: "14px 16px",
                border: "1.5px solid #e2e8f0",
                borderRadius: "10px 0 0 10px",
                fontSize: 15,
                fontFamily: "'DM Sans', sans-serif",
                color: "#1e293b",
                background: "#fff",
                cursor: "pointer",
                minWidth: 140,
                outline: "none",
              }}
            >
              {CITIES.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>

            <input
              placeholder="Search locality, project, or builder…"
              style={{
                flex: 1,
                padding: "14px 20px",
                border: "1.5px solid #e2e8f0",
                borderLeft: "none",
                borderRight: "none",
                fontSize: 15,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                color: "#1e293b",
              }}
            />

            <button
              style={{
                padding: "14px 28px",
                borderRadius: "0 10px 10px 0",
                border: "none",
                background:
                  "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "nowrap",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              Search →
            </button>
          </div>

          <div
            style={{
              padding: "0 20px 16px",
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {[
              "2 BHK Flats",
              "Villas",
              "Plots",
              "Ready to Move",
              "Under ₹50L",
            ].map((tag) => (
              <button
                key={tag}
                style={{
                  padding: "6px 14px",
                  borderRadius: 100,
                  border: "1.5px solid #e2e8f0",
                  background: "#f8fafc",
                  fontSize: 12,
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#64748b",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#eff6ff";
                  e.currentTarget.style.color = "#2563eb";
                  e.currentTarget.style.borderColor = "#bfdbfe";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.color = "#64748b";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 1,
          animation: "bounce 2s infinite",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 12,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
          }}
        />
      </div>
    </section>
  );
}