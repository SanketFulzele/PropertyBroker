import { useState } from "react";
import { Link } from "react-router-dom";
import { FILTER_PROPERTIES } from "../data/filterProperties";
import PropertyCard from "../components/PropertyCard";
import FilterSidebar from "../components/FilterSidebar";
import { EmptyState } from "../baseComponents";
import { usePropertyFilters } from "../utils/usePropertyFilters";
import { useLocalityFilter } from "../hooks/useUrlFilters";
import "../styles/filterPage.css";

export default function FilterPage() {
  const { locality: urlLocality, setLocality: setUrlLocality, clearLocality } = useLocalityFilter();
  const { filters, setFilter, clearAll, filtered, hasActiveFilters, total, shown } = usePropertyFilters(FILTER_PROPERTIES, urlLocality);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeLocality = filters.locality.length === 1 ? filters.locality[0] : null;

  return (
    <div className="filter-page">
      <div className="filter-header">
        <nav className="filter-breadcrumb">
          <Link to="/" className="filter-breadcrumb-link">Home</Link>
          <span className="filter-breadcrumb-sep">/</span>
          <Link to="/filter" className="filter-breadcrumb-link">Properties</Link>
          {activeLocality && (
            <>
              <span className="filter-breadcrumb-sep">/</span>
              <span className="filter-breadcrumb-current">{activeLocality}</span>
            </>
          )}
        </nav>
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
          <div className="filter-sidebar-content">
            <FilterSidebar
              filters={filters}
              onFilterChange={(key, value) => {
                setFilter(key, value);
                if (key === "locality" && Array.isArray(value) && value.length === 1) {
                  setUrlLocality(value[0] as string);
                } else if (key === "locality" && Array.isArray(value) && value.length === 0) {
                  clearLocality();
                }
              }}
              onClear={() => {
                clearAll();
                clearLocality();
              }}
            />
          </div>
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
        <div className="filter-drawer-content">
          <FilterSidebar
            filters={filters}
            onFilterChange={(key, value) => {
              setFilter(key, value);
              if (key === "locality" && Array.isArray(value) && value.length === 1) {
                setUrlLocality(value[0] as string);
              } else if (key === "locality" && Array.isArray(value) && value.length === 0) {
                clearLocality();
              }
            }}
            onClear={() => {
              clearAll();
              clearLocality();
            }}
          />
        </div>
      </div>
    </div>
  );
}
