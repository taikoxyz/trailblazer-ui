export const parseTwitterAvatarId = (url: string) => {
  // Use a regular expression to match the numeric ID in the URL
  const match = url.match(/profile_images\/(\d+)\//);


  if (match && match.length > 1) {

    // parse the url, rmove the last route and append X926izfy_400x400jpg to the end
    const urlParts = url.split('/');
    const endPart = urlParts.pop();

    if (!endPart) {
      return '';
    }
    const id = endPart.split('_');

    // get file extension
    const ext = id[1].split('.')[1];

    urlParts.push(`${id[0]}_400x400.jpg`);
    return `${match[1]}/${id[0]}/${ext}`; // Return the numeric ID
  } else {
    return ''; // Return null if no match is found
  }
};
