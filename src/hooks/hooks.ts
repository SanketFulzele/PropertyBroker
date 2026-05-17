import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function useCountUp(target: string, active: boolean) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!active) return;

    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");

    let start = 0;
    const steps = 60;
    const step = num / steps;
    let count = 0;

    const timer = setInterval(() => {
      count++;
      start = Math.min(start + step, num);

      setDisplay(
        (start >= 1000
          ? (start / 1000).toFixed(1) + "K"
          : start.toFixed(num % 1 !== 0 ? 1 : 0)) + suffix
      );

      if (count >= steps) {
        clearInterval(timer);
        setDisplay(target);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [active, target]);

  return display;
}