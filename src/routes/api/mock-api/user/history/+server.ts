import { json } from '@sveltejs/kit';

import { MOCK_USER_POINT_HISTORY } from '$mocks';

export function GET({ url }) {
  const address = url.searchParams.get('address');
  if (!address) throw new Error('address is required');

  return json(MOCK_USER_POINT_HISTORY);
}
