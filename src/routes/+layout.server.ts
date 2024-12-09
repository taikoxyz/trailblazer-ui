import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, url }) => {
  const { allowed } = locals;

  if (!allowed && url.pathname !== '/error') {
    throw redirect(302, '/error');
  }
};
