export const parsePrice = (s: string): number => {
  if (!s) return 0;
  const isLakh = /(lakh|l\b|l$)/i.test(s);
  const isCr = /(cr|crore)/i.test(s);
  const cleaned = s.replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  if (isCr) return num * 10000000;
  if (isLakh) return num * 100000;
  return num;
};
