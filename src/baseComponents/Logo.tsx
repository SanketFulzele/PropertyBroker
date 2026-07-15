const Logo = ({
  size = "md",
  style = {},
}: {
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}) => {
  const dimensions = {
    sm: { icon: 32, fontSize: 13, text: 14 },
    md: { icon: 38, fontSize: 15, text: 16 },
    lg: { icon: 44, fontSize: 17, text: 18 },
  };

  const { icon, fontSize, text } = dimensions[size];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, ...style }}>
      <div
        style={{
          width: icon,
          height: icon,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize,
          fontWeight: 700,
          boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
        }}
      >
        N
      </div>
      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: text,
          fontWeight: 700,
          color: "#1a3c5e",
        }}
      >
        PropertyBroker
      </span>
    </div>
  );
};

export default Logo;
