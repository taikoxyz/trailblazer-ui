import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, url }) => {
  const isPrerender = url.protocol === 'file:';

  if (!locals.allowed && url.pathname !== '/error' && !isPrerender) {
    throw redirect(302, '/error');
  }
};
