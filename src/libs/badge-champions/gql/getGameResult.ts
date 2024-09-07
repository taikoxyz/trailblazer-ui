import { gql } from '@apollo/client/core';
import type { Address } from 'viem';

import { badgesSubGraph } from '$libs/badges/badgesSubGraph';

import type {
  IBadgeChampionsGameResult,
  IBadgeChampionsMatch,
  IBadgeChampionsMatchParticipant,
  IBadgeChampionsParticipant,
} from '../types';

const ColorIds: ('neutral' | 'pink' | 'purple')[] = ['neutral', 'pink', 'purple'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseGameResults(data: any): IBadgeChampionsGameResult {
  const gameId = 0;
  const seed = 0;
  const participants: IBadgeChampionsParticipant[] = [];
  const rounds = [];

  const rawParticipants = data.participants;
  const rawRounds = data.rounds;

  for (const rawParticipant of rawParticipants) {
    const champion: IBadgeChampionsParticipant = {
      id: rawParticipant.id,
      contract: rawParticipant.contract,
      tokenId: parseInt(rawParticipant.tokenId),
      leagueId: gameId,
      owner: rawParticipant.owner as Address,
      color: ColorIds[parseInt(rawParticipant.color)],
      power: parseInt(rawParticipant.power),
      points: parseInt(rawParticipant.points),
      badgeId: parseInt(rawParticipant.badgeId),
    };

    participants.push(champion);
  }

  for (const round of rawRounds) {
    const _round: IBadgeChampionsMatch[] = [];
    for (const match of round.matches) {
      const _match: IBadgeChampionsMatch = {
        id: match.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        participants: match.participants.map((p: any) => {
          const battler = participants.find(
            (participant) => participant.id === p.battler.id,
          ) as IBadgeChampionsParticipant;
          return {
            id: p.id,
            battler,
            power: parseInt(p.power),
            energy: parseInt(p.energy),
            totalPower: parseInt(p.totalPower),
            points: parseInt(p.points),
            isWinner: p.isWinner,
            owner: battler.owner,
          } as IBadgeChampionsMatchParticipant;
        }),
      };
      _round.push(_match);
    }
    rounds.push(_round);
  }

  return {
    gameId,
    seed,
    participants,
    rounds,
  } satisfies IBadgeChampionsGameResult;
}

export default async function getGameResults(gameId: number): Promise<IBadgeChampionsGameResult | undefined> {
  try {
    const query = gql`
      query getLeague($leagueId: String) {
        league(id: $leagueId) {
          id
          seed
          participants {
            id
            contract
            tokenId
            color
            power
            points
            badgeId
            owner
          }
          rounds {
            id
            matches {
              id
              participants {
                id
                battler {
                  id
                }
                power
                energy
                totalPower
                points
                isWinner
                owner
              }
            }
          }
        }
      }
    `;

    const result = await badgesSubGraph.query({
      query,
      variables: { leagueId: gameId.toString() },
    });

    if (!result || !result.data || !result.data.league) {
      throw new Error(`League with id ${gameId} not found`);
    }

    const { league } = result.data;

    return parseGameResults(league);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e);
  }
}
