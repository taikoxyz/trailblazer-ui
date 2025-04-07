import axios from 'axios';
import type { Address } from 'viem';

import getTaikoStatusEndpoint from './getTaikoStatusEndpoint';
import { StatusRank } from './types';

export default async function getTaikoStatus(address: Address): Promise<{ rank: StatusRank; points: number }> {
  try {
    const res = await axios.get(getTaikoStatusEndpoint() + address);

    return {
      points: res.data.points,
      rank: Object.values(StatusRank)[res.data.rank] as StatusRank,
    };
  } catch (e) {
    console.error('getTaikoStatus error', e);
    return {
      points: 0,
      rank: StatusRank.None,
    };
  }
}
