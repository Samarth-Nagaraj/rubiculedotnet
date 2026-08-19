export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle API routes
    if (url.pathname === '/api/contact') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
      
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: `Method ${request.method} not allowed on this endpoint.` }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      try {
        const data = await request.json();
        const { email, message } = data;

        if (!email || !message) {
          return new Response(JSON.stringify({ error: 'Email and message are required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const result = await env.DB.prepare(
          'INSERT INTO contacts (email, message) VALUES (?, ?)'
        ).bind(email, message).run();

        return new Response(JSON.stringify({ success: true, result }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    if (url.pathname === '/api/resume') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
      
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: `Method ${request.method} not allowed on this endpoint.` }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      try {
        const data = await request.json();
        const { name, email, linkedin, portfolio } = data;

        if (!name || !email || !linkedin) {
          return new Response(JSON.stringify({ error: 'Name, email, and LinkedIn URL are required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const result = await env.DB.prepare(
          'INSERT INTO resumes (name, email, linkedin_url, portfolio_url) VALUES (?, ?, ?, ?)'
        ).bind(name, email, linkedin, portfolio || null).run();

        return new Response(JSON.stringify({ success: true, result }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // SPA Routing: If the request is not for an API and not found in assets, serve index.html.
    // env.ASSETS.fetch will return 404 for unknown paths (like /products).
    // We catch that and return the index.html asset instead.
    const response = await env.ASSETS.fetch(request);
    if (response.status === 404) {
      return env.ASSETS.fetch(new Request(new URL('/', request.url)));
    }
    
    return response;
  },
};
