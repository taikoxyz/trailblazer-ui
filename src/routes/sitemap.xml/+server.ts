/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/routes/sitemap.xml/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import * as sitemap from 'super-sitemap';

export const prerender = true; // optional

export const GET: RequestHandler = async () => {
  return await sitemap.response({
    origin: 'https://trailblazers.taiko.xyz',
    paramValues: {
      '/journeys/thrillblazers/[slug]': ['1', '2', '3', '4'],
      '/journeys/chillblazers/[slug]': ['1', '2', '3'],
    },
    excludeRoutePatterns: ['^/mock-api.*', '.*\\[page=integer\\].*', '.*\\/pinkify\\/.*', '.*\\/profile\\/.*'],
    defaultChangefreq: 'daily',
    defaultPriority: 0.7,
    sort: 'alpha', // default is false; 'alpha' sorts all paths alphabetically.
    processPaths: (paths: any[]) => {
      // Optional callback to allow arbitrary processing of your path objects. See the
      // processPaths() section of the README.
      return paths;
    },
  });
};
