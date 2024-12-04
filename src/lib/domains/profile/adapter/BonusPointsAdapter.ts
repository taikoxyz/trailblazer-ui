import type { Address } from 'viem';

import { readEventRegisterEvents, readEventRegisterRegistrations, writeEventRegisterRegister } from '$generated/abi';
import { getAxiosInstance, globalAxiosConfig } from '$lib/shared/services/api/axiosClient';
import { chainId } from '$lib/shared/utils/chain';
import { wagmiConfig } from '$lib/shared/wagmi';
import { pendingTransactions } from '$shared/stores/pendingTransactions';
import { getLogger } from '$shared/utils/logger';

import type { BonusDTO } from '../dto/bonus.dto';

const log = getLogger('SeasonBonusPointsAdapter');

enum EventIds {
  SEASON1 = 0,
}

const mapSeasonToEventId = (season: number): number => {
  switch (season) {
    case 2:
      return EventIds.SEASON1;
    default:
      throw new Error('Invalid season');
  }
};

type Event = readonly [id: bigint, name: string, exists: boolean, registrationOpen: boolean];

export class SeasonBonusPointsAdapter {
  /**
   * Fetches the user's bonus points from the /user/bonus endpoint.
   *
   * @param {Address} address the user's address
   * @param {number} season the season the user's bonus points are being fetched for
   * @return {*}  {Promise<number>}
   * @memberof ProfileApiAdapter
   */
  async fetchUserBonusPoints(address: Address, season: number): Promise<number> {
    const client = getAxiosInstance(season);
    const response = await client.get<BonusDTO>(`/user/bonus`, {
      params: { address },
      ...globalAxiosConfig,
    });

    return response.data.value;
  }

  /**
   * Claims the user's bonus points
   *
   * @param {Address} address
   * @param {number} season
   * @memberof ProfileApiAdapter
   */
  async claimUserBonusPoints(address: Address, season: number) {
    log('claimUserBonusPoints', { address, season });
    const txHash = await writeEventRegisterRegister(wagmiConfig, {
      args: [BigInt(mapSeasonToEventId(season))],
      chainId,
    });
    await pendingTransactions.add(txHash);

    return txHash;
  }

  /**
   * Checks if the user has already registered their bonus point claim
   *
   * @param {Address} address
   * @param {number} season
   * @return {*}  {Promise<boolean>}
   * @memberof SeasonBonusPointsAdapter
   */
  async checkRegistered(address: Address, season: number): Promise<boolean> {
    log('checkRegistered for address', { address, season });

    if (!address) {
      throw new Error('Address not found');
    }

    const isRegistered = await readEventRegisterRegistrations(wagmiConfig, {
      args: [BigInt(mapSeasonToEventId(season)), address],
      chainId,
    });
    return isRegistered;
  }

  /**
   * Checks if the registration for the event is open
   * @param {number} eventId
   * @return {*}  {Promise<boolean>}
   * @memberof SeasonBonusPointsAdapter
   * */
  async checkRegistrationOpen(eventId: number): Promise<boolean> {
    log('checkRegistrationOpen for event', { eventId });

    const [id, name, exists, registrationOpen]: Event = await readEventRegisterEvents(wagmiConfig, {
      args: [BigInt(eventId)],
      chainId,
    });
    log('checkRegistrationOpen', { id, name, exists, registrationOpen });

    return registrationOpen;
  }
}
