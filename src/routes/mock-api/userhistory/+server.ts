import { json } from '@sveltejs/kit';

import { MOCK_USER_POINT_HISTORY } from '../../../tests/mocks/userPointHistory';

export function GET() {
  return json(MOCK_USER_POINT_HISTORY);
}
