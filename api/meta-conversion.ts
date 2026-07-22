import type { VercelRequest, VercelResponse } from "@vercel/node";

const META_GRAPH_URL = "https://graph.facebook.com/v21.0";

interface CAPIPayload {
  event_name: string;
  event_id: string;
  event_time: number;
  event_source_url: string;
  user_data: {
    client_ip_address?: string;
    client_user_agent?: string;
  };
  custom_data: Record<string, unknown>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error("Meta CAPI: Missing META_PIXEL_ID or META_ACCESS_TOKEN env vars");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const { event_name, event_id, event_source_url, custom_data, user_data } = req.body;

  if (!event_name || !event_id) {
    return res.status(400).json({ error: "Missing required fields: event_name, event_id" });
  }

  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
    || req.headers["x-real-ip"] as string
    || "";
  const userAgent = req.headers["user-agent"] || "";

  const payload: { data: CAPIPayload[]; access_token: string } = {
    data: [
      {
        event_name,
        event_id,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: event_source_url || "",
        user_data: {
          ...(ip ? { client_ip_address: ip } : {}),
          ...(userAgent ? { client_user_agent: userAgent } : {}),
        },
        custom_data: custom_data || {},
      },
    ],
    access_token: ACCESS_TOKEN,
  };

  try {
    const response = await fetch(`${META_GRAPH_URL}/${PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Meta CAPI error:", result);
      return res.status(response.status).json({ error: "CAPI request failed", details: result });
    }

    return res.status(200).json({ success: true, events_received: (result as { events_received?: number }).events_received });
  } catch (error) {
    console.error("Meta CAPI fetch error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
