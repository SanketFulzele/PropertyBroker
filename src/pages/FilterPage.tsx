import { useMemo, useState } from "react";
import { FILTER_PROPERTIES } from "../data/filterProperties";
import type { Property } from "../types/types";
import PropertyCard from "../components/PropertyCard";
import FilterSidebar from "../components/FilterSidebar";
import "../styles/filterPage.css";

function parsePrice(price: string): number {
  const cleaned = price.replace(/[₹,\s]/g, "");
  if (cleaned.includes("Cr")) {
    return parseFloat(cleaned.replace("Cr", "")) * 10000000;
  }
  if (cleaned.includes("L")) {
    return parseFloat(cleaned.replace("L", "")) * 100000;
  }
  return parseFloat(cleaned) || 0;
}

export default function FilterPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBhk, setSelectedBhk] = useState<string[]>([]);
  const [selectedFurnishing, setSelectedFurnishing] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedParking, setSelectedParking] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const clearAll = () => {
    setSelectedTypes([]);
    setSelectedBhk([]);
    setSelectedFurnishing([]);
    setSelectedAvailability([]);
    setSelectedParking([]);
    setSelectedAmenities([]);
    setSelectedCity("");
    setPriceMin("");
    setPriceMax("");
  };

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedBhk.length > 0 ||
    selectedFurnishing.length > 0 ||
    selectedAvailability.length > 0 ||
    selectedParking.length > 0 ||
    selectedAmenities.length > 0 ||
    selectedCity !== "" ||
    priceMin !== "" ||
    priceMax !== "";

  const filtered = useMemo(() => {
    return FILTER_PROPERTIES.filter((prop: Property) => {
      if (selectedTypes.length > 0 && !selectedTypes.includes(prop.type)) {
        return false;
      }

      if (selectedBhk.length > 0) {
        const match = selectedBhk.some((b) => {
          if (b === "4+ BHK") {
            const num = parseInt(prop.bhk);
            return !isNaN(num) && num >= 4;
          }
          return prop.bhk === b;
        });
        if (!match) return false;
      }

      if (selectedFurnishing.length > 0 && !selectedFurnishing.includes(prop.furnished)) {
        return false;
      }

      if (selectedAvailability.length > 0 && !selectedAvailability.includes(prop.availability)) {
        return false;
      }

      if (selectedParking.length > 0 && !selectedParking.includes(prop.parking)) {
        return false;
      }

      if (selectedAmenities.length > 0) {
        const hasAll = selectedAmenities.every((a) =>
          prop.amenities.some(
            (pa) => pa.toLowerCase() === a.toLowerCase()
          )
        );
        if (!hasAll) return false;
      }

      if (selectedCity && prop.city !== selectedCity) {
        return false;
      }

      if (priceMin !== "") {
        const minVal = parsePrice(priceMin);
        if (parsePrice(prop.price) < minVal) return false;
      }

      if (priceMax !== "") {
        const maxVal = parsePrice(priceMax);
        if (parsePrice(prop.price) > maxVal) return false;
      }

      return true;
    });
  }, [
    selectedTypes,
    selectedBhk,
    selectedFurnishing,
    selectedAvailability,
    selectedParking,
    selectedAmenities,
    selectedCity,
    priceMin,
    priceMax,
  ]);

  return (
    <div className="filter-page">
      <div className="filter-header">
        <div className="filter-header-badge">Browse Properties</div>
        <h1 className="filter-header-title">
          Find Your Perfect{" "}
          <span style={{ color: "#2563eb" }}>Property</span>
        </h1>
        <p className="filter-header-sub">
          Use filters to narrow down from {FILTER_PROPERTIES.length}+ verified listings
        </p>
      </div>

      <div className="filter-layout">
        <aside className="filter-sidebar">
          <FilterSidebar
            selectedTypes={selectedTypes}
            selectedBhk={selectedBhk}
            selectedFurnishing={selectedFurnishing}
            selectedAvailability={selectedAvailability}
            selectedParking={selectedParking}
            selectedAmenities={selectedAmenities}
            selectedCity={selectedCity}
            priceMin={priceMin}
            priceMax={priceMax}
            onTypeChange={setSelectedTypes}
            onBhkChange={setSelectedBhk}
            onFurnishingChange={setSelectedFurnishing}
            onAvailabilityChange={setSelectedAvailability}
            onParkingChange={setSelectedParking}
            onAmenitiesChange={setSelectedAmenities}
            onCityChange={setSelectedCity}
            onPriceMinChange={setPriceMin}
            onPriceMaxChange={setPriceMax}
            onClear={clearAll}
          />
        </aside>

        <div className="filter-main">
          <div className="filter-result-bar">
            <div>
              <button
                className="filter-toggle-btn"
                onClick={() => setDrawerOpen(true)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="16" y2="12" />
                  <line x1="4" y1="18" x2="12" y2="18" />
                </svg>
                Filters
                {hasActiveFilters && (
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#2563eb",
                      display: "inline-block",
                    }}
                  />
                )}
              </button>
            </div>
            <div className="filter-result-count">
              Showing{" "}
              <strong>
                {filtered.length} of {FILTER_PROPERTIES.length}
              </strong>{" "}
              properties
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="filter-empty">
              <div className="filter-empty-icon">🏠</div>
              <h3 className="filter-empty-title">No properties found</h3>
              <p className="filter-empty-text">
                Try adjusting your filters or clear them to see all available
                properties.
              </p>
              <button className="filter-empty-btn" onClick={clearAll}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="filter-property-grid">
              {filtered.map((prop, i) => (
                <PropertyCard
                  key={prop.id}
                  prop={prop}
                  delay={i * 0.03}
                  visible={true}
                  width={0}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className={`filter-overlay ${drawerOpen ? "active" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />
      <div className={`filter-drawer ${drawerOpen ? "active" : ""}`}>
        <button
          className="filter-drawer-close"
          onClick={() => setDrawerOpen(false)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <FilterSidebar
          selectedTypes={selectedTypes}
          selectedBhk={selectedBhk}
          selectedFurnishing={selectedFurnishing}
          selectedAvailability={selectedAvailability}
          selectedParking={selectedParking}
          selectedAmenities={selectedAmenities}
          selectedCity={selectedCity}
          priceMin={priceMin}
          priceMax={priceMax}
          onTypeChange={setSelectedTypes}
          onBhkChange={setSelectedBhk}
          onFurnishingChange={setSelectedFurnishing}
          onAvailabilityChange={setSelectedAvailability}
          onParkingChange={setSelectedParking}
          onAmenitiesChange={setSelectedAmenities}
          onCityChange={setSelectedCity}
          onPriceMinChange={setPriceMin}
          onPriceMaxChange={setPriceMax}
          onClear={() => {
            clearAll();
            setDrawerOpen(false);
          }}
        />
      </div>
    </div>
  );
}
