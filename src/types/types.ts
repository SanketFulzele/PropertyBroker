export interface Property {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: string;
  pricePerSqft: string;
  type: string;
  propertyType: string;
  bhk: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  locality: string;
  city: string;
  address: string;
  location: string;
  furnished: string;
  furnishing: string;
  parking: string;
  propertyAge: string;
  availability: string;
  facing: string;
  ownership: string;
  floor: string;
  totalFloors: number;
  amenities: string[];
  image: string;
  images: string[];
  thumbnail: string;
  possession: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  builder: string;
  badge: string;
  badgeColor: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface InvestmentFeature {
  icon: React.FC<{ size?: number; strokeWidth?: number; color?: string }>;
  title: string;
  desc: string;
}

export interface Locality {
  id: number;
  name: string;
  description: string;
  propertyCount: string;
  startingPrice: string;
  image: string;
}
