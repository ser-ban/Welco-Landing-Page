// Invoked by Database Webhook on INSERT into public.waitlist.
// Sends a short confirmation email via Resend.

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("NOTIFICATIONS_FROM_EMAIL") ?? "Welco <no-reply@welco.ai>";

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: { email?: string };
  old_record: unknown;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function htmlEmail(email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; padding: 24px;">
  <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
    <p style="margin: 0 0 16px; font-size: 16px; color: #1e293b;">
      Hi there,
    </p>
    <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #475569;">
      Thanks for joining the Welco waitlist. We really appreciate your interest.
    </p>
    <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #475569;">
      We’ll be in touch as soon as early access is ready. Until then, you’re on the list and we’ll notify you first.
    </p>
    <p style="margin: 0; font-size: 15px; color: #64748b;">
      — The Welco team
    </p>
  </div>
</body>
</html>
`.trim();
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let payload: WebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (payload.type !== "INSERT" || payload.table !== "waitlist" || payload.schema !== "public") {
    return new Response(
      JSON.stringify({ error: "Ignored: not a waitlist insert" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const email = payload.record?.email;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid email in payload" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: "You're on the Welco waitlist",
        html: htmlEmail(email),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", res.status, data);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: data }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ ok: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Send email error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
