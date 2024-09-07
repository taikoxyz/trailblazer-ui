import type { GameBoard } from '$components/BadgeChampions';
import type { NFTCollection } from '$components/Carousel';
import type { LeaderboardTransactions } from '$components/Leaderboards';

export type TabContent = {
  name: string;
  content: typeof LeaderboardTransactions | typeof NFTCollection | typeof GameBoard;
  checked?: boolean;
};
