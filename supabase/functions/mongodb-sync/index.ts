import { MongoClient } from "npm:mongodb@6.12.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

let client: MongoClient | null = null;

async function getDb() {
  if (!client) {
    client = new MongoClient(Deno.env.get("MONGODB_URI")!);
    await client.connect();
  }
  return client.db(Deno.env.get("MONGODB_DB_NAME") || "sabjiwala");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, collection, data, filter, update } = await req.json();
    const db = await getDb();
    const col = db.collection(collection);

    let result: unknown;

    switch (action) {
      case "insertOne":
        result = await col.insertOne(data);
        break;
      case "insertMany":
        result = await col.insertMany(data);
        break;
      case "find":
        result = await col.find(filter || {}).toArray();
        break;
      case "findOne":
        result = await col.findOne(filter || {});
        break;
      case "updateOne":
        result = await col.updateOne(filter, { $set: update }, { upsert: true });
        break;
      case "deleteOne":
        result = await col.deleteOne(filter);
        break;
      case "deleteMany":
        result = await col.deleteMany(filter || {});
        break;
      default:
        return new Response(JSON.stringify({ error: "Invalid action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("MongoDB sync error:", error);
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
