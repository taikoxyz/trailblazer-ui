import { type Handle } from '@sveltejs/kit';

export const handle: Handle = async () => {
  return new Response(null, {
    status: 400,
    headers: { location: '/' },
  });
};
