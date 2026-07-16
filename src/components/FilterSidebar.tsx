import { NAGPUR_LOCALITY_NAMES } from "../data/nagpurLocalities";
import type { FilterState } from "../utils/usePropertyFilters";
import { CheckboxGroup, RangeSlider } from "../baseComponents";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClear: () => void;
}

const LOCALITY_OPTIONS = NAGPUR_LOCALITY_NAMES.map((name) => name);
const PROPERTY_TYPES = ["Apartment", "Villa", "Plot", "Commercial"];
const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"];
const FURNISHING_OPTIONS = ["Furnished", "Semi Furnished", "Unfurnished"];
const POSSESSION_OPTIONS = ["Immediate", "Within 3 Months", "Within 6 Months", "Within 1 Year", "After 1 Year"];
const AVAILABILITY_OPTIONS = ["Ready to Move", "Under Construction"];
const PROPERTY_AGE_OPTIONS = ["New Construction", "1-5 Years", "5-10 Years", "10-20 Years", "20+ Years"];
const FACING_OPTIONS = ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"];
const OWNERSHIP_OPTIONS = ["Freehold", "Leasehold", "Co-operative Society"];
const PARKING_OPTIONS = ["Covered", "Open", "None"];
const BATHROOM_OPTIONS = [1, 2, 3, 4];
const FLOOR_OPTIONS = ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor+"];

const formatBudget = (val: number): string => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(0)} L`;
  return `₹${val.toLocaleString()}`;
};

const formatArea = (val: number): string => `${val} sqft`;

export default function FilterSidebar({ filters, onFilterChange, onClear }: FilterSidebarProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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

      <div style={{ height: 1, background: "#e2e8f0", margin: "-4px 0" }} />

      <CheckboxGroup
        label="Locality"
        options={LOCALITY_OPTIONS}
        selected={filters.locality}
        onChange={(value) => onFilterChange("locality", value)}
        maxVisible={6}
      />

      <CheckboxGroup
        label="Property Type"
        options={PROPERTY_TYPES}
        selected={filters.propertyType}
        onChange={(value) => onFilterChange("propertyType", value)}
        maxVisible={10}
      />

      <CheckboxGroup
        label="BHK"
        options={BHK_OPTIONS}
        selected={filters.bhk}
        onChange={(value) => onFilterChange("bhk", value)}
        maxVisible={10}
      />

      <RangeSlider
        label="Budget"
        min={500000}
        max={50000000}
        value={[filters.budgetMin, filters.budgetMax]}
        onChange={(value) => {
          onFilterChange("budgetMin", value[0]);
          onFilterChange("budgetMax", value[1]);
        }}
        formatValue={formatBudget}
        step={500000}
      />

      <RangeSlider
        label="Area (sqft)"
        min={300}
        max={6000}
        value={[filters.areaMin, filters.areaMax]}
        onChange={(value) => {
          onFilterChange("areaMin", value[0]);
          onFilterChange("areaMax", value[1]);
        }}
        formatValue={formatArea}
        step={100}
      />

      <CheckboxGroup
        label="Furnishing"
        options={FURNISHING_OPTIONS}
        selected={filters.furnished}
        onChange={(value) => onFilterChange("furnished", value)}
        maxVisible={10}
      />

      <CheckboxGroup
        label="Possession Status"
        options={POSSESSION_OPTIONS}
        selected={filters.possession}
        onChange={(value) => onFilterChange("possession", value)}
        maxVisible={10}
      />

      <CheckboxGroup
        label="Availability"
        options={AVAILABILITY_OPTIONS}
        selected={filters.availability}
        onChange={(value) => onFilterChange("availability", value)}
        maxVisible={10}
      />

      <CheckboxGroup
        label="Property Age"
        options={PROPERTY_AGE_OPTIONS}
        selected={filters.propertyAge}
        onChange={(value) => onFilterChange("propertyAge", value)}
        maxVisible={10}
      />

      <CheckboxGroup
        label="Facing"
        options={FACING_OPTIONS}
        selected={filters.facing}
        onChange={(value) => onFilterChange("facing", value)}
        maxVisible={10}
      />

      <CheckboxGroup
        label="Ownership"
        options={OWNERSHIP_OPTIONS}
        selected={filters.ownership}
        onChange={(value) => onFilterChange("ownership", value)}
        maxVisible={10}
      />

      <CheckboxGroup
        label="Parking"
        options={PARKING_OPTIONS}
        selected={filters.parking}
        onChange={(value) => onFilterChange("parking", value)}
        maxVisible={10}
      />

      <CheckboxGroup
        label="Bathrooms"
        options={BATHROOM_OPTIONS.map(String)}
        selected={filters.bathrooms.map(String)}
        onChange={(value) => onFilterChange("bathrooms", value.map(Number))}
        maxVisible={10}
      />

      <CheckboxGroup
        label="Floor"
        options={FLOOR_OPTIONS}
        selected={filters.floor}
        onChange={(value) => onFilterChange("floor", value)}
        maxVisible={10}
      />
    </div>
  );
}
