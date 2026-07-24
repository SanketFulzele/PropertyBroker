import type { VercelRequest, VercelResponse } from "@vercel/node";

const META_GRAPH_URL = "https://graph.facebook.com/v21.0";

interface CAPIPayload {
  event_name: string;
  event_id: string;
  event_time: number;
  action_source: "website";
  event_source_url: string;
  user_data: {
    client_ip_address?: string;
    client_user_agent?: string;
    fbp?: string;
    fbc?: string;
  };
  custom_data: Record<string, unknown>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
  const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || undefined;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error("[Meta CAPI] Missing META_PIXEL_ID or META_ACCESS_TOKEN env vars");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const { event_name, event_id, event_source_url, custom_data, fbp, fbc } = req.body;

  if (!event_name || !event_id) {
    console.error("[Meta CAPI] Missing required fields: event_name, event_id");
    return res.status(400).json({ error: "Missing required fields: event_name, event_id" });
  }

  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
    || (req.headers["x-real-ip"] as string)
    || "";
  const userAgent = req.headers["user-agent"] || "";

  const eventObject: CAPIPayload = {
    event_name,
    event_id,
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    event_source_url: event_source_url || "",
    user_data: {
      ...(ip ? { client_ip_address: ip } : {}),
      ...(userAgent ? { client_user_agent: userAgent } : {}),
      ...(fbp ? { fbp } : {}),
      ...(fbc ? { fbc } : {}),
    },
    custom_data: custom_data || {},
  };

  const payload: {
    data: CAPIPayload[];
    access_token: string;
    test_event_code?: string;
  } = {
    data: [eventObject],
    access_token: ACCESS_TOKEN,
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  };

  const logPayload = {
    ...payload,
    access_token: ACCESS_TOKEN.slice(0, 8) + "...",
  };

  console.log("[Meta CAPI] Outgoing payload:", JSON.stringify(logPayload, null, 2));

  try {
    const url = `${META_GRAPH_URL}/${PIXEL_ID}/events`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json() as {
      events_received?: number;
      messages?: string[];
      error?: {
        message: string;
        type: string;
        code: number;
        error_subcode?: number;
        fbtrace_id?: string;
      };
    };

    if (!response.ok) {
      console.error("[Meta CAPI] Graph API error:", {
        status: response.status,
        error: result.error,
        fbtrace_id: result.error?.fbtrace_id,
      });
      return res.status(response.status).json({
        error: "CAPI request failed",
        details: result,
      });
    }

    console.log("[Meta CAPI] Success:", {
      events_received: result.events_received,
      messages: result.messages,
    });

    return res.status(200).json({
      success: true,
      events_received: result.events_received,
    });
  } catch (error) {
    console.error("[Meta CAPI] Fetch error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
