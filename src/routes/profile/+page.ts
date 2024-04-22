import { type Load, redirect } from '@sveltejs/kit';
import { getAccount } from '@wagmi/core';

import { config } from '$libs/wagmi';

// import { goto } from '$app/navigation';

export const load: Load = async () => {
  // const user = get(session).user;

  const account = getAccount(config)
  if (account?.address) {
    throw redirect(302, `/profile/${account?.address}`);
  } else {
    throw redirect(302, '/login');
  }
};
