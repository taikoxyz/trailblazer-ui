import { type Load, redirect } from '@sveltejs/kit';
import { getAccount } from '@wagmi/core';

import { wagmiConfig } from '$libs/wagmi';

// import { goto } from '$app/navigation';

export const load: Load = async () => {
  // const user = get(session).user;

  const account = getAccount(wagmiConfig);
  if (account?.address) {
    throw redirect(302, `/profile/${account?.address}`);
  } else {
    // TODO: Force user to connect wallet
    throw redirect(302, '/');
  }
};
