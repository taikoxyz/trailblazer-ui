import { json } from '@sveltejs/kit';

export function GET() {
  return json({ lastUpdate: '2024-03-07T12:00:00Z', protocols: [] });
}
