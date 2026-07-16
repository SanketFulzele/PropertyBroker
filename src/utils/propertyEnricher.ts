import type { Property } from "../types/types";

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .trim();
}

// A diverse pool of real estate images from Unsplash to dynamically construct image galleries
const GALLERY_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1000&q=80",
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1000&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1000&q=80",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1000&q=80"
];

export function enrichProperty(raw: any): Property {
  const id = raw.id;
  const title = raw.title || "Premium Property";
  const slug = `${slugify(title)}-${id}`;
  
  // Parse BHK to number of bedrooms (e.g. "2 BHK" -> 2, "3 BHK" -> 3)
  const bhkMatch = raw.bhk ? raw.bhk.match(/\d+/) : null;
  const bedrooms = bhkMatch ? parseInt(bhkMatch[0], 10) : 2;
  
  // City and Address
  const locationParts = raw.location ? raw.location.split(",") : [];
  const city = locationParts[locationParts.length - 1]?.trim() || "Nagpur";
  const address = raw.location || `${raw.locality || "Nagpur"}, Nagpur, Maharashtra`;
  
  // Floor and Total Floors
  const floorMatch = raw.floor ? raw.floor.match(/\d+/) : null;
  const floorNum = floorMatch ? parseInt(floorMatch[0], 10) : 1;
  const totalFloors = Math.max(floorNum + 4, 10); // e.g. if 3rd floor, total 10 floors

  // Gallery images (at least 5 images, starting with the primary one)
  const primaryImage = raw.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80";
  
  // Generate a semi-stable list of additional images based on ID
  const seed = id;
  const shuffledPool = [...GALLERY_IMAGE_POOL];
  // Simple seed-based shuffle
  for (let i = shuffledPool.length - 1; i > 0; i--) {
    const j = (seed * (i + 1)) % shuffledPool.length;
    const temp = shuffledPool[i];
    shuffledPool[i] = shuffledPool[j];
    shuffledPool[j] = temp;
  }
  
  const additionalImages = shuffledPool.filter(img => img !== primaryImage).slice(0, 5);
  const images = [primaryImage, ...additionalImages];

  // Coordinates centered around Nagpur with slight offsets based on id
  const latOffset = ((id % 100) - 50) * 0.001;
  const lngOffset = (((id * 3) % 100) - 50) * 0.001;
  const coordinates = {
    lat: 21.1458 + latOffset,
    lng: 79.0882 + lngOffset
  };

  return {
    ...raw,
    slug,
    propertyType: raw.type || "Apartment",
    bedrooms,
    bathrooms: raw.bathrooms || Math.max(bedrooms - 1, 1),
    city,
    address,
    location: raw.location || address,
    furnishing: raw.furnished || "Unfurnished",
    totalFloors,
    images,
    thumbnail: primaryImage,
    coordinates,
    badge: raw.badge || "Verified",
    badgeColor: raw.badgeColor || "#10b981",
    description: raw.description || `${raw.bhk || "Premium"} ${raw.type || "property"} in ${raw.locality || "Nagpur"} built by ${raw.builder || "renowned builders"}. Offering spacious interiors and modern amenities.`,
  };
}

export function enrichProperties(properties: any[]): Property[] {
  return properties.map(enrichProperty);
}
