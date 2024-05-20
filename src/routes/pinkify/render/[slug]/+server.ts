import { error, json } from '@sveltejs/kit';
import { createCanvas, loadImage } from 'canvas';

import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { generateTwitterCardSVG } from '$libs/pinkify/generateTwitterCard.js';
import { savePngToSupabase } from '$libs/supabase/functions';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  const { slug } = params;

  try {

    // Fetch the image from Supabase
    const response = await fetch(`${PUBLIC_SUPABASE_URL}/pinkify/${hash}.png`);

    // Check if the image was found
    if (!response.ok) {
      return error(response.status, `Failed to fetch image: ${response.statusText}`);
    }

    const base64 = await response.text(); // Assuming the fetch returns a full base64 URI
    const data = base64.split(',')[1]; // This removes the 'data:image/png;base64,' part
    const binaryData = Buffer.from(data, 'base64'); // Decode base64 to binary

    // Stream the image directly in the response
    return new Response(binaryData, {
      headers: {
        'Content-Type': 'image/png'
      }
    });

  } catch (error) {
    return json({
      status: 500,
      body: `Error`
    });
  }
}
