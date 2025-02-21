import { CexCompetition } from '../factory/CexCompetition.server';
import { DappCompetition } from '../factory/DappCompetition.server';

export const thrillblazerInstances: Record<number, DappCompetition> = {
  1: new DappCompetition('thrillblazer', 'thrillblazer', 'Thrillblazers Edition 1', 1),
  2: new DappCompetition('thrillblazer', 'thrillblazer', 'Thrillblazers Edition 2', 2),
  3: new DappCompetition('thrillblazer', 'thrillblazer', 'Thrillblazers Edition 3', 3),
};

export const chillblazerServiceInstances: Record<number, DappCompetition> = {
  1: new DappCompetition('chillblazer', 'chillblazer', 'Chillblazers Edition 1', 1),
  2: new DappCompetition('chillblazer', 'chillblazer', 'Chillblazers Edition 2', 2),
};

export const cexCompetitionServiceInstaces: Record<number, CexCompetition> = {
  1: new CexCompetition('cex', 'spot', 'CEX Edition 1 - Spot', 1),
};
