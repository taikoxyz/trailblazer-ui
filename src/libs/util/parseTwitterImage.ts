export const parseTwitterImage = (url: string) => {
  // parse the url, rmove the last route and append X926izfy_400x400jpg to the end
  const urlParts = url.split('/');
  const endPart = urlParts.pop();
  const id = endPart.split('_');

  urlParts.push(`${id[0]}_400x400.jpg`);
  return urlParts.join('/');
};
