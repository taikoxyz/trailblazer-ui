import { error } from '@sveltejs/kit';
import { createCanvas, loadImage } from 'canvas';

import { generateTwitterCardSVG } from '$libs/pinkify/generateTwitterCard.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  // Extract slug parameter from the request
  const { pathname } = url;

  // Split the pathname to get the slug
  const slug = pathname.split('/').pop();

  // Verify if slug exists
  if (!slug) {
    return new Response('Bad Request', { status: 400 });
  }

  try {
    // Fetch the image from Twitter
    const response = await fetch(`https://pbs.twimg.com/profile_images/${slug}/X926izfy_400x400.jpg`);

    if (!response.ok) {
      return new Response(`Failed to fetch image: ${response.statusText}`, { status: response.status });
    }

    // Get Image
    const blob = await response.blob();
    const svg = await generateTwitterCardSVG(blob);
    const svgBuffer = Buffer.from(svg, 'utf-8');

    // Convert SVG to PNG
    const width = 1200;
    const height = 600;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const img = await loadImage(`data:image/svg+xml;base64,${svgBuffer.toString('base64')}`);
    ctx.drawImage(img, 0, 0, width, height);

    const imgBuffer = canvas.toBuffer('image/png');


    // const pngUrl = URL.createObjectURL(imgBuffer);



    // Return the PNG image
    return new Response(imgBuffer, {
      headers: {
        'Content-Type': 'image/png',
      }
    });
  } catch (e) {
    console.error('Failed to fetch image:', e);
    return new Response('Internal Server Error', { status: 500 });
  }
}
