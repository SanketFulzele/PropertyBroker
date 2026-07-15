import { CheckboxGroup } from "../baseComponents";

interface FilterSidebarProps {
  selectedTypes: string[];
  selectedBhk: string[];
  selectedFurnishing: string[];
  selectedAvailability: string[];
  selectedParking: string[];
  selectedAmenities: string[];
  selectedCity: string;
  priceMin: string;
  priceMax: string;
  onTypeChange: (types: string[]) => void;
  onBhkChange: (bhk: string[]) => void;
  onFurnishingChange: (furnishing: string[]) => void;
  onAvailabilityChange: (availability: string[]) => void;
  onParkingChange: (parking: string[]) => void;
  onAmenitiesChange: (amenities: string[]) => void;
  onCityChange: (city: string) => void;
  onPriceMinChange: (val: string) => void;
  onPriceMaxChange: (val: string) => void;
  onClear: () => void;
}

const PROPERTY_TYPES = ["Apartment", "Villa", "Plot", "Commercial"];
const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"];
const FURNISHING_OPTIONS = ["Furnished", "Semi Furnished", "Unfurnished"];
const AVAILABILITY_OPTIONS = ["Ready to Move", "Under Construction"];
const PARKING_OPTIONS = ["Covered", "Open", "None"];
const AMENITY_OPTIONS = ["Gym", "Lift", "Garden", "Swimming Pool", "Club House", "Security"];
const CITY_OPTIONS = ["Mumbai", "Bengaluru", "Delhi", "Pune"];

export default function FilterSidebar({
  selectedTypes,
  selectedBhk,
  selectedFurnishing,
  selectedAvailability,
  selectedParking,
  selectedAmenities,
  selectedCity,
  priceMin,
  priceMax,
  onTypeChange,
  onBhkChange,
  onFurnishingChange,
  onAvailabilityChange,
  onParkingChange,
  onAmenitiesChange,
  onCityChange,
  onPriceMinChange,
  onPriceMaxChange,
  onClear,
}: FilterSidebarProps) {
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    color: "#1a3c5e",
    background: "#f8fafc",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 16,
    fontWeight: 700,
    color: "#1a3c5e",
    marginBottom: 14,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 22,
            fontWeight: 800,
            color: "#1a3c5e",
            margin: 0,
          }}
        >
          Filters
        </h3>
        <button
          onClick={onClear}
          style={{
            padding: "6px 16px",
            borderRadius: 100,
            border: "1.5px solid #ef4444",
            background: "transparent",
            color: "#ef4444",
            fontWeight: 700,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fef2f2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Clear All
        </button>
      </div>

      <div
        style={{ height: 1, background: "#e2e8f0", margin: "-4px 0" }}
      />

      <div>
        <div style={sectionLabelStyle}>Property Type</div>
        <CheckboxGroup
          label=""
          options={PROPERTY_TYPES}
          selected={selectedTypes}
          onChange={onTypeChange}
          maxVisible={10}
        />
      </div>

      <div>
        <div style={sectionLabelStyle}>Price Range</div>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="text"
            placeholder="Min (e.g. 50 L)"
            value={priceMin}
            onChange={(e) => onPriceMinChange(e.target.value)}
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = "#2563eb";
              e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow = "none";
            }}
          />
          <input
            type="text"
            placeholder="Max (e.g. 3 Cr)"
            value={priceMax}
            onChange={(e) => onPriceMaxChange(e.target.value)}
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = "#2563eb";
              e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>BHK</div>
        <CheckboxGroup
          label=""
          options={BHK_OPTIONS}
          selected={selectedBhk}
          onChange={onBhkChange}
          maxVisible={10}
        />
      </div>

      <div>
        <div style={sectionLabelStyle}>Location</div>
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          style={{
            ...inputStyle,
            cursor: "pointer",
            appearance: "none" as const,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 14px center",
            paddingRight: 38,
          }}
        >
          <option value="">All Cities</option>
          {CITY_OPTIONS.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div style={sectionLabelStyle}>Furnishing</div>
        <CheckboxGroup
          label=""
          options={FURNISHING_OPTIONS}
          selected={selectedFurnishing}
          onChange={onFurnishingChange}
          maxVisible={10}
        />
      </div>

      <div>
        <div style={sectionLabelStyle}>Availability</div>
        <CheckboxGroup
          label=""
          options={AVAILABILITY_OPTIONS}
          selected={selectedAvailability}
          onChange={onAvailabilityChange}
          maxVisible={10}
        />
      </div>

      <div>
        <div style={sectionLabelStyle}>Possession</div>
        <select
          value=""
          style={{
            ...inputStyle,
            cursor: "pointer",
            appearance: "none" as const,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 14px center",
            paddingRight: 38,
          }}
        >
          <option value="">Any Time</option>
          <option value="Immediate">Immediate</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>

      <div>
        <div style={sectionLabelStyle}>Parking</div>
        <CheckboxGroup
          label=""
          options={PARKING_OPTIONS}
          selected={selectedParking}
          onChange={onParkingChange}
          maxVisible={10}
        />
      </div>

      <div>
        <div style={sectionLabelStyle}>Amenities</div>
        <CheckboxGroup
          label=""
          options={AMENITY_OPTIONS}
          selected={selectedAmenities}
          onChange={onAmenitiesChange}
          maxVisible={10}
        />
      </div>
    </div>
  );
}
