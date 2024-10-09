import { type Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname !== '/error') {
    throw redirect(400, `/error`);
  }

  return resolve(event);
};
