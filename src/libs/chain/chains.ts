export const getChainImages = (): Record<number, string> => {
  const map = {
    167000: '/chains/taiko.svg',
    167009: '/chains/taiko.svg',
  };
  return map;
};

export const getChainImage = (chainId: number) => {
  const chain = getChainImages()[chainId];
  if (!chain) {
    throw new Error(`Chain with id ${chainId} not found`);
  }
  return chain;
};
