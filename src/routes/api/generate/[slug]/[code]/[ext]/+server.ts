import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  const { slug: twitterImageId, code: twitterImageCode, ext } = params;
  return json({twitterImageId})
}
