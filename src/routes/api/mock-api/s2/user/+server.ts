import { json } from '@sveltejs/kit';

import { MOCK_PROFILE } from '$mocks';

export function GET() {
  return json(MOCK_PROFILE);
}
