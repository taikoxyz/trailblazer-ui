import { gql } from '@apollo/client/core';
import type { Address } from 'viem';

import { badgesSubGraph } from '../badgesSubGraph';
import { getTokenId } from '../getTokenId';

export default async function isApprovedToMigrate(address: Address, badgeId: number): Promise<boolean> {
  try {
    const query = gql`
      query IsApproved($address: String) {
        account(id: $address) {
          approvedForAll
          approvedS1Tokens {
            id
          }
        }
      }
    `;

    const result = await badgesSubGraph.query({
      query,
      variables: { address: address.toLocaleLowerCase() },
    });

    if (!result.data.account) {
      return false;
    }

    const { approvedForAll, approvedS1Tokens } = result.data.account;

    if (approvedForAll) {
      return true;
    }
    const tokenId = await getTokenId(address, badgeId);
    for (const token of approvedS1Tokens) {
      if (parseInt(token.id) === tokenId) {
        return true;
      }
    }

    return false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.message === 'result.data.account is null') {
      // account does not exist, skip
      return false;
    }

    throw e;
  }
}
