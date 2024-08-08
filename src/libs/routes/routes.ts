import type { IconType } from '$components/Icon';

export interface NavigationItem {
  name: string;
  route?: string;
  redirect?: string;
  icon?: IconType;
  children?: NavigationItem[];
}

export const routes: NavigationItem[] = [
  {
    name: 'Profile',
    route: '/profile',
  },
  {
    name: 'Leaderboards',
    children: [
      { name: 'Bridge', route: '/leaderboard/bridge', icon: 'quad-circles' },
      { name: 'Dapp', route: '/leaderboard/dapp', icon: 'star2' },
      { name: 'DeFi', route: '/leaderboard/defi', icon: 'butterfly-cross' },
    ],
  },
  {
    name: 'Discover',
    children: [
      { name: 'About', route: '/about', icon: 'nav-about' },
      { name: 'Ecosystem', route: 'https://taiko.xyz/ecosystem', icon: 'nav-ecosystem' },
      { name: 'Bridge', route: 'https://bridge.taiko.xyz', icon: 'nav-bridge' },
    ],
  },
  {
    name: 'FAQs',
    route: '/faq',
  },
];
