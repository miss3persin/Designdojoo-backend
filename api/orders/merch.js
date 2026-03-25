import {
  getClientIp,
  handleCorsPreflight,
  methodNotAllowed,
  readJsonBody,
  sendJson,
  setCorsHeaders,
} from "../_lib/http.js";
import { enforceRateLimit } from "../_lib/rateLimit.js";
import { getSupabaseAdmin } from "../_lib/supabaseAdmin.js";
import { validateMerchOrderPayload } from "../_lib/validation.js";

const MERCH_LIMIT = Number(process.env.MERCH_RATE_LIMIT || 10);
const MERCH_WINDOW_MINUTES = Number(process.env.MERCH_RATE_WINDOW_MINUTES || 60);
const MERCH_WHATSAPP_NUMBER = process.env.MERCH_WHATSAPP_NUMBER || "2349162682043";

function buildWhatsappOrderMessage(orderRecord) {
  const itemLines = (orderRecord.items || []).map((item) => {
    return `- ${item.name} x${item.quantity} @ ${item.unit_price}`;
  });

  return [
    `Order Ref: ${orderRecord.id}`,
    `Name: ${orderRecord.customer_name}`,
    `Phone: ${orderRecord.customer_phone}`,
    "",
    "Items:",
    ...itemLines,
    "",
    `Total: ${orderRecord.total} ${orderRecord.currency}`,
  ].join("\n");
}

export default async function handler(req, res) {
  if (handleCorsPreflight(req, res)) {
    return;
  }
  setCorsHeaders(req, res);

  if (req.method !== "POST") {
    methodNotAllowed(res, ["POST", "OPTIONS"]);
    return;
  }

  const clientIp = getClientIp(req);

  let payload;
  try {
    payload = readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, {
      ok: false,
      error: "Invalid request body",
      details: error.message,
    });
    return;
  }

  const validation = validateMerchOrderPayload(payload);
  if (!validation.isValid) {
    sendJson(res, 422, {
      ok: false,
      error: "Validation failed",
      details: validation.errors,
    });
    return;
  }

  try {
    const supabase = getSupabaseAdmin();
    const rateLimitResult = await enforceRateLimit({
      supabase,
      action: "merch_order_submit",
      clientIp,
      maxRequests: MERCH_LIMIT,
      windowMinutes: MERCH_WINDOW_MINUTES,
    });

    if (rateLimitResult.limited) {
      sendJson(
        res,
        429,
        {
          ok: false,
          error: "Too many order attempts. Please try again later.",
        },
        { "Retry-After": String(rateLimitResult.retryAfterSeconds) }
      );
      return;
    }

    const order = validation.data;
    const { data, error } = await supabase
      .from("merch_orders")
      .insert([
        {
          customer_name: order.customer_name,
          customer_phone: order.customer_phone,
          customer_email: order.customer_email,
          notes: order.notes,
          currency: order.currency,
          subtotal: order.subtotal,
          total: order.total,
          items: order.items,
          client_ip: clientIp,
          status: "pending",
        },
      ])
      .select("id, customer_name, customer_phone, currency, total, items, status, created_at")
      .single();

    if (error) {
      sendJson(res, 500, {
        ok: false,
        error: "Failed to create merch order",
        details: error.message,
      });
      return;
    }

    const whatsappText = encodeURIComponent(buildWhatsappOrderMessage(data));
    const whatsappUrl = `https://wa.me/${MERCH_WHATSAPP_NUMBER}?text=${whatsappText}`;

    sendJson(res, 201, {
      ok: true,
      order_id: data.id,
      status: data.status,
      total: data.total,
      currency: data.currency,
      whatsapp_url: whatsappUrl,
      created_at: data.created_at,
    });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: "Unexpected server error",
      details: error.message,
    });
  }
}
