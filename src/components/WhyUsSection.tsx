import { useIntersectionObserver } from "../hooks/hooks";
import { ShieldCheck, Search, PhoneCall, Trophy } from "lucide-react";

export default function WhyUsSection() {
  const { ref, visible } = useIntersectionObserver();

  const features = [
    {
      icon: ShieldCheck,
      title: "RERA Verified",
      desc: "Every listing verified with RERA registration for complete legal safety.",
    },
    {
      icon: Search,
      title: "Smart Search",
      desc: "AI-powered filters to match your budget, location, and lifestyle preferences.",
    },
    {
      icon: PhoneCall,
      title: "Expert Connect",
      desc: "Dedicated property advisors available 7 days a week for personal guidance.",
    },
    {
      icon: Trophy,
      title: "1.2M+ Transactions",
      desc: "India's most trusted platform with over a decade of real estate expertise.",
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        padding: "100px 40px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Heading */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transition: "all 0.7s ease",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 16px",
            }}
          >
            Why Choose PropertyBroker?
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 17,
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
            }}
          >
            Built for India's homebuyers. Trusted by millions.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 20,
                  padding: "32px 28px",
                  textAlign: "center",
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? "translateY(0)"
                    : "translateY(40px)",
                  transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${
                    i * 0.1
                  }s`,
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(37,99,235,0.2)";
                  e.currentTarget.style.borderColor =
                    "rgba(96,165,250,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.12)";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    marginBottom: 20,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    size={40}
                    strokeWidth={2.2}
                    color="#60a5fa"
                  />
                </div>

                <h3
                  style={{
                    fontFamily:
                      "'Playfair Display', Georgia, serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#fff",
                    margin: "0 0 12px",
                  }}
                >
                  {f.title}
                </h3>

                <p
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: 14,
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
      </div>
    </section>
  );
}