import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, route }) => {
  const isPrerender = route !== undefined;

  if (!locals.allowed && !isPrerender) {
    throw redirect(302, '/error');
  }
};
