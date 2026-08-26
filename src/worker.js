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
        const { name, email, message } = data;

        if (!name || !email || !message) {
          return new Response(JSON.stringify({ error: 'Name, email and message are required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const result = await env.DB.prepare(
          'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)'
        ).bind(name, email, message).run();

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
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const linkedin = formData.get('linkedin');
        const portfolio = formData.get('portfolio');
        const file = formData.get('resume');

        if (!name || !email) {
          return new Response(JSON.stringify({ error: 'Name and email are required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        
        let resume_file_key = null;
        if (file && file.size > 0) {
          resume_file_key = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
          await env.RESUMES_BUCKET.put(resume_file_key, file.stream(), {
            httpMetadata: { contentType: file.type }
          });
        }

        const result = await env.DB.prepare(
          'INSERT INTO resumes (name, email, linkedin_url, portfolio_url, resume_file_key) VALUES (?, ?, ?, ?, ?)'
        ).bind(name, email, linkedin || null, portfolio || null, resume_file_key).run();

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

    // SPA Routing: We let Cloudflare's native asset server handle SPA routing.
    // Since we set `not_found_handling = "single-page-application"` in wrangler.toml,
    // this will safely serve index.html for 404s without requiring fragile Request rewriting.
    return env.ASSETS.fetch(request);
  },
};
