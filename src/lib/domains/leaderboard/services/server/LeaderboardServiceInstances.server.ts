import { DappCompetition } from '../../factory/DappCompetition.server';
import { LiquidityCompetition } from '../../factory/LiquidityCompetiton.server';

export const thrillblazerInstances: Record<number, DappCompetition> = {
  1: new DappCompetition('thrillblazer', 'thrillblazer', 'Thrillblazers Edition 1', 1),
  2: new DappCompetition('thrillblazer', 'thrillblazer', 'Thrillblazers Edition 2', 2),
  3: new DappCompetition('thrillblazer', 'thrillblazer', 'Thrillblazers Edition 3', 3),
};

export const chillblazerServiceInstances: Record<number, DappCompetition> = {
  1: new DappCompetition('chillblazer', 'chillblazer', 'Chillblazers Edition 1', 1),
  2: new DappCompetition('chillblazer', 'chillblazer', 'Chillblazers Edition 2', 2),
};

export const liquidityServiceInstances: Record<number, Record<string, LiquidityCompetition>> = {
  1: {
    OG: new LiquidityCompetition('liquidity', 'liquidity', 'OG Edition', 1),
  },
  2: {
    OG: new LiquidityCompetition('liquidity', 'liquidity', 'OG Edition', 2),
  },
  3: {
    OG: new LiquidityCompetition('liquidity/og', 'liquidity', 'OG Edition', 3),
    MOGULS: new LiquidityCompetition('liquidity/moguls', 'liquidity', 'Moguls Edition', 3),
  },
};
