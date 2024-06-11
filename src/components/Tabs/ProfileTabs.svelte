<script lang="ts">
  import { ProfileFactions } from '$components/Profile';
  import { Transactions } from '$components/Table';
  import type { IToDo } from '$types';

  type TabContent = {
    name: string;
    content: IToDo;
    checked: boolean;
  };

  export let tabs: TabContent[] = [
    {
      name: 'Transactions',
      content: Transactions,
      checked: true,
    },
    // {
    //   name: 'Faction Badges',
    //   content: ProfileFactions,
    //   checked: false,
    // },
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
</script>

<div role="tablist" class="tabs tabs-lifted w-full px-4 lg:px-0">
  {#each tabs as tab}
    <input
      type="radio"
      name="my_tabs_2"
      role="tab"
      class="tab hover:cursor-pointer hover:bg-[#e81899] hover:bg-opacity-20 whitespace-nowrap [--tab-bg:#e81899] [--tab-radius:0] [--tab-border-color:transparent] body-bold"
      aria-label={tab.name}
      checked={tab.checked} />
    <div
      role="tabpanel"
      class="tab-content p-6 bg-elevated-background max-w-full overflow-hidden rounded-r-[30px] rounded-b-[30px] min-h-64">
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
