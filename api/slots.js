import {
  handleCorsPreflight,
  methodNotAllowed,
  sendJson,
  setCorsHeaders,
} from "./_lib/http.js";
import { getSupabaseAdmin } from "./_lib/supabaseAdmin.js";

const DEFAULT_SLOTS = Number(process.env.DEFAULT_SLOTS || 15);

export default async function handler(req, res) {
  if (handleCorsPreflight(req, res)) {
    return;
  }
  setCorsHeaders(req, res);

  if (req.method !== "GET") {
    methodNotAllowed(res, ["GET", "OPTIONS"]);
    return;
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("slots")
      .select("id, slots_left")
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      sendJson(res, 500, {
        ok: false,
        error: error.message,
      });
      return;
    }

    if (!data) {
      const { data: inserted, error: insertError } = await supabase
        .from("slots")
        .upsert({ id: 1, slots_left: DEFAULT_SLOTS }, { onConflict: "id" })
        .select("id, slots_left")
        .single();

      if (insertError) {
        sendJson(res, 500, {
          ok: false,
          error: insertError.message,
        });
        return;
      }

      sendJson(res, 200, {
        ok: true,
        slot_id: inserted.id,
        slots_left: inserted.slots_left,
      });
      return;
    }

    sendJson(res, 200, {
      ok: true,
      slot_id: data.id,
      slots_left: data.slots_left,
    });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: error.message,
    });
  }
}
