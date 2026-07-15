import React, { useState } from "react";

const FeatureCard = ({
  icon,
  title,
  description,
  index,
  style = {},
}: {
  icon: string;
  title: string;
  description: string;
  index: number;
  style?: React.CSSProperties;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "40px 32px",
        border: "1px solid #f1f5f9",
        boxShadow: hovered
          ? "0 20px 40px rgba(0, 0, 0, 0.08)"
          : "0 4px 20px rgba(0, 0, 0, 0.03)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.3s ease",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: index % 2 === 0 ? "rgba(37, 99, 235, 0.05)" : "rgba(16, 185, 129, 0.05)",
        }}
      />
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 20,
          background: index % 2 === 0 ? "rgba(37, 99, 235, 0.1)" : "rgba(16, 185, 129, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          margin: "0 auto 20px",
          position: "relative",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 20,
          fontWeight: 700,
          color: "#1a3c5e",
          margin: "0 0 12px",
          position: "relative",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: "#64748b",
          lineHeight: 1.7,
          margin: 0,
          position: "relative",
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
