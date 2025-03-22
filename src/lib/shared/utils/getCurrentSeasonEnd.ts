import { PUBLIC_ACTIVE_SEASON } from '$env/static/public';

export const SeasonEndToDateMap: { [key: number]: Date } = {
  1: new Date(Date.UTC(2024, 8, 15, 12)),
  2: new Date(Date.UTC(2024, 11, 16, 12)),
  3: new Date(Date.UTC(2025, 2, 17, 12)),
  4: new Date(Date.UTC(2025, 5, 16, 12)),
};

export const getSeasonEnd = (season: number): number => {
  return SeasonEndToDateMap[season].getTime();
};

export const getCurrentSeasonEnd = (): number => {
  const configured = parseInt(PUBLIC_ACTIVE_SEASON);

  if (!configured) {
    throw new Error('No active season configured');
  }

  return SeasonEndToDateMap[configured].getTime();
};
