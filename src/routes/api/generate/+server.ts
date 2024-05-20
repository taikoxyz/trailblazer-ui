import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { slug: twitterImageId, code: twitterImageCode, ext } = await request.json();

  // Verify if slug exists
  if (!twitterImageId || !twitterImageCode) {
    return error(400, 'Bad Request');
  }

  try {
    // Fetch the image from twitter
    const response = await fetch(`https://pbs.twimg.com/profile_images/${twitterImageId}/${twitterImageCode}_400x400.${ext}`);

    // https://pbs.twimg.com/profile_images/1773273774345138176/X926izfy_400x400.jpg
    // Check if the image was found
    if (!response.ok) {
      return error(response.status, `Failed to fetch image: ${response.statusText}`);
    }
    // Read the image as a blob
    const originalPfp = await response.arrayBuffer();

    // convert blob to base64
    // Convert blob to Base64
    const base64data = Buffer.from(originalPfp).toString('base64');

    const svg = `<svg
    width="400"
    viewBox="0 0 400 400"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .cls-1 {
          fill: #d63b95;
        }
  
        .cls-1,
        .cls-2 {
          stroke-width: 0px;
        }
  
        .cls-2 {
          fill: #d63c95;
        }
  
        .cls-3 {
          opacity: .3;
        }
  
        .cls-4 {
          opacity: .7;
        }
      </style>
    </defs>
    <image x="0" y="0" width="400" height="400" href="data:image/png;base64,${base64data}" />
    <path class="cls-1"
      d="M200,28c45.9,0,89.1,17.9,121.6,50.4,32.5,32.5,50.4,75.7,50.4,121.6s-17.9,89.1-50.4,121.6c-32.5,32.5-75.7,50.4-121.6,50.4s-89.1-17.9-121.6-50.4c-32.5-32.5-50.4-75.7-50.4-121.6s17.9-89.1,50.4-121.6c32.5-32.5,75.7-50.4,121.6-50.4M200,0C89.5,0,0,89.5,0,200s89.5,200,200,200,200-89.5,200-200S310.5,0,200,0h0Z" />
    <g class="cls-4">
      <path class="cls-1"
        d="M200,58.2c37.9,0,73.5,14.8,100.3,41.5,26.8,26.8,41.5,62.4,41.5,100.3s-14.8,73.5-41.5,100.3c-26.8,26.8-62.4,41.5-100.3,41.5s-73.5-14.8-100.3-41.5c-26.8-26.8-41.5-62.4-41.5-100.3s14.8-73.5,41.5-100.3c26.8-26.8,62.4-41.5,100.3-41.5M200,28.2C105.1,28.2,28.2,105.1,28.2,200s76.9,171.8,171.8,171.8,171.8-76.9,171.8-171.8S294.9,28.2,200,28.2h0Z" />
    </g>
    <g class="cls-3">
      <path class="cls-1"
        d="M200,88.3c29.8,0,57.9,11.6,79,32.7s32.7,49.2,32.7,79-11.6,57.9-32.7,79-49.2,32.7-79,32.7-57.9-11.6-79-32.7-32.7-49.2-32.7-79,11.6-57.9,32.7-79,49.2-32.7,79-32.7M200,58.3c-78.3,0-141.7,63.4-141.7,141.7s63.4,141.7,141.7,141.7,141.7-63.4,141.7-141.7S278.3,58.3,200,58.3h0Z" />
    </g>
    <path class="cls-2"
      d="M0,0v400h400V0H0ZM200,375.7c-97,0-175.7-78.7-175.7-175.7S103,24.3,200,24.3s175.7,78.7,175.7,175.7-78.7,175.7-175.7,175.7Z" />
  </svg>`;

    // Stream the image directly in the response
    // return json(svg);
    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  } catch (e) {
    console.error('Failed to fetch image:', e);
    return error(500, 'Internal Server Error');
  }
}
