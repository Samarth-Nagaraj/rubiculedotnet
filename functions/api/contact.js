export async function onRequest(context) {
  try {
    const { request, env } = context;

    // Handle CORS preflight just in case
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: `Method ${request.method} not allowed on this endpoint.` }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    // Parse the incoming JSON request
    const data = await request.json();
    const { email, message } = data;

    if (!email || !message) {
      return new Response(JSON.stringify({ error: "Email and message are required." }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert into the D1 database
    const result = await env.DB.prepare(
      "INSERT INTO contacts (email, message) VALUES (?, ?)"
    ).bind(email, message).run();

    return new Response(JSON.stringify({ success: true, result }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error", details: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
