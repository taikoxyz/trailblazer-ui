import { json } from '@sveltejs/kit';
export const prerender = false;
export function GET() {
  return json({ health: true });
}
