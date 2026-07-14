# Property Broker Project Guide

## 1. Project Overview

This project is a React + TypeScript landing page for a property brokerage brand called PropertyBroker. The current codebase is focused on presenting the brand, showcasing featured properties, highlighting city coverage, and collecting lead inquiries through a contact form.

### What this project is
- A single-page marketing and lead-generation website.
- A front-end application built with Vite and React.
- A presentation-focused site rather than a full marketplace backend.

### Main purpose
- Promote PropertyBroker as a trusted real estate platform.
- Display featured properties and city-based coverage.
- Encourage visitors to contact the company using a form.

### Features currently implemented
- Sticky navigation bar with a mobile menu.
- Hero section with a search-style UI.
- Featured property carousel.
- Stats section with animated counters.
- Why-choose-us section.
- Cities section.
- CTA section.
- Contact form with client-side validation and EmailJS submission.
- Floating WhatsApp CTA.
- Privacy policy page.

### Target users
- Prospective home buyers and renters.
- Visitors interested in property listings and real estate services.
- People who want to contact the brokerage for guidance.

### High-level architecture
The application is composed of:
- A top-level App component that sets up routing.
- Page-level components in src/pages.
- Reusable section components in src/components.
- Data definitions in src/data/data.ts.
- Styles in src/styles and some inline style objects inside components.

---

## 2. Tech Stack

The following technologies are used in the project.

| Technology | Evidence in project | Notes |
|---|---|---|
| React | package.json | Used for the UI. |
| React DOM | package.json | Used for rendering the app. |
| TypeScript | package.json, tsconfig files | TypeScript is configured and used throughout the app. |
| Vite | package.json, vite.config.ts | Build tool and dev server. |
| React Router DOM | package.json | Used for page routing. |
| EmailJS | package.json, FormComponent.tsx | Used to send form submissions. |
| Lucide React | package.json | Used for icons in the WhyUs section. |
| CSS files | src/styles | Styling is done with plain CSS files and inline styles. |
| ESLint | eslint.config.js | Linting is configured. |
| TypeScript ESLint | package.json, eslint.config.js | TypeScript linting rules are enabled. |

### Version information
The versions currently declared in package.json are:
- React: ^19.2.4
- React DOM: ^19.2.4
- React Router DOM: ^7.14.0
- TypeScript: ~5.9.3
- Vite: ^8.0.1
- ESLint: ^9.39.4
- @vitejs/plugin-react: ^6.0.1

### Not present in the current codebase
- Redux / Zustand / Context API for app-wide state management
- Tailwind / Bootstrap / SCSS / CSS Modules
- React Hook Form / Formik / Yup / Zod
- Axios / Fetch-based API service layer
- Authentication system
- Server-side rendering

---

## 3. Project Folder Structure

The project uses a simple structure centered around src/.

```text
src/
  App.tsx
  main.tsx
  index.css
  App.css
  assets/
  components/
  data/
  hooks/
  pages/
  styles/
  types/
```

### src/
The main application source folder.

### src/pages/
Contains page-level components.
- Home.tsx: landing page composition.
- Privacy.tsx: privacy policy page.

### src/components/
Contains reusable section components and UI building blocks.
Examples:
- Navbar.tsx
- Footer.tsx
- HeroSection.tsx
- PropertyCarousel.tsx
- FormComponent.tsx
- WhatsAppFloat.tsx

### src/data/
Contains static content used by the UI.
- data.ts exports PROPERTIES, STATS, and CITIES.

### src/hooks/
Contains reusable hooks.
- hooks.ts exports useIntersectionObserver and useCountUp.

### src/styles/
Contains CSS files for component-level styling.
- navbar.css
- footer.css
- form.css

### src/types/
Contains TypeScript interfaces.
- types.ts defines Property, Stat, and City.

### src/assets/
Contains local static assets such as images and SVGs.
- hero.png
- react.svg
- vite.svg

### public/
Public static files served directly by Vite.
- favicon.svg
- icons.svg

---

## 4. Routing Convention

Routing is handled by React Router in App.tsx.

### Where pages are created
Pages are created in src/pages/.

