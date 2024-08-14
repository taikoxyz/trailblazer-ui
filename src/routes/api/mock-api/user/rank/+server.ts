import { json } from '@sveltejs/kit';

export function GET() {
  return json({
    rank: 2,
    score: 1000,
    total: 694200,
  });
}
