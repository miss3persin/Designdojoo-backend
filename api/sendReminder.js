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
  process.env.REMINDER_EMAIL_FROM || "DesignDojoo <onboarding@resend.dev>";

const REMINDER_SUBJECT =
  process.env.REMINDER_EMAIL_SUBJECT ||
  "Itâ€™s Been 24 Hours Since You Registered ";

const DEFAULT_CUTOFF_HOURS = Number(process.env.REMINDER_CUTOFF_HOURS || 0);
const MINIMUM_CUTOFF_HOURS = 0;
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

function isValidEmail(email) {
  return typeof email === "string" && email.includes("@");
}

export default async function handler(req, res) {
  if (handleCorsPreflight(req, res)) return;

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

  const directEmail =
    typeof payload.email === "string" ? payload.email.trim() : "";
  const directApplicationId =
    typeof payload.application_id === "string" ||
    typeof payload.application_id === "number"
      ? String(payload.application_id).trim()
      : "";
  const isDirectRequest = Boolean(directEmail || directApplicationId);

  const cutoffHours = resolveNumber(
    payload.cutoff_hours,
    DEFAULT_CUTOFF_HOURS,
    0,
    168
  );
  const normalizedCutoffHours = Math.max(cutoffHours, MINIMUM_CUTOFF_HOURS);
  const limit = resolveNumber(payload.limit, DEFAULT_LIMIT, 1, 500);

  const cutoffIso = new Date(
    Date.now() - normalizedCutoffHours * 60 * 60 * 1000
  ).toISOString();

  try {
    const supabase = getSupabaseAdmin();
    const resend = new Resend(process.env.RESEND_API_KEY);

    let applicationsQuery = supabase
      .from("applications")
      .select("id, full_name, email, created_at");

    if (directApplicationId) {
      applicationsQuery = applicationsQuery.eq("id", directApplicationId);
    } else if (directEmail) {
      applicationsQuery = applicationsQuery.ilike("email", directEmail);
    } else {
      applicationsQuery = applicationsQuery
        .lte("created_at", cutoffIso)
        .order("created_at", { ascending: true })
        .limit(limit);
    }

    const { data: applications, error } = await applicationsQuery;

    if (error) {
      sendJson(res, 500, { ok: false, error: error.message });
      return;
    }

    if (!applications || applications.length === 0) {
      sendJson(res, 200, {
        ok: true,
        message: isDirectRequest
          ? "No application found for immediate email"
          : "No applications ready for emails yet",
        attempted: 0,
        sent: 0,
        failed: 0,
        failures: [],
      });
      return;
    }

    const emails = applications
      .map((application) => application.email)
      .filter(isValidEmail);

    let registeredSet = new Set();

    if (emails.length > 0) {
      const { data: registered, error: registrationError } = await supabase
        .from("registrations")
        .select("email")
        .in("email", emails);

      if (registrationError) {
        sendJson(res, 500, { ok: false, error: registrationError.message });
        return;
      }

      registeredSet = new Set(
        (registered || [])
          .map((row) =>
            typeof row.email === "string" ? row.email.toLowerCase() : null
          )
          .filter(Boolean)
      );
    }

    const pendingApplications = applications.filter(
      (application) =>
        isValidEmail(application.email) &&
        !registeredSet.has(application.email.toLowerCase())
    );

    if (pendingApplications.length === 0) {
      sendJson(res, 200, {
        ok: true,
        message: "No new applications ready for email",
        attempted: 0,
        sent: 0,
        failed: 0,
        failures: [],
      });
      return;
    }

    let sent = 0;
    let failed = 0;

    const failures = [];
    const today = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date());

    for (const user of pendingApplications) {
      const recipientName = user.full_name || "there";
      const registrationName = user.full_name || user.email;

      try {
        const { data, error: resendError } = await resend.emails.send({
          from: REMINDER_EMAIL_FROM,
          to: user.email,
          subject: REMINDER_SUBJECT,
          html: `
<div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:40px;">
  
  <div style="max-width:500px; margin:auto; background:#ffffff; padding:40px; border-radius:6px;">
    
    <div style="text-align:center;">
      <img src="https://designdojoo.com/logo.svg" width="120"/>
      <h2 style="margin:10px 0 0 0;">DesignDojoo Institute</h2>
      <p style="color:#777; font-size:14px;">School of Product Design</p>
    </div>

    <p style="text-align:right; font-size:14px; color:#777;">
      ${today}
    </p>

    <p>Dear <strong>${recipientName}</strong>,</p>

    <h3 style="text-align:center;">CONGRATULATIONS</h3>

    <p>
      We have reviewed your application for the 
      <strong>DesignDojoo 8-Week Product Experience Track.</strong>
    </p>

    <p>
      Your answers stood out to our review team. Because you showed
      a clear readiness to learn and execute, we have decided to
      select you for this cohort.
    </p>

    <p><strong>Scholarship Decision: APPROVED</strong></p>

    <p>
      Congratulations! You’ve been selected from a handful of people.
      Over 2000+ people applied, and you’ve been chosen as part of the
      select group because your answer stood out to us.
    </p>

    <p>
      As part of our mission to accelerate serious talent,
      we have waived <strong>50% of your tuition fee.</strong>
    </p>

    <div style="text-align:center; margin:30px 0;">
      <a href="https://designdojoo.com/sales"
      style="
        background:#e50914;
        color:#ffffff;
        padding:14px 28px;
        text-decoration:none;
        font-weight:bold;
        display:block;
        width:100%;
        box-sizing:border-box;
        text-align:center;
        border-radius:4px;">
        Pay Expected Fee
      </a>
    </div>

    <p>
      <strong>Secure Your Seat:</strong> Since we have limited spots for
      this cohort, this scholarship offer is valid for
      <strong>72 hours.</strong>
    </p>

    <p>
      Congratulations on being selected. We are ready to build
      your portfolio.
    </p>

    <p>Best regards,</p>

    <br/>

    <p><strong>Mr. A O. Samuel</strong><br/>
    DesignDojoo’s Director</p>

    <br/>

    <p style="font-size:12px; color:#999;">
      Design Dojo Institute • Lagos, Nigeria<br/>
      Admission ID: #DD-2026-892
    </p>

  </div>
</div>
          `,
        });

        if (resendError) throw resendError;

        await supabase.from("registrations").insert({
          name: registrationName,
          email: user.email,
          email_sent: true,
          email_sent_at: new Date().toISOString(),
        });

        sent++;
      } catch (sendError) {
        failed++;

        failures.push({
          id: user.id,
          email: user.email,
          error: String(sendError?.message || sendError),
        });
      }
    }

    sendJson(res, 200, {
      ok: true,
      message: "Email run completed",
      attempted: pendingApplications.length,
      sent,
      failed,
      failures,
    });
  } catch (err) {
    sendJson(res, 500, { ok: false, error: err.message });
  }
}
