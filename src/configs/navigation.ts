type INavigation = {
  label: string;
  url: string;
  disabled: boolean;
};

export const NavigationData: INavigation[] = [
  {
    label: 'Trailblazer',
    url: '/',
    disabled: false,
  },
  {
    label: 'Leaderboard',
    url: '/leaderboard',
    disabled: false,
  },
  {
    label: 'Profile',
    url: '/profile',
    disabled: false,
  },
  {
    label: 'Factions',
    url: '/factions',
    disabled: false,
  },
  {
    label: 'Airdrop',
    url: '/airdrop',
    disabled: true,
  },
];
