
type UserTransaction = {
  activityName: string;
  points: number;
  date: Date;
}

export const MOCK_USER_TRANSACTIONS: UserTransaction[] = [
  {
    activityName: 'Daily Check-in',
    points: 10,
    date: new Date('2024-01-01'),
  },
  {
    activityName: 'Daily Check-in',
    points: 10,
    date: new Date('2024-01-02'),
  },
  {
    activityName: 'Daily Check-in',
    points: 10,
    date: new Date('2024-01-03'),
  },
  {
    activityName: 'Add Liquidity on Uniswap',
    points: 50,
    date: new Date('2024-01-03'),
  }
]
