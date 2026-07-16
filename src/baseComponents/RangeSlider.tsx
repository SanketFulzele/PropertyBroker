import { useState, useEffect } from "react";

const RangeSlider = ({
  label,
  min,
  max,
  value,
  onChange,
  formatValue,
  step = 1,
}: {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue: (val: number) => string;
  step?: number;
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), localValue[1] - step);
    setLocalValue([newMin, localValue[1]]);
    onChange([newMin, localValue[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), localValue[0] + step);
    setLocalValue([localValue[0], newMax]);
    onChange([localValue[0], newMax]);
  };

  return (
    <div style={{ marginBottom: 0, minWidth: 0, overflow: "hidden" }}>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "#2563eb",
            background: "#eff6ff",
            padding: "4px 8px",
            borderRadius: 6,
            minWidth: 60,
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {formatValue(localValue[0])}
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: "#94a3b8",
            flexShrink: 0,
          }}
        >
          to
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "#2563eb",
            background: "#eff6ff",
            padding: "4px 8px",
            borderRadius: 6,
            minWidth: 60,
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {formatValue(localValue[1])}
        </span>
      </div>
      <div style={{ padding: "0 12px" }}>
        <div style={{ position: "relative", height: 24 }}>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localValue[0]}
            onChange={handleMinChange}
            style={{
              position: "absolute",
              width: "100%",
              height: 24,
              top: 0,
              appearance: "none",
              background: "transparent",
              zIndex: 4,
              cursor: "pointer",
              pointerEvents: "none",
              margin: 0,
              padding: 0,
            }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localValue[1]}
            onChange={handleMaxChange}
            style={{
              position: "absolute",
              width: "100%",
              height: 24,
              top: 0,
              appearance: "none",
              background: "transparent",
              zIndex: 4,
              cursor: "pointer",
              pointerEvents: "none",
              margin: 0,
              padding: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 0,
              right: 0,
              height: 4,
              background: "#e2e8f0",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 10,
              left: `${((localValue[0] - min) / (max - min)) * 100}%`,
              width: `${((localValue[1] - localValue[0]) / (max - min)) * 100}%`,
              height: 4,
              background: "#2563eb",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 4,
              left: `${((localValue[0] - min) / (max - min)) * 100}%`,
              width: 16,
              height: 16,
              background: "#fff",
              border: "2px solid #2563eb",
              borderRadius: "50%",
              transform: "translateX(-50%)",
              zIndex: 3,
              boxShadow: "0 2px 6px rgba(37,99,235,0.3)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 4,
              left: `${((localValue[1] - min) / (max - min)) * 100}%`,
              width: 16,
              height: 16,
              background: "#fff",
              border: "2px solid #2563eb",
              borderRadius: "50%",
              transform: "translateX(-50%)",
              zIndex: 3,
              boxShadow: "0 2px 6px rgba(37,99,235,0.3)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
