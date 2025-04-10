import { type Handle } from '@sveltejs/kit';

import { PUBLIC_BYPASS_GEOBLOCK } from '$env/static/public';
import { setupI18n } from '$i18n/index';

const bannedCountries: Record<string, string> = {
  AF: 'Afghanistan',
  AS: 'American Samoa', // United States Territory
  BI: 'Burundi',
  BS: 'Bahamas',
  BW: 'Botswana',
  BY: 'Belarus',
  CA: 'Canada',
  CD: 'The Democratic Republic of the Congo',
  CF: 'Central African Republic',
  CI: 'Côte d’Ivoire',
  CN: 'People’s Republic of China',
  CU: 'Cuba',
  ET: 'Ethiopia',
  GH: 'Ghana',
  GU: 'Guam', // United States Territory
  ID: 'Indonesia',
  IQ: 'Iraq',
  IR: 'Islamic Republic of Iran',
  KH: 'Cambodia',
  KP: 'Democratic People’s Republic of Korea (North Korea)',
  LB: 'Lebanon',
  LK: 'Sri Lanka',
  LY: 'Libya',
  ML: 'Mali',
  MM: 'Myanmar',
  MP: 'Northern Mariana Islands', // United States Territory
  NI: 'Nicaragua',
  PA: 'Panama',
  PK: 'Pakistan',
  PR: 'Puerto Rico', // United States Territory
  RU: 'Russia',
  SD: 'Sudan',
  SO: 'Somalia',
  SS: 'South Sudan',
  SY: 'Syrian Arab Republic',
  TN: 'Tunisia',
  TT: 'Trinidad and Tobago',
  UA: 'Ukraine', // Some regions are internationally recognized as part of Ukraine but have areas under Russian control
  US: 'United States',
  VE: 'Bolivarian Republic of Venezuela',
  VI: 'U.S. Virgin Islands', // United States Territory
  YE: 'Yemen',
  ZW: 'Zimbabwe',
};

const allowedUserAgents = [
  'Googlebot',
  'Googlebot-Image',
  'Googlebot-Video',
  'Googlebot-News',
  'Mediapartners-Google',
  'AdsBot-Google',
  'APIs-Google',
  'Google-Read-Aloud',
  'Google-Firebase-Cloud-Messaging',
  'DuplexWeb-Google',
  'Bingbot',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'Sogou',
  'Exabot',
  'facebot',
  'ia_archiver', // Alexa's crawler
  'Twitterbot',
  'Applebot',
  'LinkedInBot',
  'Pinterestbot',
  'CCBot', // Common Crawl
  'GPTBot', // OpenAI's crawler
  'PerplexityBot',
  'ImagesiftBot',
  'Diffbot',
  'Google-Extended',
  'GoogleOther',
];

const bannedCountryCodes = Object.keys(bannedCountries);

export const handle: Handle = async ({ event, resolve }) => {
  await setupI18n();

  const country = event.request.headers.get('x-vercel-ip-country') ?? '';
  const userAgent = event.request.headers.get('user-agent') ?? '';
  const isDev = event.url.hostname === 'localhost' || event.url.port === '5173';
  const isBypassed = PUBLIC_BYPASS_GEOBLOCK === 'true';

  const isKnownCrawler = allowedUserAgents.some((crawler) => userAgent.includes(crawler));

  const allowed = isDev || isBypassed || isKnownCrawler || (country && !bannedCountryCodes.includes(country));

  event.locals.allowed = Boolean(allowed);

  return resolve(event);
};
