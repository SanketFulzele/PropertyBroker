const EmptyState = ({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
}: {
  icon: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "80px 24px",
      minHeight: 400,
    }}
  >
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 36,
        marginBottom: 24,
      }}
    >
      {icon}
    </div>

    <h3
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 24,
        fontWeight: 700,
        color: "#1a3c5e",
        margin: "0 0 8px",
      }}
    >
      {title}
    </h3>

    <p
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 15,
        color: "#64748b",
        margin: "0 0 28px",
        maxWidth: 360,
      }}
    >
      {description}
    </p>

    {buttonText && onButtonClick && (
      <button
        onClick={onButtonClick}
        style={{
          padding: "12px 28px",
          borderRadius: 12,
          border: "none",
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
          transition: "all 0.25s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 99, 235, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(37, 99, 235, 0.3)";
        }}
      >
        {buttonText}
      </button>
    )}
  </div>
);

export default EmptyState;
