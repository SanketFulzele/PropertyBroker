export const NAGPUR_LOCALITY_NAMES = [
  "Manish Nagar",
  "Besa",
  "Beltarodi",
  "MIHAN",
  "Wardha Road",
  "Dharampeth",
  "Civil Lines",
  "Pratap Nagar",
  "Narendra Nagar",
  "Trimurti Nagar",
  "Jaripatka",
  "Hingna Road",
  "Sadar",
  "Ramdaspeth",
  "Shankar Nagar",
] as const;

export type NagpurLocality = (typeof NAGPUR_LOCALITY_NAMES)[number];

export const LOCALITY_OPTIONS = NAGPUR_LOCALITY_NAMES.map((name) => ({
  value: name,
  label: name,
}));
