export const parseTwitterImage = (url: string) => {

  // parse the url, rmove the last route and append X926izfy_400x400jpg to the end
  const urlParts = url.split('/');
  urlParts.pop();
  urlParts.push('X926izfy_400x400.jpg');
  return urlParts.join('/');

}
