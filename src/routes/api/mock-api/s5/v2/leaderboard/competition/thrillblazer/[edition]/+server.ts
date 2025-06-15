import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const page = Number(url.searchParams.get('page')) || 0;
  const size = Number(url.searchParams.get('size')) || 20;

  // Calculate pagination
  const startIndex = page * size;
  const endIndex = startIndex + size;
  const paginatedItems = mockData.items.slice(startIndex, endIndex);

  const response = {
    data: {
      items: paginatedItems,
      page: page,
      size: size,
      total: mockData.total,
      total_pages: Math.ceil(mockData.total / size),
      last: endIndex >= mockData.total,
      first: page === 0,
      visible: paginatedItems.length,
    },
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const mockData = {
  items: [
    {
      address: 'Mock Address 1',
      slug: 'mock-slug1',
      score: 12345.678,
      rank: 1,
      name: 'Mock Dapp 1',
    },
    {
      address: 'Mock Address 2',
      slug: 'mock-slug2',
      score: 23456.789,
      rank: 2,
      name: 'Mock Dapp 2',
    },
    {
      address: 'Mock Address 3',
      slug: 'mock-slug3',
      score: 34567.89,
      rank: 3,
      name: 'Mock Dapp 3',
    },
    {
      address: 'Mock Address 4',
      slug: 'mock-slug4',
      score: 45678.901,
      rank: 4,
      name: 'Mock Dapp 4',
    },
    {
      address: 'Mock Address 5',
      slug: 'mock-slug1',
      score: 56789.012,
      rank: 5,
      name: 'Mock Dapp 5',
    },
    {
      address: 'Mock Address 6',
      slug: 'mock-slug2',
      score: 67890.123,
      rank: 6,
      name: 'Mock Dapp 6',
    },
    {
      address: 'Mock Address 7',
      slug: 'mock-slug3',
      score: 78901.234,
      rank: 7,
      name: 'Mock Dapp 7',
    },
    {
      address: 'Mock Address 8',
      slug: 'mock-slug4',
      score: 89012.345,
      rank: 8,
      name: 'Mock Dapp 8',
    },
    {
      address: 'Mock Address 9',
      slug: 'mock-slug1',
      score: 90123.456,
      rank: 9,
      name: 'Mock Dapp 9',
    },
    {
      address: 'Mock Address 10',
      slug: 'mock-slug2',
      score: 10123.567,
      rank: 10,
      name: 'Mock Dapp 10',
    },
    {
      address: 'Mock Address 11',
      slug: 'mock-slug3',
      score: 11234.678,
      rank: 11,
      name: 'Mock Dapp 11',
    },
    {
      address: 'Mock Address 12',
      slug: 'mock-slug4',
      score: 12345.789,
      rank: 12,
      name: 'Mock Dapp 12',
    },
    {
      address: 'Mock Address 13',
      slug: 'mock-slug1',
      score: 13456.89,
      rank: 13,
      name: 'Mock Dapp 13',
    },
    {
      address: 'Mock Address 14',
      slug: 'mock-slug2',
      score: 14567.901,
      rank: 14,
      name: 'Mock Dapp 14',
    },
    {
      address: 'Mock Address 15',
      slug: 'mock-slug3',
      score: 15678.012,
      rank: 15,
      name: 'Mock Dapp 15',
    },
    {
      address: 'Mock Address 16',
      slug: 'mock-slug4',
      score: 16789.123,
      rank: 16,
      name: 'Mock Dapp 16',
    },
    {
      address: 'Mock Address 17',
      slug: 'mock-slug1',
      score: 17890.234,
      rank: 17,
      name: 'Mock Dapp 17',
    },
    {
      address: 'Mock Address 18',
      slug: 'mock-slug2',
      score: 18901.345,
      rank: 18,
      name: 'Mock Dapp 18',
    },
    {
      address: 'Mock Address 19',
      slug: 'mock-slug3',
      score: 19012.456,
      rank: 19,
      name: 'Mock Dapp 19',
    },
    {
      address: 'Mock Address 20',
      slug: 'mock-slug4',
      score: 20123.567,
      rank: 20,
      name: 'Mock Dapp 20',
    },
    {
      address: 'Mock Address 21',
      slug: 'mock-slug1',
      score: 21234.678,
      rank: 21,
      name: 'Mock Dapp 21',
    },
    {
      address: 'Mock Address 22',
      slug: 'mock-slug2',
      score: 22345.789,
      rank: 22,
      name: 'Mock Dapp 22',
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
