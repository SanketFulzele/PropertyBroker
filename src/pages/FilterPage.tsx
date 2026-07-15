import { useState } from "react";
import { FILTER_PROPERTIES } from "../data/filterProperties";
import PropertyCard from "../components/PropertyCard";
import FilterSidebar from "../components/FilterSidebar";
import { EmptyState } from "../baseComponents";
import { usePropertyFilters } from "../utils/usePropertyFilters";
import { useLocalityFilter } from "../hooks/useUrlFilters";
import "../styles/filterPage.css";

export default function FilterPage() {
  const { locality: urlLocality, setLocality: setUrlLocality, clearLocality } = useLocalityFilter();
  const { filters, setFilter, clearAll, filtered, total, shown } = usePropertyFilters(FILTER_PROPERTIES, urlLocality);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const hasActiveFilters =
    filters.propertyType.length > 0 ||
    filters.bhk.length > 0 ||
    filters.furnished.length > 0 ||
    filters.availability.length > 0 ||
    filters.locality.length > 0 ||
    filters.priceMin !== "" ||
    filters.priceMax !== "";

  return (
    <div className="filter-page">
      <div className="filter-header">
        <div className="filter-header-badge">Browse Properties</div>
        <h1 className="filter-header-title">
          Find Your Perfect{" "}
          <span style={{ color: "#2563eb" }}>Property</span>
        </h1>
        <p className="filter-header-sub">
          Use filters to narrow down from {total}+ verified listings
        </p>
      </div>

      <div className="filter-layout">
        <aside className="filter-sidebar">
          <FilterSidebar
            selectedTypes={filters.propertyType}
            selectedBhk={filters.bhk}
            selectedFurnishing={filters.furnished}
            selectedAvailability={filters.availability}
            selectedParking={filters.parking}
            selectedAmenities={[]}
            selectedLocality={filters.locality.length > 0 ? filters.locality[0] : ""}
            priceMin={filters.priceMin}
            priceMax={filters.priceMax}
            onTypeChange={(v) => setFilter("propertyType", v)}
            onBhkChange={(v) => setFilter("bhk", v)}
            onFurnishingChange={(v) => setFilter("furnished", v)}
            onAvailabilityChange={(v) => setFilter("availability", v)}
            onParkingChange={(v) => setFilter("parking", v)}
            onAmenitiesChange={() => {}}
            onLocalityChange={(v) => {
              setFilter("locality", v ? [v] : []);
              setUrlLocality(v);
            }}
            onPriceMinChange={(v) => setFilter("priceMin", v)}
            onPriceMaxChange={(v) => setFilter("priceMax", v)}
            onClear={() => {
              clearAll();
              clearLocality();
            }}
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
                {shown} of {total}
              </strong>{" "}
              properties
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon="🏠"
              title="No properties found"
              description="Try adjusting your filters or clear them to see all available properties."
              buttonText="Clear All Filters"
              onButtonClick={() => { clearAll(); clearLocality(); }}
            />
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
          selectedTypes={filters.propertyType}
          selectedBhk={filters.bhk}
          selectedFurnishing={filters.furnished}
          selectedAvailability={filters.availability}
          selectedParking={filters.parking}
          selectedAmenities={[]}
          selectedLocality={filters.locality.length > 0 ? filters.locality[0] : ""}
          priceMin={filters.priceMin}
          priceMax={filters.priceMax}
          onTypeChange={(v) => setFilter("propertyType", v)}
          onBhkChange={(v) => setFilter("bhk", v)}
          onFurnishingChange={(v) => setFilter("furnished", v)}
          onAvailabilityChange={(v) => setFilter("availability", v)}
          onParkingChange={(v) => setFilter("parking", v)}
          onAmenitiesChange={() => {}}
          onLocalityChange={(v) => {
            setFilter("locality", v ? [v] : []);
            setUrlLocality(v);
          }}
          onPriceMinChange={(v) => setFilter("priceMin", v)}
          onPriceMaxChange={(v) => setFilter("priceMax", v)}
          onClear={() => {
            clearAll();
            clearLocality();
            setDrawerOpen(false);
          }}
        />
      </div>
    </div>
  );
}
