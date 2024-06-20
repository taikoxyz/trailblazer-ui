<script lang="ts">
  import { LeaderboardTransactions } from '$components/Leaderboards';
  import { MovementSelector } from '$components/MovementSelector';
  import { ProfileFactions } from '$components/Profile';
  import { classNames } from '$libs/util/classNames';
  import type { IToDo } from '$types';

  type TabContent = {
    name: string;
    content: IToDo;
    checked: boolean;
  };

  export let tabs: TabContent[] = [
    {
      name: 'Transactions',
      content: LeaderboardTransactions,
      checked: true,
    },
    {
      name: 'Faction Badges',
      content: ProfileFactions,
      checked: false,
    },
    {
      name: 'Movement Selector',
      content: MovementSelector,
      checked: false,
    },
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
    'bg-elevated-background',
    'max-w-full',
    'overflow-hidden',
    'rounded-[30px]',
    'min-h-64',
  );

  const tabSelectorItemClasses = classNames(
    'tab',
    'hover:cursor-pointer',
    'hover:bg-[#e81899]',
    'hover:bg-opacity-20',
    'whitespace-nowrap',
    '[--tab-bg:#e81899]',
    '[--tab-radius:0]',
    '[--tab-border-color:transparent]',
    'body-bold',
  );
</script>

<div role="tablist" class="tabs tabs-lifted w-full px-4 lg:px-0">
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
