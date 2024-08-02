import { json } from '@sveltejs/kit';

type APIResponse<T> = {
  items: T[];
  page: number;
  size: number;
  max_page: number;
  total_pages: number;
  total: number;
  last: boolean;
  first: boolean;
  visible: number;
};

type TransactionHistoryItem = {
  address: string;
  points: number;
  event: string;
  date: number;
};

export function GET({ url }) {
  const address = url.searchParams.get('address');
  if (!address) throw new Error('address is required');

  return json({
    items: [
      {
        address: address,
        points: 0,
        event: 'TransactionValue',
        date: 1721642099,
      },
      {
        address: address,
        points: 0,
        event: 'Transaction',
        date: 1721642099,
      },
      {
        address: address,
        points: 0,
        event: 'Bridged',
        date: 1721642039,
      },
      {
        address: address,
        points: 0,
        event: 'BlockProposed',
        date: 1721642039,
      },
      {
        address: address,
        points: 1,
        event: 'Transaction',
        date: 1721641979,
      },
      {
        address: address,
        points: 1234,
        event: 'Transaction',
        date: 1721641943,
      },
      {
        address: address,
        points: 12345678,
        event: 'Transaction',
        date: 1721641907,
      },
      {
        address: address,
        points: 123456789,
        event: 'Bridged',
        date: 1721571479,
      },
      {
        address: address,
        points: 123456789,
        event: 'Transaction',
        date: 1721571431,
      },
      {
        address: address,
        points: 123456789,
        event: 'TransactionValue',
        date: 1721571431,
      },
      {
        address: address,
        points: 1234567890,
        event: 'Transaction',
        date: 1721571263,
      },
      {
        address: address,
        points: 123.456789,
        event: 'TransactionValue',
        date: 1721571263,
      },
      {
        address: address,
        points: 1.23456789,
        event: 'Transaction',
        date: 1721571155,
      },
    ],
    page: 0,
    size: 20,
    max_page: 3,
    total_pages: 4,
    total: 64,
    last: false,
    first: true,
    visible: 20,
  } satisfies APIResponse<TransactionHistoryItem>);
}
