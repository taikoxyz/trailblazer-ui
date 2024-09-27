<script lang="ts">
  import DevRoom from '$components/Profile/DevRoom/DevRoom.svelte';
  import { NFTCollection } from '$components/Profile/UserNFTs';
  import BadgeMigration from '$components/Profile/UserNFTs/FactionBadges/BadgeMigration.svelte';
  import { classNames } from '$libs/util/classNames';
  import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';

  import ProfileTransactions from './ProfileTransactions.svelte';

  type TabContent = {
    name: string;
    content: typeof ProfileTransactions | typeof NFTCollection | typeof BadgeMigration | typeof DevRoom;
  };

  export let tabs: TabContent[] = [
    {
      name: 'Activity',
      content: ProfileTransactions,
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
  ];

  // Active tab index, initialized to 0 to select the first tab by default
  let activeTab = 0;

  const tabPanelClasses = classNames('mx-4', 'lg:mx-0', 'relative', 'overflow-x-scroll', 'min-h-64');

  /**
   * Generates the appropriate class list for each tab based on its active state.
   * Utilizes Tailwind CSS's aria-selected variants to apply styles.
   *
   * @param index - The index of the tab
   * @returns A string of class names
   */
  function getTabClass() {
    return classNames(
      'text-center',
      'rounded-full',
      'md:rounded-none',
      'md:rounded-t-[20px]',
      'h-[44px]',
      'btn',
      'md:tab',
      'md:w-[140px]',
      'py-[8px]',
      'px-[20px]',
      'btn-ghost',
      'border-primary-brand',
      'hover:cursor-pointer',
      'hover:bg-primary-interactive-hover',
      'hover:text-white',
      'hover:border-primary-brand',
      'whitespace-nowrap',
      'body-bold',
      'md:bg-transparent',
      'md:border-none',
    );
  }

  const tablistClasses = classNames(
    'flex',
    'flex-wrap',
    'w-full',
    'justify-center',
    'md:justify-start',
    'px-4',
    'lg:px-0',
    'tabs',
    'gap-[10px]',
    'mb-[30px]',
    'md:mb-0',
  );
</script>

<!-- Tab List -->
<div role="tablist" class={tablistClasses}>
  {#each tabs as tab, index}
    <button
      type="button"
      role="tab"
      class={getTabClass()}
      aria-selected={index === activeTab}
      on:click={() => (activeTab = index)}
      aria-controls={`tabpanel-${index}`}
      id={`tab-${index}`}
      tabindex={index === activeTab ? 0 : -1}>
      {tab.name}
    </button>
  {/each}
</div>

<!-- Tab Content -->
<div role="tabpanel" class={tabPanelClasses} aria-labelledby={`tab-${activeTab}`} id={`tabpanel-${activeTab}`}>
  <svelte:component this={tabs[activeTab].content} />
</div>

<style>
  [role='tab'][aria-selected='true'] {
    background-color: #e81899;
    color: white;
  }

  button:focus {
    outline: none;
  }

  .md\:tab:is(.tab-active, [aria-selected='true']):not(.tab-disabled):not([disabled]),
  .md\:tab:is(input:checked) {
    border-color: transparent !important;
  }
</style>
