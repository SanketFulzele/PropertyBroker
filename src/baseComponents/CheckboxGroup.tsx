import { useState } from "react";

const CheckboxGroup = ({
  label,
  options,
  selected,
  onChange,
  maxVisible = 5,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxVisible?: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const visibleOptions = expanded ? options : options.slice(0, maxVisible);

  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div style={{ marginBottom: 0 }}>
      <h4
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: "#1a3c5e",
          margin: "0 0 12px",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </h4>
      {visibleOptions.map((opt) => (
        <label
          key={opt}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#475569",
            transition: "color 0.2s",
          }}
        >
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => toggle(opt)}
            style={{
              width: 18,
              height: 18,
              borderRadius: 6,
              accentColor: "#2563eb",
              cursor: "pointer",
            }}
          />
          {opt}
        </label>
      ))}
      {options.length > maxVisible && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            padding: 0,
            marginTop: 4,
          }}
        >
          {expanded ? "Show less" : `+${options.length - maxVisible} more`}
        </button>
      )}
    </div>
  );
};

export default CheckboxGroup;
