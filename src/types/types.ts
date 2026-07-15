export interface Property {
  id: number;
  title: string;
  location: string;
  city: string;
  price: string;
  pricePerSqft: string;
  type: string;
  bhk: string;
  area: string;
  badge: string;
  badgeColor: string;
  image: string;
  amenities: string[];
  builder: string;
  furnished: string;
  availability: string;
  possession: string;
  parking: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface City {
  name: string;
  properties: string;
  image: string;
}

export interface Locality {
  id: number;
  name: string;
  description: string;
  propertyCount: string;
  startingPrice: string;
  image: string;
}