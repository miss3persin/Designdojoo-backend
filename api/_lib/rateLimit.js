export async function enforceRateLimit({
  supabase,
  action,
  clientIp,
  maxRequests,
  windowMinutes,
}) {
  if (!clientIp || !action) {
    return { limited: false };
  }

  const windowStart = new Date(
    Date.now() - windowMinutes * 60 * 1000
  ).toISOString();

  const { count, error: countError } = await supabase
    .from("api_request_log")
    .select("*", { count: "exact", head: true })
    .eq("action", action)
    .eq("client_ip", clientIp)
    .gte("created_at", windowStart);

  if (countError) {
    throw new Error(`Rate limit lookup failed: ${countError.message}`);
  }

  if ((count || 0) >= maxRequests) {
    return {
      limited: true,
      retryAfterSeconds: windowMinutes * 60,
    };
  }

  const { error: insertError } = await supabase.from("api_request_log").insert([
    {
      action,
      client_ip: clientIp,
    },
  ]);

  if (insertError) {
    throw new Error(`Rate limit write failed: ${insertError.message}`);
  }

  return { limited: false };
}
