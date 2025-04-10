import { type Load, redirect } from '@sveltejs/kit';
import { getAccount } from '@wagmi/core';

import { wagmiConfig } from '$lib/shared/wagmi';

export const load: Load = async () => {
  const account = getAccount(wagmiConfig);

  if (account?.address) {
    throw redirect(302, `/profile/${account?.address}`);
  }
};
