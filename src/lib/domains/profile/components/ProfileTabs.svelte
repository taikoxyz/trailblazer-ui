<script lang="ts">
  import DevRoom from '$components/Profile/DevRoom/DevRoom.svelte';
  import BadgeMigration from '$lib/domains/nfts/components/BadgeMigration.svelte';
  import { ProfileNFTs } from '$lib/domains/profile/components/ProfileNFTs';
  import { classNames } from '$libs/util/classNames';
  import { isDevelopmentEnv } from '$libs/util/isDevelopmentEnv';

  import ProfileTransactions from './ProfileActivity/ProfileTransactions.svelte';

  type TabContent = {
    name: string;
    content: typeof ProfileTransactions | typeof ProfileNFTs | typeof BadgeMigration | typeof DevRoom;
  };

  export let tabs: TabContent[] = [
    {
      name: 'Activity',
      content: ProfileTransactions,
    },
    {
      name: 'NFT Collection',
      content: ProfileNFTs,
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

  let activeTab = 0;

  const tabPanelClasses = classNames('mx-4', 'lg:mx-0', 'relative', 'overflow-x-scroll', 'min-h-64');

  const tabClasses = classNames(
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
      class={tabClasses}
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
