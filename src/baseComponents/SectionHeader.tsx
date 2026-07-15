const SectionHeader = ({
  badge,
  heading,
  accentText,
  subtitle,
  align = "center",
  headingSize = "clamp(32px, 4vw, 48px)",
  subtitleMaxWidth = 600,
  badgeStyle = {},
  headingStyle = {},
  subtitleStyle = {},
}: {
  badge?: string;
  heading: string;
  accentText?: string;
  subtitle?: string;
  align?: "center" | "left";
  headingSize?: string;
  subtitleMaxWidth?: number;
  badgeStyle?: React.CSSProperties;
  headingStyle?: React.CSSProperties;
  subtitleStyle?: React.CSSProperties;
}) => {
  const renderHeading = () => {
    if (!accentText) return heading;

    const parts = heading.split(accentText);
    return (
      <>
        {parts[0]}
        <span style={{ color: "#2563eb" }}>{accentText}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div style={{ textAlign: align, marginBottom: 48 }}>
      {badge && (
        <span
          style={{
            background: "#eff6ff",
            color: "#2563eb",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
            padding: "6px 14px",
            borderRadius: 100,
            display: "inline-block",
            marginBottom: 14,
            fontFamily: "'DM Sans', sans-serif",
            textTransform: "uppercase" as const,
            ...badgeStyle,
          }}
        >
          {badge}
        </span>
      )}

      <h2
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: headingSize,
          fontWeight: 800,
          color: "#1a3c5e",
          lineHeight: 1.2,
          margin: badge ? "0 0 8px" : 0,
          ...headingStyle,
        }}
      >
        {renderHeading()}
      </h2>

      {subtitle && (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: "#64748b",
            lineHeight: 1.6,
            maxWidth: subtitleMaxWidth,
            margin: align === "center" ? "16px auto 0" : "16px 0 0",
            ...subtitleStyle,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
