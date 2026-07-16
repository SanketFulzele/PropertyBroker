# Product Documentation

## Changelog

### SPA Routing Configuration — React Router Refresh Fix

**Problem:** When users refresh or directly navigate to client-side routes (`/filter`, `/filter?locality=...`, `/property/:slug`), the hosting server returns a 404 error because it tries to find a physical file matching the path instead of serving `index.html`.

**Solution:** Configured SPA rewrite rules for both Vercel and Netlify hosting platforms to serve `index.html` for all non-static routes.

#### New Files

| File | Purpose |
|---|---|
| `vercel.json` | Vercel hosting SPA rewrite configuration |
| `public/_redirects` | Netlify hosting SPA redirect rules |

#### How It Works

- **Vercel (`vercel.json`):** Uses regex-based rewrite rules to route all non-static requests to `index.html`. Excludes assets, favicon, icons, robots.txt, sitemap.xml, manifest.json, and file extensions.
- **Netlify (`_redirects`):** Uses a catch-all redirect rule `/* → /index.html` with status `200` (rewrite, not redirect).
- **React Router:** Uses `BrowserRouter` which handles client-side routing. The server configuration ensures `index.html` is always served, allowing React Router to take over.

#### Supported Routes

All routes now work correctly when:
- Opening in a new tab
- Refreshing the page
- Copy-pasting the URL into a new browser
- Using browser Back/Forward buttons

Routes:
- `/` — Home page
- `/filter` — Filter page
- `/filter?locality=Manish%20Nagar` — Filter with query parameters
- `/property/:slug` — Property details page
- `/privacy-policy` — Privacy policy page

#### Static Assets Not Affected

Rewrites do NOT interfere with:
- Images (`.png`, `.jpg`, `.svg`, `.gif`, `.webp`)
- Icons (`.ico`)
- CSS files (`.css`)
- JavaScript bundles (`.js`)
- Manifest (`manifest.json`)
- Robots.txt (`robots.txt`)
- Sitemap (`sitemap.xml`)
- Fonts (`.woff`, `.woff2`, `.ttf`, `.otf`)

---

