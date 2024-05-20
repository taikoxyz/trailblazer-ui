import { error, json } from '@sveltejs/kit';

/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
	runtime: 'edge',
  split: true
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  const { slug: twitterImageId, code: twitterImageCode, ext } = params;
  return json({twitterImageId})
}
