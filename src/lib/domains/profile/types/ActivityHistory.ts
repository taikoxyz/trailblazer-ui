import type { UserPointHistoryPage } from '../dto/profile.dto';

export type ActivityHistory = {
  activityHistory: {
    pointsHistory?: UserPointHistoryPage;
  };
};
