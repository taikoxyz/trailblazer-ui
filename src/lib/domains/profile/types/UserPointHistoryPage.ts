import type { Address } from 'viem';

export type UserPointHistoryPage = {
  items: UserPointHistory[];
  page: number;
  size: number;
  max_page: number;
  total_pages: number;
  total: number;
  last: number;
  first: number;
  visible: number;
};

export type UserPointHistory = {
  address: Address;
  event: Event;
  points: number;
  date: number;
  multiplier: number;
};
