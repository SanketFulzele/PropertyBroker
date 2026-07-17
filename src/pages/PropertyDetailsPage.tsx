import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Home as HomeIcon, 
  Bath, 
  Bed, 
  Maximize, 
  MapPin, 
  Compass, 
  Key, 
  Calendar, 
  Layers, 
  Car, 
  Clock, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";

import { PROPERTIES } from "../data/data";
import { FILTER_PROPERTIES } from "../data/filterProperties";
import { parsePrice } from "../utils/parsePrice";
import { trackViewContent } from "../utils/analytics";
import { openWhatsApp, makePhoneCall } from "../utils/contact";
import PropertyCard from "../components/PropertyCard";
import { Badge, Button } from "../baseComponents";
import "../styles/propertyDetails.css";

// Combine and deduplicate properties by ID
const ALL_PROPERTIES = [...PROPERTIES, ...FILTER_PROPERTIES];
const UNIQUE_PROPERTIES = Array.from(
  new Map(ALL_PROPERTIES.map((p) => [p.id, p])).values()
);

export default function PropertyDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Retrieve the property based on the slug or fallback ID
  const property = useMemo(() => {
    if (!slug) return null;
    return UNIQUE_PROPERTIES.find(
      (p) => p.slug === slug || p.id.toString() === slug
    ) || null;
  }, [slug]);

  // Sync state when property changes
  useEffect(() => {
    setLoading(true);
    setImageError(false);
    if (property) {
      setActiveImage(property.images[0]);
      setImageIndex(0);
      // Simulate brief loading state to show beautiful skeleton animations
      const timer = setTimeout(() => setLoading(false), 600);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [property]);

  // Track ViewContent on property load
  useEffect(() => {
    if (property) {
      trackViewContent({
        id: property.id.toString(),
        name: property.title,
        category: property.propertyType,
        price: property.price,
        locality: property.locality,
        bhk: property.bhk,
      });
    }
  }, [property?.id]);

  // Client-Side SEO Metadata Injection
  useEffect(() => {
    if (property) {
      document.title = `${property.title} | ${property.locality}, Nagpur | PropertyBroker`;
      
      const updateMeta = (name: string, content: string, isProp = false) => {
        const selector = isProp ? `meta[property="${name}"]` : `meta[name="${name}"]`;
        let meta = document.querySelector(selector);
        if (!meta) {
          meta = document.createElement("meta");
          meta.setAttribute(isProp ? "property" : "name", name);
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
      };

      updateMeta("description", property.description);
      updateMeta("og:title", `${property.title} | PropertyBroker`, true);
      updateMeta("og:description", property.description, true);
      updateMeta("og:image", property.image, true);
      updateMeta("og:url", window.location.href, true);
      updateMeta("og:type", "website", true);
      updateMeta("twitter:card", "summary_large_image");
      updateMeta("twitter:title", property.title);
      updateMeta("twitter:description", property.description);
      updateMeta("twitter:image", property.image);

      let canonical = document.querySelector("link[rel='canonical']");
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", window.location.href);
    }
  }, [property]);

  // Handle active image index syncing when manually set
  const handleSelectImage = (img: string, idx: number) => {
    setImageLoading(true);
    setImageError(false);
    setActiveImage(img);
    setImageIndex(idx);
  };

  const handleNextImage = () => {
    if (!property) return;
    const nextIdx = (imageIndex + 1) % property.images.length;
    handleSelectImage(property.images[nextIdx], nextIdx);
  };

  const handlePrevImage = () => {
    if (!property) return;
    const prevIdx = (imageIndex - 1 + property.images.length) % property.images.length;
    handleSelectImage(property.images[prevIdx], prevIdx);
  };

  // Similar Properties Scoring Logic:
  // Same locality -> Same property type -> Similar budget
  const similarProperties = useMemo(() => {
    if (!property) return [];
    
    const targetPrice = parsePrice(property.price);
    const candidates = UNIQUE_PROPERTIES.filter((p) => p.id !== property.id);

    const scored = candidates.map((p) => {
      let score = 0;
      // Locality Match (Priority 1)
      if (p.locality.toLowerCase() === property.locality.toLowerCase()) {
        score += 12;
      }
      // Type Match (Priority 2)
      if (p.propertyType.toLowerCase() === property.propertyType.toLowerCase()) {
        score += 6;
      }
      // Budget Match (Priority 3)
      const candPrice = parsePrice(p.price);
      if (targetPrice > 0 && candPrice > 0) {
        const ratio = Math.abs(targetPrice - candPrice) / targetPrice;
        // Closer ratio yields higher score (up to 6 points)
        score += Math.max(0, 6 * (1 - ratio));
      }
      return { prop: p, score };
    });

    // Sort descending by score, take top 3
    return scored
      .sort((a, b) => b.score - a.score)
      .map((x) => x.prop)
      .slice(0, 3);
  }, [property]);

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="property-details-page">
        <div className="details-wrapper">
          <div className="skeleton-pulse skeleton-breadcrumb" />
          <div className="skeleton-header-row">
            <div className="skeleton-header-left">
              <div className="skeleton-pulse skeleton-title" />
              <div className="skeleton-pulse skeleton-subtitle" />
            </div>
            <div className="skeleton-header-right">
              <div className="skeleton-pulse skeleton-price" />
              <div className="skeleton-pulse skeleton-price-sub" />
            </div>
          </div>
          <div className="details-layout">
            <div className="details-main-col">
              <div className="skeleton-pulse skeleton-gallery-main" />
              <div className="skeleton-pulse skeleton-gallery-desc" />
            </div>
            <div className="details-side-col">
              <div className="skeleton-pulse skeleton-cta-card" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!property) {
    return (
      <div className="property-details-page">
        <div className="details-wrapper details-not-found">
          <span style={{ fontSize: 64, marginBottom: 16 }}>🏠</span>
          <h2>Property Not Found</h2>
          <p>
            We couldn't find the property you're looking for. It may have been sold, unlisted, or the link might be broken.
          </p>
          <Link to="/filter">
            <Button variant="primary" style={{ padding: "12px 32px", borderRadius: 12 }}>
              Browse Available Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="property-details-page">
      <div className="details-wrapper">
        
        {/* Breadcrumbs */}
        <nav className="details-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/filter">Properties</Link>
          <span>/</span>
          <span style={{ color: "#1a3c5e", fontWeight: 700 }}>{property.title}</span>
        </nav>

        {/* Title & Price Header */}
        <div className="details-header">
          <div className="details-title-section">
            <h1>{property.title}</h1>
            <p className="details-location">
              <MapPin size={18} style={{ color: "#2563eb" }} />
              {property.location}
            </p>
          </div>
          <div className="details-price-section">
            <div className="details-price">{property.price}</div>
            <div className="details-price-sqft">
              {property.pricePerSqft || "N/A"}
            </div>
          </div>
        </div>

        {/* Two Column Layout Grid */}
        <div className="details-layout">
          
          {/* Left Column: Media & Overview Details */}
          <div className="details-main-col">
            
            {/* Gallery Section */}
            <div className="details-card" style={{ padding: 16 }}>
              <div className="gallery-layout">
                
                {/* Thumbnails list (Desktop: Vertical Column, Mobile: Horizontal Row) */}
                {property.images.length > 1 && (
                  <div className="gallery-thumbs-col" role="listbox" aria-label="Property images list">
                    {property.images.map((img, i) => (
                      <button
                        key={i}
                        role="option"
                        aria-selected={imageIndex === i}
                        className={`gallery-thumb-btn ${imageIndex === i ? "active" : ""}`}
                        onClick={() => handleSelectImage(img, i)}
                      >
                        <img src={img} alt={`${property.title} Thumbnail ${i + 1}`} loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main preview image frame */}
                <div className="gallery-main-viewport">
                  {imageLoading && (
                    <div className="skeleton-pulse" style={{ position: "absolute", inset: 0 }} />
                  )}
                  <img
                    src={imageError ? "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1000&q=80" : activeImage}
                    alt={`${property.title} - Main Preview`}
                    className="gallery-main-img"
                    style={{ opacity: imageLoading ? 0 : 1 }}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageError(true);
                      setImageLoading(false);
                    }}
                  />
                  <Badge
                    text={property.badge}
                    background={property.badgeColor}
                    color="#fff"
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      zIndex: 2,
                    }}
                  />
                  
                  {/* Gallery Nav Navigation Arrows */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        aria-label="Previous image"
                        style={{
                          position: "absolute",
                          left: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "rgba(255,255,255,0.9)",
                          border: "none",
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          zIndex: 2,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                        }}
                      >
                        <ChevronLeft size={20} style={{ color: "#1a3c5e" }} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        aria-label="Next image"
                        style={{
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "rgba(255,255,255,0.9)",
                          border: "none",
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          zIndex: 2,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                        }}
                      >
                        <ChevronRight size={20} style={{ color: "#1a3c5e" }} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Overview / Feature Cards */}
            <div className="details-card">
              <h2 className="details-card-title">Property Overview</h2>
              <div className="info-grid">
                {[
                  { icon: <HomeIcon size={20} />, label: "Property Type", value: property.propertyType },
                  { icon: <Bed size={20} />, label: "BHK Configuration", value: property.bhk },
                  { icon: <Bath size={20} />, label: "Bathrooms", value: `${property.bathrooms} Bathrooms` },
                  { icon: <Maximize size={20} />, label: "Built-up Area", value: property.area },
                  { icon: <Compass size={20} />, label: "Facing", value: property.facing || "N/A" },
                  { icon: <Key size={20} />, label: "Furnishing Status", value: property.furnishing },
                  { icon: <Clock size={20} />, label: "Property Age", value: property.propertyAge || "New" },
                  { icon: <Car size={20} />, label: "Parking Space", value: property.parking || "None" },
                  { icon: <Calendar size={20} />, label: "Possession Timeline", value: property.possession },
                  { icon: <Layers size={20} />, label: "Floor Level", value: `${property.floor} of ${property.totalFloors}` },
                ].map((item, idx) => (
                  <div className="info-item" key={idx}>
                    <div className="info-icon">{item.icon}</div>
                    <div className="info-details">
                      <span className="info-label">{item.label}</span>
                      <span className="info-value">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="details-card">
              <h2 className="details-card-title">Description</h2>
              <p className="description-text">{property.description}</p>
            </div>

            {/* Amenities Section */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="details-card">
                <h2 className="details-card-title">Amenities</h2>
                <div className="amenities-list">
                  {property.amenities.map((amenity, idx) => (
                    <div className="amenity-chip" key={idx}>
                      <span style={{ color: "#2563eb", fontWeight: 700 }}>✓</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Details Section */}
            <div className="details-card">
              <h2 className="details-card-title">Detailed Specs</h2>
              <div className="specs-grid">
                {[
                  { label: "Builder Profile", val: property.builder || "N/A" },
                  { label: "Ownership Profile", val: property.ownership || "N/A" },
                  { label: "Availability Status", val: property.availability || "N/A" },
                  { label: "Possession Status", val: property.possession || "N/A" },
                  { label: "Locality Context", val: property.locality || "N/A" },
                  { label: "City Zone", val: property.city || "N/A" },
                ].map((spec, i) => (
                  <div className="spec-row" key={i}>
                    <span className="spec-label">{spec.label}</span>
                    <span className="spec-value">{spec.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div className="details-card">
              <h2 className="details-card-title">Location</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p className="description-text">
                  <strong>Address: </strong> {property.address}
                </p>
                <div className="map-placeholder">
                  <div className="map-placeholder-icon">📍</div>
                  <span style={{ fontWeight: 700 }}>Map View Integration</span>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>Coming soon to PropertyBroker details.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Contact Builder Sidebar */}
          <div className="details-side-col">
            <div className="cta-box-card">
              
              <div className="cta-builder-info">
                <div className="cta-builder-logo">
                  {property.builder ? property.builder.charAt(0) : "P"}
                </div>
                <div>
                  <div className="cta-builder-name">{property.builder || "PropertyBroker Elite"}</div>
                  <div className="cta-builder-title">Authorized Builder Partner</div>
                </div>
              </div>

              <div className="cta-button-stack">
                <button
                  onClick={() => openWhatsApp({
                    source: "property_details",
                    propertyName: property.title,
                    propertyLocation: `${property.locality}, ${property.city}`,
                    propertyPrice: property.price,
                    propertySlug: property.slug,
                    propertyId: property.id.toString(),
                  })}
                  style={{ textDecoration: "none", background: "none", border: "none", padding: 0, width: "100%", cursor: "pointer" }}
                >
                  <button className="whatsapp-cta-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width="20"
                      height="20"
                      fill="white"
                    >
                      <path d="M16 .4C7.3.4.4 7.3.4 16c0 2.8.7 5.5 2.1 7.9L.4 31.6l7.9-2.1c2.3 1.3 5 2.1 7.7 2.1 8.7 0 15.6-6.9 15.6-15.6S24.7.4 16 .4zm0 28.6c-2.4 0-4.7-.7-6.6-2l-.5-.3-4.7 1.3 1.3-4.6-.3-.5C3.9 20.7 3.2 18.4 3.2 16 3.2 9.1 9.1 3.2 16 3.2S28.8 9.1 28.8 16 22.9 29 16 29zm7.2-9.6c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.3 1.6-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.3-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.2 0-.5 0-.7 0-.2-.9-2.2-1.3-3-.3-.7-.6-.6-.9-.6h-.8c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.2 0 1.9 1.4 3.8 1.6 4 .2.3 2.8 4.3 6.9 6 .9.4 1.6.6 2.2.8.9.3 1.7.3 2.3.2.7-.1 2.4-1 2.7-2 .3-1 .3-1.9.2-2-.1-.1-.4-.2-.8-.4z" />
                    </svg>
                    <span>Connect on WhatsApp</span>
                  </button>
                </button>
                
                <button
                  onClick={() => makePhoneCall({
                    source: "property_details",
                    propertyId: property.id.toString(),
                    propertyName: property.title,
                  })}
                  style={{ textDecoration: "none", background: "none", border: "none", padding: 0, width: "100%", cursor: "pointer" }}
                >
                  <button className="callback-cta-btn">
                    <span>Call Company Advisor</span>
                  </button>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="similar-properties-section">
            <h2 className="similar-title">Similar Listings You May Like</h2>
            <div className="similar-grid">
              {similarProperties.map((prop, idx) => (
                <div className="similar-card-wrap" key={prop.id}>
                  <PropertyCard 
                    prop={prop} 
                    delay={idx * 0.05} 
                    visible={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
