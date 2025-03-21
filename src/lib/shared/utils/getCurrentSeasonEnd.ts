import { PUBLIC_ACTIVE_SEASON } from '$env/static/public';

export const SeasonEndToDateMap: { [key: number]: Date } = {
  1: new Date('2024-09-15'),
  2: new Date('2024-12-16'),
  3: new Date('2025-03-17'),
  4: new Date('2025-06-16'),
};

export const getCurrentSeasonEnd = (): number => {
  const configured = parseInt(PUBLIC_ACTIVE_SEASON);

  if (!configured) {
    throw new Error('No active season configured');
  }

  return SeasonEndToDateMap[configured].getTime();
};
