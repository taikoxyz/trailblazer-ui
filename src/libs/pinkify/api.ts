import axios from 'axios';

import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';

const baseApiUrl = isDevelopmentEnv ? '/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

export async function postSignature(address: string, signature: string, message: string) {
  const response = await axios.post(
    `${baseApiUrl}/sign`,
    {
      address: address,
      signature: signature,
      message: message,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.data;
  console.info(data);
}
