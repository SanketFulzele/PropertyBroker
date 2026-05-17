import { STATS } from "../data/data";
import { useIntersectionObserver, useCountUp } from "../hooks/hooks";
import type { Stat } from "../types/types";

function StatCard({ stat, visible }: { stat: Stat; visible: boolean }) {
  const count = useCountUp(stat.value, visible);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "24px 0",
        borderRight: "1px solid #f1f5f9",
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(28px, 3.5vw, 44px)",
          fontWeight: 800,
          color: "#1a3c5e",
          lineHeight: 1,
        }}
      >
        {count}
      </div>
      <div
        style={{
          color: "#94a3b8",
          fontSize: 14,
          marginTop: 6,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const { ref, visible } = useIntersectionObserver();

  return (
    <section
      ref={ref}
      style={{
        padding: "60px 40px",
        background: "#fff",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
            }}
          >
            <StatCard stat={stat} visible={visible} />
          </div>
        ))}
      </div>
    </section>
  );
}