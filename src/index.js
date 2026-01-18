/**
 * Cloudflare Worker to serve static assets and handle SPA routing
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Get the asset from ASSETS
      const response = await env.ASSETS.fetch(request);

      // If asset found, return it
      if (response.status !== 404) {
        return response;
      }

      // For SPA routing, serve index.html for non-file paths
      if (!path.includes('.')) {
        const indexResponse = await env.ASSETS.fetch(
          new Request(`${url.origin}/index.html`, request)
        );
        return new Response(indexResponse.body, {
          status: indexResponse.status,
          headers: {
            ...Object.fromEntries(indexResponse.headers),
            'Cache-Control': 'no-cache',
            'Content-Type': 'text/html'
          }
        });
      }

      return response;
    } catch (error) {
      return new Response('Internal Server Error', { status: 500 });
    }
  }
};
