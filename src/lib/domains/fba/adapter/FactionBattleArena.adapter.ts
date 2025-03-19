import { gql } from '@apollo/client/core';
import { readContract, writeContract } from '@wagmi/core';

import { factionBattleArenaAbi, factionBattleArenaAddress } from '$generated/abi';
import { Movements, Seasons } from '$lib/domains/profile/types/types';
import { fbaSubgraphClient } from '$shared/services/graphql/client';
import type { NFT } from '$shared/types/NFT';
import { chainId } from '$shared/utils/chain';
import { getLogger } from '$shared/utils/logger';
import getMockBadge from '$shared/utils/nfts/getMockBadge';
import { wagmiConfig } from '$shared/wagmi';

import type { League, LeagueParticipant } from '../types';

const log = getLogger('FactionBattleArenaAdapter');

export default class FactionBattleArenaAdapter {
  // tmp dev-room method
  async _executeLeagueAndStartNext(seed: number): Promise<void> {
    log('Executing league and starting next');

    await writeContract(wagmiConfig, {
      abi: factionBattleArenaAbi,
      address: factionBattleArenaAddress[chainId],
      functionName: 'executeLeagueAndStartNext',
      args: [BigInt(seed)],
      chainId,
    });
  }

  async fetchLeagueIds(): Promise<number[]> {
    log('Fetching league ids');
    return [];
  }

  async getCurrentLeagueId(): Promise<number> {
    log('Fetching current league id');
    const id = await readContract(wagmiConfig, {
      abi: factionBattleArenaAbi,
      address: factionBattleArenaAddress[chainId],
      functionName: 'currentLeagueId',
      chainId,
    });
    return Number(id);
  }

  async registerParticipant(badgeSeason: number, badgeId: number, tokenId: number): Promise<void> {
    log('Registering participant', { badgeSeason, badgeId, tokenId });
    try {
      await writeContract(wagmiConfig, {
        abi: factionBattleArenaAbi,
        address: factionBattleArenaAddress[chainId],
        functionName: 'registerParticipant',
        args: [BigInt(badgeSeason), BigInt(badgeId), BigInt(tokenId)],
        chainId,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getLeagueParticipants(leagueId: number): Promise<void> {
    log('Fetching league participants', { leagueId });
    await fbaSubgraphClient.query({
      query: gql`
        query GetParticipantsByLeague($leagueId: BigInt!) {
          participants(where: { leagueId: $leagueId }) {
            id
            leagueId
            owner {
              id
            }
            token {
              id
            }
          }
        }
      `,
      variables: { leagueId: leagueId },
    });
  }

  async getLeague(leagueId: number): Promise<League> {
    log('Fetching league', { leagueId });

    const [openTime, executeTime, seed] = await readContract(wagmiConfig, {
      abi: factionBattleArenaAbi,
      address: factionBattleArenaAddress[chainId],
      functionName: 'leagues',
      args: [BigInt(leagueId)],
      chainId,
    });

    return {
      id: leagueId,
      openTime: new Date(Number(openTime) * 1000),
      executeTime: new Date(Number(executeTime) * 1000),
      seed: Number(seed),
    };
  }

  async getMockLeague(player: NFT): Promise<LeagueParticipant[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const badges = [] as any[];

    for (let i = 0; i < 15; i++) {
      const season = Math.random() > 0.5 ? Seasons.Season1 : Seasons.Season2;
      const badgeId = Math.floor(Math.random() * 8);
      const faction =
        season === Seasons.Season1 ? Movements.Dev : Math.random() > 0.5 ? Movements.Minnow : Movements.Whale;
      badges.push(getMockBadge(season, badgeId, faction));
    }

    const participants = [
      ...badges.map((b, i) => {
        return {
          movement: b.metadata.movement as Movements,
          tokenId: 1001 + i,
          badgeId: b.metadata.badgeId as number,
          tokenUri: b.metadata.image,
        };
      }),
      // player
      {
        movement: player.metadata.movement as Movements,
        tokenId: player.tokenId,
        badgeId: player.metadata.badgeId as number,
        tokenUri: player.metadata.image,
      },
    ];

    const seed = Date.now();

    const getWinner = (p1: LeagueParticipant, p2: LeagueParticipant): number => {
      const rules: Record<Movements, Movements> = {
        [Movements.Minnow]: Movements.Whale,
        [Movements.Whale]: Movements.Dev,
        [Movements.Dev]: Movements.Minnow,
      };
      if (p1.movement === p2.movement) return 0;
      return rules[p1.movement] === p2.movement ? 1 : -1;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const players = participants.map((p) => ({ ...p, points: 0 })) as any[];
    let currentSeed = seed;

    // Assign a match to skip for each player based on the seed
    const skips = new Map<string, number>();
    for (let i = 0; i < players.length; i++) {
      skips.set(players[i].id, (Math.abs(Math.sin(currentSeed++)) * 10000) % players.length | 0);
    }

    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        if (skips.get(players[i].id) === j || skips.get(players[j].id) === i) continue;

        const p1 = players[i];
        const p2 = players[j];
        const result = getWinner(p1, p2);

        if (result === 1) {
          p1.points! += 3;
        } else if (result === -1) {
          p2.points! += 3;
        } else {
          p1.points! += 1;
          p2.points! += 1;
        }
      }
    }

    // Resolve ties deterministically using the seed and match results
    players.sort((a, b) => b.points! - a.points!);
    let tieBreakerSeed = seed;

    for (let i = 0; i < players.length - 1; i++) {
      if (players[i].points === players[i + 1].points) {
        const result = getWinner(players[i], players[i + 1]);
        if (result === 1) {
          players[i].points! += 1;
        } else if (result === -1) {
          players[i + 1].points! += 1;
        } else {
          // If they tie again, use seed-based tiebreaker
          if (
            Math.abs(Math.sin(tieBreakerSeed++ + parseInt(players[i].id))) * 10000 >
            Math.abs(Math.sin(tieBreakerSeed++ + parseInt(players[i + 1].id))) * 10000
          ) {
            players[i].points! += 1;
          } else {
            players[i + 1].points! += 1;
          }
        }
        // Re-sort after modifying points
        players.sort((a, b) => b.points! - a.points!);
        i = -1; // Restart checking for ties
      }
    }
    return players;
  }
}
