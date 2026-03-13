import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Initialize Supabase using SERVICE ROLE KEY
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    // Calculate 24 hours ago
    const twentyFourHoursAgo = new Date(
      Date.now() - 1 * 60 * 1000
    ).toISOString();

    // Get users who:
    // - Haven't received the email
    // - Registered more than 24 hours ago
    const { data: users, error } = await supabase
      .from("applications")
      .select("*")
      .eq("email_sent", false)
      .lte("created_at", twentyFourHoursAgo);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    if (!users || users.length === 0) {
      return res.status(200).json({ message: "No emails to send" });
    }

    // Loop through eligible users
    for (const user of users) {
      // Send the email
      await resend.emails.send({
        from: "DesignDojoo <noreply@designdojoo.com>",
        to: user.email,
        subject: "It’s Been 24 Hours Since You Registered 🎉",
        html: `
<div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:40px;">
  
  <div style="max-width:600px; margin:auto; background:#ffffff; padding:40px; border-radius:6px;">
    
    <div style="text-align:center;">
      <img src="https://designdojoo.com/logo.svg" width="120"/>
      <h2 style="margin:10px 0 0 0;">DesignDojoo Institute</h2>
      <p style="color:#777; font-size:14px;">School of Product Design</p>
    </div>

    <p style="text-align:right; font-size:14px; color:#777;">
      ${new Date().toLocaleDateString()}
    </p>

    <p>Dear <strong>${user.full_name}</strong>,</p>

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
        display:inline-block;
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
      Admission ID: #DD-2024-892
    </p>

  </div>
</div>
`,
      });

      // Mark email as sent so it doesn't resend
      await supabase
        .from("applications")
        .update({ email_sent: true })
        .eq("id", user.id);
    }

    return res.status(200).json({
      message: "Emails sent successfully",
      count: users.length,
    });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: err.message });
  }
} 