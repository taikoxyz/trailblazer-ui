import { error } from '@sveltejs/kit';

import { bannedCountries, bannedCountryCodes } from '$configs/banned-countries';

export function load(event) {
  const country = event.request.headers.get('x-vercel-ip-country') ?? false;
  const isDev = event.url.hostname === 'localhost' || event.url.port === '5173';
  if (!isDev && (!country || bannedCountryCodes.includes(country))) {
    return error(400, {
      message: `The site is not available on the following countries: ${Object.values(bannedCountries).join(', ')}`,
    });
  }
  return {
    location: { country },
  };
}
