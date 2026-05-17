import { CITIES } from "../data/data";
import { useIntersectionObserver } from "../hooks/hooks";

export default function CitiesSection() {
  const { ref, visible } = useIntersectionObserver();

  return (
    <section
      ref={ref}
      style={{
        padding: 40,
        background: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>
        Explore Cities
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        {CITIES.map((city) => (
          <div
            key={city.name}
            style={{
              position: "relative",
              borderRadius: 10,
              overflow: "hidden",
              opacity: visible ? 1 : 0.5,
              transition: "0.5s",
            }}
          >
            <img
              src={city.image}
              alt={city.name}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                color: "#fff",
              }}
            >
              <h3>{city.name}</h3>
              <p>{city.properties} properties</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}