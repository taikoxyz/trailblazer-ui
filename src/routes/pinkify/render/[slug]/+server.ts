
import { error } from '@sveltejs/kit';

import { generateTwitterCardSVG } from '$libs/pinkify/generateTwitterCard.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {


  // Extract slug parameter from the request
  const { pathname } = url;

  // split the pathname to get the slug
  const slug = pathname.split('/').pop();
  // Verify if slug exists
  if (!slug) {
    return error(400, 'Bad Request');
  }



  try {
    // Fetch the image from twitter
    const response = await fetch(`https://pbs.twimg.com/profile_images/${slug}/X926izfy_400x400.jpg`);
    // 1773273774345138176

    if (!response.ok) {
      return error(response.status, `Failed to fetch image: ${response.statusText}`);
    }

    const blob = await response.blob();

    // const base64data = await blobToBase64(blob);
    // const svg = `<svg
    // id="test"
    // width="600"
    // viewBox="0 0 1200 600"
    // preserveAspectRatio="xMidYMid meet"
    // xmlns="http://www.w3.org/2000/svg">
    // <rect x="0" y="0" width="100%" height="100%" fill="#d63b95" />
    // <image x="50%" y="50%" width="300" height="400" transform="translate(-150,-150)" href="${base64data}" />
    // <text
    //   x="50%"
    //   y="100"
    //   text-anchor="middle"
    //   fill="white"
    //   font-size="80"
    //   font-family="Clash Grotesk"
    //   alignment-baseline="middle">@zkenk has answered the call</text>
    // </svg>`;

    const svg = await generateTwitterCardSVG(blob);


    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml'
      }
    });
  } catch (e) {
    console.error('Failed to fetch image:', e);
    return error(500, 'Internal Server Error');
  }
}
