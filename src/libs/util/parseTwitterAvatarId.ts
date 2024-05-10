export const parseTwitterAvatarId = (url: string) => {
  // Use a regular expression to match the numeric ID in the URL
  const match = url.match(/profile_images\/(\d+)\//);
  if (match && match.length > 1) {
    return match[1]; // Return the numeric ID
  } else {
    return null; // Return null if no match is found
  }
}
