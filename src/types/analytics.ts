export interface TrackPageViewParams {
  page: string;
  title?: string;
}

export interface TrackSearchParams {
  locality?: string[];
  propertyType?: string;
  bhk?: string;
  budgetMin?: number;
  budgetMax?: number;
  areaMin?: number;
  areaMax?: number;
  furnished?: string;
  resultsCount: number;
}

export interface TrackViewContentParams {
  id: string;
  name: string;
  category: string;
  price?: string;
  locality?: string;
  bhk?: string;
}

export interface TrackContactParams {
  method: "whatsapp" | "phone";
  source:
    | "navbar"
    | "whatsapp_float"
    | "property_card"
    | "property_details"
    | "footer"
    | "hero"
    | "filter_page"
    | "guides";
  propertyId?: string;
  propertyName?: string;
}

export interface TrackLeadParams {
  method: "whatsapp" | "phone" | "form";
  source: string;
  value?: string;
}

export interface TrackCustomEventParams {
  eventName: string;
  params?: Record<string, string | number | boolean>;
}
