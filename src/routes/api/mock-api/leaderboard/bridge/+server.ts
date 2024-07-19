import type { RequestHandler } from '@sveltejs/kit';

const mockData = {
  bridgingEntries: [
    {
      name: 'Rhino',
      volume: 149675879.41645825,
      scores: [
        { token: '0x07d83526730c7438048d55a4fc0b850e2aab6f0b', score: 20230848.741956 },
        { token: '0x2def195713cf4a606b49d07e520e22c17899a736', score: 2820146.159068 },
        { token: '0x0000000000000000000000000000000000000000', score: 35963.46364473 },
      ],
    },
    {
      name: 'Zebra',
      volume: 98765432.12345678,
      scores: [
        { token: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef', score: 10203040.56789 },
        { token: '0x1234567890123456789012345678901234567890', score: 20406080.12345 },
        { token: '0x0000000000000000000000000000000000000001', score: 506070.8901234 },
      ],
    },
    {
      name: 'Elephant',
      volume: 123456789.9876543,
      scores: [
        { token: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef', score: 56789012.345678 },
        { token: '0x1234567890123456789012345678901234567890', score: 98765432.123456 },
        { token: '0x0000000000000000000000000000000000000002', score: 345678.1234567 },
      ],
    },
  ],
};

export const GET: RequestHandler = async () => {
  return new Response(JSON.stringify(mockData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