### How routes are added
Routes are added in App.tsx using the Routes and Route components.

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/privacy-policy" element={<Privacy />} />
</Routes>
```

### Current routes
| Path | Component |
|---|---|
| / | Home |
| /privacy-policy | Privacy |

### Nested routes
There are no nested routes in the current codebase.

### Protected routes
There are no protected routes in the current implementation.

### Dynamic routes
There are no dynamic route parameters in the current codebase.

### Lazy loading
No lazy loading is used.

---

## 5. Component Guidelines

This project uses a simple component structure.

### Where new components should be created
- Create page-specific sections in src/components/ if they are used inside a page.
- Create full pages in src/pages/.

### Component categories in this project
- Pages: full route-level views such as Home and Privacy.
- Components: section-level UI pieces such as HeroSection and FormComponent.
- Reusable UI: there is no formal shared UI library folder; components are simply placed in src/components/.
- Layouts: there are no dedicated layout components such as AppLayout or MainLayout.

### Naming convention
- Component files use PascalCase names.
- Examples: Navbar.tsx, HeroSection.tsx, FormComponent.tsx.

### File naming
- Use .tsx for React components.
- Use .css for component-specific styles.
- Use .ts for non-component TypeScript files such as data and types.

### Folder naming
- Keep feature-related components in src/components/.
- Keep page-level views in src/pages/.
- Keep shared hooks in src/hooks/.

### Export style
The codebase mostly uses default exports for components.

```tsx
export default function Navbar() {
  // ...
}
```

---

## 6. Styling Guidelines

The project uses a mix of CSS files and inline styles.

### Styling approach used
- Plain CSS files in src/styles/ for component-specific styling.
- Inline style objects inside many components.
- No CSS Modules.
- No Tailwind.
- No Bootstrap.
- No SCSS.

### Where global styles exist
Global base styles are defined in src/index.css.

### Global CSS behavior in index.css
The file currently contains:
- A reset for box-sizing, margin, and padding.
- Smooth scrolling for html.
- Base body styling.
- Keyframes for fadeUp and bounce.
- Scrollbar styling.

### Colors and CSS variables
There are no CSS custom properties defined in the project. The code uses hard-coded color values directly in CSS and inline style objects.

### Typography rules used in the project
The project uses two main font families:
- Playfair Display for headings
- DM Sans for body text

These fonts are loaded from Google Fonts in index.html.

### Spacing system
There is no formal spacing system or design token system. Spacing is applied directly using values like 12px, 16px, 24px, 40px, 60px, and 100px.

### Border radius system
There is no shared radius scale. Radius values are applied inline and in CSS as needed, often using values like 8px, 10px, 12px, 20px, 24px, and 28px.

### Shadows
Shadows are used directly in style objects and CSS files. Examples include soft card elevation and floating button effects.

### Responsive breakpoints
Responsive behavior is implemented with standard CSS media queries, especially in navbar.css and form.css.
Observed breakpoints include:
- 1024px
- 768px
- 480px
- 320px

### When to use each styling method
- Use src/styles/*.css for reusable component styling where the component has a larger amount of layout or state styling.
- Use inline styles when the component needs small visual adjustments or one-off effects.
- Avoid introducing a new styling system unless the existing pattern is changed deliberately.

---

## 7. Color Palette

There are no CSS variables defined in the codebase. The palette is currently hard-coded.

| Variable | Value | Usage |
|---|---|---|
| None defined | None | The project does not currently use CSS custom properties. |

### Common colors observed in the codebase
| Color | Used for |
|---|---|
| #1a3c5e | Primary dark navy |
| #2563eb | Primary blue |
| #60a5fa | Accent blue |
| #f8fafc | Light section background |
| #ffffff | White surfaces |
| #64748b / #94a3b8 | Secondary text |
| #10b981 | Success/green badge |
| #25D366 | WhatsApp green |

---

## 8. Reusable Components

The following components are reusable section-level UI pieces.

### Navbar
- Purpose: Top navigation with logo, menu items, phone link, and mobile menu.
- Props: None.
- When to use: On the main app shell across pages.
- Example: Used in App.tsx above all routes.

### Footer
- Purpose: Site-wide footer with company, properties, and support links.
- Props: None.
- When to use: On the main app shell across pages.
- Example: Used in App.tsx below the routes.

### HeroSection
- Purpose: Large landing section with title, description, and property search-style UI.
- Props: None.
- When to use: As the first major section on the home page.

### PropertyCarousel
- Purpose: Featured properties slider with previous/next controls and drag interaction.
- Props: None.
- When to use: On the home page to display featured listings.

### StatsSection
- Purpose: Displays company stats and animated counters.
- Props: None.
- When to use: On the home page beneath the hero section.

### WhyUsSection
- Purpose: Explains the value proposition using icon cards.
- Props: None.
- When to use: On the home page.

### CTASection
- Purpose: Call-to-action banner encouraging visitors to browse or call.
- Props: None.
- When to use: On the home page.

### CitiesSection
- Purpose: Displays city cards with images and property counts.
- Props: None.
- When to use: On the home page.

### FormComponent
- Purpose: Lead capture form that collects name, phone, property intent, and message.
- Props: None.
- When to use: On the home page, near the bottom of the landing experience.

### WhatsAppFloat
- Purpose: Floating WhatsApp button that opens a pre-filled chat URL.
- Props: None.
- When to use: Globally across the app.

---

## 9. Utility Functions

The project has a small utility layer in src/hooks/ rather than a separate utils/ folder.

### useIntersectionObserver
- Location: src/hooks/hooks.ts
- Purpose: Tracks whether a component is visible in the viewport.
- Usage: Used by sections that animate into view.

### useCountUp
- Location: src/hooks/hooks.ts
- Purpose: Creates a counting animation for statistics.
- Usage: Used in StatsSection to animate numeric stats.

### No dedicated helper folder
There is no src/utils/ or src/helpers/ directory in the current codebase. Utility logic is currently kept in hooks or inline component code.

---

## 10. API Structure

There is no formal API layer in this codebase.

### Where APIs live
- There is no src/api/ or src/services/ folder.
- The project does not currently use Axios or fetch-based request modules.

### How API calls are made
The only network interaction in the current codebase is the EmailJS submission from FormComponent.tsx.

```tsx
await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    name: formData.name,
    phone: formData.phone,
    propertyType: formData.propertyType,
    message: formData.message,
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);
```

### Axios instance
There is no Axios instance.

### Interceptors
There are no interceptors.

### Authentication
There is no authentication implementation.

### Error handling
Form submission errors are caught in the component and logged to the console.

### Headers
No request headers are configured because no API client is used.

### Environment variables
The project uses EmailJS environment variables in the form component.

---

## 11. State Management

The project does not use a global state management library.

### Current state pattern
- Local component state is handled with React useState.
- Reusable logic is extracted into custom hooks.

### What exists
- HeroSection uses local state for the active tab and selected city.
- FormComponent uses local state for form input, loading, submission status, and focus state.
- PropertyCarousel uses local state for the current slide, dragging behavior, and translation.

### What is not used
- Redux
- Zustand
- Context API

### Best practice for this project
Use local state for component-level UI state. Avoid introducing a state library until a real cross-component shared state requirement appears.

---

## 12. Forms

The contact form is implemented in FormComponent.tsx.

### How forms are built
- The form uses standard HTML form elements.
- Input state is stored with React useState.
- The UI uses CSS classes from src/styles/form.css.

### Validation library
No form library such as React Hook Form, Formik, Yup, or Zod is used.

### Validation behavior
The form currently uses:
- Browser required attributes on key fields.
- A basic JavaScript check before submission.
- An alert if required fields are missing.

### Error handling
- Validation errors are handled inline.
- Submission failures are caught with try/catch.
- The UI shows a success state after a successful send.

### Reusable inputs
There are no reusable input components yet; the form is implemented directly in FormComponent.tsx.

---

## 13. Authentication

No authentication system is implemented in the current project.

### What is present
- Public routes only.
- No login UI.
- No logout UI.
- No token storage.
- No refresh token flow.
- No permissions or role-based access control.

### What to expect
If authentication is added later, it will need to be introduced from scratch because there is no existing auth pattern in the codebase.

---

## 14. Environment Variables

The project uses environment variables for EmailJS.

| Variable | Purpose |
|---|---|
| VITE_EMAILJS_SERVICE_ID | EmailJS service identifier used by the contact form. |
| VITE_EMAILJS_TEMPLATE_ID | EmailJS template identifier. |
| VITE_EMAILJS_PUBLIC_KEY | Public key for EmailJS. |

### Notes
- These values are read using import.meta.env.
- No other environment variables appear in the codebase.
- Do not commit secrets. The current code uses public values only, and any real credentials should stay in local environment files.

---

## 15. Assets

Assets are stored in a few different places.

### Local assets
- src/assets/ contains local image and SVG files.
- public/ contains public files such as favicon.svg and icons.svg.

### Remote assets
The property cards and city cards use image URLs from Unsplash.

### Where to place new assets
- Use src/assets/ for project-owned images or icons that are imported into components.
- Use public/ for files that should be served directly at a URL.
- Prefer keeping images and media references centralized in data files when they are part of content data.

---

## 16. Constants

The project does not have a dedicated constants folder.

### Current constants-like values
- Property content is stored in src/data/data.ts.
- Section content is often defined inline inside components.
- Repeated UI text, such as labels and section headlines, is currently embedded directly in components.

### Configuration files
- vite.config.ts contains Vite configuration.
- tsconfig files contain TypeScript compiler settings.
- eslint.config.js contains linting config.

---

## 17. Coding Standards

The project follows a lightweight set of conventions that can be inferred from the existing code.

### Component naming
- Use PascalCase for React components.
- Example: HeroSection, Navbar, FormComponent.

### Variable naming
- Use camelCase for variables and state names.
- Example: activeTab, searchCity, mobileMenuOpen.

### Function naming
- Use camelCase for functions.
- Example: handleSubmit, handleChange, scrollTo.

### File naming
- Use PascalCase for component files.
- Use lowercase or kebab-style names only when required by tooling; the current repo primarily uses PascalCase for components and lowercase for styles.

### Folder naming
- Keep feature-oriented folders such as components, pages, hooks, styles, data, and types.

### Import ordering
Imports are generally grouped by source type:
1. React imports
2. Local imports
3. Style imports

### Export style
Default exports are the dominant pattern in the project.

### Destructuring rules
Destructuring is used where it improves readability, such as extracting values from form events and props.

### Optional chaining usage
Optional chaining is used sparingly in the code, especially where DOM access is involved.

### Null checking
The project uses strict TypeScript and non-null assertions in main.tsx, but other areas rely on simple checks.

### Async/await usage
The form submission uses async/await.

### Error handling
- Use try/catch for async work.
- Log errors to the console when they occur.
- UI-level validation is kept simple.

### Comments style
Comments are used sparingly and mostly to explain non-obvious UI sections.

### Formatting style
The project does not appear to enforce a strict formatter. Code style is readable and consistent enough to be understood without a complex setup.

---

## 18. Best Practices Used In This Project

The following practices are already present in the codebase.

- Reuse shared content through src/data/data.ts instead of hard-coding repeated values in multiple places.
- Split the page into section-level components rather than keeping everything in one file.
- Use custom hooks for shared behavior such as visibility and counting animation.
- Keep the app shell consistent by rendering Navbar and Footer globally.
- Use CSS files for larger pieces of component styling rather than pouring everything into inline style objects.
- Keep content-driven data separate from UI logic where possible.

---

## 19. How To Add A New Feature

Follow this sequence when adding a new feature.

1. Search the existing codebase for a similar component or pattern.
2. Decide whether the feature belongs in src/components/, src/pages/, src/hooks/, or src/data/.
3. Add or update content data if the feature depends on reusable content.
4. Implement the UI in the appropriate component.
5. If the feature is a page, add a route in App.tsx.
6. If the feature needs styling, add or update a CSS file in src/styles/.
7. If the feature needs a new type, add it to src/types/types.ts.
8. Verify that the feature works in development mode.
9. Keep the feature consistent with the project’s visual language and content structure.

---

## 20. How To Add A New Page

To add a new page:

1. Create a file in src/pages/ using PascalCase, for example UserGuide.tsx.
2. Create the page component and return the page content.
3. Import the page into App.tsx.
4. Add a Route entry.

Example:

```tsx
import MyNewPage from "./pages/MyNewPage";

