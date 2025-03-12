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
    children: [{ name: 'Users', route: '/leaderboard/s3/user', icon: 'double-user' }],
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
      { name: 'Thrillblazers IV', route: '/journeys/thrillblazers/4', icon: 'nav-cross' },
      { name: 'Liquidity Royale', route: '/journeys/liquidity', icon: 'nav-liquidity' },
      { name: 'Badges', route: '/badge', icon: 'badge-migration' },
    ],
  },
  {
    name: 'Profile',
    route: '/profile',
  },
];
