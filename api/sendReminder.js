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
      .from("registrations")
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
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Hello ${user.name},</h2>
            <p>
              It’s been 24 hours since you registered with DesignDojoo.
            </p>
            <p>
              If you have any questions or need help moving forward,
              we're here to assist you.
            </p>
            <p>
              We’re excited to see what you build.
            </p>
            <br/>
            <strong>– The DesignDojoo Team</strong>
          </div>
        `,
      });

      // Mark email as sent so it doesn't resend
      await supabase
        .from("registrations")
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