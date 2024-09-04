import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing "url" query parameter', { status: 400 });
  }

  try {
    // Fetch the content from the target URL
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return new Response(`Failed to fetch from target URL: ${response.statusText}`, {
        status: response.status,
      });
    }

    // Clone the response and forward it to the client
    const contentType = response.headers.get('content-type');
    const body = await response.text(); // Use response.buffer() for binary data

    return new Response(body, {
      status: response.status,
      headers: {
        'Content-Type': contentType || 'text/plain',
      },
    });
  } catch (error) {
    console.error('Error occurred while fetching from target URL:', error);
    return new Response('Error occurred while fetching from target URL', { status: 500 });
  }
};
