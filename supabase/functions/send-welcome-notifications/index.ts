// Edge Function: send-welcome-notifications
// Sends welcome email via Resend and welcome SMS via MSG91 (behind India DLT feature flag)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const MSG91_AUTH_KEY = Deno.env.get("MSG91_AUTH_KEY");
const MSG91_TEMPLATE_ID = Deno.env.get("MSG91_TEMPLATE_ID");
const ENABLE_SMS_NOTIFICATIONS = Deno.env.get("ENABLE_SMS_NOTIFICATIONS") === "true";

serve(async (req) => {
  try {
    const { name, phone, email } = await req.json();

    let emailSent = false;
    let smsSent = false;

    // 1. Send Welcome Email via Resend
    if (email && RESEND_API_KEY) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Patil Dealers <welcome@patildealersnanded.com>",
          to: [email],
          subject: "Welcome to Patil Dealers Nanded - Certified Pre-Owned Cars",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #e11d48;">Welcome to Patil Dealers, Nanded!</h2>
              <p>Hello <strong>${name}</strong>,</p>
              <p>Thank you for registering at Patil Dealers. You now have full access to our certified used car inventory, verified inspection reports, and easy test drive bookings.</p>
              <p><strong>Showroom Address:</strong> Shop 4-6, Near Shivaji Statue, Maltekdi Road, Nanded - 431602</p>
              <p>Call or WhatsApp us anytime at <strong>+91 98234 56789</strong>.</p>
            </div>
          `,
        }),
      });
      emailSent = emailRes.ok;
    }

    // 2. Send Welcome SMS via MSG91 (behind feature flag due to India DLT requirements)
    if (ENABLE_SMS_NOTIFICATIONS && phone && MSG91_AUTH_KEY && MSG91_TEMPLATE_ID) {
      const cleanPhone = phone.replace(/[^0-9]/g, "");
      const smsRes = await fetch("https://api.msg91.com/api/v5/flow/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authkey: MSG91_AUTH_KEY,
        },
        body: JSON.stringify({
          template_id: MSG91_TEMPLATE_ID,
          short_url: "0",
          recipients: [
            {
              mobiles: cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`,
              name: name,
            },
          ],
        }),
      });
      smsSent = smsRes.ok;
    }

    return new Response(
      JSON.stringify({
        success: true,
        emailSent,
        smsSent,
        smsFlagEnabled: ENABLE_SMS_NOTIFICATIONS,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
