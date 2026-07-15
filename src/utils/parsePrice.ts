export const parsePrice = (s: string): number => {
  if (!s) return 0;
  const cleaned = s.replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  if (/lakh/i.test(s)) return num * 100000;
  if (/cr/i.test(s)) return num * 10000000;
  return num;
};
