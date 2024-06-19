import { PUBLIC_TRAILBLAZER_API_URL } from '$env/static/public';
import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';

const baseApiUrl = isDevelopmentEnv ? '/mock-api' : PUBLIC_TRAILBLAZER_API_URL;

export async function postSignature(address: string, signature: string, message: string) {
  const response = await fetch(`${baseApiUrl}/sign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address: address,
      signature: signature,
      message: message,
    }),
  });
  const data = await response.json();
  console.info(data);
}
