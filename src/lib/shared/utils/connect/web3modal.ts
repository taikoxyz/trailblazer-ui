import { createWeb3Modal } from '@web3modal/wagmi';

import { PUBLIC_WALLETCONNECT_PROJECT_ID } from '$env/static/public';
import { wagmiConfig } from '$shared/wagmi/client';

const projectId = PUBLIC_WALLETCONNECT_PROJECT_ID;

export const web3modal = createWeb3Modal({ wagmiConfig, projectId });
