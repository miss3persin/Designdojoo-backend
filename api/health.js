import { handleCorsPreflight, sendJson, setCorsHeaders } from "./_lib/http.js";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "./_lib/supabaseAdmin.js";

export default async function handler(req, res) {
  if (handleCorsPreflight(req, res)) {
    return;
  }
  setCorsHeaders(req, res);

  if (req.method !== "GET") {
    sendJson(res, 405, {
      ok: false,
      error: "Method not allowed",
      allowed_methods: ["GET", "OPTIONS"],
    });
    return;
  }

  const checks = {
    env_configured: hasSupabaseAdminConfig(),
    db_reachable: false,
  };

  if (!checks.env_configured) {
    sendJson(res, 503, {
      ok: false,
      status: "degraded",
      checks,
      error: "Missing backend environment configuration",
    });
    return;
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("slots").select("id").limit(1);
    checks.db_reachable = !error;

    if (error) {
      sendJson(res, 503, {
        ok: false,
        status: "degraded",
        checks,
        error: error.message,
      });
      return;
    }

    sendJson(res, 200, {
      ok: true,
      status: "healthy",
      checks,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      status: "error",
      checks,
      error: error.message,
    });
  }
}
