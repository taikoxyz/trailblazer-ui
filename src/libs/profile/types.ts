export type UserProfile = {
  avatar: string;
  name: string;
  address: string;
  ens?: string;
  points: number;
  rank: string;
  experience: number;
  nextLevelExperience: number;
  rankPercentile: string;
  position: string;
  isLoading: boolean;
};

export type UserTransaction = {
  activityName: string;
  points: number;
  date: Date;
}
