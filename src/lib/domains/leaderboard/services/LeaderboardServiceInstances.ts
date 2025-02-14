import { CexCompetitionService } from './CexCompetitionService';
import { DappLeaderboardService } from './DappLeaderboardService';
import { GamingLeaderboardService } from './GamingLeaderboardService';
import { LiquidityCompetitionService } from './LiquidityCompetitionService';
import { UserLeaderboardService } from './UserLeaderboardService';

export const dappLeaderboardService = new DappLeaderboardService();
export const userLeaderboardService = new UserLeaderboardService();
export const gamingLeaderboardService = new GamingLeaderboardService();

export const liquidityCompetitionService = new LiquidityCompetitionService();
export const cexCompetitionService = new CexCompetitionService();
