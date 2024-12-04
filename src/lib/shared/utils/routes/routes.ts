import type { IconType } from '$shared/components/Icon';

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
      { name: 'Users', route: '/leaderboard/s2/user', icon: 'double-user' },
      // { name: 'Bridge', route: '/leaderboard/bridge', icon: 'quad-circles' },
      { name: 'Dapps', route: '/leaderboard/s2/dapp', icon: 'star2' },
      // { name: 'DeFi', route: '/leaderboard/defi', icon: 'flower-circle' },
      { name: 'Gaming', route: '/leaderboard/s2/gaming', icon: 'gaming' },
    ],
  },
  {
    name: 'Discover',
    children: [
      { name: 'About', route: '/about', icon: 'nav-about' },
      { name: 'Ecosystem', route: '/ecosystem', icon: 'nav-ecosystem' },
      { name: 'Bridge', route: 'https://bridge.taiko.xyz', icon: 'nav-bridge' },
      { name: 'FAQs', route: '/faq', icon: 'quad-circles' },
    ],
  },
  {
    name: 'Journeys',
    children: [
      { name: 'Chillblazers', route: '/journeys/s2/chillblazers', icon: 'nav-conway' },
      { name: 'Thrillblazers', route: '/journeys/s2/thrillblazers', icon: 'flower-circle' },
      { name: 'Liquidity Royale', route: '/journeys/s2/liquidity', icon: 'nav-cross' },
      { name: 'Badges', route: '/badge', icon: 'badge-migration' },
    ],
  },
];
