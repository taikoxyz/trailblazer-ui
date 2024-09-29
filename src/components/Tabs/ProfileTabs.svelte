<script lang="ts">
  import { LeaderboardTransactions } from '$components/Leaderboards';
  import DevRoom from '$components/Profile/DevRoom/DevRoom.svelte';
  import BadgeMigration from '$lib/domains/nfts/components/BadgeMigration.svelte';
  import { NFTCollection } from '$lib/domains/profile/components/ProfileNFTs';
  import { classNames } from '$libs/util/classNames';
  import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';

  type TabContent = {
    name: string;
    content: typeof LeaderboardTransactions | typeof NFTCollection | typeof BadgeMigration;
    checked?: boolean;
  };

  export let tabs: TabContent[] = [
    {
      name: 'Transactions',
      content: LeaderboardTransactions,
      checked: true,
    },
    {
      name: 'NFT Collection',
      content: NFTCollection,
    },
    {
      name: 'Badge Migration',
      content: BadgeMigration,
    },
    ...(isDevelopmentEnv
      ? [
          {
            name: 'Dev Room',
            content: DevRoom,
          },
        ]
      : []),
    // {
    //   name: 'Achievements',
    //   content: ProfileAchievements,
    //   checked: false,
    // },
    // {
    //   name: 'Boosters',
    //   content: ProfileBoosters,
    //   checked: false,
    // },
    // {
    //   name: 'NFT Collection',
    //   content: NFTCollection,
    //   checked: false,
    // },
  ];

  const tabPanelClasses = classNames(
    'tab-content',
    'p-6',
    'relative',
    'bg-elevated-background',
    'overflow-x-scroll',
    'rounded-[30px]',
    'min-h-64',
  );

  const tabSelectorItemClasses = classNames(
    'tab',
    'hover:cursor-pointer',
    'hover:bg-secondary',
    'hover:bg-opacity-20',
    'whitespace-nowrap',
    '[--tab-bg:#e81899]',
    '[--tab-radius:0]',
    '[--tab-border-color:transparent]',
    'body-bold',
  );
</script>

<div role="tablist" class="tabs tabs-lifted w-full px-4 py-6 lg:px-0 lg:py-0">
  {#each tabs as tab}
    <input
      type="radio"
      name="profile-tabs"
      role="tab"
      class={tabSelectorItemClasses}
      aria-label={tab.name}
      checked={tab.checked} />
    <div role="tabpanel" class={tabPanelClasses}>
      <svelte:component this={tab.content} />
    </div>
  {/each}
</div>

<style>
  input.tab {
    border-radius: 20px 20px 0px 0px;
    height: 44px;
  }
</style>
