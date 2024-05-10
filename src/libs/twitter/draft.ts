export function draftMessage(message: string) {
  // URL-encode the message
  const encodedMessage = encodeURIComponent(message);

  // Twitter URL for creating a new tweet with the pre-drafted message
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
  return twitterLink;
}

export function draftMessageFarcaster(message: string) {
  // URL-encode the message
  const encodedMessage = encodeURIComponent(message);

  // Twitter URL for creating a new tweet with the pre-drafted message
  const twitterLink = `https://warpcast.com/intent/tweet?text=${encodedMessage}`;
  return twitterLink;
}
