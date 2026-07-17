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

export interface GuideCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  articleCount: number;
  slug: string;
}

export interface GuideArticle {
  id: number;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  excerpt: string;
  readingTime: string;
  publishDate: string;
  coverImage: string;
  author: string;
  tags: string[];
  featured: boolean;
  content: GuideSection[];
}

export interface GuideSection {
  title: string;
  content: string;
  image?: string;
  quote?: string;
  tip?: string;
  info?: string;
}

export interface DownloadableResource {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
