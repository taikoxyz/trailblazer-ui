import { DappCompetitionService } from './DappCompetitionService';
import { DappLeaderboardService } from './DappLeaderboardService';
import { GamingLeaderboardService } from './GamingLeaderboardService';
import { LiquidityCompetitionService } from './LiquidityCompetitionService';
import { UserLeaderboardService } from './UserLeaderboardService';

export const dappLeaderboardService = new DappLeaderboardService();
export const userLeaderboardService = new UserLeaderboardService();
export const gamingLeaderboardService = new GamingLeaderboardService();

export const dappCompetitionService = new DappCompetitionService();
export const liquidityCompetitionService = new LiquidityCompetitionService();
