import { json } from '@sveltejs/kit';

import { MOCK_PROFILE } from '../../../../tests/mocks/profile';

export function GET() {
  return json(MOCK_PROFILE);
}
