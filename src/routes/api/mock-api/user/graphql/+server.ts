import { json } from '@sveltejs/kit';

export function GET({ url }) {
  const address = url.searchParams.get('address');

  return json({
    data: {
      owner: {
        __typename: 'Owner',
        id: address?.toLowerCase() || '',
        totalMultiplier: '1310',
        factionMultiplier: '210',
        snaefellMultiplier: '100',
        taikoonMultiplier: '1000',
        ownedTokens: [
          {
            __typename: 'Token',
            contract: {
              __typename: 'Contract',
              name: 'Taikoon',
            },
            id: '0x4a045c5016b200f7e08a4cabb2cda6e85bf53295-0x19e',
            tokenId: '1',
            badgeId: null,
            uri: 'bafybeierqzehlrqeqqeb6fwmil4dj3ij2p6exgoj4lysl53fsxwob6wbdy/414.json',
          },
          {
            __typename: 'Token',
            contract: {
              __typename: 'Contract',
              name: 'Trailblazers Badges',
            },
            id: '0xa20a8856e00f5ad024a55a663f06dcc419ffc4d5-0x15ac2',
            tokenId: '1',
            badgeId: '1',
            uri: 'https://nftstorage.link/ipfs/bafybeibotygy2h3nv3dfpofi4ymhs55bg3rqksyte3dqvf32ba42elludm/0/1',
          },
          {
            __typename: 'Token',
            contract: {
              __typename: 'Contract',
              name: 'Trailblazers Badges',
            },
            id: '0xa20a8856e00f5ad024a55a663f06dcc419ffc4d5-0x738d8',
            tokenId: '2',
            badgeId: '3',
            uri: 'https://taikonfts.4everland.link/ipfs/bafybeih72vvr554zq6zyvzy2bjh3q47sltys236wfwc4foioyyv2rwmbaq/0/3',
          },
        ],
      },
    },
    loading: false,
    networkStatus: 7,
  });
}
