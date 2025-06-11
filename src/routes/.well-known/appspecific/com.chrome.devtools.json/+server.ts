import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// Handle Chrome DevTools requests for app-specific configuration
// This prevents 404 errors in the console when Chrome DevTools looks for this file
export const GET: RequestHandler = async () => {
  // Return an empty JSON object or specific DevTools configuration
  // For most apps, an empty object is sufficient
  return json({});
};
