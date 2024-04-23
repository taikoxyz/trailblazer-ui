<script lang="ts">
  import { FactionCollection } from '$components/Carousel';
  import { ProfileAchievements } from '$components/Profile';
  import { Transactions } from '$components/Table';

  type TabContent = {
    name: string;
    content: any;
    checked: boolean;
  };

  export let tabs: TabContent[] = [
    {
      name: 'Transactions',
      content: Transactions,
      checked: true,
    },
    {
      name: 'Achievements',
      content: ProfileAchievements,
      checked: false,
    },
    {
      name: 'NFT Collection',
      content: FactionCollection,
      checked: false,
    },
  ];
</script>

<div role="tablist" class="tabs tabs-lifted w-full">
  {#each tabs as tab}
    <input
      type="radio"
      name="my_tabs_2"
      role="tab"
      class="tab whitespace-nowrap [--tab-bg:#e81899] [--tab-radius:0] [--tab-border-color:transparent] body-bold"
      aria-label={tab.name}
      checked={tab.checked} />
    <div role="tabpanel" class="tab-content p-6 bg-elevated-background max-w-full overflow-hidden">
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
