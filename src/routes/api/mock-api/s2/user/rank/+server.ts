import { json } from '@sveltejs/kit';

export function GET() {
  return json({
    rank: 2,
    score: 12345678.9,
    total: 694200,
  });
}
