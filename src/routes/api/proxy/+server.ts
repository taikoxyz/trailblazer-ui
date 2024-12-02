// Temporary fix: won't need once the s2 subgraph lands
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  let targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing "url" query parameter', { status: 400 });
  }

  const ipfsMatch = targetUrl.match(/bafy[a-z2-7]{59,}/g);
  if (ipfsMatch) {
    targetUrl = `https://taikonfts.4everland.link/ipfs/${ipfsMatch[0]}`;
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
