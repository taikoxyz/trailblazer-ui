import { DappLeaderboardService } from './DappLeaderboardService';
import { GamingLeaderboardService } from './GamingLeaderboardService';
import { UserLeaderboardService } from './UserLeaderboardService';

export const dappLeaderboardService = new DappLeaderboardService();
export const userLeaderboardService = new UserLeaderboardService();
export const gamingLeaderboardService = new GamingLeaderboardService();
