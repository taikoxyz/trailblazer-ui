export const obfuscateString = (str: string): string => {
  // replace each letter with a random new one, keep the length identical
  return str
    .split('')
    .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
    .join('');
};
