const Badge = ({
  text,
  background = "#eff6ff",
  color = "#2563eb",
  size = 12,
  padding = "6px 14px",
  borderRadius = 100,
  style = {},
  onClick,
}: {
  text: string;
  background?: string;
  color?: string;
  size?: number;
  padding?: string;
  borderRadius?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => (
  <span
    onClick={onClick}
    style={{
      background,
      color,
      fontSize: size,
      fontWeight: 700,
      letterSpacing: 2,
      padding,
      borderRadius,
      display: "inline-block",
      fontFamily: "'DM Sans', sans-serif",
      textTransform: "uppercase" as const,
      cursor: onClick ? "pointer" : "default",
      transition: "all 0.2s",
      ...style,
    }}
  >
    {text}
  </span>
);

export default Badge;
