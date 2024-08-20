import { json } from '@sveltejs/kit';

export function GET() {
  return json({
    rank: 2,
    score: 123456789,
    total: 694200,
  });
}
