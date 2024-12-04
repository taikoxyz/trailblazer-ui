import { json } from '@sveltejs/kit';

export function GET() {
  return json({
    rank: 2,
    score: 123456789.25,
    total: 694200,
  });
}
