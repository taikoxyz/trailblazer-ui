const WHITELIST_PAGES = [`/`];

/** @type {import('@sveltejs/kit').Reroute} */
export function reroute({ url }: { url: any }) {
  return WHITELIST_PAGES.includes(url.pathname) ? url.pathname : '/';
}
