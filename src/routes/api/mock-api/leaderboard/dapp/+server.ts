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
      address: 'Mock Address 1',
      slug: 'mock-slug1',
      score: 12345.678,
    },
    {
      address: 'Mock Address 2',
      slug: 'mock-slug2',
      score: 23456.789,
    },
    {
      address: 'Mock Address 3',
      slug: 'mock-slug3',
      score: 34567.89,
    },
    {
      address: 'Mock Address 4',
      slug: 'mock-slug4',
      score: 45678.901,
    },
    {
      address: 'Mock Address 5',
      slug: 'mock-slug1',
      score: 56789.012,
    },
    {
      address: 'Mock Address 6',
      slug: 'mock-slug2',
      score: 67890.123,
    },
    {
      address: 'Mock Address 7',
      slug: 'mock-slug3',
      score: 78901.234,
    },
    {
      address: 'Mock Address 8',
      slug: 'mock-slug4',
      score: 89012.345,
    },
    {
      address: 'Mock Address 9',
      slug: 'mock-slug1',
      score: 90123.456,
    },
    {
      address: 'Mock Address 10',
      slug: 'mock-slug2',
      score: 10123.567,
    },
    {
      address: 'Mock Address 11',
      slug: 'mock-slug3',
      score: 11234.678,
    },
    {
      address: 'Mock Address 12',
      slug: 'mock-slug4',
      score: 12345.789,
    },
    {
      address: 'Mock Address 13',
      slug: 'mock-slug1',
      score: 13456.89,
    },
    {
      address: 'Mock Address 14',
      slug: 'mock-slug2',
      score: 14567.901,
    },
    {
      address: 'Mock Address 15',
      slug: 'mock-slug3',
      score: 15678.012,
    },
    {
      address: 'Mock Address 16',
      slug: 'mock-slug4',
      score: 16789.123,
    },
    {
      address: 'Mock Address 17',
      slug: 'mock-slug1',
      score: 17890.234,
    },
    {
      address: 'Mock Address 18',
      slug: 'mock-slug2',
      score: 18901.345,
    },
    {
      address: 'Mock Address 19',
      slug: 'mock-slug3',
      score: 19012.456,
    },
    {
      address: 'Mock Address 20',
      slug: 'mock-slug4',
      score: 20123.567,
    },
    {
      address: 'Mock Address 21',
      slug: 'mock-slug1',
      score: 21234.678,
    },
    {
      address: 'Mock Address 22',
      slug: 'mock-slug2',
      score: 22345.789,
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
