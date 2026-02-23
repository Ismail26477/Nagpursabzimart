import { MongoClient } from "npm:mongodb@6.12.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Connect to MongoDB
    const mongo = new MongoClient(Deno.env.get("MONGODB_URI")!);
    await mongo.connect();
    const db = mongo.db(Deno.env.get("MONGODB_DB_NAME") || "sabjiwala");

    // Connect to Supabase with service role
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const tables = ["profiles", "orders", "order_items", "reviews", "wishlist", "saved_addresses", "user_roles"];
    const results: Record<string, { exported: number; errors: string[] }> = {};

    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select("*");
        if (error) {
          results[table] = { exported: 0, errors: [error.message] };
          continue;
        }
        if (!data || data.length === 0) {
          results[table] = { exported: 0, errors: [] };
          continue;
        }

        const col = db.collection(table);
        // Clear existing data and insert fresh
        await col.deleteMany({});
        const insertResult = await col.insertMany(data);
        results[table] = { exported: Object.keys(insertResult.insertedIds).length, errors: [] };
      } catch (e) {
        results[table] = { exported: 0, errors: [String(e)] };
      }
    }

    await mongo.close();

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Bulk export error:", error);
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
