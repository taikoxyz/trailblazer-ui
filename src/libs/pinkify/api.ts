import { PUBLIC_TRAILBLAZER_API_URL } from "$env/static/public";

export async function postSignature(address: string, signature: string, message: string) {
  const response = await fetch(`${PUBLIC_TRAILBLAZER_API_URL}/sign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      address: address,
      signature: signature,
      message: message
    })
  });
  const data = await response.json();
  console.log(data);
}
