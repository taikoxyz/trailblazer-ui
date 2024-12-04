/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/routes/sitemap.xml/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import * as sitemap from 'super-sitemap';

export const prerender = true; // optional

export const GET: RequestHandler = async () => {
  return await sitemap.response({
    origin: 'https://trailblazers.taiko.xyz',
    excludeRoutePatterns: [
      '^/mock-api.*', // i.e. routes starting with `/dashboard`
      '.*\\[page=integer\\].*', // i.e. routes containing `[page=integer]`–e.g. `/blog/2`
      '.*\\/pinkify\\/.*',
      '.*\\/profile\\/.*',
    ],
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
