import { useIntersectionObserver } from "../hooks/hooks";

export default function CTASection() {
  const { ref, visible } = useIntersectionObserver();

  return (
    <section
      ref={ref}
      style={{
        padding: "100px 40px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
          background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
          borderRadius: 28,
          padding: "72px 48px",
          boxShadow: "0 25px 60px rgba(37,99,235,0.3)",
          position: "relative",
          overflow: "hidden",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
          transition: "all 0.8s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 16px",
            position: "relative",
          }}
        >
          Ready to Find Your Dream Home?
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: 18,
            fontFamily: "'DM Sans', sans-serif",
            margin: "0 0 40px",
            lineHeight: 1.6,
            position: "relative",
          }}
        >
          Join 1.2 million happy homeowners who found their perfect property on PropertyBroker.
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            position: "relative",
          }}
        >
          <button
            style={{
              padding: "16px 36px",
              borderRadius: 12,
              border: "none",
              background: "#fff",
              color: "#1e3a5f",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Browse Properties →
          </button>
          <button
            style={{
              padding: "16px 36px",
              borderRadius: 12,
              border: "2px solid rgba(255,255,255,0.4)",
              background: "transparent",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Talk to an Advisor
          </button>
        </div>
      </div>
    </section>
  );
}