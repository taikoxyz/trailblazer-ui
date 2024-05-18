import { error, json } from '@sveltejs/kit';
import { createCanvas, loadImage } from 'canvas';

import { generateTwitterCardSVG } from '$libs/pinkify/generateTwitterCard.js';
import { savePngToSupabase } from '$libs/supabase/functions';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  const { slug } = params;

  try {

    // const response = await fetch(`https://pbs.twimg.com/profile_images/${slug}/X926izfy_400x400.jpg`);
    const response = await fetch(`https://pbs.twimg.com/profile_images/1773273774345138176/X926izfy_400x400.jpg`);

    if (!response.ok) {
      return json({
        status: response.status,
        body: `Failed to fetch image`
      });
    }

    const blob = await response.blob();
    // const buffer = Buffer.from(arrayBuffer);

    // Generate the SVG content (replace this with your actual SVG generation logic)
    const svg = await generateTwitterCardSVG(blob);

    // Create a new canvas element
    const canvas = createCanvas(1200, 600); // Adjust the dimensions as needed
    const ctx = canvas.getContext('2d');
    const img = await loadImage('data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64'));

    // Set canvas size to match SVG dimensions
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw SVG onto canvas
    ctx.drawImage(img, 0, 0);

    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png');
    const buffer = canvas.toBuffer('image/png');



    // Save PNG to Supabase (assuming you have a savePngToSupabase function)
    await savePngToSupabase(slug, dataUrl);

    return {
      status: 200,
      headers: {
        'Content-Type': 'image/png'
      },
      body: buffer,
      blob: buffer
    };

  } catch (error) {
    return json({
      status: 500,
      body: `Error`
    });
  }
}
