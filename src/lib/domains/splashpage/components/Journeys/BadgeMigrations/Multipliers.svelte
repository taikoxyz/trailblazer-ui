<script lang="ts">
  import ContentBox from './ContentBox.svelte';
  import Note from './Note.svelte';

  const multipliers = [
    {
      title: 'Snaefell Multiplier',
      description: '= 0.1 (unchanged from S1)',
      iconPath: '/multipliers/snaefell.svg',
    },
    {
      title: 'Taikoon Multiplier',
      description: '= +1x (unchanged from S1)',
      iconPath: '/multipliers/taikoon.svg',
    },
    {
      title: 'Devs Global Multiplier',
      description: '= 0.05 * Num of Dev NFTs (max 1.4x)',
      iconPath: '/multipliers/devs_global.svg',
    },
    {
      title: 'Minnows Multiplier',
      description: '= 0.05 * Num of Minnow NFTs (max 1.4x)',
      iconPath: '/multipliers/minnows.svg',
    },
    {
      title: 'Whales Multiplier',
      description: '= 0.05 * Num of Whale NFTs (max 1.4x)',
      iconPath: '/multipliers/whales.svg',
    },
    {
      title: 'Global Multiplier',
      description: '= 1 + Devs Global Multiplier + Snaefell Multiplier + Taikoon Multiplier (new max 2.5x)',
      iconPath: '/multipliers/global.svg',
    },
    {
      title: 'Transaction Points',
      description: '= Base Tx Points * Minnows Multiplier',
      iconPath: '/multipliers/tx_points.svg',
    },
    {
      title: 'Transaction Value Points',
      description: '= Base Tx Value Points * Whales Multiplier',
      iconPath: '/multipliers/tx_value.svg',
    },
    {
      title: 'Base Points',
      description: '= Transaction Points + Transaction Value Points + Proposer points',
      iconPath: '/multipliers/base.svg',
    },
    {
      title: 'Season Points',
      description: '= Base Points * Global Multiplier',
      iconPath: '/multipliers/season.svg',
    },
  ];

  const wrapperClasses =
    'grid justify-items-center place-content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-[50px] gap-x-[24px]';
  const cardClasses = 'flex flex-col items-center justify-between mb-4 w-[207px] text-center';
  const cardContentClasses = 'flex flex-col items-center gap-[20px]';
</script>

<ContentBox title="Multiplier System">
  <p>Here is how all of the Faction Badges interact with each other and with the other NFTs that give multipliers:</p>

  <Note>
    A major upgrade to the multiplier system in Season 2 is that multipliers are now applied on a block by block basis.
    Meaning the sooner you get a multiplier the more points you can potentially earn in the Season.
  </Note>
</ContentBox>

<div class={wrapperClasses}>
  {#each multipliers as { title, description, iconPath }}
    <div class={cardClasses}>
      <div class={cardContentClasses}>
        <img src={iconPath} alt={title} class="w-[100px] h-[100px]" />
        <div class="flex flex-col justify-center items-center">
          <span class="font-bold">{title}</span>
          <p class="text-secondary-content">{description}</p>
        </div>
      </div>
    </div>
  {/each}
</div>
