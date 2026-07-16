# Product Documentation

## Changelog

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

### Reusable Components Created/Modified
* **[PropertyDetailsPage.tsx](file:///d:/Sanket/GitSanket/PropertyBroker/src/pages/PropertyDetailsPage.tsx)**: Main composition page.
* **[PropertyCard.tsx](file:///d:/Sanket/GitSanket/PropertyBroker/src/components/PropertyCard.tsx)**: Refactored with anchor wraps, separate z-index buttons, and whatsapp builders.
* **[propertyEnricher.ts](file:///d:/Sanket/GitSanket/PropertyBroker/src/utils/propertyEnricher.ts)**: Shared database mapper.
* **[parsePrice.ts](file:///d:/Sanket/GitSanket/PropertyBroker/src/utils/parsePrice.ts)**: Enhanced to match both abbreviated `L`/`lakh` and `Cr`/`crore` price tags.
* **[propertyDetails.css](file:///d:/Sanket/GitSanket/PropertyBroker/src/styles/propertyDetails.css)**: Section layouts, sticky transitions, responsive rules, and skeletons.
