import type {
  TrackPageViewParams,
  TrackSearchParams,
  TrackViewContentParams,
  TrackContactParams,
  TrackLeadParams,
  TrackCustomEventParams,
} from "../types/analytics";

function getFbq(): ((...args: unknown[]) => void) | null {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    return window.fbq;
  }
  return null;
}

export function trackPageView({ page, title }: TrackPageViewParams) {
  const fbq = getFbq();
  if (fbq) {
    fbq("track", "PageView");
  }

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "page_view", { page_path: page, page_title: title });
  }
}

export function trackSearch({ locality, resultsCount, propertyType, bhk, budgetMin, budgetMax, areaMin, areaMax, furnished }: TrackSearchParams) {
  const fbq = getFbq();
  if (fbq) {
    fbq("trackCustom", "Search", {
      search_term: locality?.join(", ") || "all",
      content_category: propertyType || "all",
      content_type: bhk || "all",
      min_budget: budgetMin || 0,
      max_budget: budgetMax || 0,
      min_area: areaMin || 0,
      max_area: areaMax || 0,
      furnished: furnished || "any",
      results_count: resultsCount,
    });
  }
}

export function trackViewContent({ id, name, category, price, locality, bhk }: TrackViewContentParams) {
  const fbq = getFbq();
  if (fbq) {
    fbq("track", "ViewContent", {
      content_ids: [id],
      content_name: name,
      content_category: category,
      content_type: "product",
      value: price || "",
      currency: "INR",
      ...(locality ? { locality } : {}),
      ...(bhk ? { bhk } : {}),
    });
  }
}

export function trackContact({ method, source, propertyId, propertyName }: TrackContactParams) {
  const fbq = getFbq();
  if (fbq) {
    fbq("trackCustom", "Contact", {
      contact_method: method,
      contact_source: source,
      ...(propertyId ? { property_id: propertyId } : {}),
      ...(propertyName ? { property_name: propertyName } : {}),
    });
  }
}

export function trackLead({ method, source, value }: TrackLeadParams) {
  const fbq = getFbq();
  if (fbq) {
    fbq("track", "Lead", {
      content_name: source,
      content_category: method,
      ...(value ? { value, currency: "INR" } : {}),
    });
  }
}

export function trackCustomEvent({ eventName, params }: TrackCustomEventParams) {
  const fbq = getFbq();
  if (fbq) {
    fbq("trackCustom", eventName, params || {});
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
