const Button = ({
  children,
  variant = "primary",
  onClick,
  href,
  size = "md",
  icon,
  fullWidth = false,
  style = {},
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "danger";
  onClick?: () => void;
  href?: string;
  size?: "sm" | "md" | "lg";
  icon?: string;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}) => {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700,
    borderRadius: size === "lg" ? 16 : 12,
    cursor: "pointer",
    transition: "all 0.25s",
    textDecoration: "none",
    whiteSpace: "nowrap" as const,
    ...(fullWidth ? { width: "100%" } : {}),
  };

  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: "8px 16px", fontSize: 13 },
    md: { padding: "10px 20px", fontSize: 14 },
    lg: { padding: "14px 28px", fontSize: 15 },
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
      color: "#fff",
      border: "none",
      boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
    },
    outline: {
      background: "transparent",
      color: "#2563eb",
      border: "2px solid #2563eb",
    },
    ghost: {
      background: "rgba(255, 255, 255, 0.1)",
      color: "#fff",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    danger: {
      background: "#fee2e2",
      color: "#dc2626",
      border: "none",
    },
  };

  const hoverVariants: Record<string, React.CSSProperties> = {
    primary: { transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(37, 99, 235, 0.4)" },
    outline: { background: "rgba(37, 99, 235, 0.05)", transform: "translateY(-2px)" },
    ghost: { background: "rgba(255, 255, 255, 0.2)" },
    danger: { background: "#fecaca" },
  };

  const combined = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  const content = (
    <>
      {children}
      {icon && <span>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        style={combined}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget, hoverVariants[variant]);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget, combined);
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      style={combined}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget, hoverVariants[variant]);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget, combined);
      }}
    >
      {content}
    </button>
  );
};

export default Button;
