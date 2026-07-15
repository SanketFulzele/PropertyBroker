# Product Documentation

## Changelog

### Scroll Position Fix — Route-Based Scroll Restoration

**Problem:** Navigating to the Filter page (from Popular Localities cards, Hero Search, or any route transition) opened at the previous scroll position instead of the top of the page.

**Solution:** Added a centralized, reusable `ScrollToTop` component that automatically scrolls to the top of the window on every route change.

#### New Component

| File | Purpose |
|---|---|
| `src/components/ScrollToTop.tsx` | Listens to `useLocation().pathname` via `useEffect` and calls `window.scrollTo(0, 0)` on every pathname change. Renders `null` — no visual output. |

#### Modified Files

| File | Change |
|---|---|
| `src/App.tsx` | Added `<ScrollToTop />` inside `<Router>`, placed above `<Navbar />` so it runs before any page render. |

#### How It Works

- `ScrollToTop` is a renderless component that lives inside the React Router `<Router>` context.
- It uses `useLocation()` from `react-router-dom` to track the current `pathname`.
- A `useEffect` keyed on `pathname` fires `window.scrollTo(0, 0)` whenever the route changes.
- This covers all navigation scenarios: in-app link clicks, `navigate()` calls, browser Back/Forward, and direct URL entry.
- The component is placed once in `App.tsx` and applies globally — no per-component `window.scrollTo` calls needed.

#### Files Unchanged

All existing functionality, styling, responsiveness, and routing remain intact. No changes were made to the Filter page, HeroSection, AreaSection, or any other component for this task.
