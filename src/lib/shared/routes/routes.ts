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
      { name: 'Users', route: '/leaderboard/s5/user', icon: 'double-user' },
      { name: 'Liquidity Royale', route: '/leaderboard/liquidity/4', icon: 'nav-liquidity' },
      { name: 'Thrillblazers VIII', route: '/leaderboard/thrillblazers/8', icon: 'nav-cross' },
      { name: 'Thrillblazers VII', route: '/leaderboard/thrillblazers/7', icon: 'nav-cross' },
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
