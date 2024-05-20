/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
  runtime: 'edge',
  split: true
};

//export const ssr = false;
export const prerender = false;
