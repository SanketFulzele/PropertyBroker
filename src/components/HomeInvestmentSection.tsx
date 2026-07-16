import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "../hooks/hooks";
import { Train, Building2, IndianRupee, TrendingUp, Landmark } from "lucide-react";
import type { InvestmentFeature } from "../types/types";

const FEATURES: InvestmentFeature[] = [
  {
    icon: Train,
    title: "Metro Connectivity",
    desc: "Rapidly improving public transport and excellent road connectivity make commuting easier across the city.",
  },
  {
    icon: Building2,
    title: "MIHAN Growth Corridor",
    desc: "One of India's largest integrated industrial and IT hubs driving employment and increasing property demand.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Property Prices",
    desc: "Own a quality home at prices significantly lower than many major metropolitan cities.",
  },
  {
    icon: TrendingUp,
    title: "High Rental Demand",
    desc: "Growing demand from professionals, students, and families provides attractive rental opportunities.",
  },
  {
    icon: Landmark,
    title: "Future Infrastructure",
    desc: "Ongoing developments including highways, commercial projects, and smart city initiatives continue to increase property value.",
  },
];

export default function HomeInvestmentSection() {
  const { ref, visible } = useIntersectionObserver();
  const navigate = useNavigate();

  return (
    <section
      ref={ref}
      style={{
        padding: "100px 40px",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: 100,
              background: "rgba(96,165,250,0.15)",
              border: "1px solid rgba(96,165,250,0.3)",
              color: "#60a5fa",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: 0.5,
              marginBottom: 20,
            }}
          >
            Investment Opportunity
          </span>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 16px",
            }}
          >
            Why Invest in Nagpur?
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 17,
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
              maxWidth: 700,
              lineHeight: 1.7,
            }}
          >
            Nagpur is one of India's fastest-growing cities with expanding infrastructure,
            excellent connectivity, and affordable property prices. Whether you're buying your
            first home or investing for the future, Nagpur offers strong long-term value.
          </p>
        </div>

        {/* Feature Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 20,
            marginBottom: 48,
          }}
          className="investment-features-grid"
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;

            return (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 20,
                  padding: "32px 24px",
                  textAlign: "center",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.08}s`,
                  cursor: "default",
                }}
                className="investment-feature-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(37,99,235,0.2)";
                  e.currentTarget.style.borderColor = "rgba(96,165,250,0.4)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: "rgba(96,165,250,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <Icon size={28} strokeWidth={2} color="#60a5fa" />
                </div>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#fff",
                    margin: "0 0 10px",
                    lineHeight: 1.3,
                  }}
                >
                  {f.title}
                </h3>

                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 13,
                    lineHeight: 1.7,
                    margin: 0,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.5s",
          }}
        >
          <button
            onClick={() => navigate("/filter")}
            style={{
              padding: "16px 40px",
              borderRadius: 12,
              border: "2px solid rgba(96,165,250,0.5)",
              background: "rgba(96,165,250,0.1)",
              color: "#60a5fa",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(96,165,250,0.25)";
              e.currentTarget.style.borderColor = "#60a5fa";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(96,165,250,0.1)";
              e.currentTarget.style.borderColor = "rgba(96,165,250,0.5)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Explore Investment Areas
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .investment-features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .investment-feature-card:last-child {
            grid-column: 1 / -1;
            max-width: 50%;
            justify-self: center;
          }
        }
        @media (max-width: 640px) {
          .investment-features-grid {
            grid-template-columns: 1fr !important;
          }
          .investment-feature-card:last-child {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
