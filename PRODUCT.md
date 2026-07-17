# PropertyBroker — Product Documentation

A comprehensive guide to the PropertyBroker real estate platform.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Vision and Goals](#2-vision-and-goals)
3. [Tech Stack](#3-tech-stack)
4. [Features](#4-features)
5. [User Roles](#5-user-roles)
6. [User Journeys](#6-user-journeys)
7. [Business Rules](#7-business-rules)
8. [Functional Requirements](#8-functional-requirements)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Current Implementation Status](#10-current-implementation-status)
11. [Property Module](#11-property-module)
12. [Guide Module](#12-guide-module)
13. [Search and Filtering](#13-search-and-filtering)
14. [Authentication](#14-authentication)
15. [Admin Functionality](#15-admin-functionality)
16. [SEO Features](#16-seo-features)
17. [Analytics and Tracking](#17-analytics-and-tracking)
18. [Responsive Design](#18-responsive-design)
19. [Project Structure](#19-project-structure)
20. [Development Guidelines](#20-development-guidelines)
21. [Future Roadmap](#21-future-roadmap)
22. [Known Limitations](#22-known-limitations)

---

## 1. Product Overview

PropertyBroker is a React + TypeScript single-page application for real estate in Nagpur, India. It serves as a marketing and lead-generation website that showcases properties, provides educational content through a guides section, and drives user inquiries through WhatsApp and phone calls.

### What This Project Is

- A single-page marketing and lead-generation website
- A front-end application built with Vite and React
- A presentation-focused site rather than a full marketplace backend
- A content hub with property guides and educational resources

### Main Purpose

- Promote PropertyBroker as a trusted real estate platform
- Display featured properties and city-based coverage
- Educate users about Nagpur real estate through guides
- Encourage visitors to contact via WhatsApp or phone

---

## 2. Vision and Goals

### Vision

To become Nagpur's most trusted digital real estate platform by providing transparent property information and expert guidance.

### Goals

- **Lead Generation**: Drive WhatsApp and phone inquiries from property listings
- **SEO Traffic**: Attract organic traffic through educational guide content
- **User Trust**: Build credibility through RERA verification badges and professional presentation
- **Local Focus**: Dominate Nagpur-specific real estate search queries

---

## 3. Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | ^19.2.4 | UI library |
| React DOM | ^19.2.4 | DOM rendering |
| React Router DOM | ^7.14.0 | Client-side routing |
| TypeScript | ~5.9.3 | Type safety |
| Vite | ^8.0.1 | Build tool and dev server |
| @emailjs/browser | ^4.4.1 | Form submission (legacy) |
| emailjs-com | ^3.2.0 | Form submission (legacy) |
| lucide-react | ^1.7.0 | Icons |
| ESLint | ^9.39.4 | Linting |

### Not Present

- Redux / Zustand / Context API for state management
- Tailwind / Bootstrap / SCSS / CSS Modules
- React Hook Form / Formik / Yup / Zod
- Axios / Fetch-based API service layer
- Authentication system
- Server-side rendering

---

## 4. Features

### Implemented Features

| Feature | Status | Description |
|---------|--------|-------------|
| Sticky Navigation | Done | Responsive navbar with mobile menu, phone CTA |
| Hero Section | Done | Search-style UI with locality dropdown |
| Stats Section | Done | Animated counters (2,500+ listings, 15+ localities, etc.) |
| Investment Section | Done | "Why Invest in Nagpur?" with 5 features |
| Property Carousel | Done | Horizontal scroll carousel with drag interaction |
| Why Choose Us | Done | 4 value proposition cards |
| CTA Section | Done | Call-to-action with WhatsApp + navigate |
| Localities Section | Done | 8 Nagpur locality cards |
| Form Component | Done | Lead capture form (cosmetic, EmailJS legacy) |
| Filter Page | Done | 13-category filter with sidebar, URL sync |
| Property Details | Done | Full detail page with gallery, specs, similar properties |
| Guides Listing | Done | Search, categories, articles, resources, FAQ |
| Guide Detail | Done | TOC, content sections, share, related guides |
| Privacy Policy | Done | Static privacy policy page |
| WhatsApp Float | Done | Floating WhatsApp button with pre-filled messages |
| Meta Pixel | Done | Facebook Pixel tracking with PageView on route change |
| Scroll to Top | Done | Automatic scroll restoration on route change |
| SPA Routing | Done | Vercel + Netlify rewrite rules for client-side routing |
| Responsive Design | Done | Mobile-first responsive across all pages |

### Contact System

| Channel | Implementation |
|---------|---------------|
| WhatsApp | `openWhatsApp()` — opens pre-filled WhatsApp message with property details |
| Phone | `makePhoneCall()` — initiates `tel:` call to +91 99212 15145 |

---

## 5. User Roles

| Role | Description | Access Level |
|------|-------------|-------------|
| **Visitor** | Anonymous user browsing the website | Full read access to all public pages |
| **Admin** | (Not implemented) | N/A |

---

## 6. User Journeys

### Journey 1: Property Discovery

1. User lands on Home page
2. Browses featured properties in carousel
3. Clicks "View Details" on a property card
4. Property details open in new tab (preserving filter state)
5. User views gallery, specs, amenities, location
6. User clicks "Connect on WhatsApp" or "Call Company Advisor"
7. Contact action is tracked (ViewContent → Contact → Lead)

### Journey 2: Filtered Search

1. User navigates to `/property-list` (from hero search, locality cards, or navbar)
2. Applies filters (locality, type, BHK, budget, etc.)
3. Browses filtered property grid
4. Clicks property card → opens in new tab
5. Completes contact action

### Journey 3: Content Discovery

1. User navigates to `/guides` (from footer link)
2. Browses guide categories or uses search
3. Reads a guide article
4. Navigates to filter page via CTA ("Browse Properties")

### Journey 4: Deep Link

1. User receives a direct link (e.g., `/property/vrindavan-heights-1`)
2. Page loads with correct property data
3. User views details and makes contact

---

## 7. Business Rules

### Property Rules

- Every property must have a unique `id` across both data files
- Featured properties use IDs 1–6; filter properties use IDs 101–125
- Price must be formatted with `₹` symbol and `L`/`Cr` suffix
- Primary `image` URL is required for every property
- 5 gallery `images` URLs should be provided for each property
- Locality must match entries in `nagpurLocalities.ts`

### Contact Rules

- WhatsApp number: `919921215145` (+91 99212 15145)
- Phone number: `+91 99212 15145`
- All contact actions are tracked via Meta Pixel
- Property details are included in WhatsApp messages

### Filter Rules

- All 13 filter categories are applied simultaneously (AND logic)
- Budget and area use range sliders with min/max values
- BHK "4+ BHK" matches any property with 4 or more bedrooms
- URL query parameter `?locality=...` pre-filters the results

### Property Details Rules

- Similar properties are scored by locality match (+12), type match (+6), and budget proximity (up to +6)
- Top 3 similar properties are displayed
- Property cards open in new tabs to preserve filter state

---

## 8. Functional Requirements

### Home Page

- [x] Display hero section with locality search
- [x] Display animated stats counters
- [x] Display "Why Invest in Nagpur?" section with 5 features
- [x] Display featured property carousel with horizontal scroll
- [x] Display "Why Choose Us" section
- [x] Display CTA section with WhatsApp + navigate buttons
- [x] Display 8 locality cards
- [x] Display contact form

### Filter Page

- [x] Display 13-category filter sidebar
- [x] Display responsive property grid
- [x] Sync locality filter with URL query parameters
- [x] Track search events with debounced analytics
- [x] Show empty state when no properties match

### Property Details Page

- [x] Display breadcrumb navigation
- [x] Display property header with title, location, price
- [x] Display image gallery with thumbnails and navigation
- [x] Display detailed specs grid (2 columns)
- [x] Display amenities list
- [x] Display sticky CTA sidebar with WhatsApp + phone
- [x] Display 3 similar properties
- [x] Handle loading state with skeleton animations
- [x] Handle not-found state
- [x] Update SEO metadata dynamically

### Guides Page

- [x] Display hero section with search
- [x] Display featured guide card
- [x] Display 6 guide categories
- [x] Display guide grid with cards
- [x] Display popular topics chips
- [x] Display downloadable resources
- [x] Display newsletter section (cosmetic)
- [x] Display FAQ accordion
- [x] Display CTA section

### Guide Detail Page

- [x] Display hero with cover image
- [x] Display table of contents (collapsible on mobile)
- [x] Display content sections with images, quotes, tips, info
- [x] Display share buttons (Facebook, Twitter, LinkedIn, copy)
- [x] Display related guides (same category, max 3)
- [x] Handle not-found state

---

## 9. Non-Functional Requirements

### Performance

- Lazy loading for guide pages (`React.lazy` + `Suspense`)
- Intersection Observer for scroll animations (avoids unnecessary paint)
- Debounced filter-change tracking (800ms) — Search event fires on hero search click and on sidebar filter changes
- Client-side filtering (no API latency)

### Accessibility

- Semantic HTML navigation (`<nav>` with `aria-label`)
- Keyboard-navigable gallery arrows
- 44px minimum touch targets on mobile CTAs

### SEO

- Dynamic meta tags (title, description, OG tags, Twitter cards)
- Canonical URL injection
- Semantic HTML structure

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Android)

---

## 10. Current Implementation Status

| Module | Status | Notes |
|--------|--------|-------|
| Home Page | Complete | All sections implemented and responsive |
| Filter Page | Complete | 13-category filter with URL sync |
| Property Details | Complete | Gallery, specs, similar, CTA |
| Guides Listing | Complete | Search, categories, articles |
| Guide Detail | Complete | TOC, content, share, related |
| Privacy Policy | Complete | Static page |
| Analytics | Complete | Meta Pixel with 5 tracked events |
| Contact System | Complete | WhatsApp + Phone with tracking |
| Responsive Design | Complete | Mobile-first across all pages |
| Authentication | Not started | No auth system |
| Admin Panel | Not started | No admin functionality |
| Backend API | Not started | All data is static |

---

## 11. Property Module

### Data Flow

```
Raw Data (data.ts / filterProperties.ts)
    ↓
enrichProperties() (propertyEnricher.ts)
    ↓
Enriched Property objects (slug, bedrooms, images, coordinates, etc.)
    ↓
Components consume enriched data
```

### Property Interface

37 fields total. See [DATA_ARCHITECTURE.md](./DATA_ARCHITECTURE.md) for complete field documentation.

### Key Components

| Component | File | Purpose |
|-----------|------|---------|
| `PropertyCard` | `src/components/PropertyCard.tsx` | Reusable card with image, badge, specs, CTA |
| `PropertyCarousel` | `src/components/PropertyCarousel.tsx` | Horizontal scroll carousel on home page |
| `PropertyDetailsPage` | `src/pages/PropertyDetailsPage.tsx` | Full detail view with gallery, specs, similar |
| `FilterSidebar` | `src/components/FilterSidebar.tsx` | 13-category filter panel |
| `FilterPage` | `src/pages/FilterPage.tsx` | Grid layout with sidebar + property cards |

### Property Card Behavior

- Cards open property details in a **new browser tab** (`target="_blank"`)
- This preserves the user's active filter state on the search page
- WhatsApp button on card sends property-specific message
- Stretched link overlay covers entire card for click target

### Similar Properties Algorithm

1. Score each candidate property (excluding current)
2. Same locality → +12 points
3. Same property type → +6 points
4. Similar price (ratio-based) → up to +6 points
5. Sort by score descending, take top 3

---

## 12. Guide Module

### Data Structure

| Export | Count | Description |
|--------|-------|-------------|
| `GUIDE_CATEGORIES` | 6 | Buying, Selling, Investing, Legal, Home Loans, Interiors |
| `GUIDE_ARTICLES` | 12 | Full articles with sections, images, quotes, tips |
| `POPULAR_TOPICS` | 12 | Tag chips for quick filtering |
| `DOWNLOADABLE_RESOURCES` | 4 | PDF resource cards (cosmetic) |
| `GUIDES_FAQS` | 6 | Accordion FAQ items |

### Listing Page Sections

| Section | Component | Description |
|---------|-----------|-------------|
| Hero | `GuidesHeroSection` | Search bar, badge, subtitle |
| Featured | `FeaturedGuide` | Large 2-column featured guide card |
| Categories | `GuideCategories` | 6 category cards with icons |
| Grid | `GuidesGrid` | 3-column article cards |
| Topics | `PopularTopics` | Tag chips for filtering |
| Resources | `DownloadableResources` | 4 PDF resource cards |
| Newsletter | `GuidesNewsletter` | Email subscription (cosmetic) |
| FAQ | `GuidesFAQ` | Accordion FAQ list |
| CTA | `GuidesCTA` | Browse Properties + Contact buttons |

### Detail Page Features

- Hero with full-width cover image and gradient overlay
- Collapsible table of contents (toggle on mobile)
- Content sections with optional image, quote, tip, and info callouts
- Share buttons (Facebook, Twitter, LinkedIn, copy link)
- Related guides grid (same category, max 3)
- Back button navigation

### Filtering

- Hero search bar filters by title, description, tags, and category
- Popular Topics chips toggle category filtering
- URL params (`/guides?category=buying`) supported via `useSearchParams`

---

## 13. Search and Filtering

### Filter Categories

| # | Category | Type | Options Count |
|---|----------|------|---------------|
| 1 | Locality | Multi-select | 31 |
| 2 | Property Type | Multi-select | 4 |
| 3 | BHK | Multi-select | 4 |
| 4 | Budget | Range slider | Min ₹5L – Max ₹5Cr |
| 5 | Area | Range slider | Min 300 – Max 6,000 sqft |
| 6 | Furnished | Multi-select | 3 |
| 7 | Possession | Multi-select | 5 |
| 8 | Availability | Multi-select | 2 |
| 9 | Property Age | Multi-select | 5 |
| 10 | Facing | Multi-select | 8 |
| 11 | Ownership | Multi-select | 3 |
| 12 | Parking | Multi-select | 3 |
| 13 | Bathrooms | Multi-select | 4 |
| 14 | Floor | Multi-select | 7 |

### URL Synchronization

- Locality filter syncs with URL query parameter: `/property-list?locality=Manish%20Nagar`
- Deep linking from home page locality cards and hero search
- `useLocalityFilter()` hook manages URL state

### Search Analytics

- Tracked on mount and debounced on filter changes (800ms)
- Events: locality, property type, BHK, budget range, area range, furnished, results count

---

## 14. Authentication

**Status**: Not implemented.

- Public routes only
- No login/logout UI
- No token storage
- No permissions or role-based access control

If authentication is added later, it will need to be introduced from scratch.

---

## 15. Admin Functionality

**Status**: Not implemented.

- No admin panel
- No CMS integration
- All data is hardcoded in TypeScript files
- Adding/editing properties requires code changes

---

## 16. SEO Features

### Client-Side SEO

- Dynamic `<title>` tags per page
- Meta description injection
- Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
- Canonical URL injection

### Property Details SEO

- Title: `<Property Title> | <Locality>, Nagpur | PropertyBroker`
- Description: Property description text
- Image: Primary property image
- URL: Canonical URL set to current page URL

### Infrastructure

- `vercel.json` — SPA rewrite rules for Vercel
- `public/_redirects` — SPA redirect rules for Netlify
- All routes work on page refresh and direct URL access

---

## 17. Analytics and Tracking

### Architecture

| File | Purpose |
|------|---------|
| `src/types/analytics.ts` | TypeScript interfaces for event parameters |
| `src/utils/analytics.ts` | Centralized tracking functions (Meta Pixel + GA4) |
| `src/utils/contact.ts` | WhatsApp/Phone helpers with tracking |
| `src/components/MetaPixel.tsx` | Meta Pixel initialization + route-based PageView |

### Tracked Events

| Event | Function | Where Fired |
|-------|----------|-------------|
| **PageView** | `trackPageView()` | `MetaPixel.tsx` — every route change |
| **Search** | `trackSearch()` | `HeroSection.tsx` — on search button click; `FilterPage.tsx` — debounced on sidebar filter changes (800ms, skips mount) |
| **ViewContent** | `trackViewContent()` | `PropertyDetailsPage.tsx` — on property load |
| **Contact** | `trackContact()` | `contact.ts` — called by `openWhatsApp()` and `makePhoneCall()` |
| **Lead** | `trackLead()` | `contact.ts` — called by `openWhatsApp()` and `makePhoneCall()` |

### Meta Pixel ID

`1849098536468259`

### Contact Sources

| Source | Where |
|--------|-------|
| `navbar` | Navbar phone button |
| `whatsapp_float` | Floating WhatsApp button |
| `property_card` | Property card WhatsApp button |
| `property_details` | Property detail page CTA |
| `footer` | Footer links |
| `hero` | Hero section |
| `filter_page` | Filter page |
| `guides` | Guides section |

### Future Provider Support

To add GA4 or GTM, add tracking calls inside `src/utils/analytics.ts`. Each function already supports multiple providers via the `getFbq()` pattern. Add `window.gtag` calls alongside `fbq` calls. Component code stays untouched.

---

## 18. Responsive Design

### Breakpoints

| Breakpoint | Target | Layout |
|------------|--------|--------|
| > 1024px | Desktop | Multi-column grids, sidebar visible |
| 768px – 1024px | Tablet | Adjusted grids, collapsible elements |
| 480px – 768px | Mobile | Single column, stacked layout |
| < 480px | Small Mobile | Compact layout, full-width buttons |

### Responsive Files

| File | Breakpoints |
|------|-------------|
| `src/styles/homeResponsive.css` | 1024px, 768px, 640px, 480px |
| `src/styles/propertyDetails.css` | 1024px, 768px, 480px, 360px |
| `src/styles/guides.css` | 1024px, 768px, 640px, 480px |
| `src/styles/filterPage.css` | 1024px, 768px, 640px, 480px |
| `src/styles/navbar.css` | 768px, 480px |
| `src/styles/footer.css` | 768px, 480px |

### Key Responsive Behaviors

- **Home**: Carousel scrolls horizontally, stats grid adjusts columns, investment section stacks
- **Filter**: Sidebar becomes drawer on mobile, grid adjusts columns
- **Property Details**: Gallery stacks vertically, CTA becomes sticky bottom bar, specs grid single column
- **Guides**: TOC becomes collapsible, grid adjusts columns, newsletter stacks vertically

---

## 19. Project Structure

```
PropertyBroker/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── _redirects              ← Netlify SPA rules
├── src/
│   ├── App.tsx                 ← Router + layout
│   ├── main.tsx                ← Entry point
│   ├── index.css               ← Global styles
│   ├── baseComponents/         ← Shared UI (Badge, Button, etc.)
│   ├── components/             ← Feature components (24 files)
│   ├── data/                   ← Static data (4 files)
│   ├── hooks/                  ← Custom hooks (2 files)
│   ├── pages/                  ← Route pages (6 files)
│   ├── styles/                 ← CSS files (8 files)
│   ├── types/                  ← TypeScript interfaces (2 files)
│   └── utils/                  ← Utilities (5 files)
├── vercel.json                 ← Vercel SPA rules
├── index.html                  ← HTML entry
├── package.json                ← Dependencies
├── tsconfig.json               ← TypeScript config
├── vite.config.ts              ← Vite config
└── eslint.config.js            ← ESLint config
```

### Routes

| Path | Component | Loading |
|------|-----------|---------|
| `/` | `Home` | Eager |
| `/property-list` | `FilterPage` | Eager |
| `/property/:slug` | `PropertyDetailsPage` | Eager |
| `/guides` | `GuidesPage` | Lazy |
| `/guides/:slug` | `GuideDetailPage` | Lazy |
| `/privacy-policy` | `Privacy` | Eager |

### Global Components

Rendered on every page via `App.tsx`:

| Component | Purpose |
|-----------|---------|
| `MetaPixel` | Facebook Pixel initialization + route tracking |
| `ScrollToTop` | Scroll restoration on route change |
| `Navbar` | Navigation bar with logo, links, phone CTA |
| `Footer` | Site footer with links |
| `WhatsAppFloat` | Floating WhatsApp button |

---

## 20. Development Guidelines

### Coding Conventions

- **Files**: PascalCase for components (e.g., `HeroSection.tsx`), camelCase for utilities
- **Exports**: Default exports for components
- **Styling**: Mix of CSS files (`src/styles/`) and inline styles
- **Types**: All interfaces in `src/types/types.ts` and `src/types/analytics.ts`
- **Data**: Static arrays in `src/data/`, transformed by enricher at runtime

### Color Palette

| Color | Usage |
|-------|-------|
| `#1a3c5e` | Primary dark navy (headings, text) |
| `#2563eb` | Primary blue (buttons, links, accents) |
| `#60a5fa` | Accent blue (highlights, icons) |
| `#f8fafc` | Light section backgrounds |
| `#ffffff` | White surfaces |
| `#64748b` / `#94a3b8` | Secondary text |
| `#10b981` | Success/green badge |
| `#25D366` | WhatsApp green |
| `#f59e0b` | Amber badge |
| `#8b5cf6` | Purple badge |

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: DM Sans (sans-serif)
- Both loaded from Google Fonts in `index.html`

### Adding a New Feature

1. Search for existing similar components
2. Decide placement: `src/components/`, `src/pages/`, `src/hooks/`, or `src/data/`
3. Add/update content data if shared
4. Implement the UI
5. If it's a page, add a route in `App.tsx`
6. Add styles to `src/styles/` or use inline styles
7. Add types to `src/types/types.ts`
8. Verify in browser and build

### Adding a New Page

1. Create file in `src/pages/` with PascalCase name
2. Export default function component
3. Import in `App.tsx` and add `<Route>`
4. If lazy-loaded, use `React.lazy()` with `Suspense`

### Things to Never Do

- Don't introduce a state management library unless truly needed
- Don't add a new styling system (keep CSS files + inline styles)
- Don't hard-code content that belongs in `src/data/`
- Don't create duplicate components when similar ones exist
- Don't add pages without wiring into `App.tsx`
- Don't bypass component structure by putting UI in `App.tsx`

### Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Production build (tsc + vite)
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

---

## 21. Future Roadmap

### Phase 1: Real Data

- [ ] Replace placeholder Unsplash images with real property photos
- [ ] Update property data with actual Nagpur listings
- [ ] Add real guide content

### Phase 2: Backend

- [ ] REST API for properties
- [ ] Admin panel for CRUD operations
- [ ] User authentication
- [ ] Saved searches and favorites

### Phase 3: Enhanced Features

- [ ] Property comparison tool
- [ ] Mortgage calculator
- [ ] Virtual tours / 3D walkthroughs
- [ ] Multi-language support (Hindi, Marathi)
- [ ] Email notifications for new listings

### Phase 4: Business

- [ ] Agent/broker portal
- [ ] Lead management system
- [ ] Payment integration
- [ ] RERA verification API integration

---

## 22. Known Limitations

1. **Static Data**: All properties and guides are hardcoded — no CMS or admin panel
2. **No Authentication**: No user accounts, saved searches, or favorites
3. **No Backend**: No API, database, or server-side logic
4. **Form Submission**: Contact form is cosmetic (EmailJS legacy, not actively used)
5. **No Real-time Data**: Property availability and pricing may be outdated
6. **SEO Limitations**: Client-side SEO only — no server-side rendering for search engines
7. **No A/B Testing**: No experimentation framework
8. **No Error Boundaries**: No global error boundary or fallback UI
9. **Image Management**: Images are URLs in code — no image upload or management system

---

## Appendix A: Environment Variables

| Variable | Purpose |
|----------|---------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID (legacy) |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID (legacy) |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key (legacy) |

---

## Appendix B: Hosting Configuration

### Vercel (`vercel.json`)

```json
{
  "rewrites": [
    {
      "source": "/((?!assets/|favicon\\.svg|icons\\.svg|robots\\.txt|sitemap\\.xml|manifest\\.json|.*\\..*).*)",
      "destination": "/index.html"
    }
  ]
}
```

### Netlify (`public/_redirects`)

```
/*    /index.html   200
```

Both configurations serve `index.html` for all non-static routes, allowing React Router to handle client-side routing.

---

## Appendix C: Property Enricher

The `propertyEnricher.ts` utility transforms raw property data into fully enriched Property objects:

| Input Field | Generated Output |
|-------------|------------------|
| `title` + `id` | `slug` (URL-friendly) |
| `type` | `propertyType` (copy) |
| `bhk` | `bedrooms` (parsed number) |
| `furnished` | `furnishing` (copy) |
| `location` | `city`, `address` (parsed) |
| `floor` | `totalFloors` (calculated) |
| `image` | `thumbnail` (copy) |
| (center) | `coordinates` (Nagpur center + offset) |

---

*Last updated: July 2026*
