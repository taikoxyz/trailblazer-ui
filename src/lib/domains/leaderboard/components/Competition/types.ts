export type Prize = {
  image: string;
  amount: string;
};

export type CompetitionInfo = {
  title: string;
  description: string;
  prizeTitle: string;
  prizeSubtitle: string;
  prizes: Prize[];
};
