# PropertyBroker — Data Architecture Guide

This document explains exactly how data flows through the PropertyBroker website, where every piece of data lives, and the exact format needed to add real properties, images, and content.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Data Files Map](#data-files-map)
3. [Property Data Structure](#property-data-structure)
4. [How the Enricher Works](#how-the-enricher-works)
5. [Adding Real Properties](#adding-real-properties)
6. [Image System](#image-system)
7. [Guide Data Structure](#guide-data-structure)
8. [Other Data Files](#other-data-files)
9. [Filter System](#filter-system)
10. [Key Rules](#key-rules)

---

## Project Overview

PropertyBroker is a React + TypeScript SPA for real estate in Nagpur, India. It uses:

- **React 19** with React Router v7 (client-side routing)
- **Vite 8** as build tool
- **Inline styles + CSS files** for styling (no Tailwind, no CSS-in-JS libraries)
- **Static data** (hardcoded TypeScript arrays) — no backend API
- **Property enricher** that transforms raw data into full Property objects at runtime

All data is stored in TypeScript files under `src/data/`. At runtime, raw data gets transformed by `src/utils/propertyEnricher.ts` which auto-generates missing fields like `slug`, `bedrooms`, `city`, `totalFloors`, `coordinates`, etc.

---

## Data Files Map

```
src/
├── data/
│   ├── data.ts                    ← Featured properties (carousel), stats, localities
│   ├── filterProperties.ts        ← All searchable/filterable properties (25 items)
│   ├── nagpurLocalities.ts        ← 31 Nagpur locality names for filter dropdowns
│   └── guidesData.ts              ← Guide articles, categories, FAQs, resources, topics
├── types/
│   ├── types.ts                   ← All TypeScript interfaces (Property, Stat, Locality, Guide*)
│   └── analytics.ts               ← Analytics event parameter interfaces
├── utils/
│   ├── propertyEnricher.ts        ← Transforms raw data → full Property objects
│   ├── parsePrice.ts              ← Parses "₹62 L" or "₹1.2 Cr" → number
│   ├── analytics.ts               ← Meta Pixel + GA4 tracking functions
│   ├── contact.ts                 ← WhatsApp + phone call helpers with tracking
│   └── usePropertyFilters.ts      ← Client-side property filtering logic (13 filter categories)
├── hooks/
│   ├── hooks.ts                   ← useIntersectionObserver, useCountUp
│   └── useUrlFilters.ts           ← useLocalityFilter (URL query param sync)
├── baseComponents/                ← Shared reusable UI components
│   ├── index.ts                   ← Barrel export
│   ├── Badge.tsx                  ← Status/tag badges
│   ├── Button.tsx                 ← Primary/outline/ghost buttons
│   ├── CheckboxGroup.tsx          ← Multi-select checkbox groups
│   ├── EmptyState.tsx             ← Empty state placeholder
│   ├── FeatureCard.tsx            ← Feature display card
│   ├── Logo.tsx                   ← PropertyBroker logo
│   ├── RangeSlider.tsx            ← Dual-handle range slider
│   ├── SearchableMultiSelect.tsx  ← Searchable dropdown multi-select
│   ├── SectionHeader.tsx          ← Section title + subtitle
│   └── SectionWrapper.tsx         ← Animated section wrapper
├── components/                    ← Feature-specific UI components (24 files)
├── pages/                         ← Route-level page components (6 files)
└── styles/                        ← CSS files (8 files)
```

---

## Property Data Structure

### TypeScript Interface (`src/types/types.ts`)

```typescript
export interface Property {
  id: number;
  slug: string;                  // AUTO-GENERATED: "vrindavan-heights-1"
  title: string;
  description: string;
  price: string;                 // "₹62 L" or "₹1.2 Cr"
  pricePerSqft: string;          // "₹5,800/sqft"
  type: string;                  // "Apartment" | "Villa" | "Plot" | "Commercial" | "Penthouse"
  propertyType: string;          // AUTO-GENERATED: copied from type
  bhk: string;                   // "2 BHK" | "3 BHK" | "" (empty for plots)
  bedrooms: number;              // AUTO-GENERATED from bhk: "2 BHK" → 2
  bathrooms: number;
  area: string;                  // "1,070 sqft"
  locality: string;              // "Manish Nagar" (no city)
  city: string;                  // AUTO-GENERATED: "Nagpur"
  address: string;               // AUTO-GENERATED from location
  location: string;              // Full: "Manish Nagar, Nagpur"
  furnished: string;             // "Unfurnished" | "Semi Furnished" | "Furnished"
  furnishing: string;            // AUTO-GENERATED: copied from furnished
  parking: string;               // "Covered" | "Open" | "None"
  propertyAge: string;           // "New Construction" | "1-5 Years" | etc.
  availability: string;          // "Ready to Move" | "Under Construction"
  facing: string;                // "North" | "South" | "East" | "West" | etc.
  ownership: string;             // "Freehold" | "Leasehold" | "Co-operative Society"
  floor: string;                 // "3rd Floor" | "Ground Floor" | "Top Floor"
  totalFloors: number;           // AUTO-GENERATED: floor number + 4 minimum, or 10
  amenities: string[];
  image: string;                 // Primary image URL (REQUIRED)
  images: string[];              // Gallery images — PROVIDED in raw data
  thumbnail: string;             // AUTO-GENERATED: same as image
  possession: string;            // "Immediate" | "Within 6 Months" | etc.
  coordinates: { lat: number; lng: number };  // AUTO-GENERATED around Nagpur
  builder: string;
  badge: string;                 // "RERA Verified" | "New Launch" | "Featured" | etc.
  badgeColor: string;            // Hex color
}
```

### Fields You MUST Provide (Raw Data)

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| `id` | number | `1` | Unique per property. Featured: 1–6, Filter: 101–125 |
| `title` | string | `"Vrindavan Heights"` | Property/project name |
| `location` | string | `"Manish Nagar, Nagpur"` | Full address string |
| `locality` | string | `"Manish Nagar"` | Just the locality name |
| `price` | string | `"₹62 L"` or `"₹1.2 Cr"` | L = lakh, Cr = crore |
| `pricePerSqft` | string | `"₹5,800/sqft"` | Price per square foot |
| `type` | string | `"Apartment"` | Property type |
| `bhk` | string | `"2 BHK"` or `""` | Empty string for plots |
| `area` | string | `"1,070 sqft"` | Built-up area |
| `amenities` | string[] | `["Pool", "Gym"]` | List of amenities |
| `builder` | string | `"Vrindavan Constructions"` | Builder/developer name |
| `furnished` | string | `"Semi Furnished"` | Furnishing status |
| `availability` | string | `"Ready to Move"` | Availability status |
| `possession` | string | `"Immediate"` | Possession timeline |
| `parking` | string | `"Covered"` | Parking type |
| `description` | string | `"Spacious 2 BHK..."` | 1–2 sentences |
| `propertyAge` | string | `"New Construction"` | Age of property |
| `facing` | string | `"East"` | Direction facing |
| `ownership` | string | `"Freehold"` | Ownership type |
| `bathrooms` | number | `2` | Number of bathrooms |
| `floor` | string | `"3rd Floor"` | Floor level |
| `badge` | string | `"RERA Verified"` | Badge text |
| `badgeColor` | string | `"#10b981"` | Badge background color |
| `image` | string | `"https://..."` | **Primary image URL (REQUIRED)** |
| `images` | string[] | `["https://...", ...]` | **5 gallery image URLs** |

### Fields Auto-Generated by Enricher

| Field | How it's generated |
|-------|-------------------|
| `slug` | `slugify(title) + "-" + id` → `"vrindavan-heights-1"` |
| `propertyType` | Copied from `type` |
| `bedrooms` | Parsed from `bhk`: `"2 BHK"` → `2` (defaults to 2 if empty) |
| `furnishing` | Copied from `furnished` |
| `city` | Extracted from `location`: `"Manish Nagar, Nagpur"` → `"Nagpur"` |
| `address` | Same as `location` |
| `totalFloors` | `floor number + 4` minimum, or 10 |
| `images` | Uses `raw.images` if provided; otherwise generates from gallery pool |
| `thumbnail` | Same as `image` |
| `coordinates` | Generated around Nagpur center (21.1458, 79.0882) with ID-based offset |

---

## How the Enricher Works

File: `src/utils/propertyEnricher.ts`

```
RAW_DATA (your input with images array)
    ↓
enrichProperty(raw)
    ↓
Generates: slug, bedrooms, city, address, totalFloors,
           coordinates, furnishing, propertyType, thumbnail
    ↓
Uses raw.images directly (or falls back to gallery pool)
    ↓
FULL Property object (used by all components)
```

### Key Logic:

1. **Slug generation**: `title.toLowerCase().replace(/\s+/g, "-") + "-" + id`
2. **Bedrooms**: Regex extracts number from BHK string: `"3 BHK"` → `3`
3. **Gallery images**: Uses `raw.images` array if provided. Falls back to primary image + 5 from `GALLERY_IMAGE_POOL` (shuffled by ID for consistency)
4. **Coordinates**: Centered on Nagpur (21.1458°N, 79.0882°E) with small offset based on ID
5. **totalFloors**: Parses floor number, adds 4 minimum

### Gallery Image Pool (fallback only):

```typescript
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
```

---

## Adding Real Properties

### Image Format

Every property needs 5 gallery images (including the main image as the first one):

```typescript
{
  image: "https://cdn.com/main.jpg",        // Primary display image
  images: [
    "https://cdn.com/main.jpg",             // Same as primary (shown first)
    "https://cdn.com/living-room.jpg",       // Additional gallery images
    "https://cdn.com/bedroom.jpg",
    "https://cdn.com/kitchen.jpg",
    "https://cdn.com/balcony.jpg",
  ],
}
```

### File: `src/data/data.ts` (Featured/Carousel Properties — 6 items)

```typescript
const RAW_PROPERTIES = [
  {
    id: 1,
    title: "Sunshine Towers",
    location: "Dharampeth, Nagpur",
    locality: "Dharampeth",
    price: "₹85 L",
    pricePerSqft: "₹6,200/sqft",
    type: "Apartment",
    bhk: "3 BHK",
    area: "1,250 sqft",
    badge: "RERA Verified",
    badgeColor: "#10b981",
    image: "https://cdn.com/sunshine-main.jpg",
    images: [
      "https://cdn.com/sunshine-main.jpg",
      "https://cdn.com/living-room.jpg",
      "https://cdn.com/bedroom.jpg",
      "https://cdn.com/kitchen.jpg",
      "https://cdn.com/balcony.jpg",
    ],
    amenities: ["Gym", "Pool", "Garden", "Parking", "Security", "Clubhouse"],
    builder: "Sunshine Builders",
    furnished: "Semi Furnished",
    availability: "Ready to Move",
    possession: "Immediate",
    parking: "Covered",
    description: "Premium 3 BHK apartment in Dharampeth with panoramic city views.",
    propertyAge: "New Construction",
    facing: "East",
    ownership: "Freehold",
    bathrooms: 3,
    floor: "5th Floor",
  },
  // ... more properties (IDs 1–6)
];
```

### File: `src/data/filterProperties.ts` (Search/Filter Page — 25 items)

Same format. Use IDs starting from 101.

---

## Image System

### Primary Image + Gallery

Every property has:
- `image` — single URL used for cards, OG tags, and as the first gallery image
- `images` — array of 5 URLs used for the property detail page gallery

### How Images Are Used

| Context | Source |
|---------|--------|
| Property cards (home, filter) | `prop.image` |
| Property detail page main gallery | `property.images[0]` (hero) |
| Property detail page thumbnails | `property.images[0–4]` |
| OG/social sharing meta tags | `property.image` |
| WhatsApp messages | `property.image` (not included in message) |

### Image CDN Recommendations

| CDN | Free Tier | Best For |
|-----|-----------|----------|
| **Cloudinary** | 25GB storage, 25GB bandwidth/mo | Best for real estate (auto-resize, crop) |
| **Firebase Storage** | 5GB storage, 1GB/day download | Simple setup |
| **AWS S3 + CloudFront** | 12 months free tier | Production scale |
| **ImgBB** | Unlimited (with API key) | Quick testing |
| **Vercel Blob** | 1GB storage | Vercel-deployed sites |

---

## Guide Data Structure

### File: `src/data/guidesData.ts`

### Exports

| Export | Type | Count |
|--------|------|-------|
| `GUIDE_CATEGORIES` | `GuideCategory[]` | 6 |
| `GUIDE_ARTICLES` | `GuideArticle[]` | 12 |
| `POPULAR_TOPICS` | `string[]` | 12 |
| `DOWNLOADABLE_RESOURCES` | `DownloadableResource[]` | 4 |
| `GUIDES_FAQS` | `FAQ[]` | 6 |

### GuideCategory

```typescript
{
  id: "buying",
  title: "Buying Guide",
  description: "Everything about purchasing property in Nagpur",
  icon: "Home",                    // lucide-react icon name
  articleCount: 3,
  slug: "buying",
}
```

### GuideArticle

```typescript
{
  id: 1,
  slug: "complete-home-buying-guide",
  title: "Complete Home Buying Guide",
  category: "Buying Guide",
  categorySlug: "buying",
  description: "A comprehensive guide to buying your first home.",
  excerpt: "Short preview text for cards...",
  readingTime: "8 min read",
  publishDate: "Jan 15, 2025",
  coverImage: "https://images.unsplash.com/...",
  author: "PropertyBroker Team",
  tags: ["buying", "first-time buyer", "home loan", "legal"],
  featured: true,
  content: [
    {
      title: "Step 1: Determine Your Budget",
      content: "<p>HTML content string...</p>",
      image: "https://images.unsplash.com/...",
      quote: "A memorable quote about property buying",
      tip: "Pro tip: Always get pre-approved for a loan before house hunting.",
      info: "Good to know: Nagpur's average property price is ₹5,500/sqft.",
    },
    // more sections...
  ],
}
```

### DownloadableResource

```typescript
{
  id: 1,
  title: "Home Buying Checklist",
  description: "Step-by-step checklist for first-time buyers",
  icon: "ClipboardList",          // lucide-react icon name
}
```

### FAQ

```typescript
{
  question: "How much down payment is required?",
  answer: "Typically 10-20% of the property value...",
}
```

---

## Other Data Files

### `src/data/nagpurLocalities.ts`

```typescript
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
  "Sonegaon",
  "Nandanvan",
  "Khaparkheda",
  "Mohagaon",
  "Ambazari",
  "Lakadganj",
  "Ganeshpeth",
  "Itwari",
  "Sitabuldi",
  "Mahal",
  "Sakkardara",
  "Ayodhya Nagar",
  "Wathoda",
  "Kalamna",
  "Kotambi",
] as const;

export type NagpurLocality = (typeof NAGPUR_LOCALITY_NAMES)[number];

export const LOCALITY_OPTIONS = NAGPUR_LOCALITY_NAMES.map((name) => ({
  value: name,
  label: name,
}));
```

### `src/data/data.ts` — Stats

```typescript
export const STATS: Stat[] = [
  { value: "2,500+", label: "Active Listings" },
  { value: "15+", label: "Localities Covered" },
  { value: "12,000+", label: "Happy Families" },
  { value: "₹450Cr+", label: "Properties Sold" },
];
```

### `src/data/data.ts` — Localities (Home Page)

```typescript
export const NAGPUR_LOCALITIES: Locality[] = [
  {
    id: 1,
    name: "Manish Nagar",
    description: "Premium residential hub near the airport...",
    propertyCount: "120+",
    startingPrice: "₹42 L",
    image: "https://images.unsplash.com/...",
  },
  // 8 localities total (Manish Nagar, Wardha Road, MIHAN, Beltarodi, Dharampeth, Pratap Nagar, Besa, Civil Lines)
];
```

---

## Filter System

### Filter Categories (13 total)

The filter sidebar (`FilterSidebar.tsx`) supports these filter categories:

| Filter | Type | Options |
|--------|------|---------|
| Locality | Multi-select | 31 Nagpur localities |
| Property Type | Multi-select | Apartment, Villa, Plot, Commercial |
| BHK | Multi-select | 1 BHK, 2 BHK, 3 BHK, 4+ BHK |
| Budget | Range slider | ₹5L – ₹5 Cr |
| Area | Range slider | 300 – 6,000 sqft |
| Furnished | Multi-select | Furnished, Semi Furnished, Unfurnished |
| Possession | Multi-select | Immediate, Within 3 Months, Within 6 Months, Within 1 Year, After 1 Year |
| Availability | Multi-select | Ready to Move, Under Construction |
| Property Age | Multi-select | New Construction, 1-5 Years, 5-10 Years, 10-20 Years, 20+ Years |
| Facing | Multi-select | North, South, East, West, North-East, North-West, South-East, South-West |
| Ownership | Multi-select | Freehold, Leasehold, Co-operative Society |
| Parking | Multi-select | Covered, Open, None |
| Bathrooms | Multi-select | 1, 2, 3, 4 |
| Floor | Multi-select | Ground Floor, 1st–5th Floor, 6th Floor+ |

### URL Sync

The `useLocalityFilter` hook syncs the locality filter with the URL query parameter:
- `/property-list?locality=Manish%20Nagar` — pre-filters by locality
- Supports deep linking from home page locality cards and hero search

### Filter Logic

File: `src/utils/usePropertyFilters.ts`

- Client-side filtering (no API calls)
- All 13 filter categories applied simultaneously
- Returns `{ filters, setFilter, clearAll, filtered, hasActiveFilters, total, shown }`

---

## Key Rules

1. **Never modify `Property` interface** unless you update all components that use it
2. **Always use `enrichProperties()`** to transform raw data — don't use raw arrays directly
3. **IDs must be unique** across both `data.ts` and `filterProperties.ts`
4. **Image URLs must be accessible** — test in browser before deploying
5. **Price format matters** — must include `₹` symbol and `L` or `Cr` suffix
6. **Localities must match** `nagpurLocalities.ts` for search to work correctly
7. **Badge colors must be valid hex** — components render them as background colors
8. **Always provide `images` array** with 5 URLs for each property (first URL should match `image`)

---

## Badge Colors Reference

| Badge Text | Color | Hex |
|-----------|-------|-----|
| RERA Verified | Green | `#10b981` |
| New Launch | Amber | `#f59e0b` |
| Featured | Purple | `#8b5cf6` |
| Best Seller | Blue | `#2563eb` |
| Ready to Move | Cyan | `#06b6d4` |
| Affordable | Green | `#10b981` |
| Budget Friendly | Green | `#10b981` |
| Premium | Purple | `#8b5cf6` |
| Ultra Premium | Purple | `#8b5cf6` |
| Best Value | Blue | `#2563eb` |
| Investment Pick | Amber | `#f59e0b` |

---

## Price Format Reference

| Price Range | Format | Example | Parsed Value |
|------------|--------|---------|--------------|
| Under 1 Lakh | ₹XX,XXX | `₹95,000` | 95000 |
| 1 Lakh – 99 Lakh | ₹XX L | `₹62 L` | 6200000 |
| 1 Crore+ | ₹X.X Cr | `₹1.2 Cr` | 12000000 |

The `parsePrice.ts` utility handles both formats:
- `₹62 L` → `6200000`
- `₹1.2 Cr` → `12000000`
- `₹95,000` → `95000`
