import { useIntersectionObserver } from "../hooks/hooks";

const SectionWrapper = ({
  id,
  children,
  maxWidth = 1200,
  padding = "100px 24px",
  style = {},
}: {
  id?: string;
  children: React.ReactNode;
  maxWidth?: number;
  padding?: string;
  style?: React.CSSProperties;
}) => {
  const { ref, visible } = useIntersectionObserver(0.2);

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        background: "#fff",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        padding,
        ...style,
      }}
    >
      <div
        style={{
          maxWidth,
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
