import { Resend } from "resend";
import {
  handleCorsPreflight,
  methodNotAllowed,
  readJsonBody,
  sendJson,
  setCorsHeaders,
} from "./_lib/http.js";
import { getSupabaseAdmin } from "./_lib/supabaseAdmin.js";

const REMINDER_ADMIN_API_KEY = process.env.REMINDER_ADMIN_API_KEY || "";
const REMINDER_EMAIL_FROM =
  process.env.REMINDER_EMAIL_FROM || "DesignDojoo <noreply@designdojoo.com>";
const REMINDER_SUBJECT =
  process.env.REMINDER_EMAIL_SUBJECT ||
  "It has been 24 hours since you registered";
const DEFAULT_CUTOFF_HOURS = Number(process.env.REMINDER_CUTOFF_HOURS || 24);
const DEFAULT_LIMIT = Number(process.env.REMINDER_LIMIT || 100);

function getRequestApiKey(req) {
  const raw = req.headers["x-api-key"];
  if (typeof raw === "string") return raw.trim();
  if (Array.isArray(raw) && raw.length) return String(raw[0]).trim();
  return "";
}

function resolveNumber(value, fallback, min, max) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
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

  if (!REMINDER_ADMIN_API_KEY || getRequestApiKey(req) !== REMINDER_ADMIN_API_KEY) {
    sendJson(res, 401, { ok: false, error: "Unauthorized" });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    sendJson(res, 500, { ok: false, error: "Missing RESEND_API_KEY" });
    return;
  }

  let payload = {};
  try {
    payload = readJsonBody(req);
  } catch {
    sendJson(res, 400, { ok: false, error: "Invalid request body" });
    return;
  }

  const cutoffHours = resolveNumber(payload.cutoff_hours, DEFAULT_CUTOFF_HOURS, 1, 168);
  const limit = resolveNumber(payload.limit, DEFAULT_LIMIT, 1, 500);
  const cutoffIso = new Date(Date.now() - cutoffHours * 60 * 60 * 1000).toISOString();

  try {
    const supabase = getSupabaseAdmin();
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data: users, error } = await supabase
      .from("registrations")
      .select("id, name, email, created_at")
      .eq("email_sent", false)
      .lte("created_at", cutoffIso)
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error) {
      sendJson(res, 500, { ok: false, error: error.message });
      return;
    }

    if (!users || users.length === 0) {
      sendJson(res, 200, { ok: true, message: "No emails to send", count: 0 });
      return;
    }

    let sent = 0;
    let failed = 0;
    const failures = [];

    for (const user of users) {
      try {
        await resend.emails.send({
          from: REMINDER_EMAIL_FROM,
          to: user.email,
          subject: REMINDER_SUBJECT,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>Hello ${user.name || "there"},</h2>
              <p>It has been 24 hours since you registered with DesignDojoo.</p>
              <p>If you have any questions or need help moving forward, we're here to assist you.</p>
              <p>We are excited to see what you build.</p>
              <br/>
              <strong>- The DesignDojoo Team</strong>
            </div>
          `,
        });

        await supabase
          .from("registrations")
          .update({ email_sent: true, email_sent_at: new Date().toISOString() })
          .eq("id", user.id);

        sent += 1;
      } catch (sendError) {
        failed += 1;
        failures.push({
          id: user.id,
          email: user.email,
          error: String(sendError?.message || sendError),
        });
      }
    }

    sendJson(res, 200, {
      ok: true,
      message: "Reminder run completed",
      attempted: users.length,
      sent,
      failed,
      failures,
    });
  } catch (err) {
    sendJson(res, 500, { ok: false, error: err.message });
  }
}
