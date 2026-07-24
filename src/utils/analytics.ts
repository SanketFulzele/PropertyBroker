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

function generateEventId(): string {
  return crypto.randomUUID();
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function sendToCAPI(
  eventName: string,
  eventId: string,
  customData: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;

  const fbp = getCookie("_fbp");
  const fbc = getCookie("_fbc");

  const payload = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: window.location.href,
    custom_data: customData,
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
  };

  console.log(`[Meta CAPI] Sending ${eventName} event`, { eventId, fbp: fbp || "none", fbc: fbc || "none", customData });

  fetch("/api/meta-conversion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        console.error(`[Meta CAPI] HTTP ${res.status} for ${eventName}`);
        res.text().then((t) => console.error("[Meta CAPI] Response body:", t));
      } else {
        console.log(`[Meta CAPI] ${eventName} sent successfully`);
      }
    })
    .catch((err) => {
      console.error(`[Meta CAPI] Fetch failed for ${eventName}:`, err);
    });
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
  const eventId = generateEventId();
  const customData = {
    search_term: locality?.join(", ") || "all",
    content_category: propertyType || "all",
    content_type: bhk || "all",
    min_budget: budgetMin || 0,
    max_budget: budgetMax || 0,
    min_area: areaMin || 0,
    max_area: areaMax || 0,
    furnished: furnished || "any",
    results_count: resultsCount,
  };

  const fbq = getFbq();
  if (fbq) {
    fbq("trackCustom", "Search", customData, { eventID: eventId });
  }

  sendToCAPI("Search", eventId, customData);
}

export function trackViewContent({ id, name, category, price, locality, bhk }: TrackViewContentParams) {
  const eventId = generateEventId();
  const customData: Record<string, unknown> = {
    content_ids: [id],
    content_name: name,
    content_category: category,
    content_type: "product",
    currency: "INR",
    ...(locality ? { locality } : {}),
    ...(bhk ? { bhk } : {}),
  };

  if (price) {
    const numericPrice = Number(String(price).replace(/[^0-9.]/g, ""));
    if (!isNaN(numericPrice) && numericPrice > 0) {
      customData.value = numericPrice;
    }
  }

  const fbq = getFbq();
  if (fbq) {
    fbq("track", "ViewContent", customData, { eventID: eventId });
  }

  sendToCAPI("ViewContent", eventId, customData);
}

export function trackContact({ method, source, propertyId, propertyName }: TrackContactParams) {
  const eventId = generateEventId();
  const customData = {
    contact_method: method,
    contact_source: source,
    ...(propertyId ? { property_id: propertyId } : {}),
    ...(propertyName ? { property_name: propertyName } : {}),
  };

  const fbq = getFbq();
  if (fbq) {
    fbq("trackCustom", "Contact", customData, { eventID: eventId });
  }

  sendToCAPI("Contact", eventId, customData);
}

export function trackLead({ method, source, value }: TrackLeadParams) {
  const eventId = generateEventId();
  const customData: Record<string, unknown> = {
    content_name: source,
    content_category: method,
  };

  if (value) {
    const numericValue = Number(String(value).replace(/[^0-9.]/g, ""));
    if (!isNaN(numericValue) && numericValue > 0) {
      customData.value = numericValue;
      customData.currency = "INR";
    }
  }

  const fbq = getFbq();
  if (fbq) {
    fbq("track", "Lead", customData, { eventID: eventId });
  }

  sendToCAPI("Lead", eventId, customData);
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
