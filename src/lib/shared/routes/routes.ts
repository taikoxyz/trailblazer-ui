import type { IconType } from '$shared/components/Icon';

export interface NavigationItem {
  name: string;
  route?: string;
  redirect?: string;
  icon?: IconType;
  children?: NavigationItem[];
  flamboyant?: boolean;
}

export const routes: NavigationItem[] = [
  {
    name: 'Leaderboards',
    children: [
      { name: 'Users', route: '/leaderboard/s4/user', icon: 'double-user' },
      { name: 'Liquidity Royale', route: '/leaderboard/liquidity/3', icon: 'nav-liquidity' },
      { name: 'Thrillblazers VI', route: '/leaderboard/thrillblazers/6', icon: 'nav-cross' },
      { name: 'Thrillblazers V', route: '/leaderboard/thrillblazers/5', icon: 'nav-cross' },
      { name: 'Thrillblazers IV', route: '/leaderboard/thrillblazers/4', icon: 'nav-cross' },
    ],
  },
  {
    name: 'Discover',
    children: [
      { name: 'About', route: '/about', icon: 'info-circle' },
      { name: 'Ecosystem', route: '/ecosystem', icon: 'nav-ecosystem' },
      { name: 'Bridge', route: 'https://bridge.taiko.xyz', icon: 'nav-bridge' },
      { name: 'FAQs', route: '/faq', icon: 'nav-faq' },
    ],
  },
  {
    name: 'Journeys',
    flamboyant: true,
    children: [
      { name: 'Preconfs', route: '/journeys/preconfs', icon: 'nav-liquidity' },
      { name: 'Badges', route: '/journeys/badge', icon: 'badge-migration' },
    ],
  },
  {
    name: 'Profile',
    route: '/profile',
  },
];
