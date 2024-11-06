<script lang="ts">
  // import { classNames } from '$shared/utils/classNames';
  import Card from '../Card/Card.svelte';
  import type { CampaignCardType } from './types';

  const cards: CampaignCardType[] = [
    {
      title: 'Taiko x Robinos',
      text: 'Gain bonus points for correct predictions on select events with Robinos.',
      btn: {
        text: 'Learn more',
        external: true,
        destination: 'https://robinos.finance/',
      },
      images: {
        sm: '/campaign/cards/sm/robinos.png',
        md: '/campaign/cards/md/robinos.png',
        lg: '/campaign/cards/lg/robinos.png',
        xl: '/campaign/cards/xl/robinos.png',
      },
    },
    {
      title: 'Thrillblazers',
      text: 'Prize pool 140K TAIKO tokens for all gaming and sociafi dapps!',
      btn: {
        text: 'Start now',
        external: false,
        destination: 'competitions/s2/dapps',
      },
      images: {
        sm: '/campaign/cards/sm/thrillblazers.png',
        md: '/campaign/cards/md/thrillblazers.png',
        lg: '/campaign/cards/lg/thrillblazers.png',
        xl: '/campaign/cards/xl/thrillblazers.png',
      },
    },
    {
      title: 'Liquidity Royale',
      text: 'Taiko Edition, Battle for Liquidity: Taiko Rewards Race, Taiko TVL Rush',
      btn: {
        text: 'Earn now',
        external: false,
        destination: 'competitions/s2/liquidity',
      },
      images: {
        sm: '/campaign/cards/sm/liquidity-royale.png',
        md: '/campaign/cards/md/liquidity-royale.png',
        lg: '/campaign/cards/lg/liquidity-royale.png',
        xl: '/campaign/cards/xl/liquidity-royale.png',
      },
    },
  ];
</script>

<div class="grid gap-6 w-full grid-cols-1 lg:grid-cols-3">
  {#each cards as card}
    <Card content={card} class="w-full h-full" />
  {/each}
</div>
