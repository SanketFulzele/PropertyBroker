import { useState, useRef, useEffect, useCallback } from "react";

const SearchableMultiSelect = ({
  label,
  options,
  selected,
  onChange,
  placeholder = "Search...",
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = useCallback(
    (value: string) => {
      if (selected.includes(value)) {
        onChange(selected.filter((s) => s !== value));
      } else {
        onChange([...selected, value]);
      }
    },
    [selected, onChange]
  );

  const clearAll = useCallback(() => {
    onChange([]);
    setSearch("");
  }, [onChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ marginBottom: 0, position: "relative" }}>
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
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
          }
        }}
        style={{
          minHeight: 40,
          padding: "8px 12px",
          border: "1.5px solid #e2e8f0",
          borderRadius: 10,
          background: "#f8fafc",
          cursor: "pointer",
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          alignItems: "center",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      >
        {selected.length === 0 && !isOpen && (
          <span style={{ color: "#94a3b8", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
            {placeholder}
          </span>
        )}
        {selected.map((value) => (
          <span
            key={value}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 8px",
              background: "#eff6ff",
              color: "#2563eb",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {value}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle(value);
              }}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: "pointer",
                padding: 0,
                fontSize: 14,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 4,
            background: "#fff",
            border: "1.5px solid #e2e8f0",
            borderRadius: 10,
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            zIndex: 100,
            maxHeight: 240,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "8px 12px", borderBottom: "1px solid #f1f5f9" }}>
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search localities..."
              style={{
                width: "100%",
                padding: "8px 10px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {selected.length > 0 && (
            <button
              onClick={clearAll}
              style={{
                background: "none",
                border: "none",
                borderBottom: "1px solid #f1f5f9",
                color: "#ef4444",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                padding: "8px 12px",
                textAlign: "left",
              }}
            >
              Clear all ({selected.length})
            </button>
          )}

          <div style={{ overflowY: "auto", maxHeight: 180 }}>
            {filteredOptions.length === 0 ? (
              <div
                style={{
                  padding: "12px",
                  textAlign: "center",
                  color: "#94a3b8",
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                No localities found
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = selected.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: isSelected ? "#2563eb" : "#475569",
                      background: isSelected ? "#f0f7ff" : "transparent",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggle(opt.value)}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        accentColor: "#2563eb",
                        cursor: "pointer",
                      }}
                    />
                    {opt.label}
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableMultiSelect;
