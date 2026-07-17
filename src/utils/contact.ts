import { trackContact, trackLead } from "./analytics";

const PHONE_NUMBER = "919921215145";
const PHONE_DISPLAY = "9921215145";
const SITE_URL = "https://property-broker-ngp.vercel.app";

type ContactSource = "navbar" | "whatsapp_float" | "property_card" | "property_details" | "footer" | "hero" | "filter_page" | "guides";

interface WhatsAppParams {
  message?: string;
  propertyName?: string;
  propertyLocation?: string;
  propertyPrice?: string;
  propertySlug?: string;
  source: ContactSource;
  propertyId?: string;
}

export function openWhatsApp({
  message,
  propertyName,
  propertyLocation,
  propertyPrice,
  propertySlug,
  source,
  propertyId,
}: WhatsAppParams) {
  // trackContact({ method: "whatsapp", source, propertyId, propertyName });
  trackLead({ method: "whatsapp", source });

  let text = message;
  if (!text && propertyName) {
    text = `Hello,\n\nI am interested in this property:\n\n*Property:* ${propertyName}\n*Location:* ${propertyLocation || "Nagpur"}\n*Price:* ${propertyPrice || "N/A"}\n\n*Property Link:* ${SITE_URL}/property/${propertySlug || ""}\n\nCan you please share more details?`;
  }
  if (!text) {
    text = "Hello, I am interested in exploring your property listings. Kindly share more details.\n\nRegards,\n\n" + SITE_URL;
  }

  const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

interface PhoneCallParams {
  source: ContactSource;
  propertyId?: string;
  propertyName?: string;
}

export function makePhoneCall({ source, propertyId, propertyName }: PhoneCallParams) {
  trackContact({ method: "phone", source, propertyId, propertyName });
  // trackLead({ method: "phone", source });

  window.location.href = `tel:+91${PHONE_DISPLAY}`;
}

export function getWhatsAppUrl(message?: string): string {
  const text = message || "Hello, I am interested in exploring your property listings. Kindly share more details.\n\nRegards,\n\n" + SITE_URL;
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getPhoneUrl(): string {
  return `tel:+91${PHONE_DISPLAY}`;
}

export { PHONE_NUMBER, PHONE_DISPLAY };