### Scroll Position Fix — Route-Based Scroll Restoration
* **Problem:** Navigating to the Filter page (from Popular Localities cards, Hero Search, or any route transition) opened at the previous scroll position instead of the top of the page.
* **Solution:** Added a centralized, reusable `ScrollToTop` component that automatically scrolls to the top of the window on every route change.
* **Impact:** Affects [App.tsx](file:///d:/Sanket/GitSanket/PropertyBroker/src/App.tsx) and resolves scroll reset issues globally across all routes.

---

### Property Details Page Feature
* **Goal:** Create a modern, high-converting details view for properties to display extensive parameters, amenities, and drives leads through a sticky call-to-action bar.

#### 1. Routing Architecture
* **URL Structure:** Preferred route is `/property/:slug` with fallback matching of `/property/:id`.
* **Behavior:** Every [PropertyCard](file:///d:/Sanket/GitSanket/PropertyBroker/src/components/PropertyCard.tsx) (used in the Search/Filters grid and Featured Carousels) is wrapped with a stretched anchor overlay that opens the property details page in a **new browser tab** (`target="_blank" rel="noopener noreferrer"`). This preserves the user's active filter states on the search page.
* **Deep Linking:** Deep links are fully supported. Since routing relies on React Router, refreshes load the correct property details page by querying the combined lookup pool.
* **Error Handling:** If an invalid slug or ID is typed, a clean **Property Not Found** page renders with a button directing back to the active listings filter page.

#### 2. Data Architecture & Property Model
Defined in [types.ts](file:///d:/Sanket/GitSanket/PropertyBroker/src/types/types.ts) and enriched at runtime using the utility [propertyEnricher.ts](file:///d:/Sanket/GitSanket/PropertyBroker/src/utils/propertyEnricher.ts):
* **Fields Supported:** `id`, `slug`, `title`, `description`, `price`, `propertyType` (type), `bhk`, `bedrooms`, `bathrooms`, `area`, `locality`, `city`, `address`, `location`, `furnishing` (furnished), `parking`, `propertyAge`, `availability`, `facing`, `ownership`, `floor`, `totalFloors`, `amenities`, `image` (primary), `images` (multi-image array), `thumbnail`, `possession`, and `coordinates` (latitude/longitude coordinates).
* **API Readiness:** By routing data through a unified `enrichProperties` wrapper, the UI components remain completely separated from static data files. Replacing local datasets with a backend API in the future will only require swapping the source data call in the parent pages.

#### 3. Visual Layout & Gallery
* **Two-Column Desktop View:** Displays media gallery, overview, descriptions, and location in the main column (60% width), with a sticky builder CTA sidebar card in the right column (40% width).
* **Responsive Breakpoints:** Under `< 1024px`, the layout stacks vertically. Under `< 768px` (mobile), the builder block transforms into a sticky bottom CTA banner, hiding developer details to maximize mobile screen real estate.
* **Professional Gallery:**
  * Displays a large preview image and vertical thumbnails (desktop) or horizontal scroll thumbnails (mobile).
  * Automatically hides thumbnails when only one image is available.
  * Pulses skeleton loaders during initial image download states and handles broken URLs gracefully with Unsplash fallback images.
  * Connects manual chevron arrows (`ChevronLeft` / `ChevronRight`) allowing keyboard-friendly navigation.

#### 4. Primary CTA & WhatsApp Integration
* **Contact Options:** Integrates WhatsApp chat and direct phone links, using the configured broker number `919921215145`.
* **Dynamic Messages:** Generates a custom, URL-encoded string detailing the listing Title, Locality, Price, and active current URL (`window.location.href`) for high-intent lead collection.

#### 5. Similar Properties Logic
Renders a grid of 3 similar property cards at the bottom of the page, scoring candidates using a math-based utility:
1. **Locality Match:** Candidates in the same locality receive `+12` points.
2. **Property Type Match:** Candidates sharing the same category (e.g. Villa vs Apartment) receive `+6` points.
3. **Budget Match:** Closer prices receive a higher score (up to `+6` points), computed by ratio distance.
4. Excludes the current active property.

#### 6. Client-Side SEO Metadata
* Programmatically updates page elements inside React's layout effect:
  * Document `title` is set to `<Title> | <Locality>, Nagpur`.
  * Meta tags (`description`, `canonical`, and social cards `og:title`, `og:image`, `twitter:card`, etc.) are updated dynamically in the DOM, keeping initial bundles extremely lightweight.

---

### "Why Invest in Nagpur?" Section

* **Goal:** Educate users about Nagpur's investment potential, build trust, and drive traffic to the property filter page.
* **Placement:** Renders between `StatsSection` and `PropertyCarousel` on the Home page.

#### 1. Component Architecture
* **Component:** `src/components/HomeInvestmentSection.tsx`
* **Type Interface:** `InvestmentFeature` added to `src/types/types.ts` (`icon`, `title`, `desc`).
* **Data-Driven:** All five features defined in a `FEATURES` array at the top of the file — new investment points can be added by appending to this array with zero layout changes.

#### 2. Features Displayed
| Icon (lucide-react) | Title | Description |
|---|---|---|
| `Train` | Metro Connectivity | Public transport and road connectivity improvements |
| `Building2` | MIHAN Growth Corridor | Industrial/IT hub driving employment and demand |
| `IndianRupee` | Affordable Property Prices | Quality homes at prices below major metros |
| `TrendingUp` | High Rental Demand | Rental opportunities from professionals, students, families |
| `Landmark` | Future Infrastructure | Highways, commercial projects, smart city initiatives |

#### 3. Design
* Dark premium gradient background (`#0f172a → #1e3a5f → #0f172a`) matching the existing WhyUsSection.
* Subtle dot-grid pattern overlay for texture.
* Glassmorphism feature cards (`rgba(255,255,255,0.06)` + `backdrop-filter: blur(12px)`).
* Rounded icon containers with soft blue accents (`#60a5fa`).
* Entrance animations via `useIntersectionObserver` with staggered delays.
* Hover: card background shifts to blue tint, lifts up 4px.

#### 4. Responsive Behavior
* **Desktop (>1024px):** 5-column grid.
* **Tablet (≤1024px):** 2-column grid; 5th card spans full width centered.
* **Mobile (≤640px):** Single column stack.
* Breakpoints handled via embedded `<style>` tag with `!important` overrides (consistent with project patterns).

#### 5. CTA Button
* Text: "Explore Investment Areas"
* Navigates to `/filter` via React Router `useNavigate`.
* Styled as outline button with blue accent, hover fills with blue tint and lifts.

---

### Analytics & Event Tracking System

**Goal:** Centralize all analytics tracking into a single utility layer, making it easy to swap providers (Meta Pixel, GA4, GTM) without touching component code.

#### Architecture

| File | Purpose |
|---|---|
| `src/types/analytics.ts` | TypeScript interfaces for all event parameters |
| `src/utils/analytics.ts` | Centralized tracking functions (Meta Pixel + future GA4/GTM) |
| `src/utils/contact.ts` | WhatsApp/Phone helpers that track + execute actions |

#### Tracked Events

| Event | Function | Where Fired |
|---|---|---|
| **PageView** | `trackPageView()` | `MetaPixel.tsx` — every route change |
| **Search** | `trackSearch()` | `FilterPage.tsx` — on mount + debounced filter changes (800ms) |
| **ViewContent** | `trackViewContent()` | `PropertyDetailsPage.tsx` — once on property load |
| **Contact** | `trackContact()` | `contact.ts` — called by `openWhatsApp()` and `makePhoneCall()` |
| **Lead** | `trackLead()` | `contact.ts` — called by `openWhatsApp()` and `makePhoneCall()` |

#### Contact Utility

All WhatsApp and phone interactions flow through `src/utils/contact.ts`:
- `openWhatsApp({...})` — opens WhatsApp with tracking, supports property-specific messages
- `makePhoneCall({...})` — initiates call with tracking
- `getWhatsAppUrl()` / `getPhoneUrl()` — URL generators without side effects
- Phone number centralized: `919921215145` (+91 99212 15145)

#### Integration Points

| Component | Action Tracked |
|---|---|
| `WhatsAppFloat.tsx` | WhatsApp via `openWhatsApp({ source: "whatsapp_float" })` |
| `Navbar.tsx` | Phone via `makePhoneCall({ source: "navbar" })` |
| `PropertyCard.tsx` | WhatsApp via `openWhatsApp({ source: "property_card", ... })` |
| `PropertyDetailsPage.tsx` | WhatsApp + Phone via contact utils, ViewContent on load |
| `FilterPage.tsx` | Search on mount + debounced filter changes |
| `MetaPixel.tsx` | PageView on every route change via `trackPageView()` |

#### Future Provider Support

To add GA4 or GTM, add tracking calls inside `src/utils/analytics.ts` — each function already supports multiple providers via the `getFbq()` pattern. Add `window.gtag` calls alongside `fbq` calls. Component code stays untouched.

---

### Reusable Components Created/Modified
* **[HomeInvestmentSection.tsx](file:///d:/Sanket/GitSanket/PropertyBroker/src/components/HomeInvestmentSection.tsx)**: "Why Invest in Nagpur?" section — data-driven, responsive, dark premium theme.
* **[PropertyDetailsPage.tsx](file:///d:/Sanket/GitSanket/PropertyBroker/src/pages/PropertyDetailsPage.tsx)**: Main composition page.
* **[PropertyCard.tsx](file:///d:/Sanket/GitSanket/PropertyBroker/src/components/PropertyCard.tsx)**: Refactored with anchor wraps, separate z-index buttons, and whatsapp builders.
* **[propertyEnricher.ts](file:///d:/Sanket/GitSanket/PropertyBroker/src/utils/propertyEnricher.ts)**: Shared database mapper.
* **[parsePrice.ts](file:///d:/Sanket/GitSanket/PropertyBroker/src/utils/parsePrice.ts)**: Enhanced to match both abbreviated `L`/`lakh` and `Cr`/`crore` price tags.
* **[propertyDetails.css](file:///d:/Sanket/GitSanket/PropertyBroker/src/styles/propertyDetails.css)**: Section layouts, sticky transitions, responsive rules, and skeletons.
