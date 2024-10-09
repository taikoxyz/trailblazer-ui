import { type Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async () => {
  throw redirect(400, `/error`);
};
