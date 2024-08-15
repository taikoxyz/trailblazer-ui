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
  items: [
    {
      address: '0x6083Be355502C4a60aB8972139cdbA4b56c15047',
      score: 14109992.272613646,
    },
    {
      address: '0x8Be4491cED884D5C6B1667bD4E20B975E079A469',
      score: 14048108.47346626,
    },
    {
      address: '0x446Fc8566374ee80AE577B87C7FbFfc8A78a0550',
      score: 13740715.063007288,
    },
    {
      address: '0x8FA7103A0Ed59B6Bf8EDEb6CBaDdD6909575Aa0E',
      score: 13611922.411377186,
    },
    {
      address: '0xB3b076F5Bc00e9CF7c2391Bee104417176077708',
      score: 13534870.514879407,
    },
    {
      address: '0x7c43716D46134e56B02Ae35787c12e49680044A4',
      score: 13481106.512251515,
    },
    {
      address: '0x61c4aEAb010a6E0FB2A0832c2C6714ba0E2A608A',
      score: 13355106.92011155,
    },
    {
      address: '0x4A3Ebad57E1408DD54483EB801DE55a9c70c86A4',
      score: 13346905.291566284,
    },
    {
      address: '0xaAb4eafFd2114422c93E3fBbC548985C94B30897',
      score: 13265125.876397766,
    },
    {
      address: '0x064cB0bB4c8ABE11935134aEE670C032D6833556',
      score: 13241528.128729703,
    },
    {
      address: '0x4AAf7EB539a2ef42df9E39f72b1e0ab76B42d2E1',
      score: 13227242.869741034,
    },
    {
      address: '0x1234C7506e84335c0e5761a7a6Ff368cdD94CA37',
      score: 13186976.613697475,
    },
    {
      address: '0x8Ba774536D20aCcEdF94492B6197337A35C743F6',
      score: 13166036.566707943,
    },
    {
      address: '0x438f57868F7499054F392A8676ceB8dBEeD6D433',
      score: 13144203.906764705,
    },
    {
      address: '0x079240790323a62cc151aD39c4EC5c95d6eF8467',
      score: 13142629.754838046,
    },
    {
      address: '0xAd306172A362EA30246ade8E46158FC4710D4798',
      score: 13119469.517474119,
    },
    {
      address: '0xcf30136677295ecc6d3eebe3F43c1d16aC5dfe15',
      score: 13118480.412907345,
    },
    {
      address: '0x77B4922Fcc0Fa745Bcd7d76025E682CFfFc9a149',
      score: 13099165.329263076,
    },
    {
      address: '0xf9B2E1f237e60205585CcD1339D335bCdfF5cB97',
      score: 13099133.922876334,
    },
    {
      address: '0xd8C860D789Ec1c6aE9631B680E6555F25Bc28331',
      score: 13083215.612816127,
    },
  ],
  page: 0,
  size: 20,
  max_page: 36261,
  total_pages: 36262,
  total: 725234,
  last: false,
  first: true,
  visible: 20,
  lastUpdated: 1,
};
