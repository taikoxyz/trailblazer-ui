import { json } from '@sveltejs/kit';

export function GET({ url }) {
  const { searchParams } = url;

  if (!searchParams.get('address')) {
    throw new Error('Address is required');
  }

  return json({
    address: searchParams.get('address'),
    points: Math.round(Math.random() * 265_000),
  });
}