<Route path="/my-new-page" element={<MyNewPage />} />
```

5. If the page needs to be reachable from navigation, update the relevant navigation component.
6. If the page requires styling, add a CSS file in src/styles/ or use inline styles sparingly.
7. If the page uses data, place that data in src/data/data.ts if it is shared content.

### Page title
The current index.html sets the page title to propertybroker. If a new page needs a better title, update index.html or use a future routing-based title strategy.

---

## 21. How To Add A New Component

To add a new component:

1. Create a file in src/components/ with a PascalCase name.
2. Export a default function component.
3. Keep the component focused on one responsibility.
4. Add styles to an appropriate CSS file in src/styles/ if the styling is larger than a small inline object.
5. If the component needs shared data, import it from src/data/data.ts.
6. If the component needs typing, add interfaces to src/types/types.ts.
7. Reuse the component rather than duplicating similar UI elsewhere.

Example structure:

```tsx
export default function NewComponent() {
  return <div />;
}
```

---

## 22. Common Patterns

The project repeatedly uses a few patterns.

### Section-based page composition
The Home page is built by composing section components in order.

### Data-driven cards
Property cards and city cards are rendered from arrays defined in data.ts.

### Reveal-on-scroll effects
Sections use a custom intersection observer hook to animate when they enter the viewport.

### CTA-driven lead capture
The site uses a form and WhatsApp button to drive user actions.

### Repeated visual language
The design uses a consistent dark navy / blue palette, serif headings, and rounded cards.

---

## 23. Error Handling

The current project has limited error handling.

### API errors
There is no API layer, so there are no API-specific error boundaries or retry flows.

### Validation errors
The form uses basic validation with alert messages.

### UI errors
The current UI does not include a global error boundary or fallback state.

### Best practice in this codebase
If new functionality uses async logic, keep the error handling simple and visible in the UI.

---

## 24. Performance Optimizations

The following performance-related practices are already used.

- useCallback is used for carousel navigation functions.
- useRef is used for DOM access in the property carousel.
- IntersectionObserver is used to avoid unnecessary animations until content is visible.
- The app uses component-level render composition rather than heavy data processing.

### Not currently used
- memo
- useMemo
- useCallback for many unrelated callbacks
- lazy loading
- Suspense
- virtualization

---

## 25. Libraries Used

| Package | Purpose |
|---|---|
| react | UI library |
| react-dom | Rendering |
| react-router-dom | Routing |
| @emailjs/browser | Form submission |
| lucide-react | Icons |
| vite | Build tool |
| @vitejs/plugin-react | Vite React plugin |
| typescript | Type safety |
| eslint | Linting |
| @eslint/js | Base ESLint config |
| typescript-eslint | TypeScript ESLint integration |

---

## 26. Development Workflow

### Install dependencies
Run:

```bash
npm install
```

### Run locally
Run:

```bash
npm run dev
```

### Build the app
Run:

```bash
npm run build
```

### Lint the codebase
Run:

```bash
npm run lint
```

### Preview the production build
Run:

```bash
npm run preview
```

### Deployment
There is no deployment configuration file in the repository. The project is currently set up for Vite-based deployment, but the actual deployment target is not defined in the source code.

---

## 27. Frequently Used Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

---

## 28. Important Files

### package.json
Defines scripts, dependencies, and versions.

### vite.config.ts
Vite configuration for the project.

### tsconfig.json / tsconfig.app.json / tsconfig.node.json
TypeScript compiler configuration.

### eslint.config.js
ESLint configuration.

### index.html
Sets the root div, font imports, and page title.

### src/App.tsx
Main application shell and route definitions.

### src/main.tsx
Application entry point.

### src/index.css
Global reset and base animations.

### src/data/data.ts
Centralized content data for properties, stats, and cities.

### src/types/types.ts
Shared TypeScript interfaces.

---

## 29. Things New Developers Should Never Do

The current project suggests a few guardrails.

- Do not create a new global state library unless the app truly needs shared state across many components.
- Do not introduce a new styling system unless it is already part of the codebase.
- Do not hard-code new content that could reasonably live in src/data/data.ts.
- Do not create duplicate section components when a similar pattern already exists.
- Do not add a new page without wiring it into App.tsx.
- Do not add a new form without considering the existing form pattern in FormComponent.tsx.
- Do not bypass the existing component structure by placing page-level UI directly into App.tsx.
- Do not introduce a backend or API abstraction layer unless the project is deliberately expanded in that direction.

---

## 30. Checklist Before Creating Any New Feature

Use this checklist before committing a new feature.

- [ ] Search for an existing component with a similar purpose.
- [ ] Check whether the content belongs in src/data/data.ts.
- [ ] Decide whether the feature belongs in src/components/ or src/pages/.
- [ ] Reuse existing hooks where possible.
- [ ] Keep styling consistent with the current palette and typography.
- [ ] If the feature is a page, add a route in App.tsx.
- [ ] If the feature is a form, follow the current form pattern and validation approach.
- [ ] Verify the feature in the browser and in build output.
- [ ] Keep the feature responsive.

---

## Additional Project-Specific Conventions

A few extra conventions are worth noting.

### The app is content-driven but lightweight
Much of the UI is driven by arrays in src/data/data.ts rather than hard-coded inline content scattered across many files.

### The home page is a composition of section components
The landing experience is assembled from multiple section components. New homepage content should usually follow that pattern.

### Styling is visual-first and hand-authored
The current project relies on direct style objects and CSS files rather than a formal UI framework. Keep the styling simple and consistent with the existing look.

### The app is currently a marketing website, not a full product app
This means the main focus is presentation, lead capture, and brand messaging rather than complex flows, persistence, or authentication.

### The current architecture favors simplicity over abstraction
There is no elaborate service layer, state store, or form system. New work should stay aligned with that simple architecture unless the project intentionally grows.

---

## Summary

This project is a compact React + TypeScript landing page for PropertyBroker. It is organized around section components, static content data, and a simple routing setup. The most important conventions to preserve are:
- Keep page composition modular.
- Reuse existing sections where possible.
- Keep content in src/data/data.ts when it is shared.
- Use the existing dark navy / blue visual language.
- Keep new work simple and consistent with the current codebase.
