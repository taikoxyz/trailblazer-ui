import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  return new Response(JSON.stringify(mockData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const mockData = {
  data: {
    items: [
      {
        address: '0x6083Be355502C4a60aB8972139cdbA4b56c15047',
        score: 14925894.987004124,
      },
      {
        address: '0x8Be4491cED884D5C6B1667bD4E20B975E079A469',
        score: 14710344.577527996,
      },
      {
        address: '0x446Fc8566374ee80AE577B87C7FbFfc8A78a0550',
        score: 14521447.222730288,
      },
      {
        address: '0x8FA7103A0Ed59B6Bf8EDEb6CBaDdD6909575Aa0E',
        score: 14494897.569322461,
      },
      {
        address: '0xB3b076F5Bc00e9CF7c2391Bee104417176077708',
        score: 14387011.022183433,
      },
      {
        address: '0x7c43716D46134e56B02Ae35787c12e49680044A4',
        score: 14364055.963148046,
      },
      {
        address: '0x61c4aEAb010a6E0FB2A0832c2C6714ba0E2A608A',
        score: 14238168.65841912,
      },
      {
        address: '0x4A3Ebad57E1408DD54483EB801DE55a9c70c86A4',
        score: 14229853.318081351,
      },
      {
        address: '0xaAb4eafFd2114422c93E3fBbC548985C94B30897',
        score: 14148985.283796892,
      },
      {
        address: '0x064cB0bB4c8ABE11935134aEE670C032D6833556',
        score: 14136639.87378152,
      },
      {
        address: '0x4AAf7EB539a2ef42df9E39f72b1e0ab76B42d2E1',
        score: 14110221.758876389,
      },
      {
        address: '0x8Ba774536D20aCcEdF94492B6197337A35C743F6',
        score: 14049188.607093943,
      },
      {
        address: '0x1234C7506e84335c0e5761a7a6Ff368cdD94CA37',
        score: 14042501.1762425,
      },
      {
        address: '0x079240790323a62cc151aD39c4EC5c95d6eF8467',
        score: 14035331.25868919,
      },
      {
        address: '0x438f57868F7499054F392A8676ceB8dBEeD6D433',
        score: 14027158.678825753,
      },
      {
        address: '0xcf30136677295ecc6d3eebe3F43c1d16aC5dfe15',
        score: 14001448.008159276,
      },
      {
        address: '0xf9B2E1f237e60205585CcD1339D335bCdfF5cB97',
        score: 13982075.076911682,
      },
      {
        address: '0x7204dA7b2fc2278E08702459d1d9Aa56A2E9385e',
        score: 13961269.589855224,
      },
      {
        address: '0x25A04Bc7379FAAbc0bE0421DA74191ea51713c8c',
        score: 13948648.735392606,
      },
      {
        address: '0xa6A4EC0f671B37ac51ad6ce7972d1fd81F3CDa75',
        score: 13936250.491539374,
      },
    ],
    page: 0,
    size: 20,
    max_page: 39031,
    total_pages: 39032,
    total: 780626,
    last: false,
    first: true,
    visible: 20,
  },
  lastUpdated: 1724040243,
};
