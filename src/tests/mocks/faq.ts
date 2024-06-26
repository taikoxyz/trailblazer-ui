type FAQType = {
  question: string;
  answer: string;
};
export const MOCK_FAQS: FAQType[] = [
  {
    question: 'How long does a season last?',
    answer: 'Each season lasts about 12 weeks.',
  },
  {
    question: 'When does the daily cap reset?',
    answer: 'The daily cap resets at 00:00 UTC every day.',
  },
  {
    question: 'Why am I not whitelisted to mint a badge?',
    answer:
      'Whitelisting criteria are based on specific activities or qualifications. Ensure you have met all the requirements and participated in the necessary events.',
  },
  {
    question: 'How do the Faction badge multipliers work?',
    answer:
      'Each faction badge gives a 1.1x booster multiplier. Snaefel NFT holders get a 1.1x points boost, and Taikoons holders get a 2x points boost. If you sell your Faction badge(s) before the end of the season, you will lose the accumulated multiplied Experience Points by the number of Faction badges sold or moved from your wallet. For example, if you’ve collected 8 badges, you have a 2.14x multiplier, but if you sell one, you will have a 1.95x XP multiplier. These multipliers will last for the entire Trailblazer program duration.',
  },
  {
    question: 'What Dapps will I get points for?',
    answer:
      'Points can be earned through interactions with designated decentralized applications (Dapps). The list of eligible Dapps will be provided in the campaign guidelines.',
  },
  {
    question: 'How is the daily reset calculated? Is it 24 hours from hitting the cap?',
    answer:
      'The daily reset is calculated based on a fixed reset time at 00:00 UTC each day, not from the time you hit the cap.',
  },
  {
    question: 'Do we count L2 bridging, such as from Linea to Taiko, for points?',
    answer:
      'Yes, L2 bridging activities are included in the point calculation. Ensure you follow the specific instructions provided.',
  },
  {
    question: 'What tokens do I get Transaction Value points for?',
    answer: 'Transaction Value points can be earned for transactions involving USDC, WETH, TAIKO, and USDT.',
  },
  {
    question: 'Why are my Galaxe points not showing on Trailblazers?',
    answer:
      'There could be a delay in syncing points from Galaxe to Trailblazers. Ensure you have linked your accounts correctly and wait for the synchronization process to complete.',
  },
];
