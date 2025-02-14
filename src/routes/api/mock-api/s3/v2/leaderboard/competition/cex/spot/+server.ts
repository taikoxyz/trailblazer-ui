import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const now = new Date();
  return new Response(JSON.stringify({ data: mockData, lastUpdated: now.getTime() }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const mockData = {
  items: [
    {
      name: 'HTX',
      score: 100,
      rank: 1,
    },
    {
      name: 'Upbit',
      score: 97.67441860465115,
      rank: 2,
    },
    {
      name: 'Bitget',
      score: 95.34883720930233,
      rank: 3,
    },
    {
      name: 'Bybit',
      score: 93.02325581395348,
      rank: 4,
    },
    {
      name: 'BitMart',
      score: 90.69767441860466,
      rank: 5,
    },
    {
      name: 'Bitrue',
      score: 88.37209302325581,
      rank: 6,
    },
    {
      name: 'BiKing',
      score: 86.04651162790698,
      rank: 7,
    },
    {
      name: 'Gate.io',
      score: 83.72093023255813,
      rank: 8,
    },
    {
      name: 'Hotcoin',
      score: 81.3953488372093,
      rank: 9,
    },
    {
      name: 'OrangeX',
      score: 79.06976744186046,
      rank: 10,
    },
    {
      name: 'CoinW',
      score: 76.74418604651163,
      rank: 11,
    },
    {
      name: 'LBank',
      score: 74.4186046511628,
      rank: 12,
    },
    {
      name: 'SuperEx',
      score: 72.09302325581395,
      rank: 13,
    },
    {
      name: 'GroveX',
      score: 69.76744186046511,
      rank: 14,
    },
    {
      name: 'AscendEX (BitMax)',
      score: 67.44186046511628,
      rank: 15,
    },
    {
      name: 'KuCoin',
      score: 65.11627906976744,
      rank: 16,
    },
    {
      name: 'Bithumb',
      score: 62.7906976744186,
      rank: 17,
    },
    {
      name: 'Zedxion Exchange',
      score: 60.46511627906976,
      rank: 18,
    },
    {
      name: 'ZKE',
      score: 58.13953488372092,
      rank: 19,
    },
    {
      name: 'TNNS PROX',
      score: 55.81395348837209,
      rank: 20,
    },
    {
      name: 'SpireX',
      score: 53.48837209302326,
      rank: 21,
    },
    {
      name: 'Koinbay',
      score: 51.162790697674424,
      rank: 22,
    },
    {
      name: 'B2Z Exchange',
      score: 48.837209302325576,
      rank: 23,
    },
    {
      name: 'BITmarkets',
      score: 46.51162790697675,
      rank: 24,
    },
    {
      name: 'BingX',
      score: 44.18604651162791,
      rank: 25,
    },
    {
      name: 'Tapbit',
      score: 41.860465116279066,
      rank: 26,
    },
    {
      name: 'BTSE',
      score: 39.53488372093024,
      rank: 27,
    },
    {
      name: 'BloFin',
      score: 37.2093023255814,
      rank: 28,
    },
    {
      name: 'BitKan',
      score: 34.883720930232556,
      rank: 29,
    },
    {
      name: 'Phemex',
      score: 32.55813953488372,
      rank: 30,
    },
    {
      name: 'Slex Exchange',
      score: 30.23255813953488,
      rank: 31,
    },
    {
      name: 'TGEX',
      score: 27.906976744186053,
      rank: 32,
    },
    {
      name: 'Crypto.com Exchange',
      score: 25.581395348837212,
      rank: 33,
    },
    {
      name: 'Hibt',
      score: 23.25581395348837,
      rank: 34,
    },
    {
      name: 'CoinEx',
      score: 20.93023255813954,
      rank: 35,
    },
    {
      name: 'TRIV',
      score: 18.6046511627907,
      rank: 36,
    },
    {
      name: 'Bitvavo',
      score: 16.279069767441857,
      rank: 37,
    },
    {
      name: 'MEXC',
      score: 13.953488372093027,
      rank: 38,
    },
    {
      name: 'Korbit',
      score: 11.627906976744185,
      rank: 39,
    },
    {
      name: 'Coinone',
      score: 9.302325581395355,
      rank: 40,
    },
    {
      name: 'WEEX',
      score: 6.976744186046513,
      rank: 41,
    },
    {
      name: 'Indodax',
      score: 4.651162790697672,
      rank: 42,
    },
    {
      name: 'NovaDAX',
      score: 2.3255813953488413,
      rank: 43,
    },
  ],
  page: 0,
  size: 100,
  max_page: 4,
  total_pages: 5,
  total: 22,
  last: false,
  first: true,
  visible: 22,
};
