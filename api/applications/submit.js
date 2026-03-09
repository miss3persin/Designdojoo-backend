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
import { validateApplicationPayload } from "../_lib/validation.js";

const APPLICATION_LIMIT = Number(process.env.APPLICATION_RATE_LIMIT || 5);
const APPLICATION_WINDOW_MINUTES = Number(
  process.env.APPLICATION_RATE_WINDOW_MINUTES || 60
);

function isNoSlotError(error) {
  const message = error?.message || "";
  return message.includes("NO_SLOTS_AVAILABLE");
}

function isDuplicateApplicationError(error) {
  const message = error?.message || "";
  return message.includes("DUPLICATE_APPLICATION");
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

  const validation = validateApplicationPayload(payload);
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
      action: "application_submit",
      clientIp,
      maxRequests: APPLICATION_LIMIT,
      windowMinutes: APPLICATION_WINDOW_MINUTES,
    });

    if (rateLimitResult.limited) {
      sendJson(
        res,
        429,
        {
          ok: false,
          error: "Too many submissions. Please try again later.",
        },
        { "Retry-After": String(rateLimitResult.retryAfterSeconds) }
      );
      return;
    }

    const submission = validation.data;
    const { data, error } = await supabase.rpc("submit_application_with_slot", {
      p_full_name: submission.full_name,
      p_email: submission.email,
      p_phone: submission.phone,
      p_social_handle: submission.social_handle,
      p_city: submission.city,
      p_country: submission.country,
      p_portfolio: submission.portfolio || null,
      p_track: submission.track,
      p_referral: submission.referral,
      p_blocker: submission.blocker,
      p_accountability: submission.accountability,
      p_commitment: submission.commitment,
      p_client_ip: clientIp,
    });

    if (error) {
      if (isNoSlotError(error)) {
        sendJson(res, 409, {
          ok: false,
          error: "No scholarship slots left",
        });
        return;
      }

      if (isDuplicateApplicationError(error)) {
        sendJson(res, 409, {
          ok: false,
          error: "Application already exists for this email",
        });
        return;
      }

      sendJson(res, 500, {
        ok: false,
        error: "Failed to submit application",
        details: error.message,
      });
      return;
    }

    const result = Array.isArray(data) ? data[0] : data;
    sendJson(res, 201, {
      ok: true,
      application_id: result?.application_id ?? null,
      slots_left: result?.slots_left ?? null,
    });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: "Unexpected server error",
      details: error.message,
    });
  }
}
